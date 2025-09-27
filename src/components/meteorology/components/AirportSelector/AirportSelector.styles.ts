// src/components/meteorology/components/AirportSelector/AirportSelector.styles.ts
import styled from 'styled-components';

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

export const Label = styled.label`
  display: block;
  color: #64ffda;
  margin-bottom: 15px;
  font-weight: 600;
  text-align: center;
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.2rem;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  position: relative;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const AirportInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  background: rgba(10, 25, 47, 0.8);
  border: 1px solid #1a6fc4;
  border-radius: 8px;
  color: #e6f1ff;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  transition: all 0.3s ease;
  font-family: 'Share Tech Mono', monospace;

  &:focus {
    outline: none;
    border-color: #64ffda;
    box-shadow: 0 0 0 2px rgba(100, 255, 218, 0.2);
  }

  &::placeholder {
    color: #8892b0;
    font-weight: normal;
  }
`;

export const SearchButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
  border: none;
  border-radius: 8px;
  color: #0a192f;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
  font-family: 'Rajdhani', sans-serif;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(100, 255, 218, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const RecentAirports = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  color: #8892b0;
  font-size: 0.9rem;
  font-family: 'Rajdhani', sans-serif;

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

export const RecentButton = styled.button`
  padding: 6px 12px;
  background: rgba(100, 255, 218, 0.1);
  border: 1px solid #64ffda;
  border-radius: 6px;
  color: #64ffda;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Rajdhani', sans-serif;

  &:hover:not(:disabled) {
    background: rgba(100, 255, 218, 0.2);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(10, 25, 47, 0.95);
  border: 1px solid #64ffda;
  border-top: none;
  border-radius: 0 0 8px 8px;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  backdrop-filter: blur(10px);
`;

export const SuggestionItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 500;
  border-bottom: 1px solid rgba(100, 255, 218, 0.1);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(100, 255, 218, 0.1);
    color: #64ffda;
  }

  strong {
    color: #64ffda;
    font-family: 'Share Tech Mono', monospace;
  }
`;

export const ModalButton = styled.button`
  background: linear-gradient(135deg, #1a6fc4 0%, #64ffda 100%);
  border: none;
  border-radius: 8px;
  color: #0a192f;
  padding: 10px 20px;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(100, 255, 218, 0.3);
  }
`;