import styled from 'styled-components';

export const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  background: 
    linear-gradient(135deg, #0a192f 0%, #112240 100%),
    radial-gradient(circle at 20% 20%, rgba(26, 58, 95, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(100, 255, 218, 0.1) 0%, transparent 50%);
  border: 2px solid #64ffda;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(100, 255, 218, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 1px,
        rgba(100, 255, 218, 0.05) 1px,
        rgba(100, 255, 218, 0.05) 2px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 1px,
        rgba(100, 255, 218, 0.05) 1px,
        rgba(100, 255, 218, 0.05) 2px
      );
    pointer-events: none;
  }
`;

export const Station = styled.div<{ x: number; y: number; selected: boolean }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: 16px;
  height: 16px;
  background: ${props => props.selected 
    ? 'radial-gradient(circle, #ff6b6b 0%, #ff4757 100%)' 
    : 'radial-gradient(circle, #64ffda 0%, #1a6fc4 100%)'};
  border: 2px solid ${props => props.selected ? '#ff4757' : '#1a6fc4'};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 20;
  box-shadow: 0 0 15px ${props => props.selected 
    ? 'rgba(255, 107, 107, 0.6)' 
    : 'rgba(100, 255, 218, 0.4)'};
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${props => props.selected ? '120px' : '100px'};
    height: ${props => props.selected ? '120px' : '100px'};
    border: 2px solid ${props => props.selected 
      ? 'rgba(255, 107, 107, 0.3)' 
      : 'rgba(100, 255, 218, 0.2)'};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ${props => props.selected ? 'pulse 2s infinite' : 'none'};
  }
  
  @keyframes pulse {
    0% { 
      opacity: 0.6; 
      transform: translate(-50%, -50%) scale(1);
    }
    50% { 
      opacity: 0.3; 
      transform: translate(-50%, -50%) scale(1.2);
    }
    100% { 
      opacity: 0.6; 
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

export const StationRange = styled.div<{ x: number; y: number; range: number; selected: boolean }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: ${props => props.range * 2}px;
  height: ${props => props.range * 2}px;
  border: 1px solid ${props => props.selected 
    ? 'rgba(255, 107, 107, 0.2)' 
    : 'rgba(100, 255, 218, 0.1)'};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 5;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: ${props => props.selected 
      ? 'radial-gradient(circle, rgba(255, 107, 107, 0.1) 0%, transparent 70%)' 
      : 'radial-gradient(circle, rgba(100, 255, 218, 0.05) 0%, transparent 70%)'};
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Aircraft = styled.div<{ x: number; y: number; heading: number }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #1a6fc4 0%, #0a4d8c 100%);
  border: 2px solid #64ffda;
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(${props => props.heading}deg);
  cursor: move;
  z-index: 30;
  box-shadow: 0 0 20px rgba(100, 255, 218, 0.4);
  
  &::before {
    content: '▲';
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
    color: #64ffda;
    font-size: 14px;
    text-shadow: 0 0 8px rgba(100, 255, 218, 0.8);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    background: #64ffda;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const RadialLine = styled.div<{ x: number; y: number; angle: number }>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: 600px;
  height: 2px;
  background: linear-gradient(90deg, 
    #64ffda 0%, 
    #64ffda 50%, 
    transparent 100%);
  transform-origin: left center;
  transform: rotate(${props => props.angle - 90}deg); // Исправлено: вычитаем 90 градусов
  opacity: 0.8;
  pointer-events: none;
  z-index: 10;
  box-shadow: 0 0 10px rgba(100, 255, 218, 0.3);
`;

export const DragArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: move;
  z-index: 15;
`;

export const MapGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
  z-index: 1;
`;