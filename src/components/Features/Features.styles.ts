// Features.styles.ts - ОБНОВЛЕННАЯ ВЕРСИЯ
import styled, { keyframes } from 'styled-components';

const floatAnimation = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotate(0deg);
    box-shadow: 0 10px 20px rgba(100, 255, 218, 0.1);
  }
  50% { 
    transform: translateY(-15px) rotate(2deg);
    box-shadow: 0 20px 40px rgba(100, 255, 218, 0.3);
  }
`;

const glowBorder = keyframes`
  0%, 100% { 
    border-color: rgba(100, 255, 218, 0.2);
    box-shadow: 0 0 10px rgba(100, 255, 218, 0.1);
  }
  50% { 
    border-color: rgba(100, 255, 218, 0.6);
    box-shadow: 0 0 20px rgba(100, 255, 218, 0.3);
  }
`;

const iconPulse = keyframes`
  0%, 100% { 
    transform: scale(1);
    filter: drop-shadow(0 0 5px rgba(100, 255, 218, 0.3));
  }
  50% { 
    transform: scale(1.1);
    filter: drop-shadow(0 0 15px rgba(100, 255, 218, 0.6));
  }
`;

export const FeaturesContainer = styled.section`
  padding: 8rem 2rem;
  background: rgba(10, 25, 47, 0.95);
  backdrop-filter: blur(15px);
  width: 100%;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(100, 255, 218, 0.5), 
      transparent
    );
  }
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 4rem;
  background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  padding-bottom: 1rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #64ffda, #1a6fc4);
    border-radius: 2px;
  }
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  max-width: 1300px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

export const FeatureCard = styled.div`
  background: linear-gradient(145deg, 
    rgba(17, 34, 64, 0.8) 0%, 
    rgba(26, 58, 95, 0.9) 100%
  );
  padding: 2.5rem 2rem;
  border-radius: 20px;
  border: 2px solid rgba(100, 255, 218, 0.15);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  animation: ${glowBorder} 3s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, 
      transparent, 
      rgba(100, 255, 218, 0.1), 
      transparent
    );
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(100, 255, 218, 0.4);
    box-shadow: 
      0 20px 40px rgba(100, 255, 218, 0.2),
      0 0 0 1px rgba(100, 255, 218, 0.1);
    
    &::before {
      opacity: 1;
    }
    
    animation: ${floatAnimation} 2s ease-in-out infinite;
  }
  
  &:nth-child(even):hover {
    animation-delay: 0.2s;
  }
  
  &:nth-child(3n):hover {
    animation-delay: 0.4s;
  }
`;

export const FeatureIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  animation: ${iconPulse} 4s ease-in-out infinite;
  text-align: center;
  
  ${FeatureCard}:hover & {
    animation: ${iconPulse} 2s ease-in-out infinite;
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 1.2rem;
  color: #64ffda;
  text-align: center;
  font-weight: 600;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, #64ffda, transparent);
    border-radius: 1px;
  }
`;

export const FeatureDescription = styled.p`
  opacity: 0.9;
  line-height: 1.7;
  text-align: center;
  font-size: 1.1rem;
  color: rgba(230, 241, 255, 0.9);
`;