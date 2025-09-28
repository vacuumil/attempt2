import React from 'react';
import styled, { keyframes } from 'styled-components';

const morseBeep = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

const DisplayContainer = styled.div`
  background: #0a192f;
  border: 2px solid #64ffda;
  border-radius: 10px;
  padding: 1.5rem;
  min-height: 300px;
  position: relative;
  margin-bottom: 2rem;
`;

const FrequencyDisplay = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(100, 255, 218, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.2rem;
  color: #64ffda;
`;

const ToFromIndicator = styled.div<{ active: boolean }>`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${props => props.active ? '#64ffda' : 'rgba(100, 255, 218, 0.1)'};
  color: ${props => props.active ? '#0a192f' : '#64ffda'};
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
`;

const SignalIndicator = styled.div<{ strength: number }>`
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &::before {
    content: '📶';
    margin-right: 0.5rem;
  }
  
  &::after {
    content: '';
    width: 60px;
    height: 4px;
    background: ${props => 
      props.strength > 0.7 ? '#64ffda' : 
      props.strength > 0.3 ? '#ffa726' : 
      '#ff4757'};
    border-radius: 2px;
  }
`;

const IdentIndicator = styled.div<{ isPlaying: boolean }>`
  position: absolute;
  top: 3rem;
  left: 1rem;
  color: ${props => props.isPlaying ? '#64ffda' : '#8892b0'};
  font-family: 'Share Tech Mono', monospace;
  animation: ${props => props.isPlaying ? morseBeep : 'none'} 0.5s infinite;
`;

const CompassRose = styled.div`
  width: 200px;
  height: 200px;
  border: 2px solid #64ffda;
  border-radius: 50%;
  margin: 3rem auto 1rem;
  position: relative;
  background: rgba(26, 58, 95, 0.5);
`;

const Needle = styled.div<{ angle: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 90px;
  background: #ff6b6b;
  transform-origin: bottom center;
  transform: translate(-50%, -100%) rotate(${props => props.angle}deg);
`;

const SelectedRadial = styled.div<{ angle: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 70px;
  background: #64ffda;
  transform-origin: bottom center;
  transform: translate(-50%, -100%) rotate(${props => props.angle}deg);
`;

const DeviationIndicator = styled.div<{ deviation: number }>`
  position: absolute;
  bottom: 20px;
  left: 50%;
  width: 120px;
  height: 20px;
  background: rgba(100, 255, 218, 0.1);
  border: 1px solid #64ffda;
  border-radius: 10px;
  transform: translateX(-50%);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 2px;
    height: 100%;
    background: #64ffda;
    transform: translateX(-50%);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    background: ${props => Math.abs(props.deviation) < 5 ? '#64ffda' : '#ff6b6b'};
    border-radius: 50%;
    transform: translate(-50%, -50%) translateX(${props => Math.max(-50, Math.min(50, props.deviation * 0.5))}px);
    transition: transform 0.3s ease;
  }
`;

const CourseIndicator = styled.div<{ isOnCourse: boolean }>`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  color: ${props => props.isOnCourse ? '#64ffda' : '#ff6b6b'};
  font-weight: bold;
  
  &::before {
    content: '${props => props.isOnCourse ? '✓' : '✗'}';
    margin-right: 0.5rem;
  }
`;

interface VORDisplayProps {
  frequency: number;
  selectedRadial: number;
  currentRadial: number;
  toFrom: 'TO' | 'FROM';
  deviation: number;
  isOnCourse: boolean;
  signalStrength: number;
  isIdentPlaying: boolean;
  morseCode: string;
}

export const VORDisplay: React.FC<VORDisplayProps> = ({
  frequency,
  selectedRadial,
  currentRadial,
  toFrom,
  deviation,
  isOnCourse,
  signalStrength,
  isIdentPlaying,
  morseCode
}) => {
  return (
    <DisplayContainer>
      <FrequencyDisplay>{frequency.toFixed(2)} MHz</FrequencyDisplay>
      <ToFromIndicator active={toFrom === 'TO'}>
        {toFrom}
      </ToFromIndicator>
      
      <SignalIndicator strength={signalStrength} />
      
      <IdentIndicator isPlaying={isIdentPlaying}>
        IDENT: {morseCode}
      </IdentIndicator>
      
      <CompassRose>
        <Needle angle={currentRadial} />
        <SelectedRadial angle={selectedRadial} />
        
        {/* Маркеры компаса */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => (
          <div
            key={angle}
            style={{
              position: 'absolute',
              top: angle % 90 === 0 ? '5px' : '10px',
              left: '50%',
              transform: `translateX(-50%) rotate(${angle}deg)`,
              color: '#8892b0',
              fontSize: angle % 90 === 0 ? '0.8rem' : '0.6rem',
              transformOrigin: 'bottom center'
            }}
          >
            {angle}
          </div>
        ))}
      </CompassRose>
      
      <DeviationIndicator deviation={deviation} />
      <CourseIndicator isOnCourse={isOnCourse}>
        {isOnCourse ? 'На курсе' : 'Вне курса'}
      </CourseIndicator>
    </DisplayContainer>
  );
};