// src/components/meteorology/components/MetarDisplay/MetarDisplay.styles.ts
import styled from 'styled-components';

export const MetarContainer = styled.div`
  background: rgba(26, 111, 196, 0.05);
  border: 1px solid #1a6fc4;
  border-radius: 12px;
  padding: 25px;
  margin-top: 30px;
`;

export const RawMetar = styled.div`
  background: rgba(10, 25, 47, 0.8);
  border: 1px solid #64ffda;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  text-align: center;

  code {
    color: #64ffda;
    font-family: 'Share Tech Mono', monospace;
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 1px;
  }
`;

export const TimeInfo = styled.div`
  color: #8892b0;
  font-size: 0.9rem;
  margin-top: 10px;
  font-style: italic;
`;

export const DecodingTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background: rgba(26, 111, 196, 0.1);
  }

  &:hover {
    background: rgba(100, 255, 218, 0.05);
  }
`;

export const ParameterCell = styled.td`
  padding: 12px 15px;
  border: 1px solid #1a6fc4;
  color: #e6f1ff;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  vertical-align: top;
  width: 20%;

  code {
    background: rgba(100, 255, 218, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    color: #64ffda;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.9rem;
  }
`;

export const DecodingCell = styled.td`
  padding: 12px 15px;
  border: 1px solid #1a6fc4;
  color: #8892b0;
  line-height: 1.5;
`;

interface ShowMoreButtonProps {
  isActive: boolean;
}

export const ShowMoreButton = styled.button<ShowMoreButtonProps>`
  width: 100%;
  padding: 15px;
  background: ${props => props.isActive 
    ? 'rgba(26, 111, 196, 0.2)' 
    : 'rgba(100, 255, 218, 0.1)'
  };
  border: 1px solid ${props => props.isActive ? '#1a6fc4' : '#64ffda'};
  border-radius: 8px;
  color: ${props => props.isActive ? '#1a6fc4' : '#64ffda'};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 15px;

  &:hover {
    background: ${props => props.isActive 
      ? 'rgba(26, 111, 196, 0.3)' 
      : 'rgba(100, 255, 218, 0.2)'
    };
    transform: translateY(-2px);
  }
`;

export const EducationalSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: rgba(10, 25, 47, 0.5);
  border: 1px solid #1a6fc4;
  border-radius: 8px;
`;

export const EducationalContent = styled.div`
  color: #8892b0;
  line-height: 1.6;

  h3 {
    color: #64ffda;
    margin-bottom: 15px;
  }

  h4 {
    color: #e6f1ff;
    margin: 15px 0 10px 0;
  }

  ul {
    margin: 10px 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 8px;
  }

  strong {
    color: #e6f1ff;
  }

  code {
    background: rgba(100, 255, 218, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    color: #64ffda;
    font-family: 'Share Tech Mono', monospace;
  }
`;

// Новые стили для секции примечаний
export const RemarksSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: rgba(10, 25, 47, 0.3);
  border: 1px solid #1a6fc4;
  border-radius: 8px;
`;

interface RemarkItemProps {
  type: string;
}

export const RemarkItem = styled.div<RemarkItemProps>`
  padding: 12px 15px;
  margin-bottom: 10px;
  background: rgba(26, 111, 196, 0.1);
  border-left: 4px solid ${props => getRemarkTypeColor(props.type)};
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(26, 111, 196, 0.2);
    transform: translateX(2px);
  }
`;

export const RemarkTypeBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #0a192f;
  min-width: 60px;
  text-align: center;
`;

// Вспомогательная функция для цветов типов примечаний
const getRemarkTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    'weather': '#ff6b6b',
    'temperature': '#64ffda',
    'pressure': '#1a6fc4',
    'wind': '#ffd700',
    'runway': '#9d4edd',
    'system': '#8892b0',
    'other': '#e6f1ff'
  };
  return colors[type] || '#e6f1ff';
};