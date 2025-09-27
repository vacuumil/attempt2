import React from 'react';
import type { AircraftPosition } from '../../../../hooks/useVOR';
import './AircraftIcon.css';

interface AircraftIconProps {
  position: AircraftPosition;
  isDragging: boolean;
}

export const AircraftIcon: React.FC<AircraftIconProps> = ({ position, isDragging }) => {
  return (
    <g className={`aircraft ${isDragging ? 'dragging' : ''}`} transform={`translate(${position.x}, ${position.y})`}>
      {/* Основной корпус */}
      <path
        d="M-15,-5 L0,-15 L15,-5 L0,10 Z"
        fill="#ff6b6b"
        stroke="#0a192f"
        strokeWidth="2"
        className="aircraft-body"
      />
      
      {/* Крылья */}
      <line x1="-20" y1="0" x2="20" y2="0" stroke="#ff6b6b" strokeWidth="3" />
      
      {/* Хвост */}
      <line x1="0" y1="5" x2="0" y2="15" stroke="#ff6b6b" strokeWidth="2" />
      <line x1="-5" y1="15" x2="5" y2="15" stroke="#ff6b6b" strokeWidth="2" />
      
      {/* Стекло кабины */}
      <circle cx="0" cy="-5" r="3" fill="#64ffda" />
    </g>
  );
};