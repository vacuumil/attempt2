// src/components/flight-simulator/hooks/useFlightNavigation.ts
import React from 'react';
import { useState, useCallback, useRef } from 'react';
import type { AircraftState, Position } from '../components/Map/types';
import type { Wind} from '../utils/wind';
import { calculateWindEffect } from '../utils/wind';
import { MAP_DIMENSIONS } from '../utils/constants';

interface UseFlightNavigationProps {
  initialState: AircraftState;
  wind?: Wind;
  isWindEnabled?: boolean;
}

export const useFlightNavigation = ({
  initialState,
  wind = { direction: 0, speed: 0 },
  isWindEnabled = false
}: UseFlightNavigationProps) => {
  const [aircraft, setAircraft] = useState<AircraftState>(initialState);
  const [trail, setTrail] = useState<Position[]>([]);
  const [isContinuousTurn, setIsContinuousTurn] = useState(false);
  const turnDirection = useRef<'left' | 'right' | null>(null);
  const turnInterval = useRef<number | null>(null);

  const updateHeading = useCallback((newHeading: number) => {
    setAircraft(prev => ({
      ...prev,
      heading: newHeading % 360
    }));
  }, []);

  const startContinuousTurn = useCallback((direction: 'left' | 'right') => {
    if (turnInterval.current) {
      clearInterval(turnInterval.current);
    }
    
    turnDirection.current = direction;
    setIsContinuousTurn(true);
    
    turnInterval.current = window.setInterval(() => {
      setAircraft(prev => {
        const turnRate = 2; // градусов за интервал
        const newHeading = direction === 'right' 
          ? (prev.heading + turnRate) % 360
          : (prev.heading - turnRate + 360) % 360;
        
        return {
          ...prev,
          heading: newHeading
        };
      });
    }, 50); // каждые 50ms
  }, []);

  const stopContinuousTurn = useCallback(() => {
    if (turnInterval.current) {
      clearInterval(turnInterval.current);
      turnInterval.current = null;
    }
    setIsContinuousTurn(false);
    turnDirection.current = null;
  }, []);

  const moveAircraft = useCallback((distance: number = 5) => { // Уменьшили скорость с 10 до 5
    setAircraft(prev => {
      const rad = prev.heading * Math.PI / 180;
      
      let dx = distance * Math.sin(rad);
      let dy = -distance * Math.cos(rad);
      
      // Эффект ветра
      if (isWindEnabled) {
        const { driftAngle, driftSpeed } = calculateWindEffect(prev.heading, wind);
        const driftRad = (prev.heading + driftAngle) * Math.PI / 180;
        
        dx += driftSpeed * Math.sin(driftRad);
        dy += -driftSpeed * Math.cos(driftRad);
      }
      
      const newPosition = {
        x: prev.position.x + dx,
        y: prev.position.y + dy
      };
      
      // Ограничиваем движение границами карты
      newPosition.x = Math.max(0, Math.min(MAP_DIMENSIONS.width, newPosition.x));
      newPosition.y = Math.max(0, Math.min(MAP_DIMENSIONS.height, newPosition.y));
      
      // Обновляем траекторию только если позиция изменилась
      if (newPosition.x !== prev.position.x || newPosition.y !== prev.position.y) {
        setTrail(prevTrail => [...prevTrail, prev.position].slice(-100));
      }
      
      return {
        ...prev,
        position: newPosition
      };
    });
  }, [isWindEnabled, wind]);

  const resetAircraft = useCallback((position?: Position, heading?: number) => {
    setAircraft({
      position: position || initialState.position,
      heading: heading !== undefined ? heading : initialState.heading
    });
    setTrail([]);
    stopContinuousTurn();
  }, [initialState, stopContinuousTurn]);

  // Очищаем интервал при размонтировании
  React.useEffect(() => {
    return () => {
      if (turnInterval.current) {
        clearInterval(turnInterval.current);
      }
    };
  }, []);

  return {
    aircraft,
    trail,
    isContinuousTurn,
    turnDirection: turnDirection.current,
    updateHeading,
    moveAircraft,
    resetAircraft,
    startContinuousTurn,
    stopContinuousTurn
  };
};