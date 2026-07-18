import { useState, useEffect, useCallback, useRef } from 'react';
import { speak, stopNarration } from '../utils/audio';
import { getStoryNarration } from '../utils/narration';

const STORY_SLIDES = [
  {
    image: '/assets/images/story_panel1_1784275811051.png',
    title: "The Massive Stadium",
    text: "John visits a huge sports stadium. He says, 'This stadium seats 82,500 people. That's eighty-two thousand, five hundred!'",
    highlight: '"82,500 = Eighty-two thousand, five hundred"',
    mascotText: "Numbers this big are everywhere! 🏟️",
  },
  {
    image: '/assets/images/story_panel2_1784275880723.png',
    title: "A Crowded City",
    text: "Sarah looks at a map of her city. 'My city has 1,240,000 people — one million, two hundred forty thousand!'",
    highlight: '"1,240,000 = One million, two hundred forty thousand"',
    mascotText: "Millions are huge! 🏙️",
  },
  {
    image: '/assets/images/wonder_hook_1784275794032.png',
    title: "Place Values",
    text: "Every digit has its own place value: ten millions, millions, hundred thousands, ten thousands, thousands, hundreds, tens, and ones.",
    highlight: '"Place value shows what a digit is worth!"',
    mascotText: "Let's organize them in columns! 📊",
  },
  {
    image: '/assets/images/story_panel4_1784275901974.png',
    title: "Busy Airport",
    text: "Mike visits an international airport. 'This airport welcomes 9,700,000 travellers every year!'",
    highlight: '"9,700,000 travellers!"',
    mascotText: "That is almost ten million! ✈️",
  },
  {
    image: '/assets/images/story_panel5_1784275931635.png',
    title: "Comparing Cities",
    text: "Priya compares two places. '1,240,000 is less than 9,700,000 — nine million, seven hundred thousand is much bigger!'",
    highlight: '"1,240,000 < 9,700,000"',
    mascotText: "Great comparison! 📏",
  },
];

export default function StoryPhase({ onComplete, audioEnabled }) {
  const [slide, setSlide] = useState(0);
  const [anim, setAnim] = useState(false);
  const narrationRef = useRef(null);
  const s = STORY_SLIDES[slide];
  const isLast = slide === STORY_SLIDES.length - 1;
  const pct = ((slide + 1) / STORY_SLIDES.length) * 100;

  useEffect(() => {
    if (audioEnabled) {
      speak(s.text, true);
    }
  }, [slide, audioEnabled, s.text]);

  const goNext = useCallback(() => {
    if (anim) return;
    narrationRef.current?.cancel();
    stopNarration();
    setAnim(true);
    setTimeout(() => { isLast ? onComplete() : setSlide(i => i + 1); setAnim(false); }, 350);
  }, [anim, isLast, onComplete]);

  const goPrev = useCallback(() => {
    if (anim || slide === 0) return;
    narrationRef.current?.cancel();
    stopNarration();
    setAnim(true);
    setTimeout(() => { setSlide(i => i - 1); setAnim(false); }, 350);
  }, [anim, slide]);

  return (
    <div className="story-phase">
      <div className="story-progress">
        <div className="story-progress-bar"><div className="story-progress-fill" style={{ width: `${pct}%` }} /></div>
        <span className="story-progress-label">{slide + 1} / {STORY_SLIDES.length}</span>
      </div>

      <div className={`story-card ${anim ? 'flipping' : ''}`}>
        {/* key=slide forces React to remount the img element, re-triggering CSS slide-in animation */}
        <div className="story-image-section">
          <img key={slide} src={s.image} alt={s.title} className="story-image story-image-enter"
            onError={(e) => { e.target.style.display = 'none'; }} />
          <div className="story-image-overlay" />
        </div>

        <div className="story-text-section">
          <h2 className="story-title">{s.title}</h2>
          <p className="story-text revealed">{s.text}</p>
          <div className="story-highlight visible">
            <span>✨</span><span className="story-highlight-text">{s.highlight}</span><span>✨</span>
          </div>
          <div className="story-mascot">
            <div className="mascot" style={{ width: 54, height: 54, fontSize: '1.5rem' }}>🤖</div>
            <div className="speech-bubble" style={{ fontSize: '0.9rem', padding: '10px 16px', maxWidth: 200 }}>{s.mascotText}</div>
          </div>
        </div>
      </div>

      <div className="story-nav" style={{ maxWidth: 900 }}>
        <button className="btn btn-outline btn-sm" onClick={goPrev} disabled={slide === 0} style={{ opacity: slide === 0 ? 0.3 : 1 }}>← Back</button>
        <div className="story-dots">
          {STORY_SLIDES.map((_, i) => (<div key={i} className={`story-dot ${i === slide ? 'active' : i < slide ? 'completed' : ''}`} />))}
        </div>
        <button className={`btn ${isLast ? 'btn-green' : 'btn-primary'} btn-sm`} onClick={goNext}>
          {isLast ? "🚀 Let's Explore!" : 'Next →'}
        </button>
      </div>
    </div>
  );
}
