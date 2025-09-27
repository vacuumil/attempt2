import React from 'react';
import { TheoryContent } from './TheoryContent/TheoryContent';
import { TheoryContainer, DecorativeElements } from './TheoryTab.styles';

export const TheoryTab: React.FC = () => {
  return (
    <TheoryContainer>
      <DecorativeElements>
        <div className="grid-lines"></div>
        <div className="corner-deco corner-1"></div>
        <div className="corner-deco corner-2"></div>
        <div className="corner-deco corner-3"></div>
        <div className="corner-deco corner-4"></div>
      </DecorativeElements>
      <TheoryContent />
    </TheoryContainer>
  );
};