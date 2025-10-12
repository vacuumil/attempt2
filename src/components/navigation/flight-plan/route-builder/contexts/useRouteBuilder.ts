// components/navigation/flight-plan/route-builder/contexts/useRouteBuilder.ts
import { useContext } from 'react';
import { RouteBuilderContext } from './RouteBuilderContext';
import type { RouteBuilderContextType } from './RouteBuilderContext.types';

export const useRouteBuilder = (): RouteBuilderContextType => {
  const context = useContext(RouteBuilderContext);
  if (!context) {
    throw new Error('useRouteBuilder must be used within a RouteBuilderProvider');
  }
  return context;
};