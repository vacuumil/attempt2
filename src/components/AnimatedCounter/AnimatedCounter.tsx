// components/AnimatedCounter/AnimatedCounter.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { CounterContainer, CounterNumber, CounterLabel, CounterIcon } from './AnimatedCounter.styles';

interface AnimatedCounterProps {
  value: number;
  label: string;
  icon: string;
  suffix?: string;
  duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  label,
  icon,
  suffix = '+',
  duration = 2000
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const incrementTime = duration / end;
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <CounterContainer ref={ref}>
      <CounterIcon>{icon}</CounterIcon>
      <CounterNumber>
        {count}{suffix}
      </CounterNumber>
      <CounterLabel>{label}</CounterLabel>
    </CounterContainer>
  );
};