// src/components/meteorology/api/aviationWeather.ts

export const fetchMetarData = async (icaoCode: string): Promise<string> => {
  try {
    console.log('Fetching METAR for:', icaoCode);
    
    if (!icaoCode || icaoCode.length !== 4 || !/^[A-Z]{4}$/i.test(icaoCode)) {
      throw new Error('Неверный формат ICAO кода. Используйте 4 буквы (например, UUEE)');
    }

    const response = await fetch(
      `https://aviationweather.gov/api/data/metar?ids=${icaoCode.toUpperCase()}`,
      {
        method: 'GET',
        headers: { 'Accept': 'text/plain' },
      }
    );

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
    if (error instanceof Error) {
      throw new Error(`Ошибка при получении METAR: ${error.message}`);
    }
    throw new Error('Неизвестная ошибка при получении METAR');
  }
};