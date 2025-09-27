import React, { useRef, useEffect, useState, useCallback } from 'react';
import { VorStationIcon } from './VorStationIcon';
import { AircraftIcon } from './AircraftIcon';
import { VorRadials } from './VorRadials';
import type { VORStation, AircraftPosition } from '../../../../hooks/useVOR';
import './NavigationMap.css';

interface NavigationMapProps {
  aircraftPosition: AircraftPosition;
  onAircraftMove: (position: AircraftPosition) => void;
  vorStations: VORStation[];
  selectedStation: VORStation | null;
  onStationSelect: (station: VORStation) => void;
  obsCourse: number;
}

export const NavigationMap: React.FC<NavigationMapProps> = ({
  aircraftPosition,
  onAircraftMove,
  vorStations,
  selectedStation,
  onStationSelect,
  obsCourse
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });

  // Отслеживаем размер контейнера
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ 
          width: Math.max(400, width), 
          height: Math.max(300, height) 
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const getSVGCoordinates = (e: React.MouseEvent): { x: number; y: number } => {
    if (!svgRef.current) return { x: 0, y: 0 };
    
    const svg = svgRef.current;
    const point = svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    
    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
    
    return {
      x: Math.max(0, Math.min(800, svgPoint.x)),
      y: Math.max(0, Math.min(600, svgPoint.y))
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      e.preventDefault();
      setIsDragging(true);
      
      const { x, y } = getSVGCoordinates(e);
      onAircraftMove({ x, y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      
      const { x, y } = getSVGCoordinates(e);
      onAircraftMove({ x, y });
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      setIsDragging(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (e.button === 0) {
      e.preventDefault();
      
      const { x, y } = getSVGCoordinates(e);
      onAircraftMove({ x, y });
    }
  };

  const handleStationClick = useCallback((station: VORStation, e: React.MouseEvent) => {
    e.stopPropagation();
    onStationSelect(station);
  }, [onStationSelect]);

  // Добавляем глобальные обработчики для корректной работы перетаскивания
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && svgRef.current) {
        const svg = svgRef.current;
        const point = svg.createSVGPoint();
        point.x = e.clientX;
        point.y = e.clientY;
        
        const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
        
        const x = Math.max(0, Math.min(800, svgPoint.x));
        const y = Math.max(0, Math.min(600, svgPoint.y));
        
        onAircraftMove({ x, y });
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, onAircraftMove]);

  const renderCompassRose = () => {
    const centerX = 700;
    const centerY = 450;
    const radius = 30;

    return (
      <g className="compass-rose">
        <circle cx={centerX} cy={centerY} r={radius} fill="rgba(10, 25, 47, 0.8)" stroke="#1a6fc4" />
        {[0, 90, 180, 270].map((angle) => (
          <line
            key={angle}
            x1={centerX}
            y1={centerY}
            x2={centerX + radius * Math.sin((angle * Math.PI) / 180)}
            y2={centerY - radius * Math.cos((angle * Math.PI) / 180)}
            stroke="#64ffda"
            strokeWidth={2}
          />
        ))}
        <text x={centerX} y={centerY - radius - 5} textAnchor="middle" fill="#64ffda" fontSize="12" fontWeight="bold">N</text>
        <text x={centerX + radius + 5} y={centerY} textAnchor="middle" fill="#8892b0" fontSize="10">E</text>
        <text x={centerX} y={centerY + radius + 10} textAnchor="middle" fill="#8892b0" fontSize="10">S</text>
        <text x={centerX - radius - 5} y={centerY} textAnchor="middle" fill="#8892b0" fontSize="10">W</text>
      </g>
    );
  };

  const renderDistanceRings = () => {
    if (!selectedStation) return null;

    const rings = [100, 200, 300, 400];
    
    return rings.map((radius) => (
      <g key={radius}>
        <circle
          cx={selectedStation.position.x}
          cy={selectedStation.position.y}
          r={radius}
          fill="none"
          stroke="rgba(100, 255, 218, 0.15)"
          strokeWidth="1"
          strokeDasharray="5,5"
        />
        <text
          x={selectedStation.position.x + radius + 5}
          y={selectedStation.position.y}
          fill="rgba(100, 255, 218, 0.6)"
          fontSize="10"
          fontFamily="'Share Tech Mono', monospace"
        >
          {radius / 50}NM
        </text>
      </g>
    ));
  };

  // Новая функция: отрисовка линии радиала от самолета до станции
  const renderRadialLine = () => {
    if (!selectedStation) return null;

    return (
      <g className="radial-line-group">
        {/* Линия от самолета до станции */}
        <line
          x1={aircraftPosition.x}
          y1={aircraftPosition.y}
          x2={selectedStation.position.x}
          y2={selectedStation.position.y}
          stroke="#ff6b6b"
          strokeWidth="2"
          strokeDasharray="5,3"
          markerEnd="url(#arrowhead)"
        />
        
        {/* Точка на станции */}
        <circle
          cx={selectedStation.position.x}
          cy={selectedStation.position.y}
          r="5"
          fill="#ff6b6b"
          stroke="#0a192f"
          strokeWidth="2"
        />
        
        {/* Точка на самолете */}
        <circle
          cx={aircraftPosition.x}
          cy={aircraftPosition.y}
          r="4"
          fill="#ff6b6b"
          stroke="#0a192f"
          strokeWidth="2"
        />
      </g>
    );
  };

  const renderAircraftInfo = () => {
    if (!selectedStation) {
      return (
        <g>
          <rect x="10" y="10" width="380" height="60" rx="8" fill="rgba(10, 25, 47, 0.9)" stroke="#1a6fc4" strokeWidth="2" />
          <text x="200" y="35" textAnchor="middle" fill="#64ffda" fontSize="16" fontFamily="'Share Tech Mono', monospace" fontWeight="bold">
            Выберите VOR станцию
          </text>
          <text x="200" y="55" textAnchor="middle" fill="#8892b0" fontSize="12" fontFamily="'Exo 2', sans-serif">
            Кликните на станцию на карте
          </text>
        </g>
      );
    }

    const distance = calculateDistance(selectedStation.position, aircraftPosition);
    const bearing = calculateBearing(selectedStation.position, aircraftPosition);

    return (
      <g>
        <rect x="10" y="10" width="280" height="50" rx="8" fill="rgba(10, 25, 47, 0.9)" stroke="#64ffda" strokeWidth="2" />
        <text x="20" y="30" fill="#64ffda" fontSize="14" fontFamily="'Exo 2', sans-serif" fontWeight="bold">
          {selectedStation.name}
        </text>
        <text x="20" y="50" fill="#8892b0" fontSize="12" fontFamily="'Exo 2', sans-serif">
          Радиал:
        </text>
        <text x="80" y="50" fill="#64ffda" fontSize="14" fontFamily="'Share Tech Mono', monospace" fontWeight="bold">
          {bearing.toString().padStart(3, '0')}°
        </text>
        <text x="140" y="50" fill="#8892b0" fontSize="12" fontFamily="'Exo 2', sans-serif">
          Дистанция:
        </text>
        <text x="210" y="50" fill="#64ffda" fontSize="14" fontFamily="'Share Tech Mono', monospace" fontWeight="bold">
          {distance.toFixed(1)}NM
        </text>
      </g>
    );
  };

  const calculateBearing = (station: { x: number; y: number }, aircraft: { x: number; y: number }): number => {
    const dx = aircraft.x - station.x;
    const dy = station.y - aircraft.y;
    let angle = Math.atan2(dx, dy) * (180 / Math.PI);
    angle = (angle + 360) % 360;
    return Math.round(angle);
  };

  const calculateDistance = (point1: { x: number; y: number }, point2: { x: number; y: number }): number => {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy) / 50;
  };

  return (
    <div ref={containerRef} className="navigation-map">
      <svg
        ref={svgRef}
        width={containerSize.width}
        height={containerSize.height}
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        className="map-svg"
        style={{ 
          cursor: isDragging ? 'grabbing' : 'crosshair'
        }}
      >
        {/* Определения маркеров для стрелок */}
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(136, 146, 176, 0.2)" strokeWidth="1"/>
          </pattern>
          
          {/* Маркер-стрелка для линии радиала */}
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#ff6b6b"
            />
          </marker>
        </defs>

        {/* Сетка карты */}
        <rect 
          width="100%" 
          height="100%" 
          fill="url(#grid)" 
          style={{ pointerEvents: 'none' }}
        />

        {/* Круги расстояния от выбранной станции */}
        {renderDistanceRings()}

        {/* Компасная роза */}
        {renderCompassRose()}

        {/* VOR станции */}
        {vorStations.map(station => (
          <g key={station.id} onClick={(e) => handleStationClick(station, e)} style={{ cursor: 'pointer' }}>
            <VorStationIcon
              station={station}
              isSelected={selectedStation?.id === station.id}
            />
          </g>
        ))}

        {/* Линия радиала от самолета до активной станции */}
        {renderRadialLine()}

        {/* Радиалы от выбранной станции */}
        {selectedStation && (
          <VorRadials
            station={selectedStation}
            obsCourse={obsCourse}
          />
        )}

        {/* Самолет */}
        <AircraftIcon
          position={aircraftPosition}
          isDragging={isDragging}
        />

        {/* Информация о самолете в левом верхнем углу */}
        {renderAircraftInfo()}
      </svg>
    </div>
  );
};