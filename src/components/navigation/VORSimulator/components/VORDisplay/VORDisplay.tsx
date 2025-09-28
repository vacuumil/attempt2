import React from 'react';
import {
  DisplayContainer,
  FrequencyDisplay,
  SignalIndicator,
  IdentIndicator,
  CompassRose,
  Needle,
  SelectedRadial,
  DeviationIndicator,
  CourseIndicator
} from './VORDisplay.styles';

interface VORDisplayProps {
  frequency: number;
  selectedRadial: number;
  currentRadial: number;
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
  deviation,
  isOnCourse,
  signalStrength,
  isIdentPlaying,
  morseCode
}) => {
  // Функция для отрисовки маркеров компаса по периметру
  const renderCompassMarkers = () => {
    const markers = [];
    const radius = 110; // Уменьшаем радиус для лучшей видимости

    // Основные маркеры (0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330)
    for (let angle = 0; angle < 360; angle += 30) {
      const radian = (angle * Math.PI) / 180;
      const x = Math.sin(radian) * radius;
      const y = -Math.cos(radian) * radius;
      
      let displayText;
      let fontSize = '1rem';
      let fontWeight = 'bold';
      let textColor = '#64ffda';
      let textShadow = '0 0 8px rgba(100, 255, 218, 0.9)';
      let backgroundColor = 'rgba(10, 25, 47, 0.9)';
      let padding = '2px 6px';
      let borderRadius = '10px';

      switch (angle) {
        case 0:
          displayText = 'N';
          break;
        case 90:
          displayText = 'E';
          break;
        case 180:
          displayText = 'S';
          break;
        case 270:
          displayText = 'W';
          break;
        default:
          displayText = angle.toString();
          fontSize = '0.9rem';
          fontWeight = '600';
          textColor = '#8892b0';
          textShadow = '0 0 4px rgba(136, 146, 176, 0.7)';
          backgroundColor = 'rgba(10, 25, 47, 0.8)';
          padding = '1px 4px';
          borderRadius = '6px';
      }

      markers.push(
        <div
          key={`marker-${angle}`}
          style={{
            position: 'absolute',
            top: `calc(50% + ${y}px)`,
            left: `calc(50% + ${x}px)`,
            transform: 'translate(-50%, -50%)',
            color: textColor,
            fontSize: fontSize,
            fontWeight: fontWeight,
            textShadow: textShadow,
            backgroundColor: backgroundColor,
            padding: padding,
            borderRadius: borderRadius,
            border: '1px solid rgba(100, 255, 218, 0.3)',
            minWidth: '20px',
            textAlign: 'center',
            zIndex: 5
          }}
        >
          {displayText}
        </div>
      );
    }

    // Линии маркеров (делаем их более заметными)
    for (let angle = 0; angle < 360; angle += 10) {
      const isMajor = angle % 30 === 0;
      const length = isMajor ? 18 : 10;
      const width = isMajor ? '2px' : '1px';
      const color = isMajor ? '#64ffda' : 'rgba(100, 255, 218, 0.6)';
      
      markers.push(
        <div
          key={`line-${angle}`}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: width,
            height: `${length}px`,
            background: color,
            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
            transformOrigin: 'center',
            borderRadius: '1px',
            zIndex: 2
          }}
        />
      );
    }

    // Центральный круг
    markers.push(
      <div
        key="center-circle"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '12px',
          height: '12px',
          background: '#64ffda',
          border: '2px solid #0a192f',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          boxShadow: '0 0 10px rgba(100, 255, 218, 0.8)'
        }}
      />
    );

    return markers;
  };

  return (
    <DisplayContainer>
      <FrequencyDisplay>{frequency.toFixed(2)} MHz</FrequencyDisplay>
      
      <SignalIndicator strength={signalStrength} />
      
      <IdentIndicator isPlaying={isIdentPlaying}>
        IDENT: {morseCode}
      </IdentIndicator>
      
      <CompassRose>
        <Needle angle={currentRadial} />
        <SelectedRadial angle={selectedRadial} />
        {renderCompassMarkers()}
      </CompassRose>
      
      <DeviationIndicator deviation={deviation} />
      <CourseIndicator isOnCourse={isOnCourse}>
        {isOnCourse ? 'НА КУРСЕ' : 'ВНЕ КУРСА'}
      </CourseIndicator>
    </DisplayContainer>
  );
};