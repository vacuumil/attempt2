// src/components/flight-simulator/components/Instrument/WindIndicator.tsx
import React from 'react';
import type { Wind } from '../../utils/wind';
import './WindIndicator.css';

interface WindIndicatorProps {
  wind: Wind;
  isWindEnabled: boolean;
  onToggleWind: () => void;
  onGenerateWind: () => void;
}

export const WindIndicator: React.FC<WindIndicatorProps> = ({
  wind,
  isWindEnabled,
  onToggleWind,
  onGenerateWind
}) => {
  return (
    <div className="wind-indicator">
      <h4>Ветер</h4>
      
      <div className="wind-visual">
        <div className="wind-direction">
          <div 
            className="wind-arrow"
            style={{ transform: `rotate(${wind.direction}deg)` }}
          >
            ↑
          </div>
        </div>
        <div className="wind-info">
          <div className="wind-speed">{wind.speed.toFixed(1)} ед.</div>
          <div className="wind-degrees">{Math.round(wind.direction)}°</div>
        </div>
      </div>

      <div className="wind-controls">
        <label className="wind-toggle">
          <input
            type="checkbox"
            checked={isWindEnabled}
            onChange={onToggleWind}
          />
          <span className="toggle-slider"></span>
          Ветер {isWindEnabled ? 'Вкл' : 'Выкл'}
        </label>
        
        <button onClick={onGenerateWind} className="generate-wind-btn">
          🎲 Случайный ветер
        </button>
      </div>

      {isWindEnabled && (
        <div className="wind-status active">
          Ветер активен: {Math.round(wind.direction)}° / {wind.speed.toFixed(1)} ед.
        </div>
      )}
    </div>
  );
};