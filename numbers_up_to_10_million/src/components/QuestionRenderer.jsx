import React, { useState, useCallback } from 'react';
import PlaceValueChart from './shared/PlaceValueChart';
import NumberLine from './shared/NumberLine';

function Visual({ question }) {
  if (!question.visual || question.visual === 'plain') return null;

  if (question.visual === 'placeValueChart') {
    const num = String(question.correctAnswer).replace(/,/g, '');
    let digits = Array(8).fill(0);
    if (!isNaN(parseInt(num, 10))) {
      const dStr = String(parseInt(num, 10)).padStart(8, '0');
      digits = dStr.split('').map(Number);
    }
    return (
      <div style={{ margin: '20px 0', overflowX: 'auto' }}>
        <PlaceValueChart digits={digits} animated={false} missingIndex={null} />
      </div>
    );
  }

  if (question.visual === 'numberLine') {
    const val = parseInt(String(question.correctAnswer).replace(/,/g, ''), 10);
    let zoomLevel = 1;
    if (val >= 1000000) zoomLevel = 2;
    if (val < 1000000) zoomLevel = 3;
    const markers = !isNaN(val) ? [{ value: val, label: '?' }] : [];
    
    return (
      <div style={{ margin: '20px 0', overflowX: 'auto' }}>
        <NumberLine markers={markers} zoomLevel={zoomLevel} />
      </div>
    );
  }

  if (question.visual === 'expandedForm') {
    return (
      <div style={{ margin: '20px 0', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--coral)' }}>
        {question.questionText.split('=')[0]}
      </div>
    );
  }

  return null;
}

export default function QuestionRenderer({ question, onAnswer, disabled }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = useCallback((option) => {
    if (disabled) return;
    setSelectedOption(option);
    const isCorrect = String(option) === String(question.correctAnswer);
    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedOption(null);
    }, 600);
  }, [disabled, question.correctAnswer, onAnswer]);

  return (
    <div>
      <div style={{ display: 'inline-block', background: 'var(--coral)', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700, marginBottom: 12, letterSpacing: '0.5px' }}>
        🔢 NUMBERS UP TO 10M
      </div>
      <p className="question-text">{question.questionText}</p>

      <Visual question={question} />

      {question.options && (
        <div className="options-grid">
          {question.options.map((opt, i) => {
            let cls = 'option-btn';
            if (disabled) cls += ' disabled';
            if (selectedOption === opt) {
              cls += String(opt) === String(question.correctAnswer) ? ' correct' : ' wrong';
            } else if (disabled && String(opt) === String(question.correctAnswer)) {
              cls += ' correct';
            }
            return (
              <button key={i} className={cls} onClick={() => handleOptionClick(opt)}>
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
