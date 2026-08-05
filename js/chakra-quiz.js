// ---------------------------------------------------------------------------
// The 7-Chakra Tissue State Assessment
// A separate quiz from Gnōthi Seautón — its own state, its own scoring,
// nothing shared between the two beyond visual styling conventions.
// ---------------------------------------------------------------------------

const CHAKRA_QUIZ_QUESTIONS = [
  {
    id: 'root',
    section: 'Root Circuit',
    sectionSub: 'Physical Safety & Structural Anchorage',
    prompt: 'How does your lower body (legs, bones, lower colon) physically and emotionally feel on a regular basis?',
    options: [
      { letter: 'A', text: 'Grounded, steady, and solid. My lower back and digestion feel structurally strong and reliable.', state: 'balanced' },
      { letter: 'B', text: 'Spaced-out, restless, or anxious. My joints click, and my lower colon regularly feels dry, cold, or constipated.', state: 'deficient' },
      { letter: 'C', text: 'Heavy, sluggish, and stagnant. I tend to retain fluid in my lower extremities, feel physically unmotivated, and resist movement.', state: 'excessive' },
    ],
  },
  {
    id: 'sacral',
    section: 'Sacral Circuit',
    sectionSub: 'Fluid Flow, Adaptability & Sensual Tissues',
    prompt: 'When you observe your creative energy, pelvic health, and emotional life, which pattern feels most familiar?',
    options: [
      { letter: 'A', text: 'Fluid and adaptable. I process emotions easily, enjoy creative projects, and maintain healthy, clear personal boundaries.', state: 'balanced' },
      { letter: 'B', text: 'Emotionally numb, brittle, or stiff. I feel creatively dried up, experience low physical or sensual vitality, and fear intimacy.', state: 'deficient' },
      { letter: 'C', text: 'Volatile, overwhelming, or congested. My emotions flood me easily, I tend to hold water weight or pelvic congestion, and I fall into intense co-dependent dynamics.', state: 'excessive' },
    ],
  },
  {
    id: 'solar-plexus',
    section: 'Solar Plexus Circuit',
    sectionSub: 'Metabolic Fire & Sovereignty',
    prompt: 'How does your digestive system respond after eating, and how do you assert your personal power?',
    options: [
      { letter: 'A', text: 'Efficient and clear. My digestion is sharp and comfortable, and I have steady willpower without needing to control everything.', state: 'balanced' },
      { letter: 'B', text: 'Cold, weak, and slow. Eating leaves me bloated and exhausted, my digestion is sluggish, and I struggle with passivity or a victim mindset.', state: 'deficient' },
      { letter: 'C', text: 'Hot, sharp, and overstimulated. I frequently experience hyperacidity, heartburn, or internal heat, and I lean toward perfectionism, control, or quick anger.', state: 'excessive' },
    ],
  },
  {
    id: 'heart',
    section: 'Heart Circuit',
    sectionSub: 'Circulation & Breath Interconnection',
    prompt: 'Focus on your chest cavity, breathing, and your capacity to give and receive love. What stands out to you?',
    options: [
      { letter: 'A', text: 'Open and spacious. My breathing is deep and rhythmic, my circulation is steady, and I practice healthy self-compassion.', state: 'balanced' },
      { letter: 'B', text: 'Tight, dry, and restricted. My chest feels physically sunken or guarded, my extremities run cold, my breath is shallow, and I isolate myself out of a fear of vulnerability.', state: 'deficient' },
      { letter: 'C', text: 'Heavy, compressed, or hot. I experience localized chest congestion, high vascular tension, and a strong urge to over-extend or people-please at my own expense.', state: 'excessive' },
    ],
  },
  {
    id: 'throat',
    section: 'Throat Circuit',
    sectionSub: 'Vocal Musculature & Authentic Expression',
    prompt: 'When you speak your truth or communicate with others, what physical and vocal patterns occur?',
    options: [
      { letter: 'A', text: 'Resonant, clear, and balanced. I communicate effectively, hold space for active listening, and feel completely at ease with quiet pauses.', state: 'balanced' },
      { letter: 'B', text: 'Swallowed, nervous, or tense. My jaw gets tight, my neck feels stiff, my voice cracks or drops to a whisper, and I keep my thoughts hidden out of fear.', state: 'deficient' },
      { letter: 'C', text: 'Rapid, loud, or over-functioning. I talk quickly to outrun nervous energy, my throat frequently feels raw, irritated, or inflamed, and I struggle to stop talking and listen.', state: 'excessive' },
    ],
  },
  {
    id: 'third-eye',
    section: 'Third Eye Circuit',
    sectionSub: 'Perceptual Vision & Nervous System Intake',
    prompt: 'How does your mind process thoughts, focus, and intuitive insights throughout the day?',
    options: [
      { letter: 'A', text: 'Clear and intuitive. I perceive underlying patterns easily, have a reliable memory, and balance high-level visualization with day-to-day focus.', state: 'balanced' },
      { letter: 'B', text: 'Literal, rigid, or exhausted. My brain feels physically fatigued and dried out, my memory slips, and I struggle to imagine possibilities outside of basic concrete facts.', state: 'deficient' },
      { letter: 'C', text: 'Frantic, overloaded, or ungrounded. I experience intense mental fog, pressure behind my eyes, racing thoughts, or sleep disruption from a hyperactive imagination.', state: 'excessive' },
    ],
  },
  {
    id: 'crown',
    section: 'Crown Circuit',
    sectionSub: 'Systemic Integration & Consciousness',
    prompt: "How do you experience your connection to life as a whole and your central nervous system's overall resilience?",
    options: [
      { letter: 'A', text: 'Integrated and peaceful. I feel an innate sense of universal belonging, and my nervous system can naturally reset itself after periods of stress.', state: 'balanced' },
      { letter: 'B', text: 'Alienated, cynical, or disconnected. I feel deeply separate from others, fixate solely on material survival, and experience a flat, uninspired state of mind.', state: 'deficient' },
      { letter: 'C', text: 'Scattered, disembodied, or over-intellectualized. I get lost in complex mental abstractions to bypass real emotional pain, often feeling completely detached from my physical frame.', state: 'excessive' },
    ],
  },
];

const CHAKRA_QUIZ_RESULTS = {
  balanced: {
    title: 'The Harmonized Terrain',
    text: 'Your vital force, tissue structures, and mineral pathways are in steady communication. Energy moves smoothly through your nadis, keeping your physical organs toned and your emotional states resilient.',
  },
};

// The Three Vitality States narrative (Neurobiology / Tissue Terrain /
// Biochemical Profile / Experience) — the same content taught in full on
// chakra-system.html's "Three Vitality States" section, shown here inline
// for whichever state is most relevant to the visitor's result.
const CHAKRA_VITALITY_STATES = {
  balanced: {
    title: 'The Balanced State (The Harmonized Terrain)',
    neurobiology: 'The left and right hemispheres of the brain are in perfect synchronization. Nerve signals flow smoothly through the decussation crossover points, and the autonomic nervous system easily shifts between the restful parasympathetic branch (Ida Nadi) and the active sympathetic branch (Pingala Nadi).',
    tissueTerrain: 'Tissues maintain optimal tone, elasticity, and cellular fluid balance. There is no fluid pooling or dry atrophy.',
    biochemicalProfile: 'Cell membranes hold a healthy electrical charge (-70mV potential), cellular oxidation rates are stable, and the extracellular matrix is cleanly clearing metabolic waste. Mineral reserves (calcium, magnesium, potassium) are fully intact.',
    experience: 'High baseline vitality, excellent digestive efficiency, a resonant and clear voice, sharp mental clarity, and a natural emotional resilience that recovers quickly from stress.',
  },
  deficient: {
    title: 'The Deficient State (The Atrophied / High-Vata Terrain)',
    neurobiology: 'The local nerve plexus (ganglia cluster) has lost its electrical charge or is being blocked by a chronic sympathetic freeze response. Energy is scattering upward and outward, leaving the local physical organs under-stimulated and under-innervated.',
    tissueTerrain: 'Dry/Atrophy or Cold/Depression. Tissues become thin, brittle, cold, and poorly vascularized due to chronic vasoconstriction.',
    biochemicalProfile: 'Hypo-functioning states, such as lowered enzyme secretion or hypochlorhydria (insufficient stomach acid). Tissues suffer from cellular dehydration, mineral demineralization, and a lack of essential structural lipids to protect nerve sheaths.',
    experience: "Manifests physically as cracking joints, dry skin, cold limbs, chronic bloating, shallow breathing, and a weak or cracking voice. Emotionally, it mirrors The Ghost Archetype — marked by anxiety, passivity, spaceyness, and a feeling of being ungrounded or dissociated from the physical body.",
  },
  excessive: {
    title: 'The Excessive State (The Stagnant / Damp-Heat Terrain)',
    neurobiology: 'The crossover ganglia cluster is trapped in a loop of neurological irritation or hyperactive sympathetic overdrive. The neural pathways are bottlenecked, causing an intense, uncoordinated backup of electrical traffic that overstimulates local organs.',
    tissueTerrain: 'Fluctuates between Heat/Excitation (inflamed, red, hyper-functioning tissues) and Damp/Stagnation (lax, waterlogged, boggy tissues where metabolic wastes pool).',
    biochemicalProfile: 'Hyper-functioning or congestive states, including hyperchlorhydria (acid overflow), local tissue inflammation, cellular waste accumulation, and neural excitotoxicity (frantic neurotransmitter firing that burns out cellular antioxidants).',
    experience: 'Manifests physically as acid reflux, localized tissue swelling or fluid retention, high vascular tension, muscle spasms (like TMJ jaw clenching), and raw, irritated mucous membranes. Emotionally, it mirrors The Tyrant or Megaphone Archetypes — marked by perfectionism, micro-management, emotional volatility, non-stop nervous talking, or mental fog from sensory overload.',
  },
};

// The Phytochemical Matrix — generic corrective herb-action rows, keyed by
// state (not by specific chakra). Restored from the pre-diagnostic-engine
// version of this page; still selected off the Symptomatic Node's state.
const CHAKRA_QUIZ_MATRIX = {
  deficient: {
    result: 'Deficient',
    anchor: 'deficient-state',
    action: 'Moisten, Nourish, &amp; Tonify',
    constituents: 'Mucilage, Fixed Oils, Saponins',
    herbs: 'Marshmallow Root, Shatavari, Licorice Root, Flaxseed',
  },
  excessiveDamp: {
    result: 'Excessive (Damp)',
    anchor: 'excessive-state',
    action: 'Dry, Drain, &amp; Circulate',
    constituents: 'Tannins, Volatile Oils, Resins',
    herbs: 'Cranesbill Root, Calendula, Ginger, Myrrh',
  },
  excessiveHeat: {
    result: 'Excessive (Heat)',
    anchor: 'excessive-state',
    action: 'Cool, Sedate, &amp; Clear',
    constituents: 'Flavonoids, Iridoid Glycosides, Alkaloids',
    herbs: 'Meadowsweet, Willow Bark, Skullcap, Blue Vervain',
  },
};

function buildMatrixRows(state) {
  if (state === 'deficient') return [CHAKRA_QUIZ_MATRIX.deficient];
  if (state === 'excessive') return [CHAKRA_QUIZ_MATRIX.excessiveDamp, CHAKRA_QUIZ_MATRIX.excessiveHeat];
  return []; // balanced — no corrective matrix needed
}

// Canonical bottom-to-top order — every priority/tie-break rule below walks
// the chakras in this order.
const CHAKRA_ORDER = ['root', 'sacral', 'solar-plexus', 'heart', 'throat', 'third-eye', 'crown'];

const CHAKRA_INFO = {
  root: { name: 'Root', sanskrit: 'Muladhara', formulaNumber: 1 },
  sacral: { name: 'Sacral', sanskrit: 'Svadhisthana', formulaNumber: 2 },
  'solar-plexus': { name: 'Solar Plexus', sanskrit: 'Manipura', formulaNumber: 3 },
  heart: { name: 'Heart', sanskrit: 'Anahata', formulaNumber: 4 },
  throat: { name: 'Throat', sanskrit: 'Vishuddha', formulaNumber: 5 },
  'third-eye': { name: 'Third Eye', sanskrit: 'Ajna', formulaNumber: 6 },
  crown: { name: 'Crown', sanskrit: 'Sahasrara', formulaNumber: 7 },
};

// Rules 1 & 2 (the Drain Law / Backpressure Law, with the Root & Crown
// boundary exceptions already baked directly into their two rows) as a
// straight chakra+state -> formula lookup, keyed exactly the way the spec's
// routing chart lays it out.
const CHAKRA_ROUTING_CHART = {
  'root:deficient': { formulaChakra: 'sacral', rationale: "Sacral fluid boundaries are hoarding energy, starving the root support." },
  'root:excessive': { formulaChakra: 'sacral', rationale: "The pelvic floor is bottlenecked, trapping survival energy at the base." },
  'sacral:deficient': { formulaChakra: 'root', rationale: "The base lacks structural grounding to safely hold and build fluid vitality." },
  'sacral:excessive': { formulaChakra: 'solar-plexus', rationale: "The upper fire gate is blocked, forcing pelvic fluids to pool and stagnate." },
  'solar-plexus:deficient': { formulaChakra: 'sacral', rationale: "Lower fluid stagnation is drowning out and cooling your digestion." },
  'solar-plexus:excessive': { formulaChakra: 'heart', rationale: "Heart-centered restriction is forcing gastric fire to burn hot and trap heat." },
  'heart:deficient': { formulaChakra: 'solar-plexus', rationale: "Sluggish metabolic fire fails to drive circulation into the chest cavity." },
  'heart:excessive': { formulaChakra: 'throat', rationale: "An expressive throat bottleneck is trapping vascular pressure in the chest." },
  'throat:deficient': { formulaChakra: 'heart', rationale: "Emotional guarding in the chest keeps vocal expression from rising." },
  'throat:excessive': { formulaChakra: 'third-eye', rationale: "Neurological overstimulation from above is flooding and irritating the throat." },
  'third-eye:deficient': { formulaChakra: 'throat', rationale: "A tight, swallowed vocal block is starving the upper mind of clear circulation." },
  'third-eye:excessive': { formulaChakra: 'crown', rationale: "Cognitive pressure cannot safely ascend and clear." },
  'crown:deficient': { formulaChakra: 'third-eye', rationale: "The master switchboard below is too literal, blocking universal integration." },
  'crown:excessive': { formulaChakra: 'third-eye', rationale: "Neural excitotoxicity below is forcing consciousness to float out of the body." },
};

// ---------------------------------------------------------------------------
// Quiz state + engine
// ---------------------------------------------------------------------------
let chakraQuizAnswers = [];
let chakraQuizCurrentIndex = 0;

function renderChakraQuizQuestion() {
  const q = CHAKRA_QUIZ_QUESTIONS[chakraQuizCurrentIndex];
  const sectionLabel = document.getElementById('chakra-quiz-section-label');
  const counter = document.getElementById('chakra-quiz-question-counter');
  const promptText = document.getElementById('chakra-quiz-prompt-text');
  const optionsWrap = document.getElementById('chakra-quiz-options');
  const progressFill = document.getElementById('chakra-quiz-progress-fill');
  const backBtn = document.getElementById('chakra-quiz-back');

  sectionLabel.textContent = `${q.section} — ${q.sectionSub}`;
  counter.textContent = `Question ${chakraQuizCurrentIndex + 1} of ${CHAKRA_QUIZ_QUESTIONS.length}`;
  promptText.textContent = q.prompt;
  optionsWrap.innerHTML = '';

  const existingAnswer = chakraQuizAnswers.find((a) => a.questionId === q.id);

  q.options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'chakra-quiz-option';
    if (existingAnswer && existingAnswer.state === opt.state) btn.classList.add('selected');
    btn.innerHTML = `<span class="chakra-quiz-option-letter">${opt.letter})</span>${opt.text}`;
    btn.addEventListener('click', () => {
      chakraQuizAnswers = chakraQuizAnswers.filter((a) => a.questionId !== q.id);
      chakraQuizAnswers.push({ questionId: q.id, state: opt.state });
      goToNextChakraQuizQuestion();
    });
    optionsWrap.appendChild(btn);
  });

  const percent = Math.round((chakraQuizCurrentIndex / CHAKRA_QUIZ_QUESTIONS.length) * 100);
  progressFill.style.width = percent + '%';

  backBtn.style.visibility = chakraQuizCurrentIndex === 0 ? 'hidden' : 'visible';
}

function goToNextChakraQuizQuestion() {
  if (chakraQuizCurrentIndex < CHAKRA_QUIZ_QUESTIONS.length - 1) {
    chakraQuizCurrentIndex += 1;
    renderChakraQuizQuestion();
    document.getElementById('chakra-quiz-quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    showChakraQuizResults();
  }
}

function goToPreviousChakraQuizQuestion() {
  if (chakraQuizCurrentIndex > 0) {
    chakraQuizCurrentIndex -= 1;
    renderChakraQuizQuestion();
    document.getElementById('chakra-quiz-quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ---------------------------------------------------------------------------
// Scoring — per-chakra states + the two-layer routing engine (Rules 1-3)
// ---------------------------------------------------------------------------

// { root: 'balanced', sacral: 'deficient', ... } — one entry per chakra,
// straight from the live in-progress answers.
function getChakraStatesFromAnswers() {
  const states = {};
  chakraQuizAnswers.forEach((a) => {
    states[a.questionId] = a.state;
  });
  return states;
}

function tallyChakraStates(states) {
  const tally = { balanced: 0, deficient: 0, excessive: 0 };
  CHAKRA_ORDER.forEach((id) => {
    const state = states[id];
    if (state && tally[state] !== undefined) tally[state] += 1;
  });
  return tally;
}

// Rule 3 — Weighted Hierarchy Engine. Decides which single chakra is the
// "Symptomatic Node," and whether a true same-tier tie also produces a
// secondary "Supporting the Surrounding Terrain" mention.
function resolveChakraQuizPriority(states) {
  const imbalanced = CHAKRA_ORDER.filter((id) => states[id] && states[id] !== 'balanced');

  if (imbalanced.length === 0) {
    return { allBalanced: true, primary: null, secondary: null };
  }

  // First priority: Solar Plexus wins outright, regardless of what else is
  // imbalanced. Only one Solar Plexus exists, so this branch can never
  // itself produce a tie.
  if (states['solar-plexus'] && states['solar-plexus'] !== 'balanced') {
    return {
      allBalanced: false,
      primary: { chakraId: 'solar-plexus', state: states['solar-plexus'] },
      secondary: null,
    };
  }

  // Second priority (Solar Plexus balanced): Excessive beats Deficient.
  // A true tie within the deciding tier (e.g. three chakras all Deficient)
  // is broken by canonical Root-to-Crown order; the runner-up becomes the
  // optional secondary mention.
  const excessiveTier = imbalanced.filter((id) => states[id] === 'excessive');
  const decidingTier = excessiveTier.length ? excessiveTier : imbalanced.filter((id) => states[id] === 'deficient');

  const primaryId = decidingTier[0];
  const secondaryId = decidingTier.length > 1 ? decidingTier[1] : null;

  return {
    allBalanced: false,
    primary: { chakraId: primaryId, state: states[primaryId] },
    secondary: secondaryId ? { chakraId: secondaryId, state: states[secondaryId] } : null,
  };
}

// Looks up Rules 1 & 2 for one chakra+state pair and packages it with
// display-ready names.
function getRoutingResult(chakraId, state) {
  const routing = CHAKRA_ROUTING_CHART[`${chakraId}:${state}`];
  const formulaInfo = CHAKRA_INFO[routing.formulaChakra];
  return {
    chakraId,
    state,
    chakraName: CHAKRA_INFO[chakraId].name,
    formulaChakraId: routing.formulaChakra,
    formulaName: formulaInfo.name,
    formulaNumber: formulaInfo.formulaNumber,
    rationale: routing.rationale,
  };
}

function capitalizeState(state) {
  return state.charAt(0).toUpperCase() + state.slice(1);
}

// Links a chakra's name to its write-up in "The 7 Major Chakras" deep-dive
// on chakra-system.html (e.g. #root-chakra, #solar-plexus-chakra).
function chakraLink(chakraId, label) {
  return `<a href="chakra-system.html#${chakraId}-chakra" style="color: var(--gold); text-decoration: underline;">${label}</a>`;
}

// Pass { savedStates } to render a member's previously saved per-chakra
// result (e.g. on page load) without touching the live in-progress answers
// or re-saving to Firestore. Called with no arguments, it scores whatever is
// in chakraQuizAnswers, as it always has.
function showChakraQuizResults(options) {
  const { savedStates } = options || {};
  const isRestoring = Boolean(savedStates);

  document.getElementById('chakra-quiz-intro').hidden = true;
  document.getElementById('chakra-quiz-quiz').hidden = true;
  const resultsSection = document.getElementById('chakra-quiz-results');
  resultsSection.hidden = false;

  const states = isRestoring ? savedStates : getChakraStatesFromAnswers();

  // Members only: save this fresh result so it's waiting for them next
  // visit. Logged-out visitors are unaffected — nothing is saved, and the
  // quiz behaves exactly as it did before.
  if (!isRestoring && window.CHMembership && window.CHMembership.currentUser()) {
    window.CHMembership
      .saveMemberFields({ chakraQuizStates: states })
      .catch((err) => console.error('Failed to save chakra quiz result:', err));
  }

  const tally = tallyChakraStates(states);
  const priority = resolveChakraQuizPriority(states);

  const tagEl = document.getElementById('chakra-quiz-result-tag');
  const compositeEl = document.getElementById('chakra-quiz-composite-text');
  const vitalityWrap = document.getElementById('chakra-quiz-vitality-wrap');
  const matrixWrap = document.getElementById('chakra-quiz-matrix-wrap');

  // The relevant Vitality State for the narrative card is the Symptomatic
  // Node's own state when imbalanced, or 'balanced' when nothing is.
  const vitalityKey = priority.allBalanced ? 'balanced' : priority.primary.state;
  const vitality = CHAKRA_VITALITY_STATES[vitalityKey];
  vitalityWrap.innerHTML = `
    <h3>${vitality.title}</h3>
    <ul class="bio-list">
      <li><strong>The Neurobiology:</strong> ${vitality.neurobiology}</li>
      <li><strong>The Tissue Terrain:</strong> ${vitality.tissueTerrain}</li>
      <li><strong>The Biochemical Profile:</strong> ${vitality.biochemicalProfile}</li>
      <li><strong>The Experience:</strong> ${vitality.experience}</li>
    </ul>
  `;

  function renderPhytochemicalMatrix(state) {
    const rows = buildMatrixRows(state);
    if (!rows.length) {
      return '<p style="text-align:center; color: var(--ink-soft); font-size: 0.95rem;">Your terrain doesn\'t call for active correcting right now — maintenance-focused herbs and steady lifestyle support are enough to keep it there.</p>';
    }
    const rowsHtml = rows
      .map(
        (r) => `
      <tr>
        <td><strong><a href="chakra-system.html#${r.anchor}" style="color: var(--gold); text-decoration: underline;">${r.result}</a></strong></td>
        <td>${r.action}</td>
        <td>${r.constituents}</td>
        <td>${r.herbs}</td>
      </tr>`
      )
      .join('');
    return `
      <h3>Phytochemical Matrix</h3>
      <div class="table-wrap">
        <table class="info-table">
          <thead>
            <tr>
              <th>Result</th>
              <th>Key Botanical Action</th>
              <th>Core Phytochemical Constituents</th>
              <th>Example Herbs (educational mention only)</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    `;
  }

  if (priority.allBalanced) {
    const profile = CHAKRA_QUIZ_RESULTS.balanced;
    tagEl.textContent = profile.title;
    compositeEl.innerHTML = `<p>${profile.text}</p>`;
    matrixWrap.innerHTML = renderPhytochemicalMatrix('balanced');
  } else {
    const primaryRouting = getRoutingResult(priority.primary.chakraId, priority.primary.state);

    tagEl.innerHTML = `Symptomatic Node: ${chakraLink(primaryRouting.chakraId, primaryRouting.chakraName)} (${capitalizeState(primaryRouting.state)})`;
    compositeEl.innerHTML = `<p>${primaryRouting.rationale}</p>`;

    let matrixHtml = `
      <div class="chakra-quiz-routing-card">
        <p class="chakra-quiz-routing-label">Recommended Formula</p>
        <p class="chakra-quiz-routing-formula">${chakraLink(primaryRouting.formulaChakraId, primaryRouting.formulaName)} <span>(Formula ${primaryRouting.formulaNumber})</span></p>
      </div>
    `;

    if (priority.secondary) {
      const secondaryRouting = getRoutingResult(priority.secondary.chakraId, priority.secondary.state);
      matrixHtml += `
        <div class="chakra-quiz-secondary">
          <h4>Supporting the Surrounding Terrain</h4>
          <p>Your ${chakraLink(secondaryRouting.chakraId, secondaryRouting.chakraName)} chakra scored ${capitalizeState(secondaryRouting.state)} as well. ${secondaryRouting.rationale} You may also want to explore the ${chakraLink(secondaryRouting.formulaChakraId, secondaryRouting.formulaName)} Formula (Formula ${secondaryRouting.formulaNumber}) as an additional, optional support.</p>
        </div>
      `;
    }

    matrixHtml += renderPhytochemicalMatrix(primaryRouting.state);

    matrixWrap.innerHTML = matrixHtml;
  }

  const tallyWrap = document.getElementById('chakra-quiz-tally');
  tallyWrap.innerHTML = `
    <span class="chakra-quiz-tally-item"><strong>${tally.balanced}</strong> <a href="chakra-system.html#balanced-state" style="color: var(--gold); text-decoration: underline;">Balanced</a></span>
    <span class="chakra-quiz-tally-item"><strong>${tally.deficient}</strong> <a href="chakra-system.html#deficient-state" style="color: var(--gold); text-decoration: underline;">Deficient</a></span>
    <span class="chakra-quiz-tally-item"><strong>${tally.excessive}</strong> <a href="chakra-system.html#excessive-state" style="color: var(--gold); text-decoration: underline;">Excessive</a></span>
  `;

  // Skip the auto-scroll when silently restoring a saved result on page
  // load — nothing to scroll "down to" since the visitor hasn't clicked
  // anything yet. Fresh completions still scroll to the results as before.
  if (!isRestoring) {
    document.getElementById('chakra-quiz-results').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function resetChakraQuiz() {
  chakraQuizAnswers = [];
  chakraQuizCurrentIndex = 0;
  document.getElementById('chakra-quiz-results').hidden = true;
  document.getElementById('chakra-quiz-intro').hidden = false;
  document.getElementById('chakra-quiz-intro').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
function initChakraQuiz() {
  const beginBtn = document.getElementById('chakra-quiz-begin');
  const backBtn = document.getElementById('chakra-quiz-back');
  const retakeBtn = document.getElementById('chakra-quiz-retake');
  if (!beginBtn) return; // not on this page

  beginBtn.addEventListener('click', () => {
    document.getElementById('chakra-quiz-intro').hidden = true;
    document.getElementById('chakra-quiz-quiz').hidden = false;
    chakraQuizAnswers = [];
    chakraQuizCurrentIndex = 0;
    renderChakraQuizQuestion();
    document.getElementById('chakra-quiz-quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  backBtn.addEventListener('click', goToPreviousChakraQuizQuestion);
  retakeBtn.addEventListener('click', resetChakraQuiz);

  // Members only: if they've already taken this quiz, show their saved
  // result instead of the intro screen. Logged-out visitors are completely
  // unaffected — this block simply never fires for them.
  if (window.CHMembership) {
    window.CHMembership.onReady((user) => {
      if (!user) return;
      window.CHMembership
        .getMemberDoc()
        .then((data) => {
          if (data && data.chakraQuizStates) {
            showChakraQuizResults({ savedStates: data.chakraQuizStates });
          }
        })
        .catch((err) => console.error('Failed to load saved chakra quiz result:', err));
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChakraQuiz);
} else {
  initChakraQuiz();
}
