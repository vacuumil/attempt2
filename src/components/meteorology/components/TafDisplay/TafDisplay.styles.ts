// src/components/meteorology/components/TafDisplay/TafDisplay.styles.ts
import styled from 'styled-components';

interface TafPeriodProps {
  isExpanded: boolean;
}

interface ChangeIndicatorProps {
  type: string;
}

export const TafContainer = styled.div`
  background: rgba(26, 111, 196, 0.05);
  border: 1px solid #1a6fc4;
  border-radius: 12px;
  padding: 25px;
  margin-top: 20px;
`;

export const TafPeriod = styled.div<TafPeriodProps>`
  background: rgba(10, 25, 47, 0.3);
  border: 1px solid ${props => props.isExpanded ? '#64ffda' : '#1a6fc4'};
  border-radius: 8px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  overflow: hidden;

  .period-header {
    padding: 15px 20px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${props => props.isExpanded ? 'rgba(100, 255, 218, 0.05)' : 'transparent'};

    &:hover {
      background: rgba(100, 255, 218, 0.1);
    }

    .validity {
      display: flex;
      align-items: center;
      gap: 15px;
      font-size: 1.1rem;
      color: #e6f1ff;
    }

    .weather-summary {
      color: #8892b0;
      font-size: 0.9rem;
      display: flex;
      gap: 15px;
    }
  }
`;

export const ForecastGroup = styled.div`
  padding: 20px;
  background: rgba(10, 25, 47, 0.5);
  border-top: 1px solid #1a6fc4;
`;

export const WeatherTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TimelineItem = styled.div`
  color: #e6f1ff;
  line-height: 1.5;
  padding: 8px 0;
  border-bottom: 1px solid rgba(26, 111, 196, 0.3);

  &:last-child {
    border-bottom: none;
  }

  strong {
    color: #64ffda;
    margin-right: 8px;
  }
`;

export const ChangeIndicator = styled.span<ChangeIndicatorProps>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => {
    switch (props.type) {
      case 'BECMG': return 'rgba(26, 111, 196, 0.3)';
      case 'TEMPO': return 'rgba(255, 215, 0, 0.3)';
      case 'PROB': return 'rgba(157, 78, 221, 0.3)';
      case 'FM': return 'rgba(100, 255, 218, 0.3)';
      default: return 'rgba(136, 146, 176, 0.3)';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'BECMG': return '#1a6fc4';
      case 'TEMPO': return '#ffd700';
      case 'PROB': return '#9d4edd';
      case 'FM': return '#64ffda';
      default: return '#8892b0';
    }
  }};
`;