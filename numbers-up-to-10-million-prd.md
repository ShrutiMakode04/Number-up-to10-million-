# Product Requirements Document (PRD)
## Numbers Up to 10,000,000 — Whole Numbers & Place Value | Grade 5 Math
### Intellia SG | Global Grade 5 Mathematics Curriculum

---

## 1. Executive Summary

This document defines the product requirements for **"Numbers Up to 10,000,000"** — an interactive, gamified, simulation-based lesson module for **Grade 5 students (ages 10–11)** worldwide. It is delivered as a standalone lesson inside Intellia SG's Grade 5 Math program, teaching whole-number place value, reading/writing large numbers, expanded form, comparing & ordering, number-line placement, and rounding/estimation up to ten million.

The module is designed to be hosted at:

```
https://intelliasg.com/courses/grade-5-math/lessons/numbers-up-to-10000000/
```

as a lesson within the parent course page `https://intelliasg.com/courses/grade-5-math`.

It is built using **React (Vite + JSX, JavaScript/CSS)** and is designed to **strictly mirror the visual structure, UX flow, component architecture, and interaction patterns** established at the reference product **https://equal-tau.vercel.app/** and its repository **https://github.com/dsamyak/equal**. The reference product's own PRD/TRD pair (for "Equal Groups," Grade 1) defines the house style that this document extends to Grade 5 content — same 6-phase learner journey, same mascot companion system, same audio pipeline, same gamification skeleton — scaled up in mathematical depth and visual sophistication appropriate for 10–11 year-olds.

Audio narration uses **ElevenLabs exclusively** (no browser Web Speech API fallback), with pre-generated static `.mp3` files for all phase narrations and dynamic generation for practice questions — identical pipeline architecture to the reference module, with a voice profile suited to an older (Grade 5) audience.

The module follows Intellia's **6-phase learner journey**:

| Phase | Name | Purpose |
|---|---|---|
| 0 | **INTRO** | Welcome screen + 6-phase progress map |
| 1 | **WONDER** | Curiosity hook — a real-world "big number" puzzle |
| 2 | **STORY** | Narrative-based concept introduction with global characters |
| 3 | **SIMULATE** | Sandbox-style interactive simulation (3 unique stations) |
| 4 | **PLAY** | IntelliPlay™ gamified practice (100 fully-randomised questions) |
| 5 | **REFLECT** | Journal / LearnFlow AI prompt + completion badge |

Every question, every simulation round, and every number used is **randomly generated per session** — no two students (and no two attempts by the same student) ever see an identical sequence.

---

## 2. Product Vision & Goals

### Vision
To make numbers up to ten million tangible, visual, and joyful for Grade 5 learners across the globe — building intuitive number sense at scale through place-value simulations, a story-driven narrative, an interactive zoomable number line, and adaptive gamified challenge — while remaining fully aligned to the number-and-place-value strand shared by the world's major Grade 5 syllabi (Common Core, Singapore MOE, Cambridge Primary, CBSE, IB PYP, Australian Curriculum).

### Goals

| Goal | Metric |
|---|---|
| Learning Completion | ≥85% of students complete all 6 phases |
| Practice Engagement | ≥90% attempt at least 10 practice questions |
| Score Achievement | Average challenge score ≥75% on first attempt |
| Session Duration | Average engagement ≥18 minutes per session |
| Curriculum Alignment | 100% aligned to global Grade 5 place-value & whole-number standards |
| Phase Progression | ≥80% reach Play phase in a single session |
| Simulation Interaction Rate | ≥95% attempt all 3 simulation stations |
| Question Uniqueness | 100% of sessions receive a distinct randomised question order and number set |
| Replayability | ≥40% of students replay the Play phase at least once |

---

## 3. Target Users

### Primary: Grade 5 Students (Age 10–11), Global

- Reading fluency sufficient for multi-step word problems, but still benefit heavily from visuals, animation, and narration
- Transitioning from concrete counting to abstract number sense at scale (thousands → millions)
- Motivated by mastery mechanics: XP, streaks, badges, unlockable worlds
- Global audience — content must avoid region-specific cultural assumptions; uses internationally recognizable contexts (population counts, distances, money in a neutral "credits" unit alongside real currencies, stadium capacities, space facts) and a cast of globally diverse first names

### Secondary: Parents & Teachers

- Assign as classwork, homework, or holiday enrichment
- Expect alignment with major global Grade 5 syllabi, not one single country's curriculum
- Monitor via in-lesson phase-completion indicators and end-of-session summary

---

## 4. Curriculum Alignment — Global Grade 5 Syllabus

**Topic:** Numbers Up to 10,000,000 (Whole Numbers)
**Programme:** Intellia SG Grade 5 Math — Section: Whole Numbers & Place Value
**Lesson URL:** `https://intelliasg.com/courses/grade-5-math/lessons/numbers-up-to-10000000/`

### Cross-Referenced Global Standards

| Framework | Relevant Standard / Strand |
|---|---|
| Singapore MOE Primary Mathematics Syllabus (P5) | Whole Numbers: numbers up to 10 million — place value, reading/writing, comparing, ordering, rounding |
| US Common Core (Grade 4–5, NBT domain) | 4.NBT.A.1–3 (place value, comparison, rounding); 5.NBT.A.1 (place value relationships) extended to larger numbers |
| Cambridge Primary Mathematics (Stage 5–6) | Number: read, write, order, and compare numbers up to 1,000,000+ and beyond; round numbers |
| CBSE / NCERT (Class 5, India) | Large numbers — Indian & International place value systems, comparison, formation of numbers |
| Australian Curriculum (Year 5) | ACMNA104 — recognise, represent, and order numbers to at least tens of thousands (extended here to millions) |
| IB PYP Math Scope & Sequence | Number: whole number sense, place value, magnitude, and estimation strategies |

### Learning Objectives Covered (LO)

- **LO1** — Recognise the place value of each digit in a number up to 10,000,000 (ones, tens, hundreds, thousands, ten thousands, hundred thousands, millions, ten millions)
- **LO2** — Read and write numbers up to 10,000,000 in numerals and in words
- **LO3** — Express a number in expanded form (e.g. 6,304,207 = 6,000,000 + 300,000 + 4,000 + 200 + 7)
- **LO4** — Compare and order numbers up to 10,000,000 using `>`, `<`, `=`
- **LO5** — Represent and locate numbers on a scaled/zoomable number line
- **LO6** — Round numbers to the nearest 10, 100, 1,000, 10,000, 100,000, and 1,000,000
- **LO7** — Use rounding to estimate sums, differences, and reasonableness of answers
- **LO8** — Solve real-world word problems involving reading, comparing, and rounding large numbers
- **LO9** — Understand and use place-value vocabulary: "digit," "place value," "value," "standard form," "expanded form," "round to the nearest ___"

### Number Ranges & Progression

| Level | Range | Focus |
|---|---|---|
| Easy | Up to 100,000 | Place value in thousands; simple comparison |
| Medium | Up to 1,000,000 | Place value into hundred-thousands/millions; expanded form; rounding to 1,000/10,000 |
| Hard | Up to 10,000,000 | Full ten-million place value; rounding to 100,000/1,000,000; multi-step estimation word problems |

### Vocabulary Focus

"place value," "digit," "value," "standard form," "expanded form," "greater than," "less than," "equal to," "ascending order," "descending order," "round to the nearest," "estimate," "ten million," "hundred thousand"

---

## 5. The 6-Phase Learner Journey (Intellia Model)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ INTRO SCREEN → Progress Map (6-step visual tracker, top bar)                │
│ Welcome: "Hi! Ready to explore numbers as big as ten million? 🚀"           │
│ Lesson badge shown (locked). 6 glowing phase dots visible.                  │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1 — WONDER (≈ 1–2 min)                                                │
│                                                                              │
│ Hook: "A stadium holds 68,000 fans. A country has 9,450,000 people.        │
│ Which number is bigger — and by how much?" 🏟️🌍                            │
│                                                                              │
│ Visual: Animated digit counters spinning up from 0 toward each number       │
│ Mascot (LearnFlow robot) appears puzzled, scaling itself tiny vs huge       │
│ Narration (ElevenLabs): reads the hook with curiosity and energy           │
│ → "Let's learn how to read, compare, and master numbers this big!"         │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 2 — STORY (≈ 3–4 min)                                                 │
│                                                                              │
│ Narrative: "The Great Number Expedition" — John, Sarah, Mike, Priya,       │
│ Wei Ming, Ahmed, Sofia, and Liam are young explorers on a world tour.       │
│                                                                              │
│ Panel 1 — John (visiting a stadium): "This stadium seats 82,500 people.     │
│  That's eighty-two thousand, five hundred!"                                │
│ Panel 2 — Sarah (looking at a map): "My city has 1,240,000 people —        │
│  one million, two hundred forty thousand!"                                 │
│ Panel 3 — Place-value chart animates in: digits slot into columns          │
│  (ten millions, millions, hundred thousands, ten thousands, thousands,      │
│  hundreds, tens, ones) as each number is spoken                            │
│ Panel 4 — Mike (at an airport): "This airport welcomes 9,700,000           │
│  travellers every year!"                                                    │
│ Panel 5 — Priya (comparing two cities): "1,240,000 is less than            │
│  9,700,000 — nine million, seven hundred thousand is much bigger!"         │
│ Panel 6 — Wei Ming (rounding a distance): "The trip is 6,482 km. Rounded   │
│  to the nearest thousand, that's about 6,000 km!"                          │
│                                                                              │
│ → Illustrated story panels (animated slide-in), ElevenLabs narration       │
│ → Key vocabulary highlighted: "place value," "standard form," "round"      │
│ → Place-value chart component introduced and reused in Simulate phase      │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 3 — SIMULATE (≈ 7–9 min)                                              │
│                                                                              │
│ 3 Interactive Stations — student must complete all 3 to advance            │
│                                                                              │
│ Station A — "Place Value Palace" (Concrete → Pictorial)                    │
│  Drag place-value discs (1 / 10 / 100 / 1,000 / 10,000 / 100,000 /         │
│  1,000,000 / 10,000,000) into the correct chart columns to build a         │
│  target number.                                                            │
│                                                                              │
│ Station B — "Number Line Navigator" (Pictorial → Abstract)                 │
│  A zoomable/scrollable interactive number line (0 to 10,000,000).          │
│  Drag a marker to plot a target number; compare two markers; make          │
│  "jumps" of powers of ten.                                                 │
│                                                                              │
│ Station C — "Expand & Compare Lab" (Abstract)                              │
│  Decompose a number into expanded form by matching digit-value cards,      │
│  then order a set of numbers using >, <, = comparison tools.               │
│                                                                              │
│ → Mascot reacts to each completed station                                  │
│ → ElevenLabs narrates each station instruction and feedback                │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 4 — PLAY (≈ 8–10 min)                                                 │
│                                                                              │
│ IntelliPlay™ Level: 100 fully randomised questions across 10 worlds        │
│ 10 questions per world, world unlocks at ≥6/10 correct                     │
│ Stars (1–3), XP, badges, and streak fire counter active                    │
│ → Mastery gates the world map; encouragement-first feedback                │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 5 — REFLECT (≈ 1–2 min)                                               │
│                                                                              │
│ Journal prompt: "Can you write a number greater than one million and       │
│  tell me its place value for the millions digit?"                          │
│ Or: LearnFlow AI chat — type/speak your understanding                      │
│ Lesson complete badge unlocks here. Summary of XP + badges shown.           │
│ → "Share with your teacher!" button (screenshot / export)                  │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Phase 3 — Simulation Design (Detailed, Unique to This Topic)

All three simulations are original interaction models built specifically for large-number place value; they intentionally do **not** copy the Grade 1 "Equal Groups" grouping/sorting mechanics from the reference product, while following its visual and interaction-feedback conventions (drag/tap dual input, mascot reactions, ElevenLabs narration, bounce/shake feedback).

### 6.1 Station A — "Place Value Palace" (Concrete → Pictorial)

**Visual:**
- A grand 8-column palace-themed place-value chart: Ten Millions | Millions | Hundred Thousands | Ten Thousands | Thousands | Hundreds | Tens | Ones
- A tray of colour-coded place-value discs (each disc labelled with its power-of-ten value and a distinct colour/size correlated to magnitude)
- Target number displayed at the top in both numeral and word form (e.g. "Build: 4,502,318 — four million, five hundred two thousand, three hundred eighteen")

**Interaction:**
- Student drags discs into the correct column (or taps disc + taps column for accessibility)
- Each column shows a running count "3 / 4" style badge validating disc count for that place
- A live-updating standard-form number displays beneath the chart as discs are placed
- Submit button appears once every column has at least one disc placed (or "0" acknowledged)

**Feedback:**
- Fully correct → mascot cheers, columns glow gold, "Amazing! You built four million, five hundred two thousand, three hundred eighteen!"
- Incorrect column(s) → gentle shake on the wrong column only + "This column needs a different value. Look again!"

**Rounds (randomised per session, 4 rounds):**
- Round 1: 5-digit target (up to 99,999)
- Round 2: 6-digit target (up to 999,999)
- Round 3: 7-digit target (up to 9,999,999)
- Round 4: 8-digit target exactly at or near 10,000,000 (challenge round)

### 6.2 Station B — "Number Line Navigator" (Pictorial → Abstract)

**Visual:**
- A horizontally scrollable / pinch-zoomable number line spanning 0 to 10,000,000, with adaptive tick intervals (zooms from millions down to thousands as the student zooms in)
- A glowing marker/rocket icon the student can drag along the line
- Landmark reference points shown at key values (e.g. 1,000,000; 5,000,000; 10,000,000) to build a sense of scale

**Interaction — 3 mini-modes per session, randomised:**
- **Plot It:** "Place the marker at 6,750,000" — student drags/zooms to the correct region and drops the marker; tolerance band shrinks as difficulty increases
- **Compare It:** Two markers (A and B) appear at random positions; student taps which is greater/lesser, or drags them into correct left-to-right order
- **Jump It:** Starting at a given number, student taps "+100,000" / "+1,000,000" / "−10,000" style jump buttons a set number of times to reach a target, reinforcing place-value composition

**Feedback:**
- Correct placement (within tolerance) → number line pulses green, ElevenLabs celebration line
- Incorrect → number line shows the correct zone with a soft arrow hint, ElevenLabs encouragement + hint to re-try

**Rounds (4 rounds, mixed mini-modes, randomised order and values each session)**

### 6.3 Station C — "Expand & Compare Lab" (Abstract)

**Visual:**
- A target number shown in standard form
- A shuffled tray of digit-value cards (e.g. "4,000,000" / "500,000" / "2,000" / "300" / "10" / "8") including 1–2 distractor cards with plausible-but-wrong values
- A comparison zone below showing 2–4 numbers to be ordered using drag-to-order or tap `>` `<` `=` connectors

**Interaction:**
- **Expand mode:** student drags the correct value-cards (in any order) into an "= ___ + ___ + ..." expression to match the target number; distractor cards must be left out
- **Compare/Order mode:** student drags a set of 3–4 numbers into ascending or descending order, or fills in the correct comparison symbol between two numbers

**Feedback:**
- Correct expansion → cards snap into place with a "chime" animation, expression glows
- Correct ordering → numbers align in a rainbow gradient bar from smallest to largest
- Incorrect → the mismatched card/position shakes gently; hint reveals the place value of the needed card

**Rounds (4 rounds — 2 expand-form rounds, 2 compare/order rounds; number magnitude increases: up to 100,000 → up to 1,000,000 → up to 10,000,000)**

---

## 7. Phase 4 — Question Bank (100 Randomised Questions)

### 7.1 Question Types (10 types × 10 questions = 100 total)

| Type | Description | Example |
|---|---|---|
| Q1 | Identify place value of a digit | In 4,208,613, what is the place value of the digit 8? |
| Q2 | Write numeral from words | Write in numerals: "six million, four hundred thousand, twelve" |
| Q3 | Write words from numeral | Write in words: 3,050,207 |
| Q4 | Expanded form → standard form | 5,000,000 + 200,000 + 40,000 + 3 = ___ |
| Q5 | Standard form → expanded form | Write 7,406,020 in expanded form |
| Q6 | Compare two numbers (`>`,`<`,`=`) | Compare: 2,450,900 ___ 2,405,900 |
| Q7 | Order a set of numbers | Arrange in ascending order: 980,000 / 1,020,000 / 899,999 |
| Q8 | Round to a given place value | Round 6,482,715 to the nearest hundred thousand |
| Q9 | Number-line placement (MCQ) | Which point on the number line best shows 3,750,000? |
| Q10 | Real-world word problem (compare/round/estimate) | City A has 2,340,500 people; City B has 2,304,500. Which city is larger, and by how much? |

### 7.2 Question Distribution by Difficulty

| Type | Count | Easy (≤100,000) | Medium (≤1,000,000) | Hard (≤10,000,000) |
|---|---|---|---|---|
| Q1 | 10 | 4 | 3 | 3 |
| Q2 | 10 | 3 | 4 | 3 |
| Q3 | 10 | 3 | 4 | 3 |
| Q4 | 10 | 4 | 3 | 3 |
| Q5 | 10 | 3 | 4 | 3 |
| Q6 | 10 | 4 | 3 | 3 |
| Q7 | 10 | 3 | 4 | 3 |
| Q8 | 10 | 3 | 4 | 3 |
| Q9 | 10 | 4 | 3 | 3 |
| Q10 | 10 | 2 | 4 | 4 |
| **Total** | **100** | **33** | **36** | **31** |

### 7.3 Randomisation Rules

- All 100 questions are generated from parametric templates (not fixed values) — the underlying number(s) for every question are procedurally generated within the difficulty band at **runtime**, so numeric values differ every session
- Question **order** is shuffled per session (Fisher-Yates)
- Question **type distribution per world** stays fixed (to preserve the pedagogical progression) but the **specific numbers, distractors, names, and contexts** are freshly randomised
- MCQ distractors are algorithmically generated to be plausible (off-by-one-digit errors, transposed digits, adjacent place-value confusion) rather than random noise

### 7.4 Global Names & Contexts Used in Word Problems

**Names (globally diverse cast):** John, Mike, Sarah, Priya, Wei Ming, Ahmed, Sofia, Liam, Aisha, Carlos, Emma, Yuki, Fatima, Noah, Mei, Diego, Olivia, Kwame, Elena, Ravi

**Contexts (globally neutral, avoiding single-country bias):** stadium/arena attendance, city and country populations, airport passenger counts, national park visitor counts, book/library collections, space mission distances (km to Moon/Mars), ocean depths in metres, social-media follower counts, marathon/race participant counts, harvest/production figures (tonnes of grain, litres of water)

### 7.5 Word Problem Format Templates

**Comparison sense:**
> "[Name] found that [Place A] has [number1] people, while [Place B] has [number2] people. Which place has more, and what is the difference?"

**Rounding/estimation sense:**
> "[Name] read that [context] recorded [number]. Round this number to the nearest [place value] to estimate it quickly."

**Place value sense:**
> "In the number [number], [Name] wants to know: what is the value of the digit in the [place value] place?"

---

## 8. Gamification Design

### 8.1 Reward System

- **Stars (⭐):** Earned per 10-question world (1–3 stars based on score)
- **XP Points:** 10 XP correct first try | 7 XP second try | 5 XP with hint used
- **Streak 🔥:** Fire counter for consecutive correct answers; +5 XP bonus per correct answer once streak ≥5

### 8.2 Badges (Unlockable)

- 🏅 **"Number Explorer"** — Complete Wonder + Story phases
- 🥈 **"Palace Builder"** — Complete all 3 Simulation stations
- 🥇 **"Millionaire Mind"** — Score ≥80% on Play phase
- 💎 **"Perfect Place Value"** — Score 10/10 in any world
- 🔥 **"Streak Star"** — Achieve a streak of 10 consecutive correct answers
- 🌟 **"Full Expedition"** — Complete all 6 phases (lesson complete badge)
- 🎯 **"Sharp Navigator"** — Get 5 correct in Station B without any wrong placement
- 📏 **"Round Master"** — Answer 5 rounding/estimation questions correctly (Q8/Q10)
- 🔢 **"Digit Detective"** — Answer 5 place-value-identification questions correctly (Q1) with no hints

### 8.3 Feedback Mechanics

- ✅ **Correct:** bounce animation, mascot happy mood, ElevenLabs celebration line, XP floats up, streak increments
- ❌ **Incorrect (Attempt 1):** gentle shake, ElevenLabs gentle encouragement, Hint 1 (place-value chart or number-line region highlighted)
- ❌ **Incorrect (Attempt 2):** stronger shake, Hint 2 (animated worked example)
- ❌ **Incorrect (Attempt 3):** answer revealed with animated explanation, no score penalty, encouragement only

No negative scoring. Encouragement-first approach always.

### 8.4 World Map (IntelliPlay™ Level Progression)

| World | Theme | Questions | Range/Focus |
|---|---|---|---|
| 1 | "Stadium Sprint" | Q1–10 | ≤100,000, place value basics |
| 2 | "City Skyline" | Q11–20 | ≤100,000, reading/writing numbers |
| 3 | "Harbor Crossing" | Q21–30 | ≤1,000,000, expanded form |
| 4 | "Mountain Trail" | Q31–40 | ≤1,000,000, comparing numbers |
| 5 | "Desert Expedition" | Q41–50 | ≤1,000,000, ordering & rounding |
| 6 | "Rainforest Trek" | Q51–60 | ≤10,000,000, place value & digit value |
| 7 | "Ocean Voyage" | Q61–70 | ≤10,000,000, number-line placement |
| 8 | "Sky Station" | Q71–80 | ≤10,000,000, rounding to large place values |
| 9 | "Galaxy Gateway" | Q81–90 | ≤10,000,000, mixed word problems |
| 10 | "Ten Million Summit" | Q91–100 | ≤10,000,000, hardest mixed challenge |

Unlock gate: ≥6/10 correct (1-star minimum) required to advance. 3 stars unlocks a hidden "Bonus Challenge" (3 extra questions).

### 8.5 Mascot (LearnFlow AI Companion)

- Character: "LearnFlow" robot (same brand mascot as reference product, re-skinned with an explorer's hat/backpack for this lesson's global-expedition theme)
- Mood states: idle | curious | happy | thinking | celebrating | encouraging
- Appearances: Wonder hook, Story narration, Simulation feedback, Reflect phase
- All mascot speech via ElevenLabs pre-generated `.mp3`

---

## 9. Audio & Narration Design

### 9.1 ElevenLabs Pipeline

- Voice Provider: **ElevenLabs only** — no browser TTS fallback
- Voice profile: a clear, warm, slightly more mature narrator voice suited to Grade 5 (age 10–11) audiences, distinct from the Grade 1 module's voice but from the same provider/model family (`eleven_multilingual_v2`)
- API Key Env Var: `VITE_ELEVENLABS_API_KEY`

### 9.2 Speech Styles

| Style | Use case |
|---|---|
| statement | Story narration, instructions |
| instruction | Simulation station prompts |
| question | Practice question read-aloud |
| encouragement | Correct answer feedback |
| emphasis | Key vocabulary highlight |
| thinking | Mascot thinking moments |
| celebration | Badge unlock, world complete |

### 9.3 Pre-generated & Dynamic Audio

- All phase narration (Wonder, Story panels, Simulate instructions, Reflect prompt, badge-unlock lines) pre-generated offline and stored as static `.mp3` in `public/assets/audio/`
- `audioMap.js` auto-generated, mapping exact narrated text strings → file paths
- Practice questions (Phase 4), since their numbers are randomised at runtime, are narrated via **dynamic generation** against the ElevenLabs API and cached in-memory for the session (never re-fetched for an identical string within the same session)
- If no API key is present, narration silently skips — no fallback text-to-speech

### 9.4 Narration Script Examples

**Phase 1 (Wonder)** — style: thinking
> "A stadium holds sixty-eight thousand fans. A country has nine million, four hundred fifty thousand people."
> "Which number is bigger — and by how much bigger?"
> "Let's learn how to read, compare, and master numbers this big!"

**Phase 2 (Story, Panel 3)** — style: emphasis
> "Every digit has its own place value. Ten millions, millions, hundred thousands, ten thousands, thousands, hundreds, tens, and ones."

**Phase 3 (Station A instruction)** — style: instruction
> "Drag the place value discs into the correct columns. Build the number four million, five hundred two thousand, three hundred eighteen!"

**Phase 4 (Correct feedback)** — style: celebration
> "Amazing! That's exactly right! You're mastering millions!"

**Phase 5 (Reflect)** — style: thinking
> "What an expedition! Can you write a number greater than one million and tell me the value of its millions digit?"

### 9.5 Audio-Text Parity Rule

Every on-screen narrated string must match its narration source text exactly (same words, punctuation, capitalisation) — identical rule to the reference product, to avoid confusing learners who read and listen simultaneously.

---

## 10. UX & Visual Design Requirements

### 10.1 Visual Theme

- Brand: Intellia SG — Think. Explore. Become.
- **Reference UI (strict mirror):** `https://equal-tau.vercel.app/`
- **Reference Repo (strict mirror):** `https://github.com/dsamyak/equal`
- Colour palette, card style, drop shadows, rounded typography (Nunito/Fredoka One), phase-band colour coding, and the overall page chrome (top bar with logo + phase dot tracker, bottom bar with XP/star/streak, main content area) are to be reproduced identically to the reference product; only the illustration subject matter and colour accents shift to a "Global Expedition" theme (globe, passport-stamp motifs, landmarks) appropriate for Grade 5 rather than the Grade 1 hawker-centre theme
- Illustrations: friendly, globally-inclusive character designs (no single-culture bias), landmark/travel motifs (stadiums, cities, airports, oceans, space)

### 10.2 Layout Structure (mirrors equal-tau.vercel.app)

- **Top Bar:** Intellia logo | Lesson title "Numbers Up to 10,000,000" | 6-phase dot tracker
- **Main Area:** Phase content (fills screen, responsive, smooth phase transitions)
- **Bottom Bar:** XP counter | Star count | Streak fire | Phase navigation arrows
- **Sidebar:** Hidden on mobile; shown on tablet+ as vertical phase map

### 10.3 Primary Visual Components (reused across phases)

- **Place-Value Chart** — 8-column chart (Ten Millions → Ones), colour-coded, digit slot-in animation
- **Number Line** — zoomable/scrollable SVG number line with animated marker
- **Expanded-Form Expression** — large, bold typography with drag-drop value cards

### 10.4 Accessibility

- Large tap targets (minimum 44×44px)
- WCAG AA colour contrast
- All narration via ElevenLabs
- Keyboard navigable (Tab + Enter)
- No mandatory time pressure (optional timer toggle in challenge mode only)
- Drag interactions have touch-equivalent tap+tap fallback throughout (Place Value Palace, Number Line Navigator, Expand & Compare Lab)

### 10.5 Responsive Design

- Primary: Desktop browser (1024px+) and tablet (768px+) — classroom and home context
- Secondary: Mobile (375px+) — stacked single-column layout, simplified number-line zoom gestures

---

## 11. Content Requirements

### 11.1 Simulation Visuals

- Place-value discs: 8 distinct colours/sizes correlated to magnitude (1 → 10,000,000)
- Number line: adaptive tick rendering, landmark icons at round millions
- Expand & Compare cards: large, bold, colour-coded by place value

### 11.2 Question Bank Coverage

- All 10 question types × 10 questions = 100 unique question **templates** in `questionBank.js`, each generating fresh random numeric values at runtime within its difficulty band
- Questions randomised per session using Fisher-Yates shuffle; numeric values re-rolled every attempt
- No two sessions present the same question order or the same underlying numbers
- MCQ distractors always plausible (adjacent place-value or digit-transposition errors)

### 11.3 Audio Script Parity (1:1 Strict Parity Rule)

Identical rule to Section 9.5 — enforced across `generate_audio.js` (static) and the dynamic question-narration path.

---

## 12. Success Criteria (v1.0)

| Criterion | Target |
|---|---|
| All 100 question templates randomise correctly at runtime | ✅ Required |
| All 3 simulation stations functional (Palace, Navigator, Lab) | ✅ Required |
| All 6 phases navigable end-to-end | ✅ Required |
| Gamification (XP, stars, 9 badges) working | ✅ Required |
| World map 10-world progression logic correct | ✅ Required |
| ElevenLabs audio plays for all phase narration + dynamic questions | ✅ Required |
| Audio pipeline (pre-gen + dynamic) functional | ✅ Required |
| Mobile/tablet/desktop responsive layout | ✅ Required |
| Global Grade 5 place-value & whole-number standards 100% covered | ✅ Required |
| Loads in < 3 seconds (Vite production build) | ✅ Required |
| WCAG AA accessible | ✅ Required |
| UI strictly matches equal-tau.vercel.app structure | ✅ Required |
| Hosted correctly at intelliasg.com Grade 5 lesson URL | ✅ Required |

---

## 13. Out of Scope (v1.0)

- Teacher dashboard / backend analytics
- Student login / account persistence across devices
- Multiplayer or class competition features
- Parent progress report emails
- Print worksheet generation
- Decimal numbers, negative numbers, or numbers beyond 10,000,000 (separate future modules)
- Assessment against a full broader test engine

---

## 14. Appendix — Global Character & Context Reference

**Global Cast (used consistently across Story panels, word problems, and mascot dialogue):** John, Mike, Sarah, Priya, Wei Ming, Ahmed, Sofia, Liam, Aisha, Carlos, Emma, Yuki, Fatima, Noah, Mei, Diego, Olivia, Kwame, Elena, Ravi

**Global, Culturally-Neutral Contexts:** stadiums/arenas, cities & countries (population), airports, national parks, oceans/seas, space distances, libraries, marathons, harvests, social platforms (follower counts)

---

**Document Version:** 1.0 | July 2026
**Product:** Intellia SG — Grade 5 Math
**Lesson Title:** Numbers Up to 10,000,000 — Whole Numbers & Place Value
**Curriculum:** Global Grade 5 Mathematics (Common Core / Singapore MOE / Cambridge Primary / CBSE / IB PYP / Australian Curriculum cross-aligned)
**Reference UI:** https://equal-tau.vercel.app/
**Reference Repo:** https://github.com/dsamyak/equal
**Audio Pipeline:** ElevenLabs (`eleven_multilingual_v2`)
**Parent Course Page:** https://intelliasg.com/courses/grade-5-math
**Lesson URL:** https://intelliasg.com/courses/grade-5-math/lessons/numbers-up-to-10000000/
