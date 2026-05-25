#!/usr/bin/env bash
# Import generated illustrations from a source directory into illustrations/.
#
# Renames each Gemini-named source PNG to <slug>.png matching the recipe
# filenames in recipes/. Mapping is inline (one source per slug). Run from
# repo root or anywhere — paths are resolved relative to this script.
#
# Usage:
#   scripts/import_illustrations.sh [SRC_DIR]
#
# SRC_DIR defaults to ~/Downloads.
#
# Idempotent: re-running overwrites existing files in illustrations/.
# Missing source files are reported but do not stop the run.

set -euo pipefail

SRC_DIR="${1:-$HOME/Downloads}"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DST_DIR="$REPO_ROOT/illustrations"

mkdir -p "$DST_DIR"

# slug  ←  source filename (relative to SRC_DIR)
# Slug must match the recipe markdown filename (without .md) exactly.
declare -A MAPPING=(
  [01_coconut_pandan]="Gemini_Generated_Image_ (7).png"
  [02_sinh_to_bo]="Gemini_Generated_Image_ (2).png"
  [03_cardamom_pistachio_kulfi]="Gemini_Generated_Image_j9pkv0j9pkv0j9pk.png"
  [04_horchata]="Gemini_Generated_Image_ (9).png"
  [05_miso_matcha]="Gemini_Generated_Image_bd6babbd6babbd6b.png"
  [06_chili_mango]="Gemini_Generated_Image_pr0rvapr0rvapr0r.png"
  [07_wattleseed_macadamia]="Gemini_Generated_Image_nobhjsnobhjsnobh.png"
  [08_tarte_tatin]="Gemini_Generated_Image_3gargx3gargx3gar.png"
  [09_gochugaru_sesame]="Gemini_Generated_Image_ (16).png"
  [10_rum_banana]="Gemini_Generated_Image_ (6).png"
  [11_golden_milk_date]="Gemini_Generated_Image_39z7t939z7t939z7.png"
  [12_brown_bread]="Gemini_Generated_Image_e3dpjxe3dpjxe3dp.png"
  [13_atole_de_anis]="Gemini_Generated_Image_ (10).png"
  [14_bocadillo_y_cafe]="Gemini_Generated_Image_ (3).png"
  [15_sfogliatelle]="Gemini_Generated_Image_ (4).png"
  [16_sichuan_plum]="Gemini_Generated_Image_ (14).png"
  [17_brown_butter_pecan]="Gemini_Generated_Image_wwxjj4wwxjj4wwxj.png"
  [18_tahini_rose]="Gemini_Generated_Image_birumabirumabiru.png"
  [19_chile_chocolate]="Gemini_Generated_Image_ (1).png"
  [20_piri_piri_cashew_coconut]="Gemini_Generated_Image_bs9popbs9popbs9p.png"
  [21_coffee_berbere]="Gemini_Generated_Image_1brvoc1brvoc1brv.png"
  [22_earl_grey_burnt_honey]="Gemini_Generated_Image_w6kanaw6kanaw6ka.png"
  [23_pain_patate]="Gemini_Generated_Image_87ec4u87ec4u87ec.png"
  [24_brigadeiro_passion_fruit]="Gemini_Generated_Image_ (19).png"
  [25_lemon_rosemary_honey]="Gemini_Generated_Image_ (15).png"
  [26_nabulsi_knafeh]="Gemini_Generated_Image_ (12).png"
  [27_new_orleans_chicory_beignet]="Gemini_Generated_Image_.png"
  [28_appalachian_pawpaw_maple]="Gemini_Generated_Image_bp56n6bp56n6bp56.png"
)

copied=0
skipped=0
for slug in "${!MAPPING[@]}"; do
  src_name="${MAPPING[$slug]}"
  src_path="$SRC_DIR/$src_name"
  dst_path="$DST_DIR/${slug}.png"

  if [[ ! -f "$src_path" ]]; then
    echo "MISSING  $slug  (expected $src_name)" >&2
    skipped=$((skipped + 1))
    continue
  fi

  cp "$src_path" "$dst_path"
  echo "OK       $slug  ←  $src_name"
  copied=$((copied + 1))
done

echo ""
echo "Copied $copied. Skipped $skipped. Total recipes: 28. Coverage: $copied/28."
