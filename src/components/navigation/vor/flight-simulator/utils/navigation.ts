// src/components/flight-simulator/utils/navigation.ts
import type { Position } from '../components/Map/types';

// Вычисление азимута от станции до самолета (0-360 градусов)
export const calculateBearing = (from: Position, to: Position): number => {
  const dx = to.x - from.x;
  const dy = from.y - to.y; // Инвертируем Y, потому что в SVG Y увеличивается вниз
  
  // Правильное вычисление азимута (0° = север, 90° = восток)
  let angle = Math.atan2(dx, dy) * 180 / Math.PI;
  
  // Преобразуем в диапазон 0-360 градусов
  if (angle < 0) angle += 360;
  
  return angle;
};

// Вычисление РАДИАЛА (курс ОТ станции)
export const calculateRadial = (stationPos: Position, aircraftPos: Position): number => {
  const bearing = calculateBearing(stationPos, aircraftPos);
  return Math.round(bearing);
};

// Вычисление расстояния между двумя точками
export const calculateDistance = (a: Position, b: Position): number => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Вычисление отклонения от радиала (-1 до 1)
export const calculateDeviation = (
  aircraftPos: Position,
  stationPos: Position,
  desiredRadial: number
): number => {
  // Вычисляем фактический радиал ОТ станции
  const actualRadial = calculateRadial(stationPos, aircraftPos);
  
  // Вычисляем разницу между фактическим радиалом и желаемым радиалом
  let radialDiff = actualRadial - desiredRadial;
  
  // Нормализуем разницу в диапазон [-180, 180]
  while (radialDiff > 180) radialDiff -= 360;
  while (radialDiff < -180) radialDiff += 360;
  
  // Преобразуем в отклонение от -1 до 1
  const maxDeviationAngle = 10;
  let deviation = radialDiff / maxDeviationAngle;
  
  // Ограничиваем отклонение диапазоном [-1, 1]
  deviation = Math.max(-1, Math.min(1, deviation));
  
  return deviation;
};

// ИСПРАВЛЕННАЯ логика определения TO/FROM
export const calculateToFrom = (
  aircraftPos: Position,
  stationPos: Position,
  desiredRadial: number
): 'FROM' | 'TO' | 'OFF' => {
  const distance = calculateDistance(aircraftPos, stationPos);
  
  // Если слишком далеко от станции
  if (distance > 1000) {
    return 'OFF';
  }
  
  // Вычисляем азимут от самолета к станции
  const bearingToStation = calculateBearing(aircraftPos, stationPos);
  
  // Вычисляем разницу между курсом на станцию и установленным радиалом
  let radialDiff = Math.abs(bearingToStation - desiredRadial);
  
  // Учитываем круговую природу углов
  radialDiff = Math.min(radialDiff, 360 - radialDiff);
  
  // Новая логика: если разница меньше 90 градусов - TO, иначе - FROM
  return radialDiff <= 90 ? 'FROM' : 'TO';
};

// Проверка, находится ли самолет на радиале (в пределах допуска)
export const isOnRadial = (
  aircraftPos: Position,
  stationPos: Position,
  desiredRadial: number,
  tolerance: number = 2
): boolean => {
  const actualRadial = calculateRadial(stationPos, aircraftPos);
  let radialDiff = Math.abs(actualRadial - desiredRadial);
  
  // Учитываем круговую природу углов
  radialDiff = Math.min(radialDiff, 360 - radialDiff);
  
  return radialDiff <= tolerance;
};