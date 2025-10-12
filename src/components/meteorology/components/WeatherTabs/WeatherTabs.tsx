// src/components/meteorology/components/WeatherTabs/WeatherTabs.tsx
import React from 'react';
import {
  TabsContainer,
  TabList,
  Tab,
  WeatherTypeBadge
} from './WeatherTabs.styles';

export type WeatherDataType = 'metar' | 'taf' | 'sigmet' | 'airep' | 'sigwx'; // ДОБАВЛЕНО 'sigwx'

interface WeatherTabsProps {
  activeTab: WeatherDataType;
  onTabChange: (tab: WeatherDataType) => void;
  hasMetar: boolean;
  hasTaf: boolean;
  hasSigmet: boolean;
  hasAirep: boolean;
}

export const WeatherTabs: React.FC<WeatherTabsProps> = ({
  activeTab,
  onTabChange,
  hasMetar,
  hasTaf,
}) => {
  const tabs = [
    { 
      id: 'metar' as WeatherDataType, 
      label: 'METAR', 
      icon: '🌤️',
      description: 'Текущая погода',
      hasData: hasMetar
    },
    { 
      id: 'taf' as WeatherDataType, 
      label: 'TAF', 
      icon: '📅',
      description: 'Прогноз',
      hasData: hasTaf
    },
    { 
      id: 'sigmet' as WeatherDataType, 
      label: 'SIGMET', 
      icon: '⚠️',
      description: 'Опасные явления',
      hasData: true // Всегда доступен как учебный материал
    },
    { 
      id: 'sigwx' as WeatherDataType, // ДОБАВЛЕНО
      label: 'SIGWX', 
      icon: '🗺️',
      description: 'Карты погодных явлений',
      hasData: true // Всегда доступен
    },
    { 
      id: 'airep' as WeatherDataType, 
      label: 'PIREP', 
      icon: '✈️',
      description: 'Отчеты пилотов',
      hasData: true // Всегда доступен как учебный материал
    }
  ];

  return (
    <TabsContainer>
      <TabList>
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            $isActive={activeTab === tab.id}
            $hasData={tab.hasData}
            onClick={() => onTabChange(tab.id)}
            title={tab.description}
          >
            <span style={{ fontSize: '1.2rem' }}>{tab.icon}</span>
            {tab.label}
            {tab.hasData && activeTab !== tab.id && (
              <WeatherTypeBadge>!</WeatherTypeBadge>
            )}
          </Tab>
        ))}
      </TabList>
    </TabsContainer>
  );
};