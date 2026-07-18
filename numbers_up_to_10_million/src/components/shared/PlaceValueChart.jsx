import React from 'react';

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

export default function PlaceValueChart({ digits, highlightIndex, animated = false, missingIndex }) {
  // digits: array of 8 digit values (0-9), left to right = Ten Millions -> Ones
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
              {isMissing ? '?' : (digits && digits[i] !== undefined ? digits[i] : '')}
            </text>
            <text x={x + 50} y="130" textAnchor="middle" fontSize="11" fill="#64748B">
              {col.label.split('\n').map((line, idx) => (
                <tspan x={x + 50} dy={idx === 0 ? 0 : 12} key={idx}>{line}</tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
