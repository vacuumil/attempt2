// src/components/flight-simulator/FlightSimulator.tsx
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { VorMap } from './components/Map/VorMap';
import { FlightControls } from './components/Controls/FlightControls';
import { NavControls } from './components/Controls/NavControls';
import { VorIndicator } from './components/Instrument/VorIndicator';
import { MissionPanel } from './components/Mission/MissionPanel';
import { WindIndicator } from './components/Instrument/WindIndicator';
import { useFlightNavigation } from './hooks/useFlightNavigation';
import { useVorInstrument } from './hooks/useVorInstrument';
import { useWind } from './hooks/useWind';
import { MissionManager } from './components/Mission/MissionManager';
import { VOR_STATIONS, AIRCRAFT_INITIAL } from './utils/constants';
import type { VorStation } from './components/Map/types';
import type { Mission } from './components/Mission/types';
import './FlightSimulator.css';

export const FlightSimulator: React.FC = () => {
  const [activeStation, setActiveStation] = useState<VorStation | null>(null);
  const [obs, setObs] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  
  const { wind, isWindEnabled, toggleWind, generateRandomWind, updateWind } = useWind();
  const { 
    aircraft, 
    trail, 
    isContinuousTurn, 
    turnDirection,
    updateHeading, 
    moveAircraft, 
    resetAircraft,
    startContinuousTurn,
    stopContinuousTurn
  } = useFlightNavigation({ 
    initialState: AIRCRAFT_INITIAL,
    wind,
    isWindEnabled 
  });
  
  const { deviation, toFrom } = useVorInstrument(aircraft, activeStation, obs);
  const missionManagerRef = useRef(new MissionManager());

  // Автоматическое движение при включенном состоянии
  useEffect(() => {
    let animationFrameId: number;
    
    const moveContinuously = () => {
      if (isMoving) {
        moveAircraft(1);
        animationFrameId = requestAnimationFrame(moveContinuously);
      }
    };

    if (isMoving) {
      animationFrameId = requestAnimationFrame(moveContinuously);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isMoving, moveAircraft]);

  const handleMissionStart = useCallback((mission: Mission) => {
    resetAircraft(mission.initialPosition, mission.initialHeading);
    missionManagerRef.current.startMission(mission);
    if (mission.wind) {
      updateWind(mission.wind);
    }
  }, [resetAircraft, updateWind]);

  // Проверка выполнения задач миссии
  useEffect(() => {
    const objectiveCompleted = missionManagerRef.current.checkObjective(
      aircraft, 
      activeStation?.id || null, 
      VOR_STATIONS
    );
    
    if (objectiveCompleted) {
      console.log('Objective completed!');
    }
  }, [aircraft, activeStation]);

  const handleHeadingChange = useCallback((heading: number) => {
    updateHeading(heading);
  }, [updateHeading]);

  const handleStationSelect = useCallback((stationId: string) => {
    const station = VOR_STATIONS.find(s => s.id === stationId) || null;
    setActiveStation(station);
  }, []);

  const toggleMovement = useCallback(() => {
    setIsMoving(prev => !prev);
  }, []);

  const handleStepMove = useCallback(() => {
    moveAircraft(5); // Уменьшили шаг с 10 до 5
  }, [moveAircraft]);

  const handleMissionReset = useCallback(() => {
  // Сбрасываем выбранную станцию и OBS при сбросе миссии
  setActiveStation(null);
  setObs(0);
  setIsMoving(false);
  // Дополнительные действия при сбросе, если нужно
}, []);

  return (
    <div className="flight-simulator">
      <div className="flight-simulator-header">
        <h2>Симулятор Полетов VOR</h2>
        <p>Профессиональный тренажер для отработки навыков навигации</p>
      </div>
      
      <div className="flight-simulator-content">
        <div className="simulator-main">
          <div className="map-container">
            <VorMap 
              stations={VOR_STATIONS}
              aircraft={aircraft}
              trail={trail}
              activeStationId={activeStation?.id || null}
              obs={obs}
              wind={isWindEnabled ? wind : null}
              missionObjective={missionManagerRef.current.getCurrentObjective()}
              onStationSelect={handleStationSelect}
            />
          </div>
          
          <div className="simulator-controls">
            <FlightControls
              heading={aircraft.heading}
              onHeadingChange={handleHeadingChange}
              isMoving={isMoving}
              onToggleMovement={toggleMovement}
              onStepMove={handleStepMove}
              isContinuousTurn={isContinuousTurn}
              turnDirection={turnDirection}
              onStartContinuousTurn={startContinuousTurn}
              onStopContinuousTurn={stopContinuousTurn}
            />
            
            <NavControls
              stations={VOR_STATIONS}
              activeStationId={activeStation?.id || null}
              obs={obs}
              onStationSelect={handleStationSelect}
              onObsChange={setObs}
            />
            
            <WindIndicator
              wind={wind}
              isWindEnabled={isWindEnabled}
              onToggleWind={toggleWind}
              onGenerateWind={() => generateRandomWind(2)}
            />
          </div>
        </div>
        
        <div className="right-panel">

      <MissionPanel
        missionManager={missionManagerRef.current}
        onMissionStart={handleMissionStart}
        onMissionReset={handleMissionReset}
      /> 
          <VorIndicator
            deviation={deviation}
            toFrom={toFrom}
            obs={obs}
          />
        </div>
      </div>
    </div>
  );
};