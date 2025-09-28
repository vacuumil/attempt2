// src/components/meteorology/components/TafDisplay/TafDisplay.tsx
import React, { useState, useMemo } from 'react';
import type { ParsedTaf, TurbulenceInfo, IcingInfo, TemperatureInfo } from '../../utils/tafParser';
import { 
  getWindDescription, 
  getVisibilityDescription, 
  getWeatherDescription, 
  getCloudDescriptionWithHazards,
  getCbHazardsDescription
} from '../../utils/tafParser';
import {
  TafContainer,
  TafPeriod,
  ForecastGroup,
  WeatherTimeline,
  TimelineItem,
  ChangeIndicator
} from './TafDisplay.styles';

interface TafDisplayProps {
  tafData: ParsedTaf | null;
  icaoCode: string;
}

export const TafDisplay: React.FC<TafDisplayProps> = ({ tafData, icaoCode }) => {
  const [expandedPeriods, setExpandedPeriods] = useState<Set<number>>(new Set([0]));

  // Выносим useMemo ДО любого условия
  const activePeriodIndex = useMemo(() => {
    if (!tafData || !tafData.forecast || tafData.forecast.length === 0) {
      return -1;
    }

    const now = new Date();
    const currentDay = now.getUTCDate().toString().padStart(2, '0');
    const currentTime = now.getUTCHours().toString().padStart(2, '0') + 
                       now.getUTCMinutes().toString().padStart(2, '0');

    return tafData.forecast.findIndex(period => {
      if (!period || !period.validity.from || !period.validity.to) return false;
      
      const fromDay = period.validity.from.slice(0, 2);
      const fromTime = period.validity.from.slice(2, 6);
      const toTime = period.validity.to.slice(2, 6);

      // Упрощенная проверка актуальности периода
      return fromDay === currentDay && fromTime <= currentTime && currentTime <= toTime;
    });
  }, [tafData]);

  // Теперь можно делать проверку после хуков
  if (!tafData || !tafData.forecast || tafData.forecast.length === 0) {
    return (
      <TafContainer>
        <div style={{ textAlign: 'center', padding: '40px', color: '#8892b0' }}>
          <h3 style={{ color: '#ff6b6b', marginBottom: '15px' }}>❌ Данные TAF недоступны</h3>
          <p>Не удалось загрузить или распарсить TAF для аэропорта {icaoCode}</p>
        </div>
      </TafContainer>
    );
  }

  const togglePeriod = (index: number) => {
    const newExpanded = new Set(expandedPeriods);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedPeriods(newExpanded);
  };

  const formatValidity = (from: string, to: string): string => {
    if (!from || !to) return 'Время не указано';
    
    try {
      const fromDay = parseInt(from.slice(0, 2));
      const fromHour = from.slice(2, 4);
      const fromMinute = from.slice(4, 6) || '00';
      
      const toDay = parseInt(to.slice(0, 2));
      const toHour = to.slice(2, 4);
      const toMinute = to.slice(4, 6) || '00';
      
      // Если дни разные, показываем оба дня
      if (fromDay !== toDay) {
        return `${fromDay}.${fromHour}:${fromMinute} - ${toDay}.${toHour}:${toMinute}Z`;
      }
      
      return `${fromHour}:${fromMinute} - ${toHour}:${toMinute}Z`;
    } catch (error) {
      console.warn('Ошибка формата периода:', from, to, error);
      return 'Ошибка формата периода';
    }
  };

  // Вспомогательная функция для названий месяцев
  const getMonthName = (month: number): string => {
    const months = [
      'янв', 'фев', 'мар', 'апр', 'мая', 'июн',
      'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
    ];
    return months[month - 1] || '';
  };

  const formatDate = (timeString: string): string => {
    if (!timeString || timeString.length < 4) return 'Время не указано';
    
    try {
      // Для времени выпуска (DDHHMMZ) - 6 или 7 символов
      if (timeString.length >= 6) {
        const day = timeString.slice(0, 2);
        const hour = timeString.slice(2, 4);
        const minute = timeString.length >= 6 ? timeString.slice(4, 6) : '00';
        
        // Определяем месяц и год
        const now = new Date();
        const currentYear = now.getUTCFullYear();
        const currentMonth = now.getUTCMonth() + 1;
        
        const dayNum = parseInt(day);
        let month = currentMonth;
        let year = currentYear;
        
        // Если день меньше текущего, предполагаем следующий месяц
        const currentDay = now.getUTCDate();
        if (dayNum < currentDay) {
          month = currentMonth === 12 ? 1 : currentMonth + 1;
          year = currentMonth === 12 ? currentYear + 1 : currentYear;
        }
        
        return `${dayNum} ${getMonthName(month)} ${year}, ${hour}:${minute}Z`;
      }
      
      // Для периодов (HHMM) - 4 символа
      if (timeString.length === 4) {
        const hour = timeString.slice(0, 2);
        const minute = timeString.slice(2, 4);
        return `${hour}:${minute}Z`;
      }
      
      return timeString;
    } catch (error) {
      console.warn('Ошибка формата времени:', timeString, error);
      return 'Ошибка формата времени';
    }
  };

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

  const getPeriodSummary = (period: ParsedTaf['forecast'][0]) => {
    const summary = [];
    
    if (period.wind) {
      const windDir = period.wind.direction === 'VRB' ? 'Перем' : period.wind.direction;
      summary.push(`💨 ${windDir}°/${period.wind.speed}kt`);
    }
    
    if (period.visibility) {
      summary.push(`👁️ ${period.visibility.isCavok ? 'CAVOK' : period.visibility.value + 'm'}`);
    } else {
      summary.push(`👁️ Не указана`);
    }
    
    if (period.weather && period.weather.length > 0) {
      const mainWeather = period.weather[0];
      summary.push(getWeatherIcon(mainWeather.phenomena[0]));
    }
    
    if (period.clouds && period.clouds.length > 0) {
      const mainCloud = period.clouds.find(c => c.isCeiling) || period.clouds[0];
      summary.push(`☁️ ${mainCloud.coverage.charAt(0)}`);
    } else {
      summary.push(`☁️ NSC`);
    }

    return summary.join(' • ');
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

  const getTurbulenceDescription = (turbulence: TurbulenceInfo) => {
    const intensityMap: Record<string, string> = {
      'light': 'Слабая',
      'light_moderate': 'Умеренно-слабая', 
      'moderate': 'Умеренная',
      'moderate_severe': 'Умеренно-сильная',
      'severe': 'Сильная',
      'extreme': 'Экстремальная'
    };

    return `${intensityMap[turbulence.intensity]} турбулентность на ${turbulence.minAltitude}-${turbulence.maxAltitude} ft`;
  };

  const getIcingDescription = (icing: IcingInfo) => {
    const intensityMap: Record<string, string> = {
      'light': 'Слабое',
      'light_moderate': 'Умеренно-слабое',
      'moderate': 'Умеренное', 
      'severe': 'Сильное'
    };

    return `${intensityMap[icing.intensity]} обледенение на ${icing.minAltitude}-${icing.maxAltitude} ft`;
  };

  const getCeilingInfo = (clouds: ParsedTaf['forecast'][0]['clouds']) => {
    if (!clouds || clouds.length === 0) return 'Нижняя граница: нет';
    const ceiling = clouds.find(cloud => cloud.isCeiling);
    return ceiling ? `Нижняя граница: ${ceiling.altitude} ft` : 'Нижняя граница: нет';
  };

  const getTemperatureDescription = (temp: TemperatureInfo): string => {
    const typeText = temp.type === 'max' ? 'Максимальная' : 'Минимальная';
    return `${typeText}: ${temp.value > 0 ? '+' : ''}${temp.value}°C в ${formatDate(temp.time)}`;
  };

  // Получаем общую информацию о TAF с защитой от undefined
  const getTafOverview = () => {
    const mainPeriod = tafData.forecast[0];
    if (!mainPeriod) {
      return {
        hasSignificantWeather: false,
        mainWind: undefined,
        mainVisibility: undefined,
        ceiling: 'Нижняя граница: нет данных'
      };
    }

    const hasSignificantWeather = tafData.forecast.some(period => 
      period.weather && period.weather.length > 0 || period.turbulence || period.icing
    );
    
    return {
      hasSignificantWeather,
      mainWind: mainPeriod.wind,
      mainVisibility: mainPeriod.visibility,
      ceiling: getCeilingInfo(mainPeriod.clouds)
    };
  };

  const tafOverview = getTafOverview();

  return (
    <TafContainer>
      {/* Заголовок с общей информацией */}
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h3 style={{ color: '#64ffda', marginBottom: '10px', fontSize: '1.8rem' }}>
          📅 Авиационный прогноз (TAF) - {icaoCode}
        </h3>
        <div style={{ color: '#8892b0', lineHeight: '1.6' }}>
          <div>
            <strong>Выпущен:</strong> {tafData.issuanceTime ? formatDate(tafData.issuanceTime) : 'Не указано'}
          </div>
          <div>
            <strong>Действителен:</strong> {formatDate(tafData.validity.from)} - {formatDate(tafData.validity.to)}
          </div>
          {activePeriodIndex !== -1 && (
            <div style={{ color: '#64ffda', marginTop: '5px' }}>
              ✅ <strong>Активный период:</strong> {activePeriodIndex + 1}-й из {tafData.forecast.length}
            </div>
          )}
        </div>
      </div>

      {/* Исходные данные */}
      <div style={{ marginTop: '25px' }}>

        {/* Исходные данные TAF */}
        <div style={{ 
          padding: '15px',
          background: 'rgba(10, 25, 47, 0.5)',
          borderRadius: '8px',
          border: '1px solid #64ffda'
        }}>
          <h4 style={{ color: '#64ffda', marginBottom: '10px' }}>📋 Исходный TAF:</h4>
          <code style={{ 
            display: 'block',
            padding: '10px',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '6px',
            fontSize: '0.9rem',
            color: '#e6f1ff',
            fontFamily: 'Share Tech Mono, monospace',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all'
          }}>
            {tafData.raw}
          </code>
        </div>
      </div>

      {/* Температура */}
      {tafData.temperature && tafData.temperature.length > 0 && (
        <div style={{ 
          background: 'rgba(255, 107, 107, 0.1)',
          border: '1px solid #ff6b6b',
          borderRadius: '8px',
          padding: '10px',
          marginTop: '10px'
        }}>
          <strong>🌡️ Температура:</strong>
          {tafData.temperature.map((temp, idx) => (
            <div key={idx} style={{ marginLeft: '10px', fontSize: '0.9rem' }}>
              {getTemperatureDescription(temp)}
            </div>
          ))}
        </div>
      )}

      {/* Краткий обзор условий */}
      <div style={{ 
        background: 'rgba(26, 111, 196, 0.1)',
        border: '1px solid #1a6fc4',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
        marginTop: '20px',
      }}>
        <h4 style={{ color: '#64ffda', marginBottom: '10px' }}>📊 Краткий обзор:</h4>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px',
          color: '#e6f1ff',
          fontSize: '0.9rem'
        }}>
          <div>💨 <strong>Ветер:</strong> {tafOverview.mainWind ? getWindDescription(tafOverview.mainWind) : 'Не указан'}</div>
          <div>👁️ <strong>Видимость:</strong> {tafOverview.mainVisibility ? getVisibilityDescription(tafOverview.mainVisibility) : 'Не указана'}</div>
          <div>☁️ <strong>{tafOverview.ceiling}</strong></div>
          <div>⚠️ <strong>Опасные явления:</strong> {tafOverview.hasSignificantWeather ? 'Есть' : 'Нет'}</div>
        </div>
      </div>

      {/* Периоды прогноза */}
      {tafData.forecast.map((period, index) => {
        if (!period) return null;
        
        const changeInfo = getChangeTypeInfo(period.changeType, period.probability);
        const isExpanded = expandedPeriods.has(index);
        const isActive = index === activePeriodIndex;
        const isFuture = index > (activePeriodIndex !== -1 ? activePeriodIndex : 0);
        
        return (
          <TafPeriod key={index} isExpanded={isExpanded}>
            <div 
              className="period-header"
              onClick={() => togglePeriod(index)}
              style={{
                borderLeft: isActive ? '4px solid #64ffda' : 
                           isFuture ? '4px solid #ffd700' : '4px solid #1a6fc4'
              }}
            >
              <div className="validity">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <strong style={{ fontSize: '1.1rem' }}>
                    {formatValidity(period.validity.from, period.validity.to)}
                  </strong>
                  {isActive && (
                    <span style={{
                      background: '#64ffda',
                      color: '#0a192f',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      🔴 АКТИВНО
                    </span>
                  )}
                  {isFuture && (
                    <span style={{
                      background: '#ffd700',
                      color: '#0a192f',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '0.8rem'
                    }}>
                      ⏳ БУДУЩЕЕ
                    </span>
                  )}
                </div>
                
                <ChangeIndicator type={period.changeType || 'MAIN'}>
                  {changeInfo.icon} {changeInfo.name}
                </ChangeIndicator>
                
                {period.probability && (
                  <span style={{ 
                    background: 'rgba(157, 78, 221, 0.3)',
                    color: '#9d4edd',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem'
                  }}>
                    🎲 {period.probability}%
                  </span>
                )}
              </div>
              
              <div className="weather-summary">
                {getPeriodSummary(period)}
              </div>
            </div>

            {isExpanded && (
              <ForecastGroup>
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: changeInfo.color, marginBottom: '15px' }}>
                    {changeInfo.icon} {changeInfo.description}
                  </h4>
                  <div style={{ 
                    color: '#8892b0', 
                    fontSize: '0.9rem',
                    lineHeight: '1.4'
                  }}>
                    <strong>Период:</strong> {formatDate(period.validity.from)} - {formatDate(period.validity.to)} UTC
                    {period.probability && (
                      <span style={{ marginLeft: '15px' }}>
                        <strong>Вероятность:</strong> {period.probability}%
                      </span>
                    )}
                  </div>
                </div>

                <WeatherTimeline>
                  {/* Ветер */}
                  {period.wind ? (
                    <TimelineItem>
                      <strong>🌬️ Ветер:</strong> 
                      <div style={{ marginLeft: '10px', marginTop: '5px' }}>
                        {getWindDescription(period.wind)}
                      </div>
                    </TimelineItem>
                  ) : (
                    <TimelineItem>
                      <strong>🌬️ Ветер:</strong> 
                      <span style={{ marginLeft: '10px', color: '#8892b0' }}>Не указан</span>
                    </TimelineItem>
                  )}

                  {/* Видимость */}
                  {period.visibility ? (
                    <TimelineItem>
                      <strong>👁️ Видимость:</strong> 
                      <div style={{ marginLeft: '10px', marginTop: '5px' }}>
                        {getVisibilityDescription(period.visibility)}
                      </div>
                    </TimelineItem>
                  ) : (
                    <TimelineItem>
                      <strong>👁️ Видимость:</strong> 
                      <span style={{ marginLeft: '10px', color: '#8892b0' }}>Не указана</span>
                    </TimelineItem>
                  )}

                  {/* Погодные явления */}
                  {period.weather && period.weather.length > 0 ? (
                    <TimelineItem>
                      <strong>🌦️ Погодные явления:</strong>
                      {period.weather.map((weather, idx) => (
                        <div key={idx} style={{ 
                          marginLeft: '10px', 
                          marginTop: '5px',
                          padding: '8px',
                          background: 'rgba(26, 111, 196, 0.1)',
                          borderRadius: '6px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>{getWeatherIcon(weather.phenomena[0])}</span>
                            <span>{getWeatherDescription(weather)}</span>
                          </div>
                          <code style={{ 
                            fontSize: '0.8rem', 
                            color: '#64ffda',
                            marginTop: '4px',
                            display: 'block'
                          }}>
                            {weather.raw}
                          </code>
                        </div>
                      ))}
                    </TimelineItem>
                  ) : (
                    <TimelineItem>
                      <strong>🌦️ Погодные явления:</strong>
                      <span style={{ marginLeft: '10px', color: '#64ffda' }}>
                        Нет значительных явлений
                      </span>
                    </TimelineItem>
                  )}

                  {/* Облачность */}
                  {period.clouds && period.clouds.length > 0 ? (
                    <TimelineItem>
                      <strong>☁️ Облачность:</strong>
                      {period.clouds.map((cloud, idx) => (
                        <div key={idx} style={{ 
                          marginLeft: '10px', 
                          marginTop: '5px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}>
                          <span style={{ 
                            background: cloud.isCeiling ? 'rgba(255, 107, 107, 0.2)' : 
                                      cloud.type === 'CB' ? 'rgba(255, 215, 0, 0.3)' :
                                      'rgba(100, 255, 218, 0.2)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            fontWeight: cloud.isCeiling ? 'bold' : 'normal',
                            border: cloud.type === 'CB' ? '1px solid #ffd700' : 'none'
                          }}>
                            {cloud.coverage.toUpperCase()}{cloud.type ? `/${cloud.type}` : ''}
                          </span>
                          <span>{getCloudDescriptionWithHazards(cloud)}</span>
                        </div>
                      ))}
                      
                      {/* Показываем предупреждения для CB */}
                      {getCbHazardsDescription(period.clouds).length > 0 && (
                        <div style={{ 
                          marginLeft: '10px',
                          marginTop: '8px',
                          padding: '8px',
                          background: 'rgba(255, 215, 0, 0.1)',
                          border: '1px solid #ffd700',
                          borderRadius: '6px'
                        }}>
                          <strong style={{ color: '#ffd700' }}>⚠️ Опасные явления:</strong>
                          {getCbHazardsDescription(period.clouds).map((hazard, idx) => (
                            <div key={idx} style={{ fontSize: '0.8rem', marginTop: '2px' }}>
                              • {hazard}
                            </div>
                          ))}
                        </div>
                      )}
                    </TimelineItem>
                  ) : (
                    <TimelineItem>
                      <strong>☁️ Облачность:</strong> 
                      <span style={{ marginLeft: '10px', color: '#64ffda' }}>
                        Нет значительной облачности
                      </span>
                    </TimelineItem>
                  )}

                  {/* Турбулентность */}
                  {period.turbulence && (
                    <TimelineItem>
                      <strong>💨 Турбулентность:</strong>
                      <div style={{ marginLeft: '10px', marginTop: '5px', color: '#ffd700' }}>
                        ⚠️ {getTurbulenceDescription(period.turbulence)}
                      </div>
                    </TimelineItem>
                  )}

                  {/* Обледенение */}
                  {period.icing && (
                    <TimelineItem>
                      <strong>🧊 Обледенение:</strong>
                      <div style={{ marginLeft: '10px', marginTop: '5px', color: '#64ffda' }}>
                        ❄️ {getIcingDescription(period.icing)}
                      </div>
                    </TimelineItem>
                  )}

                  {/* Температура периода */}
                  {period.temperature && period.temperature.length > 0 && (
                    <TimelineItem>
                      <strong>🌡️ Температура:</strong>
                      {period.temperature.map((temp, idx) => (
                        <div key={idx} style={{ marginLeft: '10px', marginTop: '5px' }}>
                          {getTemperatureDescription(temp)}
                        </div>
                      ))}
                    </TimelineItem>
                  )}
                </WeatherTimeline>
              </ForecastGroup>
            )}
          </TafPeriod>
        );
      })}
    </TafContainer>
  );
};