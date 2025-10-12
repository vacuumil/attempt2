// components/navigation/flight-plan/route-builder/RouteBuilder.tsx
import React, { useState } from 'react';
import {
  BuilderContainer,
  BuilderHeader,
  BuilderContent,
  MapSection,
  ControlsSection,
  LoadingOverlay,
  SuccessMessage,
  TutorialSteps,
  MobileWarning,
  BuilderFooter,
  FeatureHighlight
} from './RouteBuilder.styles';
import { RouteMap } from './RouteMap';
import { WaypointList } from './WaypointList';
import { RouteControls } from './RouteControls';
import { RouteCalculator } from './RouteCalculator';
import { generateRouteFromWaypoints } from './utils/calculations';
import type { Waypoint, RouteLeg } from '../types';

interface RouteBuilderProps {
  onRouteCreated: (legs: RouteLeg[]) => void;
  onClose: () => void;
}

export const RouteBuilder: React.FC<RouteBuilderProps> = ({ onRouteCreated, onClose }) => {
  const [selectedWaypoints, setSelectedWaypoints] = useState<Waypoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [calculatedRoute, setCalculatedRoute] = useState<RouteLeg[]>([]);

  const handleWaypointSelect = (waypoint: Waypoint) => {
    console.log('Информация о ППМ:', waypoint);
  };

  const handleWaypointAdd = (waypoint: Waypoint) => {
    if (selectedWaypoints.find(wp => wp.id === waypoint.id)) {
      return;
    }
    const newWaypoints = [...selectedWaypoints, waypoint];
    setSelectedWaypoints(newWaypoints);
    
    // Автоматически рассчитываем маршрут при добавлении точек
    if (newWaypoints.length >= 2) {
      const legs = generateRouteFromWaypoints(newWaypoints);
      setCalculatedRoute(legs);
    }
  };

  const handleWaypointRemove = (waypointId: string) => {
    const newWaypoints = selectedWaypoints.filter(wp => wp.id !== waypointId);
    setSelectedWaypoints(newWaypoints);
    
    // Пересчитываем маршрут
    if (newWaypoints.length >= 2) {
      const legs = generateRouteFromWaypoints(newWaypoints);
      setCalculatedRoute(legs);
    } else {
      setCalculatedRoute([]);
    }
  };

  const handleWaypointReorder = (newWaypoints: Waypoint[]) => {
    setSelectedWaypoints(newWaypoints);
    
    // Пересчитываем маршрут
    if (newWaypoints.length >= 2) {
      const legs = generateRouteFromWaypoints(newWaypoints);
      setCalculatedRoute(legs);
    }
  };

  const handleClearRoute = () => {
    setSelectedWaypoints([]);
    setCalculatedRoute([]);
  };

  const handleRouteCreate = async () => {
    if (selectedWaypoints.length < 2) {
      alert('Для создания маршрута необходимо как минимум 2 точки');
      return;
    }

    setIsLoading(true);
    
    // Генерация маршрута с рассчитанными параметрами
    const legs = generateRouteFromWaypoints(selectedWaypoints);

    // Имитация загрузки
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setShowSuccess(true);
    
    // Передача маршрута через 2 секунды
    setTimeout(() => {
      onRouteCreated(legs);
    }, 2000);
  };

  if (isLoading) {
    return (
      <LoadingOverlay>
        <div className="spinner"></div>
        <p>Создание маршрута...</p>
        <p style={{ fontSize: '0.9rem', color: '#8892b0', marginTop: '0.5rem' }}>
          Расчет параметров полета и построение маршрута
        </p>
      </LoadingOverlay>
    );
  }

  return (
    <BuilderContainer>
      <BuilderHeader>
        <h2>🗺️ Конструктор маршрутов</h2>
        <p>
          Постройте оптимальный маршрут полета с автоматическим расчетом расстояний и курсов
        </p>
      </BuilderHeader>

      {showSuccess && (
        <SuccessMessage>
          <h3>✅ Маршрут успешно создан!</h3>
          <p>Переход к расчету параметров полета в РПП...</p>
        </SuccessMessage>
      )}

      <MobileWarning>
        <strong>📱 Рекомендация для мобильных устройств</strong>
        Для лучшего опыта используйте горизонтальную ориентацию экрана
      </MobileWarning>

      <BuilderContent>
        {/* Основная карта */}
        <MapSection>
          <FeatureHighlight>
            <div className="icon">🎯</div>
            <div className="content">
              <strong>Интерактивная карта маршрута</strong>
              <p>Все поворотные пункты расположены относительно VOR/DME BMK. Кликайте для информации, двойной клик для добавления в маршрут</p>
            </div>
          </FeatureHighlight>
          
          <RouteMap
            selectedWaypoints={selectedWaypoints}
            onWaypointSelect={handleWaypointSelect}
            onWaypointAdd={handleWaypointAdd}
          />
        </MapSection>

        {/* Панель управления и база данных ППМ */}
        <ControlsSection>
          <TutorialSteps>
            <h4>🚀 Как построить маршрут</h4>
            <ol style={{ 
              margin: 0, 
              paddingLeft: '1.5rem', 
              color: '#8892b0',
              lineHeight: '1.5'
            }}>
              <li style={{ marginBottom: '0.75rem' }}>
                <strong style={{ color: '#e6f1ff' }}>Выберите ППМ</strong> из списка или кликните на карте
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <strong style={{ color: '#e6f1ff' }}>Добавьте точки</strong> двойным кликом или кнопкой "Добавить"
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <strong style={{ color: '#e6f1ff' }}>Упорядочите маршрут</strong> с помощью кнопок управления
              </li>
              <li>
                <strong style={{ color: '#e6f1ff' }}>Создайте маршрут</strong> когда все точки добавлены
              </li>
            </ol>
          </TutorialSteps>

          {/* База данных ППМ */}
          <WaypointList
            selectedWaypoints={selectedWaypoints}
            onWaypointSelect={handleWaypointSelect}
            onWaypointAdd={handleWaypointAdd}
            onWaypointRemove={handleWaypointRemove}
          />

          {/* Управление маршрутом */}
          <RouteControls
            selectedWaypoints={selectedWaypoints}
            onRouteCreate={handleRouteCreate}
            onClearRoute={handleClearRoute}
            onClose={onClose}
            onWaypointReorder={handleWaypointReorder}
          />

          {/* Расчет РПП - отдельный блок внизу */}
          {calculatedRoute.length > 0 && (
            <RouteCalculator
              routeLegs={calculatedRoute}
              selectedWaypoints={selectedWaypoints}
            />
          )}
        </ControlsSection>
      </BuilderContent>

      <BuilderFooter>
        <p>
          <strong>💡 Профессиональные советы:</strong> Выбирайте ППМ с учетом рельефа местности, зон ограничений и навигационных возможностей
        </p>
        <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>
          Все ППМ указаны относительно VOR/DME BMK (Ульяновск-Баратаевка). Расчеты производятся с учетом магнитного склонения.
        </p>
      </BuilderFooter>
    </BuilderContainer>
  );
};