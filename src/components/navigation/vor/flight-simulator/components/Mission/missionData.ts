// src/components/flight-simulator/components/Mission/missionData.ts
import type { Mission } from './types';

export const MISSIONS: Mission[] = [
  {
    id: 'mission-1',
    title: 'Основы VOR навигации',
    description: 'Изучите базовые принципы работы с VOR станциями.',
    difficulty: 'easy',
    initialPosition: { x: 600, y: 600 },
    initialHeading: 0,
    objectives: [
      {
        id: 'obj-1-1',
        type: 'intercept',
        description: 'Настройтесь на VOR-TRC (112.50) и установите радиал 090°',
        stationId: 'trc',
        radial: 90,
        toFrom: 'FROM',
        tolerance: 5,
        completed: false
      },
      {
        id: 'obj-1-2',
        type: 'intercept',
        description: 'Перехватите радиал 180° от VOR-TRC',
        stationId: 'trc',
        radial: 180,
        toFrom: 'FROM',
        tolerance: 5,
        completed: false
      }
    ]
  },
  {
    id: 'mission-2',
    title: 'Пересечение радиалов',
    description: 'Найдите точку пересечения двух радиалов от разных станций.',
    difficulty: 'medium',
    initialPosition: { x: 800, y: 400 },
    initialHeading: 45,
    wind: {
      direction: 45,
      speed: 1.5,
      enabled: true
    },
    objectives: [
      {
        id: 'obj-2-1',
        type: 'intercept',
        description: 'Перехватите радиал 215° от VOR-DME (114.70)',
        stationId: 'dme',
        radial: 215,
        toFrom: 'FROM',
        tolerance: 6,
        completed: false
      },
      {
        id: 'obj-2-2',
        type: 'intercept',
        description: 'Перехватите радиал 120° от VOR-TRC (112.50)',
        stationId: 'trc',
        radial: 120,
        toFrom: 'FROM',
        tolerance: 6,
        completed: false
      },
      {
        id: 'obj-2-3',
        type: 'reach',
        description: 'Достигните точки пересечения радиалов (примерно 900,600)',
        position: { x: 900, y: 600 },
        tolerance: 30,
        completed: false
      }
    ]
  },
  {
    id: 'mission-3',
    title: 'Маршрутный полет',
    description: 'Выполните полет по заданному маршруту между станциями.',
    difficulty: 'hard',
    initialPosition: { x: 400, y: 400 },
    initialHeading: 90,
    wind: {
      direction: 180,
      speed: 2.0,
      enabled: true
    },
    objectives: [
      {
        id: 'obj-3-1',
        type: 'follow',
        description: 'Следуйте по радиалу 090° от VOR-TRC в течение 10 секунд',
        stationId: 'trc',
        radial: 90,
        toFrom: 'FROM',
        tolerance: 5,
        duration: 10000,
        completed: false
      },
      {
        id: 'obj-3-2',
        type: 'intercept',
        description: 'Перехватите радиал 315° от VOR-DME и летите К станции',
        stationId: 'dme',
        radial: 315,
        toFrom: 'TO',
        tolerance: 5,
        completed: false
      },
      {
        id: 'obj-3-3',
        type: 'reach',
        description: 'Достигните зоны вокруг VOR-DME (дистанция < 50 ед.)',
        stationId: 'dme',
        position: { x: 1200, y: 800 },
        tolerance: 50,
        completed: false
      }
    ]
  },
  {
    id: 'mission-4',
    title: 'Заход на посадку (ILS/LOC)',
    description: 'Выполните точный заход на посадку по курсовому радиомаяку.',
    difficulty: 'hard',
    initialPosition: { x: 600, y: 200 }, // Старт с севера
    initialHeading: 180, // Направление на юг
    wind: {
      direction: 70,
      speed: 1.8,
      enabled: true
    },
    objectives: [
      {
        id: 'obj-4-1',
        type: 'intercept',
        description: 'Перехватите курс 270° к VOR-TRC (ось ВПП 27)',
        stationId: 'trc',
        radial: 270,
        toFrom: 'TO',
        tolerance: 1,
        completed: false
      },
      {
        id: 'obj-4-2',
        type: 'follow',
        description: 'Удерживайте курс 270° с высокой точностью в течение 20 секунд',
        stationId: 'trc',
        radial: 270,
        toFrom: 'TO',
        tolerance: 1,
        duration: 20000,
        completed: false
      },
      {
        id: 'obj-4-3',
        type: 'reach',
        description: 'Достигните точки касания полосы (примерно 1300, 400)',
        position: { x: 1300, y: 400 }, // Новая точка посадки
        tolerance: 15,
        completed: false
      }
    ]
  }
];