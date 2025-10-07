// src/components/meteorology/components/TafDisplay/TafDisplay.tsx
import React from 'react';
import type { ParsedTaf, TafForecast, TafWeather, TafCloud } from '../../utils/tafParser';
import { 
  getWindDescription, 
  getVisibilityDescription, 
  getWeatherDescription, 
  getCloudDescriptionWithHazards,
  getCbHazardsDescription,
  getTurbulenceDescription,
  getIcingDescription,
  formatTafTimeForDisplay
} from '../../utils/tafParser';
import {
  TafContainer,
  TafHeader,
  TafCode,
  PeriodCard,
  PeriodHeader,
  WeatherGrid,
  WeatherItem,
  WeatherValue,
  WeatherGroup,
  ChangeIndicator,
  DangerSection,
  StatusIndicator,
  InfoSection
} from './TafDisplay.styles';

interface TafDisplayProps {
  tafData: ParsedTaf | null;
  icaoCode: string;
}

export const TafDisplay: React.FC<TafDisplayProps> = ({ tafData, icaoCode }) => {
  if (!tafData) {
    return (
      <TafContainer>
        <div style={{ textAlign: 'center', padding: '40px', color: '#8892b0' }}>
          <h3 style={{ color: '#ff6b6b', marginBottom: '15px' }}>❌ Данные TAF недоступны</h3>
          <p>Не удалось загрузить или распарсить TAF для аэропорта {icaoCode}</p>
        </div>
      </TafContainer>
    );
  }

  const getChangeTypeInfo = (type?: string, probability?: number) => {
    const types: Record<string, { icon: string; name: string; description: string; color: string }> = {
      'BECMG': {
        icon: '🔄',
        name: 'BECMG',
        description: 'Постепенное изменение',
        color: '#1a6fc4'
      },
      'TEMPO': {
        icon: '⏱️', 
        name: 'TEMPO',
        description: 'Временные колебания',
        color: '#ffd700'
      },
      'PROB': {
        icon: '🎲',
        name: `PROB${probability || 30}`,
        description: `Вероятность ${probability || 30}%`,
        color: '#9d4edd'
      },
      'FM': {
        icon: '🛬',
        name: 'FM',
        description: 'Резкое изменение',
        color: '#64ffda'
      }
    };

    return types[type || ''] || { 
      icon: '📊', 
      name: 'ОСНОВНОЙ', 
      description: 'Основной прогноз',
      color: '#8892b0'
    };
  };

  const getWeatherIcon = (phenomenon: string): string => {
    const icons: Record<string, string> = {
      'RA': '🌧️', 'SN': '❄️', 'FG': '🌫️', 'BR': '💨', 'HZ': '😶‍🌫️',
      'TS': '⛈️', 'DZ': '🌦️', 'GR': '🧊', 'GS': '🌨️', 'PL': '🌧️❄️',
      'SG': '🌨️', 'IC': '🧊', 'UP': '💧', 'SQ': '💨', 'FC': '🌪️',
      'DS': '🏜️', 'SS': '🌪️', 'VA': '🌋', 'PO': '🌀', 'DU': '🏜️',
      'SA': '🌪️'
    };
    return icons[phenomenon] || '🌤️';
  };

  // Функция для проверки, есть ли данные в прогнозе
  const hasForecastData = (period: TafForecast): boolean => {
    return !!(period.wind || period.visibility || 
             (period.weather && period.weather.length > 0) || 
             (period.clouds && period.clouds.length > 0) ||
             period.turbulence || period.icing ||
             (period.temperature && period.temperature.length > 0));
  };

  // Функция для рендеринга элементов прогноза с проверкой на наличие данных
const renderForecastElements = (period: TafForecast, changeType?: string) => {
  const elements: React.ReactElement[] = [];
  const isChangePeriod = !!changeType;
  const isFmPeriod = changeType === 'FM';

  // Ветер - показываем всегда если есть
  if (period.wind) {
    elements.push(
      <WeatherItem key="wind">
        <div className="weather-label">
          <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>💨</span>
          Ветер
        </div>
        <WeatherValue>
          {getWindDescription(period.wind)}
        </WeatherValue>
      </WeatherItem>
    );
  } else if (!isChangePeriod || isFmPeriod) {
    elements.push(
      <WeatherItem key="wind">
        <div className="weather-label">
          <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>💨</span>
          Ветер
        </div>
        <WeatherValue>
          Не указан
        </WeatherValue>
      </WeatherItem>
    );
  }

  // Видимость - аналогичная логика
  if (period.visibility) {
    elements.push(
      <WeatherItem key="visibility">
        <div className="weather-label">
          <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>👁️</span>
          Видимость
        </div>
        <WeatherValue>
          {getVisibilityDescription(period.visibility)}
        </WeatherValue>
      </WeatherItem>
    );
  } else if (!isChangePeriod || isFmPeriod) {
    elements.push(
      <WeatherItem key="visibility">
        <div className="weather-label">
          <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>👁️</span>
          Видимость
        </div>
        <WeatherValue>
          Не указана
        </WeatherValue>
      </WeatherItem>
    );
  }

  // НОВОЕ: Вертикальная видимость (показываем отдельно от облачности)
  if (period.verticalVisibility) {
    elements.push(
      <WeatherItem key="vertical-visibility">
        <div className="weather-label">
          <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>⬇️</span>
          Вертикальная видимость
        </div>
        <WeatherValue>
          <div className="vertical-visibility-item">
            <strong>{period.verticalVisibility.altitude} ft</strong>
            <div style={{ fontSize: '0.8rem', color: '#8892b0', marginTop: '2px' }}>
              (Небо не видно)
            </div>
          </div>
        </WeatherValue>
      </WeatherItem>
    );
  }

  // Погодные явления - показываем всегда
  elements.push(
    <WeatherItem key="weather">
      <div className="weather-label">
        <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>🌦️</span>
        Погодные явления
      </div>
      <WeatherValue>
        {period.weather && period.weather.length > 0 ? (
          <WeatherGroup>
            {period.weather.map((weather: TafWeather, idx: number) => (
              <div key={idx} className="weather-badge">
                <span style={{ marginRight: '5px' }}>
                  {getWeatherIcon(weather.phenomena[0])}
                </span>
                {getWeatherDescription(weather)}
                <code className="weather-code">{weather.raw}</code>
              </div>
            ))}
          </WeatherGroup>
        ) : (
          <span style={{ color: '#64ffda' }}>
            {isChangePeriod && !isFmPeriod ? 'Без изменений' : 'Нет значительных явлений'}
          </span>
        )}
      </WeatherValue>
    </WeatherItem>
  );

  // Облачность - показываем всегда, но исключаем VV из списка облаков
  elements.push(
    <WeatherItem key="clouds">
      <div className="weather-label">
        <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>☁️</span>
        Облачность
      </div>
      <WeatherValue>
        {period.clouds && period.clouds.filter(cloud => !cloud.isVerticalVisibility).length > 0 ? (
          <WeatherGroup>
            {period.clouds
              .filter(cloud => !cloud.isVerticalVisibility) // Исключаем VV из облаков
              .map((cloud: TafCloud, idx: number) => (
                <div key={idx} className={`cloud-item ${cloud.isCeiling ? 'ceiling' : ''} ${cloud.type === 'CB' ? 'cb' : ''}`}>
                  <div className="cloud-header">
                    <strong>{cloud.coverage.toUpperCase()}{cloud.type ? `/${cloud.type}` : ''}</strong>
                    <span>на {cloud.altitude} ft</span>
                  </div>
                  <div className="cloud-description">
                    {getCloudDescriptionWithHazards(cloud)}
                  </div>
                </div>
              ))}
          </WeatherGroup>
        ) : (
          <span style={{ color: '#64ffda' }}>
            {isChangePeriod && !isFmPeriod ? 'Без изменений' : 'Нет значительной облачности'}
          </span>
        )}
      </WeatherValue>
    </WeatherItem>
  );

    // ИСПРАВЛЕНИЕ: Для FM показываем все элементы, как для основного прогноза
    if (isFmPeriod) {
      return <WeatherGrid>{elements}</WeatherGrid>;
    }

    // Для других изменений показываем только сетку с существующими элементами
    if (isChangePeriod) {
      const changeElements = elements.filter(element => {
        // Для изменений показываем только те элементы, где есть данные
        const key = element.key;
        if (key === 'wind' && !period.wind) return false;
        if (key === 'visibility' && !period.visibility) return false;
        if (key === 'weather' && (!period.weather || period.weather.length === 0)) return false;
        if (key === 'clouds' && (!period.clouds || period.clouds.length === 0)) return false;
        return true;
      });

      if (changeElements.length === 0) {
        return (
          <div style={{ 
            textAlign: 'center', 
            padding: '20px', 
            color: '#8892b0',
            fontStyle: 'italic'
          }}>
            Изменения не содержат конкретных метеоданных
          </div>
        );
      }

      return <WeatherGrid>{changeElements}</WeatherGrid>;
    }

    // Для основного прогноза показываем все элементы
    return <WeatherGrid>{elements}</WeatherGrid>;
  };

  // Функция для рендеринга опасных явлений
  const renderDangerElements = (period: TafForecast, changeType?: string) => {
    const dangerElements: React.ReactElement[] = [];
    const isChangePeriod = !!changeType;

    // Опасные явления (турбулентность, обледенение)
    if (period.turbulence || period.icing) {
      dangerElements.push(
        <DangerSection key="danger">
          <h4>⚠️ Опасные явления</h4>
          <div className="danger-grid">
            {period.turbulence && (
              <div className="danger-item">
                <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>💨</span>
                {getTurbulenceDescription(period.turbulence)}
              </div>
            )}
            {period.icing && (
              <div className="danger-item">
                <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>🧊</span>
                {getIcingDescription(period.icing)}
              </div>
            )}
          </div>
        </DangerSection>
      );
    }

    // Предупреждения для CB облаков
    const cbHazards = getCbHazardsDescription(period.clouds || []);
    if (cbHazards.length > 0) {
      dangerElements.push(
        <DangerSection key="cb-hazards">
          <h4>🌩️ Опасности CB облаков</h4>
          <div className="danger-grid">
            {cbHazards.map((hazard, idx) => (
              <div key={idx} className="danger-item">
                • {hazard}
              </div>
            ))}
          </div>
        </DangerSection>
      );
    }

    // Для изменений показываем только если есть опасные явления
    if (isChangePeriod && dangerElements.length === 0) {
      return null;
    }

    return dangerElements;
  };

  // Функция для рендеринга температуры
  const renderTemperature = (period: TafForecast, changeType?: string) => {
    const isChangePeriod = !!changeType;
    
    if (!period.temperature || period.temperature.length === 0) {
      // Для изменений не показываем температуру если её нет
      if (isChangePeriod) return null;
      
      // Для основного прогноза показываем пустой блок
      return (
        <WeatherGrid>
          <WeatherItem>
            <div className="weather-label">
              <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>🌡️</span>
              Температура
            </div>
            <WeatherValue>
              <span style={{ color: '#8892b0' }}>Не указана</span>
            </WeatherValue>
          </WeatherItem>
        </WeatherGrid>
      );
    }

    // ИСПРАВЛЕНИЕ: Сортируем температуры - сначала максимальная, потом минимальная
    const sortedTemperatures = [...period.temperature].sort((a, b) => {
      if (a.type === 'max' && b.type === 'min') return -1;
      if (a.type === 'min' && b.type === 'max') return 1;
      return 0;
    });

    return (
      <WeatherGrid>
        {sortedTemperatures.map((temp, idx) => (
          <WeatherItem key={`${temp.type}-${idx}`}>
            <div className="weather-label">
              <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>
                {temp.type === 'max' ? '📈' : '📉'}
              </span>
              {temp.type === 'max' ? 'Максимальная' : 'Минимальная'} температура
            </div>
            <WeatherValue>
              <strong>{temp.value > 0 ? '+' : ''}{temp.value}°C</strong>
              <div style={{ fontSize: '0.8rem', color: '#8892b0', marginTop: '2px' }}>
                в {formatTafTimeForDisplay(temp.time)}
              </div>
            </WeatherValue>
          </WeatherItem>
        ))}
      </WeatherGrid>
    );
  };

  return (
    <TafContainer>
      {/* Заголовок с общей информацией */}
      <TafHeader>
        <div className="header-main">
          <h3>📅 Авиационный прогноз (TAF) - {tafData.icaoCode || icaoCode}</h3>
          <StatusIndicator>
            ✅ Актуальный прогноз
          </StatusIndicator>
        </div>
        <div className="taf-meta">
          <InfoSection>
            <WeatherValue>
              <strong>Выпущен:</strong> {formatTafTimeForDisplay(tafData.issuanceTime)}
            </WeatherValue>
          </InfoSection>
          <InfoSection>
            <WeatherValue>
              <strong>Действителен:</strong> {formatTafTimeForDisplay(tafData.validity.from)} — {formatTafTimeForDisplay(tafData.validity.to)}
            </WeatherValue>
          </InfoSection>
          <InfoSection>
            <WeatherValue>
              <strong>Периодов прогноза:</strong> {tafData.forecast.length}
            </WeatherValue>
          </InfoSection>
        </div>
      </TafHeader>

      {/* Исходный код TAF */}
      <div style={{ marginBottom: '25px' }}>
        <h4 style={{ color: '#64ffda', marginBottom: '10px' }}>📋 Исходный TAF:</h4>
        <TafCode>{tafData.raw}</TafCode>
      </div>

      {/* Периоды прогноза */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {tafData.forecast.map((period, index) => {
          const changeInfo = getChangeTypeInfo(period.changeType, period.probability);
          const hasDanger = !!(period.turbulence || period.icing || period.clouds?.some(c => c.type === 'CB'));
          const isChangePeriod = !!period.changeType;
          
          return (
            <PeriodCard key={index} $hasDanger={hasDanger}>
              {/* Заголовок периода */}
              <PeriodHeader>
                <div className="period-main">
                  <ChangeIndicator color={changeInfo.color}>
                    {changeInfo.icon} {changeInfo.name}
                    {period.probability && ` ${period.probability}%`}
                  </ChangeIndicator>
                  <div className="period-time">
                    {formatTafTimeForDisplay(period.validity.from)} — {formatTafTimeForDisplay(period.validity.to)}
                  </div>
                </div>
                <div className="period-description">
                  {changeInfo.description}
                  {isChangePeriod && !hasForecastData(period) && (
                    <span style={{ color: '#ffd700', marginLeft: '10px' }}>
                      (Общие изменения)
                    </span>
                  )}
                </div>
              </PeriodHeader>

              {/* Основные данные */}
              {renderForecastElements(period, period.changeType)}

              {/* Опасные явления */}
              {renderDangerElements(period, period.changeType)}

              {/* Температура */}
              {renderTemperature(period, period.changeType)}
            </PeriodCard>
          );
        })}
      </div>
    </TafContainer>
  );
};