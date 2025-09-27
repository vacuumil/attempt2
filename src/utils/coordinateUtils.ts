import type { Coordinate } from '../types/navigation';

export const projectCoordinate = (
  coord: Coordinate, 
  center: Coordinate, 
  scale: number = 100000 // Увеличиваем масштаб значительно
): { x: number; y: number } => {
  // Правильная проекция: разница в градусах * масштаб
  const x = (coord.lon - center.lon) * scale;
  const y = -(coord.lat - center.lat) * scale; // Ось Y инвертирована в SVG
  return { x, y };
};

export const getMapCenter = (): Coordinate => ({
  lat: 53.9, // Примерный центр между городами
  lon: 49.2
});

export const getMapScale = (): number => 100000; // Увеличиваем масштаб