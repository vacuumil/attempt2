export interface WindParams {
  direction: number; // Направление ветра в градусах (0-359)
  speed: number;     // Скорость ветра в узлах
}

export interface ApproachConfig {
  runwayHeading: number;   // Курс ВПП в градусах (0-359)
  glideSlopeAngle: number; // Угол глиссады (2.5-3.5)
  wind: WindParams;
}

export interface IlsComponents {
  localizer: {
    course: number;
    coverage: number; // Зона покрытия в градусах
  };
  glidePath: {
    angle: number;
    coverage: number; // Зона покрытия в градусах
  };
  markerBeacons: {
    outer: number; // Дистанция до внешнего маркера (NM)
    middle: number; // Дистанция до среднего маркера (NM)
    inner: number;  // Дистанция до внутреннего маркера (NM)
  };
}

export interface CalculationResults {
  windCorrectionAngle: number;
  crosswind: number;
  headwind: number;
  requiredHeading: number;
}