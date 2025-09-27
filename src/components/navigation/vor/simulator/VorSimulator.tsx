import React, { useState, useEffect } from 'react';
import { VORReceiver } from '../VORReceiver/VORReceiver';
import { NavigationMap } from '../NavigationMap/NavigationMap';
import { CDINeedle } from '../VORReceiver/CDINeedle';
import { TOFROMIndicator } from '../VORReceiver/TOFROMIndicator';
import { useVOR } from '../../../../hooks/useVOR';
import type { VORStation } from '../../../../hooks/useVOR';
import './VorSimulator.css';

export const VorSimulator: React.FC = () => {
  const {
    aircraftPosition,
    setAircraftPosition,
    selectedFrequency,
    setSelectedFrequency,
    obsCourse,
    setObsCourse,
    cdiDeflection,
    toFromIndicator,
    isSignalValid,
    currentStation,
    vorStations
  } = useVOR();

  const [showDeviationWarning, setShowDeviationWarning] = useState(false);

  useEffect(() => {
    if (Math.abs(cdiDeflection) > 1) {
      setShowDeviationWarning(true);
    } else {
      setShowDeviationWarning(false);
    }
  }, [cdiDeflection]);

  const handleStationSelect = (station: VORStation) => {
    setSelectedFrequency(station.frequency);
  };

  const getDeflectionStatus = (deflection: number): string => {
    const absDeflection = Math.abs(deflection);
    if (absDeflection < 0.1) return 'Центр (идеально)';
    if (absDeflection < 0.3) return 'Небольшое отклонение';
    if (absDeflection < 0.7) return 'Среднее отклонение';
    return 'Сильное отклонение';
  };

  const getDeflectionDirection = (deflection: number): string => {
    if (deflection > 0) return 'Вправо';
    if (deflection < 0) return 'Влево';
    return 'По центру';
  };

  return (
    <div className="vor-simulator">
      <div className="simulator-header">
        <h2>Тренажер VOR навигации</h2>
        <p className="simulator-description">
          Интерактивный симулятор для отработки навыков работы с VOR-оборудованием
        </p>
      </div>

      {showDeviationWarning && (
        <div className="deviation-warning">
          <div className="warning-icon">⚠️</div>
          <div className="warning-text">
            Большое отклонение от курса! Отклонение превышает 10 градусов.
          </div>
        </div>
      )}

      <div className="simulator-layout">
        {/* Карта */}
        <div className="map-container">
          <NavigationMap
            aircraftPosition={aircraftPosition}
            onAircraftMove={setAircraftPosition}
            vorStations={vorStations}
            selectedStation={currentStation}
            onStationSelect={handleStationSelect}
            obsCourse={obsCourse}
          />
        </div>

        {/* Приемник и управление */}
        <div className="receiver-container">
          <VORReceiver
            selectedFrequency={selectedFrequency}
            onFrequencyChange={setSelectedFrequency}
            obsCourse={obsCourse}
            onObsCourseChange={setObsCourse}
            isSignalValid={isSignalValid}
            currentStation={currentStation}
            toFromIndicator={toFromIndicator}
          />
        </div>

        {/* CDI панель */}
        <div className="cdi-panel">
          <div className="cdi-panel-header">
            <h3>Индикатор курсового отклонения (CDI)</h3>
          </div>
          
          <div className="cdi-visualization">
            <CDINeedle deflection={cdiDeflection} />
            
            <div className="cdi-info-grid">
              <div className="cdi-tofrom-container">
                <span className="tofrom-label">Индикатор:</span>
                <TOFROMIndicator indicator={toFromIndicator} />
              </div>
              
              <div className="cdi-data-display">
                <div className="cdi-data-item">
                  <span className="cdi-data-label">Статус:</span>
                  <span className="cdi-data-value">{getDeflectionStatus(cdiDeflection)}</span>
                </div>
                <div className="cdi-data-item">
                  <span className="cdi-data-label">Направление:</span>
                  <span className="cdi-data-value">{getDeflectionDirection(cdiDeflection)}</span>
                </div>
                <div className="cdi-data-item">
                  <span className="cdi-data-label">Величина:</span>
                  <span className="cdi-data-value">{Math.abs(cdiDeflection * 10).toFixed(1)}°</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Панель информации */}
        <div className="info-panel">
          <h4>Управление тренажером</h4>
          <div className="info-content">
            <div className="info-item">
              <h5>🎯 Навигация по карте</h5>
              <p>Кликните или перетащите самолет для изменения позиции. Станции VOR отмечены синими маркерами.</p>
            </div>
            
            <div className="info-item">
              <h5>📻 Настройка оборудования</h5>
              <p>Выберите частоту VOR станции или кликните на маркер станции на карте для автоматической настройки.</p>
            </div>
            
            <div className="info-item">
              <h5>🧭 Установка курса (OBS)</h5>
              <p>Используйте ручку OBS для установки желаемого курса. CDI покажет отклонение от выбранного радиала.</p>
            </div>
            
            <div className="info-item">
              <h5>📊 Интерпретация показаний</h5>
              <p>Центральное положение CDI - на курсе. TO/FROM индикатор показывает направление относительно станции.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
