import React, { useState, useEffect, useCallback } from 'react';
import { VORDisplay } from './components/VORDisplay';
import { VORControls } from './components/VORControls';
import { VORMap } from './components/VORMap';
import { Container, Title, Description, SimulationArea, DisplaySection, MapSection } from './VORSimulator.styles';
import type { VORStation, AircraftPosition } from '../../../types/navigation';
import {
  calculateRadial,
  calculateDistance,
  calculateDeviation,
  checkIsOnCourse,
  calculateSignalStrength
} from './utils/vorCalculations';

const vorStations: VORStation[] = [
  {
    id: 'mow',
    name: 'MOSCOW VOR',
    frequency: 113.7,
    morseCode: '.--. ...',
    location: { x: 500, y: 250 },
    range: 200
  },
  {
    id: 'led',
    name: 'ST PETERSBURG VOR',
    frequency: 115.2,
    morseCode: '.-.. . -..',
    location: { x: 300, y: 100 },
    range: 180
  },
  {
    id: 'svx',
    name: 'EKATERINBURG VOR',
    frequency: 112.1,
    morseCode: '... ...- -..-',
    location: { x: 700, y: 150 },
    range: 190
  },
  {
    id: 'ovb',
    name: 'NOVOSIBIRSK VOR',
    frequency: 114.5,
    morseCode: '--- ...- -...',
    location: { x: 800, y: 350 },
    range: 220
  }
];

export const VORSimulator: React.FC = () => {
  const [aircraftPosition, setAircraftPosition] = useState<AircraftPosition>({
    x: 200,
    y: 400,
    heading: 0
  });
  
  const [selectedStation, setSelectedStation] = useState<VORStation>(vorStations[0]);
  const [selectedRadial, setSelectedRadial] = useState<number>(0);
  const [isIdentPlaying, setIsIdentPlaying] = useState<boolean>(false);
  const [deviation, setDeviation] = useState<number>(0);
  const [isOnCourse, setIsOnCourse] = useState<boolean>(false);

  // Расчет текущих параметров
  const currentRadial = calculateRadial(aircraftPosition, selectedStation);
  const distance = calculateDistance(aircraftPosition, selectedStation);
  const signalStrength = calculateSignalStrength(distance, selectedStation.range);

  // Эффект для автоматического обновления показаний
  useEffect(() => {
    const newDeviation = calculateDeviation(selectedRadial, currentRadial);
    setDeviation(newDeviation);
    setIsOnCourse(checkIsOnCourse(newDeviation));
  }, [aircraftPosition, selectedStation, selectedRadial, currentRadial]);

  // Обработчик изменения позиции самолета
  const handleAircraftMove = useCallback((newPosition: AircraftPosition) => {
    setAircraftPosition(newPosition);
  }, []);

  // Обработчик выбора станции
  const handleStationSelect = useCallback((station: VORStation) => {
    setSelectedStation(station);
    // Автоматически устанавливаем радиал на текущее положение
    const radial = calculateRadial(aircraftPosition, station);
    setSelectedRadial(radial);
    setIsIdentPlaying(true);
    
    // Сбрасываем идентификацию через 3 секунды
    setTimeout(() => setIsIdentPlaying(false), 3000);
  }, [aircraftPosition]);

  return (
    <Container>
      <Title>VOR Симулятор</Title>
      <Description>
        VOR (VHF Omnidirectional Range) - радионавигационная система, 
        обеспечивающая информацию о направлении от/до станции
      </Description>
      
      <SimulationArea>
        <DisplaySection>
          <VORDisplay 
            selectedRadial={selectedRadial}
            currentRadial={currentRadial}
            deviation={deviation}
            isOnCourse={isOnCourse}
            signalStrength={signalStrength}
            isIdentPlaying={isIdentPlaying}
            morseCode={selectedStation.morseCode}
            frequency={selectedStation.frequency}
          />
          
          <VORControls 
            frequency={selectedStation.frequency}
            setFrequency={(freq: number) => {
              const station = vorStations.find(s => s.frequency === freq);
              if (station) handleStationSelect(station);
            }}
            selectedRadial={selectedRadial}
            setSelectedRadial={setSelectedRadial}
            stations={vorStations}
          />
        </DisplaySection>
        
        <MapSection>
          <VORMap
            aircraftPosition={aircraftPosition}
            stations={vorStations}
            selectedStation={selectedStation}
            selectedRadial={selectedRadial}
            onAircraftMove={handleAircraftMove}
            onStationSelect={handleStationSelect}
          />
        </MapSection>
      </SimulationArea>
    </Container>
  );
};