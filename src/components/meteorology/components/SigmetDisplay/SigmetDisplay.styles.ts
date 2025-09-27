// src/components/meteorology/components/SigmetDisplay/SigmetDisplay.styles.ts
import styled from 'styled-components';

interface SigmetCardProps {
  hazardType: string;
}

interface HazardLevelProps {
  level: string;
}

export const SigmetContainer = styled.div`
  background: rgba(26, 111, 196, 0.05);
  border: 1px solid #1a6fc4;
  border-radius: 12px;
  padding: 25px;
  margin-top: 20px;
`;

export const SigmetCard = styled.div<SigmetCardProps>`
  background: rgba(10, 25, 47, 0.3);
  border: 1px solid ${props => getHazardColor(props.hazardType)};
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;

  .sigmet-header {
    padding: 20px;
    background: ${props => `${getHazardColor(props.hazardType)}20`};
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${props => getHazardColor(props.hazardType)}40;

    .hazard-info {
      display: flex;
      align-items: center;
      gap: 15px;

      .hazard-icon {
        font-size: 2rem;
      }

      h4 {
        color: #e6f1ff;
        margin: 0;
        text-transform: capitalize;
        font-size: 1.2rem;
      }
    }
  }

  .sigmet-content {
    padding: 20px;

    p {
      color: #e6f1ff;
      line-height: 1.6;
      margin-bottom: 15px;
    }

    .movement, .issuance-info {
      color: #8892b0;
      font-size: 0.9rem;
      margin-top: 10px;
    }

    .issuance-info {
      border-top: 1px solid rgba(136, 146, 176, 0.3);
      padding-top: 10px;
      margin-top: 15px;
    }
  }
`;

export const HazardLevel = styled.span<HazardLevelProps>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => {
    switch (props.level) {
      case 'SEVERE': return 'rgba(255, 107, 107, 0.3)';
      case 'EXTREME': return 'rgba(157, 78, 221, 0.3)';
      case 'MODERATE': return 'rgba(255, 215, 0, 0.3)';
      case 'LIGHT': return 'rgba(100, 255, 218, 0.3)';
      default: return 'rgba(136, 146, 176, 0.3)';
    }
  }};
  color: ${props => {
    switch (props.level) {
      case 'SEVERE': return '#ff6b6b';
      case 'EXTREME': return '#9d4edd';
      case 'MODERATE': return '#ffd700';
      case 'LIGHT': return '#64ffda';
      default: return '#8892b0';
    }
  }};
`;

export const AffectedArea = styled.div`
  background: rgba(26, 111, 196, 0.1);
  border: 1px solid #1a6fc4;
  border-radius: 6px;
  padding: 12px;
  margin: 10px 0;
  color: #e6f1ff;

  strong {
    color: #64ffda;
  }

  div {
    margin-top: 5px;
    font-size: 0.9rem;
    color: #8892b0;
  }
`;

export const TimeIndicator = styled.div`
  color: #8892b0;
  font-size: 0.9rem;
  font-family: 'Share Tech Mono', monospace;
`;

// Вспомогательная функция для цветов опасностей
const getHazardColor = (hazardType: string): string => {
  const colors: Record<string, string> = {
    'THUNDERSTORM': '#ff6b6b',
    'TURBULENCE': '#ffd700',
    'ICING': '#64ffda',
    'VOLCANIC_ASH': '#9d4edd',
    'DUST_STORM': '#8b4513',
    'SAND_STORM': '#deb887',
    'CYCLONE': '#1a6fc4',
    'FOG': '#8892b0'
  };
  return colors[hazardType] || '#e6f1ff';
};