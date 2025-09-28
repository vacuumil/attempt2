import React, { useCallback, useRef, useEffect } from 'react';
import {
  MapContainer,
  Station,
  StationRange,
  Aircraft,
  RadialLine,
  DragArea,
  MapGrid
} from './VORMap.styles';
import type { VORStation, AircraftPosition } from '../../../../../types/navigation';
import { calculateMapRadial } from '../../utils/vorCalculations';

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
    const newX = Math.max(20, Math.min(980, x));
    const newY = Math.max(20, Math.min(480, y));
    
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
      <MapGrid />
      
      {/* Линия выбранного радиала */}
      <RadialLine
        x={selectedStation.location.x}
        y={selectedStation.location.y}
        angle={calculateMapRadial(selectedRadial)}
      />
      
      {/* Станции VOR с зонами действия */}
      {stations.map(station => (
        <React.Fragment key={station.id}>
          <StationRange
            x={station.location.x}
            y={station.location.y}
            range={station.range}
            selected={station.id === selectedStation.id}
          />
          <Station
            x={station.location.x}
            y={station.location.y}
            selected={station.id === selectedStation.id}
            onClick={() => onStationSelect(station)}
            title={`${station.name} (${station.frequency} MHz)\nДиапазон: ${station.range}km`}
          />
        </React.Fragment>
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