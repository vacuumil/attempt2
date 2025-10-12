// components/navigation/flight-plan/route-builder/contexts/RouteBuilderContext.types.ts
import type { Waypoint, RouteLeg } from '../../types';

export interface RouteBuilderState {
  selectedWaypoints: Waypoint[];
  currentRoute: RouteLeg[];
  homeBase: Waypoint | null;
  isDrawing: boolean;
}

export type RouteBuilderAction =
  | { type: 'SET_HOME_BASE'; payload: Waypoint }
  | { type: 'ADD_WAYPOINT'; payload: Waypoint }
  | { type: 'REMOVE_WAYPOINT'; payload: string }
  | { type: 'MOVE_WAYPOINT'; payload: { fromIndex: number; toIndex: number } }
  | { type: 'CLEAR_ROUTE' }
  | { type: 'SET_DRAWING'; payload: boolean }
  | { type: 'LOAD_ROUTE'; payload: { waypoints: Waypoint[]; legs: RouteLeg[] } };

export interface RouteBuilderContextType {
  state: RouteBuilderState;
  dispatch: React.Dispatch<RouteBuilderAction>;
}