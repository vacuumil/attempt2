import styled, { keyframes } from 'styled-components';

// Анимации
const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Контейнер хедера
export const HeaderContainer = styled.header`
  background: rgba(10, 25, 47, 0.95);
  backdrop-filter: blur(10px);
  color: white;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 80px;
  border-bottom: 1px solid rgba(100, 255, 218, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 1rem;
    height: 70px;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
`;

// Логотип
export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    gap: 10px;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

export const LogoIcon = styled.div`
  font-size: 2.2rem;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

// Десктопная навигация
export const Nav = styled.nav`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.a`
  color: #e6f1ff;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
    transition: width 0.3s ease;
  }

  &:hover {
    color: #64ffda;
    
    &::before {
      width: 100%;
    }
  }

  &.active {
    color: #64ffda;
    background: rgba(100, 255, 218, 0.1);
    
    &::before {
      width: 100%;
    }
  }
`;

// Кнопка мобильного меню
export const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  position: relative;
  z-index: 1001;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    width: 30px;
    height: 3px;
    background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  &:hover span {
    background: #64ffda;
    animation: ${pulse} 0.5s ease;
  }

  &.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  &.active span:nth-child(2) {
    opacity: 0;
  }

  &.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
`;

// Оверлей для мобильного меню
export const MobileMenuOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 999;
  display: ${props => props.isOpen ? 'block' : 'none'};
  animation: ${props => props.isOpen ? fadeIn : fadeOut} 0.3s ease;
`;

// Контейнер мобильного меню
export const MobileMenuContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background: rgba(10, 25, 47, 0.98);
  backdrop-filter: blur(20px);
  z-index: 1000;
  padding: 80px 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-left: 1px solid rgba(100, 255, 218, 0.2);
  animation: ${props => props.isOpen ? slideIn : slideOut} 0.3s ease;
`;

// Пункты мобильного меню
export const MobileNavItem = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 1.5rem;
  color: #e6f1ff;
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;

  .nav-icon {
    font-size: 1.5rem;
    transition: transform 0.3s ease;
  }

  .nav-label {
    font-size: 1.1rem;
    font-weight: 500;
  }

  &:hover {
    background: rgba(100, 255, 218, 0.1);
    transform: translateX(-5px);

    .nav-icon {
      transform: scale(1.2);
    }
  }

  &.active {
    background: rgba(100, 255, 218, 0.15);
    color: #64ffda;
    
    .nav-icon {
      filter: drop-shadow(0 0 8px rgba(100, 255, 218, 0.5));
    }
  }
`;