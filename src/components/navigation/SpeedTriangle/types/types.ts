export interface SpeedTriangleState {
  tas: number;
  trueCourse: number;
  windSpeed: number;
  windDirection: number; // Метеорологическое направление (откуда дует)
  useMagneticWind?: boolean; // Флаг для использования магнитного ветра
  magneticVariation?: number; // Магнитное склонение
}

export interface CalculationResults {
  wca: number;
  groundspeed: number;
  trueHeading: number;
}

export interface VectorData {
  x: number;
  y: number;
  angle: number;
  magnitude: number;
}