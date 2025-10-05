import type { RouteLeg, CalculatedLeg } from './types';

export function calculateRoute(
  legs: RouteLeg[], 
  trueAirspeed: number, 
  windDirection: number, 
  windSpeed: number
): CalculatedLeg[] {
  return legs.map(leg => calculateSingleLeg(leg, trueAirspeed, windDirection, windSpeed));
}

function calculateSingleLeg(
  leg: RouteLeg, 
  trueAirspeed: number, 
  windDirection: number, // Метеорологический ветер (откуда дует)
  windSpeed: number      // Скорость метеорологического ветра
): CalculatedLeg {
  const { magneticCourse, distance } = leg;

  // Преобразуем градусы в радианы
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  const toDegrees = (radians: number) => radians * (180 / Math.PI);

  // **КОРРЕКТНО ОПРЕДЕЛЯЕМ УГОЛ СНОСА**
  // Метеорологический ветер - направление ОТКУДА дует ветер
  // Навигационный ветер = (метеорологический ветер + 180) % 360
  const navigationalWindDirection = (windDirection + 180) % 360;
  
  // Угол между курсом и навигационным ветром
  let windAngle = navigationalWindDirection - magneticCourse;
  
  // Приводим угол к диапазону [-180, 180]
  if (windAngle > 180) windAngle -= 360;
  if (windAngle < -180) windAngle += 360;

  const windAngleRad = toRadians(windAngle);
  
  // Расчет угла сноса
  // УС = arcsin( (U * sin(α)) / V ), где α - угол между курсом и навигационным ветром
  const sinArgument = (windSpeed * Math.sin(windAngleRad)) / trueAirspeed;
  const clampedArgument = Math.max(-1, Math.min(1, sinArgument));
  
  const driftAngleRad = Math.asin(clampedArgument);
  let driftAngle = toDegrees(driftAngleRad);

  // **КОРРЕКТНО ОПРЕДЕЛЯЕМ ЗНАК УС**
  // Если ветер справа (windAngle > 0) - УС положительный (снос вправо)
  // Если ветер слева (windAngle < 0) - УС отрицательный (снос влево)
  if (windAngle < 0) {
    driftAngle = -Math.abs(driftAngle);
  } else {
    driftAngle = Math.abs(driftAngle);
  }

  // **КОРРЕКТНО РАССЧИТЫВАЕМ МК (0-359°)**
  let magneticHeading = magneticCourse - driftAngle;
  
  // Приводим МК к диапазону 0-359 градусов
  if (magneticHeading < 0) {
    magneticHeading += 360;
  } else if (magneticHeading >= 360) {
    magneticHeading -= 360;
  }

  // Путевая скорость
  const groundSpeed = trueAirspeed * Math.cos(driftAngleRad) + 
                     windSpeed * Math.cos(windAngleRad);

  // Время полета в минутах
  let legTime = 0;
  if (distance > 0 && groundSpeed > 0) {
    legTime = (distance / groundSpeed) * 60;
  }

  return {
    ...leg,
    driftAngle: Math.round(driftAngle),
    magneticHeading: Math.round(magneticHeading),
    trueAirspeed: trueAirspeed,
    groundSpeed: Math.round(groundSpeed),
    legTime: Math.round(legTime)
  };
}