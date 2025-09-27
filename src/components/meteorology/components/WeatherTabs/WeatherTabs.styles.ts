// src/components/meteorology/components/WeatherTabs/WeatherTabs.styles.ts
import styled from 'styled-components';

interface TabProps {
  $isActive: boolean;
  $hasData: boolean;
}

export const TabsContainer = styled.div`
  background: rgba(26, 111, 196, 0.1);
  border: 1px solid #1a6fc4;
  border-radius: 12px;
  padding: 0;
  margin-bottom: 25px;
`;

export const TabList = styled.div`
  display: flex;
  background: rgba(10, 25, 47, 0.8);
  border-radius: 12px 12px 0 0;
  padding: 5px;
  flex-wrap: wrap;
`;

export const Tab = styled.button<TabProps>`
  flex: 1;
  min-width: 120px;
  padding: 15px 20px;
  background: ${props => props.$isActive 
    ? 'linear-gradient(135deg, #1a6fc4 0%, #64ffda 100%)' 
    : 'transparent'
  };
  border: none;
  border-radius: 8px;
  color: ${props => props.$isActive ? '#0a192f' : '#8892b0'};
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 2px;
  gap: 8px;

  &:hover {
    background: ${props => props.$isActive 
      ? 'linear-gradient(135deg, #1a6fc4 0%, #64ffda 100%)' 
      : 'rgba(100, 255, 218, 0.1)'
    };
    color: ${props => props.$isActive ? '#0a192f' : '#64ffda'};
    transform: translateY(-1px);
  }

  opacity: ${props => !props.$hasData && !props.$isActive ? 0.5 : 1};
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

export const TabContent = styled.div`
  padding: 25px;
`;

export const WeatherTypeBadge = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  background: #64ffda;
  color: #0a192f;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;