export interface Position {
  x: number;
  y: number;
}

// Вычисление пеленга (радиала) от станции к самолету (север = 0° вверх)
export const calculateBearing = (station: Position, aircraft: Position): number => {
  const dx = aircraft.x - station.x;
  const dy = station.y - aircraft.y; // Y инвертирован, север вверху
  
  // Вычисляем угол в радианах, где север = 0°
  let angle = Math.atan2(dx, dy) * (180 / Math.PI);
  
  // Преобразуем в диапазон 0-360°
  angle = (angle + 360) % 360;
  
  return Math.round(angle);
};

// Вычисление отклонения CDI (правильная формула)
export const calculateCDIDeflection = (selectedCourse: number, actualRadial: number): number => {
  // Разница между выбранным курсом и фактическим радиалом
  let diff = actualRadial - selectedCourse;
  
  // Нормализуем разницу в диапазон -180° до 180°
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  
  // Ограничиваем отклонение от -1 до 1
  // Каждые 10° отклонения = 1 единица CDI
  return Math.max(-1, Math.min(1, diff / 10));
};

// Определение индикатора TO/FROM (исправленная логика)
export const getToFromIndicator = (selectedCourse: number, actualRadial: number): 'TO' | 'FROM' | 'OFF' => {
  // Вычисляем разницу между курсами
  let diff = Math.abs(actualRadial - selectedCourse);
  
  // Нормализуем разницу
  if (diff > 180) diff = 360 - diff;
  
  // TO: разница меньше 90°, FROM: разница больше 90°
  return diff <= 90 ? 'TO' : 'FROM';
};

// Расчет расстояния между точками
export const calculateDistance = (point1: Position, point2: Position): number => {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Проверка качества сигнала на основе расстояния
export const calculateSignalStrength = (distance: number, maxDistance: number = 300): number => {
  return Math.max(0, 1 - distance / maxDistance);
};

// Тестовые функции для проверки вычислений
export const testCalculations = () => {
  console.log('=== Testing VOR Calculations ===');
  
  // Тест 1: Расчет пеленга
  const station = { x: 0, y: 0 };
  const testCases = [
    { aircraft: { x: 0, y: -100 }, expected: 0 },   // Север
    { aircraft: { x: 100, y: 0 }, expected: 90 },   // Восток
    { aircraft: { x: 0, y: 100 }, expected: 180 },  // Юг
    { aircraft: { x: -100, y: 0 }, expected: 270 }  // Запад
  ];

  testCases.forEach((test, index) => {
    const result = calculateBearing(station, test.aircraft);
    console.log(`Test ${index + 1}: Expected ${test.expected}°, Got ${result}°`);
  });

  // Тест 2: CDI отклонение
  console.log('CDI Test: Course 360°, Radial 010° =', calculateCDIDeflection(360, 10)); // Должно быть -1
  console.log('CDI Test: Course 360°, Radial 350° =', calculateCDIDeflection(360, 350)); // Должно быть +1

  // Тест 3: TO/FROM
  console.log('TO/FROM Test: Course 360°, Radial 010° =', getToFromIndicator(360, 10)); // Должно быть TO
  console.log('TO/FROM Test: Course 360°, Radial 180° =', getToFromIndicator(360, 180)); // Должно быть FROM
};

// Можно вызвать в консоли для тестирования