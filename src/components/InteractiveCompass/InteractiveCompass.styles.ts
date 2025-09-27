import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

export const CompassContainer = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

export const CompassCircle = styled.div<{ $rotation: number }>`
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border-radius: 50%;
  background: rgba(100, 255, 218, 0.1);
  border: 2px solid #64ffda;
  position: relative;
  cursor: pointer;
  transition: transform 0.5s ease-in-out;
  transform: rotate(${props => props.$rotation}deg);
  
  &:hover {
    background: rgba(100, 255, 218, 0.2);
    animation: ${pulse} 1s ease-in-out;
  }
`;

export const CompassNeedle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 40px;
  background: #ff4757;
  transform: translate(-50%, -50%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 10px solid #ff4757;
  }
`;

export const CompassText = styled.div`
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  font-weight: bold;
  color: #64ffda;
`;

export const Instruction = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #64ffda;
  font-weight: 500;
`;