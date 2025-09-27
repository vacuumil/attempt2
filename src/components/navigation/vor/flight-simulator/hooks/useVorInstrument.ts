// src/components/flight-simulator/hooks/useVorInstrument.ts
import { useMemo } from 'react';
import type { AircraftState, VorStation } from '../components/Map/types';
import { calculateDeviation, calculateToFrom } from '../utils/navigation';

interface VorInstrumentResult {
  deviation: number;
  toFrom: 'TO' | 'FROM' | 'OFF';
}

export const useVorInstrument = (
  aircraft: AircraftState,
  activeStation: VorStation | null,
  obs: number
): VorInstrumentResult => {
  return useMemo(() => {
    if (!activeStation) {
      return { deviation: 0, toFrom: 'OFF' };
    }

    // Проверяем расстояние до станции
    const dx = aircraft.position.x - activeStation.position.x;
    const dy = aircraft.position.y - activeStation.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Если слишком далеко от станции, показываем OFF
    if (distance > 600) {
      return { deviation: 0, toFrom: 'OFF' };
    }

    // Для отладки - раскомментируйте следующую строку
    // debugNavigation(aircraft.position, activeStation.position, obs);

    const deviation = calculateDeviation(aircraft.position, activeStation.position, obs);
    const toFrom = calculateToFrom(aircraft.position, activeStation.position, obs);

    return { deviation, toFrom };
  }, [aircraft, activeStation, obs]);
};