import styled from 'styled-components';

export const HomeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  background: #0a192f; /* Добавляем темный фон вместо MinimalBackground */
  min-height: 100vh;
`;

export const CenteredSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
`;

export const StatsSection = styled(CenteredSection)`
  padding: 6rem 2rem;
  background: rgba(12, 30, 56, 0.4);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(100, 255, 218, 0.1);
  border-bottom: 1px solid rgba(100, 255, 218, 0.1);
`;

export const StatsContent = styled.div`
  width: 100%;
  max-width: 1200px;
  text-align: center;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 0 auto;
`;

export const CtaSection = styled(CenteredSection)`
  padding: 6rem 2rem;
  background: linear-gradient(
    180deg,
    rgba(12, 30, 56, 0.6) 0%,
    rgba(10, 25, 47, 0.8) 100%
  );
  backdrop-filter: blur(15px);
  border-top: 1px solid rgba(100, 255, 218, 0.1);
`;

export const CtaContent = styled.div`
  width: 100%;
  max-width: 800px;
  text-align: center;
`;

export const CtaTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const CtaDescription = styled.p`
  margin-bottom: 2.5rem;
  font-size: 1.2rem;
  opacity: 0.9;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const CtaButton = styled.button`
  background: linear-gradient(135deg, #1a6fc4 0%, #64ffda 100%);
  padding: 16px 40px;
  font-size: 1.1rem;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(100, 255, 218, 0.3);
  }

  @media (max-width: 768px) {
    padding: 14px 32px;
    font-size: 1rem;
  }
`;

export const InteractiveSection = styled(CenteredSection)`
  padding: 4rem 2rem;
  background: rgba(12, 30, 56, 0.3);
  border-top: 1px solid rgba(100, 255, 218, 0.1);
  border-bottom: 1px solid rgba(100, 255, 218, 0.1);
`;

export const DemoContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  text-align: center;
`;

export const DemoTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #64ffda;
  
  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

export const DemoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

export const DemoCard = styled.div`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    border-color: #64ffda;
    background: rgba(100, 255, 218, 0.05);
  }
`;

export const ChallengeSection = styled(CenteredSection)`
  padding: 4rem 2rem;
  background: rgba(12, 30, 56, 0.4);
  border-top: 1px solid rgba(100, 255, 218, 0.1);
  border-bottom: 1px solid rgba(100, 255, 218, 0.1);
`;

export const ChallengeContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  text-align: center;
`;