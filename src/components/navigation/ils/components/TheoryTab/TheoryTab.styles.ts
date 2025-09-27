import styled from 'styled-components';

export const TheoryContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 80vh;
  background: 
    radial-gradient(circle at 20% 80%, rgba(100, 255, 218, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(26, 111, 196, 0.05) 0%, transparent 50%),
    linear-gradient(135deg, rgba(10, 25, 47, 0.9) 0%, rgba(17, 34, 64, 0.9) 100%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #64ffda, transparent);
  }
`;

export const DecorativeElements = styled.div`
  .grid-lines {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(90deg, transparent 99%, rgba(100, 255, 218, 0.03) 100%),
      linear-gradient(180deg, transparent 99%, rgba(100, 255, 218, 0.03) 100%);
    background-size: 50px 50px;
    pointer-events: none;
  }
  
  .corner-deco {
    position: absolute;
    width: 30px;
    height: 30px;
    
    &.corner-1 {
      top: 20px;
      left: 20px;
      border-top: 2px solid #64ffda;
      border-left: 2px solid #64ffda;
    }
    
    &.corner-2 {
      top: 20px;
      right: 20px;
      border-top: 2px solid #64ffda;
      border-right: 2px solid #64ffda;
    }
    
    &.corner-3 {
      bottom: 20px;
      left: 20px;
      border-bottom: 2px solid #64ffda;
      border-left: 2px solid #64ffda;
    }
    
    &.corner-4 {
      bottom: 20px;
      right: 20px;
      border-bottom: 2px solid #64ffda;
      border-right: 2px solid #64ffda;
    }
  }
`;