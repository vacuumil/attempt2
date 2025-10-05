import React, { useState } from 'react';
import { Container } from './FlightPlanPage.styles';
import { FlightPlanTable } from './FlightPlanTable';
import { RouteVisualization } from './visualization';
import type { RouteLeg } from './types';

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

  const [trueAirspeed, setTrueAirspeed] = useState(250);
  const [windDirection, setWindDirection] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);

  return (
    <Container>
      <h2>🧭 Расчет РПП (Штурманский Бортовой Журнал)</h2>
      <p>Полный расчет параметров полета для маршрута с несколькими участками</p>

      {/* Панель общих параметров */}
      <div style={{ 
        background: 'rgba(26, 111, 196, 0.1)',
        padding: '1.5rem',
        borderRadius: '8px',
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
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e6f1ff' }}>
              Воздушная скорость V (км/ч):
            </label>
            <input
              type="number"
              value={trueAirspeed}
              onChange={(e) => setTrueAirspeed(Number(e.target.value))}
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
              Направление ветра (градусы):
            </label>
            <input
              type="number"
              min="0"
              max="360"
              value={windDirection}
              onChange={(e) => setWindDirection(Number(e.target.value))}
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
              Скорость ветра (км/ч):
            </label>
            <input
              type="number"
              min="0"
              value={windSpeed}
              onChange={(e) => setWindSpeed(Number(e.target.value))}
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

      <FlightPlanTable
        legs={legs}
        onLegsChange={setLegs}
        trueAirspeed={trueAirspeed}
        windDirection={windDirection}
        windSpeed={windSpeed}
      />

      {/* Добавляем визуализацию с временными данными */}
      <RouteVisualization
        legs={legs.map((leg) => ({
          name: leg.name,
          magneticHeading: leg.magneticCourse,
          distance: leg.distance,
          driftAngle: 0, // Временно
          groundSpeed: trueAirspeed, // Временно
          legTime: leg.distance > 0 ? (leg.distance / trueAirspeed) * 60 : 0 // Временно
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
          <li>Установите воздушную скорость V для всего маршрута</li>
          <li>Задайте направление и скорость ветра (метеорологический ветер - откуда дует)</li>
          <li>Для каждого участка укажите МПУ и расстояние</li>
          <li>Система автоматически рассчитает УС, МК, W и время</li>
          <li>Маршрут: <strong>Взлет → ППМ1 → ППМ2 → ... → Посадка</strong></li>
          <li><span style={{ color: '#ff6b6b' }}>УС+</span> - правый снос, <span style={{ color: '#64ffda' }}>УС-</span> - левый снос</li>
        </ul>
      </div>
    </Container>
  );
};