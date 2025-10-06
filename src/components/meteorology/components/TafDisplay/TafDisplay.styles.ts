// src/components/meteorology/components/TafDisplay/TafDisplay.styles.ts
import styled from 'styled-components';

interface ChangeIndicatorProps {
  color: string;
}

interface PeriodCardProps {
  $hasDanger?: boolean;
  $isActive?: boolean;
}

export const TafContainer = styled.div`
  background: rgba(26, 111, 196, 0.05);
  border: 1px solid #1a6fc4;
  border-radius: 12px;
  padding: 25px;
  margin-top: 20px;
`;

export const TafCode = styled.code`
  display: block;
  padding: 15px;
  background: rgba(10, 25, 47, 0.5);
  border: 1px solid #1a6fc4;
  border-radius: 8px;
  color: #e6f1ff;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1rem;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-all;
`;

export const PeriodHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(26, 111, 196, 0.3);

  .period-main {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .period-time {
    color: #e6f1ff;
    font-weight: 600;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.95rem;
  }

  .period-description {
    color: #8892b0;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;

    .period-main {
      flex-direction: column;
      gap: 8px;
      align-items: flex-start;
    }
  }
`;

export const WeatherGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const WeatherItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 15px;
  background: rgba(26, 111, 196, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(26, 111, 196, 0.3);

  .weather-label {
    display: flex;
    align-items: center;
    color: #64ffda;
    font-weight: 600;
    font-size: 0.95rem;
  }
`;

export const WeatherValue = styled.div`
  color: #e6f1ff;
  line-height: 1.5;
`;

export const WeatherGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .weather-badge {
    padding: 8px 12px;
    background: rgba(100, 255, 218, 0.1);
    border: 1px solid #64ffda;
    border-radius: 6px;
    color: #64ffda;
    font-size: 0.9rem;

    .weather-code {
      display: block;
      font-size: 0.7rem;
      color: #8892b0;
      margin-top: 4px;
      font-family: 'Share Tech Mono', monospace;
    }
  }

  .cloud-item {
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #64ffda;
    background: rgba(100, 255, 218, 0.1);

    &.ceiling {
      border-color: #ff6b6b;
      background: rgba(255, 107, 107, 0.1);
    }

    &.cb {
      border-color: #ffd700;
      background: rgba(255, 215, 0, 0.1);
    }

    .cloud-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;

      strong {
        color: #e6f1ff;
      }

      span {
        color: #8892b0;
        font-size: 0.8rem;
      }
    }

    .cloud-description {
      color: #8892b0;
      font-size: 0.8rem;
      line-height: 1.4;
    }
  }
`;

export const ChangeIndicator = styled.span<ChangeIndicatorProps>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  background: ${props => `${props.color}20`};
  color: ${props => props.color};
  border: 1px solid ${props => props.color};
  display: inline-flex;
  align-items: center;
  gap: 5px;
`;

export const DangerSection = styled.div`
  margin: 20px 0;
  padding: 15px;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid #ff6b6b;
  border-radius: 8px;

  h4 {
    color: #ff6b6b;
    margin-bottom: 10px;
    font-size: 1rem;
  }

  .danger-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .danger-item {
    color: #e6f1ff;
    font-size: 0.9rem;
    padding: 5px 0;
    border-bottom: 1px solid rgba(255, 107, 107, 0.2);

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const TemperatureSection = styled.div`
  margin: 20px 0;
  padding: 15px;
  background: rgba(255, 107, 107, 0.05);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 8px;

  h4 {
    color: #ff6b6b;
    margin-bottom: 10px;
    font-size: 1rem;
  }

  .temp-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
  }

  .temp-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: rgba(255, 107, 107, 0.1);
    border-radius: 6px;

    .temp-icon {
      font-size: 1.2rem;
    }

    .temp-info {
      flex: 1;
    }

    .temp-type {
      color: #e6f1ff;
      font-size: 0.9rem;
    }

    .temp-time {
      color: #8892b0;
      font-size: 0.8rem;
      margin-top: 2px;
    }
  }
`;

export const StatusIndicator = styled.div`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background: rgba(100, 255, 218, 0.2);
  color: #64ffda;
  border: 1px solid #64ffda;
  display: inline-flex;
  align-items: center;
  gap: 5px;
`;

export const InfoSection = styled.div`
  margin-bottom: 0;
  padding: 10px 15px;
  background: rgba(26, 111, 196, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(26, 111, 196, 0.3);
`;

export const PeriodCard = styled.div<PeriodCardProps>`
  background: rgba(10, 25, 47, 0.3);
  border: 2px solid ${props => {
    if (props.$isActive) return '#64ffda';
    return props.$hasDanger ? '#ff6b6b' : '#1a6fc4';
  }};
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-color: ${props => props.$isActive ? '#64ffda' : (props.$hasDanger ? '#ff6b6b' : '#64ffda')};
    box-shadow: 0 4px 12px rgba(100, 255, 218, 0.1);
  }

  ${props => props.$isActive && `
    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border: 2px solid #64ffda;
      border-radius: 10px;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }
  `}
`;

export const TafHeader = styled.div`
  text-align: center;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(26, 111, 196, 0.3);

  .header-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    flex-wrap: wrap;
    gap: 15px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  }

  h3 {
    color: #64ffda;
    margin: 0;
    font-size: 1.8rem;
  }

  .taf-meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 10px;
    max-width: 800px;
    margin: 0 auto;
  }
`;