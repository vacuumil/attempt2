// src/components/flight-simulator/hooks/useWind.ts
import { useState, useCallback } from 'react';
import type { Wind } from '../utils/wind';

export const useWind = (initialWind: Wind = { direction: 0, speed: 0 }) => {
  const [wind, setWind] = useState<Wind>(initialWind);
  const [isWindEnabled, setIsWindEnabled] = useState(false);

  const updateWind = useCallback((newWind: Partial<Wind>) => {
    setWind(prev => ({ ...prev, ...newWind }));
  }, []);

  const toggleWind = useCallback(() => {
    setIsWindEnabled(prev => !prev);
  }, []);

  const generateRandomWind = useCallback((maxSpeed: number = 3) => {
    setWind({
      direction: Math.random() * 360,
      speed: Math.random() * maxSpeed
    });
  }, []);

  return {
    wind,
    isWindEnabled,
    updateWind,
    toggleWind,
    generateRandomWind
  };
};