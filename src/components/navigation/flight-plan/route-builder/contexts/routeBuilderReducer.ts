// components/navigation/flight-plan/route-builder/contexts/routeBuilderReducer.ts
import type { RouteBuilderState, RouteBuilderAction } from './RouteBuilderContext.types';

export function routeBuilderReducer(state: RouteBuilderState, action: RouteBuilderAction): RouteBuilderState {
  switch (action.type) {
    case 'SET_HOME_BASE':
      return {
        ...state,
        homeBase: action.payload,
        selectedWaypoints: [action.payload]
      };

    case 'ADD_WAYPOINT': {
      // Не добавлять дубликаты
      if (state.selectedWaypoints.find((wp) => wp.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        selectedWaypoints: [...state.selectedWaypoints, action.payload]
      };
    }

    case 'REMOVE_WAYPOINT': {
      return {
        ...state,
        selectedWaypoints: state.selectedWaypoints.filter(wp => wp.id !== action.payload)
      };
    }

    case 'MOVE_WAYPOINT': {
      const newWaypoints = [...state.selectedWaypoints];
      const [movedItem] = newWaypoints.splice(action.payload.fromIndex, 1);
      newWaypoints.splice(action.payload.toIndex, 0, movedItem);
      return {
        ...state,
        selectedWaypoints: newWaypoints
      };
    }

    case 'CLEAR_ROUTE':
      return {
        ...state,
        selectedWaypoints: state.homeBase ? [state.homeBase] : [],
        currentRoute: []
      };

    case 'SET_DRAWING':
      return {
        ...state,
        isDrawing: action.payload
      };

    case 'LOAD_ROUTE':
      return {
        ...state,
        selectedWaypoints: action.payload.waypoints,
        currentRoute: action.payload.legs
      };

    default:
      return state;
  }
}