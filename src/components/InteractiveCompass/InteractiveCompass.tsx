import React, { useState } from 'react';
import {
  CompassContainer,
  CompassCircle,
  CompassNeedle,
  CompassText,
  Instruction
} from './InteractiveCompass.styles';

export const InteractiveCompass: React.FC = () => {
  const [rotation, setRotation] = useState(0);

  const handleCompassClick = () => {
    // Просто вращаем компас на случайный угол при клике
    const randomRotation = Math.floor(Math.random() * 360);
    setRotation(randomRotation);
  };

  const getDirection = (angle: number) => {
    const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
    const index = Math.round(angle / 45) % 8;
    return directions[index];
  };

  return (
    <CompassContainer>
      <h4 style={{ marginBottom: '1rem', color: '#64ffda' }}>Крути компас!</h4>
      
      <CompassCircle 
        onClick={handleCompassClick}
        $rotation={rotation}
      >
        <CompassNeedle />
        
        <CompassText>
          {rotation}°
        </CompassText>
      </CompassCircle>

      <Instruction>
        Нажми на компас — он повернется!
      </Instruction>

      <div style={{ 
        marginTop: '0.5rem', 
        fontSize: '0.9rem', 
        color: '#8892b0' 
      }}>
        Направление: {getDirection(rotation)}
      </div>
    </CompassContainer>
  );
};