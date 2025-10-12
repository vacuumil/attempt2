// components/navigation/flight-plan/route-builder/utils/helpers.ts
import type { Waypoint } from '../../types';

export function getWaypointIcon(type: Waypoint['type']): string {
  switch (type) {
    case 'airport':
      return '🛬';
    case 'vor':
      return '📡';
    case 'fix':
      return '📍';
    case 'user':
      return '✏️';
    default:
      return '📍';
  }
}

export function getWaypointColor(type: Waypoint['type']): string {
  switch (type) {
    case 'airport':
      return '#64ffda';
    case 'vor':
      return '#1a6fc4';
    case 'fix':
      return '#e6f1ff';
    case 'user':
      return '#ffd700';
    default:
      return '#8892b0';
  }
}

export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} м`;
  }
  return `${distance.toFixed(1)} км`;
}

export function formatBearing(bearing: number): string {
  return `${bearing.toFixed(0)}°`;
}

export function calculateTotalDistance(waypoints: Waypoint[]): number {
  let total = 0;
  for (let i = 0; i < waypoints.length - 1; i++) {
    const dx = waypoints[i + 1].coordinates.distance * Math.sin(waypoints[i + 1].coordinates.bearing * Math.PI / 180) -
               waypoints[i].coordinates.distance * Math.sin(waypoints[i].coordinates.bearing * Math.PI / 180);
    const dy = waypoints[i + 1].coordinates.distance * Math.cos(waypoints[i + 1].coordinates.bearing * Math.PI / 180) -
               waypoints[i].coordinates.distance * Math.cos(waypoints[i].coordinates.bearing * Math.PI / 180);
    
    total += Math.sqrt(dx * dx + dy * dy);
  }
  return Math.round(total);
}