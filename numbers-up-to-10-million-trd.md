# Technical Requirements Document (TRD)
## Numbers Up to 10,000,000 — Whole Numbers & Place Value | Grade 5 Math
### Intellia SG | Global Grade 5 Mathematics Curriculum

---

## 1. Technical Overview

This document specifies the architecture, component design, state management, data models, simulation logic, gamification implementation, audio pipeline, and quality standards for the **"Numbers Up to 10,000,000"** interactive lesson module within Intellia SG's Grade 5 Math program.

The module is a **React 18 application (Vite + JSX)**, structured **identically** to the reference repository `https://github.com/dsamyak/equal`, and styled to strictly match `https://equal-tau.vercel.app/`. It will be embedded/linked at:

```
https://intelliasg.com/courses/grade-5-math/lessons/numbers-up-to-10000000/
```

Audio narration uses **ElevenLabs exclusively** (no browser Web Speech API fallback), extending the pipeline architecture used by the reference module, with dynamic (runtime) narration required for the Play phase since question numbers are procedurally randomised.

---

## 2. Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| UI Framework | React 18 (JSX, Vite) | Matches reference `equal` repo structure |
| State Management | `useState` + `useReducer` | Sufficient for single-module complexity |
| Styling | CSS Modules + Tailwind | Matches reference repo CSS approach |
| Icons | Lucide React | Available in artifact/build environment |
| Animation | CSS keyframes + transitions | No external dependency needed |
| SVG Diagrams | Inline SVG (React) | Place-value chart, number line, expansion cards |
| Persistence | `localStorage` | Session state, no backend needed |
| Audio (Primary) | ElevenLabs API | Premium, consistent voice, dynamic + static |
| Audio (Playback) | HTML5 Audio API (`new Audio()`) | Browser-native, no library needed |
| Math / Randomisation | Vanilla JS | No library required |
| Build Tool | Vite | Matches reference repo (`vite.config.js`) |

---

## 3. Project Structure (mirrors reference `equal` repo)

```
numbers-up-to-10-million/
├── public/
│   ├── assets/
│   │   ├── audio/                       # Pre-generated .mp3 files (ElevenLabs, static phases)
│   │   │   ├── audio_wonder_hook_0.mp3
│   │   │   ├── audio_story_panel1_0.mp3
│   │   │   ├── audio_story_panel2_0.mp3
│   │   │   ├── audio_story_panel3_0.mp3
│   │   │   ├── audio_story_panel4_0.mp3
│   │   │   ├── audio_story_panel5_0.mp3
│   │   │   ├── audio_story_panel6_0.mp3
│   │   │   ├── audio_station_a_instruction_0.mp3
│   │   │   ├── audio_station_b_instruction_0.mp3
│   │   │   ├── audio_station_c_instruction_0.mp3
│   │   │   ├── audio_correct_0.mp3
│   │   │   ├── audio_reflect_prompt_0.mp3
│   │   │   └── ...  (all static phase phrases pre-generated)
│   │   └── images/
│   │       ├── mascot-idle.svg
│   │       ├── mascot-happy.svg
│   │       ├── mascot-thinking.svg
│   │       ├── mascot-celebrate.svg
│   │       └── world-map-bg.svg
├── src/
│   ├── main.jsx                          # React entry point
│   ├── App.jsx                           # Root component, global state (useReducer)
│   ├── App.css                           # Global styles (mirrors equal-tau.vercel.app CSS)
│   ├── components/
│   │   ├── IntroScreen.jsx               # Welcome + lesson overview + phase dot tracker
│   │   ├── ProgressMap.jsx                # 6-phase dot tracker (top bar)
│   │   ├── phases/
│   │   │   ├── WonderPhase.jsx           # Phase 1: Hook animation + narration
│   │   │   ├── StoryPhase.jsx            # Phase 2: Illustrated narrative panels
│   │   │   ├── SimulatePhase.jsx         # Phase 3: Simulation station wrapper
│   │   │   ├── PlayPhase.jsx             # Phase 4: IntelliPlay™ quiz engine
│   │   │   └── ReflectPhase.jsx          # Phase 5: Journal + completion badge
│   │   ├── simulations/
│   │   │   ├── PlaceValuePalace.jsx      # Station A: Drag discs into place value chart
│   │   │   ├── NumberLineNavigator.jsx   # Station B: Plot/compare/jump on number line
│   │   │   └── ExpandCompareLab.jsx      # Station C: Expanded form + ordering
│   │   ├── quiz/
│   │   │   ├── QuestionRenderer.jsx      # Polymorphic dispatcher → type-specific component
│   │   │   ├── PlaceValueDigitQ.jsx      # Q1: Identify place value of a digit
│   │   │   ├── WordsToNumeralQ.jsx       # Q2: Write numeral from words
│   │   │   ├── NumeralToWordsQ.jsx       # Q3: Write words from numeral
│   │   │   ├── ExpandedToStandardQ.jsx   # Q4: Expanded form → standard form
│   │   │   ├── StandardToExpandedQ.jsx   # Q5: Standard form → expanded form
│   │   │   ├── CompareNumbersQ.jsx       # Q6: Compare two numbers (>,<,=)
│   │   │   ├── OrderNumbersQ.jsx         # Q7: Order a set of numbers
│   │   │   ├── RoundNumberQ.jsx          # Q8: Round to a given place value
│   │   │   ├── NumberLineMCQ.jsx         # Q9: Number-line placement (MCQ)
│   │   │   ├── WordProblemQ.jsx          # Q10: Real-world compare/round/estimate problem
│   │   │   └── HintOverlay.jsx           # Hint 1 & 2 + animated explanation after 3 fails
│   │   ├── gamification/
│   │   │   ├── XPTracker.jsx             # XP bar + floating XP animation
│   │   │   ├── StarRating.jsx            # 1–3 star rating per world
│   │   │   ├── BadgePanel.jsx            # Badge unlock toast + panel
│   │   │   ├── StreakCounter.jsx         # Fire streak counter
│   │   │   └── WorldMap.jsx              # 10-world progress map (horizontal scroll)
│   │   └── shared/
│   │       ├── Mascot.jsx                # LearnFlow robot with mood states
│   │       ├── PlaceValueChart.jsx       # Reusable SVG: 8-column place value chart
│   │       ├── NumberLine.jsx            # Reusable zoomable/scrollable SVG number line
│   │       ├── PlaceValueDisc.jsx        # Single draggable disc component
│   │       ├── ValueCard.jsx             # Draggable expanded-form value card
│   │       ├── NumberPad.jsx             # Large tap-friendly digit input (0–9, comma-aware)
│   │       └── FeedbackOverlay.jsx       # Correct/incorrect overlay with animation
│   ├── data/
│   │   ├── questionTemplates.js          # 100 question TEMPLATE objects (parametric)
│   │   └── storyContent.js               # Story phase panel data (text + visuals)
│   ├── hooks/
│   │   ├── useAudio.js                   # ElevenLabs + HTML5 Audio playback hook
│   │   ├── useGameState.js               # Gamification state hook
│   │   └── useLocalStorage.js            # Session persistence hook (24hr resume)
│   └── utils/
│       ├── audioMap.js                   # AUTO-GENERATED: static text → .mp3 path map
│       ├── shuffle.js                    # Fisher-Yates randomisation
│       ├── numberGenerator.js            # Runtime random number generation per difficulty band
│       ├── numberFormatter.js            # Numeral ↔ words conversion utilities
│       ├── scoring.js                    # XP + star calculation + distractor generation
│       └── badgeEngine.js                # Badge unlock condition logic
├── scripts/
│   ├── generate_audio.js                 # Offline ElevenLabs audio pre-generation (static phrases)
│   └── clean_audio.js                    # Remove orphaned .mp3 files
├── api/
│   └── elevenlabs.js                     # ElevenLabs proxy (if server-side key needed)
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

---

## 4. Application State Architecture

### 4.1 Global State (`App.jsx` — `useReducer`)

```javascript
const initialState = {
  // Navigation
  phase: 'intro',            // 'intro'|'wonder'|'story'|'simulate'|'play'|'reflect'|'results'
  storyPanel: 0,              // 0–5 (6 story panels)
  currentSimStation: 0,       // 0=PlaceValuePalace, 1=NumberLineNavigator, 2=ExpandCompareLab
  simStationsComplete: [false, false, false],
  simRound: 0,                 // Round index within current station (0–3)

  // Play / Challenge phase
  questionSet: [],             // 100 shuffled Question instances (values rolled at generation time)
  currentQuestion: 0,          // 0–99
  currentWorld: 0,             // 0–9 (10 worlds)
  worldScores: Array(10).fill(null),
  hintsUsed: 0,
  attemptCount: 0,              // Attempts on current question (max 3)

  // Gamification
  xp: 0,
  totalStars: 0,
  streak: 0,
  maxStreak: 0,
  badges: [],                   // Array of unlocked badge IDs
  stationBPerfect: null,
  wordProblemsCorrect: 0,
  roundingCorrect: 0,
  digitIdCorrectNoHint: 0,

  // Session metadata
  phaseComplete: {
    wonder: false, story: false, simulate: false,
    play: false, reflect: false,
  },
  sessionId: crypto.randomUUID(),

  // Settings
  audioEnabled: true,            // ElevenLabs narration on/off
  musicEnabled: false,           // Background ambient music (off by default)
};
```

### 4.2 Reducer Action Types

```javascript
const ACTIONS = {
  SET_PHASE: 'SET_PHASE',
  NEXT_STORY_PANEL: 'NEXT_STORY_PANEL',
  ADVANCE_SIM_STATION: 'ADVANCE_SIM_STATION',
  COMPLETE_SIM_STATION: 'COMPLETE_SIM_STATION',
  NEXT_SIM_ROUND: 'NEXT_SIM_ROUND',
  LOAD_QUESTIONS: 'LOAD_QUESTIONS',
  ANSWER_CORRECT: 'ANSWER_CORRECT',
  ANSWER_INCORRECT: 'ANSWER_INCORRECT',
  USE_HINT: 'USE_HINT',
  NEXT_QUESTION: 'NEXT_QUESTION',
  UNLOCK_BADGE: 'UNLOCK_BADGE',
  COMPLETE_PHASE: 'COMPLETE_PHASE',
  TOGGLE_AUDIO: 'TOGGLE_AUDIO',
  TOGGLE_MUSIC: 'TOGGLE_MUSIC',
  RESTORE_SESSION: 'RESTORE_SESSION',
  RESET_SESSION: 'RESET_SESSION',
};
```

### 4.3 Key Reducer Logic

```javascript
// ANSWER_CORRECT dispatch
case ACTIONS.ANSWER_CORRECT: {
  const xpEarned = calcXP(state.attemptCount + 1, state.hintsUsed, state.streak);
  const newStreak = state.streak + 1;
  const worldIndex = Math.floor(state.currentQuestion / 10);
  const newWorldScore = (state.worldScores[worldIndex] || 0) + 1;
  const updatedWorldScores = [...state.worldScores];
  updatedWorldScores[worldIndex] = newWorldScore;
  return {
    ...state,
    xp: state.xp + xpEarned,
    streak: newStreak,
    maxStreak: Math.max(state.maxStreak, newStreak),
    worldScores: updatedWorldScores,
    totalStars: calcTotalStars(updatedWorldScores),
    hintsUsed: 0,
    attemptCount: 0,
  };
}

// ANSWER_INCORRECT dispatch
case ACTIONS.ANSWER_INCORRECT: {
  return {
    ...state,
    streak: 0,
    attemptCount: state.attemptCount + 1,
  };
}
```

---

## 5. Question Data Model

### 5.1 Question Template Schema (Parametric, Runtime-Randomised)

```typescript
interface QuestionTemplate {
  id: string;                    // e.g. "Q1_003", "Q10_008"
  type: QuestionType;            // One of 10 enum values (see below)
  world: number;                 // 0–9 (which world this belongs to)
  difficulty: 1 | 2 | 3;         // 1=easy(≤100,000), 2=medium(≤1,000,000), 3=hard(≤10,000,000)

  // Generator function — invoked at session build time, NOT stored statically
  generate: (rng: SeededRandom) => GeneratedQuestion;
}

interface GeneratedQuestion {
  id: string;
  type: QuestionType;
  world: number;
  difficulty: 1 | 2 | 3;

  // Core numeric values (freshly rolled per generation)
  primaryNumber: number;
  secondaryNumber?: number;       // For compare/order/word-problem types
  targetPlaceValue?: PlaceValue;  // For Q1, Q8 (rounding place)
  digitPosition?: number;         // For Q1

  // Rendering
  questionText: string;           // Full narrated question text (built from template + numbers)
  visual: VisualType;              // 'placeValueChart' | 'numberLine' | 'expandedForm' | 'plain'

  // MCQ
  options?: (number | string)[];  // 4 MCQ options (always includes correctAnswer)

  // Hints
  hint1: string;
  hint2: string;
  explanation: string;

  // Word problems only
  characterName?: string;
  contextLabel?: string;          // 'stadium', 'city', 'airport', 'ocean', etc.

  // Answer
  correctAnswer: number | string;
}

type QuestionType =
  | 'place_value_digit'      // Q1
  | 'words_to_numeral'       // Q2
  | 'numeral_to_words'       // Q3
  | 'expanded_to_standard'   // Q4
  | 'standard_to_expanded'   // Q5
  | 'compare_numbers'        // Q6
  | 'order_numbers'          // Q7
  | 'round_number'           // Q8
  | 'number_line_mcq'        // Q9
  | 'word_problem';          // Q10

type PlaceValue =
  | 'ones' | 'tens' | 'hundreds' | 'thousands'
  | 'ten_thousands' | 'hundred_thousands'
  | 'millions' | 'ten_millions';

type VisualType = 'placeValueChart' | 'numberLine' | 'expandedForm' | 'plain';
```

### 5.2 Sample Generated Question Objects

```javascript
// Q1 — Place Value of a Digit (generated at runtime)
{
  id: "Q1_003",
  type: "place_value_digit",
  world: 0,
  difficulty: 1,
  primaryNumber: 84213,
  digitPosition: 1,                    // index into digit string (0 = leftmost)
  targetPlaceValue: "thousands",
  questionText: "In the number 84,213, what is the place value of the digit 4?",
  visual: "placeValueChart",
  hint1: "Look at the place value chart. Count the columns from the right.",
  hint2: "The digit 4 sits in the thousands column.",
  explanation: "In 84,213, the digit 4 is in the thousands place, so its value is 4,000.",
  options: ["hundreds", "thousands", "ten thousands", "ones"],
  correctAnswer: "thousands",
}

// Q6 — Compare Numbers
{
  id: "Q6_007",
  type: "compare_numbers",
  world: 5,
  difficulty: 3,
  primaryNumber: 6482715,
  secondaryNumber: 6428715,
  questionText: "Compare: 6,482,715 ___ 6,428,715",
  visual: "placeValueChart",
  hint1: "Compare digit by digit, starting from the leftmost place.",
  hint2: "The ten-thousands digit is different: 8 vs 2. That decides it!",
  explanation: "6,482,715 has a greater ten-thousands digit (8) than 6,428,715 (2), so 6,482,715 > 6,428,715.",
  options: [">", "<", "="],
  correctAnswer: ">",
}

// Q8 — Rounding
{
  id: "Q8_009",
  type: "round_number",
  world: 7,
  difficulty: 3,
  primaryNumber: 6482715,
  targetPlaceValue: "hundred_thousands",
  questionText: "Round 6,482,715 to the nearest hundred thousand.",
  visual: "numberLine",
  hint1: "Look at the digit right after the hundred-thousands place — the ten-thousands digit.",
  hint2: "The ten-thousands digit is 8, so round up!",
  explanation: "6,482,715 rounds up to 6,500,000 because the ten-thousands digit (8) is 5 or more.",
  options: [6400000, 6500000, 6000000, 7000000],
  correctAnswer: 6500000,
}

// Q10 — Word Problem
{
  id: "Q10_004",
  type: "word_problem",
  world: 8,
  difficulty: 3,
  primaryNumber: 2340500,
  secondaryNumber: 2304500,
  characterName: "Priya",
  contextLabel: "city",
  questionText: "Priya found that City A has 2,340,500 people, while City B has 2,304,500 people. Which city is larger, and by how much?",
  visual: "plain",
  hint1: "Compare the ten-thousands digit of each number first.",
  hint2: "2,340,500 has 4 ten-thousands; 2,304,500 has 0 ten-thousands.",
  explanation: "City A (2,340,500) is larger than City B (2,304,500) by 36,000.",
  options: ["City A by 36,000", "City B by 36,000", "City A by 3,600", "They are equal"],
  correctAnswer: "City A by 36,000",
}
```

---

## 6. Place Value Chart, Number Line & Expansion SVG Components

### 6.1 `PlaceValueChart.jsx` — Reusable SVG

```javascript
// PlaceValueChart.jsx — 8-column place value chart (Ten Millions → Ones)
const PLACE_COLUMNS = [
  { key: 'tenMillions',      label: 'Ten\nMillions',      value: 10000000, color: '#7C3AED' },
  { key: 'millions',         label: 'Millions',            value: 1000000,  color: '#2563EB' },
  { key: 'hundredThousands', label: 'Hundred\nThousands',  value: 100000,   color: '#0891B2' },
  { key: 'tenThousands',     label: 'Ten\nThousands',      value: 10000,    color: '#059669' },
  { key: 'thousands',        label: 'Thousands',           value: 1000,     color: '#65A30D' },
  { key: 'hundreds',         label: 'Hundreds',            value: 100,      color: '#D97706' },
  { key: 'tens',             label: 'Tens',                value: 10,       color: '#DC2626' },
  { key: 'ones',             label: 'Ones',                value: 1,        color: '#DB2777' },
];

const PlaceValueChart = ({ digits, highlightIndex, animated = false, missingIndex }) => {
  // digits: array of 8 digit values (0–9), left to right = Ten Millions → Ones
  return (
    <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', height: 'auto' }}>
      {PLACE_COLUMNS.map((col, i) => {
        const x = i * 100;
        const isHighlighted = highlightIndex === i;
        const isMissing = missingIndex === i;
        return (
          <g key={col.key} className={animated ? 'digit-slot-in' : ''} style={{ animationDelay: `${i * 100}ms` }}>
            <rect x={x + 5} y="20" width="90" height="90" rx="10"
              fill={isHighlighted ? col.color : '#F8FAFC'}
              stroke={col.color} strokeWidth={isHighlighted ? 3 : 1.5}
              strokeDasharray={isMissing ? '6,3' : '0'} />
            <text x={x + 50} y="75" textAnchor="middle" fontSize="36" fontWeight="700"
              fill={isHighlighted ? '#FFFFFF' : '#1E293B'}>
              {isMissing ? '?' : digits[i]}
            </text>
            <text x={x + 50} y="130" textAnchor="middle" fontSize="11" fill="#64748B">
              {col.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
```

### 6.2 `NumberLine.jsx` — Reusable Zoomable SVG Number Line

```javascript
// NumberLine.jsx — zoomable number line, 0 to 10,000,000
const NumberLine = ({ min = 0, max = 10000000, markers, zoomLevel, onMarkerDrag }) => {
  // zoomLevel controls tick interval: 1 = whole range (millions ticks),
  // 2 = mid zoom (hundred-thousand ticks), 3 = fine zoom (ten-thousand ticks)
  const tickInterval = zoomLevel === 1 ? 1000000 : zoomLevel === 2 ? 100000 : 10000;
  const numTicks = Math.floor((max - min) / tickInterval) + 1;
  const svgWidth = 1000;
  const scaleX = (value) => ((value - min) / (max - min)) * (svgWidth - 40) + 20;

  return (
    <svg viewBox={`0 0 ${svgWidth} 140`} xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', height: 'auto' }}>
      <line x1="20" y1="70" x2={svgWidth - 20} y2="70" stroke="#94A3B8" strokeWidth="3" />
      {Array.from({ length: numTicks }, (_, i) => {
        const value = min + i * tickInterval;
        const x = scaleX(value);
        return (
          <g key={value}>
            <line x1={x} y1="60" x2={x} y2="80" stroke="#64748B" strokeWidth="2" />
            <text x={x} y="100" textAnchor="middle" fontSize="10" fill="#475569">
              {(value / 1000000).toFixed(zoomLevel === 1 ? 0 : 1)}M
            </text>
          </g>
        );
      })}
      {markers.map((m, i) => (
        <g key={i} transform={`translate(${scaleX(m.value)}, 40)`} className="marker-pulse">
          <circle r="10" fill={m.color || '#F59E0B'} stroke="#fff" strokeWidth="2" />
          <text y="-16" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1E293B">
            {m.label}
          </text>
        </g>
      ))}
    </svg>
  );
};
```

### 6.3 Animation Variants

- `digit-slot-in` → CSS keyframe: each place-value column slides down and fades in, staggered by 100ms
- `marker-pulse` → CSS keyframe: gentle scale pulse to draw attention to a plotted marker
- `shake` → applied to wrong column/marker on incorrect submission
- `bounceIn` → applied on correct submission

---

## 7. Simulation Station Component Specs

### 7.1 `PlaceValuePalace.jsx` — Station A

```javascript
const [target, setTarget] = useState(getStationARound(state.simRound)); // { digits: [4,5,0,2,3,1,8], ... }
const [placedDiscs, setPlacedDiscs] = useState(Array(8).fill(0));       // count of discs per column
const [discPool, setDiscPool] = useState(generateDiscPool(target));      // shuffled disc tray

// onDrop(discValue, columnIndex):
//   if correct column for discValue → placedDiscs[columnIndex] += 1; remove disc from pool
//   else → shake column + hint narration

// Completion check:
const isComplete = () => placedDiscs.every((count, i) => count === target.digits[i]);

// Submit → compare full built number vs target; mascot reaction; ElevenLabs feedback
```

**Station A Rounds (randomised order, 4 rounds):**
```javascript
[
  { magnitude: 'up_to_99999',    digitCount: 5 },
  { magnitude: 'up_to_999999',   digitCount: 6 },
  { magnitude: 'up_to_9999999',  digitCount: 7 },
  { magnitude: 'up_to_10000000', digitCount: 8 },  // challenge round, near/at 10,000,000
]
```

### 7.2 `NumberLineNavigator.jsx` — Station B

```javascript
const [mode, setMode] = useState(getStationBMode(state.simRound)); // 'plot' | 'compare' | 'jump'
const [zoomLevel, setZoomLevel] = useState(1);
const [markerValue, setMarkerValue] = useState(null);
const [tolerance, setTolerance] = useState(getToleranceForRound(state.simRound));

// Plot mode: student drags marker; onDrop checks Math.abs(markerValue - target) <= tolerance
// Compare mode: two markers rendered; student taps greater/lesser or drags into order
// Jump mode: student taps +100,000 / +1,000,000 / -10,000 buttons N times to reach target

// Feedback:
//   within tolerance → number line pulses green + celebration narration
//   outside tolerance → soft arrow hint toward correct zone + encouragement narration
```

**Station B Rounds (4 rounds, modes shuffled, values randomised each session):**
```javascript
[
  { mode: 'plot',    difficulty: 1 },
  { mode: 'compare', difficulty: 2 },
  { mode: 'jump',    difficulty: 2 },
  { mode: 'plot',    difficulty: 3 },
]
```

### 7.3 `ExpandCompareLab.jsx` — Station C

```javascript
const [subMode, setSubMode] = useState(getStationCMode(state.simRound)); // 'expand' | 'order'
const [targetNumber, setTargetNumber] = useState(generateTargetNumber(subMode, state.simRound));
const [cardPool, setCardPool] = useState(generateValueCards(targetNumber)); // includes 1-2 distractors
const [placedCards, setPlacedCards] = useState([]);
const [orderSequence, setOrderSequence] = useState([]);

// Expand mode: student drags correct value cards into expression;
//   check: placedCards.reduce((sum, c) => sum + c.value, 0) === targetNumber
//          && placedCards.length === correctCardCount (no distractors included)

// Order mode: student drags 3-4 numbers into ascending/descending order;
//   check: orderSequence matches sorted reference array
```

**Station C Rounds (4 rounds — 2 expand, 2 order; magnitude increases per round):**
```javascript
[
  { subMode: 'expand', magnitude: 'up_to_100000'   },
  { subMode: 'order',  magnitude: 'up_to_100000'   },
  { subMode: 'expand', magnitude: 'up_to_1000000'  },
  { subMode: 'order',  magnitude: 'up_to_10000000' },
]
```

---

## 8. Audio Pipeline (ElevenLabs — Extending Reference Architecture)

### 8.1 Voice Configuration

```
Model: eleven_multilingual_v2
API Key Var: VITE_ELEVENLABS_API_KEY (in .env.local)
Voice profile: Grade-5-appropriate narrator (distinct voice ID from Grade 1 module;
               configured centrally in src/utils/audioMap.js VOICE_ID constant)
```

### 8.2 Speech Style Settings (per style type)

| Style | stability | similarity_boost | style_exaggeration |
|---|---|---|---|
| statement | 0.75 | 0.75 | 0.0 |
| instruction | 0.80 | 0.75 | 0.0 |
| question | 0.60 | 0.80 | 0.3 |
| encouragement | 0.55 | 0.85 | 0.6 |
| emphasis | 0.85 | 0.70 | 0.1 |
| thinking | 0.65 | 0.80 | 0.2 |
| celebration | 0.45 | 0.90 | 0.8 |

### 8.3 Offline Pre-generation Script (`scripts/generate_audio.js`) — Static Phrases Only

```javascript
const phrases = [
  // Phase 1 — Wonder
  { text: "A stadium holds sixty-eight thousand fans. A country has nine million, four hundred fifty thousand people.", style: 'thinking' },
  { text: "Which number is bigger, and by how much bigger?", style: 'question' },
  { text: "Let's learn how to read, compare, and master numbers this big!", style: 'encouragement' },

  // Phase 2 — Story Panels
  { text: "This stadium seats eighty-two thousand, five hundred people.", style: 'statement' },
  { text: "My city has one million, two hundred forty thousand people.", style: 'statement' },
  { text: "Every digit has its own place value.", style: 'emphasis' },
  { text: "This airport welcomes nine million, seven hundred thousand travellers every year!", style: 'statement' },
  { text: "One million, two hundred forty thousand is less than nine million, seven hundred thousand.", style: 'emphasis' },
  { text: "The trip is six thousand, four hundred eighty-two kilometres. Rounded to the nearest thousand, that's about six thousand kilometres!", style: 'statement' },

  // Phase 3 — Simulation Instructions
  { text: "Drag the place value discs into the correct columns.", style: 'instruction' },
  { text: "Drag the marker to plot the number on the number line.", style: 'instruction' },
  { text: "Drag the correct value cards to expand the number.", style: 'instruction' },

  // Phase 4 — Feedback
  { text: "Amazing! That's exactly right! You're mastering millions!", style: 'celebration' },
  { text: "Not quite! Let's look at the place values again.", style: 'encouragement' },

  // Phase 5 — Reflect
  { text: "What an expedition! Can you write a number greater than one million and tell me the value of its millions digit?", style: 'thinking' },
  { text: "Lesson complete! You are a Millionaire Mind!", style: 'celebration' },

  // Badge unlocks
  { text: "Badge unlocked! You are a Number Explorer!", style: 'celebration' },
  { text: "Badge unlocked! Palace Builder! You completed all three stations!", style: 'celebration' },
  { text: "Badge unlocked! Millionaire Mind! You scored over eighty percent!", style: 'celebration' },
];
// Script hits ElevenLabs API for each phrase, saves to public/assets/audio/
// Auto-generates src/utils/audioMap.js mapping text → .mp3 path
```

### 8.4 Frontend Audio Engine (`src/hooks/useAudio.js`)

```javascript
const elevenLabsCache = new Map(); // In-memory; cleared on page refresh

export async function getAudioUrl(text, style = 'statement', apiKey) {
  // 1. Static map check (fastest path — pre-generated phase narration)
  if (audioMap[text]) return audioMap[text];

  // 2. Memory cache check (dynamic question narration already fetched this session)
  const cacheKey = `${text}::${style}`;
  if (elevenLabsCache.has(cacheKey)) return elevenLabsCache.get(cacheKey);

  // 3. Dynamic generation (requires API key) — REQUIRED for Play-phase questions
  //    since their numeric values are randomised at runtime and cannot be pre-generated
  if (!apiKey) return null; // Silent skip — no fallback

  const styleSettings = STYLE_SETTINGS[style] ?? STYLE_SETTINGS.statement;
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: 'POST',
      headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: styleSettings,
      }),
    }
  );
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  elevenLabsCache.set(cacheKey, url);
  return url;
}

export async function narrate(segments, apiKey, onSegmentStart) {
  for (let i = 0; i < segments.length; i++) {
    const { text, style } = segments[i];
    const url = await getAudioUrl(text, style, apiKey);
    if (!url) continue; // Silent skip if no audio available
    if (i + 1 < segments.length) {
      getAudioUrl(segments[i + 1].text, segments[i + 1].style, apiKey); // eager preload
    }
    if (onSegmentStart) onSegmentStart(i);
    await playAudio(url);
  }
}

async function playAudio(url) {
  return new Promise((resolve) => {
    const audio = new Audio(url);
    audio.onended = resolve;
    audio.onerror = resolve; // Silent fail — never block UX
    audio.play().catch(resolve);
  });
}
```

### 8.5 Narration Synchronisation Rules (1:1 Parity)

Identical rule to the reference architecture: every on-screen narrated text string must match the narration source exactly. For **dynamically generated** question narration, the `questionText` string built by `numberFormatter.js` is the single source of truth used both for on-screen rendering and for the ElevenLabs narration call — guaranteeing parity by construction rather than by manual sync.

---

## 9. Randomisation Engine

### 9.1 Fisher-Yates Shuffle (`utils/shuffle.js`)

```javascript
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
```

### 9.2 Runtime Number Generation (`utils/numberGenerator.js`)

```javascript
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateNumberForDifficulty(difficulty) {
  // difficulty 1 → up to 100,000; 2 → up to 1,000,000; 3 → up to 10,000,000
  const ranges = { 1: [1000, 99999], 2: [100000, 999999], 3: [1000000, 9999999] };
  const [min, max] = ranges[difficulty];
  return randomInt(min, max);
}

export function generateDistinctPair(difficulty, minGap = 1000) {
  const a = generateNumberForDifficulty(difficulty);
  let b;
  do { b = generateNumberForDifficulty(difficulty); } while (Math.abs(a - b) < minGap);
  return [a, b];
}
```

### 9.3 Session Question Set Generation

```javascript
export function generateSessionQuestions(templates) {
  const byType = {};
  templates.forEach(t => {
    if (!byType[t.type]) byType[t.type] = [];
    byType[t.type].push(t);
  });
  // For each type, pick its 10 templates (already partitioned by world/difficulty),
  // invoke .generate(rng) on each to roll fresh numbers, then shuffle the combined 100
  const generated = Object.values(byType)
    .flatMap(templates => templates.map(t => t.generate(Math.random)));
  return shuffleArray(generated);
}
```

### 9.4 MCQ Distractor Generation (`utils/scoring.js`)

```javascript
export function generatePlaceValueDistractors(correctPlaceValue) {
  const ALL_PLACES = ['ones','tens','hundreds','thousands','ten_thousands','hundred_thousands','millions','ten_millions'];
  const idx = ALL_PLACES.indexOf(correctPlaceValue);
  // Prefer adjacent place values as distractors (plausible confusion)
  const adjacent = [ALL_PLACES[idx - 1], ALL_PLACES[idx + 1]].filter(Boolean);
  const remaining = shuffleArray(ALL_PLACES.filter(p => p !== correctPlaceValue && !adjacent.includes(p)));
  const distractors = [...adjacent, ...remaining].slice(0, 3);
  return shuffleArray([correctPlaceValue, ...distractors]);
}

export function generateNumericDistractors(correct, count = 3) {
  // Digit-transposition and off-by-place-value errors (more pedagogically meaningful than pure noise)
  const strategies = [
    correct + Math.pow(10, randomInt(1, 5)),
    correct - Math.pow(10, randomInt(1, 5)),
    transposeAdjacentDigits(correct),
  ];
  return shuffleArray([correct, ...shuffleArray(strategies).slice(0, count)]);
}
```

### 9.5 Session Persistence (24-hour resume)

```javascript
const SESSION_KEY = 'intellia_numbers_10m_v1';

// On app mount: restore if within 24 hours
const saved = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
if (saved && Date.now() - saved.timestamp < 86400000) {
  dispatch({ type: ACTIONS.RESTORE_SESSION, payload: saved });
}

// On every state change: persist progress (question SET is persisted so a resumed
// session does not re-roll numbers mid-attempt, preserving fairness)
useEffect(() => {
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    phase: state.phase,
    storyPanel: state.storyPanel,
    simStationsComplete: state.simStationsComplete,
    questionSet: state.questionSet,
    currentQuestion: state.currentQuestion,
    xp: state.xp,
    streak: state.streak,
    maxStreak: state.maxStreak,
    badges: state.badges,
    worldScores: state.worldScores,
    phaseComplete: state.phaseComplete,
    timestamp: Date.now(),
  }));
}, [state]);
```

---

## 10. Gamification Implementation

### 10.1 XP Calculation (`utils/scoring.js`)

```javascript
export function calcXP(attemptNumber, hintsUsed, streak) {
  const base = attemptNumber === 1 ? 10 : hintsUsed > 0 ? 5 : 7;
  const streakBonus = streak >= 5 ? 5 : 0;
  return base + streakBonus;
}
```

### 10.2 Star Rating (per world of 10 questions)

```javascript
export function calcStars(correct, total = 10) {
  if (correct >= 9) return 3; // Gold: ≥90%
  if (correct >= 7) return 2; // Silver: ≥70%
  if (correct >= 5) return 1; // Bronze: ≥50% (world unlock gate)
  return 0;
}

export function canUnlockWorld(worldScore) {
  return worldScore !== null && worldScore >= 5;
}

export function calcTotalStars(worldScores) {
  return worldScores.reduce((sum, ws) => sum + (ws !== null ? calcStars(ws) : 0), 0);
}
```

### 10.3 Badge Engine (`utils/badgeEngine.js`)

```javascript
export const BADGES = [
  { id: 'number_explorer',  label: '🏅 Number Explorer',  description: 'Complete Wonder and Story phases',
    condition: (s) => s.phaseComplete.wonder && s.phaseComplete.story },
  { id: 'palace_builder',   label: '🥈 Palace Builder',   description: 'Complete all 3 Simulation stations',
    condition: (s) => s.simStationsComplete.every(Boolean) },
  { id: 'millionaire_mind', label: '🥇 Millionaire Mind', description: 'Score 80%+ in Play phase',
    condition: (s) => s.worldScores.reduce((sum, ws) => sum + (ws || 0), 0) >= 80 },
  { id: 'perfect_place_value', label: '💎 Perfect Place Value', description: 'Score 10/10 in any world',
    condition: (s) => s.worldScores.some(ws => ws === 10) },
  { id: 'streak_star',      label: '🔥 Streak Star',      description: 'Achieve a streak of 10 consecutive correct answers',
    condition: (s) => s.maxStreak >= 10 },
  { id: 'full_expedition',  label: '🌟 Full Expedition',  description: 'Complete all 6 phases',
    condition: (s) => Object.values(s.phaseComplete).every(Boolean) },
  { id: 'sharp_navigator',  label: '🎯 Sharp Navigator',  description: 'Complete Station B without any wrong placement',
    condition: (s) => s.stationBPerfect === true },
  { id: 'round_master',     label: '📏 Round Master',     description: 'Answer 5 rounding/estimation questions correctly',
    condition: (s) => (s.roundingCorrect || 0) >= 5 },
  { id: 'digit_detective',  label: '🔢 Digit Detective',   description: 'Answer 5 place-value ID questions correctly, no hints',
    condition: (s) => (s.digitIdCorrectNoHint || 0) >= 5 },
];

export function checkBadges(state) {
  return BADGES.filter(b => !state.badges.includes(b.id) && b.condition(state)).map(b => b.id);
}
```

---

## 11. CSS Animation Keyframes (matching reference `equal-tau.vercel.app` style)

```css
@keyframes bounceIn {
  0%   { transform: scale(0.3); opacity: 0; }
  50%  { transform: scale(1.05); opacity: 1; }
  70%  { transform: scale(0.9); }
  100% { transform: scale(1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%      { transform: translateX(-8px); }
  40%      { transform: translateX(8px); }
  60%      { transform: translateX(-6px); }
  80%      { transform: translateX(6px); }
}

@keyframes floatUp {
  0%   { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-60px) scale(1.5); opacity: 0; }
}

@keyframes digitSlotIn {
  from { transform: translateY(-30px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

@keyframes markerPulse {
  0%, 100% { r: 10; opacity: 1; }
  50%      { r: 13; opacity: 0.7; }
}

@keyframes celebrate {
  0%   { transform: rotate(-5deg) scale(1); }
  25%  { transform: rotate(5deg) scale(1.1); }
  50%  { transform: rotate(-3deg) scale(1.05); }
  75%  { transform: rotate(3deg) scale(1.1); }
  100% { transform: rotate(0deg) scale(1); }
}

@keyframes slideInUp {
  from { transform: translateY(30px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

@keyframes cardSnap {
  0%   { transform: scale(1.15); }
  60%  { transform: scale(0.95); }
  100% { transform: scale(1); }
}

/* Stagger: each place value column / number line marker gets animation-delay: (index * 100ms) */
```

---

## 12. Component Prop Contracts

| Component | Props | Returns |
|---|---|---|
| `PlaceValueChart` | `{ digits, highlightIndex?, animated?, missingIndex? }` | SVG element (inline, responsive) |
| `NumberLine` | `{ min?, max?, markers, zoomLevel, onMarkerDrag }` | SVG element with draggable markers |
| `PlaceValueDisc` | `{ value, color, onDragStart, onTap }` | Draggable/tappable disc component |
| `ValueCard` | `{ value, label, isDistractor?, onDragStart, onTap }` | Draggable expanded-form value card |
| `NumberPad` | `{ max, value, onChange, onSubmit }` | Grid of digit buttons (min 44×44px), backspace, submit |
| `Mascot` | `{ mood: 'idle'\|'happy'\|'thinking'\|'celebrating'\|'encouraging' }` | img/svg + CSS animation class mapped to mood |
| `QuestionRenderer` | `{ question: GeneratedQuestion, onAnswer, hints }` | Type-specific question component |
| `FeedbackOverlay` | `{ isCorrect, explanation?, xpEarned, onContinue }` | Animated modal overlay (bounceIn correct / shake wrong) |
| `WorldMap` | `{ worldScores, currentWorld, onSelectWorld }` | Horizontal scrollable world list with star ratings and lock icons |
| `BadgePanel` | `{ badges, newBadgeId? }` | Badge grid with unlock toast animation for `newBadgeId` |

---

## 13. Performance Requirements

| Metric | Target |
|---|---|
| Initial load time | < 2 seconds (Vite production build) |
| Time to first meaningful paint | < 1 second |
| SVG/animation frame rate | 60 fps |
| Memory usage | < 70 MB |
| Bundle size (gzipped) | < 700 KB |
| Lighthouse Performance score | ≥ 90 |
| Lighthouse Accessibility score | ≥ 90 |
| ElevenLabs pre-gen (static phase) audio TTFB | 0ms (static `.mp3` assets) |
| ElevenLabs dynamic (question) audio TTFB | < 2 seconds (API latency) |

---

## 14. Browser & Device Support

| Environment | Support Level |
|---|---|
| Chrome 110+ (desktop) | Full |
| Safari 15+ (iPad/desktop) | Full |
| Firefox 110+ | Full |
| Edge 110+ | Full |
| Android Chrome | Full |
| iOS Safari 15+ | Full |
| IE 11 | Not supported |

Primary test devices: Desktop Chrome (1280px+) and iPad (768px, touch) — classroom and home context.

---

## 15. Testing & QA Plan

- **Unit tests:** `numberGenerator.js`, `numberFormatter.js` (numeral↔words correctness across all 8 place values), `scoring.js`, `badgeEngine.js`
- **Component tests:** `PlaceValueChart`, `NumberLine`, `QuestionRenderer` dispatch correctness for all 10 question types
- **Randomisation audits:** automated test asserting no two consecutive session generations produce an identical `questionSet` array (statistical uniqueness check over 1,000 simulated sessions)
- **Accessibility audit:** axe-core automated pass + manual keyboard-only walkthrough of all 3 simulation stations
- **Cross-browser manual QA:** full 6-phase walkthrough on each supported browser/device combination
- **Audio QA:** verify 1:1 text/narration parity for all static phrases; verify dynamic narration correctly reflects runtime-generated question numbers

---

## 16. Deployment

- **Build:** `npm run build` (Vite production build)
- **Hosting:** Static build deployed to Vercel (mirroring reference product's `equal-tau.vercel.app` hosting), then embedded/linked from the WordPress-hosted course page at `https://intelliasg.com/courses/grade-5-math/lessons/numbers-up-to-10000000/`
- **Environment variables:** `VITE_ELEVENLABS_API_KEY` set in deployment environment (never committed to source control)
- **Pre-deploy step:** run `node scripts/generate_audio.js` to (re)generate all static phase `.mp3` assets, then `node scripts/clean_audio.js` to remove orphans

---

**Document Version:** 1.0 | July 2026
**Product:** Intellia SG — Grade 5 Math
**Lesson Title:** Numbers Up to 10,000,000 — Whole Numbers & Place Value
**Reference UI:** https://equal-tau.vercel.app/
**Reference Repo:** https://github.com/dsamyak/equal
**Audio Pipeline:** ElevenLabs (`eleven_multilingual_v2`)
**Parent Course Page:** https://intelliasg.com/courses/grade-5-math
**Lesson URL:** https://intelliasg.com/courses/grade-5-math/lessons/numbers-up-to-10000000/
