export interface Coordinate {
  lat: number;
  lon: number;
}

export interface Airport {
  icao: string;
  name: string;
  position: Coordinate;
  runways: string[];
}

export interface ProcedurePoint {
  id: string;
  lat: number;
  lon: number;
  name?: string;
}

export interface Procedure {
  id: string;
  name: string;
  description: string;
  points: ProcedurePoint[];
}

export interface Route {
  id: string;
  from: string;
  to: string;
  mainPoints: ProcedurePoint[];
}

export interface FlightPlan {
  departure: string;
  arrival: string;
  sid?: Procedure;
  star?: Procedure;
  route: Route;
}