// src/components/flight-simulator/utils/constants.ts
import type { VorStation, AircraftState } from '../components/Map/types';

export const VOR_STATIONS: VorStation[] = [
  {
    id: 'trc',
    name: 'VOR-TRC',
    frequency: '112.50',
    position: { x: 600, y: 400 } // Центрируем станции
  },
  {
    id: 'dme',
    name: 'VOR-DME',
    frequency: '114.70', 
    position: { x: 1200, y: 800 } // Центрируем станции
  }
];

export const MAP_DIMENSIONS = {
  width: 1600, // Увеличиваем в 1.6 раза
  height: 1000  // Увеличиваем в 1.6 раза
};

export const AIRCRAFT_INITIAL: AircraftState = {
  position: { x: 800, y: 500 }, // Центрируем начальную позицию
  heading: 0
};