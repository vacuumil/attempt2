// components/navigation/flight-plan/route-builder/contexts/RouteBuilderContext.tsx
import { createContext } from 'react';
import type { RouteBuilderContextType } from './RouteBuilderContext.types';

export const RouteBuilderContext = createContext<RouteBuilderContextType | null>(null);