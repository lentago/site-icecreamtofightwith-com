"""Unit tests for ice_cream_linter rules.

Run from repo root:
    python -m unittest discover tests
"""

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import ice_cream_linter as L  # noqa: E402


class TestNationality(unittest.TestCase):
    def test_clean_title_and_filename_pass(self):
        text = "# Coconut Pandan\n\n*A tagline*\n"
        self.assertEqual(L.check_nationality(text, Path("01_coconut_pandan.md")), [])

    def test_nationality_in_title_flagged(self):
        text = "# Vietnamese Avocado\n\n*A tagline*\n"
        errors = L.check_nationality(text, Path("02_avocado.md"))
        self.assertTrue(any("vietnamese" in e.lower() for e in errors))

    def test_nationality_in_filename_flagged(self):
        text = "# Avocado\n"
        errors = L.check_nationality(text, Path("02_vietnamese_avocado.md"))
        self.assertTrue(any("vietnamese" in e.lower() for e in errors))

    def test_region_or_city_in_title_passes(self):
        text = "# New Orleans Chicory\n"
        self.assertEqual(L.check_nationality(text, Path("27_new_orleans_chicory.md")), [])


class TestBannedPhrases(unittest.TestCase):
    def test_doneness_description_passes(self):
        self.assertEqual(L.check_banned_phrases("Churn until soft-serve consistency."), [])

    def test_ice_cream_maker_phrase_flagged(self):
        text = "Churn according to your ice cream maker's instructions."
        self.assertTrue(L.check_banned_phrases(text))

    def test_churn_time_estimate_flagged(self):
        errors = L.check_banned_phrases("Churn for 20-25 minutes.")
        self.assertTrue(any("churn" in e.lower() for e in errors))

    def test_em_dash_churn_range_flagged(self):
        errors = L.check_banned_phrases("Churn until thick, about 20–30 minutes.")
        self.assertTrue(any("churn" in e.lower() for e in errors))

    def test_unrelated_minute_range_passes(self):
        # Steeping ranges are fine — only churn ranges are banned.
        self.assertEqual(L.check_banned_phrases("Steep for 20-25 minutes."), [])

    def test_total_time_range_passes(self):
        self.assertEqual(L.check_banned_phrases("Total Time: 4-6 hours"), [])

    def test_no_churn_alternative_stirring_schedule_passes(self):
        # Recipe 02 case: "skip churning... stirring every 30-45 minutes"
        # describes the no-churn stirring schedule, not a churn time.
        text = (
            "Alternatively, you can skip churning entirely and just freeze the "
            "mixture in a container, stirring every 30-45 minutes for the first "
            "3 hours to break up ice crystals."
        )
        self.assertEqual(L.check_banned_phrases(text), [])

    def test_churn_with_intermediate_phrase_still_flagged(self):
        # Realistic violations with a short clause between still match.
        text = "Churn until ready, about 20-25 minutes."
        self.assertTrue(L.check_banned_phrases(text))


class TestTagline(unittest.TestCase):
    def test_italic_tagline_passes(self):
        self.assertEqual(L.check_tagline("# Title\n\n*A tagline*\n\nBody."), [])

    def test_missing_tagline_flagged(self):
        warnings = L.check_tagline("# Title\n")
        self.assertTrue(any("missing" in w.lower() for w in warnings))

    def test_non_italic_tagline_flagged(self):
        warnings = L.check_tagline("# Title\n\nNot italic\n\nBody.")
        self.assertTrue(any("italicized" in w.lower() for w in warnings))

    def test_bold_not_italic_flagged(self):
        warnings = L.check_tagline("# Title\n\n**Bold not italic**\n\nBody.")
        self.assertTrue(any("italicized" in w.lower() for w in warnings))

    def test_no_h1_skipped(self):
        # Front-matter files have no H1; don't false-positive on them.
        self.assertEqual(L.check_tagline("## Section header\n\nBody."), [])


class TestVoiceMinimums(unittest.TestCase):
    def test_sufficient_voice_passes(self):
        text = "This shit is fucking real, damn good, homie. Trust me, chief."
        self.assertEqual(L.check_voice_minimums(text), [])

    def test_low_profanity_flagged(self):
        text = "This is a clean recipe, homie chief."
        warnings = L.check_voice_minimums(text)
        self.assertTrue(any("profanity" in w.lower() for w in warnings))

    def test_low_address_flagged(self):
        text = "This is fucking damn shit hell ass content with no address."
        warnings = L.check_voice_minimums(text)
        self.assertTrue(any("address" in w.lower() for w in warnings))


class TestAllergenNotes(unittest.TestCase):
    def test_nut_allergen_note_passes(self):
        self.assertEqual(
            L.check_allergen_notes("**Allergen Information:** Contains pistachios."),
            [],
        )

    def test_milk_in_allergen_note_flagged(self):
        self.assertTrue(L.check_allergen_notes("**Allergens:** Contains milk and cream."))

    def test_egg_in_allergen_note_flagged(self):
        self.assertTrue(L.check_allergen_notes("**Allergens:** Contains eggs."))

    def test_milk_outside_allergen_note_ignored(self):
        # Milk in a non-allergen context shouldn't trigger.
        self.assertEqual(L.check_allergen_notes("Heat the milk until steaming."), [])


class TestFilenameHygiene(unittest.TestCase):
    def test_good_filenames_pass(self):
        files = [Path("01_a.md"), Path("02_b.md"), Path("03_c.md")]
        self.assertEqual(L.check_filename_hygiene(files), [])

    def test_bad_format_flagged(self):
        files = [Path("01_a.md"), Path("Recipe2.md")]
        errors = L.check_filename_hygiene(files)
        self.assertTrue(any("doesn't match" in msg for _, msg in errors))

    def test_uppercase_in_filename_flagged(self):
        files = [Path("01_Foo.md")]
        errors = L.check_filename_hygiene(files)
        self.assertTrue(any("doesn't match" in msg for _, msg in errors))

    def test_duplicate_prefix_flagged(self):
        files = [Path("01_a.md"), Path("01_b.md")]
        errors = L.check_filename_hygiene(files)
        self.assertTrue(any("duplicate" in msg.lower() for _, msg in errors))

    def test_gap_in_numbering_flagged(self):
        files = [Path("01_a.md"), Path("03_c.md")]
        errors = L.check_filename_hygiene(files)
        self.assertTrue(any("non-contiguous" in msg.lower() for _, msg in errors))


class TestCrossReferences(unittest.TestCase):
    def test_title_present_passes(self):
        titles = [(Path("01_a.md"), "Coconut Pandan")]
        flavors = "**Coconut Pandan** — description"
        self.assertEqual(L.check_cross_references(titles, flavors), [])

    def test_missing_title_flagged(self):
        titles = [(Path("01_a.md"), "Mystery Flavor")]
        flavors = "**Coconut Pandan** — description"
        warnings = L.check_cross_references(titles, flavors)
        self.assertEqual(len(warnings), 1)

    def test_case_insensitive_match(self):
        titles = [(Path("01_a.md"), "coconut pandan")]
        flavors = "**Coconut Pandan** — description"
        self.assertEqual(L.check_cross_references(titles, flavors), [])

    def test_unicode_match(self):
        titles = [(Path("02_b.md"), "Sinh Tố Bơ")]
        flavors = "**Sinh Tố Bơ** — description"
        self.assertEqual(L.check_cross_references(titles, flavors), [])


class TestCountOccurrences(unittest.TestCase):
    """Substring counting used to false-match common English words.
    These tests pin down that 'pal' no longer matches 'palm', etc.
    """

    def test_bare_words_count(self):
        self.assertEqual(L.count_occurrences("fuck shit damn hell ass", L.PROFANITY), 5)

    def test_common_inflections_count(self):
        # -ing, -ed, -s suffixes count. -ty / unusual suffixes intentionally don't
        # (under-counting is safer than re-introducing palm/pale false positives).
        self.assertEqual(L.count_occurrences("fucking fucked damned shits", L.PROFANITY), 4)

    def test_palm_does_not_match_pal(self):
        # Recipe content like "palm sugar" or "pale green" shouldn't inflate counts.
        self.assertEqual(L.count_occurrences("palm sugar, pale green palate", L.ADDRESS_TERMS), 0)

    def test_passport_does_not_match_ass(self):
        self.assertEqual(L.count_occurrences("passport passion class compass", L.PROFANITY), 0)

    def test_hello_does_not_match_hell(self):
        self.assertEqual(L.count_occurrences("hello, shellfish", L.PROFANITY), 0)

    def test_address_bare_words_count(self):
        self.assertEqual(L.count_occurrences("homie chief buddy pal", L.ADDRESS_TERMS), 4)


class TestCheckAllRecipeScoping(unittest.TestCase):
    """Recipe-specific voice rules should not fire on front/back matter."""

    HEAVY_VOICE = " ".join(["fuck damn shit hell ass"] * 3)  # 15 profanities

    def test_recipe_flags_heavy_profanity(self):
        warnings = L.check_all(self.HEAVY_VOICE, is_recipe=True)
        self.assertTrue(any("Too much profanity" in w for w in warnings))

    def test_non_recipe_skips_profanity_check(self):
        warnings = L.check_all(self.HEAVY_VOICE, is_recipe=False)
        self.assertFalse(any("profanity" in w.lower() for w in warnings))

    def test_non_recipe_skips_voice_drift(self):
        warnings = L.check_all("Generic prose totally unlike a recipe.", is_recipe=False)
        self.assertFalse(any("voice drift" in w.lower() for w in warnings))

    def test_sentence_length_still_applies_to_non_recipe(self):
        long_sentence = " ".join(["word"] * 30) + "."
        warnings = L.check_all(long_sentence, is_recipe=False)
        self.assertTrue(any("Sentences too long" in w for w in warnings))


class TestHelpers(unittest.TestCase):
    def test_extract_h1(self):
        self.assertEqual(L.extract_h1("# Hello\n\nbody"), "Hello")
        self.assertEqual(L.extract_h1("no h1 here"), None)

    def test_extract_tagline_skips_blank_lines(self):
        text = "# Title\n\n\n*Tagline*\n\nBody"
        self.assertEqual(L.extract_tagline(text), "*Tagline*")


if __name__ == "__main__":
    unittest.main()
