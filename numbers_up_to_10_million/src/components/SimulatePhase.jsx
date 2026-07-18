import React, { useState, useCallback, useEffect } from 'react';
import SymbolDecoder from './simulations/SymbolDecoder';
import PlaceValuePalace from './simulations/PlaceValuePalace';
import NumberLineNavigator from './simulations/NumberLineNavigator';
import ExpandCompareLab from './simulations/ExpandCompareLab';
import { speak } from '../utils/audio';

const STATIONS = [
  { id: 0, title: 'Decoder', subtitle: 'Ancient Symbols', icon: '🌟' },
  { id: 1, title: 'Palace', subtitle: 'Place Value', icon: '🏰' },
  { id: 2, title: 'Navigator', subtitle: 'Number Line', icon: '📍' },
  { id: 3, title: 'Lab', subtitle: 'Expand & Compare', icon: '🧪' },
];

export default function SimulatePhase({ onComplete, audioEnabled }) {
  const [station, setStation] = useState(0);
  const nextStation = useCallback(() => { if (station < 3) setStation(s => s + 1); }, [station]);

  useEffect(() => {
    if (audioEnabled) {
      if (station === 0) speak("Ancient Symbol Decoder", true);
      if (station === 1) speak("Place Value Palace", true);
      if (station === 2) speak("Number Line Navigator", true);
      if (station === 3) speak("Expand and Compare Lab", true);
    }
  }, [station, audioEnabled]);

  return (
    <div className="simulate-phase">
      <div className="simulate-header">
        <h3 className="simulate-label">🧪 Simulate</h3>
        <p className="simulate-sublabel">Explore and discover — no wrong answers!</p>
      </div>
      <div className="progress-dots">
        {STATIONS.map((s, i) => (
          <div key={i} className="simulate-dot-wrapper">
            <div className={`progress-dot ${i === station ? 'active' : i < station ? 'completed' : ''}`} />
            <span className="simulate-dot-label">{s.icon}</span>
          </div>
        ))}
      </div>
      <div className="glass-card" style={{ maxWidth: 800, width: '100%', animation: 'slideUp 0.4s ease' }}>
        {station === 0 && <SymbolDecoder audioEnabled={audioEnabled} onNext={nextStation} />}
        {station === 1 && <PlaceValuePalace audioEnabled={audioEnabled} onNext={nextStation} />}
        {station === 2 && <NumberLineNavigator audioEnabled={audioEnabled} onNext={nextStation} />}
        {station === 3 && <ExpandCompareLab audioEnabled={audioEnabled} onComplete={onComplete} />}
      </div>
    </div>
  );
}
