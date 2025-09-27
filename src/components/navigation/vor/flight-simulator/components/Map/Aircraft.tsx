// src/components/flight-simulator/components/Map/Aircraft.tsx
import React from 'react';
import type { Position } from './types';

interface AircraftProps {
  position: Position;
  heading: number;
  size?: number;
}

export const Aircraft: React.FC<AircraftProps> = ({ 
  position, 
  heading, 
  size = 20 
}) => {
  return (
    <g transform={`translate(${position.x},${position.y}) rotate(${heading})`}>
      {/* Фюзеляж */}
      <ellipse cx="0" cy="0" rx={size * 0.4} ry={size * 0.2} fill="#e6f1ff" stroke="#1a6fc4" strokeWidth="2" />
      
      {/* Крылья */}
      <path 
        d={`M-${size * 0.8},0 L${size * 0.8},0`} 
        stroke="#1a6fc4" 
        strokeWidth="3" 
        strokeLinecap="round" 
      />
      
      {/* Хвостовое оперение */}
      <path 
        d={`M0,${size * 0.15} L0,${size * 0.6} L-${size * 0.2},${size * 0.4} Z`} 
        fill="#1a6fc4" 
        stroke="#e6f1ff" 
        strokeWidth="1" 
      />
      
      {/* Кабина */}
      <circle cx={size * 0.2} cy="0" r={size * 0.1} fill="#64ffda" />
      
      {/* Носовая часть */}
      <circle cx={size * 0.35} cy="0" r={size * 0.05} fill="#e6f1ff" />
    </g>
  );
};