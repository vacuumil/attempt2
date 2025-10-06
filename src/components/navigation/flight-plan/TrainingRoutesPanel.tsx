import React, { useState } from 'react';
import { trainingRoutes } from './trainingRoutes';
import styled from 'styled-components';

const PanelContainer = styled.div`
  background: linear-gradient(145deg, #112240 0%, #1a3a5f 100%);
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 1px solid rgba(100, 255, 218, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const PanelTitle = styled.h3`
  color: #64ffda;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

const SpeedInfo = styled.div`
  background: rgba(26, 111, 196, 0.1);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid rgba(26, 111, 196, 0.3);
  text-align: center;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const SpeedValue = styled.span`
  color: #64ffda;
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0 0.25rem;
`;

const RoutesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const RouteCard = styled.div<{ selected: boolean; difficulty: string }>`
  background: ${props => props.selected 
    ? 'linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%)' 
    : 'rgba(17, 34, 64, 0.7)'};
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid ${props => {
    switch (props.difficulty) {
      case 'beginner': return 'rgba(100, 255, 218, 0.3)';
      case 'intermediate': return 'rgba(255, 215, 0, 0.3)';
      case 'advanced': return 'rgba(255, 107, 107, 0.3)';
      default: return 'rgba(100, 255, 218, 0.3)';
    }
  }};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(100, 255, 218, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    &:hover {
      transform: none;
    }
  }
`;

const RouteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const RouteCode = styled.div<{ selected: boolean }>`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.selected ? '#0a192f' : '#64ffda'};
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const RouteName = styled.div<{ selected: boolean }>`
  font-weight: 500;
  color: ${props => props.selected ? '#0a192f' : '#e6f1ff'};
  margin-bottom: 0.5rem;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 0.4rem;
  }
`;

const RouteDescription = styled.div<{ selected: boolean }>`
  font-size: 0.85rem;
  color: ${props => props.selected ? 'rgba(10, 25, 47, 0.8)' : '#8892b0'};
  margin-bottom: 0.75rem;
  line-height: 1.4;
  
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    -webkit-line-clamp: 2;
    margin-bottom: 0.5rem;
  }
`;

const RouteInfo = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: ${props => props.selected ? 'rgba(10, 25, 47, 0.8)' : '#8892b0'};

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const DistanceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const TimeInfo = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: ${props => props.selected ? 'rgba(10, 25, 47, 0.8)' : '#64ffda'};
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const DifficultyBadge = styled.span<{ difficulty: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: bold;
  background: ${props => {
    switch (props.difficulty) {
      case 'beginner': return 'rgba(100, 255, 218, 0.2)';
      case 'intermediate': return 'rgba(255, 215, 0, 0.2)';
      case 'advanced': return 'rgba(255, 107, 107, 0.2)';
      default: return 'rgba(100, 255, 218, 0.2)';
    }
  }};
  color: ${props => {
    switch (props.difficulty) {
      case 'beginner': return '#64ffda';
      case 'intermediate': return '#ffd700';
      case 'advanced': return '#ff6b6b';
      default: return '#64ffda';
    }
  }};
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 0.65rem;
    padding: 0.2rem 0.4rem;
  }
`;

const CompactViewToggle = styled.button`
  background: rgba(26, 111, 196, 0.2);
  border: 1px solid rgba(26, 111, 196, 0.4);
  color: #64ffda;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  display: none;

  @media (max-width: 480px) {
    display: block;
    width: 100%;
  }

  &:hover {
    background: rgba(26, 111, 196, 0.3);
  }
`;

const MobileRouteStats = styled.div`
  display: none;
  
  @media (max-width: 480px) {
    display: flex;
    justify-content: space-around;
    background: rgba(10, 25, 47, 0.4);
    padding: 0.75rem;
    border-radius: 6px;
    margin-top: 1rem;
    font-size: 0.8rem;
    color: '#8892b0';
  }
`;

const StatItem = styled.div`
  text-align: center;
  
  .stat-value {
    color: #64ffda;
    font-weight: bold;
    font-size: 1rem;
  }
  
  .stat-label {
    font-size: 0.7rem;
    margin-top: 0.25rem;
  }
`;

interface TrainingRoutesPanelProps {
  onRouteSelect: (routeCode: string) => void;
  selectedRoute: string;
  currentAirspeed: number;
}

export const TrainingRoutesPanel: React.FC<TrainingRoutesPanelProps> = ({
  onRouteSelect,
  selectedRoute,
  currentAirspeed
}) => {
  const [compactView, setCompactView] = useState(false);

  // Функция расчета времени полета с учетом реальной скорости
  const calculateFlightTime = (distance: number, airspeed: number): string => {
    if (airspeed <= 0) return '∞';
    
    const totalMinutes = (distance / airspeed) * 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    
    if (hours > 0) {
      return `${hours}ч ${minutes}м`;
    } else {
      return `${minutes}м`;
    }
  };

  // Статистика по маршрутам
  const routeStats = {
    total: trainingRoutes.length,
    beginner: trainingRoutes.filter(r => r.difficulty === 'beginner').length,
    intermediate: trainingRoutes.filter(r => r.difficulty === 'intermediate').length,
    advanced: trainingRoutes.filter(r => r.difficulty === 'advanced').length,
  };

  // Расчет общего времени для всех маршрутов
  const totalFlightTime = trainingRoutes.reduce((sum, route) => {
    return sum + (route.totalDistance / currentAirspeed) * 60;
  }, 0);
  const avgFlightTime = totalFlightTime / trainingRoutes.length;

  return (
    <PanelContainer>
      <PanelTitle>📚 Учебные маршруты</PanelTitle>

      {/* Информация о текущей скорости */}
      <SpeedInfo>
        <div style={{ color: '#e6f1ff', fontSize: '0.9rem' }}>
          <span>Расчет времени для воздушной скорости: </span>
          <SpeedValue>{currentAirspeed} км/ч</SpeedValue>
        </div>
        <div style={{ 
          fontSize: '0.8rem', 
          color: '#8892b0', 
          marginTop: '0.5rem',
        }}>
          Среднее время полета: <strong>~{Math.round(avgFlightTime)} мин</strong>
        </div>
        <div style={{ 
          fontSize: '0.75rem', 
          color: '#8892b0', 
          marginTop: '0.25rem',
          fontStyle: 'italic'
        }}>
          Измените скорость в панели "Общие параметры маршрута"
        </div>
      </SpeedInfo>

      {/* Переключатель компактного вида */}
      <CompactViewToggle onClick={() => setCompactView(!compactView)}>
        {compactView ? '📖 Развернутый вид' : '📱 Компактный вид'}
      </CompactViewToggle>

      <RoutesGrid>
        {trainingRoutes.map((route) => (
          <RouteCard
            key={route.id}
            selected={selectedRoute === route.code}
            difficulty={route.difficulty}
            onClick={() => onRouteSelect(route.code)}
            style={
              compactView ? {
                padding: '0.6rem',
                minHeight: 'auto'
              } : {}
            }
          >
            <RouteHeader>
              <div>
                <RouteCode selected={selectedRoute === route.code}>
                  {route.code}
                </RouteCode>
                <RouteName selected={selectedRoute === route.code}>
                  {route.name}
                </RouteName>
              </div>
              <DifficultyBadge difficulty={route.difficulty}>
                {route.difficulty === 'beginner' && '👶 Начальный'}
                {route.difficulty === 'intermediate' && '🎯 Средний'}
                {route.difficulty === 'advanced' && '🚀 Продвинутый'}
              </DifficultyBadge>
            </RouteHeader>

            {!compactView && (
              <>
                <RouteDescription selected={selectedRoute === route.code}>
                  {route.description}
                </RouteDescription>
                
                <RouteInfo selected={selectedRoute === route.code}>
                  <DistanceInfo>
                    <span>📏</span>
                    <span>{route.totalDistance} км</span>
                    <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', opacity: 0.7 }}>
                      {route.legs.length - 2} ППМ
                    </span>
                  </DistanceInfo>
                  
                  <TimeInfo selected={selectedRoute === route.code}>
                    <span>⏱</span>
                    <span>{calculateFlightTime(route.totalDistance, currentAirspeed)}</span>
                  </TimeInfo>
                </RouteInfo>
              </>
            )}

            {compactView && (
              <RouteInfo selected={selectedRoute === route.code}>
                <DistanceInfo>
                  <span>📏 {route.totalDistance} км</span>
                </DistanceInfo>
                <TimeInfo selected={selectedRoute === route.code}>
                  <span>⏱ {calculateFlightTime(route.totalDistance, currentAirspeed)}</span>
                </TimeInfo>
              </RouteInfo>
            )}
          </RouteCard>
        ))}
      </RoutesGrid>

      {/* Мобильная статистика */}
      <MobileRouteStats>
        <StatItem>
          <div className="stat-value">{routeStats.total}</div>
          <div className="stat-label">Всего</div>
        </StatItem>
        <StatItem>
          <div className="stat-value" style={{ color: '#64ffda' }}>{routeStats.beginner}</div>
          <div className="stat-label">Начальные</div>
        </StatItem>
        <StatItem>
          <div className="stat-value" style={{ color: '#ffd700' }}>{routeStats.intermediate}</div>
          <div className="stat-label">Средние</div>
        </StatItem>
        <StatItem>
          <div className="stat-value" style={{ color: '#ff6b6b' }}>{routeStats.advanced}</div>
          <div className="stat-label">Сложные</div>
        </StatItem>
      </MobileRouteStats>

      <div style={{ 
        textAlign: 'center', 
        fontSize: '0.9rem', 
        color: '#8892b0',
        borderTop: '1px solid rgba(100, 255, 218, 0.1)',
        paddingTop: '1rem',
        marginTop: '1rem'
      }}>
        <div style={{ marginBottom: '0.5rem' }}>
          Выберите маршрут для автоматической загрузки параметров
        </div>
        <div style={{ 
          fontSize: '0.8rem', 
          opacity: 0.7,
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ color: '#64ffda' }}>●</span> Начальный
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ color: '#ffd700' }}>●</span> Средний
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ color: '#ff6b6b' }}>●</span> Продвинутый
          </span>
        </div>
      </div>
    </PanelContainer>
  );
};