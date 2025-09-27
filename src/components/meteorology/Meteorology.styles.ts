// src/components/meteorology/Meteorology.styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #0a192f;
  padding: 20px 0;
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const PageHeader = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

export const PageTitle = styled.h1`
  color: #e6f1ff;
  margin-bottom: 10px;
  font-size: 2.8rem;
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(100, 255, 218, 0.3);
`;

export const PageDescription = styled.p`
  color: #8892b0;
  font-size: 1.2rem;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 500;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
`;

export const Error = styled.div`
  text-align: center;
  padding: 20px;
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid #ff6b6b;
  border-radius: 8px;
  margin: 20px 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Rajdhani', sans-serif;
`;

export const LoadingSpinner = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #64ffda;
  font-family: 'Rajdhani', sans-serif;

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(100, 255, 218, 0.3);
    border-left: 4px solid #64ffda;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const SelectorContainer = styled.div`
  background: rgba(26, 111, 196, 0.1);
  border: 1px solid #1a6fc4;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const DataGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
  margin-top: 30px;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const WeatherSection = styled.section`
  background: rgba(26, 111, 196, 0.05);
  border: 1px solid #1a6fc4;
  border-radius: 12px;
  padding: 25px;
`;

export const SectionTitle = styled.h2`
  color: #64ffda;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.4rem;
  border-bottom: 2px solid #1a6fc4;
  padding-bottom: 10px;
`;

export const VisualizationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
  margin-top: 30px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const NoData = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #8892b0;
  font-style: italic;
  background: rgba(10, 25, 47, 0.3);
  border-radius: 12px;
  border: 2px dashed #1a6fc4;
`;