// src/components/flight-simulator/components/Map/VorMap.tsx
import React from 'react';
import type { VorStation, AircraftState, Position } from './types';
import type { Wind } from '../../utils/wind';
import type { MissionObjective } from '../Mission/types';
import { Aircraft } from './Aircraft';
import { calculateRadial, calculateToFrom } from '../../utils/navigation';
import { MAP_DIMENSIONS } from '../../utils/constants';
import './VorMap.css';

interface VorMapProps {
  stations: VorStation[];
  aircraft: AircraftState;
  trail?: Position[];
  activeStationId?: string | null;
  obs?: number;
  wind?: Wind | null;
  missionObjective?: MissionObjective | null;
  onStationSelect: (stationId: string) => void;
}

export const VorMap: React.FC<VorMapProps> = ({ 
  stations, 
  aircraft,
  trail = [],
  activeStationId,
  obs,
  wind,
  missionObjective,
  onStationSelect
}) => {
  const activeStation = stations.find(s => s.id === activeStationId);

  const currentRadial = activeStation ? 
    calculateRadial(activeStation.position, aircraft.position) : 
    null;

  const toFrom = activeStation && obs !== undefined ? 
    calculateToFrom(aircraft.position, activeStation.position, obs) : 
    'OFF';

  return (
    <div className="vor-map">
      <svg 
        viewBox={`0 0 ${MAP_DIMENSIONS.width} ${MAP_DIMENSIONS.height}`}
        className="vor-map-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Границы карты */}
        <rect 
          x="0" y="0" 
          width={MAP_DIMENSIONS.width} 
          height={MAP_DIMENSIONS.height} 
          fill="none" 
          stroke="rgba(255, 100, 100, 0.3)" 
          strokeWidth="5"
          strokeDasharray="10,5"
          pointerEvents="none"
        />
        
        {/* Сетка */}
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(136,146,176,0.15)" strokeWidth="1"/>
          </pattern>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#64ffda" />
          </marker>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Информационная панель */}
        <g className="map-info-panel">
          <rect 
            x="20" 
            y="20" 
            width="250" 
            height="80" 
            fill="rgba(10, 25, 47, 0.8)" 
            rx="8" 
            stroke="rgba(100, 255, 218, 0.3)"
            strokeWidth="1"
          />
          
          {activeStation && currentRadial !== null && obs !== undefined && (
            <>
              <text x="35" y="45" fill="#64ffda" fontSize="16" fontFamily="'Share Tech Mono', monospace" fontWeight="600">
                СТАНЦИЯ: {activeStation.name}
              </text>
              <text x="35" y="65" fill="#e6f1ff" fontSize="14" fontFamily="'Share Tech Mono', monospace">
                ТЕКУЩИЙ РАДИАЛ: {currentRadial}°
              </text>
              <text x="35" y="85" fill="#e6f1ff" fontSize="14" fontFamily="'Share Tech Mono', monospace">
                ЗАДАННЫЙ РАДИАЛ: {obs}° {toFrom}
              </text>
            </>
          )}
          
          {!activeStation && (
            <text x="35" y="50" fill="#8892b0" fontSize="14" fontFamily="'Share Tech Mono', monospace">
              ВЫБЕРИТЕ СТАНЦИЮ ДЛЯ НАВИГАЦИИ
            </text>
          )}
        </g>

        {/* Визуализация ветра */}
        {wind && (
          <g className="wind-visualization">
            <circle
              cx={50}
              cy={120}
              r={wind.speed * 5 + 10}
              fill="none"
              stroke="rgba(100, 255, 218, 0.3)"
              strokeWidth="2"
              strokeDasharray="5,3"
            />
            <path
              d={`M50,120 L${50 + Math.sin(wind.direction * Math.PI / 180) * (wind.speed * 5 + 20)},${120 - Math.cos(wind.direction * Math.PI / 180) * (wind.speed * 5 + 20)}`}
              stroke="#64ffda"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <text x={50} y={160} fill="#64ffda" fontSize="12" textAnchor="middle" fontFamily="'Share Tech Mono', monospace">
              ВЕТЕР: {Math.round(wind.direction)}° / {wind.speed.toFixed(1)}
            </text>
          </g>
        )}

        {/* Визуализация цели миссии */}
        {missionObjective && missionObjective.position && (
          <g className="mission-target">
            <circle
              cx={missionObjective.position.x}
              cy={missionObjective.position.y}
              r={missionObjective.tolerance || 20}
              fill="rgba(255, 215, 0, 0.2)"
              stroke="gold"
              strokeWidth="2"
              strokeDasharray="4,2"
            />
            <text
              x={missionObjective.position.x}
              y={missionObjective.position.y - (missionObjective.tolerance || 20) - 10}
              fill="gold"
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="'Exo 2', sans-serif"
            >
              ЦЕЛЬ
            </text>
          </g>
        )}

        {/* VOR станции */}
        {stations.map(station => (
          <g 
            key={station.id} 
            className="vor-station"
            onClick={() => onStationSelect(station.id)}
            style={{ cursor: 'pointer' }}
          >
            <circle 
              cx={station.position.x} 
              cy={station.position.y} 
              r="12" 
              fill={station.id === activeStationId ? "#64ffda" : "#1a6fc4"} 
              stroke={station.id === activeStationId ? "#1a6fc4" : "#64ffda"}
              strokeWidth="3"
            />
            <text 
              x={station.position.x} 
              y={station.position.y - 25} 
              textAnchor="middle" 
              fill={station.id === activeStationId ? "#64ffda" : "#e6f1ff"}
              fontSize="16"
              fontWeight="600"
              fontFamily="'Exo 2', sans-serif"
            >
              {station.name}
            </text>
            <text 
              x={station.position.x} 
              y={station.position.y - 45} 
              textAnchor="middle" 
              fill="#8892b0"
              fontSize="13"
              fontFamily="'Share Tech Mono', monospace"
            >
              {station.frequency} MHz
            </text>
          </g>
        ))}
        
        {/* Визуализация выбранного радиала */}
        {activeStation && obs !== undefined && (
          <g className="radial-line">
            <line
              x1={activeStation.position.x}
              y1={activeStation.position.y}
              x2={activeStation.position.x + 1000 * Math.sin(obs * Math.PI / 180)}
              y2={activeStation.position.y - 1000 * Math.cos(obs * Math.PI / 180)}
              stroke="#64ffda"
              strokeWidth="2"
              strokeDasharray="8,4"
              opacity="0.6"
            />
            <text
              x={activeStation.position.x + 500 * Math.sin(obs * Math.PI / 180)}
              y={activeStation.position.y - 500 * Math.cos(obs * Math.PI / 180)}
              fill="#64ffda"
              fontSize="16"
              textAnchor="middle"
              fontWeight="bold"
              fontFamily="'Exo 2', sans-serif"
            >
              RADIAL {obs}°
            </text>
          </g>
        )}
        
        {/* Линия от станции к самолету */}
        {activeStation && (
          <g className="aircraft-line">
            <line
              x1={activeStation.position.x}
              y1={activeStation.position.y}
              x2={aircraft.position.x}
              y2={aircraft.position.y}
              stroke="rgba(255, 100, 100, 0.4)"
              strokeWidth="1.5"
              strokeDasharray="4,2"
            />
          </g>
        )}
        
        {/* Траектория полета */}
        {trail.length > 1 && (
          <polyline
            points={trail.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="rgba(100, 255, 218, 0.6)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        
        {/* Самолет */}
        <Aircraft position={aircraft.position} heading={aircraft.heading} />
      </svg>
    </div>
  );
};