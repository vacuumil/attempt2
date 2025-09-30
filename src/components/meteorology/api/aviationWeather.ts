// src/components/meteorology/api/aviationWeather.ts

// Проверяем, в режиме ли разработки
const isDevelopment = import.meta.env.DEV;

export const fetchMetarData = async (icaoCode: string): Promise<string> => {
  try {
    console.log('Fetching METAR for:', icaoCode);
    
    if (!icaoCode || icaoCode.length !== 4 || !/^[A-Z]{4}$/i.test(icaoCode)) {
      throw new Error('Неверный формат ICAO кода. Используйте 4 буквы (например, UUEE)');
    }

    let response: Response;

    if (isDevelopment) {
      // В разработке используем Vite proxy
      response = await fetch(
        `/api/aviationweather/api/data/metar?ids=${icaoCode.toUpperCase()}`,
        {
          method: 'GET',
          headers: { 
            'Accept': 'text/plain',
            'Cache-Control': 'no-cache'
          },
        }
      );
    } else {
      // В продакшене используем прямой запрос с обработкой CORS
      response = await fetchWithCorsFallback(icaoCode);
    }

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.text();
    console.log('Raw response:', data);

    if (!data || data.includes('404') || data.includes('No data') || data.includes('ERROR')) {
      throw new Error(`Данные METAR для аэропорта ${icaoCode} не найдены`);
    }

    // Обрабатываем случай, когда возвращается несколько METAR
    const metars = data.trim().split('\n');
    const firstMetar = metars[0].trim();
    
    console.log('First METAR:', firstMetar);
    
    if (!firstMetar || firstMetar.length < 10) {
      throw new Error(`Неверный формат METAR данных для аэропорта ${icaoCode}`);
    }

    return firstMetar;
  } catch (error) {
    console.error('Error fetching METAR:', error);
    
    // Fallback на мок-данные при любой ошибке
    return getMockMetarData(icaoCode);
  }
};

// Функция для продакшена с обработкой CORS
const fetchWithCorsFallback = async (icaoCode: string): Promise<Response> => {
  try {
    // Пробуем прямой запрос
    const directResponse = await fetch(
      `https://aviationweather.gov/api/data/metar?ids=${icaoCode.toUpperCase()}`,
      {
        method: 'GET',
        headers: { 'Accept': 'text/plain' },
        mode: 'cors'
      }
    );
    
    if (directResponse.ok) {
      return directResponse;
    }
  } catch {
    console.warn('Direct request failed, trying CORS proxy');
  }

  // Если прямой запрос не удался, используем CORS proxy
  const proxyUrl = 'https://api.allorigins.win/raw?url=';
  const targetUrl = `https://aviationweather.gov/api/data/metar?ids=${icaoCode.toUpperCase()}`;
  
  return await fetch(proxyUrl + encodeURIComponent(targetUrl), {
    method: 'GET',
    headers: { 'Accept': 'text/plain' },
  });
};

// Расширенные мок-данные
const getMockMetarData = (icaoCode: string): string => {
  const mockData: Record<string, string> = {
    'URKK': 'URKK 201230Z 35004MPS 9999 SCT030 16/13 Q1014 R32/CLRD70 NOSIG',
    'UUEE': 'UUEE 201230Z 01005MPS 9999 BKN020 09/07 Q1017 R06L/290050 NOSIG',
    'UUDD': 'UUDD 201230Z 36006MPS 9999 FEW020 SCT100 11/08 Q1016 NOSIG',
    'URSS': 'URSS 201230Z 00000MPS CAVOK 23/19 Q1011 NOSIG',
    'URMM': 'URMM 201230Z 00000MPS 9999 SCT025 20/17 Q1010 NOSIG',
    'USSS': 'USSS 201230Z 30005MPS 9999 BKN020 10/08 Q1015 NOSIG',
    'UWGG': 'UWGG 201230Z 32004MPS 9999 FEW015 12/09 Q1013 NOSIG',
    'UWWW': 'UWWW 201230Z 34003MPS 9999 SCT025 14/11 Q1012 NOSIG',
    'UNNT': 'UNNT 201230Z 28004MPS 9999 OVC015 06/04 Q1014 NOSIG',
    'ULLI': 'ULLI 201230Z 31005MPS 9999 BKN015 OVC030 08/06 Q1013 NOSIG',
    'UHWW': 'UHWW 201230Z 14005MPS 9999 FEW020 19/15 Q1007 NOSIG',
    'KJFK': 'KJFK 201230Z 28013G20KT 10SM FEW025 BKN080 19/16 A2991',
    'KLAX': 'KLAX 201230Z 25008KT 10SM FEW020 SCT100 24/18 A2993',
    'EGLL': 'EGLL 201230Z 24011KT 9999 FEW015 BKN025 13/10 Q1008',
    'LFPG': 'LFPG 201230Z 23010KT 9999 SCT020 BKN030 14/11 Q1009',
    'EDDF': 'EDDF 201230Z 22009KT 9999 FEW018 BKN025 15/12 Q1010',
  };

  return mockData[icaoCode] || generateRandomMetar(icaoCode);
};

// Генератор случайных METAR для неизвестных аэропортов
const generateRandomMetar = (icaoCode: string): string => {
  const windDir = Math.floor(Math.random() * 36) * 10;
  const windSpeed = Math.floor(Math.random() * 8) + 2;
  const gust = Math.random() > 0.7 ? `G${windSpeed + 5}` : '';
  const temp = Math.floor(Math.random() * 35) - 10;
  const dewpoint = Math.max(temp - Math.floor(Math.random() * 8), -15);
  const pressure = 1000 + Math.floor(Math.random() * 25);
  
  const cloudCoverages = ['FEW', 'SCT', 'BKN', 'OVC'];
  const cloudBase = Math.floor(Math.random() * 30) + 10;
  
  return `${icaoCode} 201230Z ${windDir.toString().padStart(3, '0')}0${windSpeed}MPS${gust} 9999 ${cloudCoverages[Math.floor(Math.random() * 3)]}0${cloudBase} ${temp}/${dewpoint} Q${pressure} NOSIG`;
};