import styled from 'styled-components';

export const DiagramWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const DiagramTitle = styled.h4`
  color: #64ffda;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
`;

export const SimpleDiagram = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background: rgba(10, 25, 47, 0.3);
  border-radius: 10px;
  border: 1px solid rgba(100, 255, 218, 0.1);
  overflow: hidden;
`;

export const WindIndicator = styled.div<{ $direction: number; $strength: number }>`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 107, 107, 0.1);
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 107, 107, 0.3);

  .wind-arrow {
    font-size: 1.5rem;
    transform: rotate(${props => props.$direction}deg);
    transition: transform 0.5s ease;
    color: #ff6b6b;
  }

  .wind-info {
    color: #ff6b6b;
    font-size: 0.9rem;
    text-align: center;
    line-height: 1.2;
  }
`;

export const Runway = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 60px;
  background: #4a5568;
  border-top: 3px solid #e6f1ff;

  .runway-number {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    color: #64ffda;
    font-weight: bold;
    font-size: 1.2rem;
    background: rgba(10, 25, 47, 0.8);
    padding: 2px 8px;
    border-radius: 4px;
  }

  .runway-centerline {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: #64ffda;
    border-left: 2px dashed #64ffda;
  }
`;

export const AircraftPath = styled.div<{ $type: 'ideal' | 'corrected'; $offset: number }>`
  position: absolute;
  top: 80px;
  left: calc(50% + ${props => props.$offset}px);
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  .path-line {
    width: 3px;
    height: 150px;
    background: ${props => props.$type === 'ideal' ? '#64ffda' : '#1a6fc4'};
    border-left: ${props => props.$type === 'corrected' ? '2px dashed #1a6fc4' : 'none'};
  }

  .path-label {
    margin-top: 10px;
    padding: 6px 10px;
    background: rgba(17, 34, 64, 0.8);
    border-radius: 6px;
    color: ${props => props.$type === 'ideal' ? '#64ffda' : '#1a6fc4'};
    font-size: 0.9rem;
    text-align: center;
    border: 1px solid ${props => props.$type === 'ideal' ? 
      'rgba(100, 255, 218, 0.3)' : 'rgba(26, 111, 196, 0.3)'};

    small {
      font-size: 0.8rem;
      opacity: 0.8;
    }
  }
`;

export const InfoLabels = styled.div`
  position: absolute;
  bottom: 70px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoLabel = styled.div<{ $type: 'wind' | 'headwind' }>`
  padding: 6px 10px;
  background: rgba(17, 34, 64, 0.8);
  border-radius: 6px;
  color: #e6f1ff;
  font-size: 0.9rem;
  border-left: 3px solid ${props => 
    props.$type === 'wind' ? '#ff6b6b' : '#64ffda'};

  strong {
    color: ${props => 
      props.$type === 'wind' ? '#ff6b6b' : '#64ffda'};
  }
`;