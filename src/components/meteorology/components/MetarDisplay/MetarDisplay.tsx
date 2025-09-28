// src/components/meteorology/components/MetarDisplay/MetarDisplay.tsx
import React, { useState } from 'react';
import { 
  getCloudCoverageText, 
  getWeatherConditionText, 
  getAirportName, 
  convertPressureToHpa,
  getModifiersDescription 
} from '../../utils';
import type { ParsedMetar } from '../../utils';
import {
  MetarContainer,
  RawMetar,
  DecodingTable,
  TableRow,
  ParameterCell,
  DecodingCell,
  ShowMoreButton,
  EducationalSection,
  EducationalContent,
  TimeInfo,
  RemarksSection,
  RemarkItem,
  RemarkTypeBadge
} from './MetarDisplay.styles';

interface MetarDisplayProps {
  rawMetar: string;
  metarData: ParsedMetar;
}

export const MetarDisplay: React.FC<MetarDisplayProps> = ({ rawMetar, metarData }) => {
  const [showEducational, setShowEducational] = useState(false);
  const [showRemarks, setShowRemarks] = useState(false);

  const formatTime = (timeString: string): string => {
    if (!timeString || timeString.length !== 7) return 'Не доступно';
    const day = timeString.slice(0, 2);
    const hour = timeString.slice(2, 4);
    const minute = timeString.slice(4, 6);
    return `${day} числа, ${hour}:${minute} UTC`;
  };

  const decodeWind = (wind: ParsedMetar['wind']): string => {
    if (wind.isCalm) {
      return 'Штиль';
    }

    if (wind.direction === null) {
      return `Переменный ветер ${wind.speed} ${wind.unit.toLowerCase()}`;
    }
    
    let directionText = '';
    if (wind.direction >= 337.5 || wind.direction < 22.5) directionText = 'Северный';
    else if (wind.direction < 67.5) directionText = 'Северо-восточный';
    else if (wind.direction < 112.5) directionText = 'Восточный';
    else if (wind.direction < 157.5) directionText = 'Юго-восточный';
    else if (wind.direction < 202.5) directionText = 'Южный';
    else if (wind.direction < 247.5) directionText = 'Юго-западный';
    else if (wind.direction < 292.5) directionText = 'Западный';
    else directionText = 'Северо-западный';

    let windText = `${directionText} (${wind.direction}°) ${wind.speed} ${wind.unit.toLowerCase()}`;
    
    if (wind.gust) {
      windText += `, порывы до ${wind.gust}`;
    }
    
    // Добавляем информацию о изменяющемся ветре из remarks
    const variableWindRemark = metarData.remarks.find(r => r.type === 'wind');
    if (variableWindRemark) {
      windText += `, ${variableWindRemark.description.toLowerCase()}`;
    }
    
    return windText;
  };

  const formatWindCode = (wind: ParsedMetar['wind']): string => {
    if (wind.direction === null) {
      return `VRB${wind.speed.toString().padStart(2, '0')}${wind.gust ? `G${wind.gust}` : ''}${wind.unit}`;
    }
    return `${wind.direction.toString().padStart(3, '0')}${wind.speed.toString().padStart(2, '0')}${wind.gust ? `G${wind.gust}` : ''}${wind.unit}`;
  };

  const formatPressure = (pressure: ParsedMetar['pressure']): string => {
    if (pressure.isInHg) {
      const pressureValue = pressure.value.toFixed(2);
      const hpaValue = convertPressureToHpa(pressure.value);
      return `${pressureValue} дюймов рт.ст. (≈${Math.round(hpaValue)} гПа)`;
    } else {
      return `${pressure.value} гПа`;
    }
  };

  const formatPressureCode = (pressure: ParsedMetar['pressure']): string => {
    if (pressure.isInHg) {
      return `A${Math.round(pressure.value * 100).toString().padStart(4, '0')}`;
    } else {
      return `Q${pressure.value.toString().padStart(4, '0')}`;
    }
  };

  const formatVisibilityCode = (visibility: ParsedMetar['visibility']): string => {
    if (visibility.isCavok) return 'CAVOK';
    if (visibility.unit === 'SM') {
      return `${visibility.value}SM`; // Просто возвращаем значение + SM
    }
    return visibility.value === 10000 ? '9999' : visibility.value.toString();
  };

  const formatVisibilityText = (visibility: ParsedMetar['visibility']): string => {
    if (visibility.isCavok) {
      return 'Видимость ≥10 км, нет облаков ниже 5000 ft, нет опасных явлений';
    }
    
    if (visibility.unit === 'SM') {
      // Видимость в статутных милях - используем оригинальное значение
      let prefix = '';
      if (visibility.isLessThan) prefix = 'Менее ';
      if (visibility.isGreaterThan) prefix = 'Более ';
      
      const meters = visibility.metersValue || Math.round(visibility.value * 1609.34);
      return `${prefix}${visibility.value} статутных миль (≈${meters} м)`;
    }
    
    if (visibility.value >= 10000) {
      return 'Видимость ≥10 км';
    }
    
    let prefix = '';
    if (visibility.isLessThan) prefix = 'Менее ';
    if (visibility.isGreaterThan) prefix = 'Более ';
    
    return `${prefix}${visibility.value} метров`;
  };

  const getRemarkTypeColor = (type: string): string => {
    const colors: Record<string, string> = {
      'weather': '#ff6b6b',
      'temperature': '#64ffda',
      'pressure': '#1a6fc4',
      'wind': '#ffd700',
      'runway': '#9d4edd',
      'system': '#8892b0',
      'other': '#e6f1ff'
    };
    return colors[type] || '#e6f1ff';
  };

  // Функция для получения иконки типа примечания
  const getRemarkIcon = (type: string): string => {
    const icons: Record<string, string> = {
      'weather': '🌦️',
      'temperature': '🌡️',
      'pressure': '📊',
      'wind': '💨',
      'runway': '🛬',
      'system': '⚙️',
      'other': '📝'
    };
    return icons[type] || '📝';
  };

  return (
    <MetarContainer>
      <RawMetar>
        <code>{rawMetar}</code>
        <TimeInfo>Обновлено: {formatTime(metarData.observationTime)}</TimeInfo>
      </RawMetar>

      <DecodingTable>
        <thead>
          <TableRow>
            <ParameterCell>Параметр</ParameterCell>
            <ParameterCell>Код METAR</ParameterCell>
            <ParameterCell>Расшифровка</ParameterCell>
          </TableRow>
        </thead>
        <tbody>
          <TableRow>
            <ParameterCell>Аэропорт</ParameterCell>
            <ParameterCell><code>{metarData.icaoCode}</code></ParameterCell>
            <DecodingCell>
              <div><strong>{getAirportName(metarData.icaoCode)}</strong></div>
              <div style={{ fontSize: '0.9rem', color: '#8892b0', marginTop: '5px' }}>
                Код ICAO: {metarData.icaoCode}
              </div>
            </DecodingCell>
          </TableRow>

          <TableRow>
            <ParameterCell>Время наблюдения</ParameterCell>
            <ParameterCell><code>{metarData.observationTime || 'N/A'}</code></ParameterCell>
            <DecodingCell>{formatTime(metarData.observationTime)}</DecodingCell>
          </TableRow>

          {/* Секция модификаторов - показываем только если есть активные модификаторы */}
          {(metarData.modifiers.isAuto || 
            metarData.modifiers.isCorrected || 
            metarData.modifiers.isAmended || 
            metarData.modifiers.isMissing) && (
            <TableRow>
              <ParameterCell>Модификаторы</ParameterCell>
              <ParameterCell>
                <code>
                  {metarData.modifiers.isAuto && 'AUTO '}
                  {metarData.modifiers.isCorrected && 'COR '}
                  {metarData.modifiers.isAmended && 'AMD '}
                  {metarData.modifiers.isMissing && 'NIL'}
                </code>
              </ParameterCell>
              <DecodingCell>
                {getModifiersDescription(metarData.modifiers).map((desc: string, idx: number) => (
                  <div key={idx} style={{ color: '#ffd700', marginBottom: '5px' }}>
                    {desc}
                  </div>
                ))}
              </DecodingCell>
            </TableRow>
          )}

          <TableRow>
            <ParameterCell>Ветер</ParameterCell>
            <ParameterCell>
              <code>{formatWindCode(metarData.wind)}</code>
              {metarData.wind.variableFrom && metarData.wind.variableTo && (
                <div style={{ fontSize: '0.8rem', color: '#ffd700', marginTop: '5px' }}>
                  {metarData.wind.variableFrom}V{metarData.wind.variableTo}
                </div>
              )}
            </ParameterCell>
            <DecodingCell>
              {decodeWind(metarData.wind)}
              {metarData.wind.variableFrom && metarData.wind.variableTo && (
                <div style={{ color: '#ffd700', fontSize: '0.9rem', marginTop: '5px' }}>
                  💨 Ветер переменный от {metarData.wind.variableFrom}° до {metarData.wind.variableTo}°
                </div>
              )}
            </DecodingCell>
          </TableRow>

          <TableRow>
            <ParameterCell>Видимость</ParameterCell>
            <ParameterCell>
              <code>{formatVisibilityCode(metarData.visibility)}</code>
              {metarData.visibility.unit === 'SM' && (
                <div style={{ fontSize: '0.8rem', color: '#ffd700', marginTop: '5px' }}>
                  в статутных милях
                </div>
              )}
            </ParameterCell>
            <DecodingCell>
              {formatVisibilityText(metarData.visibility)}
            </DecodingCell>
          </TableRow>

          {metarData.weatherConditions.length > 0 && (
            <TableRow>
              <ParameterCell>Погодные явления</ParameterCell>
              <ParameterCell>
                <code>{metarData.weatherConditions.join(' ')}</code>
              </ParameterCell>
              <DecodingCell>
                {metarData.weatherConditions.map(condition => 
                  getWeatherConditionText(condition)
                ).join(', ')}
              </DecodingCell>
            </TableRow>
          )}

          {metarData.clouds.length > 0 ? (
            metarData.clouds.map((cloud, index) => (
              <TableRow key={index}>
                <ParameterCell>Облачность {index + 1}</ParameterCell>
                <ParameterCell>
                  <code>{cloud.coverage}{(cloud.altitude / 100).toString().padStart(3, '0')}</code>
                </ParameterCell>
                <DecodingCell>
                  {getCloudCoverageText(cloud.coverage)} с нижней границей {cloud.altitude} ft
                  {cloud.isVerticalVisibility && ' (вертикальная видимость)'}
                </DecodingCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <ParameterCell>Облачность</ParameterCell>
              <ParameterCell><code>NSC</code></ParameterCell>
              <DecodingCell>Нет значительной облачности</DecodingCell>
            </TableRow>
          )}

          <TableRow>
            <ParameterCell>Температура/Точка росы</ParameterCell>
            <ParameterCell>
              <code>{metarData.temperature.value}/{metarData.temperature.dewpoint}</code>
            </ParameterCell>
            <DecodingCell>
              Температура: {metarData.temperature.value}°C, Точка росы: {metarData.temperature.dewpoint}°C
            </DecodingCell>
          </TableRow>

          <TableRow>
            <ParameterCell>Давление</ParameterCell>
            <ParameterCell>
              <code>{formatPressureCode(metarData.pressure)}</code>
            </ParameterCell>
            <DecodingCell>{formatPressure(metarData.pressure)}</DecodingCell>
          </TableRow>

          {metarData.runwayConditions.length > 0 && (
            metarData.runwayConditions.map((runway, index) => (
              <TableRow key={`runway-${index}`}>
                <ParameterCell>Состояние ВПП {runway.runway}</ParameterCell>
                <ParameterCell>
                  <code>R{runway.runway}/{runway.conditionCode}</code>
                </ParameterCell>
                <DecodingCell>
                  {runway.conditionCode.startsWith('CLRD') ? (
                    <div style={{ lineHeight: '1.6', color: '#64ffda' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px',
                        fontWeight: 'bold',
                        marginBottom: '10px'
                      }}>
                        <span style={{ fontSize: '1.2rem' }}>✅</span>
                        <span>ПОЛОСА ЧИСТАЯ</span>
                      </div>
                      <div><strong>Статус:</strong> Очищена и сухая</div>
                      <div><strong>Покрытие:</strong> Отсутствует</div>
                      <div><strong>Сцепление:</strong> {runway.friction || 'Отличное'}</div>
                      {runway.conditionCode.length > 4 && (
                        <div><strong>Код:</strong> {runway.conditionCode}</div>
                      )}
                    </div>
                  ) : (
                    <div style={{ lineHeight: '1.6' }}>
                      {runway.depositType ? (
                        <div><strong>Тип покрытия:</strong> {runway.depositType}</div>
                      ) : (
                        <div><strong>Тип покрытия:</strong> Данные отсутствуют</div>
                      )}
                      {runway.contamination ? (
                        <div><strong>Площадь покрытия:</strong> {runway.contamination}</div>
                      ) : (
                        <div><strong>Площадь покрытия:</strong> Данные отсутствуют</div>
                      )}
                      {runway.depth ? (
                        <div><strong>Глубина:</strong> {runway.depth}</div>
                      ) : (
                        <div><strong>Глубина:</strong> Данные отсутствуют</div>
                      )}
                      {runway.friction ? (
                        <div><strong>Сцепление:</strong> {runway.friction}</div>
                      ) : (
                        <div><strong>Сцепление:</strong> Данные отсутствуют</div>
                      )}
                    </div>
                  )}
                </DecodingCell>
              </TableRow>
            ))
          )}

          {/* Секция трендов - показываем только если есть тренды */}
          {metarData.trends && metarData.trends.length > 0 && (
            <TableRow>
              <ParameterCell>Тренды</ParameterCell>
              <ParameterCell>
                <code>{metarData.trends.map(t => t.type).join(' ')}</code>
              </ParameterCell>
              <DecodingCell>
                {metarData.trends.map((trend, idx: number) => (
                  <div key={idx} style={{ marginBottom: '5px' }}>
                    <strong>{trend.type}:</strong> {trend.forecast?.description || 'Изменение погодных условий'}
                  </div>
                ))}
              </DecodingCell>
            </TableRow>
          )}
        </tbody>
      </DecodingTable>

      {/* Секция примечаний */}
      {metarData.remarks.length > 0 && (
        <RemarksSection>
          <ShowMoreButton 
            onClick={() => setShowRemarks(!showRemarks)}
            isActive={showRemarks}
          >
            {showRemarks ? '📋 Скрыть примечания' : `📋 Показать примечания (${metarData.remarks.length})`}
          </ShowMoreButton>

          {showRemarks && (
            <div style={{ marginTop: '15px' }}>
              <h4 style={{ 
                color: '#64ffda', 
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span>📋</span>
                <span>Примечания и дополнительные данные</span>
              </h4>
              
              <div style={{ 
                display: 'grid', 
                gap: '10px',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
              }}>
                {metarData.remarks.map((remark, index) => (
                  <RemarkItem key={index} type={remark.type}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{ 
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '30px'
                      }}>
                        {getRemarkIcon(remark.type)}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '10px',
                          marginBottom: '5px'
                        }}>
                          <RemarkTypeBadge style={{ backgroundColor: getRemarkTypeColor(remark.type) }}>
                            {remark.type}
                          </RemarkTypeBadge>
                          <code style={{ 
                            background: 'rgba(100, 255, 218, 0.1)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            color: '#64ffda',
                            fontSize: '0.8rem'
                          }}>
                            {remark.code}
                          </code>
                        </div>
                        
                        <div style={{ 
                          color: '#e6f1ff', 
                          fontSize: '0.9rem',
                          lineHeight: '1.4'
                        }}>
                          {remark.description}
                        </div>
                        
                        {/* Дополнительные детали */}
                        {remark.details && (
                          <div style={{ 
                            marginTop: '5px',
                            fontSize: '0.8rem',
                            color: '#8892b0'
                          }}>
                            {Object.entries(remark.details).map(([key, value]) => (
                              <div key={key}>
                                <strong>{key}:</strong> {String(value)}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </RemarkItem>
                ))}
              </div>
            </div>
          )}
        </RemarksSection>
      )}

      <ShowMoreButton 
        onClick={() => setShowEducational(!showEducational)}
        isActive={showEducational}
      >
        {showEducational ? '❓ Скрыть справку' : '❓ Как читать METAR?'}
      </ShowMoreButton>

      {showEducational && (
        <EducationalSection>
          <EducationalContent>
            <h3>📋 Структура METAR</h3>
            <p>METAR (Meteorological Aerodrome Report) — стандартизированный формат метеосводки для аэродромов.</p>
            
            <h4>Основные компоненты:</h4>
            <ul>
              <li><strong>AAAA</strong> — Код ICAO аэропорта (4 буквы)</li>
              <li><strong>DDHHMMZ</strong> — Дата/время наблюдения (день, час, минуты, Z=UTC)</li>
              <li><strong>DDDSSGSSUU</strong> — Ветер (направление°, скорость, порывы, единицы измерения)</li>
              <li><strong>VVVV</strong> — Видимость (метры) или CAVOK</li>
              <li><strong>WW</strong> — Погодные явления (RA-дождь, SN-снег, FG-туман)</li>
              <li><strong>NNNHHH</strong> — Облачность (тип покрытия + высота в сотнях ft)</li>
              <li><strong>T/Td</strong> — Температура/Точка росы</li>
              <li><strong>QPPPP</strong> — Давление QNH (гПа) или <strong>APPPP</strong> (дюймы рт.ст.)</li>
              <li><strong>Rxx/xxxxxx</strong> — Состояние ВПП (тип покрытия, загрязнение, глубина, сцепление)</li>
              <li><strong>RMK</strong> — Примечания и дополнительные данные</li>
            </ul>

            <h4>Типы примечаний (RMK):</h4>
            <ul>
              <li><strong style={{ color: '#ff6b6b' }}>🌦️ Погода</strong> - начало/окончание явлений</li>
              <li><strong style={{ color: '#64ffda' }}>🌡️ Температура</strong> - точные значения</li>
              <li><strong style={{ color: '#1a6fc4' }}>📊 Давление</strong> - дополнительные данные</li>
              <li><strong style={{ color: '#ffd700' }}>💨 Ветер</strong> - изменения и особенности</li>
              <li><strong style={{ color: '#9d4edd' }}>🛬 ВПП</strong> - состояние покрытия</li>
              <li><strong style={{ color: '#8892b0' }}>⚙️ Система</strong> - информация о станции</li>
            </ul>
          </EducationalContent>
        </EducationalSection>
      )}
    </MetarContainer>
  );
};