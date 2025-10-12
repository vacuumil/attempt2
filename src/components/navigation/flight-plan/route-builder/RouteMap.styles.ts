// components/navigation/flight-plan/route-builder/RouteMap.styles.ts
import styled from 'styled-components';

export const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  background: linear-gradient(145deg, #0a192f 0%, #112240 100%);
  border: 1px solid rgba(26, 111, 196, 0.3);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 350px;
  }
`;

export const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: ${props => props.className?.includes('drawing') ? 'crosshair' : 'pointer'};
`;

export const MapControls = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10;

  @media (max-width: 768px) {
    top: 0.5rem;
    right: 0.5rem;
  }
`;

export const ControlButton = styled.button<{ active?: boolean }>`
  padding: 0.75rem;
  background: ${props => props.active 
    ? 'rgba(100, 255, 218, 0.2)' 
    : 'rgba(17, 34, 64, 0.8)'};
  border: 1px solid ${props => props.active ? '#64ffda' : '#1a6fc4'};
  border-radius: 6px;
  color: ${props => props.active ? '#64ffda' : '#e6f1ff'};
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(100, 255, 218, 0.1);
    border-color: #64ffda;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.8rem;
  }
`;

export const WaypointTooltip = styled.div`
  position: absolute;
  background: rgba(10, 25, 47, 0.95);
  border: 1px solid #64ffda;
  border-radius: 6px;
  padding: 0.75rem;
  color: #e6f1ff;
  font-size: 0.9rem;
  z-index: 100;
  pointer-events: none;
  backdrop-filter: blur(10px);
  min-width: 200px;

  strong {
    color: #64ffda;
    display: block;
    margin-bottom: 0.25rem;
  }

  div {
    margin-top: 0.25rem;
    font-size: 0.8rem;
    color: #8892b0;
  }
`;

export const ScaleIndicator = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: rgba(17, 34, 64, 0.8);
  border: 1px solid #1a6fc4;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  color: #e6f1ff;
  font-size: 0.8rem;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    bottom: 0.5rem;
    left: 0.5rem;
    font-size: 0.7rem;
  }
`;

export const CoordinatesDisplay = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(17, 34, 64, 0.8);
  border: 1px solid #1a6fc4;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  color: #e6f1ff;
  font-size: 0.8rem;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    bottom: 0.5rem;
    right: 0.5rem;
    font-size: 0.7rem;
  }
`;

export const RouteInfoPanel = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(17, 34, 64, 0.9);
  border: 1px solid #1a6fc4;
  border-radius: 8px;
  padding: 1rem;
  color: #e6f1ff;
  min-width: 200px;
  backdrop-filter: blur(10px);

  h4 {
    color: #64ffda;
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    top: 0.5rem;
    left: 0.5rem;
    padding: 0.75rem;
    min-width: 150px;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  font-size: 0.8rem;

  &:last-child {
    margin-bottom: 0;
  }

  .label {
    color: #8892b0;
  }

  .value {
    color: #e6f1ff;
    font-weight: 500;
  }
`;