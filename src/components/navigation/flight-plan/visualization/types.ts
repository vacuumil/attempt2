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