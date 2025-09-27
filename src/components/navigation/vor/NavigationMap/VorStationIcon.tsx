import React from 'react';
import type { VORStation } from '../../../../hooks/useVOR';
import './VorStationIcon.css';

interface VorStationIconProps {
  station: VORStation;
  isSelected: boolean;
}

export const VorStationIcon: React.FC<VorStationIconProps> = ({ station, isSelected }) => {
  const handleStationClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Важно: предотвращаем всплытие события
    console.log('Station clicked:', station.name);
  };

  return (
    <g 
      className={`vor-station ${isSelected ? 'selected' : ''}`}
      onClick={handleStationClick}
      style={{ pointerEvents: 'all' }} // Разрешаем события
    >
      {/* Внешний круг */}
      <circle
        cx={station.position.x}
        cy={station.position.y}
        r="20"
        fill={isSelected ? 'rgba(26, 111, 196, 0.3)' : 'rgba(26, 111, 196, 0.2)'}
        stroke={isSelected ? '#1a6fc4' : '#8892b0'}
        strokeWidth="2"
        className="station-outer"
      />
      
      {/* Внутренний круг */}
      <circle
        cx={station.position.x}
        cy={station.position.y}
        r="8"
        fill={isSelected ? '#64ffda' : '#1a6fc4'}
        className="station-inner"
      />
      
      {/* Название станции */}
      <text
        x={station.position.x}
        y={station.position.y + 40}
        textAnchor="middle"
        fill={isSelected ? '#64ffda' : '#8892b0'}
        fontSize="12"
        fontWeight={isSelected ? 'bold' : 'normal'}
        className="station-label"
      >
        {station.name}
      </text>
      
      {/* Частота станции */}
      <text
        x={station.position.x}
        y={station.position.y + 55}
        textAnchor="middle"
        fill="#8892b0"
        fontSize="10"
        className="station-frequency"
      >
        {station.frequency} MHz
      </text>
    </g>
  );
};