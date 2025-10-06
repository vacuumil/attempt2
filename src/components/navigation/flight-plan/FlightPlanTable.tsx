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
  ControlPanel,
  MobileWarning
} from './FlightPlanTable.styles';
import type { RouteLeg, CalculatedLeg } from './types';
import { calculateRoute } from './routeCalculator';

interface FlightPlanTableProps {
  legs: RouteLeg[];
  onLegsChange: (legs: RouteLeg[]) => void;
  trueAirspeed: number;
  windDirection: number;
  windSpeed: number;
  takeoffTime?: string;
}

export const FlightPlanTable: React.FC<FlightPlanTableProps> = ({
  legs,
  onLegsChange,
  trueAirspeed,
  windDirection,
  windSpeed,
  takeoffTime = '08:00'
}) => {
  const calculatedLegs: CalculatedLeg[] = calculateRoute(legs, trueAirspeed, windDirection, windSpeed);

  // Расчет времени пролета ППМ
  const calculatePassTimes = (): string[] => {
    if (!takeoffTime || calculatedLegs.length === 0) return [];

    const [startHours, startMinutes] = takeoffTime.split(':').map(Number);
    let totalMinutes = startHours * 60 + startMinutes;
    const passTimes: string[] = ['-']; // Взлет

    for (let i = 1; i < calculatedLegs.length; i++) {
      totalMinutes += calculatedLegs[i].legTime;
      const hours = Math.floor(totalMinutes / 60) % 24;
      const minutes = totalMinutes % 60;
      passTimes.push(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
    }

    return passTimes;
  };

  const passTimes = calculatePassTimes();

  // Обработчик изменения МПУ с ограничением 0-359
  const handleMagneticCourseChange = (index: number, value: number) => {
    let correctedValue = value;
    
    // Ограничиваем значение от 0 до 359
    if (correctedValue < 0) correctedValue = 0;
    if (correctedValue > 359) correctedValue = 359;
    
    // Если значение NaN, устанавливаем 0
    if (isNaN(correctedValue)) correctedValue = 0;
    
    const newLegs = [...legs];
    newLegs[index] = { ...newLegs[index], magneticCourse: correctedValue };
    onLegsChange(newLegs);
  };

  const handleDistanceChange = (index: number, value: number) => {
    const newLegs = [...legs];
    newLegs[index] = { ...newLegs[index], distance: Math.max(0, value) };
    onLegsChange(newLegs);
  };

  const addLeg = () => {
    const landingIndex = legs.length - 1;
    const newLeg: RouteLeg = {
      id: Date.now().toString(),
      name: `ППМ${legs.length - 1}`,
      magneticCourse: 0,
      distance: 0
    };
    
    const newLegs = [...legs];
    newLegs.splice(landingIndex, 0, newLeg);
    
    const updatedLegs = newLegs.map((leg, index) => {
      if (index === 0) return { ...leg, name: 'Взлет' };
      if (index === newLegs.length - 1) return { ...leg, name: 'Посадка' };
      return { ...leg, name: `ППМ${index}` };
    });
    
    onLegsChange(updatedLegs);
  };

  const removeLeg = (index: number) => {
    if (index > 0 && index < legs.length - 1) {
      const newLegs = legs.filter((_, i) => i !== index);
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

  const getPointColor = (index: number) => {
    if (index === 0) return '#64ffda';
    if (index === legs.length - 1) return '#ff6b6b';
    return '#e6f1ff';
  };

  const canRemovePoint = (index: number) => {
    return index > 0 && index < legs.length - 1;
  };

  return (
    <TableContainer>
      <MobileWarning>
        <strong>ℹ️ Для удобства просмотра на мобильных устройствах</strong>
        Используйте горизонтальную прокрутку таблицы
      </MobileWarning>

      <ControlPanel>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label>Количество ППМ: {Math.max(0, legs.length - 2)}</label>
          </div>
          <AddButton onClick={addLeg}>+ Добавить ППМ</AddButton>
          <div style={{ fontSize: '0.9rem', color: '#8892b0' }}>
            Время взлета: <strong>{takeoffTime}</strong>
          </div>
        </div>
      </ControlPanel>

      <Table>
        <thead>
          <TableRow>
            <TableHeader>Маршрут</TableHeader>
            <TableHeader>ЗМПУ</TableHeader>
            <TableHeader>УС</TableHeader>
            <TableHeader>МКр</TableHeader>
            <TableHeader>V</TableHeader>
            <TableHeader>W</TableHeader>
            <TableHeader>S</TableHeader>
            <TableHeader>t</TableHeader>
            <TableHeader>Время пролета</TableHeader>
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
                  max="359"
                  value={leg.magneticCourse}
                  onChange={(e) => handleMagneticCourseChange(index, Number(e.target.value))}
                  onBlur={(e) => {
                    let value = Number(e.target.value);
                    if (value < 0) value = 0;
                    if (value > 359) value = 359;
                    if (isNaN(value)) value = 0;
                    handleMagneticCourseChange(index, value);
                  }}
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
                  onChange={(e) => handleDistanceChange(index, Number(e.target.value))}
                  onBlur={(e) => {
                    let value = Number(e.target.value);
                    if (value < 0) value = 0;
                    if (isNaN(value)) value = 0;
                    handleDistanceChange(index, value);
                  }}
                /> км
              </TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>
                {calculatedLegs[index]?.legTime.toFixed(0)} мин
              </TableCell>
              <TableCell style={{ 
                fontWeight: 'bold',
                color: index === 0 ? '#64ffda' : index === legs.length - 1 ? '#ff6b6b' : '#e6f1ff'
              }}>
                {passTimes[index] || '-'}
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
        border: '1px solid rgba(100, 255, 218, 0.1)',
        fontSize: '0.9rem',
        color: '#8892b0',
        textAlign: 'center'
      }}>
        <strong>Метеоусловия:</strong> Ветер {windDirection}° / {windSpeed} км/ч
      </div>
    </TableContainer>
  );
};