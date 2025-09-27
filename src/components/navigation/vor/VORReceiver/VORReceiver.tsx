import React from 'react';
import { FrequencySelector } from './FrequencySelector';
import { OBSKnob } from './OBSKnob';
import { TOFROMIndicator } from './TOFROMIndicator';
import type { VORStation } from '../../../../hooks/useVOR';
import './VORReceiver.css';

interface VORReceiverProps {
  selectedFrequency: number | null;
  onFrequencyChange: (frequency: number) => void;
  obsCourse: number;
  onObsCourseChange: (course: number) => void;
  isSignalValid: boolean;
  currentStation: VORStation | null;
  toFromIndicator: 'TO' | 'FROM' | 'OFF';
}

export const VORReceiver: React.FC<VORReceiverProps> = ({
  selectedFrequency,
  onFrequencyChange,
  obsCourse,
  onObsCourseChange,
  isSignalValid,
  currentStation,
  toFromIndicator
}) => {
  return (
    <div className="vor-receiver">
      <div className="receiver-panel">
        {/* Заголовок */}
        <div className="receiver-header">
          <h3>VOR NAVIGATOR</h3>
          <div className={`signal-indicator ${isSignalValid ? 'valid' : 'invalid'}`}>
            {isSignalValid ? '●' : '○'} SIGNAL
          </div>
        </div>

        {/* Дисплей частоты */}
        <div className="frequency-display">
          <div className="frequency-label">FREQUENCY</div>
          <div className="frequency-value">
            {selectedFrequency ? selectedFrequency.toFixed(1) : '---.-'}
          </div>
          <div className="frequency-unit">MHz</div>
        </div>

        {/* Селектор частоты */}
        <FrequencySelector
          selectedFrequency={selectedFrequency}
          onFrequencyChange={onFrequencyChange}
        />

        {/* УЛУЧШЕННЫЙ КОНТЕЙНЕР OBS */}
        <div className="obs-container">
          <div className="obs-header">
            <span className="obs-label">COURSE SETTING (OBS)</span>
          </div>
          
          <div className="obs-layout">
            {/* Левая часть: дисплей курса и индикатор TO/FROM */}
            <div className="obs-display-section">
              <div className="obs-course-display">
                <div className="course-label">SET COURSE</div>
                <div className="course-value">
                  {obsCourse.toString().padStart(3, '0')}°
                </div>
              </div>
              
              <div className="tofrom-display">
                <span className="tofrom-label">TO/FROM</span>
                <TOFROMIndicator indicator={toFromIndicator} />
              </div>
            </div>

            {/* Правая часть: ручка OBS */}
            <div className="obs-control-section">
              <OBSKnob
                course={obsCourse}
                onCourseChange={onObsCourseChange}
                currentRadial={currentStation ? calculateBearing(currentStation.position, {x: 400, y: 400}) : null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Вспомогательная функция для расчета радиала
const calculateBearing = (station: { x: number; y: number }, aircraft: { x: number; y: number }): number => {
  const dx = aircraft.x - station.x;
  const dy = station.y - aircraft.y;
  let angle = Math.atan2(dx, dy) * (180 / Math.PI);
  angle = (angle + 360) % 360;
  return Math.round(angle);
};