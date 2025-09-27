// src/components/flight-simulator/components/Controls/StationSelector.tsx
import React from 'react';
import type { VorStation } from '../Map/types';
import './StationSelector.css';

interface StationSelectorProps {
  stations: VorStation[];
  activeStationId: string | null;
  onStationSelect: (stationId: string) => void;
}

export const StationSelector: React.FC<StationSelectorProps> = ({
  stations,
  activeStationId,
  onStationSelect
}) => {
  return (
    <div className="station-selector">
      <label>📻 VOR Станция:</label>
      <div className="custom-select">
        <select 
          value={activeStationId || ''} 
          onChange={(e) => onStationSelect(e.target.value)}
          className="station-select"
        >
          <option value="">-- Выберите станцию --</option>
          {stations.map(station => (
            <option key={station.id} value={station.id}>
              {station.name} ({station.frequency} MHz)
            </option>
          ))}
        </select>
        <div className="select-arrow">▼</div>
      </div>
    </div>
  );
};