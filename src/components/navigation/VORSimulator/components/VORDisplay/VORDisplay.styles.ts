import styled, { keyframes } from 'styled-components';

const morseBeep = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

const glow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 2px #64ffda); }
  50% { filter: drop-shadow(0 0 6px #64ffda); }
`;

export const DisplayContainer = styled.div`
  background: linear-gradient(135deg, #0a192f 0%, #112240 100%);
  border: 2px solid #64ffda;
  border-radius: 15px;
  padding: 1.5rem;
  min-height: 350px;
  position: relative;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(100, 255, 218, 0.1);
`;

export const FrequencyDisplay = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(100, 255, 218, 0.15);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.2rem;
  color: #64ffda;
  border: 1px solid rgba(100, 255, 218, 0.3);
  animation: ${glow} 2s ease-in-out infinite;
`;

export const ToFromIndicator = styled.div<{ active: boolean }>`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%)' 
    : 'rgba(100, 255, 218, 0.1)'};
  color: ${props => props.active ? '#0a192f' : '#64ffda'};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.1rem;
  border: 1px solid rgba(100, 255, 218, 0.3);
`;

export const SignalIndicator = styled.div<{ strength: number }>`
  position: absolute;
  top: 3.5rem;
  left: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #8892b0;
  
  &::before {
    content: '📶 СИГНАЛ';
    margin-right: 0.5rem;
  }
  
  &::after {
    content: '';
    width: 60px;
    height: 6px;
    background: ${props => 
      props.strength > 0.7 ? 'linear-gradient(90deg, #64ffda, #1a6fc4)' : 
      props.strength > 0.3 ? 'linear-gradient(90deg, #ffa726, #ff6b6b)' : 
      'linear-gradient(90deg, #ff4757, #dc3545)'};
    border-radius: 3px;
    box-shadow: 0 0 4px ${props => 
      props.strength > 0.7 ? 'rgba(100, 255, 218, 0.5)' : 
      props.strength > 0.3 ? 'rgba(255, 167, 38, 0.5)' : 
      'rgba(255, 71, 87, 0.5)'};
  }
`;

export const IdentIndicator = styled.div<{ isPlaying: boolean }>`
  position: absolute;
  top: 3.5rem;
  right: 1rem;
  color: ${props => props.isPlaying ? '#64ffda' : '#8892b0'};
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  animation: ${props => props.isPlaying ? morseBeep : 'none'} 0.5s infinite;
  
  &::before {
    content: '🔈 ';
  }
`;

export const CompassRose = styled.div`
  width: 260px;
  height: 260px;
  border: 3px solid #64ffda;
  border-radius: 50%;
  margin: 2.5rem auto 1rem;
  position: relative;
  background: 
    radial-gradient(circle at center, rgba(26, 58, 95, 0.4) 0%, rgba(10, 25, 47, 0.8) 70%),
    rgba(10, 25, 47, 0.6);
  box-shadow: 
    inset 0 0 30px rgba(100, 255, 218, 0.15),
    0 0 25px rgba(100, 255, 218, 0.2);
  backdrop-filter: blur(2px);
`;

export const Needle = styled.div<{ angle: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3px;
  height: 100px;
  background: linear-gradient(to top, #ff6b6b, #ff4757);
  transform-origin: bottom center;
  transform: translate(-50%, -100%) rotate(${props => props.angle}deg);
  z-index: 2;
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(255, 107, 107, 0.5);
`;

export const SelectedRadial = styled.div<{ angle: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 80px;
  background: linear-gradient(to top, #64ffda, #1a6fc4);
  transform-origin: bottom center;
  transform: translate(-50%, -100%) rotate(${props => props.angle}deg);
  z-index: 1;
  border-radius: 2px;
  box-shadow: 0 0 8px rgba(100, 255, 218, 0.4);
`;

export const DeviationIndicator = styled.div<{ deviation: number }>`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  width: 150px;
  height: 25px;
  background: rgba(100, 255, 218, 0.1);
  border: 1px solid #64ffda;
  border-radius: 12px;
  transform: translateX(-50%);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 3px;
    height: 100%;
    background: #64ffda;
    transform: translateX(-50%);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    background: ${props => Math.abs(props.deviation) < 5 ? '#64ffda' : '#ff6b6b'};
    border-radius: 50%;
    transform: translate(-50%, -50%) translateX(${props => Math.max(-70, Math.min(70, props.deviation * 1.2))}px);
    transition: transform 0.3s ease;
    box-shadow: 0 0 8px ${props => Math.abs(props.deviation) < 5 ? 'rgba(100, 255, 218, 0.6)' : 'rgba(255, 107, 107, 0.6)'};
  }
`;

export const CourseIndicator = styled.div<{ isOnCourse: boolean }>`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  color: ${props => props.isOnCourse ? '#64ffda' : '#ff6b6b'};
  font-weight: bold;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '${props => props.isOnCourse ? '✓' : '✗'}';
    font-size: 1.3rem;
  }
`;