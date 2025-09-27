import React from 'react';
import './CDINeedle.css';

interface CDINeedleProps {
  deflection: number; // от -1 (полное лево) до +1 (полное право)
}

export const CDINeedle: React.FC<CDINeedleProps> = ({ deflection }) => {
  const needlePosition = deflection * 120;

  return (
    <div className="cdi-indicator">
      <div className="cdi-scale">
        {/* Деления шкалы */}
        <div className="scale-mark left"></div>
        <div className="scale-mark center"></div>
        <div className="scale-mark right"></div>
        
        {/* Точечные маркеры */}
        <div className="dot-markers">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        
        {/* Стрелка отклонения */}
        <div
          className="cdi-needle"
          style={{ transform: `translateX(${needlePosition}px)` }}
        ></div>
        
        {/* Центральная линия */}
        <div className="center-line"></div>
      </div>
      
      {/* Подписи шкалы */}
      <div className="cdi-labels">
        <span className="label-left">L</span>
        <span className="label-center">C</span>
        <span className="label-right">R</span>
      </div>
    </div>
  );
};