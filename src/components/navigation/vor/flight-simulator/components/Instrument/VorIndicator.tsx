// src/components/flight-simulator/components/Instrument/VorIndicator.tsx
import React from 'react';
import './VorIndicator.css';

interface VorIndicatorProps {
  deviation: number; // -1 to 1
  toFrom: 'TO' | 'FROM' | 'OFF';
  obs: number;
}

export const VorIndicator: React.FC<VorIndicatorProps> = ({
  deviation,
  toFrom,
  obs
}) => {
  return (
    <div className="vor-indicator">
      <div className="vor-indicator-header">
        <h4>VOR Индикатор</h4>
      </div>
      
      <div className="vor-indicator-face">
        <div className="vor-deviation-bar" style={{ 
          transform: `translateX(${deviation * 40}px)` 
        }} />
        <div className="vor-center-dot" />
      </div>
      
      <div className="vor-indicator-readouts">
        <div className="vor-obs-display">
          <span className="label">OBS:</span>
          <span className="value">{obs}°</span>
        </div>
        
        <div className={`vor-tofrom-display ${toFrom.toLowerCase()}`}>
          {toFrom === 'OFF' ? 'NO SIGNAL' : toFrom}
        </div>
      </div>
    </div>
  );
};