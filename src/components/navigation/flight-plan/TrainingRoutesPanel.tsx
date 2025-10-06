import React from 'react';
import { trainingRoutes } from './trainingRoutes';
import styled from 'styled-components';

const PanelContainer = styled.div`
  background: linear-gradient(145deg, #112240 0%, #1a3a5f 100%);
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 1px solid rgba(100, 255, 218, 0.1);
`;

const PanelTitle = styled.h3`
  color: #64ffda;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
`;

const RoutesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const RouteCard = styled.div<{ selected: boolean; difficulty: string }>`
  background: ${props => props.selected 
    ? 'linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%)' 
    : 'rgba(17, 34, 64, 0.7)'};
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid ${props => {
    switch (props.difficulty) {
      case 'beginner': return 'rgba(100, 255, 218, 0.3)';
      case 'intermediate': return 'rgba(255, 215, 0, 0.3)';
      case 'advanced': return 'rgba(255, 107, 107, 0.3)';
      default: return 'rgba(100, 255, 218, 0.3)';
    }
  }};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(100, 255, 218, 0.2);
  }
`;

const RouteCode = styled.div<{ selected: boolean }>`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.selected ? '#0a192f' : '#64ffda'};
  margin-bottom: 0.5rem;
`;

const RouteName = styled.div<{ selected: boolean }>`
  font-weight: 500;
  color: ${props => props.selected ? '#0a192f' : '#e6f1ff'};
  margin-bottom: 0.5rem;
`;

const RouteDescription = styled.div<{ selected: boolean }>`
  font-size: 0.85rem;
  color: ${props => props.selected ? 'rgba(10, 25, 47, 0.8)' : '#8892b0'};
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const RouteInfo = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: ${props => props.selected ? 'rgba(10, 25, 47, 0.8)' : '#8892b0'};
`;

const DifficultyBadge = styled.span<{ difficulty: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: bold;
  background: ${props => {
    switch (props.difficulty) {
      case 'beginner': return 'rgba(100, 255, 218, 0.2)';
      case 'intermediate': return 'rgba(255, 215, 0, 0.2)';
      case 'advanced': return 'rgba(255, 107, 107, 0.2)';
      default: return 'rgba(100, 255, 218, 0.2)';
    }
  }};
  color: ${props => {
    switch (props.difficulty) {
      case 'beginner': return '#64ffda';
      case 'intermediate': return '#ffd700';
      case 'advanced': return '#ff6b6b';
      default: return '#64ffda';
    }
  }};
`;

interface TrainingRoutesPanelProps {
  onRouteSelect: (routeCode: string) => void;
  selectedRoute: string;
}

export const TrainingRoutesPanel: React.FC<TrainingRoutesPanelProps> = ({
  onRouteSelect,
  selectedRoute
}) => {
  return (
    <PanelContainer>
      <PanelTitle>📚 Учебные маршруты ( для курсантов УИГА )</PanelTitle>
      <RoutesGrid>
        {trainingRoutes.map((route) => (
          <RouteCard
            key={route.id}
            selected={selectedRoute === route.code}
            difficulty={route.difficulty}
            onClick={() => onRouteSelect(route.code)}
          >
            <RouteCode selected={selectedRoute === route.code}>
              {route.code}
            </RouteCode>
            <RouteName selected={selectedRoute === route.code}>
              {route.name}
            </RouteName>
            <RouteDescription selected={selectedRoute === route.code}>
              {route.description}
            </RouteDescription>
            <RouteInfo selected={selectedRoute === route.code}>
              <span>📏 {route.totalDistance} км</span>
              <DifficultyBadge difficulty={route.difficulty}>
                {route.difficulty === 'beginner' && '👶 Начальный'}
                {route.difficulty === 'intermediate' && '🎯 Средний'}
                {route.difficulty === 'advanced' && '🚀 Продвинутый'}
              </DifficultyBadge>
            </RouteInfo>
          </RouteCard>
        ))}
      </RoutesGrid>
      <div style={{ 
        textAlign: 'center', 
        fontSize: '0.9rem', 
        color: '#8892b0',
        borderTop: '1px solid rgba(100, 255, 218, 0.1)',
        paddingTop: '1rem'
      }}>
        Выберите маршрут для автоматической загрузки параметров
      </div>
    </PanelContainer>
  );
};