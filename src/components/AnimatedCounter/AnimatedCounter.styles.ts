// components/AnimatedCounter/AnimatedCounter.styles.ts
import styled from 'styled-components';

export const CounterContainer = styled.div`
  padding: 2.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  border: 1px solid rgba(100, 255, 218, 0.08);
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: rgba(100, 255, 218, 0.2);
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-5px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(100, 255, 218, 0.1),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;

export const CounterIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  opacity: 0.9;
`;

export const CounterNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #64ffda;
  margin-bottom: 0.5rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

export const CounterLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
  font-weight: 500;
  line-height: 1.4;
`;