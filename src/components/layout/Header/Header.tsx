import React, { useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  HeaderContainer,
  HeaderContent,
  Logo,
  LogoIcon,
  Nav,
  NavItem,
  MobileMenuButton,
  MobileMenuOverlay,
  MobileMenuContainer,
} from './Header.styles';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { 
      id: 'home', 
      label: 'Главная', 
      icon: '🏠', 
      path: '/',
      isActive: location.pathname === '/'
    },
    { 
      id: 'navigation', 
      label: 'Навигация', 
      icon: '🧭', 
      path: '/navigation',
      isActive: location.pathname === '/navigation'
    },
    { 
      id: 'meteorology', 
      label: 'Метеорология', 
      icon: '🌪️', 
      path: '/meteorology',
      isActive: location.pathname === '/meteorology'
    },
    { 
      id: 'about', 
      label: 'О проекте', 
      icon: 'ℹ️', 
      path: '/about',
      isActive: location.pathname === '/about'
    }
  ];

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
    navigate(path);
  };

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Logo onClick={handleLogoClick}>
            <LogoIcon>🛫</LogoIcon>
            AeroTrainer
          </Logo>
          
          <Nav>
            {navItems.map((item) => (
              <NavItem 
                key={item.id}
                className={item.isActive ? 'active' : ''}
                onClick={() => handleNavClick(item.path)}
              >
                {item.label}
              </NavItem>
            ))}
          </Nav>

          <MobileMenuButton 
            className={isMobileMenuOpen ? 'active' : ''}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span />
            <span />
            <span />
          </MobileMenuButton>
        </HeaderContent>
      </HeaderContainer>

      <MobileMenuOverlay 
        isOpen={isMobileMenuOpen} 
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <MobileMenuContainer 
          isOpen={isMobileMenuOpen}
          onClick={(e) => e.stopPropagation()}
        >
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`mobile-nav-item ${item.isActive ? 'active' : ''}`}
              onClick={() => handleNavClick(item.path)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </div>
          ))}
        </MobileMenuContainer>
      </MobileMenuOverlay>
    </>
  );
};