import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
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
  min-width: 120px;

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.active 
      ? 'linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%)' 
      : 'rgba(100, 255, 218, 0.2)'};
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 250px;
  }
`;

export const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const ModuleCard = styled.div`
  background: linear-gradient(145deg, #112240 0%, #1a3a5f 100%);
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid rgba(100, 255, 218, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  
  /* Анимация плавающего эффекта */
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    border-color: #64ffda;
    box-shadow: 0 10px 30px rgba(100, 255, 218, 0.2);
    animation: none; /* Отключаем анимацию при hover */
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const ModuleIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const ModuleTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #64ffda;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const DescriptionText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 3rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;