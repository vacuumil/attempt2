// components/Hero/Hero.styles.ts
import styled, { keyframes } from 'styled-components';

const gradientShift = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const HeroContainer = styled.section`
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2rem;
  width: 100%;
  overflow: hidden;
  /* Убираем лишние отступы, оставляя только внутренний padding */
  margin: 0;
`;

export const HeroContent = styled.div`
  text-align: center;
  max-width: 1200px;
  width: 100%;
  z-index: 2;
  margin-top: 60px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

export const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-top: 2rem;
  justify-content: center;

  .hero-text {
    text-align: left;
  }

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;

    .hero-text {
      text-align: center;
    }

    .hero-instrument {
      order: -1;
    }
  }
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 50%, #64ffda 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientShift} 3s ease-in-out infinite, ${fadeInUp} 1s ease-out;

  .gradient-text {
    background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 50%, #64ffda 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${gradientShift} 3s ease-in-out infinite;
  }
  
  .subtitle {
    display: block;
    font-size: 1.8rem;
    margin-top: 0.5rem;
    color: #8892b0;
    font-weight: 400;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    
    .subtitle {
      font-size: 1.4rem;
    }
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    
    .subtitle {
      font-size: 1.2rem;
    }
  }
`;

export const Subtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  line-height: 1.6;
  color: #e6f1ff;
  text-align: inherit;
  max-width: 100%;
  animation: ${fadeInUp} 1s ease-out 0.3s both;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  animation: ${fadeInUp} 1s ease-out 0.6s both;

  @media (max-width: 968px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const FeatureHighlight = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  width: 100%;
  max-width: 800px;
  animation: ${fadeInUp} 1s ease-out 0.9s both;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 400px;
  }

  @media (max-width: 480px) {
    gap: 0.8rem;
  }
`;

export const Feature = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.2rem 1.5rem;
  background: rgba(100, 255, 218, 0.08);
  border-radius: 16px;
  border: 1px solid rgba(100, 255, 218, 0.15);
  font-size: 1rem;
  transition: all 0.3s ease;
  text-align: center;
  min-height: 80px;

  &:hover {
    background: rgba(100, 255, 218, 0.12);
    border-color: rgba(100, 255, 218, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(100, 255, 218, 0.1);
  }

  @media (max-width: 968px) {
    padding: 1rem 1.2rem;
    font-size: 0.95rem;
    min-height: 70px;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
    min-height: 60px;
    gap: 0.6rem;
  }

  @media (max-width: 480px) {
    padding: 0.7rem 0.9rem;
    font-size: 0.85rem;
    min-height: 55px;
  }
`;

export const StyledPrimaryButton = styled.button`
  background: linear-gradient(135deg, #1a6fc4 0%, #64ffda 100%);
  padding: 16px 40px;
  font-size: 1.1rem;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 50px;
  min-width: 200px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(100, 255, 218, 0.3);
  }

  @media (max-width: 768px) {
    padding: 14px 32px;
    font-size: 1rem;
    min-width: 180px;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 280px;
    min-width: unset;
  }
`;

export const StyledSecondaryButton = styled.button`
  border: 2px solid #64ffda;
  color: #64ffda;
  padding: 16px 40px;
  background: transparent;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 50px;
  min-width: 200px;

  &:hover {
    background: rgba(100, 255, 218, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 14px 32px;
    font-size: 1rem;
    min-width: 180px;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 280px;
    min-width: unset;
  }
`;