import { useState, useMemo } from 'react';
import { 
  calculateBearing, 
  calculateCDIDeflection, 
  getToFromIndicator,
  calculateDistance,
  calculateSignalStrength
} from '../utils/vorCalculations';

export interface AircraftPosition {
  x: number;
  y: number;
}

export interface VORStation {
  id: string;
  name: string;
  frequency: number;
  morseCode: string;
  position: { x: number; y: number };
}

export const useVOR = () => {
  // 3 VOR станции с хорошим расположением
  const [vorStations] = useState<VORStation[]>([
    {
      id: 'umo',
      name: 'UMOKA',
      frequency: 113.5,
      morseCode: '..- -- --- -.- .-',
      position: { x: 200, y: 200 }
    },
    {
      id: 'msk',
      name: 'MOSCOW',
      frequency: 115.7,
      morseCode: '-- --- ... -.-. --- .--',
      position: { x: 400, y: 300 }
    },
    {
      id: 'spb',
      name: 'ST.PETERSBURG',
      frequency: 112.1,
      morseCode: '... - .--. . - . .-. ... -... ..- .-. --.',
      position: { x: 600, y: 200 }
    }
  ]);

  const [aircraftPosition, setAircraftPosition] = useState<AircraftPosition>({ 
    x: 400, 
    y: 400 // Начальная позиция ниже центра
  });

  const [selectedFrequency, setSelectedFrequency] = useState<number | null>(115.7);
  const [obsCourse, setObsCourse] = useState<number>(0);

  // Находим текущую станцию по выбранной частоте
  const currentStation = useMemo(() => {
    return vorStations.find(station => station.frequency === selectedFrequency) || null;
  }, [selectedFrequency, vorStations]);

  // Вычисляем радиал самолета относительно станции
  const aircraftRadial = useMemo(() => {
    if (!currentStation) return null;
    return calculateBearing(currentStation.position, aircraftPosition);
  }, [currentStation, aircraftPosition]);

  // Вычисляем расстояние до станции
  const distanceToStation = useMemo(() => {
    if (!currentStation) return null;
    return calculateDistance(currentStation.position, aircraftPosition);
  }, [currentStation, aircraftPosition]);

  // Вычисляем силу сигнала
  const signalStrength = useMemo(() => {
    if (!distanceToStation) return 0;
    return calculateSignalStrength(distanceToStation);
  }, [distanceToStation]);

  // Вычисляем отклонение CDI
  const cdiDeflection = useMemo(() => {
    if (!aircraftRadial || !currentStation) return 0;
    return calculateCDIDeflection(obsCourse, aircraftRadial);
  }, [obsCourse, aircraftRadial, currentStation]);

  // Определяем индикатор TO/FROM
  const toFromIndicator = useMemo(() => {
    if (!aircraftRadial || !currentStation || signalStrength < 0.1) return 'OFF';
    return getToFromIndicator(obsCourse, aircraftRadial);
  }, [obsCourse, aircraftRadial, currentStation, signalStrength]);

  // Проверяем валидность сигнала
  const isSignalValid = useMemo(() => {
    return selectedFrequency !== null && currentStation !== null && signalStrength > 0.1;
  }, [selectedFrequency, currentStation, signalStrength]);

  return {
    // Состояние
    aircraftPosition,
    setAircraftPosition,
    selectedFrequency,
    setSelectedFrequency,
    obsCourse,
    setObsCourse,
    
    // Вычисляемое состояние
    cdiDeflection,
    toFromIndicator,
    isSignalValid,
    currentStation,
    vorStations,
    aircraftRadial,
    distanceToStation,
    signalStrength
  };
};