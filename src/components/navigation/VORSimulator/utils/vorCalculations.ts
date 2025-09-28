import type { VORStation, AircraftPosition } from '../../../../types/navigation';

export const calculateRadial = (
  aircraft: AircraftPosition,
  station: VORStation
): number => {
  const dx = aircraft.x - station.location.x;
  const dy = aircraft.y - station.location.y;
  
  // Правильный расчет угла (0° - север, 90° - восток)
  // В системе координат карты: 0° - вверх (север), 90° - вправо (восток)
  let radial = (Math.atan2(dx, -dy) * 180) / Math.PI;
  
  // Конвертируем в диапазон 0-360
  radial = (radial + 360) % 360;
  return Math.round(radial);
};

// Функция для преобразования навигационного радиала в угол для CSS (карты)
export const calculateMapRadial = (radial: number): number => {
  // CSS: 0° - вправо (восток), 90° - вниз (юг)
  // Наш радиал: 0° - север, 90° - восток
  // Преобразуем: север (0°) -> -90° в CSS, восток (90°) -> 0° в CSS
  return radial;
};

export const calculateDistance = (
  aircraft: AircraftPosition,
  station: VORStation
): number => {
  const dx = aircraft.x - station.location.x;
  const dy = aircraft.y - station.location.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const calculateDeviation = (
  selectedRadial: number,
  currentRadial: number
): number => {
  let deviation = currentRadial - selectedRadial;
  
  // Нормализуем отклонение в диапазон -180 до 180
  if (deviation > 180) deviation -= 360;
  if (deviation < -180) deviation += 360;
  
  return deviation;
};

export const checkIsOnCourse = (deviation: number, tolerance: number = 5): boolean => {
  return Math.abs(deviation) <= tolerance;
};

export const calculateSignalStrength = (
  distance: number,
  maxRange: number
): number => {
  if (distance > maxRange) return 0;
  return 1 - (distance / maxRange);
};