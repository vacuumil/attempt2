import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #0a192f;
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const PageHeader = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

export const PageTitle = styled.h1`
  color: #e6f1ff;
  margin-bottom: 10px;
  font-size: 2.5rem;
  background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const PageDescription = styled.p`
  color: #8892b0;
  font-size: 1.1rem;
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