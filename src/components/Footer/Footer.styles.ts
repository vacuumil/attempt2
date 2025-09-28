// src/components/Footer/Footer.styles.ts
import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background: rgba(10, 25, 47, 0.98);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(100, 255, 218, 0.1);
  padding: 3rem 0 1.5rem;
  margin-top: auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(100, 255, 218, 0.3) 50%,
      transparent 100%
    );
  }
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FooterTitle = styled.h3`
  color: #64ffda;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  font-family: 'Exo 2', sans-serif;
  font-weight: 600;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 30px;
    height: 2px;
    background: linear-gradient(90deg, #64ffda, transparent);
    border-radius: 1px;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const FooterLink = styled.a`
  color: #8892b0;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Exo 2', sans-serif;
  font-size: 0.95rem;
  padding: 0.25rem 0;
  position: relative;
  width: fit-content;

  &:hover {
    color: #64ffda;
    transform: translateX(8px);
    
    &::before {
      content: '▹';
      position: absolute;
      left: -1rem;
      color: #64ffda;
    }
  }

  &:focus {
    outline: 2px solid rgba(100, 255, 218, 0.5);
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(100, 255, 218, 0.1);
  flex-wrap: wrap;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`;

export const Copyright = styled.div`
  color: #8892b0;
  font-family: 'Exo 2', sans-serif;
  font-size: 0.9rem;
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: #8892b0;
  font-family: 'Exo 2', sans-serif;
  font-size: 0.95rem;
  
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: #64ffda;
    }
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const SocialLink = styled.a`
  color: #8892b0;
  font-size: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    color: #64ffda;
    transform: translateY(-2px);
  }
`;