import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a192f 0%, #112240 100%);
  padding: 2rem;
  text-align: center;
`;

const Icon = styled.div`
  font-size: 6rem;
  margin-bottom: 2rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #64ffda;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #e6f1ff;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #1a6fc4 0%, #64ffda 100%);
  padding: 16px 40px;
  font-size: 1.1rem;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  animation: ${pulse} 2s ease-in-out infinite;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(100, 255, 218, 0.3);
    animation: none;
  }
`;

const ProgressContainer = styled.div`
  width: 300px;
  height: 8px;
  background: rgba(100, 255, 218, 0.2);
  border-radius: 4px;
  margin: 2rem 0;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: 65%;
  background: linear-gradient(90deg, #64ffda, #1a6fc4);
  border-radius: 4px;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

interface UnderDevelopmentProps {
  moduleName: string;
  progress?: number;
}

export const UnderDevelopment: React.FC<UnderDevelopmentProps> = ({
  moduleName,
  progress = 65
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${moduleName} - AeroTrainer`;
  }, [moduleName]);

  const handleGoBack = () => {
    navigate(-1); // Возврат на предыдущую страницу
  };

  const handleGoHome = () => {
    navigate('/'); // Возврат на главную
  };

  return (
    <Container>
      <Icon>🚧</Icon>
      <Title>Модуль в разработке</Title>
      <Message>
        Раздел "{moduleName}" активно разрабатывается нашей командой. 
        Мы создаем для вас самый современный и интерактивный опыт обучения.
        Ожидайте запуск в ближайшее время!
      </Message>
      
      <ProgressContainer>
        <ProgressBar style={{ width: `${progress}%` }} />
      </ProgressContainer>
      
      <Message>Готовность: {progress}%</Message>
      
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <Button onClick={handleGoBack}>← Назад</Button>
        <Button onClick={handleGoHome}>На главную</Button>
      </div>
    </Container>
  );
};