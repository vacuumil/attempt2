// AnimatedVector.tsx
import React, { useState, useEffect } from 'react';

interface AnimatedVectorProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  label: string;
  delay: number;
  duration?: number;
  showLabel?: boolean;
  onAnimationComplete?: () => void;
}

export const AnimatedVector: React.FC<AnimatedVectorProps> = ({
  startX,
  startY,
  endX,
  endY,
  color,
  label,
  delay,
  duration = 1000,
  showLabel = true,
  onAnimationComplete
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let startTime: number | null = null;
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const newProgress = Math.min(elapsed / duration, 1);
        
        setProgress(newProgress);
        
        if (newProgress < 1) {
          requestAnimationFrame(animate);
        } else {
          onAnimationComplete?.();
        }
      };
      
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, duration, onAnimationComplete]);

  const currentEndX = startX + (endX - startX) * progress;
  const currentEndY = startY + (endY - startY) * progress;

  // Рассчитываем угол для стрелки
  const angle = Math.atan2(currentEndY - startY, currentEndX - startX);
  const arrowSize = 10;

  return (
    <g>
      {/* Основная линия вектора */}
      <line
        x1={startX}
        y1={startY}
        x2={currentEndX}
        y2={currentEndY}
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        className="animated-vector-line"
      />
      
      {/* Стрелка (появляется когда вектор почти дорисован) */}
      {progress > 0.9 && (
        <path
          d={`M ${currentEndX} ${currentEndY} 
               L ${currentEndX - arrowSize * Math.cos(angle - Math.PI / 6)} 
                 ${currentEndY - arrowSize * Math.sin(angle - Math.PI / 6)}
               L ${currentEndX - arrowSize * Math.cos(angle + Math.PI / 6)} 
                 ${currentEndY - arrowSize * Math.sin(angle + Math.PI / 6)} 
               Z`}
          fill={color}
          className="animated-vector-arrow"
          style={{ opacity: (progress - 0.9) * 10 }}
        />
      )}
      
      {/* Подпись (появляется с задержкой) */}
      {showLabel && progress > 0.8 && (
        <text
          x={(startX + currentEndX) / 2}
          y={(startY + currentEndY) / 2 - 15}
          fill={color}
          fontSize="11"
          fontWeight="bold"
          textAnchor="middle"
          className="animated-vector-label"
          style={{ opacity: (progress - 0.8) * 5 }}
        >
          {label}
        </text>
      )}
    </g>
  );
};