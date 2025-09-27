import React, { useState } from 'react';
import {
  Container,
  Title,
  TabContainer,
  Tab,
  ContentContainer
} from './IlsPage.styles';

// Правильные импорты согласно нашей структуре
import { TheoryTab } from './components/TheoryTab/TheoryTab';
import { SimulatorTab } from './components/SimulatorTab/SimulatorTab';
import { FlightTab } from './components/FlightTab/FlightTab';

type ActiveTab = 'theory' | 'simulator' | 'flight';

export const IlsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('theory');

  return (
    <Container>
      <Title>📡 Система инструментального захода на посадку (ILS)</Title>
      
      <TabContainer>
        <Tab 
          active={activeTab === 'theory'} 
          onClick={() => setActiveTab('theory')}
        >
          📚 Теория
        </Tab>
        <Tab 
          active={activeTab === 'simulator'} 
          onClick={() => setActiveTab('simulator')}
        >
          🎯 Тренажер
        </Tab>
        <Tab 
          active={activeTab === 'flight'} 
          onClick={() => setActiveTab('flight')}
        >
          ✈️ Полет
        </Tab>
      </TabContainer>

      <ContentContainer>
        {activeTab === 'theory' && <TheoryTab />}
        {activeTab === 'simulator' && <SimulatorTab />}
        {activeTab === 'flight' && <FlightTab />}
      </ContentContainer>
    </Container>
  );
};