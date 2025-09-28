import React, { useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import type { VORStation, AircraftPosition } from '../../../types/navigation';

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: rgba(10, 25, 47, 0.8);
  border: 2px solid #64ffda;
  border-radius: 10px;
  overflow: hidden;
`;

const Station = styled.div<{ x: number; y: number; selected: boolean }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: 12px;
  height: 12px;
  background: ${props => props.selected ? '#ff6b6b' : '#64ffda'};
  border: 2px solid ${props => props.selected ? '#ff4757' : '#1a6fc4'};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${props => props.selected ? '100px' : '80px'};
    height: ${props => props.selected ? '100px' : '80px'};
    border: 1px solid ${props => props.selected ? 'rgba(255, 107, 107, 0.3)' : 'rgba(100, 255, 218, 0.2)'};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ${props => props.selected ? 'pulse 2s infinite' : 'none'};
  }
  
  @keyframes pulse {
    0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.2); }
    100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  }
`;

const Aircraft = styled.div<{ x: number; y: number; heading: number }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: 20px;
  height: 20px;
  background: #1a6fc4;
  border: 2px solid #64ffda;
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(${props => props.heading}deg);
  cursor: move;
  z-index: 20;
  
  &::before {
    content: '▲';
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    color: #64ffda;
    font-size: 12px;
  }
`;

const RadialLine = styled.div<{ x: number; y: number; angle: number }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: 500px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #64ffda, transparent);
  transform-origin: left center;
  transform: rotate(${props => props.angle}deg);
  opacity: 0.7;
  pointer-events: none;
`;

const DragArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: move;
`;

interface VORMapProps {
  aircraftPosition: AircraftPosition;
  stations: VORStation[];
  selectedStation: VORStation;
  selectedRadial: number;
  onAircraftMove: (position: AircraftPosition) => void;
  onStationSelect: (station: VORStation) => void;
}

export const VORMap: React.FC<VORMapProps> = ({
  aircraftPosition,
  stations,
  selectedStation,
  selectedRadial,
  onAircraftMove,
  onStationSelect
}) => {
  const isDragging = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Ограничиваем движение в пределах карты
    const newX = Math.max(20, Math.min(780, x));
    const newY = Math.max(20, Math.min(380, y));
    
    onAircraftMove({
      ...aircraftPosition,
      x: newX,
      y: newY
    });
  }, [aircraftPosition, onAircraftMove]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <MapContainer>
      {/* Линия выбранного радиала */}
      <RadialLine
        x={selectedStation.location.x}
        y={selectedStation.location.y}
        angle={selectedRadial}
      />
      
      {/* Станции VOR */}
      {stations.map(station => (
        <Station
          key={station.id}
          x={station.location.x}
          y={station.location.y}
          selected={station.id === selectedStation.id}
          onClick={() => onStationSelect(station)}
          title={`${station.name} (${station.frequency} MHz)`}
        />
      ))}
      
      {/* Самолет */}
      <Aircraft
        x={aircraftPosition.x}
        y={aircraftPosition.y}
        heading={aircraftPosition.heading}
      />
      
      {/* Область для перетаскивания */}
      <DragArea
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </MapContainer>
  );
};