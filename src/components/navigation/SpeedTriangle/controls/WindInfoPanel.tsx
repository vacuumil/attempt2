// WindInfoPanel.tsx - обновите импорты и логику
import React from 'react';
import { getWindEffectDescription} from '../data/presets';
import { meteoToNavDirection } from '../calculations/calculations';
import type { SpeedTriangleState } from '../types/types';

interface WindInfoPanelProps {
  state: SpeedTriangleState;
  wca: number;
}

export const WindInfoPanel: React.FC<WindInfoPanelProps> = ({ state, wca }) => {
  const { windSpeed, windDirection, trueCourse } = state;
  
  if (windSpeed === 0) {
    return (
      <div className="wind-info-panel">
        <h4>Информация о ветре</h4>
        <div className="wind-info calm">
          <span className="wind-icon">🌤️</span>
          <span>Штиль - ветра нет</span>
        </div>
      </div>
    );
  }

  // Преобразуем метеорологическое направление в навигационное для расчета эффекта
  const navWindDirection = meteoToNavDirection(windDirection);
  const windEffect = getWindEffectDescription(navWindDirection, trueCourse);
  const windAngle = ((navWindDirection - trueCourse + 360) % 360);

  // Создаем CSS-класс на основе типа ветра
  const getEffectClass = (effect: string): string => {
    const effectMap: { [key: string]: string } = {
      'Попутный': 'попутный',
      'Попутный справа': 'попутный-слева',
      'Боковой справа': 'боковой-слева',
      'Встречный справа': 'встречный-слева',
      'Встречный': 'встречный',
      'Встречный слева': 'встречный-справа',
      'Боковой слева': 'боковой-справа',
      'Попутный слева': 'попутный-справа'
    };
    return effectMap[effect] || 'попутный';
  };

  return (
    <div className="wind-info-panel">
      <h4>Информация о ветре</h4>
      <div className="wind-details">
        <div className="wind-basic">
          <span className="wind-speed">{windSpeed} kt</span>
          <span className="wind-direction">/{windDirection}°</span>
        </div>
        <div className="wind-effect">
          <span className={`effect-type ${getEffectClass(windEffect)}`}>
            {windEffect}
          </span>
          <span className="wind-angle">({windAngle.toFixed(0)}° от курса)</span>
        </div>
        <div className="wind-impact">
          <span>Угол сноса: </span>
          <span className={`wca-value ${Math.abs(wca) > 10 ? 'high' : Math.abs(wca) > 5 ? 'medium' : 'low'}`}>
            {wca.toFixed(1)}°
          </span>
        </div>
      </div>
    </div>
  );
};