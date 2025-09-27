import React from 'react';
import './TOFROMIndicator.css';

interface TOFROMIndicatorProps {
  indicator: 'TO' | 'FROM' | 'OFF';
}

export const TOFROMIndicator: React.FC<TOFROMIndicatorProps> = ({ indicator }) => {
  return (
    <div className="tofrom-indicator">
      <div className="indicator-label">TO/FROM</div>
      <div className={`indicator-display ${indicator.toLowerCase()}`}>
        <span className="to-arrow">→</span>
        <span className="from-arrow">←</span>
        <div className="active-indicator">
          {indicator === 'TO' && <span className="active-arrow">→</span>}
          {indicator === 'FROM' && <span className="active-arrow">←</span>}
          {indicator === 'OFF' && <span className="off-text">--</span>}
        </div>
      </div>
    </div>
  );
};