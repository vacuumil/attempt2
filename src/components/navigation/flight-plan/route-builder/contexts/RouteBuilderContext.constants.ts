// components/navigation/flight-plan/route-builder/contexts/RouteBuilderContext.constants.ts
import type { RouteBuilderState } from './RouteBuilderContext.types';

export const initialState: RouteBuilderState = {
  selectedWaypoints: [],
  currentRoute: [],
  homeBase: null,
  isDrawing: false
};