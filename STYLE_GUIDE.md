# Ice Cream to Fight With - Style Guide

## Overview

Look, this style guide is here to keep us all on the same page while we make ice cream recipes that are technically solid, culturally respectful, and written like your smart-ass friend who happens to know a lot about custard.

**Target Audience:** Home cooks who've made basic ice cream before and want to expand into international flavors and techniques that'll actually challenge them.

**Assumed Knowledge:** Your readers know how to temper egg yolks for custard. The book's got a comprehensive "Custard Fundamentals" section up front that covers the whole process in detail, so individual recipes can skip the basics and focus on what makes THEIR custard special. Don't repeat tempering instructions—just reference it when needed ("Make your custard using the standard method" or "Temper the yolks—you know this drill by now, chief").

---

## CRITICAL: Text-Only Content (Yeah, This Again)

**ALL recipe content must be plain text only. NO exceptions.**

This is the hill we're dying on, homie. Here's why:

**PROHIBITED:**
- Emojis (they corrupt files and look like shit)
- Special symbols (checkmarks, arrows, decorative bullets)
- Decorative characters
- Unicode art
- Any non-standard text characters

**WHY:** Graphics and design get handled separately in layout. Non-text characters cause encoding nightmares, display inconsistently across platforms, and generally fuck up the production workflow. I know emojis are cute. I don't care. They're not invited.

**USE INSTEAD:**
- Plain text titles: `# Sfogliatelle` NOT `# 🍰 Sfogliatelle`
- Written emphasis: Bold, italics, ALL CAPS
- Standard punctuation: em dashes (—), standard quotes

**Allowed special characters (the only ones):**
- **Em dashes:** Use `—` (proper em dash) not `--` or `-`
- **Degree symbol:** `°F` (proper UTF-8 encoding)
- **Accent marks:** Proper UTF-8 (café not corrupted encoding)
- **Foreign characters:** Correct Unicode (mála not corrupted)
- **Standard punctuation:** Periods, commas, colons, semicolons, quotes, parentheses, etc.

**Test:** Can you copy-paste the content into a plain text editor without it looking broken? If yes, you're good. If it requires special rendering, it's banned.

**If you see encoding corruption** (weird characters like `â€"` or `Ã©`), fix it immediately. Replace with proper UTF-8 or remove if decorative.

This is non-negotiable. Any violations found during review get fixed on sight, no discussion.

---

## Complete Book Structure

The book "Ice Cream to Fight With: Recipes You'll Fuck Up At Least Once" is organized like this:

**Front Matter:**
1. **Title Page** - Full title with subtitle
2. **Introduction** - Sets expectations, explains the philosophy, describes what makes these recipes different
3. **The Flavors** - Complete list of all recipes with brief descriptors
4. **How to Actually Use This Book** - Practical guidance on planning, sourcing, and expectations
5. **The Philosophy** - Why make things harder than they need to be
6. **A Note on Difficulty** - Complete explanation of the four-tier difficulty system with what each level actually means
7. **The Custard Fundamentals** - Comprehensive custard tutorial covering the entire process so individual recipes can reference it
8. **Final Thoughts** - Brief closing remarks before recipes begin

**Recipe Collection:**
- complete recipes, each following the structure defined in this guide
- Recipes span diverse international cuisines while avoiding nationality labels in titles
- Mix of difficulty levels from CHILL to A FUCKING ORDEAL
- Each recipe is complete and self-contained with all necessary context

**Closing:**
- Brief sign-off acknowledging the reader's commitment and encouraging experimentation

---

## Recipe Structure & Required Elements

### Title
- **Plain text ONLY—absolutely no emojis or special characters**
- **NO nationalities in recipe names** (Colombian, Jamaican, Mexican, etc.)
- Use regional descriptors (Sichuan, Appalachian, Southern), cities (New Orleans), or dish names (Sfogliatelle, Kulfi) instead
- Format: `# Recipe Name`
- Example: `# Cashew & Coconut with Piri Piri` NOT `# Mozambican Cashew & Coconut`
- **WRONG:** `# 🍨 Sfogliatelle` - NO emojis
- **WRONG:** `# ✓ Sfogliatelle` - NO symbols
- **WRONG:** `# Jamaican Rum Banana` - NO nationalities

Graphics and visual elements get added during layout/design phase. Keep it clean here.

### Tagline
- Italicized, concise descriptor
- Format: `*Brief evocative description*`
- Example: `*Naples' pastry, now frozen*`

### YAML Frontmatter (Required)

Every recipe file begins with a YAML frontmatter block that carries structured metadata for the website renderer. Voice and prose stay in the body; this block is data only.

**Format:**
```
---
cuisine: "Vietnamese"
active_time_minutes: 20
total_time_minutes_min: 360
total_time_minutes_max: 480
yield: "About 1 quart"
dietary:
  - egg-free
  - contains-nuts
---

# Recipe Name
...
```

**Fields:**
- `cuisine` — primary cultural origin as displayed. Free text, but prefer the established list: Thai, Vietnamese, Indian, Mexican, Japanese, Australian, French, Korean, Caribbean (Jamaican), South Asian, Irish, Colombian, Italian, Chinese (Sichuan), American (Southern / Cajun-Creole / Appalachian), Middle Eastern, African (Portuguese-influenced), Ethiopian, British, Haitian, Brazilian, Mediterranean (Greek), Palestinian.
- `active_time_minutes` — integer minutes of hands-on work. Estimate from the funny parenthetical in `**Total Time:**` if not measured directly.
- `total_time_minutes_min` / `total_time_minutes_max` — integer minutes. Same range as the `**Total Time:**` prose line.
- `yield` — free text. The compiled book treats all recipes as standardized batches; this field captures the actual finished-volume estimate for the website (overrun included).
- `dietary` — list of canonical tags. Use empty list `[]` if none apply. Allowed tags:
  - `vegan` (no animal products)
  - `dairy-free` (no dairy — implied by `vegan`)
  - `egg-free` (no eggs)
  - `gluten-free` (no wheat/gluten)
  - `contains-alcohol` (rum, bourbon, whiskey, calvados, beer)
  - `contains-nuts` (pistachio, almond, pecan, macadamia, cashew, walnut)
  - `contains-soy` (miso, soy sauce)
  - `contains-sesame` (tahini, sesame seeds)
  - `contains-wheat` (beignet, bread crumble, semolina, kataifi, all-purpose flour)

Pepitas (pumpkin seeds) and pine nuts are not flagged as `contains-nuts` (they're seeds, not tree nuts).

`compile_book.py` strips this block before assembling the book PDF/markdown, so it doesn't pollute the reading experience.

### Inline Prose Metadata (Required)

Every recipe must include difficulty and total time immediately after the tagline. No exceptions.

**Format:**
```
# Recipe Name

*Tagline*

**Difficulty:** [RATING] - [Funny paragraph explaining what makes it this difficulty level]

**Total Time:** [X-Y hours] ([funny parenthetical about what that time actually involves])

Opening paragraph starts here...
```

**Difficulty Ratings:**
- **CHILL:** No custard anxiety, minimal technique, almost no opportunity for catastrophic failure
- **LEGIT:** Multiple components, sustained attention required, solid fundamentals needed
- **THE REAL DEAL:** Narrow margins for error, techniques that can go wrong in seconds, expect to fuck something up at least once
- **A FUCKING ORDEAL:** Extreme sourcing difficulty, professional techniques, multi-day commitment, or genuine insanity

**Guidelines for difficulty explanations:**
- Keep it conversational and slightly self-deprecating
- Mention specific challenging aspects (e.g., "you'll brown butter three times")
- Use HOMIE voice (can include profanity, casual address)
- 1-3 sentences explaining what makes this recipe this difficulty level
- Be honest about pain points but encouraging

**Examples of good difficulty explanations:**
- "LEGIT - This one's got multiple components and some candy work, but nothing here will actually break you. You'll watch a thermometer, chop some things, and feel accomplished. That's it."
- "THE REAL DEAL - You'll brown butter THREE SEPARATE TIMES, homie. Your kitchen will smell incredible and you'll question every decision that led you here. But the result is worth it."
- "A FUCKING ORDEAL - Pawpaws only exist for like two weeks in September and you can't buy them anywhere. You either know a forager or you wait another year. That's what makes this OVERKILL."
- "CHILL - No custard anxiety here, friend. You're blending shit and freezing it. If you can operate a blender, you've got this."

**Guidelines for total time parentheticals:**
- Explain what that time actually involves (waiting vs. active work)
- Keep it brief and funny
- Examples: 
  - "(most of which is just waiting for shit to dry and chill, not actual work)"
  - "(includes overnight because patience is a virtue you don't have)"
  - "(2 hours of browning butter and questioning your sanity, the rest is chilling)"
  - "(you'll be free to do other things for most of this, don't panic)"

**Note:** Yield is NOT included in the inline prose metadata — the recipes are written as standardized batches. Structured `yield` lives in the YAML frontmatter for the website renderer.

### Opening Paragraph(s)
- 1-3 paragraphs explaining the recipe
- Include cultural context or ingredient background
- Set expectations about difficulty, time, or unique aspects
- End with a warning or heads-up if relevant ("Fair warning, chief...")

### Ingredients Section
Format:
```
## Ingredients

**Component Name:** 
- Ingredient with amount
- Another ingredient
```

**Guidelines:**
- Group by component (Base, Swirl, Brittle, etc.)
- Bold component headers
- Include helpful parentheticals: `(from about 4-6 pawpaws, seeds removed)`
- Note divisions: `1.5 cups water (divided)`
- Give weight backup for produce: `4-5 medium plums (about 1.5 lbs)`

### Instructions Section
Format:
```
## Instructions

**Component Name (with timing note if relevant):**

Instruction paragraph. Multiple sentences, conversational style. Technical details integrated naturally.

Another paragraph if needed.

**Next Component:**

Instructions continue.
```

**Guidelines:**
- Bold component headers
- Include timing in headers when critical: `**Candied Ginger (make 1-2 days ahead):**`
- Paragraphs, not numbered steps (exception: extremely complex recipes like Recipe 27 can use numbers)
- Write in second person imperative: "Heat the cream" not "You should heat the cream"
- Integrate warnings naturally: "Watch this like a fucking hawk"
- Temperature in Fahrenheit: `170-175°F`
- Use em dashes (—) not hyphens for interrupting thoughts
- Provide visual/sensory cues: "should smell nutty and golden"

### Notes Section
Format:
```
## Notes

**Note Title:**
Content explaining sourcing, technique, cultural context, etc.

**What it Tastes Like:**
Final note describing the flavor experience
```

**Required notes (as applicable):**
- **Cultural Context:** For international recipes—explain origins, significance, traditional prep
- **Sourcing guidance:** Where to find specialty ingredients, acceptable substitutes
- **Technique deep-dives:** Why certain methods matter
- **Make-ahead guidance:** What can be prepped in advance for multi-component recipes
- **What it Tastes Like:** ALWAYS the final note—sensory description of the finished product

**Guidelines:**
- Bold note titles
- 2-4 substantial paragraphs per note
- This is where teaching moments live (cultural history, ingredient deep-dives, technique rationale)
- Be thorough—readers want to learn, not just follow instructions
- Include ethical considerations for indigenous ingredients (wattleseed, pawpaw, etc.)

**Allergen Notes:**
- **Include notes for:** Tree nuts, peanuts, wheat/gluten, soy
- **DO NOT include notes for:** Milk, cream, eggs (this is an ice cream book, dude)
- Format: `**Allergen Information:** Contains tree nuts (pistachios).`
- For vegan recipes, call it out: `**Vegan-Friendly:** This recipe contains no dairy or eggs.`

---

## What It Tastes Like (Final Note)

Every recipe ends with this section. It's the last thing the reader sees before moving on, so make it land.

**What it IS:**
- Sensory description of what's literally in your mouth
- Component-by-component flavor hits
- Textural callouts where they contrast with the base
- Cultural or emotional anchor as closer ("Tastes like Haiti." "Horn of Africa in a bowl.")
- Personality-driven sendoff (direct address, callback, or joke)

**What it ISN'T:**
- Food magazine prose ("luxurious smoothness," "sophisticated complexity")
- Analytical explanation of why flavors work together
- A sales pitch for the recipe you've already written
- Long. Match the difficulty tier: CHILL/LEGIT recipes can run 80-120 words; THE REAL DEAL and A FUCKING ORDEAL should be tighter, 40-80 words. By the time someone's deep in a complex recipe, they don't need convincing.

**Cadence:**
- Staccato. Fragments. Em dash chains for rapid-fire descriptors.
- "Rich tawny-amber base with pervasive brown butter nuttiness" not "The base has a rich, tawny-amber color with a pervasive nuttiness from the brown butter"
- Name components and what they DO: "Brittle adds crunch." Not what they ARE: "The brittle is a crunchy element."
- Describe, don't explain. "Cold dulls the heat" is fine. "The heat is dulled because frozen temperatures reduce capsaicin receptor sensitivity" is not.

**Closers that work:**
- Place/culture anchor: "Tastes like the Old City." "Horn of Africa in a bowl."
- Emotional anchor: "Tastes like celebration, like home, like Haiti."
- Personality: "Then they eat half the container and pretend they didn't."
- Direct address: "Tastes like a secret, pal."

---

## The HOMIE Voice (Our Whole Thing)

This is the voice that makes this cookbook different from every other ice cream book on the shelf. It's casual, educational, self-deprecating, and genuinely helpful—like a smart friend who's already made all the mistakes teaching you what actually works.

### Core Elements

**Casual Address:**
- Use varied terms: homie, dude, friendo, buddy, dawg, friend, pal, chief, boss
- Sprinkle throughout, don't overdo it (2-4 times per recipe)
- Example: "Listen, chief—this timing matters."

**Conversational Asides:**
- Use parentheses for meta-commentary
- Examples: "(Ask me how I know. Actually, don't.)" / "(You'll thank me later.)" / "(This is a hill I will die on.)"

**Collaborative Framing:**
- "We're in this together" not "You're doing this alone"
- "Let's fuck this up and learn something" not "Don't make mistakes"
- Acknowledge shared struggles: "We've all been there"

**Profanity (Strategic Use):**
- 3-5 instances per recipe for emphasis
- Common words: shit, damn, fuck, hell, ass
- Use for impact, not decoration: "This step is fucking critical" hits harder than "This is pretty important"
- Don't force it—if it feels unnatural, skip it

**Emphasis Techniques:**
- **ALL CAPS** for things that really need to land: "Do NOT skip this step"
- *Italics* on key words for stress: "The *timing* here matters"
- Sentence fragments. For impact.
- Start sentences with And/But/So when it flows naturally

**Anticipate Reader Experience:**
- Call out what they're thinking: "I know you want to stir. Don't."
- Predict struggles: "You'll spend ten minutes staring at this wondering if it's ready"
- Validate concerns: "Yes, it's supposed to be that yellow"
- Warn about pitfalls like a friend who's already fucked it up: "Fair warning—this burns FAST"

**Self-Deprecation:**
- Acknowledge difficulty honestly: "This will take forever" / "You'll definitely burn the first batch"
- Reference past failures as learning opportunities
- Self-deprecate about the process, never about the reader or alternatives
- Examples: "I've burned this three times" not "You'll probably burn this because you're careless"

**Technical Content (Don't Lose This):**
- Keep instructions clear but wrapped in personality
- Never sacrifice accuracy for humor
- Explain "why" in relatable terms
- Use real-world comparisons: "color of good bourbon" / "auditioning for a volcano documentary"

### What HOMIE Voice Is NOT

- Mean-spirited or putting down alternatives
- Fake enthusiasm or forced positivity
- Losing clarity for the sake of humor
- Bragging or showing off
- Unexplained jargon
- More than 5-6 profanities per recipe (that's when it gets forced)

### Voice Examples

**TOO FORMAL:**
"One should ensure the mixture reaches the appropriate temperature before proceeding."

**HOMIE VOICE:**
"Get this to 175°F, homie. No shortcuts."

**TOO APOLOGETIC:**
"Sorry, but this is really important and you need to pay attention to it."

**HOMIE VOICE:**
"This step is fucking important—don't space out now."

**CORPORATE MANUAL:**
"Monitor the temperature carefully to prevent overcooking."

**HOMIE VOICE:**
"Watch this like a hawk. It goes from perfect to scrambled in about 5 seconds."

---

## Teaching Moments

### What Makes a Good Teaching Moment

Every recipe should have 2-4 teaching moments that go beyond basic technique to explain:
- **Why ingredients work together** (scientifically or culturally)
- **Historical/cultural context** that deepens appreciation
- **Technique rationale** (why brown butter three times? Why this temperature?)
- **Ingredient deep-dives** (what IS wattleseed? Why does it matter?)

### Examples of Excellent Teaching Moments

**Scientific:**
> "Browning butter—beurre noisette if you want to be fancy about it—transforms it from sweet-cream richness to deep, nutty, almost hazelnut-like complexity. The milk solids caramelize, creating literally HUNDREDS of new flavor compounds. It's chemistry but it tastes like magic."

**Cultural/Historical:**
> "Kulfi dates back to the Mughal era in 16th-century India. The word 'kulfi' comes from the Persian 'qulfi' meaning 'covered cup'—it was traditionally frozen in metal cones packed in ice and salt."

**Ingredient Deep-Dive:**
> "Sichuan peppercorns aren't actually peppercorns—they're the dried husks of berries from the prickly ash tree. They create this unique tingling, numbing sensation on your tongue called *mala*, which literally means 'numbing-spicy.'"

**Technique Rationale:**
> "Using 3-4 yolks (I recommend 4) instead of 5-6 keeps this lighter, which lets the ricotta's character shine through without everything being too heavy and dense."

### Where Teaching Moments Go
- **Opening paragraphs:** Brief context-setting
- **Instructions:** Quick explanations of technique (why not how)
- **Notes section:** Detailed deep-dives (this is the main home)

---

## Technical Standards

### Measurements & Precision
- Use US measurements (cups, tablespoons, Fahrenheit)
- Temperatures: Always include °F symbol
- Ranges are good: "3-4 egg yolks" / "170-175°F"
- Provide weight for produce: "(about 1.5 lbs)"
- Time ranges: "30-40 minutes" not "approximately 30 minutes"

### Temperature Guidance
- **Standard custard:** 170-175°F (sometimes noted as "to 175°F" or range)
- **Light custard:** 170-175°F (emphasize this is lighter than usual)
- **Caramel:** Deep amber, copper penny color (visual beats temp here)
- **Soft ball stage:** 240°F with visual cues
- **Frying:** Specific temp (360°F for beignets)

**Rule:** Provide temperature when precision matters, visual cues when appearance is more reliable

### Churning Guidance (CRITICAL)

**DO NOT estimate churn times**—equipment varies too widely and you'll just be wrong.

**DO NOT use the phrase "according to your ice cream maker's instructions"**—this is lazy and unhelpful. Readers bought this book for guidance, not to be told to read another manual.

**Instead, describe doneness:**
- "Churn until soft-serve consistency"
- "Should look thick and pale cream-colored when ready"
- "The ricotta makes this denser than standard custard"
- "May take longer than usual due to fruit content" (acceptable—directional without specific time)

**Provide context when helpful:**
- "The fruit content makes this denser than standard custard"
- "Coconut-based ice cream may take slightly longer than dairy"
- "Expect it to look thick and pale cream-colored when ready"

---

## Cultural Respect & Authenticity

This book features recipes from all over the world. Cultural respect isn't optional—it's foundational.

### Required for International Recipes

**Substantial Cultural Context:**
- Explain origins and significance, not just "this is traditional"
- Include historical background when relevant
- Acknowledge regional variations
- Give credit to the culture that created it

**Honest Adaptations:**
- If you've modified something for ice cream format, say so explicitly
- Explain WHY you made changes (technique, availability, format)
- Don't claim authenticity if you've significantly altered it
- Example: "Traditional kulfi doesn't use eggs—I've added them here for custard texture, which makes this a hybrid approach"

**Ethical Sourcing Guidance:**
- For indigenous ingredients (wattleseed, pawpaw, etc.), discuss sourcing ethics
- Provide guidance on supporting indigenous producers
- Acknowledge access limitations
- Offer substitutes when appropriate, explain why they're different

**What This Is NOT:**
- Appropriation that erases cultural significance
- Claiming authenticity while changing everything
- Shallow "exotic" positioning
- Fetishizing or "othering" international cuisines

### Examples of Good Cultural Notes

**Good:**
> "Ube (purple yam) is central to Filipino cuisine, used in everything from halo-halo to pandesal. It's not just about the color—it has this subtly sweet, almost vanilla-like flavor that's completely distinct from regular sweet potatoes. Using actual ube, not ube extract, matters here."

**Bad:**
> "Ube is a purple thing from the Philippines. It's trendy now. Looks cool."

---

## Common Pitfalls to Avoid

### Voice Problems

**Too formal:** "One should ensure..." becomes "Make sure you..."

**Too apologetic:** "Sorry, but this is really important" becomes "This is fucking important"

**Excessive profanity:** More than 5-6 per recipe feels forced, not emphatic

**Corporate safety manual:** "Monitor carefully" becomes "Watch this like a hawk"

### Cultural Problems

- Claiming authenticity when you've modified significantly
- No explanation of WHY substitutions were made
- Shallow cultural notes: "This is traditional" with no depth
- Ignoring ethical sourcing for indigenous ingredients

### Technical Problems

- Estimating churn times: "20-25 minutes" should be "Until soft-serve consistency"
- Vague guidance: "cook until done" should be "cook until golden and fragrant"
- Over-explaining basic concepts reader definitely knows

### Structural Problems

- Missing difficulty rating explanation
- No make-ahead guidance for multi-component recipes
- Allergen notes for milk/eggs (don't bother, this is ice cream)
- Missing allergen notes for tree nuts (must include)
- Long teaching moments in instructions (move to Notes)

---

## Formatting Checklist

**Every recipe must have:**
- [ ] Clean title (plain text only, no emojis/symbols)
- [ ] Italicized tagline
- [ ] Difficulty rating with HOMIE-style explanation paragraph
- [ ] Total time with funny parenthetical (including all passive time)
- [ ] Opening paragraph(s) with context/warnings
- [ ] Grouped ingredient lists with bold headers
- [ ] Instruction sections with bold component headers
- [ ] Notes section with bold note titles
- [ ] Cultural context note (for international recipes)
- [ ] "What it tastes like" as final note
- [ ] Allergen information (if contains nuts/wheat/soy/etc.)
- [ ] Make-ahead guidance (if components can be prepped ahead)
- [ ] Proper encoding (no corrupted characters)
- [ ] HOMIE voice throughout (3-5 profanities, casual address, anticipation)
- [ ] 2-4 teaching moments
- [ ] NO non-text characters anywhere (emojis, symbols, decorative Unicode)

---

## Review Process

When reviewing a recipe, check in this order:

1. **Non-text characters:** Scan entire recipe for emojis, symbols, decorative Unicode—MUST be removed
2. **Encoding:** Scan for corrupted characters (garbled UTF-8 like `â€"` or `Ã©`)
3. **Structure:** Verify difficulty explanation and total time with parenthetical are present and use HOMIE voice
4. **Allergens:** Correct noting (nuts yes, milk/eggs no, vegan called out)
5. **Voice:** Count profanity (3-5?), check for "homie/dude/pal" usage, verify conversational tone
6. **Cultural depth:** International recipes have substantive cultural context?
7. **Teaching moments:** 2-4 present? Good depth?
8. **Technical clarity:** Temps, times, visual cues all present?
9. **Notes completeness:** Sourcing, technique, culture, "what it tastes like" all covered?

---

## Master Examples

**For overall structure and voice:** Recipe 13 (Atole de Anis)
**For cultural depth:** Recipe 07 (Wattleseed & Macadamia), Recipe 03 (Cardamom-Pistachio Kulfi)
**For teaching moments:** Recipe 17 (Brown Butter Pecan)
**For honest complexity management:** Recipe 27 (New Orleans Chicory Coffee & Beignet)
**For accessibility without eggs:** Recipe 03 (Cardamom-Pistachio Kulfi), Recipe 02 (Sinh Tố Bơ)

**Note:** All recipes now follow the complete metadata format (Difficulty + Total Time with HOMIE-style explanations). The book includes a comprehensive Custard Fundamentals section that individual recipes reference rather than repeat.

---

## Quick Reference Card

**THE RULES (for when you just need a checklist):**

- Plain text only—no emojis, no symbols, no decorative Unicode
- Proper encoding—fix corrupted characters on sight
- NO nationalities in titles—use regions, cities, or dish names
- Difficulty + Total Time with HOMIE explanations—required
- 3-5 strategic profanities per recipe for emphasis
- 2-4 teaching moments per recipe
- Allergens for nuts/wheat/soy only (not milk/eggs)
- Cultural context for international recipes—go deep
- "What it tastes like" as final note—always
- Churning: describe doneness, never estimate time
- Voice: conversational, self-deprecating, technically accurate

---

*Last Updated: Cleaned up encoding, consolidated redundant sections, applied HOMIE voice throughout because if we're writing a book about fucking up ice cream, the style guide should own that too.*
