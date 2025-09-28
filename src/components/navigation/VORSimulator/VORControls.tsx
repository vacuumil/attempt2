import React from 'react';
import styled from 'styled-components';
import type { VORStation } from '../../../types/navigation';

const ControlsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
  background: rgba(17, 34, 64, 0.3);
  border-radius: 10px;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #8892b0;
`;

const Input = styled.input`
  background: rgba(100, 255, 218, 0.1);
  border: 1px solid #64ffda;
  border-radius: 5px;
  padding: 0.5rem;
  color: #e6f1ff;
  font-family: 'Share Tech Mono', monospace;
  
  &:focus {
    outline: none;
    border-color: #1a6fc4;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
  color: #0a192f;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(100, 255, 218, 0.3);
  }
`;

const Select = styled.select`
  background: rgba(100, 255, 218, 0.1);
  border: 1px solid #64ffda;
  border-radius: 5px;
  padding: 0.5rem;
  color: #e6f1ff;
  
  option {
    background: #0a192f;
    color: #e6f1ff;
  }
`;

const RangeInput = styled.input`
  width: 100%;
  margin-top: 0.5rem;
  background: linear-gradient(to right, #64ffda, #1a6fc4);
  border-radius: 5px;
  height: 4px;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #64ffda;
    border-radius: 50%;
    cursor: pointer;
  }
`;

interface VORControlsProps {
  frequency: number;
  setFrequency: (freq: number) => void;
  selectedRadial: number;
  setSelectedRadial: (radial: number) => void;
  toFrom: 'TO' | 'FROM';
  setToFrom: (toFrom: 'TO' | 'FROM') => void;
  stations: VORStation[];
}

export const VORControls: React.FC<VORControlsProps> = ({
  frequency,
  setFrequency,
  selectedRadial,
  setSelectedRadial,
  toFrom,
  setToFrom,
  stations
}) => {
  const handleIncrementRadial = (increment: number) => {
    const newRadial = (selectedRadial + increment + 360) % 360;
    setSelectedRadial(newRadial); // Исправляем: передаем значение, а не функцию
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
        <Label>Радиал (0-360°):</Label>
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
        <Label>Режим:</Label>
        <Select
          value={toFrom}
          onChange={(e) => setToFrom(e.target.value as 'TO' | 'FROM')}
        >
          <option value="TO">TO (К станции)</option>
          <option value="FROM">FROM (От станции)</option>
        </Select>
      </ControlGroup>

      <ControlGroup>
        <Label>Действия:</Label>
        <Button onClick={() => setSelectedRadial(Math.floor(Math.random() * 360))}>
          Случайный радиал
        </Button>
        <Button onClick={() => handleIncrementRadial(10)}>
          +10°
        </Button>
        <Button onClick={() => handleIncrementRadial(-10)}>
          -10°
        </Button>
      </ControlGroup>
    </ControlsContainer>
  );
};