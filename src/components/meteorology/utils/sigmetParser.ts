// src/components/meteorology/utils/sigmetParser.ts

export interface SigmetData {
  id: string;
  type: 'SIGMET' | 'AIRMET' | 'GAMET';
  issuanceTime: string;
  validity: {
    from: string;
    to: string;
  };
  fir: string;
  phenomenon: string;
  intensity?: string;
  location: {
    area: string;
    coordinates?: string;
    altitude?: {
      min: number;
      max: number;
    };
  };
  movement?: {
    direction: number;
    speed: number;
  };
  description: string;
  raw: string;
}

export interface ParsedSigmet {
  sigmets: SigmetData[];
  raw: string;
}

// Вспомогательная функция для fetch с таймаутом
const fetchWithTimeout = async (url: string, timeout: number = 8000): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'AeroTrainer/1.0'
      },
    });
    
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

/**
 * Парсит строку SIGMET в структурированный объект
 */
export const parseSigmet = (sigmetString: string): SigmetData[] => {
  console.log('🔄 Парсинг SIGMET:', sigmetString);

  if (!sigmetString || sigmetString.trim().length === 0) {
    console.log('❌ Пустая строка SIGMET');
    return [];
  }

  const cleanSigmet = sigmetString.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Если это один SIGMET, парсим его
  if (cleanSigmet.includes('SIGMET') || cleanSigmet.includes('AIRMET')) {
    const parsed = parseSingleSigmet(cleanSigmet);
    return parsed ? [parsed] : [];
  }

  // Если это несколько SIGMET, разделяем их
  const sigmetParts = cleanSigmet.split(/(?=SIGMET|AIRMET)/);
  const parsedSigmets: SigmetData[] = [];

  for (const part of sigmetParts) {
    if (part.trim().length > 10) {
      const parsed = parseSingleSigmet(part.trim());
      if (parsed) {
        parsedSigmets.push(parsed);
      }
    }
  }

  console.log('✅ Результат парсинга SIGMET:', parsedSigmets);
  return parsedSigmets;
};

/**
 * Парсит одиночный SIGMET
 */
const parseSingleSigmet = (sigmetString: string): SigmetData | null => {
  try {
    const sigmet: SigmetData = {
      id: '',
      type: 'SIGMET',
      issuanceTime: '',
      validity: { from: '', to: '' },
      fir: '',
      phenomenon: '',
      location: { area: '' },
      description: '',
      raw: sigmetString
    };

    const parts = sigmetString.split(' ').filter(p => p.length > 0);
    let index = 0;

    // 1. Тип и идентификатор
    if (index < parts.length) {
      if (parts[index].includes('SIGMET')) {
        sigmet.type = 'SIGMET';
      } else if (parts[index].includes('AIRMET')) {
        sigmet.type = 'AIRMET';
      } else if (parts[index].includes('GAMET')) {
        sigmet.type = 'GAMET';
      }
      index++;
    }

    // 2. Идентификатор
    if (index < parts.length && /^[A-Z]\d+$/.test(parts[index])) {
      sigmet.id = parts[index];
      index++;
    }

    // 3. Время выпуска
    if (index < parts.length && /\d{6}$/.test(parts[index])) {
      sigmet.issuanceTime = parts[index];
      index++;
    }

    // 4. FIR регион
    if (index < parts.length && /^[A-Z]{4}$/.test(parts[index])) {
      sigmet.fir = parts[index];
      index++;
    }

    // 5. Период действия
    if (index < parts.length && parts[index].includes('/')) {
      const validityMatch = parts[index].match(/(\d{4})\/(\d{4})/);
      if (validityMatch) {
        sigmet.validity.from = validityMatch[1];
        sigmet.validity.to = validityMatch[2];
      }
      index++;
    }

    // 6. Явление и интенсивность
    while (index < parts.length) {
      const part = parts[index];
      
      // Интенсивность
      if (part === 'INTSF' || part === 'WKN') {
        sigmet.intensity = part === 'INTSF' ? 'усиливающийся' : 'ослабевающий';
        index++;
        continue;
      }

      // Опасные явления
      const phenomena = [
        'TS', 'GR', 'TURB', 'ICE', 'MTW', 'FZLVL', 'VOLCANO', 
        'RADATION', 'TC', 'HAIL', 'DS', 'SS'
      ];

      for (const phenom of phenomena) {
        if (part.includes(phenom)) {
          sigmet.phenomenon = getPhenomenonDescription(phenom);
          index++;
          break;
        }
      }

      // Координаты и местоположение
      if (part.includes('N') && part.includes('E') || part.includes('W')) {
        sigmet.location.coordinates = part;
        index++;
        continue;
      }

      // Высота
      if (part.includes('FL') || (/\d+FT/.test(part))) {
        const altitude = parseAltitude(part);
        if (altitude) {
          sigmet.location.altitude = altitude;
        }
        index++;
        continue;
      }

      // Движение
      if (part.match(/^\d{5}KT$/)) {
        const movement = parseMovement(part);
        if (movement) {
          sigmet.movement = movement;
        }
        index++;
        continue;
      }

      // Область
      if (part.length > 2 && !sigmet.location.area && 
          !part.match(/^\d/) && !part.includes('/') && !part.includes('KT')) {
        sigmet.location.area = part;
      }

      index++;
    }

    // Генерация описания
    sigmet.description = generateSigmetDescription(sigmet);

    return sigmet;
  } catch (error) {
    console.error('❌ Ошибка парсинга SIGMET:', error);
    return null;
  }
};

/**
 * Получает описание явления
 */
const getPhenomenonDescription = (code: string): string => {
  const phenomena: Record<string, string> = {
    'TS': 'Грозы',
    'GR': 'Град',
    'TURB': 'Турбулентность',
    'ICE': 'Обледенение',
    'MTW': 'Горные волны',
    'FZLVL': 'Уровень замерзания',
    'VOLCANO': 'Вулканический пепел',
    'RADATION': 'Радиационная опасность',
    'TC': 'Тропический циклон',
    'HAIL': 'Крупный град',
    'DS': 'Пыльная буря',
    'SS': 'Песчаная буря'
  };

  return phenomena[code] || code;
};

/**
 * Парсит высоту
 */
const parseAltitude = (altitudeStr: string): { min: number; max: number } | null => {
  // FL250-FL350
  const flMatch = altitudeStr.match(/FL(\d+)-FL(\d+)/);
  if (flMatch) {
    return {
      min: parseInt(flMatch[1]) * 100,
      max: parseInt(flMatch[2]) * 100
    };
  }

  // 10000FT-15000FT
  const ftMatch = altitudeStr.match(/(\d+)FT-(\d+)FT/);
  if (ftMatch) {
    return {
      min: parseInt(ftMatch[1]),
      max: parseInt(ftMatch[2])
    };
  }

  // FL250
  const singleFlMatch = altitudeStr.match(/FL(\d+)/);
  if (singleFlMatch) {
    const alt = parseInt(singleFlMatch[1]) * 100;
    return { min: alt, max: alt + 1000 };
  }

  // 10000FT
  const singleFtMatch = altitudeStr.match(/(\d+)FT/);
  if (singleFtMatch) {
    const alt = parseInt(singleFtMatch[1]);
    return { min: alt, max: alt + 2000 };
  }

  return null;
};

/**
 * Парсит движение
 */
const parseMovement = (movementStr: string): { direction: number; speed: number } | null => {
  const match = movementStr.match(/^(\d{3})(\d{2})KT$/);
  if (match) {
    return {
      direction: parseInt(match[1]),
      speed: parseInt(match[2])
    };
  }
  return null;
};

/**
 * Генерирует текстовое описание SIGMET
 */
const generateSigmetDescription = (sigmet: SigmetData): string => {
  const parts: string[] = [];

  parts.push(`${sigmet.type} ${sigmet.id}`);

  if (sigmet.phenomenon) {
    parts.push(sigmet.phenomenon);
  }

  if (sigmet.intensity) {
    parts.push(`(${sigmet.intensity})`);
  }

  if (sigmet.location.area) {
    parts.push(`в районе ${sigmet.location.area}`);
  }

  if (sigmet.location.altitude) {
    const alt = sigmet.location.altitude;
    parts.push(`на высотах ${alt.min}-${alt.max} ft`);
  }

  if (sigmet.movement) {
    parts.push(`движется ${sigmet.movement.direction}° со скоростью ${sigmet.movement.speed} узлов`);
  }

  if (sigmet.validity.from && sigmet.validity.to) {
    parts.push(`действителен с ${sigmet.validity.from}Z по ${sigmet.validity.to}Z`);
  }

  return parts.join(' ');
};

/**
 * Загружает данные SIGMET
 */
export const fetchSigmetData = async (icaoCode: string): Promise<string> => {
  try {
    console.log(`🔄 Запрос SIGMET для региона ${icaoCode}`);

    // Источники SIGMET данных
    const sources = [
      // 1. AviationWeather.gov SIGMET
      async () => {
        try {
          const response = await fetchWithTimeout(
            `https://aviationweather.gov/api/data/sigmet?format=json&ids=${icaoCode}`,
            8000
          );
          
          if (!response.ok) throw new Error(`AviationWeather.gov SIGMET error: ${response.status}`);
          
          const data = await response.json();
          return JSON.stringify(data);
        } catch (error) {
          console.warn('AviationWeather.gov SIGMET не сработал:', error);
          throw error;
        }
      },

      // 2. Mock данные для тестирования
      async () => {
        return generateMockSigmet(icaoCode);
      }
    ];

    // Пробуем источники последовательно
    for (const source of sources) {
      try {
        const result = await source();
        if (result && result.length > 10) {
          console.log(`✅ Успешно получены SIGMET данные`);
          return result;
        }
      } catch (error) {
        console.warn(`❌ Источник SIGMET не сработал:`, error);
        continue;
      }
    }

    // Fallback
    console.warn(`⚠️ Все источники SIGMET не сработали, использую демо-данные`);
    return generateMockSigmet(icaoCode);

  } catch (error) {
    console.error('❌ Ошибка загрузки SIGMET:', error);
    return generateMockSigmet(icaoCode);
  }
};

/**
 * Генерирует демо-данные SIGMET
 */
const generateMockSigmet = (icaoCode: string): string => {
  const now = new Date();
  const hour = now.getUTCHours().toString().padStart(2, '0');
  const nextHour = (parseInt(hour) + 2) % 24;
  
  const scenarios = [
    // Сценарий 1: Грозы
    `SIGMET A123 ${icaoCode} ${hour}00/${nextHour}00 ${icaoCode} TS INTSF AREA N5000 E03700 - N5030 E04000 FL250-FL350 MOV NE 25015KT`,

    // Сценарий 2: Турбулентность
    `SIGMET B456 ${icaoCode} ${hour}00/${nextHour}00 ${icaoCode} TURB AREA N5200 E03000 - N5230 E03300 FL300-FL400 MOV E 30020KT`,

    // Сценарий 3: Обледенение
    `SIGMET C789 ${icaoCode} ${hour}00/${nextHour}00 ${icaoCode} ICE AREA N5500 E02500 - N5530 E02800 FL200-FL300`,

    // Сценарий 4: AIRMET
    `AIRMET D012 ${icaoCode} ${hour}00/${nextHour}00 ${icaoCode} MTW AREA N4800 E03500 - N4830 E03800 FL150-FL250`
  ];

  const sigmet = scenarios[Math.floor(Math.random() * scenarios.length)];
  console.log(`🎭 Генерация mock SIGMET: ${sigmet}`);
  return sigmet;
};

/**
 * Получает текстовое описание типа SIGMET
 */
export const getSigmetTypeDescription = (type: string): string => {
  const types: Record<string, string> = {
    'SIGMET': 'Значительное метеоявление',
    'AIRMET': 'Метеоявление для легкой авиации', 
    'GAMET': 'Метеоявление для планеров'
  };
  return types[type] || type;
};

/**
 * Получает цвет для отображения SIGMET по типу явления
 */
export const getSigmetColor = (phenomenon: string): string => {
  const colors: Record<string, string> = {
    'TS': '#ff6b6b', // Красный - грозы
    'GR': '#ffd700', // Желтый - град
    'TURB': '#64ffda', // Бирюзовый - турбулентность
    'ICE': '#1a6fc4', // Синий - обледенение
    'MTW': '#9d4edd', // Фиолетовый - горные волны
    'VOLCANO': '#ff8c00', // Оранжевый - вулканы
    'TC': '#dc143c' // Малиновый - тропические циклоны
  };

  return colors[phenomenon] || '#8892b0';
};

/**
 * Получает иконку для SIGMET
 */
export const getSigmetIcon = (phenomenon: string): string => {
  const icons: Record<string, string> = {
    'TS': '⛈️',
    'GR': '🧊', 
    'TURB': '💨',
    'ICE': '❄️',
    'MTW': '⛰️',
    'VOLCANO': '🌋',
    'TC': '🌀',
    'DS': '🏜️',
    'SS': '🌪️'
  };

  return icons[phenomenon] || '⚠️';
};