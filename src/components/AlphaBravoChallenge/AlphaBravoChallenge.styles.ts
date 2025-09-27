// src/components/AlphaBravoChallenge/AlphaBravoChallenge.styles.ts
import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const correctAnswer = keyframes`
  0% { background: rgba(100, 255, 218, 0.1); }
  50% { background: rgba(100, 255, 218, 0.3); }
  100% { background: rgba(100, 255, 218, 0.1); }
`;

const wrongAnswer = keyframes`
  0% { background: rgba(255, 71, 87, 0.1); }
  50% { background: rgba(255, 71, 87, 0.3); }
  100% { background: rgba(255, 71, 87, 0.1); }
`;

export const GameContainer = styled.div`
  background: rgba(17, 34, 64, 0.8);
  border: 2px solid rgba(100, 255, 218, 0.2);
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem 0;
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.5s ease;
`;

export const GameHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const GameTitle = styled.h3`
  color: #64ffda;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

export const GameDescription = styled.p`
  color: #8892b0;
  margin-bottom: 1rem;
`;

export const ModeSelector = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const ModeButton = styled.button<{ active: boolean }>`
  padding: 1rem 2rem;
  border: 2px solid ${props => props.active ? '#64ffda' : 'rgba(100, 255, 218, 0.3)'};
  background: ${props => props.active ? 'rgba(100, 255, 218, 0.1)' : 'transparent'};
  color: ${props => props.active ? '#64ffda' : '#8892b0'};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    border-color: #64ffda;
    background: rgba(100, 255, 218, 0.1);
    color: #64ffda;
  }
`;

export const QuestionContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const QuestionText = styled.div`
  font-size: 2.5rem;
  color: #e6f1ff;
  margin-bottom: 1rem;
  font-weight: 700;
`;

export const QuestionSubtext = styled.div`
  color: #8892b0;
  font-size: 1.1rem;
`;

export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const OptionButton = styled.button<{ 
  isCorrect?: boolean; 
  isWrong?: boolean;
  disabled?: boolean;
}>`
  padding: 1.5rem 1rem;
  border: 2px solid rgba(100, 255, 218, 0.3);
  background: rgba(255, 255, 255, 0.05);
  color: #e6f1ff;
  border-radius: 12px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 500;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover:not(:disabled) {
    border-color: #64ffda;
    background: rgba(100, 255, 218, 0.1);
    transform: translateY(-2px);
  }

  ${props => props.isCorrect && css`
    border-color: #64ffda;
    background: rgba(100, 255, 218, 0.1);
    animation: ${correctAnswer} 0.5s ease;
  `}

  ${props => props.isWrong && css`
    border-color: #ff4757;
    background: rgba(255, 71, 87, 0.1);
    animation: ${wrongAnswer} 0.5s ease;
  `}
`;

export const ScoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  color: #8892b0;
`;

export const ActionButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #1a6fc4 0%, #64ffda 100%);
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(100, 255, 218, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ResultsContainer = styled.div`
  text-align: center;
  animation: ${fadeIn} 0.5s ease;
`;

export const FinalScore = styled.div`
  font-size: 3rem;
  color: #64ffda;
  font-weight: 700;
  margin-bottom: 1rem;
`;

export const ResultMessage = styled.div`
  color: #e6f1ff;
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

export const RestartButton = styled(ActionButton)`
  animation: ${pulse} 2s infinite;
`;