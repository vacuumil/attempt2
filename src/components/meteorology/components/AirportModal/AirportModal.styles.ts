// src/components/meteorology/components/AirportModal/AirportModal.styles.ts
import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 25, 47, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

export const ModalContent = styled.div`
  background: #0a192f;
  border: 2px solid #1a6fc4;
  border-radius: 12px;
  padding: 30px;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  width: 90%;
`;

export const AirportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

export const AirportCard = styled.div`
  background: rgba(26, 111, 196, 0.1);
  border: 1px solid #1a6fc4;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Rajdhani', sans-serif;

  &:hover {
    background: rgba(100, 255, 218, 0.1);
    border-color: #64ffda;
    transform: translateY(-2px);
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ff6b6b;
  font-size: 2rem;
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    background: rgba(255, 107, 107, 0.1);
  }
`;