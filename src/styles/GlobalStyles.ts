import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Exo 2', sans-serif;
    background: #0a192f;
    color: #e6f1ff;
    line-height: 1.6;
    overflow-x: hidden;
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
    background: #0a192f;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  /* Медиа-запросы для адаптивности */
  @media (max-width: 1200px) {
    html { font-size: 16px; }
  }

  @media (max-width: 768px) {
    html { font-size: 14px; }
  }

  @media (max-width: 480px) {
    html { font-size: 12px; }
  }

  /* Стили для скроллбара */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(100, 255, 218, 0.3);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(100, 255, 218, 0.5);
  }

  /* Упрощенные анимации */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .float-animation {
    animation: float 3s ease-in-out infinite;
  }

  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }
`;
