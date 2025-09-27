import type { SpeedTriangleState } from '../types/types';

export const meteoToNavDirection = (meteoDirection: number): number => {
  return (meteoDirection + 180) % 360;
};

export const navToMeteoDirection = (navDirection: number): number => {
  return (navDirection + 180) % 360;
};

export interface WindPreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  values: Partial<SpeedTriangleState> | ((trueCourse: number) => Partial<SpeedTriangleState>);
  visualDescription: string;
}

export const windPresets: WindPreset[] = [
  {
    id: 'calm',
    name: 'Штиль',
    description: 'Идеальные условия без ветра',
    icon: '🌤️',
    values: { windSpeed: 0, windDirection: 0 },
    visualDescription: 'Ветра нет'
  },
  {
    id: 'headwind',
    name: 'Встречный',
    description: 'Ветер дует прямо навстречу курсу',
    icon: '↓',
    values: (trueCourse: number) => getWindPresetForCourse(trueCourse, 'headwind'),
    visualDescription: 'Ветер дует прямо навстречу курсу'
  },
  {
    id: 'tailwind',
    name: 'Попутный',
    description: 'Ветер дует прямо сзади по курсу',
    icon: '↑',
    values: (trueCourse: number) => getWindPresetForCourse(trueCourse, 'tailwind'),
    visualDescription: 'Ветер дует прямо сзади по курсу'
  },
  {
    id: 'crosswind-right',
    name: 'Боковой слева',
    description: 'Ветер дует с правого борта',
    icon: '→', // Ветер ДУЕТ С ПРАВА - стрелка слева направо
    values: (trueCourse: number) => getWindPresetForCourse(trueCourse, 'crosswind-right'),
    visualDescription: 'Ветер дует с правого борта'
  },
  {
    id: 'crosswind-left',
    name: 'Боковой справа',
    description: 'Ветер дует с левого борта',
    icon: '←', // Ветер ДУЕТ СЛЕВА - стрелка справа налево
    values: (trueCourse: number) => getWindPresetForCourse(trueCourse, 'crosswind-left'),
    visualDescription: 'Ветер дует с левого борта'
  },
  {
    id: 'headwind-right',
    name: 'Встречный справа',
    description: 'Ветер дует спереди-справа',
    icon: '↘',
    values: (trueCourse: number) => getWindPresetForCourse(trueCourse, 'headwind-right'),
    visualDescription: 'Ветер дует спереди-справа'
  },
  {
    id: 'headwind-left',
    name: 'Встречный слева',
    description: 'Ветер дует спереди-слева',
    icon: '↙',
    values: (trueCourse: number) => getWindPresetForCourse(trueCourse, 'headwind-left'),
    visualDescription: 'Ветер дует спереди-слева'
  },
  {
    id: 'tailwind-right',
    name: 'Попутный справа',
    description: 'Ветер дует сзади-справа',
    icon: '↗',
    values: (trueCourse: number) => getWindPresetForCourse(trueCourse, 'tailwind-right'),
    visualDescription: 'Ветер дует сзади-справа'
  },
  {
    id: 'tailwind-left',
    name: 'Попутный слева',
    description: 'Ветер дует сзади-слева',
    icon: '↖',
    values: (trueCourse: number) => getWindPresetForCourse(trueCourse, 'tailwind-left'),
    visualDescription: 'Ветер дует сзади-слева'
  }
];

// Вспомогательная функция для понимания влияния ветра (исправленная)
export const getWindEffectDescription = (
  windDirection: number, // Теперь ожидает навигационное направление
  trueCourse: number
): string => {
  const windAngle = ((windDirection - trueCourse + 360) % 360);
  
  if (windAngle >= 337.5 || windAngle < 22.5) return 'Попутный';
  if (windAngle >= 22.5 && windAngle < 67.5) return 'Попутный слева';
  if (windAngle >= 67.5 && windAngle < 112.5) return 'Боковой слева';
  if (windAngle >= 112.5 && windAngle < 157.5) return 'Встречный слева';
  if (windAngle >= 157.5 && windAngle < 202.5) return 'Встречный';
  if (windAngle >= 202.5 && windAngle < 247.5) return 'Встречный справа';
  if (windAngle >= 247.5 && windAngle < 292.5) return 'Боковой справа'; 
  if (windAngle >= 292.5 && windAngle < 337.5) return 'Попутный справа';
  
  return 'Неопределенный';
};

// Функция для получения пресета относительно текущего курса
export const getWindPresetForCourse = (
  trueCourse: number,
  presetType: 'headwind' | 'tailwind' | 'crosswind-right' | 'crosswind-left' | 
             'headwind-right' | 'headwind-left' | 'tailwind-right' | 'tailwind-left'
): Partial<SpeedTriangleState> => {
  const baseDirections = {
  headwind: 0,        // Встречный - дует с носа (0°)
  tailwind: 180,      // Попутный - дует с хвоста (180°)
  'crosswind-right': 270,   // Боковой справа - дует с правого борта (270°)
  'crosswind-left': 90,     // Боковой слева - дует с левого борта (90°)
  'headwind-right': 315,    // Встречный-справа
  'headwind-left': 45,      // Встречный-слева
  'tailwind-right': 225,    // Попутный-справа
  'tailwind-left': 135      // Попутный-слева
};

  const baseDirection = baseDirections[presetType];
  const windDirection = (baseDirection + trueCourse) % 360;
  
  return {
    windSpeed: presetType.includes('headwind') ? 30 : 25,
    windDirection: windDirection
  };
};

// Новая функция для точного определения типа ветра по углу (исправленная)
export const getWindTypeFromAngle = (windAngle: number): string => {
  if (windAngle >= 337.5 || windAngle < 22.5) return 'tailwind';
  if (windAngle >= 22.5 && windAngle < 67.5) return 'tailwind-right';
  if (windAngle >= 67.5 && windAngle < 112.5) return 'crosswind-right';
  if (windAngle >= 112.5 && windAngle < 157.5) return 'headwind-right';
  if (windAngle >= 157.5 && windAngle < 202.5) return 'headwind';
  if (windAngle >= 202.5 && windAngle < 247.5) return 'headwind-left';
  if (windAngle >= 247.5 && windAngle < 292.5) return 'crosswind-left';
  if (windAngle >= 292.5 && windAngle < 337.5) return 'tailwind-left';
  return 'unknown';
};