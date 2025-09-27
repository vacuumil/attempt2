import { useMemo } from 'react';
import type { ApproachConfig, CalculationResults } from '../types/ils.types';

export const useIlsCalculations = (config: ApproachConfig): CalculationResults => {
  return useMemo(() => {
    const { runwayHeading, wind } = config;
    
    // Простые и понятные расчеты
    const windRelativeAngle = wind.direction - runwayHeading;
    const normalizedAngle = ((windRelativeAngle + 180) % 360) - 180;
    
    const windRad = normalizedAngle * Math.PI / 180;
    
    // Расчет составляющих ветра
    const crosswind = wind.speed * Math.sin(windRad);
    const headwind = wind.speed * Math.cos(windRad);
    
    // Простой расчет угла сноса
    const tas = 120; // Скорость самолета
    const windCorrectionAngle = Math.atan(crosswind / (tas + headwind)) * 180 / Math.PI;
    
    // Требуемый курс
    let requiredHeading = runwayHeading - windCorrectionAngle;
    if (requiredHeading < 0) requiredHeading += 360;
    if (requiredHeading >= 360) requiredHeading -= 360;
    
    return {
      windCorrectionAngle: Math.round(windCorrectionAngle * 10) / 10,
      crosswind: Math.round(crosswind * 10) / 10,
      headwind: Math.round(headwind * 10) / 10,
      requiredHeading: Math.round(requiredHeading * 10) / 10
    };
  }, [config]);
};