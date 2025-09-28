import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background: rgba(17, 34, 64, 0.5);
  border-radius: 15px;
  border: 1px solid rgba(100, 255, 218, 0.1);
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  text-align: center;
  color: #64ffda;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Description = styled.p`
  text-align: center;
  opacity: 0.9;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

export const SimulationArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const DisplaySection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const MapSection = styled.div`
  width: 100%;
  margin-top: 1rem;
`;