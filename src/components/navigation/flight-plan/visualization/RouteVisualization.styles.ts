// RouteVisualization.styles.ts
import styled from 'styled-components';

export const VisualizationContainer = styled.div`
  margin-top: 2rem;
  background: rgba(10, 25, 47, 0.6);
  border: 1px solid rgba(26, 111, 196, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
`;

export const VisualizationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const VisualizationTitle = styled.h3`
  color: #64ffda;
  margin: 0;
`;

export const ControlsPanel = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  label {
    color: #e6f1ff;
    font-size: 0.9rem;
    white-space: nowrap;
  }
`;

export const Input = styled.input`
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #1a6fc4;
  border-radius: 4px;
  color: #e6f1ff;
  width: 80px;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #64ffda;
  }
`;

export const CanvasContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: rgba(17, 34, 64, 0.3);
  border-radius: 8px;
  overflow: hidden;
`;

export const Legend = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(26, 111, 196, 0.1);
  border-radius: 6px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #8892b0;
`;

export const ColorSwatch = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 3px;
  background: ${props => props.color};
  border: 1px solid rgba(255, 255, 255, 0.3);
`;