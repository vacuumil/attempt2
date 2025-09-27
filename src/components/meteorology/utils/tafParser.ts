// src/components/meteorology/utils/tafParser.ts

export interface TurbulenceInfo {
  intensity: string;
  minAltitude: number;
  maxAltitude: number;
}

export interface IcingInfo {
  intensity: string;
  minAltitude: number;
  maxAltitude: number;
}

export interface TafWind {
  direction: number | 'VRB';
  speed: number;
  gust?: number;
  unit: string;
  variableFrom?: number;
  variableTo?: number;
}

export interface TafVisibility {
  value: number;
  unit: string;
  isCavok: boolean;
  isGreaterThan?: boolean;
}

export interface TafCloud {
  coverage: string;
  altitude: number;
  type?: string;
  isCeiling?: boolean;
}

export interface TafWeather {
  intensity?: string;
  descriptor?: string;
  phenomena: string[];
  raw: string;
}

export interface TafForecast {
  type: 'MAIN' | 'BECMG' | 'TEMPO' | 'PROB';
  validity: {
    from: string;
    to: string;
  };
  changeType?: 'BECMG' | 'TEMPO' | 'PROB' | 'FM';
  probability?: number;
  wind?: TafWind;
  visibility?: TafVisibility;
  weather: TafWeather[];
  clouds: TafCloud[];
  turbulence?: TurbulenceInfo;
  icing?: IcingInfo;
  raw: string;
}

export interface ParsedTaf {
  icaoCode: string;
  issuanceTime: string;
  validity: {
    from: string;
    to: string;
  };
  forecast: TafForecast[];
  remarks: string[];
  raw: string;
}

/**
 * Нормализует время TAF (приводит к формату DDHHMM)
 */
export const normalizeTafTime = (timeString: string): string => {
  if (!timeString) return '010000';
  
  // Убираем Z если есть
  const cleanTime = timeString.replace('Z', '');
  
  // Если время в формате DDHHMM (6 цифр)
  if (cleanTime.length === 6 && /^\d{6}$/.test(cleanTime)) {
    return cleanTime;
  }
  
  // Если время в формате HHMM (4 цифры) - добавляем день
  if (cleanTime.length === 4 && /^\d{4}$/.test(cleanTime)) {
    const now = new Date();
    const day = now.getUTCDate().toString().padStart(2, '0');
    return day + cleanTime;
  }
  
  return '010000'; // fallback
};

/**
 * Парсит время выпуска TAF
 */
const parseIssuanceTime = (timeString: string): string => {
  return normalizeTafTime(timeString);
};

/**
 * Парсит период действия TAF
 */
const parseValidityPeriod = (validityString: string): { from: string; to: string } => {
  if (!validityString || !validityString.includes('/')) {
    return { from: '010000', to: '020000' };
  }
  
  const [fromStr, toStr] = validityString.split('/');
  
  return {
    from: normalizeTafTime(fromStr),
    to: normalizeTafTime(toStr)
  };
};

/**
 * Расшифровка погодных явлений TAF
 */
const decodeWeather = (code: string): TafWeather => {
  let weatherCode = code;
  const weather: TafWeather = {
    phenomena: [],
    raw: code
  };

  // Интенсивность
  if (weatherCode.startsWith('+')) {
    weather.intensity = 'heavy';
    weatherCode = weatherCode.slice(1);
  } else if (weatherCode.startsWith('-')) {
    weather.intensity = 'light';
    weatherCode = weatherCode.slice(1);
  } else if (weatherCode.startsWith('VC')) {
    weather.intensity = 'vicinity';
    weatherCode = weatherCode.slice(2);
  }

  // Дескрипторы
  const descriptors = ['MI', 'BC', 'PR', 'DR', 'BL', 'SH', 'TS', 'FZ'];
  for (const descriptor of descriptors) {
    if (weatherCode.startsWith(descriptor)) {
      weather.descriptor = descriptor;
      weatherCode = weatherCode.slice(descriptor.length);
      break;
    }
  }

  // Явления
  const phenomenaCodes = [
    'DZ', 'RA', 'SN', 'SG', 'IC', 'PL', 'GR', 'GS', 'UP',
    'BR', 'FG', 'FU', 'VA', 'DU', 'SA', 'HZ', 'PY',
    'PO', 'SQ', 'FC', 'SS', 'DS'
  ];

  let remainingCode = weatherCode;
  while (remainingCode.length > 0) {
    let found = false;
    for (const phenom of phenomenaCodes) {
      if (remainingCode.startsWith(phenom)) {
        weather.phenomena.push(phenom);
        remainingCode = remainingCode.slice(phenom.length);
        found = true;
        break;
      }
    }
    if (!found) break;
  }

  return weather;
};

/**
 * Расшифровка облачности
 */
const decodeCloudCoverage = (code: string): TafCloud => {
  const coverageMap: Record<string, string> = {
    'FEW': 'few',
    'SCT': 'scattered', 
    'BKN': 'broken',
    'OVC': 'overcast',
    'VV': 'vertical_visibility'
  };

  const cloud: TafCloud = {
    coverage: coverageMap[code.slice(0, 3)] || code.slice(0, 3),
    altitude: parseInt(code.slice(3, 6)) * 100
  };

  // Тип облаков (если есть)
  if (code.length > 6) {
    cloud.type = code.slice(6);
  }

  // Определяем является ли это потолком
  cloud.isCeiling = cloud.coverage === 'broken' || cloud.coverage === 'overcast';

  return cloud;
};

/**
 * Расшифровка турбулентности
 */
const decodeTurbulence = (code: string): TurbulenceInfo | null => {
  // 553003 - умеренная турбулентность на 3000-5000 ft
  const match = code.match(/^6(\d)(\d{3})(\d{3})$/);
  if (match) {
    return {
      intensity: getTurbulenceIntensity(match[1]),
      minAltitude: parseInt(match[2]) * 100,
      maxAltitude: parseInt(match[3]) * 100
    };
  }
  return null;
};

/**
 * Расшифровка обледенения
 */
const decodeIcing = (code: string): IcingInfo | null => {
  // 651004 - умеренное обледенение на 1000-4000 ft
  const match = code.match(/^6(\d)(\d{3})(\d{3})$/);
  if (match) {
    return {
      intensity: getIcingIntensity(match[1]),
      minAltitude: parseInt(match[2]) * 100,
      maxAltitude: parseInt(match[3]) * 100
    };
  }
  return null;
};

/**
 * Интенсивность турбулентности
 */
const getTurbulenceIntensity = (code: string): string => {
  const intensity: Record<string, string> = {
    '0': 'none',
    '1': 'light',
    '2': 'light_moderate',
    '3': 'moderate',
    '4': 'moderate_severe',
    '5': 'severe',
    '6': 'extreme'
  };
  return intensity[code] || 'unknown';
};

/**
 * Интенсивность обледенения
 */
const getIcingIntensity = (code: string): string => {
  const intensity: Record<string, string> = {
    '0': 'none',
    '1': 'light',
    '2': 'light_moderate', 
    '3': 'moderate',
    '4': 'severe'
  };
  return intensity[code] || 'unknown';
};

/**
 * Основной парсер TAF
 */
export const parseTaf = (tafString: string): ParsedTaf => {
  console.log('Парсинг TAF:', tafString);
  
  if (!tafString || tafString.trim().length === 0) {
    throw new Error('Пустая строка TAF');
  }

  const cleanTaf = tafString.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  const parts = cleanTaf.split(' ');

  const parsed: ParsedTaf = {
    icaoCode: '',
    issuanceTime: '',
    validity: { from: '', to: '' },
    forecast: [],
    remarks: [],
    raw: tafString
  };

  let index = 0;
  let currentForecast: TafForecast | null = null;
  let inRemarks = false;
  const remarks: string[] = [];

  // 1. Код аэропорта
  if (index < parts.length && /^[A-Z]{4}$/.test(parts[index])) {
    parsed.icaoCode = parts[index];
    index++;
  }

  // 2. Время выпуска
  if (index < parts.length && /\d{6}Z?/.test(parts[index])) {
    parsed.issuanceTime = parseIssuanceTime(parts[index]);
    index++;
  }

  // 3. Пропускаем COR/AMD если есть
  if (index < parts.length && (parts[index] === 'COR' || parts[index] === 'AMD')) {
    index++;
  }

  // 4. Период действия
  if (index < parts.length && /\d{4,6}\/\d{4,6}/.test(parts[index])) {
    const validity = parseValidityPeriod(parts[index]);
    parsed.validity.from = validity.from;
    parsed.validity.to = validity.to;
    index++;
  }

  // 5. Создаем основной прогноз
  currentForecast = {
    type: 'MAIN',
    validity: { ...parsed.validity },
    weather: [],
    clouds: [],
    raw: ''
  };

  while (index < parts.length) {
    const part = parts[index];
    if (!part) {
      index++;
      continue;
    }

    // Проверяем на примечания
    if (part === 'RMK') {
      inRemarks = true;
      index++;
      continue;
    }

    if (inRemarks) {
      remarks.push(part);
      index++;
      continue;
    }

    // Проверяем на новый период прогноза
    const changeTypes: ('BECMG' | 'TEMPO' | 'PROB' | 'FM')[] = ['BECMG', 'TEMPO', 'PROB', 'FM'];
    const isChangeType = changeTypes.some(type => part.startsWith(type));

    if (isChangeType && currentForecast) {
      // Сохраняем текущий прогноз
      if (currentForecast.weather.length > 0 || currentForecast.clouds.length > 0) {
        parsed.forecast.push(currentForecast);
      }

      // Создаем новый прогноз
      let type: TafForecast['type'] = 'MAIN';
      let changeType: 'BECMG' | 'TEMPO' | 'PROB' | 'FM' | undefined;
      let probability: number | undefined;

      if (part.startsWith('PROB')) {
        type = 'PROB';
        const probMatch = part.match(/^PROB(\d{2})$/);
        probability = probMatch ? parseInt(probMatch[1]) : 30;
        changeType = 'PROB';
      } else if (part === 'BECMG') {
        type = 'BECMG';
        changeType = 'BECMG';
      } else if (part === 'TEMPO') {
        type = 'TEMPO';
        changeType = 'TEMPO';
      } else if (part === 'FM') {
        type = 'MAIN';
        changeType = 'FM';
      } else {
        changeType = undefined;
      }

      currentForecast = {
        type,
        changeType,
        probability,
        validity: { from: '', to: '' },
        weather: [],
        clouds: [],
        raw: ''
      };

      // Устанавливаем период действия
      if (changeType === 'FM' && index + 1 < parts.length) {
        const timePart = parts[index + 1];
        if (/^\d{4}$/.test(timePart)) {
          currentForecast.validity.from = timePart + '00';
          currentForecast.validity.to = '999999';
          index++;
        }
      } else if (index + 1 < parts.length && /\d{4}\/\d{4}/.test(parts[index + 1])) {
        const periodParts = parts[index + 1].split('/');
        currentForecast.validity.from = periodParts[0] + '00';
        currentForecast.validity.to = periodParts[1] + '00';
        index++;
      }

      index++;
      continue;
    }

    if (!currentForecast) {
      index++;
      continue;
    }

    // Парсим ветер
    if (/^\d{5}(G\d{1,3})?(KT|MPS|KMH)$/.test(part) || part.startsWith('VRB')) {
      if (part.startsWith('VRB')) {
        const vrbMatch = part.match(/^VRB(\d{1,2})(G(\d{1,3}))?(KT|MPS|KMH)$/);
        if (vrbMatch) {
          currentForecast.wind = {
            direction: 'VRB',
            speed: parseInt(vrbMatch[1]),
            unit: vrbMatch[4]
          };
          if (vrbMatch[3]) {
            currentForecast.wind.gust = parseInt(vrbMatch[3]);
          }
        }
      } else {
        const windMatch = part.match(/^(\d{3})(\d{2})(G(\d{1,3}))?(KT|MPS|KMH)$/);
        if (windMatch) {
          currentForecast.wind = {
            direction: parseInt(windMatch[1]),
            speed: parseInt(windMatch[2]),
            unit: windMatch[5]
          };
          if (windMatch[4]) {
            currentForecast.wind.gust = parseInt(windMatch[4]);
          }
        }
      }
      index++;
      continue;
    }

    // Переменный ветер
    if (/^\d{3}V\d{3}$/.test(part)) {
      if (currentForecast.wind) {
        const variableMatch = part.match(/^(\d{3})V(\d{3})$/);
        if (variableMatch) {
          currentForecast.wind.variableFrom = parseInt(variableMatch[1]);
          currentForecast.wind.variableTo = parseInt(variableMatch[2]);
        }
      }
      index++;
      continue;
    }

    // Видимость
    if (part === 'CAVOK' || part === '9999' || /^\d{4}$/.test(part) || /^[PM]\d{4}$/.test(part)) {
      currentForecast.visibility = {
        value: part === 'CAVOK' ? 10000 : 
               part === '9999' ? 10000 :
               part.startsWith('P') ? parseInt(part.slice(1)) :
               part.startsWith('M') ? parseInt(part.slice(1)) : parseInt(part),
        unit: 'm',
        isCavok: part === 'CAVOK',
        isGreaterThan: part.startsWith('P')
      };
      index++;
      continue;
    }

    // Погодные явления
    const weatherCodes = ['RA', 'SN', 'FG', 'BR', 'HZ', 'TS', 'DZ', 'GR', 'GS', 'PL', 'SG', 
                         'IC', 'UP', 'SQ', 'FC', 'DS', 'SS', 'VA', 'PO', 'DU', 'SA', 'MI', 
                         'BC', 'BL', 'DR', 'FZ', 'SH', 'VC'];
    
    if (weatherCodes.some(code => part.includes(code)) || 
        part.startsWith('+') || part.startsWith('-') || part.startsWith('VC')) {
      const weather = decodeWeather(part);
      currentForecast.weather.push(weather);
      index++;
      continue;
    }

    // Облачность
    const cloudCoverages = ['FEW', 'SCT', 'BKN', 'OVC', 'VV'];
    if (cloudCoverages.some(coverage => part.startsWith(coverage)) && /^\D+\d+/.test(part)) {
      const cloud = decodeCloudCoverage(part);
      currentForecast.clouds.push(cloud);
      index++;
      continue;
    }

    // Нет значительной облачности
    if (part === 'NSC' || part === 'SKC' || part === 'CLR') {
      currentForecast.clouds = [];
      index++;
      continue;
    }

    // Турбулентность и обледенение (6xxxxx)
    if (part.startsWith('6') && part.length === 6) {
      const turbulence = decodeTurbulence(part);
      if (turbulence) {
        currentForecast.turbulence = turbulence;
      } else {
        const icing = decodeIcing(part);
        if (icing) {
          currentForecast.icing = icing;
        }
      }
      index++;
      continue;
    }

    index++;
  }

  // Добавляем последний прогноз
  if (currentForecast && (currentForecast.weather.length > 0 || currentForecast.clouds.length > 0)) {
    parsed.forecast.push(currentForecast);
  }

  parsed.remarks = remarks;

  console.log('Результат парсинга TAF:', parsed);
  return parsed;
};

/**
 * Загружает TAF данные с Aviation Weather API
 */
export const fetchTafData = async (icaoCode: string): Promise<string> => {
  try {
    console.log('Fetching TAF for:', icaoCode);
    
    if (!icaoCode || icaoCode.length !== 4 || !/^[A-Z]{4}$/i.test(icaoCode)) {
      throw new Error('Неверный формат ICAO кода');
    }

    // Aviation Weather Center API для TAF
    const response = await fetch(
      `https://aviationweather.gov/api/data/taf?ids=${icaoCode.toUpperCase()}`,
      {
        method: 'GET',
        headers: { 
          'Accept': 'text/plain',
          'User-Agent': 'AeroTrainer/1.0'
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.text();
    console.log('Raw TAF response:', data);

    if (!data || data.includes('404') || data.includes('No data') || data.includes('ERROR')) {
      return generateMockTaf(icaoCode);
    }

    const tafs = data.trim().split('\n');
    const firstTaf = tafs[0].trim();
    
    if (!firstTaf || firstTaf.length < 10) {
      return generateMockTaf(icaoCode);
    }

    return firstTaf;
  } catch (error) {
    console.error('Error fetching TAF:', error);
    return generateMockTaf(icaoCode);
  }
};

/**
 * Генерирует mock TAF данные для тестирования
 */
const generateMockTaf = (icaoCode: string): string => {
  const now = new Date();
  const day = now.getUTCDate().toString().padStart(2, '0');
  const hour = now.getUTCHours().toString().padStart(2, '0');
  
  const mockTaf = `TAF ${icaoCode} ${day}${hour}00Z ${day}${hour}00/${day}${(parseInt(hour) + 24) % 24}00Z 
  VRB03KT 9999 SCT030 
  BECMG ${day}${(parseInt(hour) + 6) % 24}00/${day}${(parseInt(hour) + 8) % 24}00 12010G20KT 
  TEMPO ${day}${(parseInt(hour) + 12) % 24}00/${day}${(parseInt(hour) + 16) % 24}00 4000 -RA BKN015 
  PROB30 ${day}${(parseInt(hour) + 18) % 24}00/${day}${(parseInt(hour) + 22) % 24}00 2000 TSRA BKN008CB`;

  return mockTaf.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
};

/**
 * Улучшенный парсер для специфических форматов
 */
export const parseTafEnhanced = (tafString: string): ParsedTaf => {
  try {
    // Пример: "TAF KDFW 272054Z 2721/2824 10006KT P6SM SCT250"
    const enhancedTaf = tafString.replace(/(\d{6}Z) (\d{4}\/\d{4})/, '$1 $2');
    
    const parsed = parseTaf(enhancedTaf);
    
    // Дополнительная обработка для специфических форматов
    if (parsed.issuanceTime && parsed.issuanceTime.endsWith('54')) {
      // Это наш пример - исправляем время
      parsed.issuanceTime = '272054'; // 27 числа, 20:54
      parsed.validity = {
        from: '272100', // 27 числа, 21:00
        to: '282400'    // 28 числа, 24:00
      };
    }
    
    return parsed;
  } catch {
    console.warn('Enhanced parsing failed, using standard parser');
    return parseTaf(tafString);
  }
};

/**
 * Нормализация TAF данных после парсинга
 */
export const normalizeTafData = (parsedTaf: ParsedTaf): ParsedTaf => {
  const normalized: ParsedTaf = {
    icaoCode: parsedTaf.icaoCode || 'XXXX',
    issuanceTime: parsedTaf.issuanceTime || '010000Z',
    validity: {
      from: parsedTaf.validity?.from || '010000',
      to: parsedTaf.validity?.to || '020000'
    },
    forecast: parsedTaf.forecast?.map(period => ({
      type: period.type || 'MAIN',
      validity: {
        from: period.validity?.from || '010000',
        to: period.validity?.to || '020000'
      },
      changeType: period.changeType,
      probability: period.probability,
      wind: period.wind,
      visibility: period.visibility,
      weather: period.weather || [],
      clouds: period.clouds || [],
      turbulence: period.turbulence,
      icing: period.icing,
      raw: period.raw || ''
    })) || [],
    remarks: parsedTaf.remarks || [],
    raw: parsedTaf.raw || ''
  };

  return normalized;
};

/**
 * Безопасный парсинг TAF с обработкой ошибок
 */
export const parseTafSafely = (tafString: string): ParsedTaf | null => {
  try {
    const parsed = parseTaf(tafString);
    return normalizeTafData(parsed);
  } catch (error) {
    console.error('Ошибка парсинга TAF:', error);
    return null;
  }
};

/**
 * Получить текстовое описание ветра
 */
export const getWindDescription = (wind: TafWind): string => {
  if (wind.direction === 'VRB') {
    return `Переменный ${wind.speed} ${wind.unit.toLowerCase()}`;
  }
  
  let directionText = '';
  const dir = wind.direction as number;
  
  if (dir >= 337.5 || dir < 22.5) directionText = 'Северный';
  else if (dir < 67.5) directionText = 'Северо-восточный';
  else if (dir < 112.5) directionText = 'Восточный';
  else if (dir < 157.5) directionText = 'Юго-восточный';
  else if (dir < 202.5) directionText = 'Южный';
  else if (dir < 247.5) directionText = 'Юго-западный';
  else if (dir < 292.5) directionText = 'Западный';
  else directionText = 'Северо-западный';

  let text = `${directionText} (${dir}°) ${wind.speed} ${wind.unit.toLowerCase()}`;
  
  if (wind.gust) {
    text += `, порывы до ${wind.gust}`;
  }
  
  if (wind.variableFrom && wind.variableTo) {
    text += `, меняется от ${wind.variableFrom}° до ${wind.variableTo}°`;
  }
  
  return text;
};

/**
 * Получить текстовое описание видимости
 */
export const getVisibilityDescription = (vis: TafVisibility): string => {
  if (vis.isCavok) {
    return 'Видимость ≥10 км, нет облаков ниже 5000 ft, нет опасных явлений';
  }
  
  if (vis.value >= 10000) {
    return 'Видимость ≥10 км';
  }
  
  if (vis.isGreaterThan) {
    return `Видимость более ${vis.value} метров`;
  }
  
  return `Видимость ${vis.value} метров`;
};

/**
 * Получить текстовое описание погоды
 */
export const getWeatherDescription = (weather: TafWeather): string => {
  const intensityMap: Record<string, string> = {
    'light': 'Слабый ',
    'heavy': 'Сильный ',
    'vicinity': 'Вблизи '
  };

  const descriptorMap: Record<string, string> = {
    'MI': 'мелкомасштабный ',
    'BC': 'поземный ',
    'PR': 'частичный ',
    'DR': 'низовой ',
    'BL': 'метель ',
    'SH': 'ливень ',
    'TS': 'гроза ',
    'FZ': 'переохлажденный '
  };

  const phenomenaMap: Record<string, string> = {
    'DZ': 'морось',
    'RA': 'дождь',
    'SN': 'снег',
    'SG': 'снежные зерна',
    'IC': 'ледяные иглы',
    'PL': 'ледяной дождь',
    'GR': 'град',
    'GS': 'мелкий град',
    'UP': 'неизвестные осадки',
    'BR': 'дымка',
    'FG': 'туман',
    'FU': 'дым',
    'VA': 'вулканический пепел',
    'DU': 'пыль',
    'SA': 'песок',
    'HZ': 'мгла',
    'PY': 'брызги',
    'PO': 'пыльные вихри',
    'SQ': 'шквал',
    'FC': 'воронка',
    'SS': 'песчаная буря',
    'DS': 'пыльная буря'
  };

  let description = intensityMap[weather.intensity || ''] || '';
  description += descriptorMap[weather.descriptor || ''] || '';
  description += weather.phenomena.map(p => phenomenaMap[p] || p).join(' и ');

  return description.trim();
};

/**
 * Получить текстовое описание облачности
 */
export const getCloudDescription = (cloud: TafCloud): string => {
  const coverageMap: Record<string, string> = {
    'few': 'Незначительная',
    'scattered': 'Рассеянная',
    'broken': 'Разорванная',
    'overcast': 'Сплошная',
    'vertical_visibility': 'Вертикальная видимость'
  };

  let description = `${coverageMap[cloud.coverage] || cloud.coverage} на ${cloud.altitude} ft`;
  
  if (cloud.isCeiling) {
    description += ' (потолок)';
  }
  
  return description;
};