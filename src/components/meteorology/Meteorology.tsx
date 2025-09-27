// src/components/meteorology/Meteorology.tsx
import React from 'react';

// Стили
import {
  Container,
  Content,
  PageHeader,
  PageTitle,
  PageDescription,
  Error as ErrorStyled
} from './Meteorology.styles';

// Компоненты - ПРАВИЛЬНЫЕ ПУТИ
import { AirportSelector } from './components/AirportSelector';
import { WeatherVisualization } from './components/WeatherVisualization';
import { MetarDisplay } from './components/MetarDisplay';

// Хуки - ПРАВИЛЬНЫЙ ПУТЬ
import { useMetarData } from './hooks';

const Meteorology: React.FC = () => {
  const {
    icaoCode,
    metarData,
    rawMetar,
    loading,
    error,
    recentAirports,
    fetchData,
    clearError,
    setIcaoCode
  } = useMetarData();

  const handleSearch = () => {
    fetchData(icaoCode);
  };

  // ДОБАВИМ ПРОСТЕЙШИЙ КОМПОНЕНТ ТАБОВ ДЛЯ ТЕСТА
  const TestTabs = () => {
    console.log('🔥 TestTabs rendered');
    return (
      <div style={{
        background: 'red',
        border: '5px solid yellow',
        padding: '20px',
        margin: '20px 0',
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center'
      }}>
        🔥 ТЕСТОВЫЕ ТАБЫ - ДОЛЖНЫ БЫТЬ ВИДНЫ!
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'center' }}>
          <button style={{ padding: '10px', background: 'green', color: 'white' }}>
            METAR
          </button>
          <button style={{ padding: '10px', background: 'blue', color: 'white' }}>
            TAF
          </button>
        </div>
      </div>
    );
  };

  return (
    <Container>
      <Content>
        <PageHeader>
          <PageTitle>Авиационная Метеорология - ТЕСТ</PageTitle>
          <PageDescription>
            Тестирование исправленных путей импорта
          </PageDescription>
        </PageHeader>

        {/* ТЕСТОВАЯ ИНФОРМАЦИЯ */}
        <div style={{
          background: 'rgba(0, 255, 0, 0.1)',
          border: '2px solid green',
          padding: '15px',
          marginBottom: '20px',
          textAlign: 'center',
          color: 'white'
        }}>
          <div>🎯 Компонент Meteorology загружен!</div>
          <div>ICAO код: {icaoCode || 'не задан'}</div>
        </div>

        <AirportSelector
          icaoCode={icaoCode}
          onCodeChange={setIcaoCode}
          onSearch={handleSearch}
          recentAirports={recentAirports}
          loading={loading}
        />

        {/* ТЕСТОВЫЕ ТАБЫ */}
        <TestTabs />

        {error && (
          <ErrorStyled>
            <strong>Ошибка:</strong> {error}
            <button 
              onClick={clearError}
              style={{
                marginLeft: '10px',
                background: 'transparent',
                border: '1px solid #ff6b6b',
                color: '#ff6b6b',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </ErrorStyled>
        )}

        {metarData && rawMetar && !loading && (
          <>
            <WeatherVisualization metarData={metarData} />
            <MetarDisplay rawMetar={rawMetar} metarData={metarData} />
          </>
        )}

        {!metarData && !loading && !error && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#8892b0',
            fontStyle: 'italic',
            background: 'rgba(10, 25, 47, 0.3)',
            borderRadius: '12px',
            border: '2px dashed #1a6fc4',
            marginTop: '30px'
          }}>
            Введите ICAO код аэропорта для получения метеоданных
            <div style={{ marginTop: '10px', fontSize: '0.9rem' }}>
              Примеры: UUEE (Шереметьево), UUDD (Домодедово), URSS (Сочи)
            </div>
          </div>
        )}
      </Content>
    </Container>
  );
};

export default Meteorology;