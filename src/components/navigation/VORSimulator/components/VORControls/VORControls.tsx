import React from 'react';
import {
  ControlsContainer,
  ControlGroup,
  Label,
  Input,
  Button,
  Select,
  RangeInput
} from './VORControls.styles';
import type { VORStation } from '../../../../../types/navigation';

interface VORControlsProps {
  frequency: number;
  setFrequency: (freq: number) => void;
  selectedRadial: number;
  setSelectedRadial: (radial: number) => void;
  stations: VORStation[];
}

export const VORControls: React.FC<VORControlsProps> = ({
  frequency,
  setFrequency,
  selectedRadial,
  setSelectedRadial,
  stations
}) => {
  const handleIncrementRadial = (increment: number) => {
    const newRadial = (selectedRadial + increment + 360) % 360;
    setSelectedRadial(newRadial);
  };

  return (
    <ControlsContainer>
      <ControlGroup>
        <Label>VOR станция:</Label>
        <Select
          value={frequency}
          onChange={(e) => setFrequency(parseFloat(e.target.value))}
        >
          {stations.map(station => (
            <option key={station.frequency} value={station.frequency}>
              {station.name} - {station.frequency} MHz
            </option>
          ))}
        </Select>
      </ControlGroup>

      <ControlGroup>
        <Label>Установите радиал (0-360°):</Label>
        <Input
          type="number"
          min="0"
          max="360"
          value={selectedRadial}
          onChange={(e) => setSelectedRadial(parseInt(e.target.value))}
        />
        <RangeInput
          type="range"
          min="0"
          max="360"
          value={selectedRadial}
          onChange={(e) => setSelectedRadial(parseInt(e.target.value))}
        />
      </ControlGroup>

      <ControlGroup>
        <Label>Быстрая установка:</Label>
        <Button onClick={() => setSelectedRadial(Math.floor(Math.random() * 360))}>
          Случайный радиал
        </Button>
        <Button onClick={() => handleIncrementRadial(10)}>
          +10°
        </Button>
        <Button onClick={() => handleIncrementRadial(-10)}>
          -10°
        </Button>
        <Button onClick={() => handleIncrementRadial(1)}>
          +1°
        </Button>
        <Button onClick={() => handleIncrementRadial(-1)}>
          -1°
        </Button>
      </ControlGroup>
    </ControlsContainer>
  );
};