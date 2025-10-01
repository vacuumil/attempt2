// src/components/meteorology/api/aviationWeather.ts

class AviationWeatherService {
  private readonly API_CONFIG = {
    AVWX_TOKEN: 'HPUBJ9mcmPLqrZZ7mnXbbt0__EzDZdAbeHj8Chs5_qQ',
    CHECKWX_KEY: '96ef390396a44cc09cc41c56f9a5e243'
  };

  private async fetchWithTimeout(url: string, options: RequestInit = {}, timeout: number = 8000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'AeroTrainer/1.0',
          ...options.headers,
        },
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  async fetchMetarData(icaoCode: string): Promise<string> {
    const icao = icaoCode.toUpperCase().trim();
    
    if (!/^[A-Z]{4}$/.test(icao)) {
      throw new Error('Неверный формат ICAO кода');
    }

    console.log(`🔄 Запрос REAL METAR для ${icao}`);

    // Приоритетные API источники
    const sources = [
      // 1. AVWX API (исправленный формат)
      async () => {
        try {
          const response = await this.fetchWithTimeout(
            `https://avwx.rest/api/metar/${icao}`,
            {
              headers: {
                'Authorization': `BEARER ${this.API_CONFIG.AVWX_TOKEN}`,
              }
            },
            10000
          );
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error(`AVWX API error ${response.status}:`, errorText);
            throw new Error(`AVWX API error: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('📊 AVWX Response:', data);
          
          if (data.raw && this.isValidMetar(data.raw)) {
            console.log(`✅ REAL METAR от AVWX: ${data.raw.substring(0, 50)}...`);
            return data.raw;
          }
          throw new Error('Invalid METAR from AVWX');
        } catch (error) {
          console.warn('AVWX не сработал:', error);
          throw error;
        }
      },

      // 2. CheckWX API (исправленный парсинг)
      async () => {
        try {
          const response = await this.fetchWithTimeout(
            `https://api.checkwx.com/metar/${icao}`,
            {
              headers: {
                'X-API-Key': this.API_CONFIG.CHECKWX_KEY,
              }
            },
            8000
          );
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error(`CheckWX API error ${response.status}:`, errorText);
            throw new Error(`CheckWX API error: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('📊 CheckWX Response:', data);
          
          if (data.data && data.data.length > 0 && data.data[0]) {
            const metar = data.data[0];
            if (this.isValidMetar(metar)) {
              console.log(`✅ REAL METAR от CheckWX: ${metar.substring(0, 50)}...`);
              return metar;
            }
          }
          throw new Error('Invalid METAR from CheckWX');
        } catch (error) {
          console.warn('CheckWX не сработал:', error);
          throw error;
        }
      },

      // 3. AviationWeather.gov (бесплатный, без API ключа)
      async () => {
        try {
          const response = await this.fetchWithTimeout(
            `https://aviationweather.gov/cgi-bin/data/metar.php?ids=${icao}&format=raw&hours=1`,
            {},
            6000
          );
          
          if (!response.ok) throw new Error(`AviationWeather.gov error: ${response.status}`);
          
          const metar = await response.text();
          
          if (this.isValidMetar(metar)) {
            console.log(`✅ REAL METAR от AviationWeather.gov: ${metar.substring(0, 50)}...`);
            return metar.trim();
          }
          throw new Error('Invalid METAR from AviationWeather.gov');
        } catch (error) {
          console.warn('AviationWeather.gov не сработал:', error);
          throw error;
        }
      },

      // 4. VATSIM (последний резерв)
      async () => {
        try {
          const response = await this.fetchWithTimeout(
            `https://metar.vatsim.net/${icao}`,
            {},
            5000
          );
          
          if (!response.ok) throw new Error(`VATSIM error: ${response.status}`);
          
          const metar = await response.text();
          
          if (this.isValidMetar(metar)) {
            console.log(`✅ REAL METAR от VATSIM: ${metar.substring(0, 50)}...`);
            return metar;
          }
          throw new Error('Invalid METAR from VATSIM');
        } catch (error) {
          console.warn('VATSIM не сработал:', error);
          throw error;
        }
      },

      // 5. AviationAPI (резервный)
      async () => {
        try {
          const response = await this.fetchWithTimeout(
            `https://api.aviationapi.com/v1/weather/metar?apt=${icao}`,
            {},
            5000
          );
          
          if (!response.ok) throw new Error(`AviationAPI error: ${response.status}`);
          
          const data = await response.json();
          const metar = data[icao]?.[0]?.raw_text || '';
          
          if (this.isValidMetar(metar)) {
            console.log(`✅ REAL METAR от AviationAPI: ${metar.substring(0, 50)}...`);
            return metar;
          }
          throw new Error('Invalid METAR from AviationAPI');
        } catch (error) {
          console.warn('AviationAPI не сработал:', error);
          throw error;
        }
      }
    ];

    // Пробуем источники последовательно
    for (const source of sources) {
      try {
        console.log(`🔄 Пробуем источник METAR...`);
        const result = await source();
        if (result && this.isValidMetar(result)) {
          console.log(`✅ Успешно получен METAR от источника`);
          return result;
        }
      } catch (error) {
        console.warn(`❌ Источник METAR не сработал:`, error);
        continue;
      }
    }

    // Если все источники не сработали - быстрый fallback
    console.warn(`⚠️ Все источники METAR не сработали, использую демо-данные для ${icao}`);
    return this.generateMockMetar(icao);
  }

  async fetchTafData(icaoCode: string): Promise<string> {
    const icao = icaoCode.toUpperCase().trim();
    
    if (!/^[A-Z]{4}$/.test(icao)) {
      throw new Error('Неверный формат ICAO кода');
    }

    console.log(`🔄 Запрос REAL TAF для ${icao}`);

    const sources = [
      // 1. AVWX API (исправленный формат)
      async () => {
        try {
          const response = await this.fetchWithTimeout(
            `https://avwx.rest/api/taf/${icao}`,
            {
              headers: {
                'Authorization': `BEARER ${this.API_CONFIG.AVWX_TOKEN}`,
              }
            },
            10000
          );
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error(`AVWX TAF API error ${response.status}:`, errorText);
            throw new Error(`AVWX TAF API error: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('📊 AVWX TAF Response:', data);
          
          if (data.raw && this.isValidTaf(data.raw)) {
            console.log(`✅ REAL TAF от AVWX: ${data.raw.substring(0, 80)}...`);
            return data.raw;
          }
          throw new Error('Invalid TAF from AVWX');
        } catch (error) {
          console.warn('AVWX TAF не сработал:', error);
          throw error;
        }
      },

      // 2. CheckWX API (исправленный парсинг)
      async () => {
        try {
          const response = await this.fetchWithTimeout(
            `https://api.checkwx.com/taf/${icao}`,
            {
              headers: {
                'X-API-Key': this.API_CONFIG.CHECKWX_KEY,
              }
            },
            8000
          );
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error(`CheckWX TAF API error ${response.status}:`, errorText);
            throw new Error(`CheckWX TAF API error: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('📊 CheckWX TAF Response:', data);
          
          if (data.data && data.data.length > 0 && data.data[0]) {
            const taf = data.data[0];
            if (this.isValidTaf(taf)) {
              console.log(`✅ REAL TAF от CheckWX: ${taf.substring(0, 80)}...`);
              return taf;
            }
          }
          throw new Error('Invalid TAF from CheckWX');
        } catch (error) {
          console.warn('CheckWX TAF не сработал:', error);
          throw error;
        }
      },

      // 3. AviationWeather.gov (бесплатный, без API ключа)
      async () => {
        try {
          const response = await this.fetchWithTimeout(
            `https://aviationweather.gov/cgi-bin/data/taf.php?ids=${icao}&format=raw&hours=24`,
            {},
            6000
          );
          
          if (!response.ok) throw new Error(`AviationWeather.gov TAF error: ${response.status}`);
          
          const taf = await response.text();
          
          if (this.isValidTaf(taf)) {
            console.log(`✅ REAL TAF от AviationWeather.gov: ${taf.substring(0, 80)}...`);
            return taf.trim();
          }
          throw new Error('Invalid TAF from AviationWeather.gov');
        } catch (error) {
          console.warn('AviationWeather.gov TAF не сработал:', error);
          throw error;
        }
      },

      // 4. AviationAPI
      async () => {
        try {
          const response = await this.fetchWithTimeout(
            `https://api.aviationapi.com/v1/weather/taf?apt=${icao}`,
            {},
            5000
          );
          
          if (!response.ok) throw new Error(`AviationAPI TAF error: ${response.status}`);
          
          const data = await response.json();
          const taf = data[icao]?.[0]?.raw_text || '';
          
          if (this.isValidTaf(taf)) {
            console.log(`✅ REAL TAF от AviationAPI: ${taf.substring(0, 80)}...`);
            return taf;
          }
          throw new Error('Invalid TAF from AviationAPI');
        } catch (error) {
          console.warn('AviationAPI TAF не сработал:', error);
          throw error;
        }
      }
    ];

    // Пробуем источники последовательно
    for (const source of sources) {
      try {
        console.log(`🔄 Пробуем источник TAF...`);
        const result = await source();
        if (result && this.isValidTaf(result)) {
          console.log(`✅ Успешно получен TAF от источника`);
          return result;
        }
      } catch (error) {
        console.warn(`❌ Источник TAF не сработал:`, error);
        continue;
      }
    }

    // Fallback
    console.warn(`⚠️ Все источники TAF не сработали, использую демо-данные для ${icao}`);
    return this.generateRealisticTaf(icao);
  }

  private isValidMetar(metar: string): boolean {
    if (!metar || metar.length < 10) return false;
    
    const invalidPatterns = [
      'Not Found', 'No METAR', '404', 'ERROR', 'Invalid', 'unknown', 
      '{}', '[]', 'null', 'NIL', '/////', 'METAR NOT AVAILABLE', 'TAF',
      '<!DOCTYPE', '<html', 'error', 'unavailable'
    ];

    const metarUpper = metar.toUpperCase();
    const hasValidContent = /^[A-Z]{4}\s+\d{6}Z/.test(metarUpper) || 
                          metarUpper.includes('AUTO') ||
                          metarUpper.includes('COR') ||
                          /^\d{5}(KT|MPS)/.test(metarUpper) ||
                          metarUpper.includes('CAVOK') ||
                          metarUpper.includes('RMK');
    
    return hasValidContent && !invalidPatterns.some(pattern => 
      metarUpper.includes(pattern.toUpperCase())
    );
  }

  private isValidTaf(taf: string): boolean {
    if (!taf || taf.length < 20) return false;
    
    const invalidPatterns = [
      'Not Found', 'No TAF', '404', 'ERROR', 'Invalid', 'unknown', 
      '{}', '[]', '""', 'null', 'TAF NOT AVAILABLE', 'NIL',
      '<!DOCTYPE', '<html', 'error', 'unavailable'
    ];

    const tafUpper = taf.toUpperCase();
    
    // Должен содержать TAF и код аэропорта
    const hasValidContent = tafUpper.includes('TAF') && 
                           (tafUpper.includes('FM') || tafUpper.includes('BECMG') || 
                            tafUpper.includes('TEMPO') || /\d{4}\/\d{4}/.test(taf));
    
    return hasValidContent && !invalidPatterns.some(pattern => 
      tafUpper.includes(pattern.toUpperCase())
    );
  }

  private generateMockMetar(icao: string): string {
    const now = new Date();
    const day = now.getUTCDate().toString().padStart(2, '0');
    const hour = now.getUTCHours().toString().padStart(2, '0');
    const minute = now.getUTCMinutes().toString().padStart(2, '0');
    
    // Реалистичные варианты METAR
    const scenarios = [
      `${icao} ${day}${hour}${minute}Z 12010KT 9999 SCT030 BKN100 15/10 Q1013`,
      `${icao} ${day}${hour}${minute}Z 08015G25KT 5000 -RA BKN015 OVC040 12/08 Q1008`,
      `${icao} ${day}${hour}${minute}Z 00000KT CAVOK 22/15 Q1015`,
      `${icao} ${day}${hour}${minute}Z VRB03KT 8000 BR FEW010 SCT100 18/12 Q1012`
    ];
    
    const metar = scenarios[Math.floor(Math.random() * scenarios.length)];
    console.log(`🎭 Генерация mock METAR: ${metar}`);
    return metar;
  }

  private generateRealisticTaf(icao: string): string {
    const now = new Date();
    const day = now.getUTCDate().toString().padStart(2, '0');
    const hour = now.getUTCHours().toString().padStart(2, '0');
    const nextHour = (parseInt(hour) + 1) % 24;
    const nextDay = nextHour === 0 ? (parseInt(day) + 1) % 31 || 1 : parseInt(day);

    // Реалистичные сценарии TAF
    const scenarios = [
      // Сценарий 1: Стабильная погода
      `TAF ${icao} ${day}${hour}00Z ${day}${hour}00/${nextDay.toString().padStart(2, '0')}${nextHour.toString().padStart(2, '0')}00
      VRB03KT 9999 SCT030 
      BECMG ${day}${((parseInt(hour) + 6) % 24).toString().padStart(2, '0')}00/${day}${((parseInt(hour) + 8) % 24).toString().padStart(2, '0')}00 12010G20KT 
      TEMPO ${day}${((parseInt(hour) + 12) % 24).toString().padStart(2, '0')}00/${day}${((parseInt(hour) + 16) % 24).toString().padStart(2, '0')}00 4000 -RA BKN015`,

      // Сценарий 2: Ухудшение погоды
      `TAF ${icao} ${day}${hour}00Z ${day}${hour}00/${nextDay.toString().padStart(2, '0')}${nextHour.toString().padStart(2, '0')}00
      08015KT 9999 FEW030 
      BECMG ${day}${((parseInt(hour) + 4) % 24).toString().padStart(2, '0')}00/${day}${((parseInt(hour) + 6) % 24).toString().padStart(2, '0')}00 08020G35KT 6000 -SHRA BKN020 
      TEMPO ${day}${((parseInt(hour) + 8) % 24).toString().padStart(2, '0')}00/${day}${((parseInt(hour) + 14) % 24).toString().padStart(2, '0')}00 3000 +TSRA BKN012CB 
      BECMG ${day}${((parseInt(hour) + 16) % 24).toString().padStart(2, '0')}00/${day}${((parseInt(hour) + 18) % 24).toString().padStart(2, '0')}00 12012KT 9999 NSW SCT030`,

      // Сценарий 3: Туман
      `TAF ${icao} ${day}${hour}00Z ${day}${hour}00/${nextDay.toString().padStart(2, '0')}${nextHour.toString().padStart(2, '0')}00
      00000KT 0200 FG VV001 
      BECMG ${day}${((parseInt(hour) + 8) % 24).toString().padStart(2, '0')}00/${day}${((parseInt(hour) + 10) % 24).toString().padStart(2, '0')}00 08005KT 5000 BR SCT010 
      BECMG ${day}${((parseInt(hour) + 14) % 24).toString().padStart(2, '0')}00/${day}${((parseInt(hour) + 16) % 24).toString().padStart(2, '0')}00 9999 SCT030`
    ];
    
    const taf = scenarios[Math.floor(Math.random() * scenarios.length)].replace(/\n\s+/g, ' ').trim();
    console.log(`🎭 Генерация реалистичного TAF: ${taf.substring(0, 100)}...`);
    return taf;
  }
}

export const aviationWeatherService = new AviationWeatherService();

// Экспорты для обратной совместимости
export const fetchMetarData = (icaoCode: string): Promise<string> => 
  aviationWeatherService.fetchMetarData(icaoCode);

export const fetchTafData = (icaoCode: string): Promise<string> => 
  aviationWeatherService.fetchTafData(icaoCode);

export const aviationWeatherAPI = aviationWeatherService;