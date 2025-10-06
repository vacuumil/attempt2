import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 95vw; /* Используем 95% ширины viewport */
  margin: 0 auto;
  padding: 2rem;
  
  /* Для очень широких экранов ограничиваем максимальную ширину */
  @media (min-width: 2000px) {
    max-width: 1900px;
  }

  @media (min-width: 1600px) and (max-width: 1999px) {
    max-width: 90vw;
  }

  @media (min-width: 1200px) and (max-width: 1599px) {
    max-width: 92vw;
  }

  @media (max-width: 1199px) {
    max-width: 95vw;
  }

  @media (max-width: 768px) {
    max-width: 98vw;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    max-width: 100vw;
    padding: 0.5rem;
  }
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem; /* Вернули оригинальный размер */
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
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
  min-width: 120px; /* Вернули оригинальную ширину */
  font-size: 1rem; /* Вернули оригинальный размер */

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.active 
      ? 'linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%)' 
      : 'rgba(100, 255, 218, 0.2)'};
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 250px;
    min-width: auto;
  }
`;

export const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Вернули оригинальный размер */
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 2rem;
  }
`;

export const ModuleCard = styled.div`
  background: linear-gradient(145deg, #112240 0%, #1a3a5f 100%);
  padding: 2rem; /* Вернули оригинальные отступы */
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
  font-size: 3rem; /* Вернули оригинальный размер */
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const ModuleTitle = styled.h3`
  font-size: 1.5rem; /* Вернули оригинальный размер */
  margin-bottom: 1rem;
  color: #64ffda;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const DescriptionText = styled.p`
  text-align: center;
  font-size: 1.2rem; /* Вернули оригинальный размер */
  opacity: 0.9;
  margin-bottom: 3rem;
  line-height: 1.6;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;