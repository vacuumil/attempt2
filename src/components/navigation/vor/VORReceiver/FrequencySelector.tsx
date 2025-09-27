import React from 'react';
import './FrequencySelector.css';

interface FrequencySelectorProps {
  selectedFrequency: number | null;
  onFrequencyChange: (frequency: number) => void;
}

// Только 12 основных частот, включая станции с карты
const availableFrequencies = [
  108.0, 109.2, 110.4, 
  111.6, 112.1, 113.5, // Станции с карты: 112.1, 113.5, 115.7
  114.8, 115.7, 116.8, 
  117.2, 117.8, 118.0
];

export const FrequencySelector: React.FC<FrequencySelectorProps> = ({
  selectedFrequency,
  onFrequencyChange
}) => {
  const handleFrequencyClick = (frequency: number) => {
    onFrequencyChange(frequency);
  };

  const handleManualFrequency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 108.0 && value <= 118.0) {
      onFrequencyChange(value);
    }
  };

  const isMapFrequency = (frequency: number) => {
    return [112.1, 113.5, 115.7].includes(frequency);
  };

  return (
    <div className="frequency-selector">
      <div className="selector-header">
        <span className="selector-label">VOR FREQUENCY SELECTOR</span>
      </div>
      
      <div className="frequency-grid">
        {availableFrequencies.map((frequency) => (
          <button
            key={frequency}
            className={`frequency-button ${
              selectedFrequency === frequency ? 'active' : ''
            } ${isMapFrequency(frequency) ? 'map-frequency' : ''}`}
            onClick={() => handleFrequencyClick(frequency)}
            title={`${frequency} MHz ${isMapFrequency(frequency) ? '(на карте)' : ''}`}
          >
            {frequency.toFixed(1)}
            {isMapFrequency(frequency) && <span className="map-indicator">📍</span>}
          </button>
        ))}
      </div>

      <div className="manual-frequency">
        <label htmlFor="manual-frequency" className="manual-label">
          РУЧНОЙ ВВОД:
        </label>
        <input
          id="manual-frequency"
          type="number"
          step="0.1"
          min="108.0"
          max="118.0"
          value={selectedFrequency || ''}
          onChange={handleManualFrequency}
          className="manual-input"
          placeholder="108.0 - 118.0"
        />
      </div>

      <div className="frequency-help">
        <span className="help-text">Диапазон VOR: 108.0 - 118.0 MHz</span>
        <span className="help-text highlight">📍 - станции на карте</span>
      </div>
    </div>
  );
};