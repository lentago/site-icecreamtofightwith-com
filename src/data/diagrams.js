// Field diagrams — ported verbatim from the Claude Design project
// "Ice Cream Blog Redesign" (data/diagrams.js), which adapted the 12
// logic-checked faux-science figures drafted for the book. Additions over
// the design data: chile-chocolate also maps to fig10 (its orange peel gets
// the same triple-blanch the figure explains), and coffee-berbere maps to
// fig11 (its spiced brittle does the same baking-soda-in-molten-sugar foam).
// The mappings carry inline anchors; figures are injected next to the step
// they explain by the rehypeRecipeSections plugin in src/lib/sections.mjs.

export const diagrams = {
 "figures": {
  "fig0": {
   "fig": "Fig. 0",
   "title": "Sanity remaining vs. difficulty tier",
   "noteType": "checked",
   "svg": "<svg viewBox=\"0 0 680 360\" role=\"img\" aria-label=\"A curve of sanity dropping as recipe difficulty rises, ending with a stick figure on fire.\">\n<g filter=\"url(#sketch)\" fill=\"none\" stroke=\"#17130F\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n<path d=\"M70,40 L70,300 L640,300\"/>\n<path d=\"M64,54 L70,40 L76,54\"/><path d=\"M626,294 L640,300 L626,306\"/>\n<path d=\"M70,74 C210,80 300,100 400,150 C470,186 520,250 590,296\" stroke=\"#A32B29\" stroke-width=\"3.2\"/>\n</g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\" fill=\"#17130F\">\n<text x=\"18\" y=\"60\" font-size=\"13\" font-weight=\"700\" transform=\"rotate(-90 18,60)\">SANITY REMAINING</text>\n<text x=\"70\" y=\"332\" font-size=\"12\">CHILL</text><text x=\"215\" y=\"332\" font-size=\"12\">LEGIT</text><text x=\"360\" y=\"332\" font-size=\"12\">THE REAL DEAL</text>\n<text x=\"520\" y=\"332\" font-size=\"12\" fill=\"#A32B29\" font-weight=\"700\">A FUCKING ORDEAL</text>\n<text x=\"150\" y=\"66\" font-size=\"12.5\" fill=\"#6E6456\">\"this is fine\"</text></g>\n<g filter=\"url(#sketch)\" transform=\"translate(588,250)\" stroke=\"#17130F\" stroke-width=\"2.4\" fill=\"none\" stroke-linecap=\"round\">\n<circle cx=\"0\" cy=\"0\" r=\"9\"/><path d=\"M0,9 L0,34 M0,16 L-12,26 M0,16 L12,26 M0,34 L-10,50 M0,34 L10,50\"/>\n<path d=\"M-9,-10 C-6,-20 -2,-14 0,-22 C2,-14 6,-20 9,-10\" stroke=\"#A32B29\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\"><text x=\"560\" y=\"228\" font-size=\"12\" fill=\"#A32B29\" font-weight=\"700\">you are here</text></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\"><text x=\"420\" y=\"292\" font-size=\"11\" fill=\"#6E6456\">(not to scale. obviously.)</text></g>\n</svg>",
   "caption": "Buckle up, chief. The x-axis is real — those are the four tiers straight out of the difficulty chapter. The y-axis is your **will to live**. Start left. Please start left.",
   "note": "Pure gag, no math claimed, and it says so on the tin. The tier labels match the difficulty chapter exactly."
  },
  "fig1": {
   "fig": "Fig. 1",
   "title": "Tempering: staircase, not cliff-dive",
   "noteType": "checked",
   "svg": "<svg viewBox=\"0 0 680 380\" role=\"img\" aria-label=\"Two paths from 50 to 175 degrees: a straight cliff that scrambles the eggs, and a staircase that arrives safely.\">\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\" fill=\"#17130F\"><text x=\"16\" y=\"210\" font-size=\"13\" font-weight=\"700\" transform=\"rotate(-90 16,210)\">EGG TEMPERATURE</text></g>\n<g filter=\"url(#sketch)\" fill=\"none\" stroke=\"#A32B29\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M120,320 L120,70\"/><path d=\"M108,90 L120,70 L132,90\"/></g>\n<g filter=\"url(#sketch)\" transform=\"translate(120,300)\" stroke=\"#17130F\" stroke-width=\"2.2\" fill=\"none\" stroke-linecap=\"round\"><g transform=\"rotate(150 0 0)\"><circle cx=\"0\" cy=\"0\" r=\"8\"/><path d=\"M0,8 L0,28 M0,14 L-11,8 M0,14 L11,20 M0,28 L-9,42 M0,28 L9,42\"/></g></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\"><text x=\"52\" y=\"60\" font-size=\"12.5\" font-weight=\"700\" fill=\"#A32B29\">175°F</text><text x=\"60\" y=\"338\" font-size=\"12.5\" fill=\"#6E6456\">50°F</text><text x=\"150\" y=\"150\" font-size=\"13\" font-weight=\"700\" fill=\"#A32B29\">ONE LEAP.</text><text x=\"150\" y=\"168\" font-size=\"12.5\" fill=\"#17130F\">50 → 175°F</text></g>\n<g filter=\"url(#sketch)\" transform=\"translate(150,330)\" fill=\"none\" stroke=\"#A32B29\" stroke-width=\"2.2\" stroke-linecap=\"round\"><path d=\"M-30,8 q10,-14 20,0 q10,-14 20,0 q10,-14 20,0\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\"><text x=\"120\" y=\"356\" font-size=\"12\" font-weight=\"700\" fill=\"#A32B29\">SCRAMBLED. EGGS.</text></g>\n<g filter=\"url(#sketch)\" fill=\"none\" stroke=\"#2E8B6A\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M380,320 L470,320 L470,235 L545,235 L545,150 L620,150 L620,72 L648,72\"/></g>\n<g filter=\"url(#sketch)\" transform=\"translate(400,300)\" stroke=\"#17130F\" stroke-width=\"2.2\" fill=\"none\" stroke-linecap=\"round\"><circle cx=\"0\" cy=\"0\" r=\"8\"/><path d=\"M0,8 L0,26 M0,13 L-11,20 M0,13 L11,6 M0,26 L-9,40 M0,26 L11,38\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\" fill=\"#17130F\"><text x=\"440\" y=\"340\" font-size=\"12\">~50°F</text><text x=\"486\" y=\"228\" font-size=\"12\">~100°F</text><text x=\"560\" y=\"66\" font-size=\"12\" fill=\"#2E8B6A\" font-weight=\"700\">175°F ✓</text><text x=\"392\" y=\"150\" font-size=\"13\" font-weight=\"700\" fill=\"#2E8B6A\">warm 'em up</text><text x=\"392\" y=\"168\" font-size=\"12.5\" fill=\"#17130F\">in stages</text></g>\n</svg>",
   "caption": "Dump cold yolks into hot cream and you get breakfast, not dessert. Ladle a little hot cream **into** the yolks first — 50 to ~100 — **then** back into the pot. Same summit, no splat.",
   "note": "The 50/100/175°F numbers are illustrative. The real reason tempering works isn't the average temp — it's dodging a **local hot-spot** at the yolk surface that sets protein instantly. Every step stays smaller than the fatal single jump. Physically sound."
  },
  "fig2": {
   "fig": "Fig. 2",
   "title": "The nappe window (and the cliff past it)",
   "noteType": "checked",
   "svg": "<svg viewBox=\"0 0 680 380\" role=\"img\" aria-label=\"A vertical thermometer showing a narrow safe custard window around 170 to 175 degrees and a scrambled-eggs zone above 185.\">\n<g filter=\"url(#sketch)\"><rect x=\"150\" y=\"40\" width=\"46\" height=\"286\" rx=\"23\" fill=\"#fff\" stroke=\"#17130F\" stroke-width=\"2.6\"/><circle cx=\"173\" cy=\"344\" r=\"30\" fill=\"#A32B29\" stroke=\"#17130F\" stroke-width=\"2.6\"/><rect x=\"161\" y=\"150\" width=\"24\" height=\"200\" fill=\"#A32B29\"/></g>\n<g opacity=\"0.85\"><rect x=\"204\" y=\"60\" width=\"150\" height=\"46\" fill=\"#A32B29\" opacity=\".16\"/><rect x=\"204\" y=\"110\" width=\"150\" height=\"34\" fill=\"#C98A22\" opacity=\".22\"/><rect x=\"204\" y=\"146\" width=\"150\" height=\"40\" fill=\"#2E8B6A\" opacity=\".22\"/><rect x=\"204\" y=\"188\" width=\"150\" height=\"70\" fill=\"#2F6F80\" opacity=\".14\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\" fill=\"#17130F\"><text x=\"360\" y=\"82\" font-size=\"13\" font-weight=\"700\" fill=\"#A32B29\">185°F+ · SCRAMBLED</text><text x=\"360\" y=\"98\" font-size=\"11.5\" fill=\"#6E6456\">start the fuck over</text><text x=\"360\" y=\"130\" font-size=\"13\" font-weight=\"700\" fill=\"#a9791a\">~180°F · DANGER</text><text x=\"360\" y=\"146\" font-size=\"11.5\" fill=\"#6E6456\">keep stirring, move</text><text x=\"360\" y=\"170\" font-size=\"14\" font-weight=\"700\" fill=\"#2E8B6A\">170–175°F · NAPPE ✓</text><text x=\"360\" y=\"186\" font-size=\"11.5\" fill=\"#6E6456\">coats the spoon</text><text x=\"360\" y=\"224\" font-size=\"13\" font-weight=\"700\" fill=\"#2F6F80\">&lt;168°F · SOUP</text><text x=\"360\" y=\"240\" font-size=\"11.5\" fill=\"#6E6456\">not done, chief</text></g>\n<g><g filter=\"url(#sketch)\" fill=\"#17130F\" stroke=\"#17130F\"><path d=\"M120,166 L150,166 M132,158 L120,166 L132,174\" fill=\"none\" stroke-width=\"2.6\" stroke-linecap=\"round\"/></g><g font-family=\"ui-sans-serif, system-ui, sans-serif\"><text x=\"18\" y=\"163\" font-size=\"12\" font-weight=\"700\" fill=\"#2E8B6A\">aim</text><text x=\"18\" y=\"178\" font-size=\"12\" font-weight=\"700\" fill=\"#2E8B6A\">here</text></g></g>\n<g filter=\"url(#sketch)\" transform=\"translate(490,60)\" stroke=\"#17130F\" stroke-width=\"1.8\" fill=\"#fff\"><circle cx=\"0\" cy=\"0\" r=\"11\"/><circle cx=\"-4\" cy=\"-1\" r=\"2.2\" fill=\"#17130F\"/><circle cx=\"4\" cy=\"-1\" r=\"2.2\" fill=\"#17130F\"/><path d=\"M-5,7 L-3,4 L-1,7 L1,4 L3,7 L5,4\" fill=\"none\"/></g>\n</svg>",
   "caption": "The whole game lives in a **~10-degree band**. Below it, soup. Above 185, you built an omelette in denial. Pull it at 175 and trust the spoon-line.",
   "note": "Honored the 170–175°F target; the ~185°F scramble line is real (yolk proteins fully coagulate ~185°F, nudged higher by sugar and dairy). Pro crème anglaise sometimes pushes to ~180–182°F — still inside 'danger, keep moving.'"
  },
  "fig3": {
   "fig": "Fig. 3",
   "title": "Ice bath vs. letting it sit",
   "noteType": "checked",
   "svg": "<svg viewBox=\"0 0 680 360\" role=\"img\" aria-label=\"Temperature over time: an ice-bath curve plunges out of the grainy zone fast while the fridge-only curve lingers in it.\">\n<g filter=\"url(#sketch)\" fill=\"none\" stroke=\"#17130F\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M70,40 L70,300 L640,300\"/><path d=\"M64,54 L70,40 L76,54\"/><path d=\"M626,294 L640,300 L626,306\"/></g>\n<rect x=\"70\" y=\"70\" width=\"570\" height=\"46\" fill=\"#A32B29\" opacity=\".13\"/>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\"><text x=\"360\" y=\"98\" font-size=\"12\" font-weight=\"700\" fill=\"#A32B29\">GRAIN ZONE (175–185°F) — don't linger</text></g>\n<g filter=\"url(#sketch)\" fill=\"none\" stroke-width=\"3\" stroke-linecap=\"round\"><path d=\"M70,96 C90,82 110,84 140,96 C230,128 330,168 640,236\" stroke=\"#a9791a\"/><path d=\"M70,96 C96,150 120,232 180,270 C260,292 420,296 640,298\" stroke=\"#2F6F80\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\" fill=\"#17130F\"><text x=\"16\" y=\"200\" font-size=\"13\" font-weight=\"700\" transform=\"rotate(-90 16,200)\">TEMPERATURE</text><text x=\"330\" y=\"330\" font-size=\"12.5\">TIME →</text><text x=\"360\" y=\"180\" font-size=\"12.5\" font-weight=\"700\" fill=\"#a9791a\">fridge only: dwells hot, hours of</text><text x=\"360\" y=\"196\" font-size=\"12.5\" fill=\"#6E6456\">opening the door like it helps (it doesn't)</text><text x=\"196\" y=\"256\" font-size=\"12.5\" font-weight=\"700\" fill=\"#2F6F80\">ice bath: out in ~25 min</text></g>\n</svg>",
   "caption": "That custard is still hot enough to cook itself off the heat. The fridge-only path **parks in the grain zone** and sulks for hours. The ice bath yanks it out before it can betray you.",
   "note": "Carryover cooking is real, and cooling follows Newton's law (exponential decay toward ambient). The ice bath's bigger temperature gap and better contact make a genuinely steeper curve. Axes are qualitative on purpose."
  },
  "fig4": {
   "fig": "Fig. 4",
   "title": "The browning gauge",
   "noteType": "corrected",
   "svg": "<svg viewBox=\"0 0 680 300\" role=\"img\" aria-label=\"A horizontal temperature track from steaming to Maillard flavor to arson.\">\n<g filter=\"url(#sketch)\"><rect x=\"60\" y=\"120\" width=\"120\" height=\"40\" fill=\"#2F6F80\" opacity=\".30\" stroke=\"#17130F\" stroke-width=\"2\"/><rect x=\"180\" y=\"120\" width=\"120\" height=\"40\" fill=\"#e9d9b0\" stroke=\"#17130F\" stroke-width=\"2\"/><rect x=\"300\" y=\"120\" width=\"150\" height=\"40\" fill=\"#C98A22\" opacity=\".55\" stroke=\"#17130F\" stroke-width=\"2\"/><rect x=\"450\" y=\"120\" width=\"80\" height=\"40\" fill=\"#7a4a1e\" stroke=\"#17130F\" stroke-width=\"2\"/><rect x=\"530\" y=\"120\" width=\"90\" height=\"40\" fill=\"#A32B29\" stroke=\"#17130F\" stroke-width=\"2\"/></g>\n<g filter=\"url(#sketch)\" fill=\"none\" stroke=\"#7a4a1e\" stroke-width=\"2\" stroke-linecap=\"round\" opacity=\".8\"><path d=\"M330,116 q8,-16 0,-30 q-8,-14 0,-28\"/><path d=\"M375,116 q8,-16 0,-30 q-8,-14 0,-28\"/><path d=\"M420,116 q8,-16 0,-30 q-8,-14 0,-28\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\" fill=\"#17130F\"><text x=\"66\" y=\"112\" font-size=\"12\" font-weight=\"700\" fill=\"#2F6F80\">STEAM</text><text x=\"66\" y=\"182\" font-size=\"11\" fill=\"#6E6456\">wet · pale · boring</text><text x=\"310\" y=\"112\" font-size=\"12.5\" font-weight=\"700\" fill=\"#7a4a1e\">MAILLARD — flavor town</text><text x=\"360\" y=\"182\" font-size=\"11\" fill=\"#6E6456\">brown = new flavor compounds</text><text x=\"536\" y=\"112\" font-size=\"12\" font-weight=\"700\" fill=\"#A32B29\">ARSON</text><text x=\"512\" y=\"182\" font-size=\"11\" fill=\"#6E6456\">carbon · regret</text><text x=\"168\" y=\"210\" font-size=\"11\">212°F</text><text x=\"288\" y=\"210\" font-size=\"11\">~300</text><text x=\"438\" y=\"210\" font-size=\"11\">~375</text><text x=\"518\" y=\"210\" font-size=\"11\">400°F+</text></g>\n<g filter=\"url(#sketch)\" fill=\"none\" stroke=\"#17130F\" stroke-width=\"1.6\"><path d=\"M180,164 L180,196 M300,164 L300,196 M450,164 L450,196 M530,164 L530,196\"/></g>\n</svg>",
   "caption": "Water's still around? You're **steaming**, and steaming is beige and dull. The good stuff starts once the surface dries and hits browning temps. Blink past 400 and you've committed arson.",
   "note": "The first pass called browning impossible below the boil — too strong. Maillard is time AND temperature: it crawls along while the surface stays wet and pinned near 212°F, which is exactly how dulce de leche browns over hours. **Fast** browning needs the surface to dry out and climb past ~300°F; scorching hits ~400°F+. And true Maillard (amino acids + reducing sugars) isn't caramelization (sugar alone) — the gauge covers both routes."
  },
  "fig5": {
   "fig": "Fig. 5",
   "title": "Does the emulsion hold?",
   "noteType": "checked",
   "svg": "<svg viewBox=\"0 0 680 320\" role=\"img\" aria-label=\"Left: fat droplets each coated in lecithin, evenly suspended. Right: a broken emulsion with oil pooling on top of water.\">\n<g filter=\"url(#sketch)\"><rect x=\"40\" y=\"40\" width=\"270\" height=\"230\" rx=\"10\" fill=\"#fff\" stroke=\"#17130F\" stroke-width=\"2.4\"/></g>\n<g filter=\"url(#sketch)\" stroke=\"#17130F\" stroke-width=\"1.6\"><g fill=\"#C98A22\" opacity=\".85\"><circle cx=\"95\" cy=\"95\" r=\"15\"/><circle cx=\"170\" cy=\"80\" r=\"13\"/><circle cx=\"245\" cy=\"100\" r=\"16\"/><circle cx=\"120\" cy=\"160\" r=\"14\"/><circle cx=\"205\" cy=\"150\" r=\"15\"/><circle cx=\"90\" cy=\"220\" r=\"13\"/><circle cx=\"175\" cy=\"215\" r=\"16\"/><circle cx=\"255\" cy=\"200\" r=\"13\"/></g></g>\n<g fill=\"#2F6F80\"><circle cx=\"95\" cy=\"78\" r=\"2\"/><circle cx=\"110\" cy=\"95\" r=\"2\"/><circle cx=\"80\" cy=\"100\" r=\"2\"/><circle cx=\"245\" cy=\"82\" r=\"2\"/><circle cx=\"262\" cy=\"102\" r=\"2\"/><circle cx=\"175\" cy=\"197\" r=\"2\"/><circle cx=\"191\" cy=\"215\" r=\"2\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\"><text x=\"88\" y=\"292\" font-size=\"13\" font-weight=\"700\" fill=\"#2E8B6A\">HELD — silky</text></g>\n<g filter=\"url(#sketch)\"><rect x=\"370\" y=\"40\" width=\"270\" height=\"230\" rx=\"10\" fill=\"#fff\" stroke=\"#17130F\" stroke-width=\"2.4\"/></g>\n<g filter=\"url(#sketch)\"><path d=\"M372,120 q60,-24 130,0 q70,24 136,0 L638,42 L372,42 Z\" fill=\"#C98A22\" opacity=\".7\" stroke=\"#17130F\" stroke-width=\"1.6\"/></g>\n<g filter=\"url(#sketch)\"><path d=\"M372,120 q60,-24 130,0 q70,24 136,0 L638,268 L372,268 Z\" fill=\"#2F6F80\" opacity=\".16\" stroke=\"none\"/></g>\n<g fill=\"#C98A22\" stroke=\"#17130F\" stroke-width=\"1.4\"><circle cx=\"470\" cy=\"185\" r=\"18\" opacity=\".7\"/><circle cx=\"560\" cy=\"215\" r=\"14\" opacity=\".7\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\" fill=\"#17130F\"><text x=\"430\" y=\"70\" font-size=\"11.5\">oil slick</text><text x=\"470\" y=\"245\" font-size=\"11.5\" fill=\"#2F6F80\">water</text><text x=\"405\" y=\"292\" font-size=\"13\" font-weight=\"700\" fill=\"#A32B29\">BROKEN — oily mess</text></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\"><circle cx=\"360\" cy=\"304\" r=\"3\" fill=\"#2F6F80\"/><text x=\"370\" y=\"308\" font-size=\"11\" fill=\"#6E6456\">= lecithin (from the yolk), refereeing fat &amp; water</text></g>\n</svg>",
   "caption": "Yolk lecithin is the bouncer keeping fat and water on speaking terms. Add oil **slow** and it wraps every droplet. Dump it in fast and the fat quits, pools up top, and you've got salad dressing nobody ordered.",
   "note": "Mechanism correct: lecithin is an emulsifier coating fat droplets so they stay dispersed; 'broken' means droplets coalescing and separating by density."
  },
  "fig6": {
   "fig": "Fig. 6",
   "title": "Why sugar & booze keep it scoopable",
   "noteType": "checked",
   "svg": "<svg viewBox=\"0 0 680 330\" role=\"img\" aria-label=\"Left: clean ice lattice, brick-hard. Right: sugar and alcohol molecules jamming the lattice, scoopable.\">\n<g filter=\"url(#sketch)\" fill=\"none\" stroke=\"#2F6F80\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M70,90 l30,-18 l30,18 l0,34 l-30,18 l-30,-18 Z\"/><path d=\"M130,90 l30,-18 l30,18 l0,34 l-30,18 l-30,-18 Z\"/><path d=\"M100,142 l30,-18 l30,18 l0,34 l-30,18 l-30,-18 Z\"/><path d=\"M160,142 l30,-18 l30,18 l0,34 l-30,18 l-30,-18 Z\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\"><text x=\"70\" y=\"230\" font-size=\"12.5\" font-weight=\"700\" fill=\"#2F6F80\">pure water →</text><text x=\"70\" y=\"248\" font-size=\"12.5\" fill=\"#17130F\">brick-hard</text></g>\n<g filter=\"url(#sketch)\" fill=\"none\" stroke=\"#2F6F80\" stroke-width=\"2\" stroke-linecap=\"round\" opacity=\".8\"><path d=\"M420,86 l26,-16 l26,16 l0,30\"/><path d=\"M498,132 l26,-16 l26,16\"/><path d=\"M446,150 l0,30 l26,16\"/><path d=\"M540,96 l0,30\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\" font-weight=\"700\"><circle cx=\"470\" cy=\"120\" r=\"14\" fill=\"#C98A22\" stroke=\"#17130F\" stroke-width=\"1.4\"/><text x=\"463\" y=\"125\" font-size=\"12\" fill=\"#17130F\">S</text><circle cx=\"516\" cy=\"160\" r=\"14\" fill=\"#C98A22\" stroke=\"#17130F\" stroke-width=\"1.4\"/><text x=\"509\" y=\"165\" font-size=\"12\" fill=\"#17130F\">S</text><circle cx=\"470\" cy=\"175\" r=\"13\" fill=\"#A32B29\" stroke=\"#17130F\" stroke-width=\"1.4\"/><text x=\"459\" y=\"179\" font-size=\"10\" fill=\"#fff\">OH</text></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\"><text x=\"410\" y=\"230\" font-size=\"12.5\" font-weight=\"700\" fill=\"#2E8B6A\">+ sugar + a splash of rum →</text><text x=\"410\" y=\"248\" font-size=\"12.5\" fill=\"#17130F\">stays scoopable</text></g>\n<g filter=\"url(#sketch)\"><rect x=\"255\" y=\"270\" width=\"380\" height=\"44\" rx=\"6\" fill=\"#fff\" stroke=\"#17130F\" stroke-width=\"2\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\" fill=\"#17130F\"><text x=\"270\" y=\"298\" font-size=\"15\" font-weight=\"700\">ΔT_f = i · K_f · m</text><text x=\"410\" y=\"290\" font-size=\"11\" fill=\"#6E6456\">sugar alone ≈ 1.6°C softer.</text><text x=\"410\" y=\"305\" font-size=\"11\" fill=\"#6E6456\">a shot of rum ≈ another ~1°C.</text></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\"><text x=\"255\" y=\"332\" font-size=\"11\" fill=\"#A32B29\">…half a cup of rum? congrats, it's soup — it never sets.</text></g>\n</svg>",
   "caption": "Dissolved sugar and alcohol crash the ice-crystal party — the lattice can't lock up solid, so it scoops instead of shattering your spoon. Which is **also** why the drunk recipes stay soft, and why too much booze never freezes at all.",
   "note": "Real equation, real number. Colligative freezing-point depression ΔT_f = i·K_f·m, K_f(water)=1.86. About 150 g sucrose in ~500 g water ≈ 0.88 molal → **ΔT_f ≈ 1.6°C** from sugar alone. Ethanol adds ~1°C for a couple tbsp; a half-cup overwhelms it."
  },
  "fig7": {
   "fig": "Fig. 7",
   "title": "The sugar-stage ladder",
   "noteType": "checked",
   "svg": "<svg viewBox=\"0 0 680 340\" role=\"img\" aria-label=\"A vertical candy thermometer with soft-ball, firm-ball, hard-ball, soft-crack, hard-crack and caramel stages labeled with temperatures.\">\n<g filter=\"url(#sketch)\"><rect x=\"150\" y=\"26\" width=\"40\" height=\"278\" rx=\"20\" fill=\"#fff\" stroke=\"#17130F\" stroke-width=\"2.4\"/><circle cx=\"170\" cy=\"316\" r=\"24\" fill=\"#A32B29\" stroke=\"#17130F\" stroke-width=\"2.4\"/><rect x=\"160\" y=\"150\" width=\"20\" height=\"166\" fill=\"#A32B29\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\" fill=\"#17130F\"><text x=\"210\" y=\"52\" font-size=\"12.5\" font-weight=\"700\">caramel · 320–350°F</text><text x=\"210\" y=\"88\" font-size=\"12.5\" font-weight=\"700\" fill=\"#A32B29\">hard-crack · 300–310°F</text><text x=\"210\" y=\"104\" font-size=\"11\" fill=\"#6E6456\">brittle · honeycomb · glass</text><text x=\"210\" y=\"140\" font-size=\"12.5\">soft-crack · 270–290°F</text><text x=\"210\" y=\"176\" font-size=\"12.5\">hard-ball · 250–266°F</text><text x=\"210\" y=\"212\" font-size=\"12.5\">firm-ball · 245–250°F</text><text x=\"210\" y=\"248\" font-size=\"12.5\" font-weight=\"700\" fill=\"#2E8B6A\">soft-ball · 235–240°F</text><text x=\"210\" y=\"264\" font-size=\"11\" fill=\"#6E6456\">bocadillo · fudge · brigadeiro</text><text x=\"210\" y=\"298\" font-size=\"12.5\">thread · 230–235°F</text></g>\n<g><g filter=\"url(#sketch)\" fill=\"none\" stroke=\"#A32B29\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M120,92 L150,92 M132,84 L120,92 L132,100\"/></g></g>\n<g filter=\"url(#sketch)\" fill=\"none\" stroke=\"#2E8B6A\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M120,244 L150,244 M132,236 L120,244 L132,252\"/></g>\n</svg>",
   "caption": "Same pot of sugar, wildly different endings. Ten degrees is the difference between a chewy caramel and a pane of amber glass. This is why the candy recipes make you **own a thermometer**.",
   "note": "Temperatures match standard confectionery stages: thread 230–235, soft-ball 235–240, firm 245–250, hard-ball 250–266, soft-crack 270–290, hard-crack 300–310, caramel 320–350°F."
  },
  "fig8": {
   "fig": "Fig. 8",
   "title": "Two different alarms",
   "noteType": "checked",
   "svg": "<svg viewBox=\"0 0 680 330\" role=\"img\" aria-label=\"A tongue wired to a brain by two nerves: capsaicin firing burn via TRPV1, and sanshool firing a fifty hertz buzz via touch fibers.\">\n<g filter=\"url(#sketch)\"><path d=\"M300,40 q-40,-24 -70,4 q-40,-6 -34,34 q-30,18 -2,44 q6,34 46,26 q26,20 56,2 q34,10 44,-24 q28,-22 2,-48 q4,-38 -42,-38 Z\" fill=\"#fff\" stroke=\"#17130F\" stroke-width=\"2.2\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\"><text x=\"256\" y=\"98\" font-size=\"12\" fill=\"#6E6456\">brain</text></g>\n<g filter=\"url(#sketch)\"><path d=\"M250,290 q40,-40 90,-40 q50,0 90,40 q-45,26 -90,26 q-45,0 -90,-26 Z\" fill=\"#A32B29\" opacity=\".22\" stroke=\"#17130F\" stroke-width=\"2.2\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\"><text x=\"316\" y=\"300\" font-size=\"12\" fill=\"#6E6456\">tongue</text></g>\n<g filter=\"url(#sketch)\" fill=\"none\" stroke=\"#A32B29\" stroke-width=\"3\" stroke-linecap=\"round\"><path d=\"M300,250 q-40,-60 -30,-110 q6,-30 -6,-60\"/></g>\n<g filter=\"url(#sketch)\" fill=\"none\" stroke=\"#2F6F80\" stroke-width=\"3\" stroke-linecap=\"round\"><path d=\"M360,250 q46,-60 40,-112 q-4,-30 8,-58\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\"><text x=\"70\" y=\"150\" font-size=\"13\" font-weight=\"700\" fill=\"#A32B29\">capsaicin</text><text x=\"70\" y=\"167\" font-size=\"12\" fill=\"#17130F\">→ TRPV1 (heat/pain)</text><text x=\"70\" y=\"184\" font-size=\"13\" font-weight=\"700\" fill=\"#A32B29\">= BURN</text><text x=\"470\" y=\"150\" font-size=\"13\" font-weight=\"700\" fill=\"#2F6F80\">hydroxy-α-sanshool</text><text x=\"470\" y=\"167\" font-size=\"12\" fill=\"#17130F\">→ touch fibers (RA1)</text><text x=\"470\" y=\"184\" font-size=\"13\" font-weight=\"700\" fill=\"#2F6F80\">= BUZZ ≈ 50 Hz</text></g>\n</svg>",
   "caption": "'Mala' isn't extra heat — it's a **completely different wire**. The chile burns you; the Sichuan peppercorn makes your lip **vibrate** like a tiny phone on silent. Two signals, two channels, one very confused mouth.",
   "note": "Accurate neuroscience: capsaicin activates the TRPV1 heat/pain channel; hydroxy-α-sanshool activates light-touch (RA1/Meissner) fibers and is perceived as a ~50 Hz tingle. Genuinely separate pathways."
  },
  "fig9": {
   "fig": "Fig. 9",
   "title": "Cold turns the heat down",
   "noteType": "checked",
   "svg": "<svg viewBox=\"0 0 680 320\" role=\"img\" aria-label=\"Warm salsa with the TRPV1 gate wide open and lots of burn, versus frozen with the gate nearly shut and little burn.\">\n<g filter=\"url(#sketch)\"><rect x=\"40\" y=\"50\" width=\"270\" height=\"200\" rx=\"12\" fill=\"#fff\" stroke=\"#17130F\" stroke-width=\"2.2\"/></g>\n<g filter=\"url(#sketch)\" fill=\"none\" stroke=\"#A32B29\" stroke-width=\"2\" stroke-linecap=\"round\" opacity=\".8\"><path d=\"M90,110 q10,-16 0,-30 M140,110 q10,-16 0,-30 M190,110 q10,-16 0,-30\"/></g>\n<g filter=\"url(#sketch)\" fill=\"none\" stroke=\"#17130F\" stroke-width=\"2.4\"><path d=\"M110,210 L110,150 M210,210 L210,150\"/></g>\n<g filter=\"url(#sketch)\" fill=\"#A32B29\" opacity=\".7\"><path d=\"M120,205 q40,-40 80,0 Z\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\" fill=\"#17130F\"><text x=\"66\" y=\"80\" font-size=\"13\" font-weight=\"700\" fill=\"#A32B29\">ROOM TEMP</text><text x=\"120\" y=\"145\" font-size=\"11.5\" fill=\"#6E6456\">TRPV1 wide open</text><text x=\"128\" y=\"238\" font-size=\"13\" font-weight=\"700\" fill=\"#A32B29\">\"OW OW OW\"</text></g>\n<g filter=\"url(#sketch)\"><rect x=\"370\" y=\"50\" width=\"270\" height=\"200\" rx=\"12\" fill=\"#fff\" stroke=\"#17130F\" stroke-width=\"2.2\"/></g>\n<g filter=\"url(#sketch)\" stroke=\"#2F6F80\" stroke-width=\"1.8\" stroke-linecap=\"round\"><path d=\"M420,92 l0,20 M410,102 l20,0 M414,95 l12,14 M426,95 l-12,14\"/><path d=\"M590,100 l0,16 M582,108 l16,0\"/></g>\n<g filter=\"url(#sketch)\" fill=\"none\" stroke=\"#17130F\" stroke-width=\"2.4\"><path d=\"M470,210 L470,150 M540,210 L540,150 M470,150 q35,26 70,0\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\" fill=\"#17130F\"><text x=\"396\" y=\"80\" font-size=\"13\" font-weight=\"700\" fill=\"#2F6F80\">FROZEN</text><text x=\"460\" y=\"145\" font-size=\"11.5\" fill=\"#6E6456\">threshold raised</text><text x=\"452\" y=\"238\" font-size=\"13\" font-weight=\"700\" fill=\"#2F6F80\">\"oh, that's nice\"</text></g>\n</svg>",
   "caption": "Same chile, same dose — but freezing **mutes it**. That aggressive room-temp heat mellows into a gentle warm hum once it's cold. Which is exactly why you can get away with more chile than feels sane.",
   "note": "TRPV1 is a heat-gated channel; capsaicin lowers its activation threshold, but at freezer temps the channel sits far from firing, so the same capsaicin reads as far less burn. Cold also dulls volatile aroma."
  },
  "fig10": {
   "fig": "Fig. 10",
   "title": "Triple-blanch: diminishing returns",
   "noteType": "corrected",
   "svg": "<svg viewBox=\"0 0 680 320\" role=\"img\" aria-label=\"Bar chart of bitterness dropping by roughly half with each of three blanches, with an exponential decay curve.\">\n<g filter=\"url(#sketch)\" fill=\"none\" stroke=\"#17130F\" stroke-width=\"2.4\" stroke-linecap=\"round\"><path d=\"M70,40 L70,270 L620,270\"/></g>\n<g filter=\"url(#sketch)\" stroke=\"#17130F\" stroke-width=\"1.8\"><rect x=\"110\" y=\"60\" width=\"80\" height=\"210\" fill=\"#A32B29\" opacity=\".8\"/><rect x=\"245\" y=\"165\" width=\"80\" height=\"105\" fill=\"#C98A22\" opacity=\".8\"/><rect x=\"380\" y=\"217\" width=\"80\" height=\"53\" fill=\"#8aa24a\" opacity=\".85\"/><rect x=\"515\" y=\"243\" width=\"80\" height=\"27\" fill=\"#2E8B6A\" opacity=\".85\"/></g>\n<g filter=\"url(#sketch)\" fill=\"none\" stroke=\"#17130F\" stroke-width=\"2.2\" stroke-dasharray=\"6 6\"><path d=\"M150,60 C210,120 240,150 285,165 C340,190 400,210 420,217 C480,235 520,240 555,243\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\" fill=\"#17130F\"><text x=\"16\" y=\"180\" font-size=\"12.5\" font-weight=\"700\" transform=\"rotate(-90 16,180)\">BITTERNESS</text><text x=\"120\" y=\"290\" font-size=\"12\">raw</text><text x=\"258\" y=\"290\" font-size=\"12\">×1</text><text x=\"393\" y=\"290\" font-size=\"12\">×2</text><text x=\"528\" y=\"290\" font-size=\"12\">×3</text><text x=\"130\" y=\"52\" font-size=\"12\" font-weight=\"700\">100%</text><text x=\"268\" y=\"157\" font-size=\"12\" font-weight=\"700\">~50</text><text x=\"400\" y=\"209\" font-size=\"12\" font-weight=\"700\">~25</text><text x=\"530\" y=\"235\" font-size=\"12\" font-weight=\"700\">~12</text><text x=\"340\" y=\"120\" font-size=\"12.5\" font-weight=\"700\" fill=\"#2E8B6A\">halves each time →</text><text x=\"340\" y=\"138\" font-size=\"11.5\" fill=\"#6E6456\">so you stop at three</text></g>\n</svg>",
   "caption": "Each dunk in fresh water drags out about **half** the bitter compounds that are left. Three rounds gets you ~90% clean. A fourth barely moves the needle — that's why the recipe says three and means it.",
   "note": "The first scan implied near-linear removal. The real physics is **geometric decay**: each blanch strips a roughly constant fraction of the remaining water-soluble bitter compounds (limonin, naringin), so 100→~50→~25→~12. Redrawn accordingly."
  },
  "fig11": {
   "fig": "Fig. 11",
   "title": "Instant foam",
   "noteType": "checked",
   "svg": "<svg viewBox=\"0 0 680 330\" role=\"img\" aria-label=\"Baking soda hitting molten sugar releases CO2, foaming it into an aerated honeycomb that sets fast.\">\n<g filter=\"url(#sketch)\"><path d=\"M90,150 L110,270 L230,270 L250,150 Z\" fill=\"#fff\" stroke=\"#17130F\" stroke-width=\"2.4\"/></g>\n<g filter=\"url(#sketch)\" fill=\"#C98A22\" opacity=\".6\"><path d=\"M104,210 L118,262 L222,262 L236,210 Z\"/></g>\n<g fill=\"none\" stroke=\"#17130F\" stroke-width=\"1.6\"><circle cx=\"140\" cy=\"185\" r=\"10\"/><circle cx=\"175\" cy=\"165\" r=\"14\"/><circle cx=\"205\" cy=\"190\" r=\"9\"/><circle cx=\"165\" cy=\"130\" r=\"8\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\"><text x=\"96\" y=\"292\" font-size=\"12\" fill=\"#6E6456\">molten sugar ~150°C</text></g>\n<g filter=\"url(#sketch)\"><rect x=\"300\" y=\"70\" width=\"330\" height=\"52\" rx=\"6\" fill=\"#fff\" stroke=\"#17130F\" stroke-width=\"2\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\" fill=\"#17130F\"><text x=\"314\" y=\"103\" font-size=\"14.5\" font-weight=\"700\">2 NaHCO₃ → Na₂CO₃ + H₂O + CO₂↑</text><text x=\"314\" y=\"60\" font-size=\"12\" fill=\"#6E6456\">baking soda + heat = gas =</text></g>\n<g filter=\"url(#sketch)\"><rect x=\"360\" y=\"160\" width=\"230\" height=\"120\" rx=\"8\" fill=\"#C98A22\" opacity=\".55\" stroke=\"#17130F\" stroke-width=\"2.2\"/></g>\n<g fill=\"#fff\" stroke=\"#17130F\" stroke-width=\"1.4\"><circle cx=\"405\" cy=\"200\" r=\"12\"/><circle cx=\"450\" cy=\"230\" r=\"16\"/><circle cx=\"505\" cy=\"195\" r=\"13\"/><circle cx=\"545\" cy=\"240\" r=\"11\"/><circle cx=\"420\" cy=\"255\" r=\"10\"/><circle cx=\"500\" cy=\"255\" r=\"14\"/><circle cx=\"560\" cy=\"195\" r=\"9\"/></g>\n<g font-family=\"ui-sans-serif, system-ui, sans-serif\"><text x=\"378\" y=\"300\" font-size=\"12\" font-weight=\"700\" fill=\"#17130F\">set honeycomb — all those holes are CO₂</text></g>\n<g><g font-family=\"ui-sans-serif, system-ui, sans-serif\"><text x=\"330\" y=\"150\" font-size=\"13\" font-weight=\"700\" fill=\"#A32B29\">MOVE FAST (~15 sec)</text></g></g>\n</svg>",
   "caption": "Baking soda hits the hot sugar and **erupts** — a pot-full of CO₂ bubbles in seconds. Pour it before it sets or the foam collapses and you've made a sad amber hockey puck instead of crunchy honeycomb.",
   "note": "Balanced equation. Sodium bicarbonate thermally decomposes: 2 NaHCO₃ → Na₂CO₃ + H₂O + CO₂↑ (atoms balance). The CO₂ foams the molten sugar, which sets around it into the classic aerated structure."
  }
 },
 // Each mapping carries an anchor so the renderer can drop the figure inline,
 // right after the step it explains (see src/lib/sections.mjs). `after` is a
 // heading slug — the slugified `**Bold Step:**` label (or a `### N. Heading`
 // in the essays); the figure lands at the end of that step's block. `section`
 // (a `## Heading` data-section slug) narrows the search or, on its own, drops
 // the figure at the end of that whole section.
 "byRecipe": {
  "horchata": [
   { "fig": "fig4", "after": "cinnamon-sugar-swirl" }
  ],
  "miso-matcha": [
   { "fig": "fig5", "after": "make-custard" }
  ],
  "chili-mango": [
   { "fig": "fig9", "after": "spicy-honey-swirl" }
  ],
  "tarte-tatin": [
   { "fig": "fig4", "after": "roast-apples" }
  ],
  "gochugaru-sesame": [
   { "fig": "fig5", "after": "integrate-black-sesame" }
  ],
  "rum-banana": [
   { "fig": "fig4", "after": "rum-caramelized-bananas" },
   { "fig": "fig6", "after": "make-custard" }
  ],
  "brown-bread": [
   { "fig": "fig4", "after": "brown-bread-crumble" }
  ],
  "atole-de-anis": [
   { "fig": "fig4", "after": "toasted-masa-crumble" }
  ],
  "bocadillo-y-cafe": [
   { "fig": "fig7", "after": "candied-coffee-beans" }
  ],
  "sichuan-plum": [
   { "fig": "fig8", "after": "make-custard" }
  ],
  "brown-butter-pecan": [
   { "fig": "fig4", "after": "brown-butter-for-base" }
  ],
  "tahini-rose": [
   { "fig": "fig5", "after": "integrate-tahini" }
  ],
  "coffee-berbere": [
   { "fig": "fig7", "after": "spiced-coffee-brittle" },
   { "fig": "fig11", "after": "spiced-coffee-brittle" }
  ],
  "earl-grey-burnt-honey": [
   { "fig": "fig7", "after": "honeycomb-candy" },
   { "fig": "fig11", "after": "honeycomb-candy" }
  ],
  "brigadeiro-passion-fruit": [
   { "fig": "fig7", "after": "brigadeiro-fudge-pieces" }
  ],
  "lemon-rosemary-honey": [
   { "fig": "fig5", "after": "make-custard" },
   { "fig": "fig10", "after": "candied-lemon-peel" }
  ],
  "new-orleans-chicory-beignet": [
   { "fig": "fig4", "after": "yeasted-beignet-dough" }
  ],
  "chile-chocolate": [
   { "fig": "fig10", "after": "candied-orange-peel-with-chile" }
  ]
 },
 "byEssay": {
  "difficulty-ratings": [
   { "fig": "fig0", "section": "a-note-on-difficulty" }
  ],
  "custard-fundamentals": [
   { "fig": "fig1", "after": "3-temper-the-yolks" },
   { "fig": "fig2", "after": "4-cook-the-custard" },
   { "fig": "fig3", "after": "6-the-ice-bath" },
   { "fig": "fig6", "after": "7-refrigerate" }
  ]
 }
};
