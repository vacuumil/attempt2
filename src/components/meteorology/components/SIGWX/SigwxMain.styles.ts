// SigwxMain.styles.ts
import styled from 'styled-components';

export const NavigationTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 25px;

  .tab {
    position: relative;
    background: rgba(10, 25, 47, 0.8);
    border: 1px solid #1a6fc4;
    border-radius: 10px;
    padding: 20px 15px;
    color: #8892b0;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    &:hover {
      border-color: #64ffda;
      color: #e6f1ff;
      transform: translateY(-2px);
    }

    &.active {
      background: linear-gradient(135deg, #1a6fc4 0%, #64ffda 100%);
      color: #0a192f;
      border-color: #64ffda;
    }

    .icon {
      font-size: 1.5rem;
    }

    .label {
      font-family: 'Rajdhani', sans-serif;
      font-weight: 600;
      font-size: 0.9rem;
      text-align: center;
    }

    .progress-bar {
      position: absolute;
      bottom: 0;
      left: 5px;
      right: 5px;
      height: 3px;
      background: rgba(136, 146, 176, 0.3);
      border-radius: 2px;
      overflow: hidden;

      .progress-fill {
        height: 100%;
        background: #64ffda;
        transition: width 0.3s ease;
      }
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    
    .tab {
      padding: 15px 10px;
      
      .label {
        font-size: 0.8rem;
      }
    }
  }
`;

export const ProgressSection = styled.div`
  background: rgba(10, 25, 47, 0.5);
  border: 1px solid #1a6fc4;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 25px;

  .progress-stats {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;

    .stat {
      text-align: center;
      
      .value {
        display: block;
        color: #64ffda;
        font-size: 1.5rem;
        font-weight: bold;
        font-family: 'Share Tech Mono', monospace;
        margin-bottom: 5px;
      }

      .label {
        color: #8892b0;
        font-size: 0.8rem;
        font-family: 'Rajdhani', sans-serif;
      }
    }
  }

  @media (max-width: 768px) {
    .progress-stats {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
  }
`;

export const ContentArea = styled.div`
  min-height: 500px;
  background: rgba(10, 25, 47, 0.3);
  border: 1px solid #1a6fc4;
  border-radius: 12px;
  padding: 25px;
`;

// SigwxMain.styles.ts - добавляем стили для активного таба
export const SigwxContainer = styled.div`
  background: #0a192f;
  min-height: 100vh;
  color: #e6f1ff;
  padding: 20px;

  .sigwx-header {
    text-align: center;
    margin-bottom: 40px;
    
    h1 {
      font-family: 'Rajdhani', sans-serif;
      font-size: 2.5rem;
      margin-bottom: 10px;
      color: #64ffda;
    }
    
    p {
      font-family: 'Exo 2', sans-serif;
      font-size: 1.2rem;
      color: #8892b0;
    }
  }

  .sigwx-navigation {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 40px;
    flex-wrap: wrap;
    background: #112240;
    padding: 15px;
    border-radius: 12px;
    border: 1px solid #1a6fc4;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
  }

  .nav-button {
    background: transparent;
    border: 2px solid #1a6fc4;
    padding: 12px 24px;
    border-radius: 8px;
    color: #e6f1ff;
    font-family: 'Exo 2', sans-serif;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 160px;
    position: relative;
    overflow: hidden;

    &:hover {
      background: #1a6fc4;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(26, 111, 196, 0.3);
    }

    &.active {
      background: #64ffda;
      color: #0a192f;
      border-color: #64ffda;
      font-weight: 600;
      box-shadow: 0 4px 15px rgba(100, 255, 218, 0.3);
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: #0a192f;
      }
    }

    @media (max-width: 768px) {
      width: 100%;
      max-width: 280px;
    }

      /* Мобильные устройства */
  @media (max-width: 480px) {
    padding: 10px;
  }

  /* Планшеты */
  @media (max-width: 768px) {
    padding: 15px;
  }
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-family: 'Rajdhani', sans-serif;
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: #64ffda;
    
    /* Планшеты */
    @media (max-width: 768px) {
      font-size: 2rem;
    }
    
    /* Мобильные устройства */
    @media (max-width: 480px) {
      font-size: 1.7rem;
      margin-bottom: 8px;
    }
  }
  
  p {
    font-family: 'Exo 2', sans-serif;
    font-size: 1.2rem;
    color: #8892b0;
    
    /* Планшеты */
    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
    
    /* Мобильные устройства */
    @media (max-width: 480px) {
      font-size: 1rem;
      padding: 0 10px;
    }
  }
`;

export const Navigation = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  background: #112240;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #1a6fc4;

  /* Планшеты */
  @media (max-width: 768px) {
    padding: 15px;
    gap: 12px;
  }

  /* Мобильные устройства */
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 15px 10px;
  }
`;

export const NavButton = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? '#64ffda' : 'transparent'};
  color: ${props => props.$active ? '#0a192f' : '#e6f1ff'};
  border: 2px solid ${props => props.$active ? '#64ffda' : '#1a6fc4'};
  padding: 12px 24px;
  border-radius: 8px;
  font-family: 'Exo 2', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 160px;
  position: relative;
  overflow: hidden;
  font-weight: ${props => props.$active ? '600' : '400'};

  &:hover {
    background: ${props => props.$active ? '#64ffda' : '#1a6fc4'};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(26, 111, 196, 0.3);
  }

  /* Планшеты */
  @media (max-width: 768px) {
    min-width: 140px;
    padding: 10px 20px;
    font-size: 0.95rem;
  }

  /* Мобильные устройства */
  @media (max-width: 480px) {
    width: 100%;
    max-width: 280px;
    min-width: auto;
    padding: 12px 16px;
    font-size: 0.9rem;
  }
`;