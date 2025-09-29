// components/Hero/Hero.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HeroContainer,
  HeroContent,
  Title,
  Subtitle,
  CTAButtons,
  FeatureHighlight,
  Feature,
  StyledPrimaryButton,
  StyledSecondaryButton
} from './Hero.styles';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const handleLearnMore = () => {
    const element = document.getElementById('features');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

    const handleStartLearning = () => {
    navigate('/navigation');
  };

  return (
    <HeroContainer>
      <HeroContent>
        <Title>
          <span className="gradient-text">AeroTrainer</span>
          <span className="subtitle">Профессиональная подготовка пилотов</span>
        </Title>
        
        <Subtitle>
          Освойте авиационную навигацию и метеорологию в самой современной 
          интерактивной среде. От новичка до профессионала — один курс.
        </Subtitle>
        
        <CTAButtons>
          <StyledPrimaryButton onClick={handleStartLearning}>
            🚀 Начать обучение
          </StyledPrimaryButton>
          <StyledSecondaryButton onClick={handleLearnMore}>
            📚 Узнать о возможностях
          </StyledSecondaryButton>
        </CTAButtons>

        <FeatureHighlight>
          <Feature>✅ Аккредитовано авиаинструкторами</Feature>
          <Feature>🔄 Симуляция реальных полетных условий</Feature>
          <Feature>📊 Персональная статистика прогресса</Feature>
          <Feature>🎯 Гарантия результата</Feature>
        </FeatureHighlight>
      </HeroContent>
    </HeroContainer>
  );
};