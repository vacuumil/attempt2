import { useState, useCallback, useEffect } from 'react';
import type { ApproachConfig, CalculationResults } from '../types/ils.types';

export const useIlsCalculations = (config: ApproachConfig) => {
  const [results, setResults] = useState<CalculationResults>({
    windCorrectionAngle: 0,
    crosswind: 0,
    headwind: 0,
    requiredHeading: 0
  });

  const calculateApproach = useCallback((config: ApproachConfig) => {
    const { runwayHeading, wind } = config;
    
    // Пересчет направления ветра относительно курса ВПП
    let windRelativeAngle = wind.direction - runwayHeading;
    
    // Нормализация угла (-180 до 180)
    if (windRelativeAngle > 180) windRelativeAngle -= 360;
    if (windRelativeAngle < -180) windRelativeAngle += 360;
    
    const windRad = windRelativeAngle * Math.PI / 180;
    
    // Расчет составляющих ветра
    const crosswind = wind.speed * Math.sin(windRad);
    const headwind = wind.speed * Math.cos(windRad);
    
    // Расчет угла сноса (формула для авиации)
    const tas = 120; // True Airspeed в узлах
    const windCorrectionAngle = Math.atan2(crosswind, tas + headwind) * 180 / Math.PI;
    
    // Требуемый курс с учетом сноса
    const requiredHeading = runwayHeading - windCorrectionAngle;
    
    setResults({
      windCorrectionAngle: parseFloat(windCorrectionAngle.toFixed(1)),
      crosswind: parseFloat(crosswind.toFixed(1)),
      headwind: parseFloat(headwind.toFixed(1)),
      requiredHeading: parseFloat((requiredHeading < 0 ? requiredHeading + 360 : requiredHeading).toFixed(1))
    });
  }, []);

  useEffect(() => {
    calculateApproach(config);
  }, [config, calculateApproach]);

  return results;
};