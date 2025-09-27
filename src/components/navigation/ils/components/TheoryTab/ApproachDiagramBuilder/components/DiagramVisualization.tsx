import React from 'react';
import type { ApproachConfig, CalculationResults } from '../../../../types/ils.types';
import { 
  DiagramWrapper,
  DiagramTitle,
  SimpleDiagram,
  Runway,
  AircraftPath,
  WindIndicator,
  InfoLabels,
  InfoLabel
} from './DiagramVisualization.styles';

interface DiagramVisualizationProps {
  config: ApproachConfig;
  calculations: CalculationResults;
}

export const DiagramVisualization: React.FC<DiagramVisualizationProps> = ({ 
  config, 
  calculations 
}) => {
  const { runwayHeading, wind } = config;
  const { windCorrectionAngle, crosswind, headwind } = calculations;

  // Простые расчеты для визуализации
  
  const correctionOffset = windCorrectionAngle * 3; // Смещение от угла сноса

  return (
    <DiagramWrapper>
      <DiagramTitle>📐 Схема захода на посадку</DiagramTitle>
      
      <SimpleDiagram>
        {/* Ветровой индикатор */}
        <WindIndicator $direction={wind.direction} $strength={wind.speed}>
          <div className="wind-arrow">↓</div>
          <div className="wind-info">
            {wind.speed} узлов
            <br />
            {wind.direction}°
          </div>
        </WindIndicator>

        {/* ВПП */}
        <Runway>
          <div className="runway-number">{runwayHeading.toString().padStart(2, '0')}</div>
          <div className="runway-centerline"></div>
        </Runway>

        {/* Траектории */}
        <AircraftPath $type="ideal" $offset={0}>
          <div className="path-line"></div>
          <div className="path-label">Идеальный курс</div>
        </AircraftPath>

        <AircraftPath $type="corrected" $offset={correctionOffset}>
          <div className="path-line"></div>
          <div className="path-label">
            С учетом ветра
            <br />
            <small>Угол сноса: {windCorrectionAngle}°</small>
          </div>
        </AircraftPath>

        {/* Информационные метки */}
        <InfoLabels>
          <InfoLabel $type="wind">
            <strong>Боковой ветер:</strong> {Math.abs(crosswind).toFixed(1)} узлов
          </InfoLabel>
          <InfoLabel $type="headwind">
            <strong>{headwind > 0 ? 'Встречный' : 'Попутный'}:</strong> {Math.abs(headwind).toFixed(1)} узлов
          </InfoLabel>
        </InfoLabels>
      </SimpleDiagram>
    </DiagramWrapper>
  );
};