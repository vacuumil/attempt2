// components/navigation/flight-plan/FlightPlanPage.tsx
// [ОБНОВЛЕННАЯ ВЕРСИЯ]
import React, { useState } from 'react';
import { Container } from './FlightPlanPage.styles';
import { FlightPlanTable } from './FlightPlanTable';
import { RouteVisualization } from './visualization/RouteVisualization';
import { TrainingRoutesPanel } from './TrainingRoutesPanel';
import { RouteBuilder } from './route-builder/RouteBuilder';
import { RouteBuilderProvider } from './route-builder/contexts';
import type { RouteLeg } from './types';
import { trainingRoutes } from './trainingRoutes';

export const FlightPlanPage: React.FC = () => {
  const [legs, setLegs] = useState<RouteLeg[]>([
    {
      id: '1',
      name: 'Взлет',
      magneticCourse: 0,
      distance: 0
    },
    {
      id: '2', 
      name: 'ППМ1',
      magneticCourse: 0,
      distance: 0
    },
    {
      id: '3',
      name: 'Посадка',
      magneticCourse: 0,
      distance: 0
    }
  ]);

  const [trueAirspeed, setTrueAirspeed] = useState(200);
  const [windDirection, setWindDirection] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [takeoffTime, setTakeoffTime] = useState('08:00');
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [showRouteBuilder, setShowRouteBuilder] = useState(false);

  // Загрузка маршрута из конструктора
  const handleRouteCreated = (newLegs: RouteLeg[]) => {
    setLegs(newLegs);
    setShowRouteBuilder(false);
    setSelectedRoute(''); // Сбрасываем выбранный учебный маршрут
  };

  // Загрузка учебного маршрута
  const loadTrainingRoute = (routeCode: string) => {
    const route = trainingRoutes.find(r => r.code === routeCode);
    if (route) {
      setLegs(route.legs);
      setSelectedRoute(routeCode);
      setShowRouteBuilder(false); // Закрываем конструктор если открыт
    }
  };

  // Ограничение воздушной скорости (0-900 км/ч)
  const handleAirspeedChange = (value: number) => {
    const maxAirspeed = 900;
    if (value > maxAirspeed) {
      setTrueAirspeed(maxAirspeed);
    } else if (value < 0) {
      setTrueAirspeed(0);
    } else {
      setTrueAirspeed(value);
    }
  };

  // Ограничение направления ветра (0-359°)
  const handleWindDirectionChange = (value: number) => {
    let correctedValue = value;
    if (correctedValue < 0) correctedValue = 0;
    if (correctedValue > 359) correctedValue = 359;
    if (isNaN(correctedValue)) correctedValue = 0;
    setWindDirection(correctedValue);
  };

  // Ограничение скорости ветра (0+ км/ч)
  const handleWindSpeedChange = (value: number) => {
    setWindSpeed(Math.max(0, value));
  };

  return (
    <Container>
      <h2>🧭 Расчет РПП (Штурманский Бортовой Журнал)</h2>
      <p>Полный расчет параметров полета для маршрута с несколькими участками</p>

      {/* Кнопка открытия конструктора */}
      {!showRouteBuilder && (
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '2rem' 
        }}>
          <button
            onClick={() => setShowRouteBuilder(true)}
            style={{
              padding: '1.2rem 2.5rem',
              background: 'linear-gradient(135deg, #1a6fc4 0%, #64ffda 100%)',
              color: '#0a192f',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 4px 15px rgba(100, 255, 218, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(100, 255, 218, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(100, 255, 218, 0.3)';
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>🗺️</span>
            Открыть конструктор маршрутов
          </button>
          
          <div style={{ 
            marginTop: '1rem', 
            color: '#8892b0',
            fontSize: '0.9rem'
          }}>
            Создайте собственный маршрут с помощью визуального конструктора
          </div>
        </div>
      )}

      {/* Конструктор маршрутов */}
      {showRouteBuilder ? (
        <RouteBuilderProvider>
          <RouteBuilder 
            onRouteCreated={handleRouteCreated}
            onClose={() => setShowRouteBuilder(false)}
          />
        </RouteBuilderProvider>
      ) : (
        /* Основной интерфейс РПП */
        <>
          {/* Панель учебных маршрутов */}
          <TrainingRoutesPanel 
            onRouteSelect={loadTrainingRoute}
            selectedRoute={selectedRoute}
            currentAirspeed={trueAirspeed}
          />

          {/* Панель общих параметров */}
          <div style={{ 
            background: 'rgba(26, 111, 196, 0.1)',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            border: '1px solid rgba(26, 111, 196, 0.3)'
          }}>
            <h3 style={{ color: '#64ffda', marginBottom: '1rem', textAlign: 'center' }}>
              Общие параметры маршрута
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e6f1ff' }}>
                  Воздушная скорость V (км/ч):
                </label>
                <input
                  type="number"
                  value={trueAirspeed}
                  onChange={(e) => handleAirspeedChange(Number(e.target.value))}
                  onBlur={(e) => handleAirspeedChange(Number(e.target.value))}
                  min="0"
                  max="900"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(10, 25, 47, 0.6)',
                    border: '1px solid #1a6fc4',
                    borderRadius: '6px',
                    color: '#e6f1ff',
                    fontSize: '1rem'
                  }}
                />
                <div style={{ fontSize: '0.8rem', color: '#8892b0', marginTop: '0.25rem' }}>
                  Макс: 900 км/ч • Время в маршрутах обновится автоматически
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e6f1ff' }}>
                  Направление ветра (градусы):
                </label>
                <input
                  type="number"
                  min="0"
                  max="359"
                  value={windDirection}
                  onChange={(e) => handleWindDirectionChange(Number(e.target.value))}
                  onBlur={(e) => handleWindDirectionChange(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(10, 25, 47, 0.6)',
                    border: '1px solid #1a6fc4',
                    borderRadius: '6px',
                    color: '#e6f1ff',
                    fontSize: '1rem'
                  }}
                />
                <div style={{ fontSize: '0.8rem', color: '#8892b0', marginTop: '0.25rem' }}>
                  Диапазон: 0-359°
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e6f1ff' }}>
                  Скорость ветра (км/ч):
                </label>
                <input
                  type="number"
                  min="0"
                  value={windSpeed}
                  onChange={(e) => handleWindSpeedChange(Number(e.target.value))}
                  onBlur={(e) => handleWindSpeedChange(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(10, 25, 47, 0.6)',
                    border: '1px solid #1a6fc4',
                    borderRadius: '6px',
                    color: '#e6f1ff',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e6f1ff' }}>
                  Время взлета:
                </label>
                <input
                  type="time"
                  value={takeoffTime}
                  onChange={(e) => setTakeoffTime(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(10, 25, 47, 0.6)',
                    border: '1px solid #1a6fc4',
                    borderRadius: '6px',
                    color: '#e6f1ff',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Таблица РПП */}
          <FlightPlanTable
            legs={legs}
            onLegsChange={setLegs}
            trueAirspeed={trueAirspeed}
            windDirection={windDirection}
            windSpeed={windSpeed}
            takeoffTime={takeoffTime}
          />

          {/* Визуализация маршрута */}
          <RouteVisualization
            legs={legs.map((leg) => ({
              name: leg.name,
              magneticHeading: leg.magneticCourse,
              distance: leg.distance,
              driftAngle: 0,
              groundSpeed: trueAirspeed,
              legTime: leg.distance > 0 ? (leg.distance / trueAirspeed) * 60 : 0
            }))}
            windDirection={windDirection}
            windSpeed={windSpeed}
          />

          <div style={{ 
            marginTop: '2rem',
            padding: '1rem',
            background: 'rgba(100, 255, 218, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(100, 255, 218, 0.3)',
            fontSize: '0.9rem',
            color: '#8892b0'
          }}>
            <strong>💡 Как использовать:</strong>
            <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
              <li>Выберите учебный маршрут или создайте свой с помощью конструктора</li>
              <li>Установите воздушную скорость V (макс. 900 км/ч)</li>
              <li>Задайте направление ветра (0-359°) и скорость ветра</li>
              <li>Укажите время взлета для расчета фактического времени пролета ППМ</li>
              <li>Система автоматически рассчитает УС, МК, W и время</li>
              <li>Маршрут: <strong>Взлет → ППМ1 → ППМ2 → ... → Посадка</strong></li>
              <li><span style={{ color: '#ff6b6b' }}>УС+</span> - правый снос, <span style={{ color: '#64ffda' }}>УС-</span> - левый снос</li>
            </ul>
          </div>
        </>
      )}
    </Container>
  );
};