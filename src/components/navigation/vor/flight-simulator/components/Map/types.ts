// src/components/flight-simulator/components/Map/types.ts
export interface Position {
  x: number;
  y: number;
}

export interface VorStation {
  id: string;
  name: string;
  frequency: string;
  position: Position;
}

export interface AircraftState {
  position: Position;
  heading: number; // 0-360 degrees
}

export interface NavigationState {
  activeStationId: string | null;
  obs: number; // 0-360 degrees
  deviation: number; // -1 to 1 (left to right)
  toFrom: 'TO' | 'FROM' | 'OFF';
}