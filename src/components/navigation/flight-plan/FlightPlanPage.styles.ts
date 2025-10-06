import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  color: #e6f1ff;
  max-width: 95vw; /* 95% ширины экрана */
  margin: 0 auto;

  /* Адаптивные ограничения для разных размеров экрана */
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
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    max-width: 100vw;
    padding: 1rem;
  }
  
  h2 {
    color: #64ffda;
    text-align: center;
    margin-bottom: 1rem;
    font-size: 2rem; /* Вернули оригинальный размер */
  }
  
  p {
    text-align: center;
    color: #8892b0;
    margin-bottom: 2rem;
    font-size: 1rem; /* Вернули оригинальный размер */
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    color: #e6f1ff;
    font-weight: 500;
    font-size: 0.9rem; /* Вернули оригинальный размер */
  }

  input {
    padding: 0.75rem; /* Вернули оригинальные отступы */
    background: rgba(10, 25, 47, 0.6);
    border: 1px solid #1a6fc4;
    border-radius: 6px;
    color: #e6f1ff;
    font-size: 1rem; /* Вернули оригинальный размер */

    &:focus {
      outline: none;
      border-color: #64ffda;
      box-shadow: 0 0 0 2px rgba(100, 255, 218, 0.2);
    }

    &::placeholder {
      color: #8892b0;
    }
  }
`;

export const CalculateButton = styled.button`
  width: 100%;
  max-width: 300px; /* Вернули оригинальный размер */
  margin: 2rem auto 0;
  display: block;
  padding: 1rem 2rem; /* Вернули оригинальные отступы */
  background: linear-gradient(135deg, #1a6fc4 0%, #64ffda 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem; /* Вернули оригинальный размер */
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(100, 255, 218, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ResultsCard = styled.div`
  background: rgba(100, 255, 218, 0.05);
  padding: 2rem; /* Вернули оригинальные отступы */
  border-radius: 12px;
  border: 1px solid rgba(100, 255, 218, 0.2);
  margin-bottom: 1rem;
`;