// WindCompass.tsx - обновите для метеорологического направления
import React from 'react';
import { toRad, meteoToNavDirection } from '../calculations/calculations';

interface WindCompassProps {
  windDirection: number; // Метеорологическое направление
  trueCourse: number;
  windSpeed: number;
}

export const WindCompass: React.FC<WindCompassProps> = ({
  windDirection,
  trueCourse,
  windSpeed
}) => {
  const size = 120;
  const center = size / 2;
  const radius = size / 2 - 10;

  const courseRad = toRad(trueCourse);
  // Преобразуем метеорологическое в навигационное для отображения стрелки
  const navWindDirection = meteoToNavDirection(windDirection);
  const windRad = toRad(navWindDirection);

  return (
    <div className="wind-compass">
      <h5>Визуализация ветра</h5>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Компас */}
        <circle cx={center} cy={center} r={radius} fill="rgba(10, 25, 47, 0.8)" stroke="#1a6fc4" />
        
        {/* Север */}
        <text x={center} y={15} fill="#64ffda" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="'Exo 2', sans-serif">N</text>
        
        {/* Курс самолета */}
        <line
          x1={center}
          y1={center}
          x2={center + radius * 0.7 * Math.sin(courseRad)}
          y2={center - radius * 0.7 * Math.cos(courseRad)}
          stroke="#1a6fc4"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Ветер */}
        {windSpeed > 0 && (
          <>
            <line
              x1={center}
              y1={center}
              x2={center + radius * 0.9 * Math.sin(windRad)}
              y2={center - radius * 0.9 * Math.cos(windRad)}
              stroke="#ff6b6b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4,2"
            />
            <text
              x={center + radius * 0.7 * Math.sin(windRad)}
              y={center - radius * 0.7 * Math.cos(windRad) + 4}
              fill="#ff6b6b"
              fontSize="8"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="'Share Tech Mono', monospace"
            >
              {windSpeed}kt
            </text>
          </>
        )}
      </svg>
    </div>
  );
};