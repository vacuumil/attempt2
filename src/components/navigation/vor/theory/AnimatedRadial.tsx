import React from 'react';
import './AnimatedRadial.css';

export const AnimatedRadial: React.FC = () => {
  return (
    <div className="animated-radial">
      <svg viewBox="0 0 200 200" className="radial-svg">
        {/* Станция */}
        <circle cx="100" cy="100" r="8" fill="#64ffda" className="station-pulse" />
        
        {/* Радиалы */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="100"
            y1="100"
            x2={100 + 70 * Math.cos((angle * Math.PI) / 180)}
            y2={100 + 70 * Math.sin((angle * Math.PI) / 180)}
            stroke="#1a6fc4"
            strokeWidth="2"
            strokeDasharray="4,4"
            className="radial-line"
            style={{
              animationDelay: `${angle * 0.05}s`,
              opacity: 0.7
            }}
          />
        ))}
        
        {/* Самолет */}
        <g className="aircraft" style={{ transform: 'translate(150px, 100px)' }}>
          <path d="M-10,0 L0,-8 L10,0 L0,5 Z" fill="#ff6b6b" />
        </g>
      </svg>
      
      <div className="radial-explanation">
        <h4>Как работают радиалы?</h4>
        <p>Каждая линия представляет собой магнитный пеленг от станции. Самолет определяет свой радиал, измеряя фазу сигнала.</p>
      </div>
    </div>
  );
};