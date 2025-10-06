// src/components/meteorology/utils/metarParser.ts

// Определяем интерфейсы для типизации примечаний
interface RemarkDetails {
  [key: string]: string | number | boolean | undefined;
}

interface TemperatureDetails {
  temperature: number;
  dewpoint: number;
}

interface PressureDetails {
  pressure: number;
}

interface WeatherEventDetails {
  phenomenon: string;
  timing: string;
}

interface WindDetails {
  from: number;
  to: number;
}

interface TimeDetails {
  time: string;
}

interface RunwayDetails {
  runway: string;
  state: string;
}

interface RunwayDepthDetails {
  depth: number;
  total: number;
}

type RemarkDetailsUnion = 
  | TemperatureDetails
  | PressureDetails
  | WeatherEventDetails
  | WindDetails
  | TimeDetails
  | RunwayDetails
  | RunwayDepthDetails
  | RemarkDetails;

// Обновим интерфейс ParsedMetar
export interface ParsedMetar {
  icaoCode: string;
  observationTime: string;
  modifiers: MetarModifiers;
  wind: {
    direction: number | null;
    speed: number;
    gust: number | null;
    unit: string;
    variableFrom?: number;
    variableTo?: number;
    isCalm: boolean;
  };
  visibility: {
    value: number;
    unit: string;
    isCavok: boolean;
    isGreaterThan?: boolean;
    isLessThan?: boolean;
    metersValue?: number;
    variations?: Array<{
      value: number;
      direction: string;
      description: string;
    }>;
  };
  weatherConditions: string[];
  clouds: Array<{
    coverage: string;
    altitude: number;
    type?: string;
    isVerticalVisibility?: boolean;
  }>;
  temperature: {
    value: number;
    dewpoint: number;
  };
  pressure: {
    value: number;
    unit: string;
    isInHg: boolean;
  };
  runwayConditions: Array<{
    runway: string;
    conditionCode: string;
    depositType?: string;
    contamination?: string;
    depth?: string;
    friction?: string;
  }>;
  trends?: MetarTrend[];
  remarks: Array<{
    code: string;
    description: string;
    type: 'weather' | 'temperature' | 'pressure' | 'wind' | 'runway' | 'system' | 'other';
    details?: RemarkDetailsUnion;
  }>;
  raw: string;
}

/**
 * Описание направлений для видимости
 */
const getDirectionDescription = (direction: string): string => {
  const directions: Record<string, string> = {
    'N': 'северное',
    'S': 'южное', 
    'E': 'восточное',
    'W': 'западное',
    'NE': 'северо-восточное',
    'NW': 'северо-западное',
    'SE': 'юго-восточное',
    'SW': 'юго-западное',
    'NNE': 'северо-северо-восточное',
    'NNW': 'северо-северо-западное',
    'SSE': 'юго-юго-восточное',
    'SSW': 'юго-юго-западное',
    'ENE': 'восточно-северо-восточное',
    'ESE': 'восточно-юго-восточное',
    'WNW': 'западно-северо-западное',
    'WSW': 'западно-юго-западное'
  };
  
  return directions[direction] || direction;
};

/**
 * Расширенная функция парсинга примечаний
 */
const parseRemarks = (remarksParts: string[]): ParsedMetar['remarks'] => {
  const remarks: ParsedMetar['remarks'] = [];
  
  for (const remark of remarksParts) {
    if (!remark.trim()) continue;
    
    const remarkUpper = remark.toUpperCase();
    
    // 1. QBB - высота основания облаков (Cloud Base Height)
    if (remarkUpper.startsWith('QBB')) {
      const qbbMatch = remarkUpper.match(/^QBB(\d{3})$/);
      if (qbbMatch) {
        const heightFeet = parseInt(qbbMatch[1]) * 100; // QBBxxx = xxx × 100 ft
        const heightMeters = Math.round(heightFeet * 0.3048); // преобразование в метры (1 ft = 0.3048 m)
        
        const description = `Высота основания облаков: ${heightFeet} ft (≈${heightMeters} м)`;
        
        remarks.push({
          code: remark,
          description,
          type: 'system',
          details: { 
            type: 'cloud_base', 
            value: remarkUpper,
            heightFeet: heightFeet,
            heightMeters: heightMeters
          }
        });
        continue;
      }
    }
    
    // 2. Дополнительные системные примечания
    const additionalSystemRemarks: Record<string, string> = {
      'QFE': 'Давление на уровне аэродрома',
      'QNH': 'Давление на уровне моря',
      'BLU': 'Синий цвет (хорошие условия)',
      'WHT': 'Белый цвет (плохие условия)',
      'GRN': 'Зеленый цвет',
      'YLO': 'Желтый цвет',
      'RED': 'Красный цвет',
      'BLACK': 'Черный цвет',
      'AMB': 'Амбиентные условия'
    };
    
    if (additionalSystemRemarks[remarkUpper]) {
      remarks.push({
        code: remark,
        description: additionalSystemRemarks[remarkUpper],
        type: 'system'
      });
      continue;
    }
    
    // 3. Температурные примечания
    if (remarkUpper.startsWith('T')) {
      const tempMatch = remarkUpper.match(/^T(\d{4})(\d{4})$/);
      if (tempMatch) {
        const temp = parseInt(tempMatch[1]) / 10;
        const dewpoint = parseInt(tempMatch[2]) / 10;
        const details: TemperatureDetails = { temperature: temp, dewpoint };
        
        remarks.push({
          code: remark,
          description: `Точные значения температуры: ${temp}°C, точки росы: ${dewpoint}°C`,
          type: 'temperature',
          details
        });
        continue;
      }
    }
    
    // 4. Давление на уровне моря
    if (remarkUpper.startsWith('SLP')) {
      const pressureMatch = remarkUpper.match(/^SLP(\d{3})$/);
      if (pressureMatch) {
        let pressure = parseInt(pressureMatch[1]);
        if (pressure < 500) pressure = 1000 + pressure;
        else pressure = 900 + pressure;
        
        const details: PressureDetails = { pressure };
        
        remarks.push({
          code: remark,
          description: `Давление на уровне моря: ${pressure} гПа`,
          type: 'pressure',
          details
        });
        continue;
      }
    }
    
    // 5. Начало/окончание погодных явлений
    const weatherEventMatch = remarkUpper.match(/^([A-Z]{2})([BE])$/);
    if (weatherEventMatch) {
      const [, phenomenon, timing] = weatherEventMatch;
      const eventDesc = getWeatherEventDescription(phenomenon, timing);
      const details: WeatherEventDetails = { phenomenon, timing };
      
      remarks.push({
        code: remark,
        description: eventDesc,
        type: 'weather',
        details
      });
      continue;
    }
    
    // 6. Временные примечания
    const timeMatch = remarkUpper.match(/^(\d{4})$/);
    if (timeMatch) {
      const time = timeMatch[1];
      const details: TimeDetails = { time };
      
      remarks.push({
        code: remark,
        description: `Время наблюдения: ${time.slice(0, 2)}:${time.slice(2)}`,
        type: 'other',
        details
      });
      continue;
    }
    
    // 7. Изменяющийся ветер
    if (remarkUpper.includes('V') && remarkUpper.match(/^\d{3}V\d{3}$/)) {
      const [fromStr, toStr] = remarkUpper.split('V');
      const details: WindDetails = { 
        from: parseInt(fromStr), 
        to: parseInt(toStr) 
      };
      
      remarks.push({
        code: remark,
        description: `Направление ветра меняется: ${remarkUpper}`,
        type: 'wind',
        details
      });
      continue;
    }
    
    // 8. Системные примечания
    const systemRemark = getSystemRemarkDescription(remarkUpper);
    if (systemRemark) {
      remarks.push({
        code: remark,
        description: systemRemark,
        type: 'system'
      });
      continue;
    }
    
    // 9. Примечания по ВПП
    const runwayRemark = getRunwayRemarkDescription(remarkUpper);
    if (runwayRemark) {
      remarks.push({
        code: remark,
        description: runwayRemark.description,
        type: 'runway',
        details: runwayRemark.details
      });
      continue;
    }
    
    // 10. Общие примечания
    const generalRemark = getGeneralRemarkDescription(remarkUpper);
    remarks.push({
      code: remark,
      description: generalRemark,
      type: 'other'
    });
  }
  
  return remarks;
};

/**
 * Описание системных примечаний
 */
const getSystemRemarkDescription = (remark: string): string | null => {
  const systemRemarks: Record<string, string> = {
    'AO1': 'Автоматическая станция без датчика осадков',
    'AO2': 'Автоматическая станция с датчиком осадков',
    'NOSIG': 'Без значительных изменений',
    'FZRANO': 'Обледенение не наблюдается',
    'TSNO': 'Грозы не наблюдается',
    'RAB': 'Дождь начался в время наблюдения',
    'RAE': 'Дождь закончился в время наблюдения',
    'SNB': 'Снег начался в время наблюдения',
    'SNE': 'Снег закончился в время наблюдения',
    'FGB': 'Туман начался в время наблюдения',
    'FGE': 'Туман закончился в время наблюдения',
    'PEB': 'Ледяная крупа началась',
    'PEE': 'Ледяная крупа закончилась',
    'PLB': 'Ледяной дождь начался',
    'PLE': 'Ледяной дождь закончился',
    'GRB': 'Град начался',
    'GRE': 'Град закончился',
    'GSB': 'Мелкий град начался',
    'GSE': 'Мелкий град закончился',
    'UPB': 'Неизвестные осадки начались',
    'UPE': 'Неизвестные осадки закончились'
  };
  
  return systemRemarks[remark] || null;
};

/**
 * Описание примечаний по ВПП
 */
const getRunwayRemarkDescription = (remark: string): { description: string; details?: RemarkDetailsUnion } | null => {
  // Состояние ВПП
  const runwayStateMatch = remark.match(/^R(\d{2}[LCR]?)\/(\w+)$/);
  if (runwayStateMatch) {
    const [, runway, state] = runwayStateMatch;
    const details: RunwayDetails = { runway, state };
    
    return {
      description: `Состояние ВПП ${runway}: ${getRunwayStateDescription(state)}`,
      details
    };
  }
  
  // Снежная каша на ВПП
  if (remark.includes('SNINCR')) {
    const depthMatch = remark.match(/SNINCR(\d+)\/(\d+)/);
    if (depthMatch) {
      const [, depthStr, totalStr] = depthMatch;
      const depth = parseInt(depthStr);
      const total = parseInt(totalStr);
      const details: RunwayDepthDetails = { depth, total };
      
      return {
        description: `Увеличение снежного покрова: ${depth} см, общая толщина: ${total} см`,
        details
      };
    }
  }
  
  return null;
};

/**
 * Описание состояния ВПП
 */
const getRunwayStateDescription = (state: string): string => {
  const states: Record<string, string> = {
    'CLRD': 'Очищена и сухая',
    'DAMP': 'Влажная',
    'WET': 'Мокрая',
    'RIME': 'Изморозь',
    'FROST': 'Иней',
    'DRYSN': 'Сухой снег',
    'WETSN': 'Мокрый снег',
    'SLUSH': 'Слякоть',
    'ICE': 'Лёд',
    'COMPACTED': 'Укатанный снег',
    'RUTS': 'Колеи',
    'NOSTG': 'Нет значительных изменений'
  };
  
  return states[state] || state;
};

/**
 * Описание погодных событий
 */
const getWeatherEventDescription = (phenomenon: string, timing: string): string => {
  const phenomena: Record<string, string> = {
    'RA': 'дождь', 'SN': 'снег', 'FG': 'туман', 'BR': 'дымка',
    'HZ': 'мгла', 'TS': 'гроза', 'DZ': 'морось', 'GR': 'град',
    'GS': 'мелкий град', 'PL': 'ледяной дождь', 'SG': 'снежные зерна'
  };
  
  const timingDesc = timing === 'B' ? 'начался' : 'закончился';
  const phenomenonDesc = phenomena[phenomenon] || phenomenon.toLowerCase();
  
  return `Погодное явление (${phenomenonDesc}) ${timingDesc}`;
};

/**
 * Общие примечания
 */
const getGeneralRemarkDescription = (remark: string): string => {
  const generalRemarks: Record<string, string> = {
    'PK WND': 'Пиковые порывы ветра',
    'WSHFT': 'Сдвиг ветра',
    'TWR VIS': 'Видимость с вышки',
    'SFC VIS': 'Видимость у поверхности',
    'VIS': 'Видимость',
    'VRB': 'Переменный ветер',
    'BINOVC': 'Разрывы в облачности',
    'FRQ': 'Частые',
    'OCNL': 'Временные',
    'INTER': 'Периодические',
    'CONS': 'Постоянные',
    'VCFG': 'Туман вблизи',
    'VCSH': 'Осадки вблизи',
    'VCTS': 'Гроза вблизи'
  };
  
  // Проверяем полное совпадение
  if (generalRemarks[remark]) {
    return generalRemarks[remark];
  }
  
  // Проверяем частичные совпадения
  for (const [key, value] of Object.entries(generalRemarks)) {
    if (remark.includes(key)) {
      return value;
    }
  }
  
  return remark;
};

export interface MetarModifiers {
  isAuto: boolean;
  isCorrected: boolean;
  isAmended: boolean;
  isMissing: boolean;
}

export interface TrendForecast {
  description: string;
}

export interface MetarTrend {
  type: 'BECMG' | 'TEMPO' | 'NOSIG';
  validity?: string;
  forecast: TrendForecast;
}

/**
 * Парсит строку METAR в структурированный объект
 */
export const parseMetar = (metarString: string): ParsedMetar => {
  console.log('Парсинг METAR:', metarString);
  
  if (!metarString || metarString.trim().length === 0) {
    throw new Error('Пустая строка METAR');
  }
  
  const cleanMetar = metarString.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  const parts = cleanMetar.split(' ');
  
  const parsed: ParsedMetar = {
    icaoCode: '',
    observationTime: '',
    modifiers: {
      isAuto: false,
      isCorrected: false,
      isAmended: false,
      isMissing: false
    },
    wind: { direction: null, speed: 0, gust: null, unit: 'KT', isCalm: false },
    visibility: { value: 9999, unit: 'm', isCavok: false },
    weatherConditions: [],
    clouds: [],
    temperature: { value: 0, dewpoint: 0 },
    pressure: { value: 1013, unit: 'Q', isInHg: false },
    runwayConditions: [],
    remarks: [],
    raw: metarString
  };

  let index = 0;
  let inRemarks = false;
  let inTrends = false;
  const remarksParts: string[] = [];
  const trendParts: string[] = [];

  // 1. Поиск кода аэропорта
  if (parts.length > 0 && /^[A-Z]{4}$/.test(parts[0])) {
    parsed.icaoCode = parts[0];
    index = 1;
  } else {
    // Ищем код аэропорта в первых нескольких элементах
    for (let i = 0; i < Math.min(parts.length, 3); i++) {
      if (/^[A-Z]{4}$/.test(parts[i])) {
        parsed.icaoCode = parts[i];
        index = i + 1;
        break;
      }
    }
  }

  // 2. Время наблюдения
  if (index < parts.length && /^\d{6}Z$/.test(parts[index])) {
    parsed.observationTime = parts[index];
    index++;
  }

  // 3. Обработка модификаторов
  while (index < parts.length) {
    const part = parts[index];
    
    if (part === 'AUTO') {
      parsed.modifiers.isAuto = true;
      index++;
    } else if (part === 'COR') {
      parsed.modifiers.isCorrected = true;
      index++;
    } else if (part === 'AMD') {
      parsed.modifiers.isAmended = true;
      index++;
    } else if (part === 'NIL' || part === '/////') {
      parsed.modifiers.isMissing = true;
      index++;
      // Если METAR отсутствует, возвращаем базовую структуру
      if (parsed.modifiers.isMissing) {
        return parsed;
      }
    } else if (part === 'RMK') {
      inRemarks = true;
      index++;
      break;
    } else {
      // Если это не модификатор, переходим к следующей секции
      break;
    }
  }

  // 4. Ветер - улучшенная обработка
  if (index < parts.length && !inRemarks) {
    const windPart = parts[index];
    
    // Штиль
    if (windPart === '00000KT' || windPart === '00000MPS') {
      parsed.wind.direction = 0;
      parsed.wind.speed = 0;
      parsed.wind.gust = null;
      parsed.wind.unit = windPart.includes('MPS') ? 'MPS' : 'KT';
      parsed.wind.isCalm = true;
      index++;
    }
    // Переменный ветер (VRB)
    else if (windPart.startsWith('VRB')) {
      const vrbMatch = windPart.match(/^VRB(\d{1,2})(G(\d{1,3}))?(KT|MPS|KMH)$/);
      if (vrbMatch) {
        parsed.wind.direction = null;
        parsed.wind.speed = parseInt(vrbMatch[1]);
        parsed.wind.gust = vrbMatch[3] ? parseInt(vrbMatch[3]) : null;
        parsed.wind.unit = vrbMatch[4];
        index++;
      }
    }
    // Ветер с порывами
    else if (windPart.includes('G') && /^\d{5}G\d{1,3}(KT|MPS|KMH)$/.test(windPart)) {
      const windMatch = windPart.match(/^(\d{3})(\d{2})G(\d{1,3})(KT|MPS|KMH)$/);
      if (windMatch) {
        parsed.wind.direction = parseInt(windMatch[1]);
        parsed.wind.speed = parseInt(windMatch[2]);
        parsed.wind.gust = parseInt(windMatch[3]);
        parsed.wind.unit = windMatch[4];
        index++;
      }
    }
    // Обычный ветер
    else if (/^\d{5}(KT|MPS|KMH)$/.test(windPart)) {
      const windMatch = windPart.match(/^(\d{3})(\d{2})(KT|MPS|KMH)$/);
      if (windMatch) {
        parsed.wind.direction = parseInt(windMatch[1]);
        parsed.wind.speed = parseInt(windMatch[2]);
        parsed.wind.gust = null;
        parsed.wind.unit = windMatch[3];
        index++;
      }
    }
    
    // Проверяем следующий элемент на наличие информации о переменном ветре
    if (index < parts.length && /^\d{3}V\d{3}$/.test(parts[index])) {
      const variableMatch = parts[index].match(/^(\d{3})V(\d{3})$/);
      if (variableMatch) {
        parsed.wind.variableFrom = parseInt(variableMatch[1]);
        parsed.wind.variableTo = parseInt(variableMatch[2]);
        remarksParts.push(`Ветер меняется ${parts[index]}`);
      }
      index++;
    }
  }

  // 5. Видимость - УЛУЧШЕННАЯ обработка для направленной видимости
  if (index < parts.length && !inRemarks) {
    const visPart = parts[index];
    
    if (visPart === 'CAVOK') {
      parsed.visibility.isCavok = true;
      parsed.visibility.value = 10000;
      parsed.visibility.unit = 'm';
      index++;
    } else if (visPart === '9999') {
      parsed.visibility.value = 10000;
      parsed.visibility.unit = 'm';
      index++;
    } else if (visPart.endsWith('SM')) {
      // Видимость в статутных милях
      const smMatch = visPart.match(/^(\d+)(?:\s*\/\s*\d+)?SM$/);
      if (smMatch) {
        const miles = parseInt(smMatch[1]);
        parsed.visibility.value = miles;
        parsed.visibility.unit = 'SM';
        parsed.visibility.metersValue = Math.round(miles * 1609.34);
        index++;
      } else {
        index++;
      }
    } else if (/^\d{4}$/.test(visPart)) {
      // Основная видимость в метрах
      parsed.visibility.value = parseInt(visPart);
      parsed.visibility.unit = 'm';
      index++;
      
      // Проверяем следующие части на видимость с направлением
      while (index < parts.length && !inRemarks) {
        const dirVisPart = parts[index];
        
        // Видимость с направлением (например: 1800NW)
        const dirVisMatch = dirVisPart.match(/^(\d{4})([NSEW]{1,2})$/);
        if (dirVisMatch) {
          const dirValue = parseInt(dirVisMatch[1]);
          const direction = dirVisMatch[2];
          
          if (!parsed.visibility.variations) {
            parsed.visibility.variations = [];
          }
          
          parsed.visibility.variations.push({
            value: dirValue,
            direction: direction,
            description: getDirectionDescription(direction)
          });
          index++;
        } else {
          // Если следующая часть не видимость с направлением, выходим
          break;
        }
      }
    } else if (visPart.startsWith('M') && /^M\d{4}$/.test(visPart)) {
      parsed.visibility.value = parseInt(visPart.slice(1));
      parsed.visibility.unit = 'm';
      parsed.visibility.isLessThan = true;
      index++;
    } else if (visPart.startsWith('P') && /^P\d{4}$/.test(visPart)) {
      parsed.visibility.value = parseInt(visPart.slice(1));
      parsed.visibility.unit = 'm';
      parsed.visibility.isGreaterThan = true;
      index++;
    } else if (/^\d{4}[NSEW]$/.test(visPart)) {
      parsed.visibility.value = parseInt(visPart.slice(0, 4));
      parsed.visibility.unit = 'm';
      index++;
    } else if (visPart.includes('/')) {
      // Дробная видимость в милях
      index++;
    } else {
      index++;
    }
  }

  // 6. Погодные явления - УЛУЧШЕННАЯ обработка
  const weatherCodes = ['RA', 'SN', 'FG', 'BR', 'HZ', 'TS', 'DZ', 'GR', 'GS', 'PL', 
                       'SG', 'IC', 'UP', 'SQ', 'FC', 'DS', 'SS', 'VA', 'PO', 'DU', 
                       'SA', 'MI', 'BC', 'BL', 'DR', 'FZ', 'SH', 'VC'];
  
  while (index < parts.length && !inRemarks) {
    const part = parts[index];
    if (!part) break;
    
    // Проверяем, не начались ли замечания или тренды
    if (part === 'RMK') {
      inRemarks = true;
      index++;
      continue;
    }
    
    if (part === 'BECMG' || part === 'TEMPO' || part === 'NOSIG') {
      inTrends = true;
      break;
    }
    
    // Проверяем, не началась ли следующая секция
    // Облачность
    if (part.match(/^(FEW|SCT|BKN|OVC|SKC|CLR|NSC|NCD|VV)\d{3}/)) break;
    // Температура/давление
    if (part.includes('/') && part.length <= 7 && part.match(/^[M]?\d{2}\/[M]?\d{2}$/)) break;
    // Давление
    if ((part.startsWith('Q') || part.startsWith('A')) && part.length === 5) break;
    // Состояние ВПП
    if (part.startsWith('R') && /^R\d{2}[LCR]?\//.test(part)) break;
    
    // Проверяем на погодные явления
    const isWeatherCode = weatherCodes.some(code => 
      part.includes(code) || 
      part.startsWith('+') || 
      part.startsWith('-') ||
      part.startsWith('VC') ||
      part === 'NSW' ||
      part === 'RE' // недавние погодные явления
    );
    
    if (isWeatherCode) {
      parsed.weatherConditions.push(part);
      index++;
    } else {
      // Если это не погодный код, переходим к следующей секции
      break;
    }
  }

  // 7. Облачность - УЛУЧШЕННАЯ обработка
  const cloudCoverages = ['FEW', 'SCT', 'BKN', 'OVC', 'SKC', 'CLR', 'NSC', 'NCD', 'VV'];
  
  while (index < parts.length && !inRemarks && !inTrends) {
    const part = parts[index];
    if (!part) break;
    
    if (part === 'RMK') {
      inRemarks = true;
      index++;
      break;
    }
    
    if (part === 'BECMG' || part === 'TEMPO' || part === 'NOSIG') {
      inTrends = true;
      break;
    }
    
    // Проверяем на температуру/давление
    if (part.includes('/') && part.length <= 7 && part.match(/^[M]?\d{2}\/[M]?\d{2}$/)) break;
    // Проверяем на давление
    if ((part.startsWith('Q') || part.startsWith('A')) && part.length === 5) break;
    // Проверяем на состояние ВПП
    if (part.startsWith('R') && /^R\d{2}[LCR]?\//.test(part)) break;
    
    // Обработка облачности
    if (cloudCoverages.some(coverage => part.startsWith(coverage))) {
      if (part === 'SKC' || part === 'CLR' || part === 'NSC' || part === 'NCD') {
        parsed.clouds = [];
        index++;
        continue;
      }
      
      // Вертикальная видимость
      if (part.startsWith('VV')) {
        const vvMatch = part.match(/^VV(\d{3})$/);
        if (vvMatch) {
          parsed.clouds.push({
            coverage: 'VV',
            altitude: parseInt(vvMatch[1]) * 100,
            isVerticalVisibility: true
          });
        }
        index++;
        continue;
      }
      
      // Обычная облачность
      const cloudMatch = part.match(/^(FEW|SCT|BKN|OVC)(\d{3})([A-Z]{2,3})?$/);
      if (cloudMatch) {
        parsed.clouds.push({
          coverage: cloudMatch[1],
          altitude: parseInt(cloudMatch[2]) * 100,
          type: cloudMatch[3] || undefined
        });
        index++;
      } else {
        index++;
      }
    } else {
      // Если это не облачность, переходим к следующей секции
      break;
    }
  }

  // 8. Температура/точка росы
  if (index < parts.length && !inRemarks && !inTrends) {
    const tempPart = parts[index];
    
    if (tempPart && tempPart.includes('/')) {
      const tempMatch = tempPart.match(/^([M]?\d{2})\/([M]?\d{2})$/);
      if (tempMatch) {
        parsed.temperature.value = tempMatch[1].startsWith('M') ? 
            -parseInt(tempMatch[1].slice(1)) : parseInt(tempMatch[1]);
        parsed.temperature.dewpoint = tempMatch[2].startsWith('M') ? 
            -parseInt(tempMatch[2].slice(1)) : parseInt(tempMatch[2]);
        index++;
      }
    }
  }

  // 9. Давление QNH
  for (let i = index; i < parts.length && !inRemarks && !inTrends; i++) {
    const part = parts[i];
    if (!part) continue;
    
    if (part === 'RMK') {
      inRemarks = true;
      break;
    }
    
    if (part === 'BECMG' || part === 'TEMPO' || part === 'NOSIG') {
      inTrends = true;
      break;
    }
    
    // Пропускаем условия ВПП, они обрабатываются отдельно
    if (part.startsWith('R') && /^R\d{2}[LCR]?\//.test(part)) continue;
    
    const qnhMatch = part.match(/^Q(\d{4})$/);
    if (qnhMatch) {
      parsed.pressure.value = parseInt(qnhMatch[1]);
      parsed.pressure.unit = 'Q';
      parsed.pressure.isInHg = false;
      index = i + 1;
      break;
    }
    
    const inhgMatch = part.match(/^A(\d{4})$/);
    if (inhgMatch) {
      const pressureValue = parseInt(inhgMatch[1]);
      parsed.pressure.value = pressureValue / 100;
      parsed.pressure.unit = 'A';
      parsed.pressure.isInHg = true;
      index = i + 1;
      break;
    }
  }

  // 10. Состояние полосы
  for (let i = index; i < parts.length && !inRemarks && !inTrends; i++) {
    const part = parts[i];
    if (!part) continue;
    
    if (part === 'RMK') {
      inRemarks = true;
      break;
    }
    
    if (part === 'BECMG' || part === 'TEMPO' || part === 'NOSIG') {
      inTrends = true;
      break;
    }
    
    // Обработка состояния ВПП
    const runwayMatch = part.match(/^R(\d{2}[LCR]?)\/([A-Z0-9/]{4,6})$/);
    if (runwayMatch) {
      const runway = runwayMatch[1];
      const conditionCode = runwayMatch[2];
      
      let depositType, contamination, depth, friction;
      
      if (conditionCode.length >= 4 && conditionCode !== '////') {
        const depositCode = conditionCode[0];
        const coverageCode = conditionCode[1];
        const depthCode = conditionCode.slice(2, 4);
        const frictionCode = conditionCode.length >= 6 ? conditionCode.slice(4, 6) : null;
        
        if (depositCode !== '/') {
          depositType = getRunwayDepositType(depositCode);
        }
        if (coverageCode !== '/') {
          contamination = getRunwayCoverage(coverageCode);
        }
        if (depthCode !== '//') {
          depth = getRunwayDepth(depthCode);
        }
        if (frictionCode && frictionCode !== '//') {
          friction = getRunwayFriction(frictionCode);
        }
      }
      
      parsed.runwayConditions.push({
        runway,
        conditionCode,
        depositType,
        contamination,
        depth,
        friction
      });
    }
  }

  // 11. Тренды (BECMG, TEMPO, NOSIG)
  if (inTrends) {
    parsed.trends = [];
    
    for (let i = index; i < parts.length; i++) {
      const part = parts[i];
      if (part === 'RMK') {
        inRemarks = true;
        break;
      }
      trendParts.push(part);
    }
    
    // Базовая обработка трендов
    if (trendParts.length > 0) {
      const trendType = trendParts[0] as 'BECMG' | 'TEMPO' | 'NOSIG';
      if (trendType === 'NOSIG') {
        const trend: MetarTrend = {
          type: trendType,
          forecast: { description: 'Без значительных изменений' }
        };
        parsed.trends.push(trend);
      } else if (trendType === 'BECMG' || trendType === 'TEMPO') {
        const trend: MetarTrend = {
          type: trendType,
          forecast: { description: `Ожидается изменение условий (${trendType})` }
        };
        parsed.trends.push(trend);
      }
    }
  }

  // 12. Замечания (REMARKS) - УЛУЧШЕННАЯ обработка
  if (inRemarks) {
    for (let i = index; i < parts.length; i++) {
      const part = parts[i];
      if (part && part !== 'RMK') {
        remarksParts.push(part);
      }
    }
  }

  // Расширенная обработка примечаний
  parsed.remarks = parseRemarks(remarksParts);

  console.log('Результат парсинга:', parsed);
  return parsed;
};

/**
 * Конвертирует давление из дюймов рт.ст. в гПа
 */
export const convertPressureToHpa = (inHg: number): number => {
  return Math.round(inHg * 33.8639 * 100) / 100;
};

/**
 * Конвертирует давление из гПа в дюймы рт.ст.
 */
export const convertPressureToInHg = (hpa: number): number => {
  return Math.round((hpa / 33.8639) * 100) / 100;
};

// Добавим функцию для получения текстового описания модификаторов
export const getModifiersDescription = (modifiers: MetarModifiers): string[] => {
  const descriptions: string[] = [];
  
  if (modifiers.isAuto) descriptions.push('Автоматическое наблюдение');
  if (modifiers.isCorrected) descriptions.push('Корректированное');
  if (modifiers.isAmended) descriptions.push('Измененное');
  if (modifiers.isMissing) descriptions.push('Данные отсутствуют');
  
  return descriptions;
};

export const getCloudCoverageText = (coverage: string): string => {
  const coverageMap: Record<string, string> = {
    'FEW': 'Незначительная (1-2 октавы)',
    'SCT': 'Рассеянная (3-4 октавы)',
    'BKN': 'Разорванная (5-7 октав)',
    'OVC': 'Сплошная (8 октав)',
    'SKC': 'Безоблачно',
    'CLR': 'Ясно',
    'NSC': 'Нет значительной облачности',
    'NCD': 'Нет облаков обнаружено'
  };
  return coverageMap[coverage] || coverage;
};

export const getWeatherConditionText = (code: string): string => {
  const weatherMap: Record<string, string> = {
    'RA': 'Дождь', 'SN': 'Снег', 'FG': 'Туман', 'BR': 'Дымка',
    'HZ': 'Мгла', 'TS': 'Гроза', 'DZ': 'Морось', 'GR': 'Град',
    'GS': 'Мелкий град', 'PL': 'Ледяной дождь', 'SG': 'Снежные зерна',
    'IC': 'Ледяные иглы', 'UP': 'Неизвестные осадки',
    'SQ': 'Шквал', 'FC': 'Воронка', 'DS': 'Пыльная буря', 'SS': 'Песчаная буря',
    'VA': 'Вулканический пепел', 'PO': 'Пыльные вихри', 'DU': 'Пыль', 'SA': 'Песок',
    'NSW': 'Нет значительных погодных явлений'
  };
  
  let intensity = '';
  let descriptor = '';
  let weatherCode = code;
  
  if (code.startsWith('+')) {
    intensity = 'Сильный ';
    weatherCode = code.slice(1);
  } else if (code.startsWith('-')) {
    intensity = 'Слабый ';
    weatherCode = code.slice(1);
  }
  
  if (weatherCode.startsWith('VC')) {
    descriptor = 'вблизи ';
    weatherCode = weatherCode.slice(2);
  }
  
  const descriptorMap: Record<string, string> = {
    'BC': 'поземный ', 'BL': 'метель ', 'DR': 'низовой ', 
    'FZ': 'переохлажденный ', 'MI': 'мелкомасштабный ', 
    'PR': 'частичный ', 'SH': 'ливень ', 'TS': 'гроза ',
    'VC': 'вблизи '
  };
  
  const descriptorText = descriptorMap[descriptor] || '';
  
  return intensity + descriptorText + (weatherMap[weatherCode] || code);
};

// Функции для расшифровки состояния полосы
export const getRunwayDepositType = (code: string): string => {
  const types: Record<string, string> = {
    '0': 'Очищенная и сухая',
    '1': 'Влажная',
    '2': 'Мокрая или лужи',
    '3': 'Иней или изморозь',
    '4': 'Сухой снег',
    '5': 'Мокрый снег',
    '6': 'Слякоть',
    '7': 'Лёд',
    '8': 'Укатанный снег',
    '9': 'Замерзшие колеи или рифления',
    '/': 'Данные отсутствуют'
  };
  return types[code] || `Неизвестный тип (${code})`;
};

export const getRunwayCoverage = (code: string): string => {
  const coverage: Record<string, string> = {
    '1': '10% или менее покрытия',
    '2': '11-25% покрытия',
    '5': '26-50% покрытия',
    '9': '51-100% покрытия',
    '/': 'Данные отсутствуют'
  };
  return coverage[code] || `Неизвестная площадь покрытия (${code})`;
};

export const getRunwayDepth = (code: string): string => {
  if (code.includes('/')) return 'Данные отсутствуют';
  
  const depth = parseInt(code);
  if (isNaN(depth)) return 'Неизвестно';
  
  if (depth <= 90) return `${depth} мм`;
  if (depth === 92) return '10 см';
  if (depth === 93) return '15 см';
  if (depth === 94) return '20 см';
  if (depth === 95) return '25 см';
  if (depth === 96) return '30 см';
  if (depth === 97) return '35 см';
  if (depth === 98) return '40 см и более';
  if (depth === 99) return 'Данные отсутствуют';
  return 'Неизвестно';
};

export const getRunwayFriction = (code: string): string => {
  if (code.includes('/')) return 'Данные отсутствуют';
  
  const friction = parseInt(code);
  if (isNaN(friction)) return 'Неизвестно';
  
  if (friction <= 90) return `Коэффициент ${(friction/100).toFixed(2)}`;
  if (friction === 91) return 'Плохое сцепление';
  if (friction === 92) return 'Среднее/плохое';
  if (friction === 93) return 'Среднее/хорошее';
  if (friction === 94) return 'Хорошее';
  if (friction === 95) return 'Отличное';
  if (friction === 99) return 'Данные отсутствуют';
  return 'Неизвестно';
};

/**
 * Получает название аэропорта по ICAO коду
 */
export const getAirportName = (icaoCode: string): string => {
  const airportDatabase: Record<string, string> = {
    'UUEE': 'Шереметьево, Москва, Россия',
    'UUDD': 'Домодедово, Москва, Россия',
    'UUWW': 'Внуково, Москва, Россия',
    'URSS': 'Сочи, Россия',
    'URMM': 'Минеральные Воды, Россия',
    'URKK': 'Краснодар, Россия',
    'USSS': 'Кольцово, Екатеринбург, Россия',
    'UWGG': 'Стригино, Нижний Новгород, Россия',
    'UWWW': 'Курумоч, Самара, Россия',
    'UNNT': 'Толмачево, Новосибирск, Россия',
    'KJFK': 'John F. Kennedy, Нью-Йорк, США',
    'KLAX': 'Лос-Анджелес, США',
    'EGLL': 'Хитроу, Лондон, Великобритания',
    'LFPG': 'Шарль де Голль, Париж, Франция',
    'EDDF': 'Франкфурт, Германия',
    'ULLI': 'Пулково, Санкт-Петербург, Россия',
    'UHWW': 'Владивосток, Россия',
    'UHHH': 'Хабаровск, Россия',
    'UWKS': 'Курган, Россия',
    'UOOO': 'Новый Уренгой, Россия'
  };
  
  return airportDatabase[icaoCode] || `Аэропорт ${icaoCode}`;
};

/**
 * Дополнительная функция для расшифровки замечаний (устаревшая, оставлена для совместимости)
 */
export const decodeRemark = (remark: string): string => {
  const remarkMap: Record<string, string> = {
    'AO1': 'Автоматическая станция без осадков',
    'AO2': 'Автоматическая станция с осадками',
    'SLP': 'Уровень морского давления',
    'TWR': 'Видимость с вышки',
    'SFC': 'Видимость у поверхности',
    'VIS': 'Видимость',
    'WS': 'Сдвиг ветра',
    'PK': 'Пиковые порывы ветра',
    'WSCONDS': 'Условия сдвига ветра'
  };

  // Обработка температурных замечаний (например, T01230123)
  if (remark.startsWith('T')) {
    const tempMatch = remark.match(/^T(\d{4})(\d{4})$/);
    if (tempMatch) {
      const temp = parseInt(tempMatch[1]) / 10;
      const dewpoint = parseInt(tempMatch[2]) / 10;
      return `Температура ${temp}°C, точка росы ${dewpoint}°C`;
    }
  }

  // Обработка давления (например, SLP123)
  if (remark.startsWith('SLP')) {
    const pressure = parseInt(remark.slice(3));
    return `Давление на уровне моря: ${pressure} гПа`;
  }

  return remarkMap[remark] || remark;
};

/**
 * Функция для улучшенного отображения изменяющегося ветра
 */
export const getVariableWindText = (wind: ParsedMetar['wind']): string => {
  if (wind.variableFrom && wind.variableTo) {
    return `Ветер переменный от ${wind.variableFrom}° до ${wind.variableTo}°`;
  }
  if (wind.direction === null) {
    return 'Ветер переменный по направлению';
  }
  return '';
};