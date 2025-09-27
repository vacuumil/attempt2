declare module '*.json' {
  interface AirportData {
    icao: string;
    name: string;
    position: { lat: number; lon: number };
    runways: string[];
  }

  interface RoutePoint {
    id: string;
    lat: number;
    lon: number;
    name?: string;
  }

  interface RouteData {
    id: string;
    from: string;
    to: string;
    mainPoints: RoutePoint[];
  }

  interface ProcedurePoint {
    id: string;
    lat: number;
    lon: number;
    name?: string;
  }

  interface Procedure {
    id: string;
    name: string;
    description: string;
    points: ProcedurePoint[];
  }

  interface AirportProcedures {
    SID: Procedure[];
    STAR: Procedure[];
  }

  // Для airports.json
  interface AirportsJson {
    airports: AirportData[];
  }

  // Для routes.json
  interface RoutesJson {
    routes: RouteData[];
  }

  // Для procedures.json - динамическая структура по ICAO кодам
  interface ProceduresJson {
    [icao: string]: AirportProcedures;
  }

  const value: AirportsJson | RoutesJson | ProceduresJson;
  export default value;
}