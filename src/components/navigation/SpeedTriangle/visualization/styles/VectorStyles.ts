import styled from 'styled-components';

export const VectorDiagramContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;

  h3 {
    color: #1e40af;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
    text-align: center;
  }
`;

export const DiagramPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  background: #f8fafc;
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
  color: #64748b;
  font-style: italic;
`;

export const VectorLegend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 1rem;
  background: #f1f5f9;
  border-radius: 8px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: #374151;
`;

export const LegendColor = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;