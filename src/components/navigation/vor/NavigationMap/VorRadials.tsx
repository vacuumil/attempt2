import React, { useState } from 'react';
import type { VORStation } from '../../../../hooks/useVOR';
import './VorRadials.css';

interface VorRadialsProps {
  station: VORStation;
  obsCourse: number;
}

export const VorRadials: React.FC<VorRadialsProps> = ({ station, obsCourse }) => {
  const [customRadial, setCustomRadial] = useState<number | null>(null);

  const showCustomRadial = (e: React.MouseEvent) => {
    e.stopPropagation(); // Важно: предотвращаем всплытие
    const radial = prompt('Введите радиал (0-359°):');
    if (radial !== null) {
      const value = parseInt(radial);
      if (!isNaN(value) && value >= 0 && value <= 359) {
        setCustomRadial(value);
      } else {
        alert('Пожалуйста, введите число от 0 до 359');
      }
    }
  };

  

  const renderRadials = () => {
    const radials = [];
    const length = 400;

    // Основной радиал (выбранный OBS)
    radials.push(
      <line
        key={`obs-${obsCourse}`}
        x1={station.position.x}
        y1={station.position.y}
        x2={station.position.x + length * Math.sin((obsCourse * Math.PI) / 180)}
        y2={station.position.y - length * Math.cos((obsCourse * Math.PI) / 180)}
        stroke="#64ffda"
        strokeWidth="3"
        className="radial-line selected"
      />
    );

    // Подпись выбранного OBS курса
    const obsLabelX = station.position.x + (length + 25) * Math.sin((obsCourse * Math.PI) / 180);
    const obsLabelY = station.position.y - (length + 25) * Math.cos((obsCourse * Math.PI) / 180);
    
    radials.push(
      <text
        key={`obs-label-${obsCourse}`}
        x={obsLabelX}
        y={obsLabelY}
        textAnchor="middle"
        fill="#64ffda"
        fontSize="11"
        fontWeight="bold"
        className="radial-label"
      >
        OBS: {obsCourse}°
      </text>
    );

    // Пользовательский радиал (если задан)
    if (customRadial !== null) {
      radials.push(
        <line
          key={`custom-${customRadial}`}
          x1={station.position.x}
          y1={station.position.y}
          x2={station.position.x + length * Math.sin((customRadial * Math.PI) / 180)}
          y2={station.position.y - length * Math.cos((customRadial * Math.PI) / 180)}
          stroke="#ff6b6b"
          strokeWidth="2.5"
          className="radial-line custom"
        />
      );

      // Подпись пользовательского радиала
      const customLabelX = station.position.x + (length + 35) * Math.sin((customRadial * Math.PI) / 180);
      const customLabelY = station.position.y - (length + 35) * Math.cos((customRadial * Math.PI) / 180);
      
      radials.push(
        <text
          key={`custom-label-${customRadial}`}
          x={customLabelX}
          y={customLabelY}
          textAnchor="middle"
          fill="#ff6b6b"
          fontSize="11"
          fontWeight="bold"
          className="radial-label custom"
        >
          {customRadial}°
        </text>
      );
    }

    return radials;
  };

  return (
    <g className="vor-radials">
      {renderRadials()}
      
      {/* Элементы управления */}
      <g className="radials-controls">
        {/* Кнопка пользовательского радиала */}
        <g className="custom-radial-control" onClick={showCustomRadial} style={{ cursor: 'pointer' }}>
          <circle
            cx={station.position.x + 450}
            cy={station.position.y}
            r="12"
            fill="rgba(255, 107, 107, 0.3)"
            stroke="#ff6b6b"
            strokeWidth="2"
          />
          <text
            x={station.position.x + 450}
            y={station.position.y + 5}
            textAnchor="middle"
            fill="#e6f1ff"
            fontSize="9"
            fontWeight="bold"
          >
            📍
          </text>
          <text
            x={station.position.x + 465}
            y={station.position.y + 5}
            textAnchor="start"
            fill="#8892b0"
            fontSize="9"
          >
            Show Radial
          </text>
        </g>

        {/* Кнопка очистки пользовательского радиала */}
        {customRadial !== null && (
          <g className="clear-radial-control" onClick={() => setCustomRadial(null)} style={{ cursor: 'pointer' }}>
            <circle
              cx={station.position.x + 450}
              cy={station.position.y + 30}
              r="12"
              fill="rgba(136, 146, 176, 0.3)"
              stroke="#8892b0"
              strokeWidth="2"
            />
            <text
              x={station.position.x + 450}
              y={station.position.y + 35}
              textAnchor="middle"
              fill="#e6f1ff"
              fontSize="9"
              fontWeight="bold"
            >
              ×
            </text>
            <text
              x={station.position.x + 465}
              y={station.position.y + 35}
              textAnchor="start"
              fill="#8892b0"
              fontSize="9"
            >
              Clear
            </text>
          </g>
        )}
      </g>
    </g>
  );
};