// src/components/flight-simulator/components/Mission/MissionPanel.tsx
import React, { useState, useEffect, useCallback } from 'react';
import type { Mission } from './types';
import { MISSIONS } from './missionData';
import { MissionManager } from './MissionManager';
import './MissionPanel.css';

interface MissionPanelProps {
  missionManager: MissionManager;
  onMissionStart: (mission: Mission) => void;
  onMissionReset?: () => void;
}

export const MissionPanel: React.FC<MissionPanelProps> = ({
  missionManager,
  onMissionStart,
  onMissionReset
}) => {
  const [selectedMission, setSelectedMission] = useState<string>('');
  const [completionMessage, setCompletionMessage] = useState<string>('');
  const [missionState, setMissionState] = useState(missionManager.getMissionState());

  const handleMissionStart = useCallback(() => {
    const mission = MISSIONS.find(m => m.id === selectedMission);
    if (mission) {
      onMissionStart(mission);
      missionManager.startMission(mission);
      setCompletionMessage('');
      setMissionState(missionManager.getMissionState());
    }
  }, [selectedMission, onMissionStart, missionManager]);

  const handleMissionReset = useCallback(() => {
    missionManager.resetMission();
    setSelectedMission('');
    setCompletionMessage('');
    setMissionState(missionManager.getMissionState());
    if (onMissionReset) {
      onMissionReset();
    }
  }, [missionManager, onMissionReset]);

  // Периодически проверяем состояние миссии
  useEffect(() => {
    if (!missionState.currentMission || missionState.isCompleted) return;
    
    const interval = setInterval(() => {
      const newState = missionManager.getMissionState();
      setMissionState(newState);
    }, 500);
    
    return () => clearInterval(interval);
  }, [missionManager, missionState.currentMission, missionState.isCompleted]);

  // Отдельный эффект для обработки завершения миссии
  useEffect(() => {
    if (missionState.isCompleted && missionState.currentMission && !completionMessage) {
      setCompletionMessage('🎉 Миссия завершена! Отличная работа!');
      
      // Автоматический сброс через 10 секунд
      const autoResetTimer = setTimeout(() => {
        handleMissionReset();
      }, 10000);
      
      return () => clearTimeout(autoResetTimer);
    }
  }, [missionState.isCompleted, missionState.currentMission, completionMessage, handleMissionReset]);

  const progress = missionManager.getProgress();

  return (
    <div className="mission-panel">
      <h3>📋 Миссии</h3>
      
      {completionMessage && (
        <div className="mission-complete-message">
          {completionMessage}
          <button 
            onClick={handleMissionReset}
            className="mission-reset-btn"
          >
            Выбрать новую миссию
          </button>
        </div>
      )}
      
      <div className="control-group">
        <label>Выберите миссию:</label>
        <select 
          value={selectedMission}
          onChange={(e) => setSelectedMission(e.target.value)}
          className="mission-select"
          disabled={!!missionState.currentMission && !missionState.isCompleted}
        >
          <option value="">-- Выберите миссию --</option>
          {MISSIONS.map(mission => (
            <option key={mission.id} value={mission.id}>
              {mission.title} ({mission.difficulty === 'easy' ? '🟢 Легкая' : 
                              mission.difficulty === 'medium' ? '🟡 Средняя' : 
                              '🔴 Сложная'})
            </option>
          ))}
        </select>
      </div>
      
      <button 
        onClick={handleMissionStart}
        disabled={!selectedMission || (!!missionState.currentMission && !missionState.isCompleted)}
        className="mission-start-btn"
      >
        {missionState.currentMission ? '🚀 Перезапустить' : '🚀 Начать миссию'}
      </button>

      {missionState.currentMission && (
        <div className="current-mission">
          <h4>🎯 {missionState.currentMission.title}</h4>
          <p className="mission-description">{missionState.currentMission.description}</p>
          
          <div className="mission-difficulty">
            Сложность: {missionState.currentMission.difficulty === 'easy' ? '🟢 Легкая' : 
                       missionState.currentMission.difficulty === 'medium' ? '🟡 Средняя' : 
                       '🔴 Сложная'}
          </div>
          
          {missionState.currentObjective && (
            <div className="current-objective">
              <h5>📌 Текущая задача:</h5>
              <p>{missionState.currentObjective.description}</p>
              
              {missionState.currentObjective.type === 'follow' && (
                <div className="follow-timer">
                  <small>Удерживайте курс для завершения</small>
                </div>
              )}
              
              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="progress-text">
                  Прогресс: {Math.round(progress)}%
                </span>
              </div>
            </div>
          )}
          
          {missionState.currentMission.wind && (
            <div className="mission-wind-info">
              <small>💨 Ветер: {missionState.currentMission.wind.direction}° / {missionState.currentMission.wind.speed.toFixed(1)} ед.</small>
            </div>
          )}

          {missionState.isCompleted && (
            <button 
              onClick={handleMissionReset}
              className="mission-reset-btn"
            >
              🎯 Выбрать новую миссию
            </button>
          )}
        </div>
      )}

      {!missionState.currentMission && (
        <div className="mission-tips">
          <h5>💡 Советы по VOR-навигации:</h5>
          <ul>
            <li>Выберите станцию и установите OBS на нужный радиал</li>
            <li>Двигайтесь так, чтобы стрелка CDI была в центре</li>
            <li>Следите за индикатором TO/FROM для определения направления</li>
            <li>Используйте ветер для реалистичности полета</li>
            <li>Для точного следования по радиалу вносите небольшие поправки курса</li>
          </ul>
        </div>
      )}
    </div>
  );
};