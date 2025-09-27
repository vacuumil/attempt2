// src/components/meteorology/components/SigmetDisplay/SigmetDisplay.tsx
import React from 'react';
import type { SigmetData } from '../../utils/sigmetParser';
import {
  SigmetContainer,
  SigmetCard,
  HazardLevel,
  AffectedArea,
  TimeIndicator
} from './SigmetDisplay.styles';

interface SigmetDisplayProps {
  sigmetData: SigmetData[];
  icaoCode: string;
}

export const SigmetDisplay: React.FC<SigmetDisplayProps> = ({ sigmetData, icaoCode }) => {
  const getHazardIcon = (hazard: string): string => {
    const icons: Record<string, string> = {
      'THUNDERSTORM': '⛈️',
      'TURBULENCE': '💨',
      'ICING': '🧊',
      'VOLCANIC_ASH': '🌋',
      'DUST_STORM': '🌪️',
      'SAND_STORM': '🏜️',
      'CYCLONE': '🌀',
      'FOG': '🌫️'
    };
    return icons[hazard] || '⚠️';
  };

  const getHazardColor = (hazard: string): string => {
    const colors: Record<string, string> = {
      'THUNDERSTORM': '#ff6b6b',
      'TURBULENCE': '#ffd700',
      'ICING': '#64ffda',
      'VOLCANIC_ASH': '#9d4edd',
      'DUST_STORM': '#8b4513',
      'SAND_STORM': '#deb887',
      'CYCLONE': '#1a6fc4',
      'FOG': '#8892b0'
    };
    return colors[hazard] || '#e6f1ff';
  };

  const getSeverityLevel = (severity: string): string => {
    const levels: Record<string, string> = {
      'LIGHT': 'Слабая',
      'MODERATE': 'Умеренная',
      'SEVERE': 'Сильная',
      'EXTREME': 'Экстремальная'
    };
    return levels[severity] || severity;
  };

  return (
    <SigmetContainer>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ color: '#64ffda', marginBottom: '10px' }}>
          ⚠️ Опасные метеоявления (SIGMET/AIRMET)
        </h3>
        <div style={{ color: '#8892b0' }}>
          Актуальные предупреждения для региона {icaoCode}
        </div>
      </div>

      {sigmetData.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          color: '#8892b0',
          fontStyle: 'italic'
        }}>
          ⭐ Нет активных предупреждений SIGMET/AIRMET для данного региона
        </div>
      ) : (
        sigmetData.map((sigmet, index) => (
          <SigmetCard key={index} hazardType={sigmet.hazardType}>
            <div className="sigmet-header">
              <div className="hazard-info">
                <span 
                  className="hazard-icon"
                  style={{ color: getHazardColor(sigmet.hazardType) }}
                >
                  {getHazardIcon(sigmet.hazardType)}
                </span>
                <div>
                  <h4>{sigmet.hazardType.replace('_', ' ')}</h4>
                  <HazardLevel level={sigmet.severity}>
                    Уровень: {getSeverityLevel(sigmet.severity)}
                  </HazardLevel>
                </div>
              </div>
              <TimeIndicator>
                {sigmet.validity.from} - {sigmet.validity.to}
              </TimeIndicator>
            </div>

            <div className="sigmet-content">
              <p><strong>Описание:</strong> {sigmet.description}</p>
              
              <AffectedArea>
                <strong>Зона воздействия:</strong> {sigmet.areaDescription}
                {sigmet.altitude && (
                  <div>Высота: {sigmet.altitude.min} - {sigmet.altitude.max} ft</div>
                )}
              </AffectedArea>

              {sigmet.movement && (
                <div className="movement">
                  <strong>Движение:</strong> {sigmet.movement.direction}° со скоростью {sigmet.movement.speed} kt
                </div>
              )}

              <div className="issuance-info">
                Выпущено: {sigmet.issuanceTime} • Станция: {sigmet.issuingStation}
              </div>
            </div>
          </SigmetCard>
        ))
      )}
    </SigmetContainer>
  );
};