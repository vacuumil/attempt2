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