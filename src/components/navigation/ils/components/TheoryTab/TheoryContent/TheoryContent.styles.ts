import styled, { keyframes } from 'styled-components';

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

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const ContentFlow = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
`;

export const NavigationDots = styled.div`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 100;

  @media (max-width: 768px) {
    position: static;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 2rem;
    transform: none;
  }
`;

export const Dot = styled.div<{ $active: boolean; $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$active ? props.$color : 'rgba(136, 146, 176, 0.3)'};
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.$active ? props.$color : 'transparent'};
  
  &:hover {
    transform: scale(1.2);
    background: ${props => props.$color};
  }
`;

export const Chapter = styled.section<{ $active: boolean }>`
  display: ${props => props.$active ? 'block' : 'none'};
  animation: ${fadeInUp} 0.6s ease-out;
  margin-bottom: 4rem;
`;

export const ChapterHeader = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(100, 255, 218, 0.2);
`;

export const ChapterTitle = styled.h1<{ $color: string }>`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, ${props => props.$color} 0%, #e6f1ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
`;

export const ChapterSubtitle = styled.p`
  font-size: 1.2rem;
  color: #8892b0;
  font-style: italic;
`;

export const ContentSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const TextBlock = styled.div`
  line-height: 1.7;
  
  p {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    color: #e6f1ff;
  }
  
  strong {
    color: #64ffda;
    font-weight: 600;
  }
`;

export const KeyConcept = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(17, 34, 64, 0.5);
  border-radius: 12px;
  border-left: 4px solid ${props => props.$color};
  margin: 2rem 0;
  
  span {
    font-size: 2rem;
  }
  
  strong {
    color: ${props => props.$color};
    display: block;
    margin-bottom: 0.5rem;
  }
`;

export const InteractiveIllustration = styled.div`
  position: sticky;
  top: 2rem;
`;

export const IllustrationContainer = styled.div`
  background: rgba(10, 25, 47, 0.8);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(100, 255, 218, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  .ils-visual {
    width: 100%;
    height: 200px;
    position: relative;
    background: linear-gradient(135deg, #0a192f 0%, #1a2f4b 100%);
    border-radius: 8px;
    overflow: hidden;
    
    .runway {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      height: 30px;
      background: #4a5568;
    }
    
    .localizer-beam {
      position: absolute;
      top: 0;
      bottom: 30px;
      left: 50%;
      width: 4px;
      background: linear-gradient(transparent, #64ffda);
      transform: translateX(-50%);
    }
    
    .glidepath-beam {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #ff6b6b, transparent);
    }
    
    .aircraft {
      position: absolute;
      top: 30%;
      left: 30%;
      width: 20px;
      height: 20px;
      background: #e6f1ff;
      clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
      animation: ${pulse} 2s ease-in-out infinite;
    }
  }
`;

export const IllustrationCaption = styled.p`
  text-align: center;
  color: #8892b0;
  font-size: 0.9rem;
  margin-top: 1rem;
  font-style: italic;
`;

export const ConceptGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

export const ConceptItem = styled.div<{ $color: string }>`
  text-align: center;
  padding: 2rem;
  background: rgba(17, 34, 64, 0.4);
  border-radius: 12px;
  border: 1px solid rgba(100, 255, 218, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    border-color: ${props => props.$color};
    box-shadow: 0 10px 30px rgba(100, 255, 218, 0.1);
  }
  
  .concept-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  h4 {
    color: ${props => props.$color};
    margin-bottom: 0.5rem;
    font-size: 1.3rem;
  }
  
  p {
    color: #8892b0;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .concept-details {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    
    span {
      font-size: 0.8rem;
      color: #64ffda;
      font-family: 'Share Tech Mono', monospace;
    }
  }
`;