// src/components/ui/ProgressBar/ProgressBar.styles.ts
import styled from 'styled-components';

export const ProgressContainer = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(100, 255, 218, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
`;

export const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, #1a6fc4 0%, #64ffda 100%);
  border-radius: 4px;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;