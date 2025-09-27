// src/components/flight-simulator/components/Controls/NavControls.tsx
import React, { useState, useCallback } from 'react';
import type { VorStation } from '../Map/types';
import { StationSelector } from './StationSelector';
import './NavControls.css';

interface NavControlsProps {
  stations: VorStation[];
  activeStationId: string | null;
  obs: number;
  onStationSelect: (stationId: string) => void;
  onObsChange: (obs: number) => void;
}

export const NavControls: React.FC<NavControlsProps> = ({
  stations,
  activeStationId,
  obs,
  onStationSelect,
  onObsChange
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragStartObs, setDragStartObs] = useState(0);

  const handleKnobMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartY(e.clientY);
    setDragStartObs(obs);
    e.preventDefault();
  }, [obs]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const deltaY = dragStartY - e.clientY;
    const sensitivity = 0.5; // Чувствительность вращения
    const newObs = (dragStartObs + deltaY * sensitivity + 360) % 360;
    
    onObsChange(Math.round(newObs));
  }, [isDragging, dragStartY, dragStartObs, onObsChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Добавляем обработчики глобальных событий мыши
  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleObsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (value > 359) value = 359;
    if (value < 0) value = 0;
    onObsChange(value);
  };

  return (
    <div className="nav-controls">
      <h3>🌐 Навигация VOR</h3>
      
      <StationSelector
        stations={stations}
        activeStationId={activeStationId}
        onStationSelect={onStationSelect}
      />
      
      <div className="control-group">
        <label>🎯 OBS Радиал (°):</label>
        <div className="obs-controls">
          <input
            type="number"
            min="0"
            max="359"
            value={obs}
            onChange={handleObsInputChange}
            disabled={!activeStationId}
            className="obs-input"
            placeholder="000"
          />
          
          {/* Ручка для вращения OBS */}
          <div className="obs-knob-container">
            <div 
              className="obs-knob"
              onMouseDown={handleKnobMouseDown}
              style={{ transform: `rotate(${obs}deg)` }}
              title="Вращайте мышью для установки радиала"
            >
              <div className="knob-marker"></div>
            </div>
            <div className="obs-knob-label">{obs}°</div>
          </div>

          <div className="obs-buttons">
            <button 
              onClick={() => onObsChange((obs - 1 + 360) % 360)}
              disabled={!activeStationId}
              className="obs-btn"
            >
              -1
            </button>
            <button 
              onClick={() => onObsChange((obs + 1) % 360)}
              disabled={!activeStationId}
              className="obs-btn"
            >
              +1
            </button>
          </div>
        </div>
      </div>

      {activeStationId && (
        <div className="active-station-info">
          <div className="station-status">📻 Активная станция:</div>
          <div className="station-details">
            <span className="station-name">
              {stations.find(s => s.id === activeStationId)?.name}
            </span>
            <span className="station-frequency">
              {stations.find(s => s.id === activeStationId)?.frequency} MHz
            </span>
          </div>
        </div>
      )}
    </div>
  );
};