// src/components/meteorology/components/WeatherVisualization/WeatherVisualization.styles.ts
import styled from 'styled-components';

interface CloudLayerProps {
  altitude: number;
  coverage: string;
}

export const VisualizationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
  margin-top: 30px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const WeatherCard = styled.div`
  background: rgba(26, 111, 196, 0.05);
  border: 1px solid #1a6fc4;
  border-radius: 12px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WeatherIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
`;

export const WeatherGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  width: 100%;

  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const ValueDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const ValueLabel = styled.span`
  color: #8892b0;
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

export const WindDirection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #64ffda;
  font-weight: 600;
`;

interface WindArrowProps {
  direction: number;
}

export const WindArrow = styled.div<WindArrowProps>`
  width: 30px;
  height: 30px;
  background: rgba(100, 255, 218, 0.1);
  border: 2px solid #64ffda;
  border-radius: 50%;
  position: relative;

  &::after {
    content: '↑';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(${props => props.direction}deg);
    color: #64ffda;
    font-size: 16px;
    font-weight: bold;
  }
`;

export const CloudChart = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(to top, #0a192f 0%, #1a6fc4 100%);
  border-radius: 8px;
  padding: 15px;
  position: relative;
  margin-top: 10px;
`;

interface CloudLayerProps {
  altitude: number;
  coverage: string;
}

export const CloudLayer = styled.div.attrs<CloudLayerProps>(props => ({
  style: {
    bottom: `${Math.min((props.altitude / 10000) * 100, 100)}%`
  }
}))<CloudLayerProps>`
  position: absolute;
  left: 10%;
  right: 10%;
  height: 30px;
  background: ${props => {
    switch (props.coverage) {
      case 'FEW': return 'rgba(255, 255, 255, 0.2)';
      case 'SCT': return 'rgba(255, 255, 255, 0.4)';
      case 'BKN': return 'rgba(255, 255, 255, 0.6)';
      case 'OVC': return 'rgba(255, 255, 255, 0.8)';
      default: return 'rgba(255, 255, 255, 0.3)';
    }
  }};
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 2;

  span {
    color: #0a192f;
    font-size: 0.75rem;
    font-weight: 600;
    text-shadow: 0 0 2px white;
    font-family: 'Rajdhani', sans-serif;
  }

  &:hover {
    transform: scale(1.05);
    z-index: 10;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
`;