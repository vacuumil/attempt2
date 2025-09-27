import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Исправляем: меняем active на $active для styled-components v6
export const Tab = styled.button<{ active: boolean }>`
  padding: 1rem 2rem;
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%)' 
    : 'rgba(17, 34, 64, 0.5)'};
  color: ${props => props.active ? '#0a192f' : '#e6f1ff'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${props => props.active ? '600' : '400'};
  min-width: 140px;
  font-size: 1.1rem;

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.active 
      ? 'linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%)' 
      : 'rgba(100, 255, 218, 0.2)'};
  }
`;

export const ContentContainer = styled.div`
  background: rgba(17, 34, 64, 0.3);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(100, 255, 218, 0.1);
  min-height: 600px;
`;