// AnimatedPoint.tsx
import React, { useState, useEffect } from 'react';

interface AnimatedPointProps {
  x: number;
  y: number;
  color: string;
  size?: number;
  delay?: number;
  duration?: number;
}

export const AnimatedPoint: React.FC<AnimatedPointProps> = ({
  x,
  y,
  color,
  size = 5,
  delay = 0,
  duration = 500
}) => {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let startTime: number | null = null;
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Плавное масштабирование с easing
        setScale(1 - Math.pow(1 - progress, 3));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, duration]);

  return (
    <circle
      cx={x}
      cy={y}
      r={size * scale}
      fill={color}
      className="animated-point"
    />
  );
};