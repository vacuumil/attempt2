// SigwxMain.tsx
import React, { useState } from 'react';
import {
  SigwxContainer,
  Header,
  Navigation,
  NavButton
} from './SigwxMain.styles';
import type { SigwxSection } from './types/sigwx.types';
import { SigwxTheory } from './components/SigwxTheory';
import { SigwxSymbols } from './components/SigwxSymbols';
import { SigwxTesting } from './components/SigwxTesting';

export const SigwxMain: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<SigwxSection>('symbols');

  const renderSection = () => {
    switch (currentSection) {
      case 'theory':
        return <SigwxTheory />;
      case 'symbols':
        return <SigwxSymbols />;
      case 'testing':
        return <SigwxTesting />;
      default:
        return <SigwxSymbols />;
    }
  };

  return (
    <SigwxContainer>
      <Header>
        <h1>🗺️ SIGWX - Карты Значительных Погодных Явлений</h1>
        <p>Теоретический модуль для изучения условных обозначений и анализа метеокарт</p>
      </Header>

      <Navigation>
        <NavButton 
          $active={currentSection === 'theory'}
          onClick={() => setCurrentSection('theory')}
        >
          📚 Теория
        </NavButton>
        <NavButton 
          $active={currentSection === 'symbols'}
          onClick={() => setCurrentSection('symbols')}
        >
          🔣 Библиотека символов
        </NavButton>
        <NavButton 
          $active={currentSection === 'testing'}
          onClick={() => setCurrentSection('testing')}
        >
          🎯 Тестирование
        </NavButton>
      </Navigation>

      {renderSection()}
    </SigwxContainer>
  );
};