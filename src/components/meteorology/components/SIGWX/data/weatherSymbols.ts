// src/components/meteorology/components/SIGWX/data/weatherSymbols.ts
import type { WeatherSymbol } from '../types/sigwx.types';

export const weatherSymbols: WeatherSymbol[] = [
  // 1. Значительные погодные явления - ТОЧНЫЕ символы из документа EASA
  {
    id: 'tropical-cyclone',
    symbol: '🌀',
    name: 'Тропический циклон',
    description: 'Тропический циклон',
    category: 'weather'
  },
  {
    id: 'severe-squall-line',
    symbol: '▲',
    name: 'Линия жестоких шквалов',
    description: 'Линия жестоких шквалов*',
    category: 'weather',
    importantNotes: 'Выделяется для полетов до эшелона FL 100'
  },
  {
    id: 'moderate-turbulence',
    symbol: '⌇⌇',
    name: 'Умеренная турбулентность',
    description: 'Умеренная турбулентность',
    category: 'weather'
  },
  {
    id: 'severe-turbulence',
    symbol: '⌇⌇⌇',
    name: 'Сильная турбулентность',
    description: 'Сильная турбулентность',
    category: 'weather'
  },
  {
    id: 'mountain-waves',
    symbol: '≈',
    name: 'Горные волны',
    description: 'Горные волны',
    category: 'weather'
  },
  {
    id: 'moderate-aircraft-icing',
    symbol: '◐',
    name: 'Умеренное обледенение ВС',
    description: 'Умеренное обледенение воздушного судна',
    category: 'weather'
  },
  {
    id: 'severe-aircraft-icing',
    symbol: '●',
    name: 'Сильное обледенение ВС',
    description: 'Сильное обледенение воздушного судна',
    category: 'weather'
  },
  {
    id: 'widespread-fog',
    symbol: '≡',
    name: 'Обширный туман',
    description: 'Обширный туман',
    category: 'weather'
  },
  {
    id: 'radioactive-materials',
    symbol: '☢',
    name: 'Радиоактивные материалы в атмосфере',
    description: 'Радиоактивные материалы в атмосфере**',
    category: 'weather',
    importantNotes: 'CHECK SIGNET AND NOTAM FOR ROADET C++'
  },
  {
    id: 'volcanic-eruption',
    symbol: '▲',
    name: 'Вулканическое извержение',
    description: 'Вулканическое извержение***',
    category: 'weather',
    importantNotes: 'CHECK SIGNET, ADVISORED FOR FC AND VA, AND ASI FINAL AND NOTAM FOR VAT'
  },
  {
    id: 'mountain-obscuration',
    symbol: '▽',
    name: 'Скрытие гор',
    description: 'Скрытие гор',
    category: 'weather'
  },
  {
    id: 'drizzle',
    symbol: '··',
    name: 'Морось',
    description: 'Морось',
    category: 'weather'
  },
  {
    id: 'rain',
    symbol: '••',
    name: 'Дождь',
    description: 'Дождь',
    category: 'weather'
  },
  {
    id: 'snow',
    symbol: '*',
    name: 'Снег',
    description: 'Снег',
    category: 'weather'
  },
  {
    id: 'shower',
    symbol: '▼',
    name: 'Ливень',
    description: 'Ливень',
    category: 'weather'
  },
  {
    id: 'blowing-snow',
    symbol: '⇒*',
    name: 'Обширная низовая метель',
    description: 'Обширная низовая метель',
    category: 'weather'
  },
  {
    id: 'sand-dust-haze',
    symbol: '∞',
    name: 'Сильная песчаная или пыльная мгла',
    description: 'Сильная песчаная или пыльная мгла',
    category: 'weather'
  },
  {
    id: 'sandstorm-duststorm',
    symbol: 'S',
    name: 'Обширная песчаная или пыльная буря',
    description: 'Обширная песчаная или пыльная буря',
    category: 'weather'
  },
  {
    id: 'haze',
    symbol: '〰',
    name: 'Обширная мгла',
    description: 'Обширная мгла',
    category: 'weather'
  },
  {
    id: 'mist',
    symbol: '=',
    name: 'Обширная дымка',
    description: 'Обширная дымка',
    category: 'weather'
  },
  {
    id: 'smoke',
    symbol: '♨',
    name: 'Обширный дым',
    description: 'Обширный дым',
    category: 'weather'
  },
  {
    id: 'freezing-precipitation',
    symbol: '❄•',
    name: 'Замерзающие осадки',
    description: 'Замерзающие осадки****',
    category: 'weather',
    importantNotes: 'Не относится к обледенению из-за контакта осадков с ВС при очень низкой температуре'
  },

  // 2. Фронты и зоны конвергенции
  {
    id: 'cold-front',
    symbol: '▲▲▲',
    name: 'Холодный фронт у поверхности',
    description: 'Холодный фронт у поверхности',
    category: 'fronts'
  },
  {
    id: 'warm-front',
    symbol: '◯◯◯',
    name: 'Теплый фронт у поверхности',
    description: 'Теплый фронт у поверхности',
    category: 'fronts'
  },
  {
    id: 'occluded-front',
    symbol: '▲◯▲◯',
    name: 'Фронт окклюзии у поверхности',
    description: 'Фронт окклюзии у поверхности',
    category: 'fronts'
  },
  {
    id: 'quasi-stationary-front',
    symbol: '▲◯▲◯',
    name: 'Квазистационарный фронт у поверхности',
    description: 'Квазистационарный фронт у поверхности',
    category: 'fronts'
  },
  {
    id: 'convergence-line',
    symbol: '——',
    name: 'Линия конвергенции',
    description: 'Линия конвергенции',
    category: 'fronts'
  },
  {
    id: 'intertropical-convergence',
    symbol: '••••',
    name: 'Внутритропическая зона конвергенции',
    description: 'Внутритропическая зона конвергенции',
    category: 'fronts'
  },
  {
    id: 'freezing-level',
    symbol: '0°C',
    name: 'Уровень замерзания',
    description: 'Уровень замерзания',
    category: 'fronts'
  },
  {
    id: 'strong-surface-wind',
    symbol: '⇒',
    name: 'Обширный сильный приземный ветер',
    description: 'Обширный сильный приземный ветер*',
    category: 'fronts',
    importantNotes: 'Скорость ветра превышает 15 м/с (30 узлов)'
  },
  {
    id: 'tropopause-high',
    symbol: 'H',
    name: 'Высокая тропопауза',
    description: 'Тропопауза высокая',
    category: 'fronts'
  },
  {
    id: 'tropopause-low',
    symbol: 'L',
    name: 'Низкая тропопауза',
    description: 'Тропопауза низкая',
    category: 'fronts'
  },
  {
    id: 'tropopause-level',
    symbol: 'FL',
    name: 'Уровень тропопаузы',
    description: 'Уровень тропопаузы',
    category: 'fronts'
  },
  {
    id: 'state-of-sea',
    symbol: '🌊',
    name: 'Состояние моря',
    description: 'Состояние моря',
    category: 'fronts'
  },
  {
    id: 'sea-surface-temperature',
    symbol: '🌡️',
    name: 'Температура поверхности моря',
    description: 'Температура поверхности моря',
    category: 'fronts'
  },

  // 3. Облака и их количество
  {
    id: 'cirrus',
    symbol: 'Ci',
    name: 'Перистые облака',
    description: 'Cirrus',
    category: 'clouds'
  },
  {
    id: 'cirrocumulus',
    symbol: 'Cc',
    name: 'Перисто-кучевые облака',
    description: 'Cirrocumulus',
    category: 'clouds'
  },
  {
    id: 'cirrostratus',
    symbol: 'Cs',
    name: 'Перисто-слоистые облака',
    description: 'Cirrostratus',
    category: 'clouds'
  },
  {
    id: 'altocumulus',
    symbol: 'Ac',
    name: 'Высоко-кучевые облака',
    description: 'Altocumulus',
    category: 'clouds'
  },
  {
    id: 'altostratus',
    symbol: 'As',
    name: 'Высоко-слоистые облака',
    description: 'Altostratus',
    category: 'clouds'
  },
  {
    id: 'nimbostratus',
    symbol: 'Ns',
    name: 'Слоисто-дождевые облака',
    description: 'Nimbostratus',
    category: 'clouds'
  },
  {
    id: 'stratocumulus',
    symbol: 'Sc',
    name: 'Слоисто-кучевые облака',
    description: 'Stratocumulus',
    category: 'clouds'
  },
  {
    id: 'stratus',
    symbol: 'St',
    name: 'Слоистые облака',
    description: 'Stratus',
    category: 'clouds'
  },
  {
    id: 'cumulus',
    symbol: 'Cu',
    name: 'Кучевые облака',
    description: 'Cumulus',
    category: 'clouds'
  },
  {
    id: 'cumulonimbus',
    symbol: 'Cb',
    name: 'Кучево-дождевые облака',
    description: 'Cumulonimbus',
    category: 'clouds'
  },

  // Количество облаков
  {
    id: 'few-clouds',
    symbol: 'FEW',
    name: 'Небольшая облачность',
    description: 'Few (1/8 to 2/8)',
    category: 'clouds'
  },
  {
    id: 'scattered-clouds',
    symbol: 'SCT',
    name: 'Рассеянная облачность',
    description: 'Scattered (3/8 to 4/8)',
    category: 'clouds'
  },
  {
    id: 'broken-clouds',
    symbol: 'BKN',
    name: 'Разорванная облачность',
    description: 'Broken (5/8 to 7/8)',
    category: 'clouds'
  },
  {
    id: 'overcast',
    symbol: 'OVC',
    name: 'Сплошная облачность',
    description: 'Overcast (8/8)',
    category: 'clouds'
  },

  // Кучево-дождевые облака
  {
    id: 'isolated-cb',
    symbol: 'ISOL',
    name: 'Отдельные Cb',
    description: 'Individual CBs (isolated)',
    category: 'clouds'
  },
  {
    id: 'occasional-cb',
    symbol: 'OCNL',
    name: 'Хорошо разделенные Cb',
    description: 'Well-separated CBs (occasional)',
    category: 'clouds'
  },
  {
    id: 'frequent-cb',
    symbol: 'FRQ',
    name: 'Частые Cb',
    description: 'CBs with little or no separation (frequent)',
    category: 'clouds'
  },
  {
    id: 'embedded-cb',
    symbol: 'EMBD',
    name: 'Встроенные Cb',
    description: 'CBs embedded in layers of other clouds',
    category: 'clouds'
  },

  // 4. Линии и системы на картах
  {
    id: 'scalloped-line',
    symbol: '⌇⌇⌇',
    name: 'Волнистая линия',
    description: 'Demarcation of areas of significant weather',
    category: 'other'
  },
  {
    id: 'heavy-broken-line',
    symbol: '- - -',
    name: 'Прерывистая жирная линия',
    description: 'Delineation of area of CA',
    category: 'other'
  },
  {
    id: 'heavy-solid-line',
    symbol: '——',
    name: 'Сплошная жирная линия',
    description: 'Position of jet stream axis',
    category: 'other'
  },
  {
    id: 'flight-levels-rectangle',
    symbol: 'FL',
    name: 'Эшелоны полета в прямоугольниках',
    description: 'Height in flight levels of tropopause',
    category: 'other'
  },
  {
    id: 'low-pressure',
    symbol: 'L',
    name: 'Центр низкого давления',
    description: 'Centre of low pressure',
    category: 'other'
  },
  {
    id: 'high-pressure',
    symbol: 'H',
    name: 'Центр высокого давления',
    description: 'Centre of high pressure',
    category: 'other'
  },
  {
    id: 'dashed-lines',
    symbol: '- - -',
    name: 'Пунктирные линии',
    description: 'Altitude of 0°C isothermal',
    category: 'other'
  },
  {
    id: 'wind-arrow-pennant',
    symbol: '▲',
    name: 'Вымпел ветра (50 узлов)',
    description: 'Pennant - 50 kt or 25 m/s',
    category: 'other'
  },
  {
    id: 'wind-arrow-feather',
    symbol: '—',
    name: 'Перо ветра (10 узлов)',
    description: 'Feather - 10 kt or 5 m/s',
    category: 'other'
  },
  {
    id: 'wind-arrow-half-feather',
    symbol: '–',
    name: 'Полуперо ветра (5 узлов)',
    description: 'Half-feather - 5 kt or 2.5 m/s',
    category: 'other'
  }
];