// src/components/ui/ProgressBar/ProgressBar.tsx
import React from 'react';
import { ProgressContainer, ProgressBar } from './ProgressBar.styles';

interface ProgressBarProps {
  progress: number;
  max?: number;
}

export const ProgressBarComponent: React.FC<ProgressBarProps> = ({ 
  progress, 
  max = 10 
}) => {
  const percentage = (progress / max) * 100;

  return (
    <ProgressContainer>
      <ProgressBar progress={percentage} />
    </ProgressContainer>
  );
};