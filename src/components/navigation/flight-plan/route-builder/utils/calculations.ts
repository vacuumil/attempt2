// components/navigation/flight-plan/route-builder/utils/calculations.ts
import type { Waypoint, RouteLeg } from '../../types';

// Преобразование координат для отображения на карте
export function convertToCartesian(
  waypoint: Waypoint, 
  center: { x: number; y: number }, 
  scale: number
): { x: number; y: number } {
  const angleRad = (waypoint.coordinates.bearing - 90) * Math.PI / 180;
  const distancePixels = waypoint.coordinates.distance * scale;
  
  return {
    x: center.x + Math.cos(angleRad) * distancePixels,
    y: center.y + Math.sin(angleRad) * distancePixels
  };
}

// Проверка, находится ли точка в пределах клика
export function isPointInCircle(
  point: { x: number; y: number },
  center: { x: number; y: number },
  radius: number
): boolean {
  const dx = point.x - center.x;
  const dy = point.y - center.y;
  return dx * dx + dy * dy <= radius * radius;
}

// Расчет магнитного курса между двумя точками
export function calculateMagneticCourse(from: Waypoint, to: Waypoint): number {
  const fromRad = from.coordinates.bearing * Math.PI / 180;
  const toRad = to.coordinates.bearing * Math.PI / 180;
  
  const fromX = from.coordinates.distance * Math.sin(fromRad);
  const fromY = from.coordinates.distance * Math.cos(fromRad);
  const toX = to.coordinates.distance * Math.sin(toRad);
  const toY = to.coordinates.distance * Math.cos(toRad);
  
  const dx = toX - fromX;
  const dy = toY - fromY;
  
  let course = Math.atan2(dx, dy) * 180 / Math.PI;
  if (course < 0) course += 360;
  
  return Math.round(course);
}

// Расчет расстояния между двумя точками (упрощенный расчет для небольших расстояний)
export function calculateDistance(from: Waypoint, to: Waypoint): number {
  const fromRad = from.coordinates.bearing * Math.PI / 180;
  const toRad = to.coordinates.bearing * Math.PI / 180;
  
  const fromX = from.coordinates.distance * Math.sin(fromRad);
  const fromY = from.coordinates.distance * Math.cos(fromRad);
  const toX = to.coordinates.distance * Math.sin(toRad);
  const toY = to.coordinates.distance * Math.cos(toRad);
  
  const simpleDistance = Math.sqrt(
    Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2)
  );
  
  return Math.round(simpleDistance * 10) / 10; // Округление до 0.1 км
}

// Расчет параметров участков маршрута
export interface RouteLegInfo {
  distance: number;
  course: number;
  time: number; // в минутах при 250 км/ч
}

export function calculateRouteLegs(waypoints: Waypoint[]): RouteLegInfo[] {
  if (waypoints.length < 2) return [];
  
  const legs: RouteLegInfo[] = [];
  const airspeed = 200; // км/ч
  
  for (let i = 0; i < waypoints.length - 1; i++) {
    const from = waypoints[i];
    const to = waypoints[i + 1];
    
    const distance = calculateDistance(from, to);
    const course = calculateMagneticCourse(from, to);
    const time = (distance / airspeed) * 60; // время в минутах
    
    legs.push({
      distance,
      course,
      time
    });
  }
  
  return legs;
}

// Генерация полного маршрута для РПП
export function generateRouteFromWaypoints(waypoints: Waypoint[]): RouteLeg[] {
  if (waypoints.length < 2) return [];
  
  const legs: RouteLeg[] = [];
  const routeLegs = calculateRouteLegs(waypoints);
  
  // Первая точка (взлет)
  legs.push({
    id: waypoints[0].id,
    name: waypoints[0].name,
    magneticCourse: routeLegs[0]?.course || 0,
    distance: 0
  });
  
  // Промежуточные точки
  for (let i = 1; i < waypoints.length - 1; i++) {
    legs.push({
      id: waypoints[i].id,
      name: waypoints[i].name,
      magneticCourse: routeLegs[i - 1]?.course || 0,
      distance: routeLegs[i - 1]?.distance || 0
    });
  }
  
  // Последняя точка (посадка)
  if (waypoints.length > 1) {
    legs.push({
      id: waypoints[waypoints.length - 1].id,
      name: waypoints[waypoints.length - 1].name,
      magneticCourse: routeLegs[routeLegs.length - 1]?.course || 0,
      distance: routeLegs[routeLegs.length - 1]?.distance || 0
    });
  }
  
  return legs;
}

// Расчет общего расстояния маршрута
export function calculateTotalDistance(waypoints: Waypoint[]): number {
  let total = 0;
  for (let i = 0; i < waypoints.length - 1; i++) {
    total += calculateDistance(waypoints[i], waypoints[i + 1]);
  }
  return Math.round(total * 10) / 10;
}