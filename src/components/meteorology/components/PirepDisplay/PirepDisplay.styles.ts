// src/components/meteorology/components/PirepDisplay/PirepDisplay.styles.ts
import styled from 'styled-components';

export const EducationalSection = styled.div`
  background: rgba(26, 111, 196, 0.05);
  border: 1px solid #1a6fc4;
  border-radius: 12px;
  padding: 30px;
  margin-top: 20px;
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 8px;
    margin-top: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 15px;
    border-radius: 6px;
    margin-top: 10px;
  }
`;

export const EducationalContent = styled.div`
  color: #e6f1ff;
  line-height: 1.6;
  
  /* Планшеты */
  @media (max-width: 1024px) {
    line-height: 1.5;
  }
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    line-height: 1.4;
  }
`;

export const ExampleCard = styled.div`
  background: rgba(26, 111, 196, 0.1);
  border: 1px solid #1a6fc4;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 25px;

  h3 {
    color: #64ffda;
    margin-bottom: 15px;
    font-size: 1.3rem;
    
    @media (max-width: 768px) {
      font-size: 1.2rem;
      margin-bottom: 12px;
    }
    
    @media (max-width: 480px) {
      font-size: 1.1rem;
      margin-bottom: 10px;
    }
  }
  
  /* Адаптивные отступы */
  @media (max-width: 768px) {
    padding: 20px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 15px;
    margin-bottom: 15px;
  }
`;

export const CodeExample = styled.code`
  display: block;
  padding: 15px;
  background: rgba(10, 25, 47, 0.8);
  border: 1px solid #64ffda;
  border-radius: 6px;
  color: #64ffda;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1rem;
  line-height: 1.4;
  white-space: pre-wrap;
  margin: 10px 0;
  overflow-x: auto;
  
  /* Планшеты */
  @media (max-width: 1024px) {
    padding: 12px;
    font-size: 0.95rem;
  }
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.9rem;
    line-height: 1.3;
  }
  
  @media (max-width: 480px) {
    padding: 8px;
    font-size: 0.85rem;
    border-radius: 4px;
  }
`;

export const InteractiveExample = styled.div`
  background: rgba(100, 255, 218, 0.05);
  border: 1px solid #64ffda;
  border-radius: 8px;
  padding: 25px;
  margin: 25px 0;
  
  h3 {
    color: #64ffda;
    margin-bottom: 20px;
    font-size: 1.3rem;
  }
  
  h4 {
    color: #ffd700;
    margin: 15px 0 10px 0;
    font-size: 1.1rem;
  }
  
  /* Планшеты */
  @media (max-width: 1024px) {
    padding: 20px;
    margin: 20px 0;
    
    h3 {
      font-size: 1.2rem;
      margin-bottom: 18px;
    }
  }
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    padding: 15px;
    margin: 15px 0;
    
    h3 {
      font-size: 1.1rem;
      margin-bottom: 15px;
    }
    
    h4 {
      font-size: 1rem;
      margin: 12px 0 8px 0;
    }
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    margin: 12px 0;
    
    h3 {
      font-size: 1rem;
      margin-bottom: 12px;
    }
    
    h4 {
      font-size: 0.95rem;
      margin: 10px 0 6px 0;
    }
  }
`;

export const PirepForm = styled.div`
  background: rgba(10, 25, 47, 0.5);
  border: 1px solid #1a6fc4;
  border-radius: 8px;
  padding: 20px;
  margin: 15px 0;
  
  h4 {
    color: #64ffda;
    margin-bottom: 15px;
    font-size: 1.1rem;
  }
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    padding: 15px;
    margin: 12px 0;
    
    h4 {
      font-size: 1rem;
      margin-bottom: 12px;
    }
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    margin: 10px 0;
    
    h4 {
      font-size: 0.95rem;
      margin-bottom: 10px;
    }
  }
`;

// Адаптивные компоненты для PIREP
export const NavigationContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  justify-content: center;
  
  /* Планшеты */
  @media (max-width: 1024px) {
    margin-bottom: 25px;
  }
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    margin-bottom: 20px;
    gap: 8px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 15px;
    gap: 6px;
  }
`;

export const NavButton = styled.button<{ $isActive: boolean }>`
  padding: 12px 20px;
  background: ${props => props.$isActive 
    ? 'linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%)' 
    : 'rgba(100, 255, 218, 0.1)'};
  border: 1px solid #64ffda;
  border-radius: 6px;
  color: ${props => props.$isActive ? '#0a192f' : '#64ffda'};
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.$isActive 
      ? 'linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%)' 
      : 'rgba(100, 255, 218, 0.2)'};
    transform: translateY(-2px);
  }
  
  /* Планшеты */
  @media (max-width: 1024px) {
    padding: 10px 16px;
    font-size: 0.95rem;
  }
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 0.9rem;
    flex: 1;
    min-width: 120px;
    
    &:hover {
      transform: none;
    }
  }
  
  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 0.85rem;
    min-width: 100px;
  }
`;

export const CodeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 15px 0;
  
  /* Планшеты */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
  }
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
    margin: 12px 0;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 8px;
    margin: 10px 0;
  }
`;

export const CodeItem = styled.div`
  background: rgba(26, 111, 196, 0.1);
  border: 1px solid #1a6fc4;
  border-radius: 6px;
  padding: 15px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #64ffda;
    transform: translateY(-2px);
  }
  
  div:first-child {
    color: #64ffda;
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 5px;
  }
  
  div:nth-child(2) {
    color: #e6f1ff;
    font-size: 0.95rem;
    margin-bottom: 3px;
  }
  
  div:last-child {
    color: #8892b0;
    font-size: 0.85rem;
    line-height: 1.3;
  }
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    padding: 12px;
    
    &:hover {
      transform: none;
    }
    
    div:first-child {
      font-size: 0.95rem;
    }
    
    div:nth-child(2) {
      font-size: 0.9rem;
    }
    
    div:last-child {
      font-size: 0.8rem;
    }
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    
    div:first-child {
      font-size: 0.9rem;
    }
    
    div:nth-child(2) {
      font-size: 0.85rem;
    }
    
    div:last-child {
      font-size: 0.75rem;
    }
  }
`;

export const ProcedureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin: 20px 0;
  
  /* Планшеты */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 12px;
  }
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
    margin: 15px 0;
  }
  
  @media (max-width: 480px) {
    gap: 8px;
    margin: 12px 0;
  }
`;

export const ProcedureItem = styled.div`
  padding: 15px;
  background: rgba(26, 111, 196, 0.1);
  border-radius: 6px;
  border: 1px solid #1a6fc4;
  
  strong {
    color: #64ffda;
    display: block;
    margin-bottom: 8px;
    font-size: 1rem;
  }
  
  div {
    color: #8892b0;
    font-size: 0.9rem;
    line-height: 1.4;
  }
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    padding: 12px;
    
    strong {
      font-size: 0.95rem;
      margin-bottom: 6px;
    }
    
    div {
      font-size: 0.85rem;
    }
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    
    strong {
      font-size: 0.9rem;
    }
    
    div {
      font-size: 0.8rem;
    }
  }
`;

// Адаптивный заголовок для PIREP
export const PirepTitle = styled.h2`
  color: #64ffda;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  font-weight: 700;
  
  /* Планшеты */
  @media (max-width: 1024px) {
    font-size: 1.8rem;
    margin-bottom: 25px;
  }
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 15px;
  }
`;

// Информационная панель аэропорта
export const AirportInfoPanel = styled.div`
  text-align: center;
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(100, 255, 218, 0.1);
  border-radius: 8px;
  border: 1px solid #64ffda;
  
  h4 {
    color: #64ffda;
    margin: 0;
    font-size: 1.1rem;
  }
  
  p {
    color: #8892b0;
    margin: 5px 0 0 0;
    font-size: 0.9rem;
  }
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    padding: 12px;
    margin-bottom: 15px;
    
    h4 {
      font-size: 1rem;
    }
    
    p {
      font-size: 0.85rem;
    }
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    margin-bottom: 12px;
    
    h4 {
      font-size: 0.95rem;
    }
    
    p {
      font-size: 0.8rem;
    }
  }
`;

// Адаптивная кнопка генерации
export const GenerateButton = styled.button`
  padding: 12px 24px;
  background: #64ffda;
  color: #0a192f;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  margin-bottom: 15px;
  
  &:hover {
    background: #4fd4b5;
    transform: translateY(-2px);
  }
  
  /* Мобильные устройства */
  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.9rem;
    width: 100%;
    margin-bottom: 12px;
    
    &:hover {
      transform: none;
    }
  }
  
  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 0.85rem;
  }
`;