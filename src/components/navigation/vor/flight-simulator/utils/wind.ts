// src/components/flight-simulator/utils/wind.ts
export interface Wind {
  direction: number; // 0-360 градусов
  speed: number;     // единицы/кадр
}

export const calculateWindEffect = (
  aircraftHeading: number,
  wind: Wind
): { driftAngle: number; driftSpeed: number } => {
  const relativeWindAngle = wind.direction - aircraftHeading;
  const windRad = relativeWindAngle * Math.PI / 180;
  
  // Поперечная составляющая ветра (снос)
  const crosswind = wind.speed * Math.sin(windRad);
  // Продольная составляющая (попутный/встречный)
  const headwind = wind.speed * Math.cos(windRad);
  
  // Угол сноса (примерно)
  const driftAngle = Math.atan2(crosswind, 10 + headwind) * 180 / Math.PI;
  const driftSpeed = Math.sqrt(crosswind * crosswind + headwind * headwind) / 10;
  
  return { driftAngle, driftSpeed };
};