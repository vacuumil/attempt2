import styled from 'styled-components';

export const VisualizationContainer = styled.div`
  margin-top: 2rem;
  background: rgba(10, 25, 47, 0.6);
  border: 1px solid rgba(26, 111, 196, 0.3);
  border-radius: 12px;
  padding: 1.5rem; /* Вернули оригинальные отступы */
  width: 100%;
`;

export const VisualizationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

export const VisualizationTitle = styled.h3`
  color: #64ffda;
  margin: 0;
  font-size: 1.25rem; /* Вернули оригинальный размер */
`;

export const ControlsPanel = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
    justify-content: center;
  }
`;

export const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  label {
    color: #e6f1ff;
    font-size: 0.9rem; /* Вернули оригинальный размер */
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
  font-size: 1rem; /* Вернули оригинальный размер */

  &:focus {
    outline: none;
    border-color: #64ffda;
  }
`;

export const CanvasContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px; /* Вернули оригинальную высоту */
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
  font-size: 0.9rem; /* Вернули оригинальный размер */
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem; /* Вернули оригинальный размер */
`;

export const ColorSwatch = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  border-radius: 3px;
  background: ${props => props.color};
  border: 1px solid rgba(255, 255, 255, 0.3);
`;