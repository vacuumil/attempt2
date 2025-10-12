// components/navigation/flight-plan/route-builder/RouteCalculator.styles.ts
import styled from 'styled-components';

export const CalculatorContainer = styled.div`
  background: rgba(17, 34, 64, 0.6);
  border: 1px solid rgba(26, 111, 196, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 1.5rem;
  }
`;

export const SectionTitle = styled.h3`
  color: #64ffda;
  text-align: center;
  margin: 0 0 1.5rem 0;
  font-size: 1.3rem;
  background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const ParametersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const ParameterItem = styled.div`
  background: rgba(100, 255, 218, 0.05);
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;

  .label {
    color: #8892b0;
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }

  .value {
    color: #64ffda;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

export const CalculatorHeader = styled.h4`
  color: #64ffda;
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  text-align: center;
`;

export const CalculatorTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(10, 25, 47, 0.4);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

export const TableHeader = styled.th`
  background: rgba(26, 111, 196, 0.3);
  color: #64ffda;
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  border: 1px solid rgba(100, 255, 218, 0.1);
  white-space: nowrap;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: rgba(17, 34, 64, 0.3);
  }

  &:hover {
    background: rgba(26, 111, 196, 0.1);
  }
`;

export const TableCell = styled.td`
  padding: 0.75rem;
  text-align: center;
  border: 1px solid rgba(100, 255, 218, 0.1);
  color: #e6f1ff;
`;

export const SummaryRow = styled(TableRow)`
  background: rgba(100, 255, 218, 0.1) !important;
  font-weight: bold;
`;