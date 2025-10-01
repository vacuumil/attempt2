// src/components/meteorology/components/SigmetDisplay/SigmetDisplay.tsx
import React, { useState } from 'react';
import type { SigmetData } from '../../utils/sigmetParser';
import { getSigmetTypeDescription, getSigmetColor, getSigmetIcon } from '../../utils/sigmetParser';

interface SigmetDisplayProps {
  sigmetData: SigmetData[];
  icaoCode: string;
}

export const SigmetDisplay: React.FC<SigmetDisplayProps> = ({ sigmetData, icaoCode }) => {
  const [showRawData, setShowRawData] = useState<boolean>(false);

  if (!sigmetData || sigmetData.length === 0) {
    return (
      <div style={{ 
        background: 'rgba(26, 111, 196, 0.05)',
        border: '1px solid #1a6fc4',
        borderRadius: '12px',
        padding: '40px',
        textAlign: 'center',
        color: '#8892b0'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>✅</div>
        <h3 style={{ color: '#64ffda', marginBottom: '15px' }}>Нет активных предупреждений</h3>
        <p>В настоящее время нет активных SIGMET/AIRMET для региона {icaoCode}</p>
      </div>
    );
  }

  const formatTime = (timeString: string): string => {
    if (!timeString || timeString.length < 4) return 'Не указано';
    const hour = timeString.slice(0, 2);
    const minute = timeString.slice(2, 4);
    return `${hour}:${minute}Z`;
  };

  const formatAltitude = (altitude: { min: number; max: number }): string => {
    if (altitude.min === altitude.max) {
      return `FL${Math.round(altitude.min / 100)}`;
    }
    return `FL${Math.round(altitude.min / 100)}-FL${Math.round(altitude.max / 100)}`;
  };

  // Получаем все исходные SIGMET сообщения
  const allRawSigmets = sigmetData.map(sigmet => sigmet.raw).join('\n\n');

  return (
    <div style={{ 
      background: 'rgba(26, 111, 196, 0.05)',
      border: '1px solid #1a6fc4',
      borderRadius: '12px',
      padding: '25px'
    }}>
      <h3 style={{ 
        color: '#64ffda', 
        textAlign: 'center',
        marginBottom: '25px',
        fontSize: '1.8rem'
      }}>
        ⚠️ Активные предупреждения SIGMET/AIRMET
      </h3>

      {/* Кнопка показа/скрытия исходных данных */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => setShowRawData(!showRawData)}
          style={{
            padding: '10px 20px',
            background: showRawData ? '#64ffda' : 'rgba(100, 255, 218, 0.1)',
            color: showRawData ? '#0a192f' : '#64ffda',
            border: '1px solid #64ffda',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          {showRawData ? '📋 Скрыть исходные данные' : '📋 Показать исходные данные'}
        </button>
      </div>

      {/* Исходные данные SIGMET */}
      {showRawData && (
        <div style={{ 
          marginBottom: '25px',
          padding: '15px',
          background: 'rgba(10, 25, 47, 0.5)',
          borderRadius: '8px',
          border: '1px solid #64ffda'
        }}>
          <h4 style={{ color: '#64ffda', marginBottom: '10px' }}>📋 Исходные SIGMET сообщения:</h4>
          <div style={{ 
            padding: '12px',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '6px',
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: '0.9rem',
            color: '#e6f1ff',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            lineHeight: '1.4'
          }}>
            {allRawSigmets}
          </div>
        </div>
      )}

      {/* Карточки с предупреждениями */}
      <div style={{ 
        display: 'grid', 
        gap: '20px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'
      }}>
        {sigmetData.map((sigmet, index) => (
          <div
            key={`${sigmet.id}-${index}`}
            style={{
              background: 'rgba(10, 25, 47, 0.3)',
              border: `2px solid ${getSigmetColor(sigmet.phenomenon)}`,
              borderRadius: '8px',
              padding: '20px',
              position: 'relative'
            }}
          >
            {/* Заголовок */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              marginBottom: '15px'
            }}>
              <span style={{ fontSize: '1.5rem' }}>
                {getSigmetIcon(sigmet.phenomenon)}
              </span>
              <div>
                <h4 style={{ 
                  color: getSigmetColor(sigmet.phenomenon),
                  margin: 0,
                  fontSize: '1.2rem'
                }}>
                  {sigmet.type} {sigmet.id}
                </h4>
                <div style={{ 
                  color: '#8892b0', 
                  fontSize: '0.9rem',
                  marginTop: '5px'
                }}>
                  {getSigmetTypeDescription(sigmet.type)}
                </div>
              </div>
            </div>

            {/* Исходное сообщение для этой карточки */}
            <div style={{ 
              marginBottom: '15px',
              padding: '10px',
              background: 'rgba(100, 255, 218, 0.05)',
              borderRadius: '4px',
              border: '1px solid rgba(100, 255, 218, 0.2)'
            }}>
              <div style={{ 
                fontFamily: '"Share Tech Mono", monospace',
                fontSize: '0.8rem',
                color: '#64ffda',
                wordBreak: 'break-all'
              }}>
                {sigmet.raw}
              </div>
            </div>

            {/* Время */}
            <div style={{ 
              display: 'flex',
              gap: '15px',
              marginBottom: '15px',
              fontSize: '0.9rem'
            }}>
              <div>
                <strong>Выпущено:</strong> {formatTime(sigmet.issuanceTime)}
              </div>
              <div>
                <strong>Действует:</strong> {formatTime(sigmet.validity.from)} - {formatTime(sigmet.validity.to)}
              </div>
            </div>

            {/* Детали */}
            <div style={{ lineHeight: '1.6' }}>
              <div style={{ marginBottom: '8px' }}>
                <strong>Феномен:</strong> {sigmet.phenomenon}
                {sigmet.intensity && (
                  <span style={{ 
                    background: 'rgba(255, 107, 107, 0.2)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    marginLeft: '8px',
                    fontSize: '0.8rem'
                  }}>
                    {sigmet.intensity}
                  </span>
                )}
              </div>

              {sigmet.location.area && (
                <div style={{ marginBottom: '8px' }}>
                  <strong>Район:</strong> {sigmet.location.area}
                </div>
              )}

              {sigmet.location.altitude && (
                <div style={{ marginBottom: '8px' }}>
                  <strong>Высота:</strong> {formatAltitude(sigmet.location.altitude)}
                </div>
              )}

              {sigmet.movement && (
                <div style={{ marginBottom: '8px' }}>
                  <strong>Движение:</strong> {sigmet.movement.direction}° / {sigmet.movement.speed} узлов
                </div>
              )}

              {sigmet.location.coordinates && (
                <div style={{ 
                  marginTop: '10px',
                  padding: '8px',
                  background: 'rgba(100, 255, 218, 0.1)',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace'
                }}>
                  <strong>Координаты:</strong> {sigmet.location.coordinates}
                </div>
              )}
            </div>

            {/* Полное описание */}
            <div style={{ 
              marginTop: '15px',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '6px',
              borderLeft: `3px solid ${getSigmetColor(sigmet.phenomenon)}`
            }}>
              <div style={{ 
                color: '#e6f1ff',
                fontSize: '0.9rem',
                lineHeight: '1.4'
              }}>
                {sigmet.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Легенда */}
      <div style={{ 
        marginTop: '25px',
        padding: '15px',
        background: 'rgba(10, 25, 47, 0.5)',
        borderRadius: '8px',
        border: '1px solid #1a6fc4'
      }}>
        <h4 style={{ color: '#64ffda', marginBottom: '10px' }}>📋 Легенда предупреждений:</h4>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px',
          fontSize: '0.9rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#ff6b6b' }}>⛈️</span>
            <span>TS - Грозы</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#ffd700' }}>🧊</span>
            <span>GR - Град</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#64ffda' }}>💨</span>
            <span>TURB - Турбулентность</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#1a6fc4' }}>❄️</span>
            <span>ICE - Обледенение</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#9d4edd' }}>⛰️</span>
            <span>MTW - Горные волны</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#ff8c00' }}>🌋</span>
            <span>VOLCANO - Вулканы</span>
          </div>
        </div>

        {/* Пояснение по чтению SIGMET */}
        <div style={{ 
          marginTop: '15px',
          padding: '12px',
          background: 'rgba(26, 111, 196, 0.1)',
          borderRadius: '6px',
          fontSize: '0.8rem',
          color: '#8892b0'
        }}>
          <strong>📖 Как читать SIGMET:</strong>
          <div style={{ marginTop: '5px' }}>
            <code>SIGMET A123 UUWW 1200/1400 UUWW TS INTSF AREA N5000 E03700 FL250-FL350 MOV NE 25015KT</code>
          </div>
          <div style={{ marginTop: '8px' }}>
            • <strong>SIGMET A123</strong> - тип и идентификатор<br/>
            • <strong>UUWW 1200/1400</strong> - FIR регион и период действия<br/>
            • <strong>TS INTSF</strong> - явление (грозы) и интенсивность (усиливающиеся)<br/>
            • <strong>AREA N5000 E03700</strong> - область действия<br/>
            • <strong>FL250-FL350</strong> - высоты (25000-35000 ft)<br/>
            • <strong>MOV NE 25015KT</strong> - движение на северо-восток со скоростью 15 узлов
          </div>
        </div>
      </div>
    </div>
  );
};