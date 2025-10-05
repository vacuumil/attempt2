import React from 'react';
import { 
  TableContainer, 
  Table, 
  TableHeader, 
  TableRow, 
  TableCell,
  Input,
  AddButton,
  RemoveButton,
  SummaryRow,
  ControlPanel
} from './FlightPlanTable.styles';
import type { RouteLeg, CalculatedLeg } from './types';
import { calculateRoute } from './routeCalculator';

interface FlightPlanTableProps {
  legs: RouteLeg[];
  onLegsChange: (legs: RouteLeg[]) => void;
  trueAirspeed: number;
  windDirection: number;
  windSpeed: number;
}

export const FlightPlanTable: React.FC<FlightPlanTableProps> = ({
  legs,
  onLegsChange,
  trueAirspeed,
  windDirection,
  windSpeed
}) => {
  const calculatedLegs: CalculatedLeg[] = calculateRoute(legs, trueAirspeed, windDirection, windSpeed);

  const handleLegChange = (index: number, field: keyof RouteLeg, value: string | number) => {
    const newLegs = [...legs];
    newLegs[index] = { ...newLegs[index], [field]: value };
    onLegsChange(newLegs);
  };

  const addLeg = () => {
    // Находим индекс посадки (последний элемент)
    const landingIndex = legs.length - 1;
    
    // Создаем новый ППМ
    const newLeg: RouteLeg = {
      id: Date.now().toString(),
      name: `ППМ${legs.length - 1}`, // -1 потому что не считаем Взлет и Посадку
      magneticCourse: 0,
      distance: 0
    };
    
    // Вставляем новый ППМ перед посадкой
    const newLegs = [...legs];
    newLegs.splice(landingIndex, 0, newLeg);
    
    // Обновляем названия всех ППМ
    const updatedLegs = newLegs.map((leg, index) => {
      if (index === 0) return { ...leg, name: 'Взлет' }; // Первый - всегда Взлет
      if (index === newLegs.length - 1) return { ...leg, name: 'Посадка' }; // Последний - всегда Посадка
      return { ...leg, name: `ППМ${index}` }; // Остальные - ППМ1, ППМ2...
    });
    
    onLegsChange(updatedLegs);
  };

  const removeLeg = (index: number) => {
    // Нельзя удалить Взлет и Посадку, только ППМ между ними
    if (index > 0 && index < legs.length - 1) {
      const newLegs = legs.filter((_, i) => i !== index);
      
      // Обновляем названия оставшихся ППМ
      const updatedLegs = newLegs.map((leg, i) => {
        if (i === 0) return { ...leg, name: 'Взлет' };
        if (i === newLegs.length - 1) return { ...leg, name: 'Посадка' };
        return { ...leg, name: `ППМ${i}` };
      });
      
      onLegsChange(updatedLegs);
    }
  };

  const totalDistance = calculatedLegs.reduce((sum, leg) => sum + leg.distance, 0);
  const totalTime = calculatedLegs.reduce((sum, leg) => sum + leg.legTime, 0);

  // Определяем цвет для названия пункта
  const getPointColor = (index: number) => {
    if (index === 0) return '#64ffda'; // Взлет - бирюзовый
    if (index === legs.length - 1) return '#ff6b6b'; // Посадка - красный
    return '#e6f1ff'; // ППМ - белый
  };

  // Определяем можно ли удалить пункт
  const canRemovePoint = (index: number) => {
    return index > 0 && index < legs.length - 1; // Можно удалять только ППМ
  };

  return (
    <TableContainer>
      <ControlPanel>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label>Количество ППМ: {Math.max(0, legs.length - 2)}</label>
          </div>
          <AddButton onClick={addLeg}>+ Добавить ППМ</AddButton>
        </div>
      </ControlPanel>

      <Table>
        <thead>
          <TableRow>
            <TableHeader>Маршрут</TableHeader>
            <TableHeader>МПУ</TableHeader>
            <TableHeader>УС</TableHeader>
            <TableHeader>МК</TableHeader>
            <TableHeader>V</TableHeader>
            <TableHeader>W</TableHeader>
            <TableHeader>S</TableHeader>
            <TableHeader>t</TableHeader>
            <TableHeader>Действия</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {legs.map((leg, index) => (
            <TableRow key={leg.id}>
              <TableCell>
                <span style={{ 
                  fontWeight: 'bold', 
                  color: getPointColor(index) 
                }}>
                  {leg.name}
                </span>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  min="0"
                  max="360"
                  value={leg.magneticCourse}
                  onChange={(e) => handleLegChange(index, 'magneticCourse', Number(e.target.value))}
                  style={{ width: '60px' }}
                />°
              </TableCell>
              <TableCell style={{ 
                color: calculatedLegs[index]?.driftAngle > 0 ? '#ff6b6b' : '#64ffda',
                fontWeight: 'bold'
              }}>
                {calculatedLegs[index]?.driftAngle > 0 ? '+' : ''}{calculatedLegs[index]?.driftAngle.toFixed(0)}°
              </TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>
                {calculatedLegs[index]?.magneticHeading.toFixed(0)}°
              </TableCell>
              <TableCell>{trueAirspeed}</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>
                {calculatedLegs[index]?.groundSpeed.toFixed(0)}
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  min="0"
                  value={leg.distance}
                  onChange={(e) => handleLegChange(index, 'distance', Number(e.target.value))}
                  style={{ width: '60px' }}
                /> км
              </TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>
                {calculatedLegs[index]?.legTime.toFixed(0)} мин
              </TableCell>
              <TableCell>
                {canRemovePoint(index) && (
                  <RemoveButton onClick={() => removeLeg(index)}>
                    ✕
                  </RemoveButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
        <tfoot>
          <SummaryRow>
            <TableCell colSpan={6} style={{ textAlign: 'right', fontWeight: 'bold' }}>
              Итого по маршруту:
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>
              {totalDistance.toFixed(0)} км
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>
              {totalTime.toFixed(0)} мин
            </TableCell>
            <TableCell></TableCell>
          </SummaryRow>
        </tfoot>
      </Table>

      {/* Информация о ветре */}
      <div style={{ 
        marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(100, 255, 218, 0.05)',
        borderRadius: '6px',
        border: '1px solid rgba(100, 255, 218, 0.2)',
        textAlign: 'center',
        color: '#8892b0',
        fontSize: '0.9rem'
      }}>
        <strong>🌬️ Параметры ветра для всего маршрута:</strong> 
        Направление: {windDirection}° (метеорологический - откуда дует), Скорость: {windSpeed} км/ч
        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
          <strong>💡 Структура маршрута:</strong> 
          <span style={{ color: '#64ffda' }}> Взлет</span> → 
          <span style={{ color: '#e6f1ff' }}> ППМ</span> → 
          <span style={{ color: '#ff6b6b' }}> Посадка</span>
        </div>
      </div>
    </TableContainer>
  );
};