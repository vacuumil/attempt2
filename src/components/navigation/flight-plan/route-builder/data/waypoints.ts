// components/navigation/flight-plan/route-builder/data/waypoints.ts
export interface Waypoint {
  id: string;
  name: string;
  code: string;
  type: 'airport' | 'vor' | 'fix' | 'user';
  coordinates: {
    bearing: number;    // Радиал от BMK (0-359°)
    distance: number;   // Расстояние от BMK в км
  };
  frequency?: string;
  elevation?: number;
  region: string;
  description?: string;
}

export interface Airport extends Waypoint {
  type: 'airport';
  runways: Runway[];
  facilities: string[];
}

export interface Runway {
  designation: string;
  length: number;
  heading: number;
  surface: string;
}

// База данных поворотных пунктов относительно BMK (Ульяновск)
export const waypoints: Waypoint[] = [
  // Аэродромы
  {
    id: 'ulsk',
    name: 'Ульяновск-Баратаевка',
    code: 'ULSK',
    type: 'airport',
    coordinates: { bearing: 0, distance: 0 },
    frequency: '120.35',
    elevation: 463,
    region: 'Ульяновская область',
    description: 'Основной аэродром базирования'
  },
  {
    id: 'tashla',
    name: 'Солдатская Ташла',
    code: 'TAS',
    type: 'airport',
    coordinates: { bearing: 155, distance: 29 },
    frequency: '131.10',
    elevation: 245,
    region: 'Ульяновская область',
    description: 'Запасной аэродром'
  },

  {
    id: 'bmk',
    name: 'Баратаевка VOR',
    code: 'BMK',
    type: 'vor',
    coordinates: { bearing: 0, distance: 0 },
    frequency: '113.70',
    elevation: 463,
    region: 'Ульяновская область',
    description: 'VOR/DME маяк'
  },

  {
    id: 'stepnoe',
    name: 'Степное Анненково',
    code: 'STEP',
    type: 'fix',
    coordinates: { bearing: 289, distance: 28 },
    region: 'Ульяновская область',
    description: 'Поворотный пункт маршрута А4'
  },
  {
    id: 'z.o.bolwshih',
    name: 'з.о. Больших Ключищ',
    code: 'BOL',
    type: 'fix',
    coordinates: { bearing: 176, distance: 14 },
    region: 'Ульяновская область'
  },
  {
    id: 'astradamovka',
    name: 'Астрадамовка',
    code: 'AST',
    type: 'fix',
    coordinates: { bearing: 282, distance: 76 },
    region: 'Ульяновская область'
  },
  {
    id: 'kivat',
    name: 'Кивать',
    code: 'KIV',
    type: 'fix',
    coordinates: { bearing: 272, distance: 79 },
    region: 'Ульяновская область'
  },
  {
    id: 'yazikovo',
    name: 'Языково',
    code: 'YAZ',
    type: 'fix',
    coordinates: { bearing: 260, distance: 54 },
    region: 'Ульяновская область'
  },
  {
    id: 'urzhumskoe',
    name: 'Уржумское',
    code: 'URZ',
    type: 'fix',
    coordinates: { bearing: 264, distance: 26 },
    region: 'Ульяновская область'
  },
  {
    id: 'krotovka',
    name: 'Кротовка',
    code: 'KRO',
    type: 'fix',
    coordinates: { bearing: 285, distance: 6 },
    region: 'Ульяновская область'
  },

  {
    id: 'krestnikovo',
    name: 'Крестниково',
    code: 'KRES',
    type: 'fix',
    coordinates: { bearing: 328, distance: 29 },
    region: 'Ульяновская область'
  },
  {
    id: 'surskoe',
    name: 'Сурское',
    code: 'SUR',
    type: 'fix',
    coordinates: { bearing: 272, distance: 101 },
    region: 'Ульяновская область'
  },

  {
    id: 'stogovka',
    name: 'Стоговка',
    code: 'STOG',
    type: 'fix',
    coordinates: { bearing: 191, distance: 35 },
    region: 'Ульяновская область'
  },
  {
    id: 'maina',
    name: 'Майна',
    code: 'MAI',
    type: 'fix',
    coordinates: { bearing: 233, distance: 43 },
    region: 'Ульяновская область'
  },
  {
    id: 'smishlyaevka',
    name: 'Смышляевка',
    code: 'SMIS',
    type: 'fix',
    coordinates: { bearing: 196, distance: 66 },
    region: 'Ульяновская область'
  },
  {
    id: 'zelenec',
    name: 'Зеленец',
    code: 'ZEL',
    type: 'fix',
    coordinates: { bearing: 183, distance: 56 },
    region: 'Ульяновская область'
  },
  {
    id: 'surovka',
    name: 'Суровка',
    code: 'SURO',
    type: 'fix',
    coordinates: { bearing: 176, distance: 42 },
    region: 'Ульяновская область'
  },

  {
    id: 'undory',
    name: 'Ундоры',
    code: 'UND',
    type: 'fix',
    coordinates: { bearing: 2, distance: 38 },
    region: 'Ульяновская область'
  },
  {
    id: 'tsilna',
    name: 'Цильна',
    code: 'TSIL',
    type: 'fix',
    coordinates: { bearing: 337, distance: 35 },
    region: 'Ульяновская область'
  },
  {
    id: 'novie-timersyani',
    name: 'Новые Тимерсяны',
    code: 'NTIM',
    type: 'fix',
    coordinates: { bearing: 307, distance: 38 },
    region: 'Ульяновская область'
  },
  {
    id: 'tagay',
    name: 'Тагай',
    code: 'TAG',
    type: 'fix',
    coordinates: { bearing: 253, distance: 40 },
    region: 'Ульяновская область'
  },
  {
    id: 'elshan',
    name: 'Елшанка',
    code: 'ELSH',
    type: 'fix',
    coordinates: { bearing: 187, distance: 22 },
    region: 'Ульяновская область'
  },
  {
    id: 'kriushi',
    name: 'Криуши',
    code: 'KRIU',
    type: 'fix',
    coordinates: { bearing: 121, distance: 28 },
    region: 'Ульяновская область'
  },
  {
    id: 'shilovka',
    name: 'Шиловка',
    code: 'SHIL',
    type: 'fix',
    coordinates: { bearing: 119, distance: 37 },
    region: 'Ульяновская область'
  },
  {
    id: 'elaur',
    name: 'Елаур',
    code: 'ELA',
    type: 'fix',
    coordinates: { bearing: 129, distance: 61 },
    region: 'Ульяновская область'
  },
  {
    id: 'fedkino',
    name: 'Федькино',
    code: 'FED',
    type: 'fix',
    coordinates: { bearing: 159, distance: 55 },
    region: 'Ульяновская область'
  },
  {
    id: 'ohotnicha',
    name: 'Охотничья',
    code: 'OHO',
    type: 'fix',
    coordinates: { bearing: 226, distance: 12 },
    region: 'Ульяновская область'
  },
  {
    id: 'soldatskaya',
    name: 'н.п. Солдатская Ташла',
    code: 'SOL',
    type: 'fix',
    coordinates: { bearing: 170, distance: 30 },
    region: 'Ульяновская область'
  },
  {
    id: 'elshanka',
    name: 'Елшанка',
    code: 'ELS',
    type: 'fix',
    coordinates: { bearing: 188, distance: 22 },
    region: 'Ульяновская область'
  },
  {
    id: 'vyry',
    name: 'Выры',
    code: 'VYR',
    type: 'fix',
    coordinates: { bearing: 234, distance: 25 },
    region: 'Ульяновская область'
  },
  {
    id: 'lomy',
    name: 'Ломы',
    code: 'LOM',
    type: 'fix',
    coordinates: { bearing: 148, distance: 21 },
    region: 'Ульяновская область'
  },
  {
    id: 'volostnikovka',
    name: 'Волостниковка',
    code: 'VOL',
    type: 'fix',
    coordinates: { bearing: 247, distance: 16 },
    region: 'Ульяновская область'
  },
  {
    id: 'krotovka_2',
    name: 'Кротовка',
    code: 'KROT',
    type: 'fix',
    coordinates: { bearing: 285, distance: 6 },
    region: 'Ульяновская область'
  }
];

// Утилиты для работы с ППМ
export const getWaypointByCode = (code: string): Waypoint | undefined => {
  return waypoints.find(wp => wp.code === code);
};

export const getWaypointsByRegion = (region: string): Waypoint[] => {
  return waypoints.filter(wp => wp.region === region);
};

export const getWaypointsByType = (type: Waypoint['type']): Waypoint[] => {
  return waypoints.filter(wp => wp.type === type);
};

export const searchWaypoints = (query: string): Waypoint[] => {
  const lowerQuery = query.toLowerCase();
  return waypoints.filter(wp => 
    wp.name.toLowerCase().includes(lowerQuery) ||
    wp.code.toLowerCase().includes(lowerQuery) ||
    wp.region.toLowerCase().includes(lowerQuery)
  );
};