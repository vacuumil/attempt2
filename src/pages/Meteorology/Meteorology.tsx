// src/components/meteorology/Meteorology.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Content, PageHeader, PageTitle, PageDescription } from './Meteorology.styles';

// Компоненты
import { AirportSelector } from '../../components/meteorology/components/AirportSelector';
import { WeatherTabs } from '../../components/meteorology/components/WeatherTabs';
import type { WeatherDataType } from '../../components/meteorology/components/WeatherTabs';
import { WeatherVisualization } from '../../components/meteorology/components/WeatherVisualization';
import { MetarDisplay } from '../../components/meteorology/components/MetarDisplay';
import { TafDisplay } from '../../components/meteorology/components/TafDisplay';
import type { ParsedTaf } from '../../components/meteorology/utils/tafParser';
import { SigmetDisplay } from '../../components/meteorology/components/SigmetDisplay';
import type { SigmetData } from '../../components/meteorology/utils/sigmetParser';
import { PirepDisplay } from '../../components/meteorology/components/PirepDisplay/PirepDisplay';
import { SigwxMain } from '../../components/meteorology/components/SIGWX/SigwxMain'; // ДОБАВЛЕНО

// Хуки и утилиты
import { useMetarData } from '../../components/meteorology/hooks/useMetarData';
import { parseTafEnhanced, parseTafSafely } from '../../components/meteorology/utils/tafParser';
import { fetchTafData } from '../../components/meteorology/api/aviationWeather'; 
import { fetchSigmetData, parseSigmet } from '../../components/meteorology/utils/sigmetParser';

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

  const [activeTab, setActiveTab] = useState<WeatherDataType>('metar');
  const [tafData, setTafData] = useState<ParsedTaf | null>(null);
  const [sigmetData, setSigmetData] = useState<SigmetData[]>([]);
  const [loadingTaf, setLoadingTaf] = useState(false);
  const [loadingSigmet, setLoadingSigmet] = useState(false);
  const [tafError, setTafError] = useState<string | null>(null);
  const [lastTafFetchTime, setLastTafFetchTime] = useState<number>(0);
  const [lastIcaoCode, setLastIcaoCode] = useState<string>('');

  // Кэширование TAF данных на 10 минут
  const TAF_CACHE_DURATION = 10 * 60 * 1000;

  const loadTafData = useCallback(async (code: string) => {
    const now = Date.now();
    if (code === lastIcaoCode && tafData && (now - lastTafFetchTime) < TAF_CACHE_DURATION) {
      console.log('🔄 Использую кэшированные данные TAF для', code);
      return;
    }

    setLoadingTaf(true);
    setTafError(null);
    try {
      console.log('🔄 Загрузка REAL TAF для аэропорта:', code);
      console.time(`TAF Fetch ${code}`);
      const rawTaf = await fetchTafData(code);
      console.timeEnd(`TAF Fetch ${code}`);
      
      console.log('📨 Получен TAF:', rawTaf.substring(0, 100) + '...');
      
      if (rawTaf.includes('🎭 Генерация mock') || rawTaf.includes('🎯 Использую реалистичный')) {
        console.warn('⚠️ Используются mock данные TAF');
        setTafError('Реальные данные TAF временно недоступны. Показаны демо-данные.');
      }
      
      if (!rawTaf || rawTaf.includes('No TAF available') || rawTaf.length < 10) {
        setTafError('TAF недоступен для этого аэропорта');
        setTafData(null);
        return;
      }
      
      let parsedTaf;
      try {
        console.time(`TAF Parse ${code}`);
        parsedTaf = parseTafEnhanced(rawTaf);
        console.timeEnd(`TAF Parse ${code}`);
        
        console.log('✅ Успешный парсинг TAF:', parsedTaf);
        
        if (!parsedTaf.issuanceTime || !parsedTaf.validity.from || !parsedTaf.validity.to) {
          console.warn('⚠️ Неполные данные TAF, пробуем безопасный парсер');
          parsedTaf = parseTafSafely(rawTaf);
        }
      } catch (enhancedError) {
        console.warn('⚠️ Улучшенный парсер не сработал, пробуем безопасный:', enhancedError);
        parsedTaf = parseTafSafely(rawTaf);
      }
      
      if (parsedTaf && parsedTaf.forecast && parsedTaf.forecast.length > 0) {
        setTafData(parsedTaf);
        setLastTafFetchTime(now);
        setLastIcaoCode(code);
        console.log('📊 TAF данные установлены для', code);
      } else {
        setTafError('Не удалось распарсить данные TAF');
        console.error('❌ Ошибка парсинга TAF - нет данных прогноза');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
      setTafError(`Ошибка загрузки TAF: ${errorMessage}`);
      console.error('❌ Ошибка загрузки TAF:', err);
      setTafData(null);
    } finally {
      setLoadingTaf(false);
    }
  }, [lastIcaoCode, tafData, lastTafFetchTime, TAF_CACHE_DURATION]);

  const loadSigmetData = useCallback(async (code: string) => {
    setLoadingSigmet(true);
    try {
      const rawSigmet = await fetchSigmetData(code);
      const parsedSigmet = parseSigmet(rawSigmet);
      setSigmetData(parsedSigmet);
    } catch (err) {
      console.warn('Ошибка загрузки SIGMET:', err);
      setSigmetData([]);
    } finally {
      setLoadingSigmet(false);
    }
  }, []);

  useEffect(() => {
    if (icaoCode && icaoCode.length === 4 && icaoCode !== lastIcaoCode) {
      console.log('🔄 Смена аэропорта, загружаем TAF для:', icaoCode);
      loadTafData(icaoCode);
      loadSigmetData(icaoCode);
    } else if (!icaoCode || icaoCode.length !== 4) {
      console.log('🔄 Сброс данных TAF - невалидный код аэропорта');
      setTafData(null);
      setSigmetData([]);
      setTafError(null);
      setLastIcaoCode('');
    }
  }, [icaoCode, loadTafData, loadSigmetData, lastIcaoCode]);

  const handleSearch = (code: string) => {
    console.log('🔍 Поиск данных для аэропорта:', code);
    fetchData(code);
    setActiveTab('metar');
    
    if (code !== lastIcaoCode) {
      setLastIcaoCode('');
    }
  };

  const handleCodeChange = (code: string) => {
    setIcaoCode(code);
    if (error) clearError();
    setTafError(null);
  };

  const renderActiveTabContent = () => {
    if (!icaoCode) return null;

    switch (activeTab) {
      case 'metar':
        if (!metarData) {
          return (
            <div style={{ textAlign: 'center', padding: '40px', color: '#8892b0' }}>
              {loading ? '🔄 Загрузка текущих данных METAR...' : '❌ Данные METAR не доступны для этого аэропорта'}
            </div>
          );
        }
        return (
          <>
            <WeatherVisualization metarData={metarData} />
            <MetarDisplay rawMetar={rawMetar} metarData={metarData} />
          </>
        );

      case 'taf':
        if (loadingTaf) {
          return (
            <div style={{ textAlign: 'center', padding: '40px', color: '#8892b0' }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid rgba(100, 255, 218, 0.3)',
                borderLeft: '4px solid #64ffda',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 20px auto'
              }}></div>
              <p>📅 Загрузка прогноза TAF...</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
                Получение актуального прогноза на 24-30 часов
              </p>
            </div>
          );
        }

        if (tafError) {
          return (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: '#ff6b6b',
              background: 'rgba(255, 107, 107, 0.1)',
              border: '1px solid #ff6b6b',
              borderRadius: '8px',
              margin: '20px 0'
            }}>
              <h4 style={{ marginBottom: '15px' }}>❌ Ошибка загрузки TAF</h4>
              <p>{tafError}</p>
              <button 
                onClick={() => loadTafData(icaoCode)}
                style={{
                  marginTop: '15px',
                  padding: '10px 20px',
                  background: '#ff6b6b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                🔄 Повторить попытку
              </button>
            </div>
          );
        }
        
        if (!tafData) {
          return (
            <div style={{ textAlign: 'center', padding: '40px', color: '#8892b0' }}>
              <h4 style={{ color: '#ff6b6b', marginBottom: '15px' }}>❌ Данные TAF недоступны</h4>
              <p>Не удалось загрузить TAF для аэропорта {icaoCode}</p>
            </div>
          );
        }
        
        return (
          <TafDisplay tafData={tafData} icaoCode={icaoCode} />
        );

      case 'sigmet':
        return (
          <SigmetDisplay sigmetData={sigmetData} icaoCode={icaoCode} />
        );

      case 'airep':
        return (
          <PirepDisplay icaoCode={icaoCode} />
        );

      // ДОБАВЛЕН СЛУЧАЙ ДЛЯ SIGWX
      case 'sigwx':
        return (
          <SigwxMain />
        );
    }
  };

  console.log('Meteorology debug:', {
    icaoCode,
    hasMetar: !!metarData,
    hasTaf: !!tafData,
    hasSigmet: sigmetData.length > 0,
    activeTab,
    loading,
    loadingTaf,
    loadingSigmet,
    tafError
  });

  return (
    <Container>
      <Content>
        <PageHeader>
          <PageTitle>Авиационная Метеорология</PageTitle>
          <PageDescription>
            Профессиональный анализ текущих и прогнозных метеоусловий. 
            METAR, TAF, SIGMET/AIRMET, SIGWX в одном интерфейсе для принятия взвешенных решений.
          </PageDescription>
        </PageHeader>

        <AirportSelector
          icaoCode={icaoCode}
          onCodeChange={handleCodeChange}
          onSearch={handleSearch}
          recentAirports={recentAirports}
          loading={loading}
        />

        {error && (
          <div style={{ 
            background: 'rgba(255, 107, 107, 0.1)', 
            border: '1px solid #ff6b6b',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '20px',
            color: '#ff6b6b'
          }}>
            <strong>❌ Ошибка METAR:</strong> {error}
            <button 
              onClick={clearError}
              style={{
                marginLeft: '15px',
                padding: '5px 10px',
                background: 'transparent',
                color: '#ff6b6b',
                border: '1px solid #ff6b6b',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Скрыть
            </button>
          </div>
        )}

        {/* Показываем табы только если есть данные METAR или выбран SIGWX */}
        {(icaoCode && metarData) || activeTab === 'sigwx' ? (
          <WeatherTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            hasMetar={!!metarData}
            hasTaf={!!tafData && !tafError}
            hasSigmet={sigmetData.length > 0}
            hasAirep={false}
          />
        ) : null}

        {/* Индикаторы загрузки с прогрессом */}
        {(loading || loadingTaf || loadingSigmet) && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid rgba(100, 255, 218, 0.3)',
              borderLeft: '4px solid #64ffda',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px auto'
            }}></div>
            <p style={{ color: '#64ffda' }}>
              {loading && '🔄 Загрузка текущих данных METAR...'}
              {loadingTaf && '📅 Загрузка прогноза TAF...'}
              {loadingSigmet && '⚠️ Загрузка предупреждений...'}
            </p>
            <div style={{
              marginTop: '10px',
              fontSize: '0.9rem',
              color: '#8892b0'
            }}>
              {loading && 'Используются надежные источники: AVWX, CheckWX, AviationAPI'}
              {loadingTaf && 'Получение актуального прогноза на 24-30 часов'}
            </div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {/* Основной контент */}
        {!loading && !loadingTaf && !loadingSigmet && renderActiveTabContent()}

        {/* Приветственный экран когда аэропорт не выбран */}
        {!icaoCode && !loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px', 
            color: '#8892b0',
            background: 'rgba(10, 25, 47, 0.3)',
            borderRadius: '12px',
            border: '2px dashed #1a6fc4',
            marginTop: '30px'
          }}>
            <h3 style={{ color: '#64ffda', marginBottom: '20px' }}>🌤️ Многофункциональный метеомодуль</h3>
            <p style={{ marginBottom: '30px', fontSize: '1.1rem' }}>
              Введите код аэропорта (например, UUEE, KJFK, LFPG) для получения метеоданных
            </p>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginTop: '30px'
            }}>
              <div style={{ padding: '20px', background: 'rgba(26, 111, 196, 0.1)', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🌤️</div>
                <h4 style={{ color: '#e6f1ff', marginBottom: '10px' }}>METAR</h4>
                <p>Текущие погодные условия в аэропорту в реальном времени</p>
              </div>
              
              <div style={{ padding: '20px', background: 'rgba(100, 255, 218, 0.1)', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📅</div>
                <h4 style={{ color: '#e6f1ff', marginBottom: '10px' }}>TAF</h4>
                <p>Прогноз погоды на 24-30 часов с детальной расшифровкой</p>
              </div>
              
              <div style={{ padding: '20px', background: 'rgba(255, 107, 107, 0.1)', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⚠️</div>
                <h4 style={{ color: '#e6f1ff', marginBottom: '10px' }}>SIGMET/AIRMET</h4>
                <p>Предупреждения об опасных метеоявлениях</p>
              </div>

              <div style={{ padding: '20px', background: 'rgba(157, 78, 221, 0.1)', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🗺️</div>
                <h4 style={{ color: '#e6f1ff', marginBottom: '10px' }}>SIGWX</h4>
                <p>Карты значительных погодных явлений</p>
              </div>

              <div style={{ padding: '20px', background: 'rgba(255, 193, 7, 0.1)', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>✈️</div>
                <h4 style={{ color: '#e6f1ff', marginBottom: '10px' }}>PIREP</h4>
                <p>Отчеты пилотов о фактических условиях</p>
              </div>
            </div>

            <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(26, 111, 196, 0.05)', borderRadius: '8px' }}>
              <h4 style={{ color: '#64ffda', marginBottom: '15px' }}>📋 Популярные аэропорты:</h4>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {['UUEE', 'UUDD', 'UUWW', 'KJFK', 'KLAX', 'EGLL', 'LFPG', 'EDDF'].map(code => (
                  <button
                    key={code}
                    onClick={() => handleSearch(code)}
                    style={{
                      padding: '8px 16px',
                      background: 'rgba(100, 255, 218, 0.1)',
                      border: '1px solid #64ffda',
                      borderRadius: '6px',
                      color: '#64ffda',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(100, 255, 218, 0.2)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(100, 255, 218, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Content>
    </Container>
  );
};

export default Meteorology;