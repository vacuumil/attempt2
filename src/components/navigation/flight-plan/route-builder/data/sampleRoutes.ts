// components/navigation/flight-plan/route-builder/data/sampleRoutes.ts
import { waypoints } from './waypoints';

// Примеры готовых маршрутов для быстрой загрузки
export const sampleRoutes = {
  'ULSK-TAS-CIRCUIT': {
    name: 'Ульяновск-Баратаевка → Солдатская Ташла',
    description: 'Тренировочный полет по кругу',
    waypoints: [
      waypoints.find(wp => wp.code === 'ULSK')!,
      waypoints.find(wp => wp.code === 'TAS')!,
      waypoints.find(wp => wp.code === 'ULSK')!
    ]
  },
  'ULSK-STEP-AST': {
    name: 'Ульяновск → Степное → Астрадамовка',
    description: 'Базовый маршрут с двумя ППМ',
    waypoints: [
      waypoints.find(wp => wp.code === 'ULSK')!,
      waypoints.find(wp => wp.code === 'STEP')!,
      waypoints.find(wp => wp.code === 'AST')!,
      waypoints.find(wp => wp.code === 'ULSK')!
    ]
  },
  'VOR-NAVIGATION': {
    name: 'Навигация по VOR',
    description: 'Отработка работы с VOR/DME',
    waypoints: [
      waypoints.find(wp => wp.code === 'ULSK')!,
      waypoints.find(wp => wp.code === 'BMK')!,
      waypoints.find(wp => wp.code === 'ULV')!,
      waypoints.find(wp => wp.code === 'ULSK')!
    ]
  }
};