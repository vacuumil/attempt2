// components/navigation/flight-plan/route-builder/RouteControls.styles.ts
import styled from 'styled-components';

export const ControlsContainer = styled.div`
  background: rgba(17, 34, 64, 0.6);
  border: 1px solid rgba(26, 111, 196, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ControlsHeader = styled.h3`
  color: #64ffda;
  margin: 0 0 1.5rem 0;
  font-size: 1.3rem;
  text-align: center;
  background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const PrimaryButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #1a6fc4 0%, #64ffda 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 180px;
  box-shadow: 0 4px 15px rgba(26, 111, 196, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(100, 255, 218, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
  }
`;

export const SecondaryButton = styled.button`
  padding: 1rem 2rem;
  background: rgba(26, 111, 196, 0.2);
  color: #e6f1ff;
  border: 1px solid #1a6fc4;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 180px;

  &:hover {
    background: rgba(26, 111, 196, 0.3);
    border-color: #64ffda;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
  }
`;

export const DangerButton = styled.button`
  padding: 1rem 2rem;
  background: rgba(255, 107, 107, 0.1);
  color: #ff6b6b;
  border: 1px solid #ff6b6b;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 180px;

  &:hover {
    background: rgba(255, 107, 107, 0.2);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
  }
`;

export const RouteStats = styled.div`
  background: rgba(100, 255, 218, 0.05);
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  text-align: center;
`;

export const StatItem = styled.div`
  .value {
    color: #64ffda;
    font-size: 1.8rem;
    font-weight: bold;
    display: block;
  }

  .label {
    color: #8892b0;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    font-weight: 500;
  }
`;

export const QuickActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: 1rem 0;
`;

export const QuickActionButton = styled.button`
  padding: 0.6rem 1.2rem;
  background: rgba(17, 34, 64, 0.6);
  border: 1px solid #1a6fc4;
  border-radius: 20px;
  color: #e6f1ff;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: rgba(26, 111, 196, 0.3);
    border-color: #64ffda;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const WarningMessage = styled.div`
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  color: #ffd700;
  font-size: 0.9rem;
  text-align: center;

  strong {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }
`;

export const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  label {
    color: #e6f1ff;
    font-weight: 500;
    font-size: 0.95rem;
  }
`;

export const RouteVisualization = styled.div`
  background: rgba(10, 25, 47, 0.4);
  border: 1px solid rgba(100, 255, 218, 0.2);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  .route-path {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }

  .route-point {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .point-number {
    background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
    color: #0a192f;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .point-info {
    .point-name {
      color: #e6f1ff;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .point-code {
      color: #8892b0;
      font-size: 0.75rem;
    }
  }

  .route-leg {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin: 0 0.5rem;
  }

  .leg-distance {
    color: #64ffda;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .leg-arrow {
    color: #8892b0;
    font-size: 1rem;
  }
`;