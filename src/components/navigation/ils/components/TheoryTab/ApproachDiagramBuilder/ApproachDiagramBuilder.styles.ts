import styled from 'styled-components';

export const BuilderContainer = styled.div`
  background: rgba(17, 34, 64, 0.3);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(100, 255, 218, 0.2);
`;

export const BuilderTitle = styled.h3`
  color: #64ffda;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.6rem;
`;

export const InteractiveDemo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

export const DemoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled.h4`
  color: #64ffda;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

export const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: rgba(17, 34, 64, 0.5);
  padding: 1.5rem;
  border-radius: 10px;
  
  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  label {
    color: #e6f1ff;
    font-weight: 500;
  }
  
  input[type="range"] {
    width: 100%;
    height: 6px;
    background: rgba(100, 255, 218, 0.2);
    border-radius: 3px;
    
    &::-webkit-slider-thumb {
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #64ffda;
      cursor: pointer;
    }
  }
`;

export const Instruction = styled.div`
  padding: 0.7rem;
  background: rgba(100, 255, 218, 0.1);
  border-radius: 5px;
  color: #64ffda;
  font-size: 0.9rem;
  border-left: 3px solid #64ffda;
  min-height: 3rem;
  display: flex;
  align-items: center;
`;

export const DeviationInfo = styled.div`
  background: rgba(17, 34, 64, 0.5);
  padding: 1.5rem;
  border-radius: 10px;
  margin-top: 1rem;
  
  h4 {
    color: #64ffda;
    margin-bottom: 1rem;
  }
  
  ul {
    color: #e6f1ff;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }
    
    strong {
      color: #64ffda;
    }
  }
`;

export const Visualization = styled.div`
  background: #0a192f;
  padding: 2rem;
  border-radius: 10px;
  border: 2px solid rgba(100, 255, 218, 0.2);
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PFDDisplay = styled.div`
  width: 300px;
  height: 250px;
  position: relative;
  
  .pfd-background {
    width: 100%;
    height: 100%;
    background: #1a2f4b;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
  }
  
  .crosshair {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    pointer-events: none;
    
    .vertical-line {
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 1px;
      background: rgba(100, 255, 218, 0.3);
    }
    
    .horizontal-line {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: rgba(100, 255, 218, 0.3);
    }
  }
  
  .situation-info {
    margin-top: 1rem;
    text-align: center;
    color: #e6f1ff;
    
    h4 {
      color: #64ffda;
      margin-bottom: 0.5rem;
    }
    
    p {
      margin: 0.3rem 0;
    }
  }
`;

export const LocalizerDisplay = styled.div<{ $deviation: number }>`
  position: absolute;
  top: 50%;
  left: 20px;
  right: 50px;
  height: 40px;
  transform: translateY(-50%);
  
  .scale-horizontal {
    position: relative;
    width: 100%;
    height: 100%;
    
    .dots {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      padding: 0 40px;
      
      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(136, 146, 176, 0.5);
        
        &.center {
          width: 8px;
          height: 8px;
          background: #64ffda;
        }
      }
    }
    
    .diamond {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      transition: left 0.3s ease;
      
      .diamond-shape {
        width: 12px;
        height: 12px;
        background: #ff6b6b;
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      }
    }
    
    .center-line {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 2px;
      height: 100%;
      background: rgba(100, 255, 218, 0.5);
    }
  }
  
  .label {
    position: absolute;
    right: -30px;
    top: 50%;
    transform: translateY(-50%);
    color: #64ffda;
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

export const GlideSlopeDisplay = styled.div<{ $deviation: number }>`
  position: absolute;
  top: 20px;
  bottom: 20px;
  right: 20px;
  width: 40px;
  
  .scale-vertical {
    position: relative;
    width: 100%;
    height: 100%;
    
    .dots {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      padding: 40px 0;
      
      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(136, 146, 176, 0.5);
        
        &.center {
          width: 8px;
          height: 8px;
          background: #64ffda;
        }
      }
    }
    
    .diamond {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      transition: top 0.3s ease;
      
      .diamond-shape {
        width: 12px;
        height: 12px;
        background: #ff6b6b;
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      }
    }
    
    .center-line {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 2px;
      width: 100%;
      background: rgba(100, 255, 218, 0.5);
    }
  }
  
  .label {
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    color: #64ffda;
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

export const WindEffect = styled.div<{ $direction: number; $strength: number }>`
  position: absolute;
  top: 10px;
  left: 10px;
  
  .wind-info {
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba(255, 107, 107, 0.1);
    padding: 5px 10px;
    border-radius: 4px;
    border: 1px solid rgba(255, 107, 107, 0.3);
    
    .wind-arrow {
      font-size: 1rem;
      transform: rotate(${props => props.$direction}deg);
      color: #ff6b6b;
    }
    
    .wind-text {
      color: #ff6b6b;
      font-size: 0.8rem;
      font-weight: 600;
    }
  }
`;