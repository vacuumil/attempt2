import type { Point } from './types';

// Преобразование градусов в радианы
export const toRadians = (degrees: number): number => degrees * (Math.PI / 180);

// Преобразование радианов в градусы  
export const toDegrees = (radians: number): number => radians * (180 / Math.PI);

// Расчет точки на окружности по углу и радиусу
export const getPointOnCircle = (
  center: Point, 
  radius: number, 
  angleDegrees: number
): Point => {
  const angleRad = toRadians(angleDegrees);
  return {
    x: center.x + radius * Math.sin(angleRad),
    y: center.y - radius * Math.cos(angleRad)
  };
};

// Расчет истинного курса из магнитного с учетом склонения
export const magneticToTrue = (magnetic: number, declination: number): number => {
  let trueCourse = magnetic + declination;
  if (trueCourse < 0) trueCourse += 360;
  if (trueCourse >= 360) trueCourse -= 360;
  return trueCourse;
};

// Расчет длины вектора для визуализации (нормализация)
export const normalizeLength = (distance: number, maxDistance: number, maxLength: number): number => {
  return (distance / maxDistance) * maxLength;
};