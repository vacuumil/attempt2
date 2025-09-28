// src/components/meteorology/Meteorology.tsx
import React, { useState, useEffect } from 'react';
import { Container, Content, PageHeader, PageTitle, PageDescription } from './Meteorology.styles';

// Компоненты
import { AirportSelector } from '../../../src/components/meteorology/components/AirportSelector';
import { WeatherTabs} from '../../../src/components/meteorology/components/WeatherTabs';
import type { WeatherDataType } from '../../../src/components/meteorology/components/WeatherTabs';
import { WeatherVisualization } from '../../../src/components/meteorology/components/WeatherVisualization';
import { MetarDisplay } from '../../../src/components/meteorology/components/MetarDisplay';
import { TafDisplay } from '../../../src/components/meteorology/components/TafDisplay';
import type { ParsedTaf } from '../../../src/components/meteorology/utils/tafParser';
import { SigmetDisplay } from '../../../src/components/meteorology/components/SigmetDisplay';
import type { SigmetData  } from '../../../src/components/meteorology/utils/sigmetParser';

// Хуки и утилиты
import { useMetarData } from '../../../src/components/meteorology/hooks';
import { parseTafEnhanced, parseTafSafely } from '../../../src/components/meteorology/utils/tafParser';
import { fetchTafData,  } from '../../../src/components/meteorology/utils/tafParser';
import { fetchSigmetData, parseSigmet, } from '../../../src/components/meteorology/utils/sigmetParser';

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

  // Загрузка TAF данных при изменении аэропорта
  useEffect(() => {
    if (icaoCode && icaoCode.length === 4) {
      loadTafData(icaoCode);
      loadSigmetData(icaoCode);
    } else {
      // Сбрасываем данные если код аэропорта невалидный
      setTafData(null);
      setSigmetData([]);
      setTafError(null);
    }
  }, [icaoCode]);

  const loadTafData = async (code: string) => {
    setLoadingTaf(true);
    setTafError(null);
    try {
      console.log('🔄 Загрузка TAF для аэропорта:', code);
      const rawTaf = await fetchTafData(code);
      console.log('📨 Получен сырой TAF:', rawTaf);
      
      if (!rawTaf || rawTaf.includes('No TAF available') || rawTaf.length < 10) {
        setTafError('TAF недоступен для этого аэропорта');
        setTafData(null);
        return;
      }
      
      // Используем улучшенный парсер с обработкой ошибок
      let parsedTaf;
      try {
        parsedTaf = parseTafEnhanced(rawTaf);
        console.log('✅ Успешный парсинг улучшенным парсером:', parsedTaf);
        
        // Валидация распарсенных данных
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
        console.log('📊 TAF данные установлены:', parsedTaf);
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
  };

  const loadSigmetData = async (code: string) => {
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
  };

  const handleSearch = (code: string) => {
    fetchData(code);
    setActiveTab('metar'); // Переключаем на METAR после нового поиска
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
              {loading ? 'Загрузка текущих данных...' : 'Данные METAR не доступны для этого аэропорта'}
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
                Повторить попытку
              </button>
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
          <div style={{ textAlign: 'center', padding: '40px', color: '#8892b0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🚧</div>
            <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>Раздел в разработке</h3>
            <p>Функциональность PIREP (отчеты пилотов) будет доступна в ближайшем обновлении</p>
          </div>
        );

      default:
        return null;
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
            METAR, TAF, SIGMET/AIRMET в одном интерфейсе для принятия взвешенных решений.
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
            <strong>Ошибка METAR:</strong> {error}
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

        {/* Показываем табы только если есть данные METAR */}
        {icaoCode && metarData && (
          <WeatherTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            hasMetar={!!metarData}
            hasTaf={!!tafData && !tafError}
            hasSigmet={sigmetData.length > 0}
            hasAirep={false}
          />
        )}

        {/* Индикаторы загрузки */}
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
              {loading && 'Загрузка текущих данных...'}
              {loadingTaf && 'Загрузка прогноза...'}
              {loadingSigmet && 'Загрузка предупреждений...'}
            </p>
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
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>✈️</div>
                <h4 style={{ color: '#e6f1ff', marginBottom: '10px' }}>PIREP</h4>
                <p>Отчеты пилотов о фактических условиях (скоро)</p>
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