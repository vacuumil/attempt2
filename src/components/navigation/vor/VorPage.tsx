import React, { useState } from 'react';
import { TheorySection } from './theory/TheorySection';
import { VorSimulator } from './simulator/VorSimulator';
import { FlightSimulator } from './flight-simulator/FlightSimulator';
import './VorPage.css'; // Создадим стили

// Тип для активной вкладки
type VorTab = 'theory' | 'simulator' | 'flight';

export const VorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<VorTab>('theory');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'theory':
        return <TheorySection />;
      case 'simulator':
        return <VorSimulator />;
      case 'flight':
        return <FlightSimulator />;
      default:
        return <TheorySection />;
    }
  };

  return (
    <div className="vor-page">
      <div className="vor-page-header">
        <h1>VOR-Навигация</h1>
        <p className="vor-subtitle">Освойте работу с одной из основных радионавигационных систем</p>
      </div>

      <nav className="vor-tabs">
        <button 
          className={`vor-tab ${activeTab === 'theory' ? 'vor-tab--active' : ''}`}
          onClick={() => setActiveTab('theory')}
        >
          📚 Теория
        </button>
        <button 
          className={`vor-tab ${activeTab === 'simulator' ? 'vor-tab--active' : ''}`}
          onClick={() => setActiveTab('simulator')}
        >
          🎮 Тренажер
        </button>
        <button 
          className={`vor-tab ${activeTab === 'flight' ? 'vor-tab--active' : ''}`}
          onClick={() => setActiveTab('flight')}
        >
          ✈️ Полет
        </button>
      </nav>

      <div className="vor-tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};