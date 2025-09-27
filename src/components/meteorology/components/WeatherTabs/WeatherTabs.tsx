// src/components/meteorology/components/WeatherTabs/WeatherTabs.tsx (УПРОЩЕННАЯ ВЕРСИЯ)
import React from 'react';

export type WeatherDataType = 'metar' | 'taf' | 'sigmet' | 'airep';

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
}) => {
  console.log('🔥 WeatherTabs RENDERED with activeTab:', activeTab);

  const tabs = [
    { id: 'metar', label: 'METAR', icon: '🌤️' },
    { id: 'taf', label: 'TAF', icon: '📅' },
    { id: 'sigmet', label: 'SIGMET', icon: '⚠️' },
    { id: 'airep', label: 'PIREP', icon: '✈️' }
  ];

  return (
    <div style={{
      background: 'rgba(26, 111, 196, 0.1)',
      border: '2px solid #1a6fc4',
      borderRadius: '12px',
      padding: '10px',
      margin: '20px 0'
    }}>
      <h3 style={{ color: '#64ffda', textAlign: 'center' }}> WeatherTabs Component</h3>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              console.log('🔄 Tab clicked:', tab.id);
              onTabChange(tab.id as WeatherDataType);
            }}
            style={{
              padding: '15px 20px',
              background: activeTab === tab.id ? '#64ffda' : '#1a6fc4',
              color: activeTab === tab.id ? '#0a192f' : 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              minWidth: '120px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              justifyContent: 'center'
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};