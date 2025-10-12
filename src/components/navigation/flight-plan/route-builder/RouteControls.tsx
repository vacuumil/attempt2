// components/navigation/flight-plan/route-builder/RouteControls.tsx
import React from 'react';
import {
  ControlsContainer,
  ControlsHeader,
  ButtonGroup,
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  RouteStats,
  StatsGrid,
  StatItem,
  QuickActions,
  QuickActionButton,
  WarningMessage,
  ControlGroup,
  RouteVisualization
} from './RouteControls.styles';
import { calculateRouteLegs, calculateTotalDistance, generateRouteFromWaypoints } from './utils/calculations';
import { formatDistance } from './utils/helpers';
import type { Waypoint, RouteLeg } from '../types';

interface RouteControlsProps {
  selectedWaypoints: Waypoint[];
  onRouteCreate: (legs: RouteLeg[]) => void;
  onClearRoute: () => void;
  onClose: () => void;
  onWaypointReorder?: (waypoints: Waypoint[]) => void;
}

export const RouteControls: React.FC<RouteControlsProps> = ({
  selectedWaypoints,
  onRouteCreate,
  onClearRoute,
  onClose,
  onWaypointReorder
}) => {
  const routeLegs = calculateRouteLegs(selectedWaypoints);
  const totalDistance = calculateTotalDistance(selectedWaypoints);
  const totalTime = routeLegs.reduce((sum, leg) => sum + leg.time, 0);

  const canCreateRoute = selectedWaypoints.length >= 2;

  const handleRouteCreate = () => {
    if (!canCreateRoute) return;
    
    // Генерация маршрута с рассчитанными параметрами
    const legs = generateRouteFromWaypoints(selectedWaypoints);
    onRouteCreate(legs);
  };

  const handleMoveWaypoint = (index: number, direction: 'up' | 'down') => {
    if (!onWaypointReorder) return;
    
    const newWaypoints = [...selectedWaypoints];
    if (direction === 'up' && index > 0) {
      [newWaypoints[index - 1], newWaypoints[index]] = [newWaypoints[index], newWaypoints[index - 1]];
    } else if (direction === 'down' && index < newWaypoints.length - 1) {
      [newWaypoints[index], newWaypoints[index + 1]] = [newWaypoints[index + 1], newWaypoints[index]];
    }
    onWaypointReorder(newWaypoints);
  };

  const handleRemoveWaypoint = (index: number) => {
    if (!onWaypointReorder) return;
    const newWaypoints = selectedWaypoints.filter((_, i) => i !== index);
    onWaypointReorder(newWaypoints);
  };

  // Вспомогательная функция для форматирования bearing
  const formatBearing = (bearing: number): string => {
    return `${bearing.toFixed(0)}°`;
  };

  return (
    <ControlsContainer>
      <ControlsHeader>⚙️ Управление маршрутом</ControlsHeader>

      {/* Статистика маршрута */}
      <RouteStats>
        <StatsGrid>
          <StatItem>
            <span className="value">{selectedWaypoints.length}</span>
            <span className="label">Точек</span>
          </StatItem>
          <StatItem>
            <span className="value">{selectedWaypoints.length - 1}</span>
            <span className="label">Участков</span>
          </StatItem>
          <StatItem>
            <span className="value">{formatDistance(totalDistance)}</span>
            <span className="label">Расстояние</span>
          </StatItem>
          <StatItem>
            <span className="value">{Math.round(totalTime)}</span>
            <span className="label">Минут</span>
          </StatItem>
        </StatsGrid>
      </RouteStats>

      {/* Визуализация маршрута */}
      {selectedWaypoints.length > 1 && (
        <RouteVisualization>
          <div className="route-path">
            {selectedWaypoints.map((waypoint, index) => (
              <div key={waypoint.id} className="route-point">
                <div className="point-number">{index + 1}</div>
                <div className="point-info">
                  <div className="point-name">{waypoint.name}</div>
                  <div className="point-code">{waypoint.code}</div>
                </div>
                {index < selectedWaypoints.length - 1 && (
                  <div className="route-leg">
                    <div className="leg-distance">{routeLegs[index]?.distance} км</div>
                    <div className="leg-arrow">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </RouteVisualization>
      )}

      {/* Управление порядком точек */}
      {selectedWaypoints.length > 0 && (
        <ControlGroup>
          <label style={{ color: '#64ffda', fontWeight: 'bold', marginBottom: '0.75rem' }}>
            🎯 Управление точками маршрута:
          </label>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '0.5rem',
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            {selectedWaypoints.map((waypoint, index) => (
              <div key={waypoint.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                background: 'rgba(17, 34, 64, 0.6)',
                borderRadius: '8px',
                border: '1px solid rgba(100, 255, 218, 0.2)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%)',
                  color: '#0a192f',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  {index + 1}
                </div>
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ 
                    color: '#e6f1ff', 
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {waypoint.name}
                  </div>
                  <div style={{ 
                    color: '#8892b0', 
                    fontSize: '0.8rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {waypoint.code} • {formatBearing(waypoint.coordinates.bearing)} / {formatDistance(waypoint.coordinates.distance)}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.3rem', flexShrink: 0 }}>
                  <QuickActionButton
                    onClick={() => handleMoveWaypoint(index, 'up')}
                    disabled={index === 0}
                    style={{ 
                      padding: '0.3rem 0.5rem',
                      fontSize: '0.8rem',
                      opacity: index === 0 ? 0.3 : 1
                    }}
                    title="Переместить вверх"
                  >
                    ↑
                  </QuickActionButton>
                  <QuickActionButton
                    onClick={() => handleMoveWaypoint(index, 'down')}
                    disabled={index === selectedWaypoints.length - 1}
                    style={{ 
                      padding: '0.3rem 0.5rem',
                      fontSize: '0.8rem',
                      opacity: index === selectedWaypoints.length - 1 ? 0.3 : 1
                    }}
                    title="Переместить вниз"
                  >
                    ↓
                  </QuickActionButton>
                  <QuickActionButton
                    onClick={() => handleRemoveWaypoint(index)}
                    style={{ 
                      padding: '0.3rem 0.5rem',
                      fontSize: '0.8rem',
                      background: 'rgba(255, 107, 107, 0.1)',
                      borderColor: '#ff6b6b',
                      color: '#ff6b6b'
                    }}
                    title="Удалить из маршрута"
                  >
                    ✕
                  </QuickActionButton>
                </div>
              </div>
            ))}
          </div>
        </ControlGroup>
      )}

      {/* Быстрые действия */}
      <QuickActions>
        <QuickActionButton 
          onClick={onClearRoute}
          disabled={selectedWaypoints.length === 0}
        >
          🗑️ Очистить маршрут
        </QuickActionButton>
      </QuickActions>

      {/* Основные кнопки управления */}
      <ButtonGroup>
        <SecondaryButton onClick={onClose}>
          ← Назад к РПП
        </SecondaryButton>
        
        <DangerButton 
          onClick={onClearRoute}
          disabled={selectedWaypoints.length === 0}
        >
          Очистить
        </DangerButton>

        <PrimaryButton 
          onClick={handleRouteCreate}
          disabled={!canCreateRoute}
          title={!canCreateRoute ? 'Добавьте как минимум 2 точки для создания маршрута' : 'Создать маршрут с рассчитанными параметрами'}
        >
          🚀 Создать маршрут
        </PrimaryButton>
      </ButtonGroup>

      {/* Информационные сообщения */}
      {selectedWaypoints.length === 0 && (
        <WarningMessage>
          <strong>🗺️ Маршрут пуст</strong>
          Выберите поворотные пункты из списка для построения маршрута
        </WarningMessage>
      )}

      {selectedWaypoints.length === 1 && (
        <WarningMessage>
          <strong>➕ Добавьте еще точки</strong>
          Для создания маршрута необходимо как минимум 2 точки
        </WarningMessage>
      )}

      {selectedWaypoints.length >= 2 && (
        <div style={{ 
          marginTop: '1rem',
          padding: '1rem',
          background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, rgba(26, 111, 196, 0.1) 100%)',
          border: '1px solid rgba(100, 255, 218, 0.3)',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ color: '#64ffda', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            🎯 Маршрут готов к созданию!
          </div>
          <div style={{ color: '#e6f1ff', fontSize: '0.9rem' }}>
            {selectedWaypoints.length} точек • {formatDistance(totalDistance)} • ~{Math.round(totalTime)} минут
          </div>
          <div style={{ 
            color: '#8892b0', 
            fontSize: '0.8rem', 
            marginTop: '0.5rem',
            fontStyle: 'italic'
          }}>
            Все параметры будут автоматически рассчитаны в РПП
          </div>
        </div>
      )}
    </ControlsContainer>
  );
};