import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(100, 255, 218, 0.3);
  border-radius: 50%;
  border-top-color: #64ffda;
  animation: ${spin} 1s ease-in-out infinite;
`;

const LoadingText = styled.div`
  color: #64ffda;
  margin-top: 15px;
  font-size: 1.1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

interface LoadingSpinnerProps {
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  text = 'Загрузка данных...' 
}) => {
  return (
    <Container>
      <SpinnerContainer />
      <LoadingText>{text}</LoadingText>
    </Container>
  );
};