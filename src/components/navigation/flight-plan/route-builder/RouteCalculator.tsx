// components/navigation/flight-plan/route-builder/RouteCalculator.tsx
import React from 'react';
import {
  CalculatorContainer,
  CalculatorHeader,
  CalculatorTable,
  TableHeader,
  TableRow,
  TableCell,
  SummaryRow,
  SectionTitle,
  ParametersGrid,
  ParameterItem
} from './RouteCalculator.styles';
import type { Waypoint, RouteLeg } from '../types';
import { calculateRouteLegs, calculateTotalDistance } from './utils/calculations';
import { formatDistance } from './utils/helpers';

interface RouteCalculatorProps {
  routeLegs: RouteLeg[];
  selectedWaypoints: Waypoint[];
}

export const RouteCalculator: React.FC<RouteCalculatorProps> = ({
  selectedWaypoints
}) => {
  const routeLegsInfo = calculateRouteLegs(selectedWaypoints);
  const totalDistance = calculateTotalDistance(selectedWaypoints);
  const totalTime = routeLegsInfo.reduce((sum, leg) => sum + leg.time, 0);

  // Расчет общего времени полета
  const calculateTotalFlightTime = () => {
    const totalMinutes = totalTime;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    
    if (hours > 0) {
      return `${hours}ч ${minutes}м`;
    } else {
      return `${minutes}м`;
    }
  };

  // Расчет среднего магнитного курса
  const calculateAverageCourse = () => {
    if (routeLegsInfo.length === 0) return 0;
    const sum = routeLegsInfo.reduce((total, leg) => total + leg.course, 0);
    return Math.round(sum / routeLegsInfo.length);
  };

  return (
    <CalculatorContainer>
      <SectionTitle>🧮 Расчет РПП (Штурманский Бортовой Журнал)</SectionTitle>
      
      {/* Основные параметры маршрута */}
      <ParametersGrid>
        <ParameterItem>
          <div className="label">Общее расстояние</div>
          <div className="value">{formatDistance(totalDistance)}</div>
        </ParameterItem>
        <ParameterItem>
          <div className="label">Время полета (250 км/ч)</div>
          <div className="value">{calculateTotalFlightTime()}</div>
        </ParameterItem>
        <ParameterItem>
          <div className="label">Количество участков</div>
          <div className="value">{selectedWaypoints.length - 1}</div>
        </ParameterItem>
        <ParameterItem>
          <div className="label">Средний ЗМПУ</div>
          <div className="value">{calculateAverageCourse()}°</div>
        </ParameterItem>
      </ParametersGrid>

      {/* Детальная таблица РПП */}
      <CalculatorHeader>📋 Детальный расчет участков маршрута</CalculatorHeader>
      
      <CalculatorTable>
        <thead>
          <TableRow>
            <TableHeader>Участок</TableHeader>
            <TableHeader>От → До</TableHeader>
            <TableHeader>ЗМПУ</TableHeader>
            <TableHeader>Расстояние</TableHeader>
            <TableHeader>Время</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {routeLegsInfo.map((leg, index) => (
            <TableRow key={index}>
              <TableCell style={{ fontWeight: 'bold', color: '#64ffda' }}>
                Уч. {index + 1}
              </TableCell>
              <TableCell>
                <div style={{ fontSize: '0.9rem' }}>
                  <strong>{selectedWaypoints[index]?.name}</strong>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#8892b0' }}>
                  → {selectedWaypoints[index + 1]?.name}
                </div>
              </TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>
                {leg.course}°
              </TableCell>
              <TableCell>
                {leg.distance} км
              </TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>
                {Math.round(leg.time)} мин
              </TableCell>
            </TableRow>
          ))}
        </tbody>
        <tfoot>
          <SummaryRow>
            <TableCell colSpan={3} style={{ textAlign: 'right', fontWeight: 'bold' }}>
              Итого по маршруту:
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>
              {formatDistance(totalDistance)}
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>
              {calculateTotalFlightTime()}
            </TableCell>
          </SummaryRow>
        </tfoot>
      </CalculatorTable>

      {/* Дополнительная информация */}
      <div style={{ 
        marginTop: '1.5rem',
        padding: '1rem',
        background: 'rgba(100, 255, 218, 0.05)',
        border: '1px solid rgba(100, 255, 218, 0.2)',
        borderRadius: '8px'
      }}>
        <h4 style={{ color: '#64ffda', marginBottom: '0.75rem' }}>💡 Рекомендации по полету</h4>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#8892b0'
        }}>
          <div>
            <strong style={{ color: '#e6f1ff' }}>Контроль времени:</strong>
            <ul style={{ margin: '0.5rem 0', paddingLeft: '1.2rem' }}>
              <li>Проверяйте время пролета каждого ППМ</li>
              <li>Имейте запас топлива +30%</li>
              <li>Учитывайте возможные изменения ветра</li>
            </ul>
          </div>
          <div>
            <strong style={{ color: '#e6f1ff' }}>Навигация:</strong>
            <ul style={{ margin: '0.5rem 0', paddingLeft: '1.2rem' }}>
              <li>Используйте VOR/DME для контроля</li>
              <li>Визуально идентифицируйте ППМ</li>
              <li>Имейте запасные варианты маршрута</li>
            </ul>
          </div>
        </div>
      </div>
    </CalculatorContainer>
  );
};