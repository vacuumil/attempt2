// components/navigation/flight-plan/types.ts
export interface RouteLeg {
  id: string;
  name: string;
  magneticCourse: number;
  distance: number;
}

export interface CalculatedLeg extends RouteLeg {
  driftAngle: number;
  magneticHeading: number;
  trueAirspeed: number;
  groundSpeed: number;
  legTime: number;
}

export interface VisualizedLeg {
  name: string;
  magneticHeading: number;
  distance: number;
  driftAngle: number;
  groundSpeed: number;
  legTime: number;
}

export interface Point {
  x: number;
  y: number;
}

// Новые типы для конструктора маршрутов
export interface Waypoint {
  id: string;
  name: string;
  code: string;
  type: 'airport' | 'vor' | 'fix' | 'user';
  coordinates: {
    bearing: number;    // Радиал от BMK (0-359°)
    distance: number;   // Расстояние от BMK в км
  };
  frequency?: string;
  elevation?: number;
  region: string;
  description?: string;
}

export interface Airport extends Waypoint {
  type: 'airport';
  runways: Runway[];
  facilities: string[];
}

export interface Runway {
  designation: string;
  length: number;
  heading: number;
  surface: string;
}