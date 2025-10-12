// components/navigation/flight-plan/route-builder/contexts/RouteBuilderProvider.tsx
import React, { useReducer } from 'react';
import type { ReactNode } from 'react';
import { RouteBuilderContext } from './RouteBuilderContext';
import { initialState } from './RouteBuilderContext.constants';
import { routeBuilderReducer } from './routeBuilderReducer';

interface RouteBuilderProviderProps {
  children: ReactNode;
}

export const RouteBuilderProvider: React.FC<RouteBuilderProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(routeBuilderReducer, initialState);

  return (
    <RouteBuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </RouteBuilderContext.Provider>
  );
};