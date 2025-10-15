import type { RouteLeg } from './types';

export interface TrainingRoute {
  id: string;
  name: string;
  code: string;
  description: string;
  totalDistance: number;
  legs: RouteLeg[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const trainingRoutes: TrainingRoute[] = [
  {
    id: 'route-a4',
    name: 'Маршрут А4',
    code: 'А4',
    description: 'Интересный маршрут для испытанных навигаторов',
    totalDistance: 173,
    difficulty: 'advanced',
    legs: [
      { id: '1', name: 'Взлет', magneticCourse: 19, distance: 0 },
      { id: '2', name: 'Степное Анненково', magneticCourse: 285, distance: 27 },
      { id: '3', name: 'Астрадамовка', magneticCourse: 278, distance: 49 },
      { id: '4', name: 'Кивать', magneticCourse: 197, distance: 14 },
      { id: '5', name: 'Языково', magneticCourse: 112, distance: 28 },
      { id: '6', name: 'Уржумское', magneticCourse: 78, distance: 29 },
      { id: '7', name: 'Кротовка', magneticCourse: 73, distance: 20 },
      { id: '8', name: 'Посадка', magneticCourse: 104, distance: 6 }
    ]
  },
  {
    id: 'route-a5',
    name: 'Маршрут А5',
    code: 'А5',
    description: 'Самый длительный маршрут, чтобы подольше полетать и долететь до других регионов',
    totalDistance: 222,
    difficulty: 'advanced',
    legs: [
      { id: '1', name: 'Взлет', magneticCourse: 19, distance: 3 },
      { id: '2', name: 'Крестниково', magneticCourse: 325, distance: 28 },
      { id: '3', name: 'Астрадамовка', magneticCourse: 261, distance: 60 },
      { id: '4', name: 'Сурское', magneticCourse: 243, distance: 28 },
      { id: '5', name: 'Языково', magneticCourse: 103, distance: 48 },
      { id: '6', name: 'Уржумское', magneticCourse: 78, distance: 29 },
      { id: '7', name: 'Кротовка', magneticCourse: 73, distance: 20 },
      { id: '8', name: 'Посадка', magneticCourse: 104, distance: 6 }
    ]
  },
  {
    id: 'route-a6',
    name: 'Маршрут А6',
    code: 'А6',
    description: 'Это так называемая base',
    totalDistance: 64,
    difficulty: 'beginner',
    legs: [
      { id: '1', name: 'Взлет', magneticCourse: 19, distance: 0 },
      { id: '2', name: 'Степное Анненково', magneticCourse: 285, distance: 27 },
      { id: '3', name: 'Уржумское', magneticCourse: 172, distance: 11 },
      { id: '4', name: 'Кротовка', magneticCourse: 73, distance: 20 },
      { id: '5', name: 'Посадка', magneticCourse: 104, distance: 6 }
    ]
  },
  {
    id: 'route-a7',
    name: 'Маршрут А7',
    code: 'А7',
    description: 'Обучающий недолгий маршрут',
    totalDistance: 87,
    difficulty: 'intermediate',
    legs: [
      { id: '1', name: 'Взлет', magneticCourse: 19, distance: 3 },
      { id: '2', name: 'Крестниково', magneticCourse: 325, distance: 28 },
      { id: '3', name: 'Степное Анненково', magneticCourse: 213, distance: 19 },
      { id: '4', name: 'Уржумское', magneticCourse: 172, distance: 11 },
      { id: '5', name: 'Кротовка', magneticCourse: 73, distance: 20 },
      { id: '6', name: 'Посадка', magneticCourse: 104, distance: 6 }
    ]
  },
  {
    id: 'route-a8',
    name: 'Маршрут А8',
    code: 'А8',
    description: 'Продвинутый маршрут с интересным докладом Новых Тимерсян',
    totalDistance: 160,
    difficulty: 'intermediate',
    legs: [
      { id: '1', name: 'Взлет', magneticCourse: 19, distance: 3 },
      { id: '2', name: 'Крестниково', magneticCourse: 325, distance: 28 },
      { id: '3', name: 'Ундоры', magneticCourse: 48, distance: 23 },
      { id: '4', name: 'Цильна', magneticCourse: 246, distance: 16 },
      { id: '5', name: 'Новые Тимерсяны', magneticCourse: 242, distance: 19 },
      { id: '6', name: 'Тагай', magneticCourse: 196, distance: 30 },
      { id: '7', name: 'Уржумское', magneticCourse: 86, distance: 15 },
      { id: '8', name: 'Кротовка', magneticCourse: 73, distance: 20 },
      { id: '9', name: 'Посадка', magneticCourse: 104, distance: 6 }
    ]
  },
  {
    id: 'route-t2',
    name: 'Маршрут Т2',
    code: 'Т2',
    description: 'Брутальный маршрут для ташлинских волков',
    totalDistance: 143,
    difficulty: 'advanced',
    legs: [
      { id: '1', name: 'Взлет', magneticCourse: 312, distance: 3 },
      { id: '2', name: 'Солдатская Ташла', magneticCourse: 247, distance: 7 },
      { id: '3', name: 'Стоговка', magneticCourse: 243, distance: 13 },
      { id: '4', name: 'Майна', magneticCourse: 289, distance: 30 },
      { id: '5', name: 'Смышляевка', magneticCourse: 157, distance: 41 },
      { id: '6', name: 'Зеленец', magneticCourse: 52, distance: 21 },
      { id: '7', name: 'Суровка', magneticCourse: 30, distance: 10 },
      { id: '8', name: 'Посадка', magneticCourse: 31, distance: 18 }
    ]
  },
  {
    id: 'route-t8',
    name: 'Маршрут Т8',
    code: 'Т8',
    description: 'Маршрут для настоящих романтиков вдоль Волги',
    totalDistance: 151,
    difficulty: 'advanced',
    legs: [
      { id: '1', name: 'Взлет', magneticCourse: 312, distance: 3 },
      { id: '2', name: 'Солдатская Ташла', magneticCourse: 247, distance: 7 },
      { id: '3', name: 'Елшанка', magneticCourse: 310, distance: 10 },
      { id: '4', name: 'Криуши', magneticCourse: 73, distance: 28 },
      { id: '5', name: 'Шиловка', magneticCourse: 114, distance: 9 },
      { id: '6', name: 'Елаур', magneticCourse: 145, distance: 26 },
      { id: '7', name: 'Федькино', magneticCourse: 247, distance: 31 },
      { id: '8', name: 'Суровка', magneticCourse: 300, distance: 19 },
      { id: '9', name: 'Посадка', magneticCourse: 31, distance: 18 }
    ]
  },
  {
    id: 'route-m1',
    name: 'Маршрут M1',
    code: 'М1',
    description: 'Побег из тюрьмы',
    totalDistance: 32,
    difficulty: 'beginner',
    legs: [
      { id: '1', name: 'Взлет', magneticCourse: 312, distance: 4 },
      { id: '2', name: 'з.о. Больших Ключищ', magneticCourse: 163, distance: 11 },
      { id: '3', name: 'Солдатская Ташла', magneticCourse: 139, distance: 14 },
      { id: '4', name: 'Посадка', magneticCourse: 132, distance: 3 }
    ]
  },
  {
    id: 'route-m2',
    name: 'Маршрут M2',
    code: 'М2',
    description: 'Побег из тюрьмы 2.0',
    totalDistance: 46,
    difficulty: 'beginner',
    legs: [
      { id: '1', name: 'Взлет', magneticCourse: 312, distance: 4 },
      { id: '2', name: 'Охотничья', magneticCourse: 221, distance: 8 },
      { id: '3', name: 'Елшанка', magneticCourse: 159, distance: 15 },
      { id: '4', name: 'н.п. Солдатская Ташла', magneticCourse: 130, distance: 11 },
      { id: '5', name: 'Посадка', magneticCourse: 107, distance: 8 }
    ]
  },
  {
    id: 'route-m5',
    name: 'Маршрут M5',
    code: 'М5',
    description: 'Домой',
    totalDistance: 75,
    difficulty: 'intermediate',
    legs: [
      { id: '1', name: 'Взлет', magneticCourse: 312, distance: 4 },
      { id: '2', name: 'н.п. Солдатская Ташла', magneticCourse: 219, distance: 6 },
      { id: '3', name: 'Стоговка', magneticCourse: 243, distance: 13 },
      { id: '4', name: 'Выры', magneticCourse: 325, distance: 24 },
      { id: '5', name: 'Волостниковка', magneticCourse: 31, distance: 10 },
      { id: '6', name: 'Кротовка', magneticCourse: 45, distance: 13 },
      { id: '7', name: 'Посадка', magneticCourse: 61, distance: 5 }
    ]
  }
];

export const getRouteByCode = (code: string): TrainingRoute | undefined => {
  return trainingRoutes.find(route => route.code === code);
};

export const getRoutesByDifficulty = (difficulty: TrainingRoute['difficulty']): TrainingRoute[] => {
  return trainingRoutes.filter(route => route.difficulty === difficulty);
};