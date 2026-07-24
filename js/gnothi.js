// Conscious-Healing LLC — Gnōthi Seautón constitution finder
//
// Axis scale used throughout, -2..+2 per answer option (unlisted axes default to 0):
//   T  = Temperature  (-2 Cold  .. +2 Hot)
//   M  = Moisture     (-2 Dry   .. +2 Damp)
//   Te = Tension      (-2 Lax/Depressed .. +2 Tense/Excited)
//   Mv = Movement     (-2 Stagnant .. +2 Overactive)
//
// This is a reflective, educational tool. Nothing here is diagnostic or
// medical, and no answers are stored beyond the current browser session.

const GNOTHI_QUESTIONS = [
  // Section 1 — Hot / Cold
  {
    id: 1, section: 'hotcold', sectionLabel: 'Hot / Cold',
    text: "How does your body typically run?",
    options: [
      { text: "I tend to feel warm, sometimes flushed, and rarely feel cold", w: { T: 2 } },
      { text: "I run pretty average — not especially warm or cool", w: {} },
      { text: "I tend to feel cool, sometimes pale, and get cold easily", w: { T: -2 } },
    ],
  },
  {
    id: 2, section: 'hotcold', sectionLabel: 'Hot / Cold',
    text: "When you're under pressure, what happens?",
    options: [
      { text: "I feel a rush of internal heat and get worked up fast", w: { T: 2, Te: 2 } },
      { text: "It varies depending on the day", w: {} },
      { text: "My energy drops and everything slows down", w: { T: -2, Te: -2 } },
    ],
  },
  {
    id: 3, section: 'hotcold', sectionLabel: 'Hot / Cold',
    text: "How do your hands and feet usually feel?",
    options: [
      { text: "Warm, sometimes almost too warm", w: { T: 1 } },
      { text: "Neither warm nor cold, usually comfortable", w: {} },
      { text: "Cool, and they take a while to warm up", w: { T: -1 } },
    ],
  },

  // Section 2 — Dry / Moist
  {
    id: 4, section: 'drymoist', sectionLabel: 'Dry / Moist',
    text: "How do your skin, hair, or throat tend to feel?",
    options: [
      { text: "Dry — I notice cracking, flaking, or a dry throat often", w: { M: -2 } },
      { text: "Somewhere in between, depending on the season", w: {} },
      { text: "Damp or congested — puffiness, excess moisture, or a wet feeling", w: { M: 2 } },
    ],
  },
  {
    id: 5, section: 'drymoist', sectionLabel: 'Dry / Moist',
    text: "After eating, how do you usually feel?",
    options: [
      { text: "Light and quick to digest", w: { M: -1, Mv: 1 } },
      { text: "Fine, nothing notable either way", w: {} },
      { text: "Heavy, slow, like things sit for a while", w: { M: 1, Mv: -2 } },
    ],
  },
  {
    id: 6, section: 'drymoist', sectionLabel: 'Dry / Moist',
    text: "How would you describe your build and tendency to hold water?",
    options: [
      { text: "Lean, sometimes brittle, I don't hold onto extra water", w: { M: -2 } },
      { text: "Average, doesn't fluctuate much", w: {} },
      { text: "I tend to hold onto water weight or feel puffy easily", w: { M: 2 } },
    ],
  },

  // Section 3 — Three Doshas
  {
    id: 7, section: 'doshas', sectionLabel: 'Three Doshas',
    text: "When under pressure, what's your instinct?",
    options: [
      { text: "My mind races and scatters in a dozen directions", dosha: 'Vata', w: { T: -1, Te: 1, Mv: 2 } },
      { text: "I get sharp, driven, and intensely focused", dosha: 'Pitta', w: { T: 2, Te: 2 } },
      { text: "I want to slow down, withdraw, and be left alone", dosha: 'Kapha', w: { T: -1, Te: -2, Mv: -2 } },
    ],
  },
  {
    id: 8, section: 'doshas', sectionLabel: 'Three Doshas',
    text: "How would you describe your natural build?",
    options: [
      { text: "Light and thin, I have to work to keep weight on", dosha: 'Vata', w: { M: -1, Mv: 1 } },
      { text: "Medium and muscular, I build and lose muscle fairly easily", dosha: 'Pitta', w: { T: 1 } },
      { text: "Solid and heavier-set, I gain weight easily and hold onto it", dosha: 'Kapha', w: { M: 1, Mv: -1 } },
    ],
  },
  {
    id: 9, section: 'doshas', sectionLabel: 'Three Doshas',
    text: "What does your day-to-day rhythm look like?",
    options: [
      { text: "Unpredictable, my schedule and energy shift a lot", dosha: 'Vata', w: { Mv: 2, Te: 1 } },
      { text: "Driven and structured, I like a plan and stick to it", dosha: 'Pitta', w: { T: 1, Te: 2 } },
      { text: "Steady and unhurried, I move at my own pace regardless of pressure", dosha: 'Kapha', w: { Mv: -2, Te: -1 } },
    ],
  },
  {
    id: 10, section: 'doshas', sectionLabel: 'Three Doshas',
    text: "How's your sleep, generally?",
    options: [
      { text: "Light and easily disrupted, I wake up at the smallest thing", dosha: 'Vata', w: { Te: 1, Mv: 1 } },
      { text: "Moderate, decent most nights, occasionally restless", w: {} },
      { text: "Heavy, once I'm out, I'm hard to wake", dosha: 'Kapha', w: { Te: -2, Mv: -2 } },
    ],
  },
  {
    id: 11, section: 'doshas', sectionLabel: 'Three Doshas',
    text: "When you're out of balance, what shows up first?",
    options: [
      { text: "Ungrounded, anxious, scattered", dosha: 'Vata', w: { T: -1, Te: 1, Mv: 1 } },
      { text: "Irritable, critical, quick to snap", dosha: 'Pitta', w: { T: 2, Te: 2 } },
      { text: "Sluggish, withdrawn, unmotivated", dosha: 'Kapha', w: { T: -1, Te: -2, Mv: -2 } },
    ],
  },

  // Section 4 — Five Elements
  {
    id: 12, section: 'elements', sectionLabel: 'Five Elements', element: 'Wood',
    text: "How much does frustration or a “stuck/blocked” feeling show up for you?",
    options: [
      { text: "Rarely, I move through frustration quickly", w: { Te: -1, Mv: 1 } },
      { text: "Sometimes, depending on the situation", w: {} },
      { text: "Often, I carry frustration and feel rigid when blocked", w: { Te: 2, Mv: -2 } },
    ],
  },
  {
    id: 13, section: 'elements', sectionLabel: 'Five Elements', element: 'Fire',
    text: "How much does a restless, overheated, wired feeling show up?",
    options: [
      { text: "Rarely, I stay fairly calm and settled", w: { T: -1, Te: -1 } },
      { text: "Sometimes, especially under stress", w: {} },
      { text: "Often, I run hot and have trouble settling down, especially at night", w: { T: 2, Te: 2 } },
    ],
  },
  {
    id: 14, section: 'elements', sectionLabel: 'Five Elements', element: 'Earth',
    text: "How much does overthinking or a heavy feeling after eating show up?",
    options: [
      { text: "Rarely, my mind and digestion both feel light", w: { M: -1, Mv: 1 } },
      { text: "Sometimes, depending on stress or what I eat", w: {} },
      { text: "Often, my mind churns and food sits heavy", w: { M: 1, Mv: -2, Te: 1 } },
    ],
  },
  {
    id: 15, section: 'elements', sectionLabel: 'Five Elements', element: 'Metal',
    text: "How much does a lingering heaviness or trouble letting go show up?",
    options: [
      { text: "Rarely, I move on from things easily", w: { Mv: 1 } },
      { text: "Sometimes, with certain situations more than others", w: {} },
      { text: "Often, I hold onto things, physically and emotionally, longer than I'd like", w: { Mv: -2, M: 1, Te: 1 } },
    ],
  },
  {
    id: 16, section: 'elements', sectionLabel: 'Five Elements', element: 'Water',
    text: "How much does deep tiredness or a sense of being unsettled show up?",
    options: [
      { text: "Rarely, my energy feels steady and I feel at ease", w: { Mv: 1 } },
      { text: "Sometimes, especially when depleted", w: {} },
      { text: "Often, I feel a bone-deep tiredness or a background sense of unease", w: { T: -2, Mv: -2, Te: 1 } },
    ],
  },

  // Section 5 — Chakra System (Root -> Crown order matters for adjacency)
  {
    id: 17, section: 'chakras', sectionLabel: 'Chakra System', chakra: 'Root',
    text: "How stable and safely rooted do you generally feel?",
    options: [
      { text: "Very stable — I feel grounded most of the time", w: {}, raw: 0 },
      { text: "It varies — some days steady, some days not", w: { Mv: 1, Te: 1 }, raw: 1 },
      { text: "Often unsteady — I rarely feel fully grounded", w: { Mv: 2, Te: 1, T: -1 }, raw: 2 },
    ],
  },
  {
    id: 18, section: 'chakras', sectionLabel: 'Chakra System', chakra: 'Sacral',
    text: "How connected do you feel to pleasure, flow, and creativity right now?",
    options: [
      { text: "Very connected — creativity and enjoyment come easily", w: {}, raw: 0 },
      { text: "Somewhat — it comes and goes", w: {}, raw: 1 },
      { text: "Disconnected — things that used to bring pleasure feel flat or out of reach", w: { Mv: -2, M: 1, Te: -1 }, raw: 2 },
    ],
  },
  {
    id: 19, section: 'chakras', sectionLabel: 'Chakra System', chakra: 'Solar Plexus',
    text: "How much do you feel in control of your own direction?",
    options: [
      { text: "Strongly in control — I trust my own decisions", w: {}, raw: 0 },
      { text: "Somewhat — it depends on the area of my life", w: { Te: 1 }, raw: 1 },
      { text: "Not very — I often feel unsure or pulled off course", w: { Te: 1, Mv: -1, T: -1 }, raw: 2 },
    ],
  },
  {
    id: 20, section: 'chakras', sectionLabel: 'Chakra System', chakra: 'Heart',
    text: "How open or guarded do you feel in your connections with others?",
    options: [
      { text: "Open — I let people in fairly easily", w: {}, raw: 0 },
      { text: "Depends on the person or situation", w: { Te: 1 }, raw: 1 },
      { text: "Guarded — it's hard for me to fully open up", w: { Te: 2, Mv: -1, M: -1 }, raw: 2 },
    ],
  },
  {
    id: 21, section: 'chakras', sectionLabel: 'Chakra System', chakra: 'Throat',
    text: "How easily do your true thoughts and feelings come out when you want them to?",
    options: [
      { text: "Easily — I say what I mean without much trouble", w: {}, raw: 0 },
      { text: "Sometimes — I hold back more than I'd like", w: { Te: 1, Mv: -1 }, raw: 1 },
      { text: "Rarely — I often stay quiet even when I want to speak up", w: { Te: 2, Mv: -2 }, raw: 2 },
    ],
  },
  {
    id: 22, section: 'chakras', sectionLabel: 'Chakra System', chakra: 'Third Eye',
    text: "How clear or foggy does your thinking feel lately?",
    options: [
      { text: "Clear — my thoughts feel sharp and decisive", w: {}, raw: 0 },
      { text: "Mixed — some clarity, some fog", w: {}, raw: 1 },
      { text: "Foggy — I feel indecisive or unclear more often than not", w: { M: 2, Mv: -1, T: -1 }, raw: 2 },
    ],
  },
  {
    id: 23, section: 'chakras', sectionLabel: 'Chakra System', chakra: 'Crown',
    text: "How connected do you feel to something larger than day-to-day life?",
    options: [
      { text: "Strongly connected — I feel part of something bigger", w: {}, raw: 0 },
      { text: "Somewhat — it comes and goes", w: {}, raw: 1 },
      { text: "Disconnected — I often feel isolated or cut off from anything larger", w: { Mv: -2, T: -1, Te: -1 }, raw: 2 },
    ],
  },
];

const GNOTHI_SECTION_ORDER = ['hotcold', 'drymoist', 'doshas', 'elements', 'chakras'];
const GNOTHI_SECTION_TITLES = {
  hotcold: 'Hot / Cold',
  drymoist: 'Dry / Moist',
  doshas: 'Three Doshas',
  elements: 'Five Elements',
  chakras: 'Chakra System',
};

// Herb axis profiles, translated from each herb's stated Energetics on its
// own product page (not explicit client-supplied weights — a reasoned
// mapping of "cold/dry/warm/damp/astringent/etc" onto the same T/M/Te/Mv
// scale, documented per herb, so the three can be ranked against a reading).
// inStock reflects real purchasability (a working Add to Cart button on the
// herb's product page), not just whether a real photo exists yet — all
// three current herbs use a "Coming Soon" *photo* placeholder but are fully
// wired for purchase, so all three are in stock today. Future A-Z entries
// added before their product page is purchase-ready should be set to
// inStock: false so the matcher never recommends something that can't
// actually be bought.
const GNOTHI_MATCH_TARGET = 6;

const GNOTHI_HERBS = [
  {
    id: 'black-walnut', name: 'Black Walnut', url: 'product-black-walnut.html', inStock: true,
    // Cold, dry, highly astringent (tightens lax tissue = Te+), clears damp stagnation (Mv+)
    profile: { T: -2, M: -2, Te: 1, Mv: 1 },
  },
  {
    id: 'calendula', name: 'Calendula', url: 'product-calendula.html', inStock: true,
    // Warm, dry, a toning vulnerary (Te+) that moves stagnant fluid at the surface (Mv+)
    profile: { T: 1, M: -1, Te: 1, Mv: 1 },
  },
  {
    id: 'dandelion', name: 'Dandelion', url: 'product-dandelion.html', inStock: true,
    // Cold, mildly drying (bitter/diuretic), cooling an excited pattern (Te-), moving damp-heat (Mv+)
    profile: { T: -2, M: -1, Te: -1, Mv: 1 },
  },
  // Burdock/Yarrow/Wild Lettuce: the brief that added these herbs supplied
  // { moisture, temperature } "coordinates" (e.g. Black Walnut: moisture 5,
  // temperature -4), but that's a different, larger-magnitude scale than
  // this file's T/M/Te/Mv (roughly -2..+2 per herb) — and its moisture axis
  // is inverted (their positive moisture = drying, ours is damp). Rather
  // than mix scales and skew cosineSimilarity ranking against the existing
  // three, these three profiles are calibrated the same way Black
  // Walnut/Calendula/Dandelion were: read off each herb's own Energetics/
  // Tissue States copy above, at the same magnitude convention. Direction
  // (sign) matches the brief's coordinates in all three cases.
  {
    id: 'burdock', name: 'Burdock', url: 'product-burdock.html', inStock: true,
    // Cool (not cold), mildly drying, alterative that moves stagnation (Mv+); no strong tightening/relaxing signal (Te~0)
    profile: { T: -1, M: -1, Te: 0, Mv: 1 },
  },
  {
    id: 'yarrow', name: 'Yarrow', url: 'product-yarrow.html', inStock: true,
    // Cool-leaning, drying; astringent/toning (Te+) *and* invigorating/diaphoretic (Mv+) at once
    profile: { T: -1, M: -1, Te: 1, Mv: 1 },
  },
  {
    id: 'wild-lettuce', name: 'Wild Lettuce', url: 'product-wild-lettuce.html', inStock: true,
    // Cool, no clear dry/damp signal (M~0); relaxant nervine (Te-) that quiets overactivity (Mv-)
    profile: { T: -1, M: 0, Te: -1, Mv: -1 },
  },
];

// Reference vectors used only to *name* the composite in Ayurvedic/TCM terms
const GNOTHI_DOSHA_SIGNATURES = {
  Vata: { T: -1, Te: 1, Mv: 2 },
  Pitta: { T: 2, Te: 2, Mv: 0 },
  Kapha: { T: -1, Te: -2, Mv: -2 },
};

const GNOTHI_ELEMENT_SIGNATURES = {
  Wood: { Te: 2, Mv: -2 },
  Fire: { T: 2, Te: 2 },
  Earth: { M: 1, Mv: -2, Te: 1 },
  Metal: { Mv: -2, M: 1, Te: 1 },
  Water: { T: -2, Mv: -2, Te: 1 },
};

function dotProduct(a, b) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  let sum = 0;
  keys.forEach((k) => { sum += (a[k] || 0) * (b[k] || 0); });
  return sum;
}

function vectorMagnitude(v) {
  return Math.sqrt(dotProduct(v, v)) || 1;
}

function cosineSimilarity(a, b) {
  return dotProduct(a, b) / (vectorMagnitude(a) * vectorMagnitude(b));
}

// ---------------------------------------------------------------------------
// Chakra adjacency logic
// ---------------------------------------------------------------------------
// Chakra order matters here: Root -> Sacral -> Solar Plexus -> Heart -> Throat
// -> Third Eye -> Crown (matches question order 17-23).
//
// For each chakra, "raw" (0/1/2) reflects how imbalanced that single
// question's chosen answer was. A chakra is an "outlier" if its raw score is
// more than 1 point away from the average raw score across all seven.
//
// Direction for an outlier chakra is read from the sign of (Te - Mv) in its
// own answer weight — a net-positive value reads as leaning tense/excited,
// net-negative reads as leaning lax/stagnant. Neighbors sharing that same
// sign are a "compensating" pattern (weight is deepened in the same
// direction); neighbors with the opposite sign are an "oscillating" pattern
// (Te and Mv are split in opposite directions); non-outlier neighbors (or no
// outlier neighbors at all) leave the chakra "isolated" with no modifier.
function applyChakraAdjacency(chakraAnswers) {
  const rawValues = chakraAnswers.map((c) => c.raw);
  const avg = rawValues.reduce((a, b) => a + b, 0) / rawValues.length;
  const outlierFlags = chakraAnswers.map((c) => Math.abs(c.raw - avg) > 1);

  const modifiers = chakraAnswers.map(() => ({ Te: 0, Mv: 0 }));
  const tags = chakraAnswers.map(() => 'balanced');

  chakraAnswers.forEach((c, i) => {
    if (!outlierFlags[i]) return;

    const dir = Math.sign((c.w.Te || 0) - (c.w.Mv || 0));
    const neighborIdxs = [i - 1, i + 1].filter((n) => n >= 0 && n < chakraAnswers.length);
    const outlierNeighborIdxs = neighborIdxs.filter((n) => outlierFlags[n]);

    if (outlierNeighborIdxs.length === 0) {
      tags[i] = 'isolated';
      return;
    }

    const neighborDirs = outlierNeighborIdxs.map((n) => {
      const nc = chakraAnswers[n];
      return Math.sign((nc.w.Te || 0) - (nc.w.Mv || 0));
    });

    if (neighborDirs.some((d) => d !== 0 && d === dir)) {
      tags[i] = 'compensating';
      modifiers[i].Te += dir;
      modifiers[i].Mv += dir;
    } else if (neighborDirs.some((d) => d !== 0 && d === -dir)) {
      tags[i] = 'oscillating';
      modifiers[i].Te += dir;
      modifiers[i].Mv += -dir;
    } else {
      tags[i] = 'isolated';
    }
  });

  return { tags, modifiers };
}

function computeResults(answers) {
  const totals = { T: 0, M: 0, Te: 0, Mv: 0 };
  const chakraAnswers = [];
  const sectionAnswerLog = { hotcold: [], drymoist: [], doshas: [], elements: [], chakras: [] };

  answers.forEach((ans) => {
    const q = GNOTHI_QUESTIONS.find((qq) => qq.id === ans.questionId);
    const opt = q.options[ans.optionIndex];
    Object.keys(opt.w || {}).forEach((axis) => { totals[axis] += opt.w[axis]; });

    sectionAnswerLog[q.section].push({ question: q, option: opt });

    if (q.section === 'chakras') {
      chakraAnswers.push({ chakra: q.chakra, raw: opt.raw, w: opt.w || {} });
    }
  });

  const { tags, modifiers } = applyChakraAdjacency(chakraAnswers);
  modifiers.forEach((mod) => { totals.Te += mod.Te; totals.Mv += mod.Mv; });

  const chakraResults = chakraAnswers.map((c, i) => ({ chakra: c.chakra, raw: c.raw, tag: tags[i] }));

  // Single source of truth for "which chakras are outliers" — both the
  // composite paragraph and the detailed chakra breakdown read from this
  // exact array, so the two can never disagree about which chakras are
  // flagged. A chakra is only ever named here if its own tag isn't
  // 'balanced', matching applyChakraAdjacency's outlier test exactly.
  const outlierChakraNames = chakraResults
    .filter((c) => c.tag !== 'balanced')
    .map((c) => c.chakra);

  return { totals, chakraResults, outlierChakraNames, sectionAnswerLog };
}

// ---------------------------------------------------------------------------
// Composite narrative
// ---------------------------------------------------------------------------
// Built entirely from the finalized felt-sense phrase bank below — never a
// single generic adjective. Every phrase used here is verbatim (or a direct
// grammatical trim of) the client-supplied language. Each clause below only
// fires when its own numeric condition clears an explicit, named threshold;
// nothing is forced in just to fill out the paragraph.

// Dynamic axis bounds — computed once at load by looping every question's
// options rather than hardcoded, per the finalized spec: for each axis, the
// min bound is the sum of each question's lowest-scoring option, and the
// max bound is the sum of each question's highest-scoring option. This
// keeps the "standout" threshold correctly scaled to the actual question
// bank instead of a guessed constant, and self-corrects if questions are
// ever added, removed, or reweighted.
function computeAxisBounds() {
  const axes = ['T', 'M', 'Te', 'Mv'];
  const bounds = {};

  axes.forEach((axis) => {
    let min = 0;
    let max = 0;
    GNOTHI_QUESTIONS.forEach((q) => {
      const values = q.options.map((opt) => (opt.w && opt.w[axis]) || 0);
      min += Math.min(...values);
      max += Math.max(...values);
    });
    bounds[axis] = { min, max };
  });

  return bounds;
}

const GNOTHI_AXIS_BOUNDS = computeAxisBounds();

// Fraction of an axis's dynamically computed range a total needs to reach
// before that axis counts as "a standout" worth naming in the composite.
const GNOTHI_STANDOUT_FRACTION = 0.25;

function getAxisStandoutThreshold(axis) {
  const { min, max } = GNOTHI_AXIS_BOUNDS[axis];
  return Math.max(Math.abs(min), Math.abs(max)) * GNOTHI_STANDOUT_FRACTION;
}

// Cosine-similarity threshold (range -1..1) for naming a specific dosha or
// element. Below this, the reading is treated as too mixed/ambiguous to
// call a clean Vata/Pitta/Kapha or Wood/Fire/Earth/Metal/Water pattern, and
// that sentence is simply omitted rather than guessed at.
const GNOTHI_DOSHA_CONFIDENCE_THRESHOLD = 0.35;
const GNOTHI_ELEMENT_CONFIDENCE_THRESHOLD = 0.35;

// Generic Hot/Cold and Dry/Moist sensation phrases (T and M axes only —
// Tension/Movement are expressed through the dosha/element/chakra phrases
// below instead, since those already carry that quality in their own
// finalized language).
const GNOTHI_SENSATION_PHRASES = {
  hot: "a feeling of internal heat",
  cold: "cold hands and feet",
  damp: "a heavy, waterlogged feeling",
  dry: "a dry, tickly throat",
};

const GNOTHI_DOSHA_PHRASES = {
  Vata: "a racing or unsettled mind and an irregular, unpredictable digestive rhythm",
  Pitta: "a feeling of internal heat, a burning or reactive sensation, and a short fuse",
  Kapha: "a heavy, puffy, or waterlogged feeling and a feeling of being stuck or unable to move forward",
};

const GNOTHI_ELEMENT_PHRASES = {
  Wood: "a quick temper and a rigid, unbending feeling",
  Fire: "a restless, overheated energy and trouble settling down at night",
  Earth: "a mind that won't stop turning things over and a slow, heavy feeling after eating",
  Metal: "a heaviness that lingers and difficulty loosening one's grip on things",
  Water: "a deep, bone-level tiredness and a sense of being unsettled or on edge",
};

const GNOTHI_CHAKRA_PHRASES = {
  Root: "restlessness, a feeling of not being safely rooted anywhere",
  Sacral: "a feeling stuck between holding on and letting go, or a numbness toward things once enjoyed",
  'Solar Plexus': "self-doubt, a feeling of not being in control of one's own direction",
  Heart: "guardedness, a difficulty letting others in or reaching out",
  Throat: "words that won't come out right, or a habit of staying quiet when something wants to be said",
  'Third Eye': "confusion, a foggy or indecisive feeling",
  Crown: "isolation, a feeling of being cut off or adrift",
};

// T is a standout if |totals.T| >= its dynamically computed threshold (same
// for M). Returns the finalized phrase for whichever pole cleared the bar, or
// nothing if T/M are both within threshold of neutral.
function getSensationPhrases(totals) {
  const parts = [];
  const tThreshold = getAxisStandoutThreshold('T');
  const mThreshold = getAxisStandoutThreshold('M');

  if (totals.T >= tThreshold) parts.push(GNOTHI_SENSATION_PHRASES.hot);
  else if (totals.T <= -tThreshold) parts.push(GNOTHI_SENSATION_PHRASES.cold);

  if (totals.M >= mThreshold) parts.push(GNOTHI_SENSATION_PHRASES.damp);
  else if (totals.M <= -mThreshold) parts.push(GNOTHI_SENSATION_PHRASES.dry);

  return parts;
}

// Top dosha by cosine similarity against totals; only "indicated" (returned)
// if its score clears GNOTHI_DOSHA_CONFIDENCE_THRESHOLD.
function getDoshaReading(totals) {
  const scored = Object.keys(GNOTHI_DOSHA_SIGNATURES)
    .map((name) => ({ name, score: cosineSimilarity(totals, GNOTHI_DOSHA_SIGNATURES[name]) }))
    .sort((a, b) => b.score - a.score);

  const top = scored[0];
  if (!top || top.score < GNOTHI_DOSHA_CONFIDENCE_THRESHOLD) return null;
  return { name: top.name, phrase: GNOTHI_DOSHA_PHRASES[top.name], score: top.score };
}

// Up to the top 2 elements by cosine similarity, each individually required
// to clear GNOTHI_ELEMENT_CONFIDENCE_THRESHOLD to be "indicated." Can return
// zero, one, or two elements.
function getElementReadings(totals) {
  return Object.keys(GNOTHI_ELEMENT_SIGNATURES)
    .map((name) => ({ name, score: cosineSimilarity(totals, GNOTHI_ELEMENT_SIGNATURES[name]) }))
    .sort((a, b) => b.score - a.score)
    .filter((e) => e.score >= GNOTHI_ELEMENT_CONFIDENCE_THRESHOLD)
    .slice(0, 2);
}

// True dead-center neutrality — all four axes land at exactly 0 — is
// vanishingly rare across 23 questions and reads very differently from
// "nothing happened to clear a threshold." Rather than falling through to
// the generic fallback, it gets its own celebratory reading: Sama, the
// Ayurvedic term for perfect balance, and a smooth, unobstructed flow of Qi.
function isExactEquilibrium(totals) {
  return totals.T === 0 && totals.M === 0 && totals.Te === 0 && totals.Mv === 0;
}

function buildCompositeText(results) {
  const { totals, outlierChakraNames } = results;

  if (isExactEquilibrium(totals)) {
    return "Your reading right now lands in a state of Sama — the Ayurvedic term for perfect, unforced balance — with Qi moving smoothly and without obstruction across every circuit. This isn't a null result or a quiz that failed to find anything; it's a genuinely well-regulated pattern, at least as it stands today.";
  }

  const sentences = [];

  const sensationParts = getSensationPhrases(totals);
  if (sensationParts.length) {
    sentences.push(`Right now, the clearest physical signals are ${sensationParts.join(' and ')}.`);
  }

  const dosha = getDoshaReading(totals);
  if (dosha) {
    sentences.push(`Read through Ayurveda, this leans toward ${dosha.name} in excess — ${dosha.phrase}.`);
  }

  // outlierChakraNames comes straight from computeResults — the exact same
  // array the breakdown panel renders its tags from, so this can never
  // name a chakra the breakdown doesn't also flag as an outlier.
  const elements = getElementReadings(totals);
  if (elements.length === 1) {
    sentences.push(`In Traditional Chinese Medicine, this reads as a ${elements[0].name} pattern — ${GNOTHI_ELEMENT_PHRASES[elements[0].name]}.`);
  } else if (elements.length > 1) {
    const clause = elements.map((e) => `${GNOTHI_ELEMENT_PHRASES[e.name]} (${e.name})`).join(', and ');
    sentences.push(`In Traditional Chinese Medicine, this reads as a ${elements.map((e) => e.name).join('/')} pattern — ${clause}.`);
  }

  if (outlierChakraNames.length === 1) {
    const name = outlierChakraNames[0];
    sentences.push(`The chakra system points most clearly to the ${name} center, carrying ${GNOTHI_CHAKRA_PHRASES[name]}.`);
  } else if (outlierChakraNames.length > 1) {
    const clause = outlierChakraNames
      .map((name) => `the ${name} center (${GNOTHI_CHAKRA_PHRASES[name]})`)
      .join(' and ');
    sentences.push(`The chakra system points most clearly to ${clause}.`);
  }

  if (!sentences.length) {
    return "Your reading right now comes back close to balanced across every framework — no single pattern stands out strongly enough to name.";
  }

  return sentences.join(' ');
}

// Which of the Apothecary's Three Circuits (Biochemical / Energetic /
// Somatic — see apothecary.html) this reading maps to most directly. Doshas,
// elements, and chakras are all filed under the Energetic Circuit's own
// framework list there, so any of those being indicated points to Energetic.
// A standalone Hot/Cold/Dry/Moist sensation reading (with no dosha, element,
// or chakra signal backing it) points to Somatic — a physical tissue-level
// read rather than a named energetic pattern. True equilibrium, or a
// reading with nothing indicated anywhere, returns null (no single circuit
// is dominant enough to name).
function getDominantCircuit(results) {
  const { totals, outlierChakraNames } = results;
  if (isExactEquilibrium(totals)) return null;

  if (outlierChakraNames.length || getDoshaReading(totals) || getElementReadings(totals).length) {
    return 'Energetic';
  }

  if (getSensationPhrases(totals).length) return 'Somatic';

  return null;
}

function rankHerbs(totals) {
  // Herbs are matched by how well they counter the composite pattern —
  // a hot/damp/lax/stagnant reading calls for a cold/dry/toning/moving herb,
  // so we score against the *negated* composite rather than the composite
  // itself.
  const negated = { T: -totals.T, M: -totals.M, Te: -totals.Te, Mv: -totals.Mv };

  // Out-of-stock herbs are filtered out before ranking — never scored,
  // never displayed, never mentioned, regardless of how well they'd
  // otherwise match. If fewer than GNOTHI_MATCH_TARGET herbs remain after
  // filtering, show however many qualify rather than padding the list.
  return GNOTHI_HERBS
    .filter((herb) => herb.inStock)
    .map((herb) => ({
      ...herb,
      score: cosineSimilarity(herb.profile, negated),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, GNOTHI_MATCH_TARGET);
}

// ---------------------------------------------------------------------------
// Quiz UI
// ---------------------------------------------------------------------------
let gnothiAnswers = [];
let gnothiCurrentIndex = 0;

function renderQuestion() {
  const q = GNOTHI_QUESTIONS[gnothiCurrentIndex];
  const sectionLabel = document.getElementById('gnothi-section-label');
  const counter = document.getElementById('gnothi-question-counter');
  const questionText = document.getElementById('gnothi-question-text');
  const optionsWrap = document.getElementById('gnothi-options');
  const progressFill = document.getElementById('gnothi-progress-fill');
  const backBtn = document.getElementById('gnothi-back');

  sectionLabel.textContent = q.sectionLabel;
  counter.textContent = `Question ${gnothiCurrentIndex + 1} of ${GNOTHI_QUESTIONS.length}`;
  questionText.textContent = q.text;
  optionsWrap.innerHTML = '';

  const existingAnswer = gnothiAnswers.find((a) => a.questionId === q.id);

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'gnothi-option';
    if (existingAnswer && existingAnswer.optionIndex === i) btn.classList.add('selected');
    btn.textContent = opt.text;
    btn.addEventListener('click', () => {
      gnothiAnswers = gnothiAnswers.filter((a) => a.questionId !== q.id);
      gnothiAnswers.push({ questionId: q.id, optionIndex: i });
      goToNextQuestion();
    });
    optionsWrap.appendChild(btn);
  });

  const percent = Math.round((gnothiCurrentIndex / GNOTHI_QUESTIONS.length) * 100);
  progressFill.style.width = percent + '%';

  backBtn.style.visibility = gnothiCurrentIndex === 0 ? 'hidden' : 'visible';
}

function goToNextQuestion() {
  if (gnothiCurrentIndex < GNOTHI_QUESTIONS.length - 1) {
    gnothiCurrentIndex += 1;
    renderQuestion();
    document.getElementById('gnothi-quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    showResults();
  }
}

function goToPreviousQuestion() {
  if (gnothiCurrentIndex > 0) {
    gnothiCurrentIndex -= 1;
    renderQuestion();
    document.getElementById('gnothi-quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ---------------------------------------------------------------------------
// Debug / diagnostic view — verification only, not customer-facing.
// Always logs raw axis + chakra data to the console (harmless, dev-tools
// only). Also renders a visible on-page panel, but only when the page is
// loaded with ?debug=1 in the URL. Remove the call to renderDebugPanel()
// (and this whole block) once scoring accuracy has been verified.
// ---------------------------------------------------------------------------
function isGnothiDebugMode() {
  return new URLSearchParams(window.location.search).get('debug') === '1';
}

function logGnothiDebug(results) {
  console.log('[Gnōthi Seautón debug] raw axis totals:', results.totals);
  console.table(results.chakraResults);
  console.log('[Gnōthi Seautón debug] chakras named in composite:', results.outlierChakraNames);
}

function renderDebugPanel(results) {
  let panel = document.getElementById('gnothi-debug-panel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'gnothi-debug-panel';
    panel.className = 'gnothi-debug-panel';
    const compositeEl = document.getElementById('gnothi-composite-text');
    compositeEl.parentNode.insertBefore(panel, compositeEl);
  }

  const chakraRows = results.chakraResults
    .map((c) => `<tr><td>${c.chakra}</td><td>${c.raw}</td><td>${c.tag}</td></tr>`)
    .join('');

  const boundsRow = (axis) => `${axis}: [${GNOTHI_AXIS_BOUNDS[axis].min}, ${GNOTHI_AXIS_BOUNDS[axis].max}] &rarr; standout &ge; ${getAxisStandoutThreshold(axis).toFixed(1)}`;

  panel.innerHTML = `
    <p class="gnothi-debug-title">Debug — raw axis totals (not customer-facing, ?debug=1)</p>
    <p>T: ${results.totals.T} &middot; M: ${results.totals.M} &middot; Te: ${results.totals.Te} &middot; Mv: ${results.totals.Mv}</p>
    <p style="font-size: 0.75rem;">Dynamic bounds — ${boundsRow('T')}<br>${boundsRow('M')}<br>${boundsRow('Te')}<br>${boundsRow('Mv')}</p>
    <table class="gnothi-debug-table">
      <thead><tr><th>Chakra</th><th>Raw</th><th>Tag</th></tr></thead>
      <tbody>${chakraRows}</tbody>
    </table>
    <p>Chakras named in composite: ${results.outlierChakraNames.join(', ') || '(none)'}</p>
    <p>Dominant circuit: ${getDominantCircuit(results) || '(none — equilibrium or nothing standout)'}</p>
  `;
}

// ---------------------------------------------------------------------------
// Results persistence — localStorage (not sessionStorage), so a completed
// reading survives a return visit, not just the current tab session. Only
// the raw answers are saved; everything else (composite text, herb ranking,
// chakra tags) is recomputed fresh from computeResults() on restore, so
// there's a single source of truth and no risk of stale derived data
// drifting from the scoring engine as it evolves.
const GNOTHI_STORAGE_KEY = 'ch_gnothi_results';

function saveGnothiResults() {
  try {
    localStorage.setItem(GNOTHI_STORAGE_KEY, JSON.stringify({
      answers: gnothiAnswers,
      savedAt: Date.now(),
    }));
  } catch (e) {
    // Storage unavailable (private browsing, quota, etc.) — fail silently,
    // this is a nice-to-have, not required for the quiz itself to work.
  }
}

function loadSavedGnothiAnswers() {
  try {
    const raw = localStorage.getItem(GNOTHI_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.answers) || parsed.answers.length !== GNOTHI_QUESTIONS.length) return null;
    return parsed.answers;
  } catch (e) {
    return null;
  }
}

function hasSavedGnothiResults() {
  return !!loadSavedGnothiAnswers();
}

function showResults() {
  const results = computeResults(gnothiAnswers);
  saveGnothiResults();

  document.getElementById('gnothi-quiz').hidden = true;
  document.getElementById('gnothi-intro').hidden = true;
  document.getElementById('gnothi-results').hidden = false;

  document.getElementById('gnothi-composite-text').innerHTML =
    `<p>${buildCompositeText(results)}</p>`;

  const circuitTag = document.getElementById('gnothi-circuit-tag');
  const dominantCircuit = getDominantCircuit(results);
  circuitTag.textContent = dominantCircuit
    ? `Right now, your ${dominantCircuit} Circuit is speaking loudest.`
    : '';

  renderHerbMatches(results);
  renderFrameworkDetails(results);

  const solarPlexusCallout = document.getElementById('gnothi-solar-plexus-callout');
  if (rankHerbs(results.totals).length) {
    solarPlexusCallout.textContent = "Trust your gut instinct here — literally. Let your Solar Plexus, your own sense of personal power and direction, make the final call between these matches.";
  } else {
    solarPlexusCallout.textContent = '';
  }

  logGnothiDebug(results);
  if (isGnothiDebugMode()) renderDebugPanel(results);

  document.getElementById('gnothi-results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderHerbMatches(results) {
  const ranked = rankHerbs(results.totals);
  const grid = document.getElementById('gnothi-herb-matches');
  grid.innerHTML = '';

  ranked.forEach((herb, i) => {
    const card = document.createElement('a');
    card.href = herb.url + '?from=gnothi';
    card.className = 'gnothi-herb-card';
    card.innerHTML = `
      ${i === 0 ? '<span class="gnothi-herb-badge">Closest Match</span>' : ''}
      <h4>${herb.name}</h4>
      <span class="gnothi-herb-link">View Tincture &rarr;</span>
    `;
    grid.appendChild(card);
  });
}

const GNOTHI_FRAMEWORK_META = {
  hotcold: { title: 'Hot / Cold' },
  drymoist: { title: 'Dry / Moist' },
  doshas: { title: 'Three Doshas' },
  elements: { title: 'Five Elements' },
  chakras: { title: 'Chakra System' },
};

function renderFrameworkDetails(results) {
  const list = document.getElementById('gnothi-framework-list');
  list.innerHTML = '';

  GNOTHI_SECTION_ORDER.forEach((sectionKey) => {
    const entries = results.sectionAnswerLog[sectionKey];
    const meta = GNOTHI_FRAMEWORK_META[sectionKey];

    const wrap = document.createElement('div');
    wrap.className = 'gnothi-framework-item';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gnothi-framework-toggle';
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = `<span>${meta.title}</span><span class="gnothi-framework-caret">&#9662;</span>`;

    const panel = document.createElement('div');
    panel.className = 'gnothi-framework-panel';
    panel.hidden = true;

    let panelHtml = '<ul class="gnothi-framework-answers">';
    entries.forEach(({ question, option }) => {
      panelHtml += `<li><strong>${question.text}</strong><br>${option.text}</li>`;
    });
    panelHtml += '</ul>';

    if (sectionKey === 'chakras') {
      panelHtml += '<div class="gnothi-chakra-tags">';
      results.chakraResults.forEach((c) => {
        panelHtml += `<span class="gnothi-chakra-tag gnothi-chakra-tag-${c.tag}">${c.chakra}: ${c.tag}</span>`;
      });
      panelHtml += '</div>';
    }

    panel.innerHTML = panelHtml;

    button.addEventListener('click', () => {
      const isOpen = !panel.hidden;
      panel.hidden = isOpen;
      button.setAttribute('aria-expanded', String(!isOpen));
      wrap.classList.toggle('open', !isOpen);
    });

    wrap.appendChild(button);
    wrap.appendChild(panel);
    list.appendChild(wrap);
  });
}

function resetQuiz() {
  gnothiAnswers = [];
  gnothiCurrentIndex = 0;
  document.getElementById('gnothi-results').hidden = true;
  document.getElementById('gnothi-intro').hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
  const beginBtn = document.getElementById('gnothi-begin');
  const retakeBtn = document.getElementById('gnothi-retake');
  const backBtn = document.getElementById('gnothi-back');
  if (!beginBtn) return;

  beginBtn.addEventListener('click', () => {
    document.getElementById('gnothi-intro').hidden = true;
    document.getElementById('gnothi-quiz').hidden = false;
    gnothiCurrentIndex = 0;
    gnothiAnswers = [];
    renderQuestion();
  });

  backBtn.addEventListener('click', goToPreviousQuestion);
  retakeBtn.addEventListener('click', resetQuiz);

  // If a saved reading exists from a previous completion, land directly on
  // the results screen instead of the intro — this is what makes "Back to
  // Your Results" (linked from herb pages) actually work, and also means a
  // return visit to this page picks up right where you left off. "Retake
  // the Reflection" is still right there if they want to start over; that
  // only overwrites the saved reading once the retaken quiz is completed.
  const savedAnswers = loadSavedGnothiAnswers();
  if (savedAnswers) {
    gnothiAnswers = savedAnswers;
    showResults();
  }
});
