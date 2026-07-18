import { useState, useEffect, useCallback, useRef } from 'react';
import { speak, narrate, stopNarration } from '../utils/audio';
import { wonderNarration, wonderDiscoverNarration } from '../utils/narration';

const WONDER_QUESTIONS = [
  {
    question: "A stadium holds 68,000 fans. A country has 9,450,000 people. Which number is bigger — and by how much?",
    subtext: "Let's learn how to read, compare, and master numbers this big!",
    emoji: "🏟️",
    bgEmojis: ["🏟️", "🌍", "✨", "🔢"],
  },
  {
    question: "If an airport welcomes 9,700,000 travellers every year, how do we write that number in words?",
    subtext: "Millions are huge numbers. Let's master them together!",
    emoji: "✈️",
    bgEmojis: ["✈️", "🌍", "🔢", "💡"],
  },
  {
    question: "Which is greater: 1,240,000 or 1,042,000?",
    subtext: "Comparing millions is easy once you know place value!",
    emoji: "🏙️",
    bgEmojis: ["🏙️", "📊", "🧮", "✨"],
  },
];

export default function WonderPhase({ onComplete, audioEnabled }) {
  const [wonder] = useState(() => WONDER_QUESTIONS[0]);
  const [stage, setStage] = useState(0);
  const [page, setPage] = useState(0); // 0 = hook, 1 = topic intro
  const [particles, setParticles] = useState([]);
  const narrationRef = useRef(null);

  useEffect(() => {
    const p = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: wonder.bgEmojis[i % wonder.bgEmojis.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      size: 1.2 + Math.random() * 1.5,
    }));
    setParticles(p);
  }, [wonder]);

  useEffect(() => {
    if (page === 0) {
      const t1 = setTimeout(() => setStage(1), 300);
      const t2 = setTimeout(() => setStage(2), 1200);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [page]);

  useEffect(() => {
    if (audioEnabled) {
      if (page === 0 && stage === 1) {
        speak(`${wonder.question} ${wonder.subtext}`, true);
      } else if (page === 1) {
        speak("Get ready to explore massive numbers! Let's master reading, writing, and comparing millions!", true);
      }
    }
  }, [stage, page, audioEnabled, wonder]);

  const handleDiscover = useCallback(() => {
    narrationRef.current?.cancel();
    stopNarration();
    setPage(1); // Go to second page instead of completing
  }, []);

  const handleCompletePhase = useCallback(() => {
    narrationRef.current?.cancel();
    stopNarration();
    onComplete();
  }, [onComplete]);

  return (
    <div className="wonder-phase">
      <div className="wonder-particles">
        {particles.map(p => (
          <span key={p.id} className="wonder-particle" style={{
            left: `${p.x}%`, top: `${p.y}%`,
            animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`,
            fontSize: `${p.size}rem`,
          }}>{p.emoji}</span>
        ))}
      </div>
      
      {page === 0 && (
        <div className="wonder-content">
          <div className={`wonder-qmark ${stage >= 1 ? 'revealed' : ''}`}>
            <span className="wonder-qmark-icon">?</span>
            <div className="wonder-qmark-glow" />
          </div>
          <div className={`wonder-mascot ${stage >= 1 ? 'visible' : ''}`}>
            <div className="mascot thinking">🤖</div>
            <div className="speech-bubble wonder-bubble">Hmm... I wonder... 🤔</div>
          </div>
          <div className={`wonder-question-card ${stage >= 1 ? 'visible' : ''}`}>
            <div className="wonder-emoji">{wonder.emoji}</div>
            <h2 className="wonder-question-text">{wonder.question}</h2>
            <p className="wonder-subtext">{wonder.subtext}</p>
          </div>
          <button className={`btn btn-wonder ${stage >= 2 ? 'visible' : ''}`} onClick={handleDiscover} id="discover-btn">
            <span className="wonder-btn-sparkle">✨</span>
            Let's Discover!
            <span className="wonder-btn-sparkle">✨</span>
          </button>
        </div>
      )}

      {page === 1 && (
        <div className="wonder-content" style={{ animation: 'slideUp 0.5s ease' }}>
          <div className="glass-card" style={{ maxWidth: 700, textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--gold)', marginBottom: 24 }}>
              Numbers Up To 10,000,000
            </h2>
            <div style={{ fontSize: '4rem', margin: '20px 0' }}>🌍 🚀 📊</div>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: 32 }}>
              Get ready to explore massive numbers! Let's master reading, writing, and comparing millions!
            </p>
            <button className="btn btn-primary btn-lg" onClick={handleCompletePhase}>
              Start the Expedition →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
