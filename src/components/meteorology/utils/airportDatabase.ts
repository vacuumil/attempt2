// src/components/meteorology/utils/airportDatabase.ts

/**
 * Расширенная база данных аэропортов с возможностью поиска через API
 */

// Локальная база для быстрого доступа к популярным аэропортам
export const LOCAL_AIRPORT_DATABASE = [
  { icao: 'UUEE', name: 'Шереметьево, Москва', country: 'Россия' },
  { icao: 'UUDD', name: 'Домодедово, Москва', country: 'Россия' },
  { icao: 'UUWW', name: 'Внуково, Москва', country: 'Россия' },
  { icao: 'URSS', name: 'Сочи', country: 'Россия' },
  { icao: 'URMM', name: 'Минеральные Воды', country: 'Россия' },
  { icao: 'URKK', name: 'Краснодар', country: 'Россия' },
  { icao: 'USSS', name: 'Екатеринбург', country: 'Россия' },
  { icao: 'UWGG', name: 'Нижний Новгород', country: 'Россия' },
  { icao: 'UWWW', name: 'Самара', country: 'Россия' },
  { icao: 'UNNT', name: 'Толмачево, Новосибирск', country: 'Россия' },
  { icao: 'ULLI', name: 'Пулково, Санкт-Петербург', country: 'Россия' },
  { icao: 'UHHH', name: 'Хабаровск', country: 'Россия' },
  { icao: 'UHWW', name: 'Владивосток', country: 'Россия' },
  { icao: 'UWKS', name: 'Курган', country: 'Россия' },
  { icao: 'UOOO', name: 'Новый Уренгой', country: 'Россия' },
  { icao: 'KJFK', name: 'JFK, Нью-Йорк', country: 'США' },
  { icao: 'KLAX', name: 'Лос-Анджелес', country: 'США' },
  { icao: 'KORD', name: 'О\'Хара, Чикаго', country: 'США' },
  { icao: 'KDFW', name: 'Даллас/Форт-Уэрт', country: 'США' },
  { icao: 'EGLL', name: 'Хитроу, Лондон', country: 'Великобритания' },
  { icao: 'LFPG', name: 'Шарль де Голль, Париж', country: 'Франция' },
  { icao: 'EDDF', name: 'Франкфурт', country: 'Германия' },
  { icao: 'LEMD', name: 'Барахас, Мадрид', country: 'Испания' },
  { icao: 'LIRF', name: 'Фьюмичино, Рим', country: 'Италия' },
  { icao: 'EHAM', name: 'Схипхол, Амстердам', country: 'Нидерланды' },
  { icao: 'ZBAA', name: 'Пекин Столичный', country: 'Китай' },
  { icao: 'ZSPD', name: 'Пудун, Шанхай', country: 'Китай' },
  { icao: 'RJTT', name: 'Ханеда, Токио', country: 'Япония' },
  { icao: 'WSSS', name: 'Чанги, Сингапур', country: 'Сингапур' },
  { icao: 'OMDB', name: 'Дубай', country: 'ОАЭ' }
];

/**
 * Поиск аэропорта по ICAO коду в локальной базе
 */
export const findAirportByIcao = (icaoCode: string) => {
  return LOCAL_AIRPORT_DATABASE.find(airport => 
    airport.icao === icaoCode.toUpperCase()
  );
};

/**
 * Поиск аэропортов по частичному совпадению (код или название)
 */
export const searchAirports = (query: string, limit: number = 10) => {
  if (!query || query.length < 1) return [];
  
  const queryLower = query.toLowerCase();
  return LOCAL_AIRPORT_DATABASE.filter(airport =>
    airport.icao.toLowerCase().includes(queryLower) ||
    airport.name.toLowerCase().includes(queryLower) ||
    airport.country.toLowerCase().includes(queryLower)
  ).slice(0, limit);
};

/**
 * Получение информации об аэропорте через внешнее API (резервный метод)
 */
export const fetchAirportInfo = async (icaoCode: string) => {
  try {
    // Используем API AviationStack как резервный источник
    const response = await fetch(
      `https://api.aviationstack.com/v1/airports?icao=${icaoCode.toUpperCase()}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error('Ошибка при запросе к API аэропортов');
    }

    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      const airport = data.data[0];
      return {
        icao: airport.icao_code,
        name: airport.airport_name,
        country: airport.country_name,
        city: airport.city_name
      };
    }
    
    return null;
  } catch (error) {
    console.warn('Не удалось получить данные аэропорта из API:', error);
    return null;
  }
};

/**
 * Получение названия аэропорта с использованием кэша и API как резерва
 */
export const getAirportNameWithFallback = async (icaoCode: string): Promise<string> => {
  // Сначала проверяем локальную базу
  const localAirport = findAirportByIcao(icaoCode);
  if (localAirport) {
    return `${localAirport.name}, ${localAirport.country}`;
  }
  
  // Если нет в локальной базе, пробуем API
  try {
    const apiAirport = await fetchAirportInfo(icaoCode);
    if (apiAirport) {
      return `${apiAirport.name}, ${apiAirport.country}`;
    }
  } catch (error) {
    console.warn('Ошибка при получении данных аэропорта:', error);
  }
  
  // Если ничего не найдено, возвращаем базовое название
  return `Аэропорт ${icaoCode}`;
};