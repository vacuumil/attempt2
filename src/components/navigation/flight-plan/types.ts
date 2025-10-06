export interface RouteLeg {
  id: string;
  name: string;           // Название пункта (Взлет, ППМ1, ППМ2...)
  magneticCourse: number; // МПУ (градусы)
  distance: number;       // Расстояние S (км)
}

export interface CalculatedLeg extends RouteLeg {
  driftAngle: number;     // УС (градусы)
  magneticHeading: number; // МК (градусы)
  trueAirspeed: number;   // V (воздушная скорость, км/ч)
  groundSpeed: number;    // W (путевая скорость, км/ч)
  legTime: number;        // t (время, минуты)
}

export interface FlightPlanData {
  legs: RouteLeg[];
  trueAirspeed: number;   // Воздушная скорость для всего маршрута
  windDirection: number;  // Направление ветра (постоянное для всего маршрута)
  windSpeed: number;      // Скорость ветра (постоянная для всего маршрута)
}

export interface RouteLeg {
  id: string;
  name: string;
  magneticCourse: number; // ЗМПУ
  distance: number; // Расстояние в км
}

export interface CalculatedLeg extends RouteLeg {
  driftAngle: number; // УС
  magneticHeading: number; // МК
  groundSpeed: number; // W
  legTime: number; // Время участка в минутах
}

export interface TrainingRoute {
  id: string;
  name: string;
  code: string;
  description: string;
  totalDistance: number;
  legs: RouteLeg[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface TrainingRoutesPanelProps {
  onRouteSelect: (routeCode: string) => void;
  selectedRoute: string;
  currentAirspeed: number;
}