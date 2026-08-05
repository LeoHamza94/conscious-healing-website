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
  deficient: {
    title: 'The Atrophied / High-Vata Terrain',
    text: 'Your system is calling for deep nourishment, structural lipids, and grounding minerals. Energy is scattering upward and outward, leaving your lower tissue circuits running cold, dry, or physically depleted. Focus on building and moisturizing therapies.',
  },
  excessive: {
    title: 'The Stagnant / Damp-Heat Terrain',
    text: 'Your system is processing heavy fluid accumulation, metabolic waste, or localized inflammatory heat. Vital energy is being blocked or congested within the tissue matrix, requiring clearing, moving, and cooling botanical catalysts to restore circulation.',
  },
  mixed: {
    title: 'Mixed Circuit State',
    text: 'Your system shows a crossover pattern — pockets of depletion alongside pockets of stagnation. This mixed terrain reflects the three-circuit crossover concept explored in the Apothecary: certain circuits running dry and thin, while others are simultaneously blocked and congested.',
  },
};

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
// Scoring
// ---------------------------------------------------------------------------
function tallyChakraQuizAnswers() {
  const tally = { balanced: 0, deficient: 0, excessive: 0 };
  chakraQuizAnswers.forEach((a) => {
    tally[a.state] += 1;
  });
  return tally;
}

function computeChakraQuizResult(tally) {
  // Explicit rule: a Deficient/Excessive tie is always "mixed," regardless
  // of how high Balanced's count is. Excludes the trivial 0-0 case (e.g. a
  // fully Balanced result), which isn't a real crossover pattern.
  if (tally.deficient === tally.excessive && tally.deficient > 0) {
    return 'mixed';
  }
  const max = Math.max(tally.balanced, tally.deficient, tally.excessive);
  if (tally.balanced === max) return 'balanced';
  if (tally.deficient === max) return 'deficient';
  return 'excessive';
}

function buildMatrixRows(resultKey) {
  if (resultKey === 'deficient') return [CHAKRA_QUIZ_MATRIX.deficient];
  if (resultKey === 'excessive') return [CHAKRA_QUIZ_MATRIX.excessiveDamp, CHAKRA_QUIZ_MATRIX.excessiveHeat];
  if (resultKey === 'mixed') return [CHAKRA_QUIZ_MATRIX.deficient, CHAKRA_QUIZ_MATRIX.excessiveDamp, CHAKRA_QUIZ_MATRIX.excessiveHeat];
  return []; // balanced — no corrective matrix needed
}

// Pass { savedTally, savedResultKey } to render a member's previously saved
// result (e.g. on page load) without touching the live in-progress answers
// or re-saving to Firestore. Called with no arguments, it scores whatever is
// in chakraQuizAnswers, as it always has.
function showChakraQuizResults(options) {
  const { savedTally, savedResultKey } = options || {};

  document.getElementById('chakra-quiz-intro').hidden = true;
  document.getElementById('chakra-quiz-quiz').hidden = true;
  const resultsSection = document.getElementById('chakra-quiz-results');
  resultsSection.hidden = false;

  const isRestoring = Boolean(savedTally && savedResultKey);
  let tally, resultKey;
  if (isRestoring) {
    tally = savedTally;
    resultKey = savedResultKey;
  } else {
    tally = tallyChakraQuizAnswers();
    resultKey = computeChakraQuizResult(tally);

    // Members only: save this fresh result so it's waiting for them next
    // visit. Logged-out visitors are unaffected — nothing is saved, and the
    // quiz behaves exactly as it did before.
    if (window.CHMembership && window.CHMembership.currentUser()) {
      window.CHMembership
        .saveMemberFields({ chakraQuizResult: resultKey, chakraQuizTally: tally })
        .catch((err) => console.error('Failed to save chakra quiz result:', err));
    }
  }

  const profile = CHAKRA_QUIZ_RESULTS[resultKey];

  document.getElementById('chakra-quiz-result-tag').textContent = profile.title;
  document.getElementById('chakra-quiz-composite-text').innerHTML = `<p>${profile.text}</p>`;

  const tallyWrap = document.getElementById('chakra-quiz-tally');
  tallyWrap.innerHTML = `
    <span class="chakra-quiz-tally-item"><strong>${tally.balanced}</strong> <a href="chakra-system.html#balanced-state" style="color: var(--gold); text-decoration: underline;">Balanced</a></span>
    <span class="chakra-quiz-tally-item"><strong>${tally.deficient}</strong> <a href="chakra-system.html#deficient-state" style="color: var(--gold); text-decoration: underline;">Deficient</a></span>
    <span class="chakra-quiz-tally-item"><strong>${tally.excessive}</strong> <a href="chakra-system.html#excessive-state" style="color: var(--gold); text-decoration: underline;">Excessive</a></span>
  `;

  const matrixWrap = document.getElementById('chakra-quiz-matrix-wrap');
  const rows = buildMatrixRows(resultKey);
  if (!rows.length) {
    matrixWrap.innerHTML = '<p style="text-align:center; color: var(--ink-soft); font-size: 0.95rem;">Your terrain doesn\'t call for active correcting right now — maintenance-focused herbs and steady lifestyle support are enough to keep it there.</p>';
  } else {
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
    matrixWrap.innerHTML = `
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
          if (data && data.chakraQuizResult && data.chakraQuizTally) {
            showChakraQuizResults({ savedTally: data.chakraQuizTally, savedResultKey: data.chakraQuizResult });
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
