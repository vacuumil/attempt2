// src/components/meteorology/utils/sigmetParser.ts

export interface SigmetData {
  id: string;
  hazardType: string;
  severity: string;
  validity: {
    from: string;
    to: string;
  };
  areaDescription: string;
  altitude?: {
    min: number;
    max: number;
  };
  movement?: {
    direction: number;
    speed: number;
  };
  description: string;
  issuingStation: string;
  issuanceTime: string;
}

/**
 * Парсит SIGMET данные (упрощенная реализация для демонстрации)
 */
export const parseSigmet = (sigmetString: string): SigmetData[] => {
  console.log('Парсинг SIGMET:', sigmetString);
  
  // Для демонстрации возвращаем mock данные
  // В реальном приложении здесь будет парсинг реальных SIGMET данных
  
  const mockSigmetData: SigmetData[] = [
    {
      id: 'SIGMET1',
      hazardType: 'THUNDERSTORM',
      severity: 'MODERATE',
      validity: {
        from: '251200',
        to: '251600'
      },
      areaDescription: 'В радиусе 50 морских миль от UUEE',
      altitude: {
        min: 5000,
        max: 35000
      },
      movement: {
        direction: 270,
        speed: 25
      },
      description: 'Грозовая активность с градом и сильной турбулентностью',
      issuingStation: 'UUEE',
      issuanceTime: '251100Z'
    },
    {
      id: 'SIGMET2',
      hazardType: 'TURBULENCE',
      severity: 'LIGHT',
      validity: {
        from: '251400',
        to: '252000'
      },
      areaDescription: 'Северо-западный регион Московской зоны',
      altitude: {
        min: 10000,
        max: 25000
      },
      description: 'Умеренная турбулентность в ясном небе',
      issuingStation: 'UUEE',
      issuanceTime: '251300Z'
    }
  ];

  // Если есть реальные данные, парсим их
  if (sigmetString && sigmetString.length > 10) {
    // Здесь будет реальная логика парсинга
    try {
      // Парсинг реальных SIGMET данных
      return mockSigmetData; // временно возвращаем mock данные
    } catch (error) {
      console.error('Ошибка парсинга SIGMET:', error);
      return mockSigmetData;
    }
  }

  return mockSigmetData;
};

/**
 * Загружает SIGMET данные
 */
export const fetchSigmetData = async (icaoCode: string): Promise<string> => {
  try {
    console.log('Fetching SIGMET for region of:', icaoCode);
    
    // В реальном приложении здесь будет запрос к API SIGMET
    // Пока возвращаем mock данные
    
    const mockSigmet = `SIGMET UUEE 251100Z THUNDERSTORM MODERATE WITH HAIL AND TURBULENCE`;
    
    return mockSigmet;
  } catch (error) {
    console.error('Error fetching SIGMET:', error);
    
    // Возвращаем mock данные в случае ошибки
    return `SIGMET MOCK 251100Z TURBULENCE LIGHT TO MODERATE`;
  }
};