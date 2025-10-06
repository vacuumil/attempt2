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
  isCalm?: boolean;
}

export interface TafVisibility {
  value: number;
  unit: string;
  isCavok: boolean;
  isGreaterThan?: boolean;
  isLessThan?: boolean;
  metersValue?: number;
}

export interface TafCloud {
  coverage: string;
  altitude: number;
  type?: string;
  isCeiling?: boolean;
  isVerticalVisibility?: boolean;
}

export interface TafWeather {
  intensity?: string;
  descriptor?: string;
  phenomena: string[];
  raw: string;
}

export interface TemperatureInfo {
  type: 'max' | 'min';
  value: number;
  time: string;
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
  temperature?: TemperatureInfo[];
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
  temperature?: TemperatureInfo[];
  raw: string;
}

/**
 * Улучшенный парсер времени TAF
 */
export const parseTafTime = (timeString: string): string => {
  if (!timeString) return '';
  
  const cleanTime = timeString.replace('Z', '').trim();
  
  if (cleanTime.length === 6 && /^\d{6}$/.test(cleanTime)) {
    return cleanTime;
  }
  
  if (cleanTime.length === 4 && /^\d{4}$/.test(cleanTime) && parseInt(cleanTime) > 31) {
    return cleanTime + '00';
  }
  
  if (cleanTime.length === 4 && /^\d{4}$/.test(cleanTime) && parseInt(cleanTime) <= 2400) {
    const now = new Date();
    const day = now.getUTCDate().toString().padStart(2, '0');
    return day + cleanTime;
  }
  
  return '';
};

/**
 * Улучшенный парсер периода действия
 */
export const parseValidityPeriod = (validityString: string): { from: string; to: string } => {
  console.log('🔍 Парсинг периода:', validityString);
  
  if (!validityString || !validityString.includes('/')) {
    const now = new Date();
    const day = now.getUTCDate().toString().padStart(2, '0');
    const hour = now.getUTCHours().toString().padStart(2, '0');
    return { 
      from: day + hour + '00', 
      to: day + ((parseInt(hour) + 24) % 24).toString().padStart(2, '0') + '00' 
    };
  }
  
  const [fromStr, toStr] = validityString.split('/');
  console.log('📅 Части периода:', { fromStr, toStr });
  
  const fromTime = parseTafTime(fromStr);
  let toTime = parseTafTime(toStr);
  
  console.log('🕒 Нормализованное время:', { fromTime, toTime });
  
  // Корректировка для перехода через месяц
  if (fromTime && toTime) {
    const fromDay = parseInt(fromTime.slice(0, 2));
    let toDay = parseInt(toTime.slice(0, 2));
    
    if (toDay < fromDay) {
      toDay += 31;
      toTime = toDay.toString().padStart(2, '0') + toTime.slice(2);
      console.log('🔄 Корректировка перехода через месяц ->', toTime);
    }
  }
  
  const result = {
    from: fromTime || '010000',
    to: toTime || '020000'
  };
  
  console.log('✅ Результат парсинга периода:', result);
  return result;
};

/**
 * Вспомогательные функции для проверки типов кодов
 */
const isWindCode = (code: string): boolean => {
  return /^\d{5}(G\d{1,3})?(KT|MPS|KMH)$/.test(code) || 
         code.startsWith('VRB') || 
         code === '00000KT' || 
         code === '00000MPS';
};

const isVisibilityCode = (code: string): boolean => {
  return code === 'CAVOK' || 
         code === '9999' || 
         /^\d{4}$/.test(code) || 
         /^[PM]\d{4}$/.test(code) || 
         code.endsWith('SM');
};

const isWeatherCode = (code: string): boolean => {
  const weatherCodes = ['RA', 'SN', 'FG', 'BR', 'HZ', 'TS', 'DZ', 'GR', 'GS', 'PL', 'SG', 
                       'IC', 'UP', 'SQ', 'FC', 'DS', 'SS', 'VA', 'PO', 'DU', 'SA', 'MI', 
                       'BC', 'BL', 'DR', 'FZ', 'SH', 'VC', 'NSW'];
  
  return weatherCodes.some(weatherCode => code.includes(weatherCode)) || 
         code.startsWith('+') || code.startsWith('-') || code.startsWith('VC') ||
         code === 'TS' || code === 'SH';
};

const isCloudCode = (code: string): boolean => {
  const cloudCoverages = ['FEW', 'SCT', 'BKN', 'OVC', 'VV', 'SKC', 'CLR', 'NSC', 'NCD'];
  return (cloudCoverages.some(coverage => code.startsWith(coverage)) && /^\D+\d+/.test(code)) ||
         code === 'NSC' || code === 'SKC' || code === 'CLR' || code === 'NCD';
};


/**
 * Улучшенный парсер TAF
 */
export const parseTafEnhanced = (tafString: string): ParsedTaf => {
  try {
    console.log('🔄 Улучшенный парсинг TAF:', tafString);
    
    const normalizedTaf = tafString
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    const parsed = parseTafUniversal(normalizedTaf);
    
    if (!parsed.issuanceTime) {
      const now = new Date();
      const day = now.getUTCDate().toString().padStart(2, '0');
      const hour = now.getUTCHours().toString().padStart(2, '0');
      const minute = now.getUTCMinutes().toString().padStart(2, '0');
      parsed.issuanceTime = day + hour + minute;
    }
    
    console.log('✅ Улучшенный парсинг завершен:', {
      issuanceTime: parsed.issuanceTime,
      validity: parsed.validity,
      forecastCount: parsed.forecast.length
    });
    
    return parsed;
  } catch (error) {
    console.warn('⚠️ Улучшенный парсинг не сработал, используем стандартный:', error);
    return parseTafUniversal(tafString);
  }
};

// ДОБАВЛЯЕМ НОВУЮ ФУНКЦИЮ ДЛЯ ПАРСИНГА FM С ВРЕМЕНЕМ
const parseFmWithTime = (part: string): { time: string; remaining: string } | null => {
  // Формат FMHHmm (например: FM862888 -> FM 86 28 88)
  const fmMatch = part.match(/^FM(\d{2})(\d{2})(\d{2})$/);
  if (fmMatch) {
    const day = fmMatch[1];
    const hour = fmMatch[2];
    const minute = fmMatch[3];
    return {
      time: day + hour + minute + '00', // Преобразуем в стандартный формат
      remaining: ''
    };
  }
  
  // Формат FMHHmm с дополнительными символами (например: FM862888KT)
  const fmWithDataMatch = part.match(/^FM(\d{2})(\d{2})(\d{2})(.+)$/);
  if (fmWithDataMatch) {
    const day = fmWithDataMatch[1];
    const hour = fmWithDataMatch[2];
    const minute = fmWithDataMatch[3];
    const remaining = fmWithDataMatch[4];
    return {
      time: day + hour + minute + '00',
      remaining: remaining
    };
  }
  
  return null;
};

// ДОБАВЛЯЕМ ФУНКЦИЮ ДЛЯ ЧИСТКИ И НОРМАЛИЗАЦИИ TAF
const normalizeTafString = (tafString: string): string => {
  console.log('🧹 Нормализация TAF строки:', tafString);
  
  // Заменяем множественные пробелы на одинарные
  let normalized = tafString.replace(/\s+/g, ' ').trim();
  
  // Исправляем распространенные ошибки формата времени
  normalized = normalized.replace(/(\d{6})Z?(\d)/g, '$1Z $2'); // Добавляем пробел после времени
  normalized = normalized.replace(/(\d{4})\/(\d{4})([A-Z])/g, '$1/$2 $3'); // Пробел после периода
  
  // Исправляем TEMPO/BECMG без пробелов
  normalized = normalized.replace(/(TEMPO|BECMG|PROB\d{2})(\d)/g, '$1 $2');
  
  console.log('✅ Нормализованный TAF:', normalized);
  return normalized;
};

/**
 * Универсальный парсер TAF - ИСПРАВЛЕННАЯ ВЕРСИЯ ДЛЯ FM
 */
export const parseTafUniversal = (tafString: string): ParsedTaf => {
  console.log('🔄 Универсальный парсинг TAF:', tafString);
  
  if (!tafString || tafString.trim().length === 0) {
    throw new Error('Пустая строка TAF');
  }

  // ИСПРАВЛЕНИЕ: Нормализуем строку перед парсингом
  const normalizedTaf = normalizeTafString(tafString);
  const parts = normalizedTaf.split(' ');
  
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

  // Парсинг заголовка TAF - УЛУЧШЕННАЯ ВЕРСИЯ
  while (index < parts.length) {
    const part = parts[index];
    if (!part) {
      index++;
      continue;
    }
    
    console.log(`📋 Парсим заголовок [${index}]:`, part);

    // Код аэропорта
    if (!parsed.icaoCode && /^[A-Z]{4}$/.test(part)) {
      parsed.icaoCode = part;
      console.log('🏢 Найден код аэропорта:', parsed.icaoCode);
      index++;
      continue;
    }
    
    // Время выпуска (поддержка различных форматов)
    if (!parsed.issuanceTime && /\d{6}Z?/.test(part)) {
      parsed.issuanceTime = parseTafTime(part);
      console.log('🕒 Время выпуска:', parsed.issuanceTime);
      index++;
      continue;
    }
    
    // Период действия
    if (!parsed.validity.from && /\d{4}\/\d{4}/.test(part)) {
      parsed.validity = parseValidityPeriod(part);
      console.log('📅 Период действия:', parsed.validity);
      index++;
      continue;
    }
    
    // COR/AMD/RTD
    if (part === 'COR' || part === 'AMD' || part === 'RTD') {
      console.log('ℹ️ Модификатор:', part);
      index++;
      continue;
    }
    
    // Выходим из заголовка когда нашли начало прогноза
    if (part === 'FM' || part.startsWith('FM') || part === 'BECMG' || part === 'TEMPO' || part.startsWith('PROB')) {
      console.log('🚪 Выход из заголовка, найден:', part);
      break;
    }
    
    // ИСПРАВЛЕНИЕ: Если нашли метеоданные в заголовке, создаем основной прогноз
    if (isWindCode(part) || isVisibilityCode(part) || isWeatherCode(part) || isCloudCode(part)) {
      console.log('🌤️ Найдены метеоданные в заголовке, создаем основной прогноз');
      break;
    }
    
    index++;
  }

  // Если не нашли время выпуска, используем текущее
  if (!parsed.issuanceTime) {
    const now = new Date();
    const day = now.getUTCDate().toString().padStart(2, '0');
    const hour = now.getUTCHours().toString().padStart(2, '0');
    const minute = now.getUTCMinutes().toString().padStart(2, '0');
    parsed.issuanceTime = day + hour + minute;
    console.log('🕒 Установлено время выпуска по умолчанию:', parsed.issuanceTime);
  }

  // Если не нашли период, создаем дефолтный
  if (!parsed.validity.from) {
    parsed.validity = {
      from: parsed.issuanceTime.slice(0, 6),
      to: (parseInt(parsed.issuanceTime.slice(0, 2)) + 1).toString().padStart(2, '0') + parsed.issuanceTime.slice(2, 6)
    };
    console.log('📅 Установлен период по умолчанию:', parsed.validity);
  }

  console.log('📊 Начинаем парсинг прогнозов с индекса:', index);
  console.log('📊 Оставшиеся части:', parts.slice(index));

  // ИСПРАВЛЕНИЕ: Создаем основной прогноз если его еще нет
  if (!currentForecast && index < parts.length) {
    currentForecast = {
      type: 'MAIN',
      validity: { ...parsed.validity },
      weather: [],
      clouds: [],
      raw: 'Основной прогноз'
    };
    console.log('🆕 Создан основной прогноз для данных в заголовке');
  }

  // Основной цикл парсинга прогнозов
  while (index < parts.length) {
    const part = parts[index];
    if (!part) {
      index++;
      continue;
    }

    console.log(`🔍 Парсим часть [${index}]:`, part);

    // Обработка примечаний
    if (part === 'RMK' || part === 'REMARKS') {
      inRemarks = true;
      index++;
      continue;
    }

    if (inRemarks) {
      remarks.push(part);
      index++;
      continue;
    }

    // Проверяем FM с временем в одном токене
    const fmTimeResult = parseFmWithTime(part);
    const isFmWithTime = !!fmTimeResult;
    const isChangeType = part === 'FM' || part.startsWith('FM') || part === 'BECMG' || part === 'TEMPO' || part.startsWith('PROB');

    if (isChangeType || isFmWithTime) {
      // Сохраняем текущий прогноз если он существует и имеет данные
      if (currentForecast && hasForecastData(currentForecast)) {
        console.log('💾 Сохраняем текущий прогноз перед изменением:', currentForecast);
        parsed.forecast.push(currentForecast);
      }

      // Создаем новый прогноз
      let type: TafForecast['type'] = 'MAIN';
      let changeType: 'BECMG' | 'TEMPO' | 'PROB' | 'FM' | undefined;
      let probability: number | undefined;
      let fmTime: string | undefined;

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
      } else if (part === 'FM' || part.startsWith('FM')) {
        type = 'MAIN';
        changeType = 'FM';
        
        // Обрабатываем FM с временем
        if (isFmWithTime && fmTimeResult) {
          fmTime = fmTimeResult.time;
          console.log('🕒 Найден FM с временем:', fmTime);
        }
      }

      currentForecast = {
        type,
        changeType,
        probability,
        validity: { from: '', to: '' },
        weather: [],
        clouds: [],
        raw: part
      };

      console.log('🆕 Создан новый прогноз:', currentForecast);

      // Устанавливаем период для нового прогноза
      if (changeType === 'FM') {
        if (fmTime) {
          currentForecast.validity.from = fmTime;
          const nextFmTime = findNextFmTime(parts, index + 1);
          currentForecast.validity.to = nextFmTime || parsed.validity.to;
          console.log('🕒 Установлен период FM из токена:', currentForecast.validity);
        } else if (index + 1 < parts.length) {
          const timePart = parts[index + 1];
          if (/^\d{4}$/.test(timePart)) {
            currentForecast.validity.from = parseTafTime(timePart);
            const nextFmTime = findNextFmTime(parts, index + 2);
            currentForecast.validity.to = nextFmTime || parsed.validity.to;
            index++;
            console.log('🕒 Установлен период FM:', currentForecast.validity);
          }
        }
      } else if (index + 1 < parts.length && /\d{4}\/\d{4}/.test(parts[index + 1])) {
        // Период для BECMG/TEMPO/PROB
        currentForecast.validity = parseValidityPeriod(parts[index + 1]);
        index++;
        console.log('🕒 Установлен период для изменения:', currentForecast.validity);
      } else {
        // Если период не указан, используем разумный дефолт
        currentForecast.validity = calculateDefaultValidity(parsed.validity, parsed.forecast.length);
        console.log('🕒 Использован расчетный период:', currentForecast.validity);
      }

      // Если в FM токене есть остальные данные, парсим их
      if (isFmWithTime && fmTimeResult && fmTimeResult.remaining) {
        console.log('📝 Парсим оставшиеся данные из FM токена:', fmTimeResult.remaining);
        parseMeteoData(currentForecast, fmTimeResult.remaining);
      }

      index++;
      continue;
    }

    // Парсим метеоданные для текущего прогноза
    if (currentForecast) {
      parseMeteoData(currentForecast, part);
    } else {
      console.warn('⚠️ Нет текущего прогноза для парсинга данных:', part);
    }
    
    index++;
  }

  // ИСПРАВЛЕНИЕ: Всегда сохраняем последний прогноз
  if (currentForecast) {
    console.log('💾 Сохраняем последний прогноз:', currentForecast);
    parsed.forecast.push(currentForecast);
  }

  // Если нет прогнозов, создаем основной из данных заголовка
  if (parsed.forecast.length === 0 && currentForecast) {
    console.log('⚠️ Нет сохраненных прогнозов, сохраняем текущий');
    parsed.forecast.push(currentForecast);
  }

  parsed.remarks = remarks;

  console.log('✅ Финальный результат парсинга TAF:', {
    icaoCode: parsed.icaoCode,
    issuanceTime: parsed.issuanceTime,
    validity: parsed.validity,
    forecastCount: parsed.forecast.length,
    forecasts: parsed.forecast.map(f => ({
      type: f.type,
      changeType: f.changeType,
      validity: f.validity,
      hasWind: !!f.wind,
      hasVisibility: !!f.visibility,
      weatherCount: f.weather.length,
      cloudsCount: f.clouds.length,
      raw: f.raw
    }))
  });
  
  return parsed;
};

const parseComplexMeteoData = (forecast: TafForecast, part: string): boolean => {
  // Попробуем распарсить комбинированные форматы типа "15003688WP5"
  const complexMatch = part.match(/^(\d{3})(\d{2,3})(\d{2,3})([A-Z].*)$/);
  if (complexMatch) {
    const [, direction, speed, gust, rest] = complexMatch;
    
    // Парсим ветер
    const windDirection = parseInt(direction);
    if (windDirection <= 360) {
      forecast.wind = {
        direction: windDirection,
        speed: parseInt(speed),
        gust: parseInt(gust),
        unit: 'KT'
      };
      console.log('💨 Парсинг сложного ветра:', forecast.wind);
    }
    
    // Парсим остальные данные если они есть
    if (rest) {
      parseMeteoData(forecast, rest);
    }
    
    return true;
  }
  
  return false;
};

/**
 * Парсинг метеоданных для прогноза
 */
const parseMeteoData = (forecast: TafForecast, part: string): void => {
  let parsedElement = false;

  // Сначала пробуем сложные форматы
  if (parseComplexMeteoData(forecast, part)) {
    parsedElement = true;
  }

  // Затем стандартные парсеры
  else if (isWindCode(part)) {
    forecast.wind = parseWind(part);
    console.log('💨 Парсинг ветра:', forecast.wind);
    parsedElement = true;
  }

  else if (/^\d{3}V\d{3}$/.test(part)) {
    if (forecast.wind) {
      const variableMatch = part.match(/^(\d{3})V(\d{3})$/);
      if (variableMatch) {
        forecast.wind.variableFrom = parseInt(variableMatch[1]);
        forecast.wind.variableTo = parseInt(variableMatch[2]);
      }
    }
    parsedElement = true;
  }

  else if (isVisibilityCode(part)) {
    forecast.visibility = parseVisibility(part);
    console.log('👁️ Парсинг видимости:', forecast.visibility);
    parsedElement = true;
  }

  else if (isWeatherCode(part)) {
    if (part === 'NSW') {
      forecast.weather = [];
    } else {
      const weather = decodeWeather(part);
      forecast.weather.push(weather);
      console.log('🌦️ Парсинг погоды:', weather);
    }
    parsedElement = true;
  }

  else if (isCloudCode(part)) {
    if (part === 'NSC' || part === 'SKC' || part === 'CLR' || part === 'NCD') {
      forecast.clouds = [];
    } else {
      const cloud = decodeCloudCoverage(part);
      forecast.clouds.push(cloud);
      console.log('☁️ Парсинг облачности:', cloud);
    }
    parsedElement = true;
  }

  // Если элемент не распарсен, добавляем в raw
  if (!parsedElement) {
    if (forecast.raw && !forecast.raw.includes(part)) {
      forecast.raw += ' ' + part;
    }
    console.log('📝 Добавлено в raw:', part);
  }
};

/**
 * Найти следующее время FM для определения периода действия
 */
const findNextFmTime = (parts: string[], startIndex: number): string | null => {
  for (let i = startIndex; i < parts.length; i++) {
    const part = parts[i];
    
    // Ищем следующий FM
    if (part === 'FM' && i + 1 < parts.length) {
      const timePart = parts[i + 1];
      if (/^\d{4}$/.test(timePart)) {
        const fmTime = parseTafTime(timePart);
        console.log('🔍 Найден следующий FM время:', fmTime);
        return fmTime;
      }
    }
    
    // Или конец основного периода если нашли BECMG/TEMPO с периодом
    else if ((part === 'BECMG' || part === 'TEMPO' || part.startsWith('PROB')) && i + 1 < parts.length) {
      const nextPart = parts[i + 1];
      if (/\d{4}\/\d{4}/.test(nextPart)) {
        const period = parseValidityPeriod(nextPart);
        console.log('🔍 Найден период изменения, используем начало:', period.from);
        return period.from; // Используем начало следующего периода как конец текущего
      }
    }
    
    // Или если это последний элемент, используем конец основного периода
    else if (i === parts.length - 1) {
      console.log('🔍 Последний элемент, используем конец основного периода');
      // Создаем время на 1 час позже текущего FM
      const currentTime = parts[startIndex - 2]; // Время текущего FM
      if (currentTime && /^\d{4}$/.test(currentTime)) {
        const hours = parseInt(currentTime.slice(0, 2));
        const minutes = parseInt(currentTime.slice(2, 4));
        const nextHours = (hours + 1) % 24;
        return nextHours.toString().padStart(2, '0') + minutes.toString().padStart(2, '0') + '00';
      }
    }
  }
  
  console.log('🔍 Следующее FM время не найдено');
  return null;
};

/**
 * Проверка наличия данных в прогнозе - УПРОЩЕННАЯ ВЕРСИЯ
 */
const hasForecastData = (forecast: TafForecast): boolean => {
  // ИСПРАВЛЕНИЕ: Для FM прогнозов всегда показываем, даже если данных мало
  if (forecast.changeType === 'FM') {
    return true;
  }
  
  return !!(forecast.wind || 
           forecast.visibility || 
           (forecast.weather && forecast.weather.length > 0) || 
           (forecast.clouds && forecast.clouds.length > 0) ||
           forecast.turbulence ||
           forecast.icing ||
           (forecast.temperature && forecast.temperature.length > 0) ||
           forecast.raw.trim().length > 0);
};

/**
 * Улучшенный парсер ветра с поддержкой различных форматов
 */
const parseWind = (code: string): TafWind | undefined => {
  if (code === '00000KT' || code === '00000MPS') {
    return {
      direction: 0,
      speed: 0,
      unit: code.includes('MPS') ? 'MPS' : 'KT',
      isCalm: true
    };
  }
  
  if (code.startsWith('VRB')) {
    const vrbMatch = code.match(/^VRB(\d{1,2})(G(\d{1,3}))?(KT|MPS|KMH)$/);
    if (vrbMatch) {
      const result: TafWind = {
        direction: 'VRB',
        speed: parseInt(vrbMatch[1]),
        unit: vrbMatch[4]
      };
      if (vrbMatch[3]) {
        result.gust = parseInt(vrbMatch[3]);
      }
      return result;
    }
  }
  
  // ИСПРАВЛЕНИЕ: Поддержка формата 25888KT (из вашего примера)
  const windMatch = code.match(/^(\d{3})(\d{2,3})(G(\d{1,3}))?(KT|MPS|KMH)$/);
  if (windMatch) {
    const direction = parseInt(windMatch[1]);
    const speed = parseInt(windMatch[2]);
    const unit = windMatch[5];
    
    // Проверяем валидность направления
    if (direction > 360) {
      console.warn('⚠️ Неверное направление ветра:', direction);
      return undefined;
    }
    
    const result: TafWind = {
      direction: direction,
      speed: speed,
      unit: unit
    };
    
    if (windMatch[4]) {
      result.gust = parseInt(windMatch[4]);
    }
    
    return result;
  }
  
  return undefined;
};

/**
 * Улучшенный парсер видимости с поддержкой статутных миль
 */
const parseVisibility = (code: string): TafVisibility | undefined => {
  if (code === 'CAVOK') {
    return {
      value: 10000,
      unit: 'm',
      isCavok: true
    };
  }
  
  if (code === '9999') {
    return {
      value: 10000,
      unit: 'm',
      isCavok: false
    };
  }
  
  // ИСПРАВЛЕНИЕ: Поддержка формата P6SM (из вашего примера)
  if (code.endsWith('SM')) {
    const milesText = code.replace('SM', '').trim();
    let miles = 0;
    
    // Обработка P6SM (более 6 миль)
    if (milesText.startsWith('P')) {
      const milesValue = parseFloat(milesText.slice(1));
      return {
        value: milesValue,
        unit: 'SM',
        isCavok: false,
        isGreaterThan: true,
        metersValue: Math.round(milesValue * 1609.34)
      };
    }
    
    // Обработка дробных значений (1/2SM)
    if (milesText.includes('/')) {
      const [numerator, denominator] = milesText.split('/').map(Number);
      miles = numerator / denominator;
    } 
    // Обработка смешанных значений (1 1/2SM)
    else if (milesText.includes(' ')) {
      const parts = milesText.split(' ');
      if (parts[1].includes('/')) {
        const [numerator, denominator] = parts[1].split('/').map(Number);
        miles = parseInt(parts[0]) + (numerator / denominator);
      }
    }
    // Целое число
    else {
      miles = parseFloat(milesText);
    }
    
    return {
      value: miles,
      unit: 'SM',
      isCavok: false,
      metersValue: Math.round(miles * 1609.34)
    };
  }
  
  if (code.startsWith('P')) {
    return {
      value: parseInt(code.slice(1)),
      unit: 'm',
      isCavok: false,
      isGreaterThan: true
    };
  }
  
  if (code.startsWith('M')) {
    return {
      value: parseInt(code.slice(1)),
      unit: 'm',
      isCavok: false,
      isLessThan: true
    };
  }
  
  if (/^\d{4}$/.test(code)) {
    return {
      value: parseInt(code),
      unit: 'm',
      isCavok: false
    };
  }
  
  return undefined;
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
 * Расшифровка облачности с поддержкой различных форматов
 */
const decodeCloudCoverage = (code: string): TafCloud => {
  const coverageMap: Record<string, string> = {
    'FEW': 'few',
    'SCT': 'scattered', 
    'BKN': 'broken',
    'OVC': 'overcast',
    'VV': 'vertical_visibility',
    'SKC': 'sky_clear',
    'CLR': 'clear',
    'NSC': 'no_significant_clouds',
    'NCD': 'no_clouds_detected'
  };

  // ИСПРАВЛЕНИЕ: Поддержка формата 5CT822 (из вашего примера)
  if (/^\d{1,2}[A-Z]{2}\d+$/.test(code)) {
    const altitude = parseInt(code.slice(5)) * 100; // 22 * 100 = 2200 ft
    
    const cloud: TafCloud = {
      coverage: 'unknown',
      altitude: altitude,
      type: undefined,
      isCeiling: false
    };
    
    return cloud;
  }

  // Стандартный парсинг
  const coverage = code.slice(0, 3);
  const cloud: TafCloud = {
    coverage: coverageMap[coverage] || coverage,
    altitude: parseInt(code.slice(3, 6)) * 100,
    type: undefined,
    isCeiling: false
  };

  // Определяем тип облаков (CB, TCU)
  if (code.includes('CB')) {
    cloud.type = 'CB';
    cloud.isCeiling = true;
  } else if (code.includes('TCU')) {
    cloud.type = 'TCU';
    cloud.isCeiling = true;
  } else {
    // Определяем является ли это потолком
    cloud.isCeiling = cloud.coverage === 'broken' || cloud.coverage === 'overcast';
  }

  return cloud;
};

const calculateDefaultValidity = (mainValidity: { from: string; to: string }, forecastIndex: number): { from: string; to: string } => {
  // Для первого прогноза используем основной период
  if (forecastIndex === 0) {
    return { ...mainValidity };
  }
  
  // Для последующих создаем период на 2-6 часов
  const fromTime = mainValidity.from;
  const fromDay = parseInt(fromTime.slice(0, 2));
  let fromHour = parseInt(fromTime.slice(2, 4)) + (forecastIndex * 2); // +2 часа для каждого следующего прогноза
  
  // Обработка перехода через сутки
  if (fromHour >= 24) {
    fromHour -= 24;
  }
  
  const toHour = (fromHour + 4) % 24; // Период 4 часа
  
  return {
    from: fromDay.toString().padStart(2, '0') + fromHour.toString().padStart(2, '0') + '00',
    to: fromDay.toString().padStart(2, '0') + toHour.toString().padStart(2, '0') + '00'
  };
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
  
  if (vis.value >= 10000 && vis.unit === 'm') {
    return 'Видимость ≥10 км';
  }
  
  if (vis.isGreaterThan) {
    return `Видимость более ${vis.value} метров`;
  }
  
  if (vis.isLessThan) {
    return `Видимость менее ${vis.value} метров`;
  }
  
  // Для видимости в статутных милях
  if (vis.unit === 'SM') {
    let milesText = '';
    if (vis.value < 1) {
      // Дробные значения (1/2SM -> 0.5 мили)
      milesText = `${vis.value} мили`;
    } else if (vis.value === 1) {
      milesText = '1 миля';
    } else if (vis.value < 5) {
      milesText = `${vis.value} мили`;
    } else {
      milesText = `${vis.value} миль`;
    }
    
    if (vis.metersValue) {
      return `Видимость ${milesText} (≈${Math.round(vis.metersValue)} м)`;
    }
    return `Видимость ${milesText}`;
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
    description += ' (Нижняя граница)';
  }
  
  return description;
};

/**
 * Получить описание облаков с учетом CB
 */
export const getCloudDescriptionWithHazards = (cloud: TafCloud): string => {
  const coverageMap: Record<string, string> = {
    'few': 'Незначительная',
    'scattered': 'Рассеянная',
    'broken': 'Разорванная',
    'overcast': 'Сплошная',
    'vertical_visibility': 'Вертикальная видимость'
  };

  let description = `${coverageMap[cloud.coverage] || cloud.coverage} на ${cloud.altitude} ft`;
  
  if (cloud.type === 'CB') {
    description += ' (Cumulonimbus - кучево-дождевые)';
  } else if (cloud.type === 'TCU') {
    description += ' (Towering Cumulus - мощно-кучевые)';
  }
  
  if (cloud.isCeiling) {
    description += ' - Нижняя граница';
  }
  
  return description;
};

/**
 * Получить предупреждения для CB облаков
 */
export const getCbHazardsDescription = (clouds: TafCloud[]): string[] => {
  const hazards: string[] = [];
  const hasCb = clouds.some(cloud => cloud.type === 'CB' || cloud.type === 'TCU');
  
  if (hasCb) {
    hazards.push('⚡ Грозовая деятельность');
    hazards.push('💨 Сильная турбулентность');
    hazards.push('🧊 Интенсивное обледенение');
    hazards.push('🌀 Сдвиг ветра');
    hazards.push('🧊 Град');
  }
  
  return hazards;
};

/**
 * Получить описание турбулентности
 */
export const getTurbulenceDescription = (turbulence: TurbulenceInfo): string => {
  const intensityMap: Record<string, string> = {
    'none': 'Отсутствует',
    'light': 'Слабая',
    'light_moderate': 'Умеренно-слабая', 
    'moderate': 'Умеренная',
    'moderate_severe': 'Умеренно-сильная',
    'severe': 'Сильная',
    'extreme': 'Экстремальная'
  };

  const intensity = intensityMap[turbulence.intensity] || turbulence.intensity;
  return `${intensity} турбулентность на ${turbulence.minAltitude}-${turbulence.maxAltitude} ft`;
};

/**
 * Получить описание обледенения
 */
export const getIcingDescription = (icing: IcingInfo): string => {
  const intensityMap: Record<string, string> = {
    'none': 'Отсутствует',
    'light': 'Слабое',
    'light_moderate': 'Умеренно-слабое',
    'moderate': 'Умеренное', 
    'severe': 'Сильное'
  };

  const intensity = intensityMap[icing.intensity] || icing.intensity;
  return `${intensity} обледенение на ${icing.minAltitude}-${icing.maxAltitude} ft`;
};

/**
 * Улучшенное форматирование времени TAF для отображения
 */
export const formatTafTimeForDisplay = (timeString: string): string => {
  if (!timeString) return 'Не указано';
  
  try {
    const cleanTime = timeString.replace('Z', '');
    
    if (cleanTime.length === 6) {
      const day = cleanTime.slice(0, 2);
      const hour = cleanTime.slice(2, 4);
      const minute = cleanTime.slice(4, 6);
      
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      
      // Создаем дату
      let date = new Date(currentYear, currentMonth, parseInt(day), parseInt(hour), parseInt(minute));
      
      // Корректировка месяца если день меньше текущего
      if (parseInt(day) < now.getDate()) {
        date = new Date(currentYear, currentMonth + 1, parseInt(day), parseInt(hour), parseInt(minute));
      }
      
      const monthNames = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      
      return `${parseInt(day)} ${month} ${year}, ${hour}:${minute}Z`;
    }
    
    // Для 4-значного формата
    if (cleanTime.length === 4) {
      const hour = cleanTime.slice(0, 2);
      const minute = cleanTime.slice(2, 4);
      const now = new Date();
      const day = now.getUTCDate().toString().padStart(2, '0');
      const monthNames = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
      const month = monthNames[now.getMonth()];
      const year = now.getFullYear();
      
      return `${parseInt(day)} ${month} ${year}, ${hour}:${minute}Z`;
    }
    
    return timeString;
  } catch (error) {
    console.warn('Ошибка формата времени TAF:', timeString, error);
    return timeString;
  }
};



/**
 * Безопасный парсинг TAF с обработкой ошибок
 */
export const parseTafSafely = (tafString: string): ParsedTaf | null => {
  try {
    const parsed = parseTafUniversal(tafString);
    return parsed;
  } catch (error) {
    console.error('Ошибка парсинга TAF:', error);
    return null;
  }
};