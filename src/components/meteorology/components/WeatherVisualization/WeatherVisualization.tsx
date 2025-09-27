// src/components/meteorology/components/WeatherVisualization/WeatherVisualization.tsx
import React from 'react';
import type { ParsedMetar } from '../../utils';
import {
  VisualizationGrid,
  WeatherCard,
  WindDirection,
  WindArrow,
  WeatherIcon,
  ValueDisplay,
  ValueLabel,
  WeatherGrid,
  CloudLayer,
  CloudChart
} from './WeatherVisualization.styles';

interface WeatherVisualizationProps {
  metarData: ParsedMetar;
}

export const WeatherVisualization: React.FC<WeatherVisualizationProps> = ({ metarData }) => {
  const getWeatherIcon = (conditions: string[]) => {
    if (conditions.some(c => c.includes('TS'))) return '⛈️';
    if (conditions.some(c => c.includes('SN'))) return '❄️';
    if (conditions.some(c => c.includes('RA') || c.includes('DZ'))) return '🌧️';
    if (conditions.some(c => c.includes('FG') || c.includes('BR'))) return '🌫️';
    if (metarData.clouds.some(c => c.coverage === 'OVC' || c.coverage === 'BKN')) return '☁️';
    if (metarData.clouds.some(c => c.coverage === 'SCT' || c.coverage === 'FEW')) return '⛅';
    if (metarData.clouds.length === 0) return '☀️';
    return '☀️';
  };

  const getVisibilityColor = (visibility: number) => {
    if (visibility >= 5000) return '#64ffda';
    if (visibility >= 2000) return '#ffd700';
    return '#ff6b6b';
  };

  // Функция для расчета позиции облачного слоя
  const calculateCloudPosition = (altitude: number): number => {
    const maxAltitude = 10000;
    const normalizedAltitude = Math.min(altitude, maxAltitude);
    return (normalizedAltitude / maxAltitude) * 100;
  };

  // Сортируем облака по высоте (от низких к высоким)
  const sortedClouds = [...metarData.clouds].sort((a, b) => a.altitude - b.altitude);

  return (
    <VisualizationGrid>
      {/* Карточка с основной информацией */}
      <WeatherCard>
        <WeatherIcon>{getWeatherIcon(metarData.weatherConditions)}</WeatherIcon>
        
        <WeatherGrid>
          <ValueDisplay>
            <ValueLabel>Ветер</ValueLabel>
            <WindDirection>
              <WindArrow 
                direction={metarData.wind.direction || 0} 
                title={`Направление: ${metarData.wind.direction || 'VRB'}°`}
              />
              <span>
                {metarData.wind.direction ? `${metarData.wind.direction}°` : 'VRB'} / {metarData.wind.speed} {metarData.wind.unit}
                {metarData.wind.gust && ` (порывы ${metarData.wind.gust})`}
              </span>
            </WindDirection>
          </ValueDisplay>

          <ValueDisplay>
            <ValueLabel>Видимость</ValueLabel>
            <span style={{ color: getVisibilityColor(metarData.visibility.value) }}>
              {metarData.visibility.isCavok ? '≥10 km' : 
               metarData.visibility.value >= 10000 ? '≥10 km' : `${metarData.visibility.value} m`}
            </span>
          </ValueDisplay>

          <ValueDisplay>
            <ValueLabel>Температура</ValueLabel>
            <span>{metarData.temperature.value}°C</span>
          </ValueDisplay>

          <ValueDisplay>
            <ValueLabel>Давление</ValueLabel>
            <span>
              {metarData.pressure.unit}{metarData.pressure.value} 
              {metarData.pressure.isInHg ? ' дюймов рт.ст.' : ' гПа'}
            </span>
          </ValueDisplay>
        </WeatherGrid>
      </WeatherCard>

      {/* Карточка с облачностью */}
      <WeatherCard>
        <h3>Облачность</h3>
        <CloudChart>
          {metarData.clouds.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              color: '#64ffda',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>☀️</div>
              <div>Нет облаков или ясно</div>
            </div>
          ) : (
            <>
              {/* Линии высоты */}
              {[10000, 8000, 6000, 4000, 2000, 0].map(altitude => (
                <div 
                  key={altitude}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: `${calculateCloudPosition(altitude)}%`,
                    borderTop: altitude > 0 ? '1px dashed rgba(100, 255, 218, 0.3)' : 'none',
                    color: '#8892b0',
                    fontSize: '0.7rem',
                    paddingLeft: '5px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: altitude === 0 ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
                    zIndex: 1
                  }}
                >
                  {altitude > 0 ? `${altitude} ft` : 'Земля'}
                </div>
              ))}
              
              {/* Облачные слои */}
              {sortedClouds.map((cloud, index) => {
                const position = calculateCloudPosition(cloud.altitude);
                
                return (
                  <CloudLayer 
                    key={index} 
                    altitude={cloud.altitude}
                    coverage={cloud.coverage}
                    style={{ bottom: `${position}%` }}
                  >
                    <span>{cloud.coverage} {cloud.altitude} ft</span>
                  </CloudLayer>
                );
              })}
            </>
          )}
        </CloudChart>
        
        {metarData.weatherConditions.length > 0 && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <ValueLabel>Погодные явления:</ValueLabel>
            <div>
              {metarData.weatherConditions.map((condition, index) => (
                <div key={index} style={{ color: '#ffd700', marginTop: '5px' }}>
                  {condition}
                </div>
              ))}
            </div>
          </div>
        )}
      </WeatherCard>
    </VisualizationGrid>
  );
};