// src/components/Footer/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: rgba(10, 25, 47, 0.95);
  border-top: 1px solid rgba(100, 255, 218, 0.2);
  padding: 3rem 2rem 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  color: #64ffda;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
`;

const FooterLink = styled(Link)`
  color: #8892b0;
  text-decoration: none;
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
  font-size: 0.95rem;

  &:hover {
    color: #64ffda;
    transform: translateX(5px);
  }
`;

const FooterText = styled.p`
  color: #8892b0;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 3rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid rgba(100, 255, 218, 0.1);
  text-align: center;
  color: #8892b0;
  font-size: 0.9rem;
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        {/* О платформе */}
        <FooterSection>
          <FooterTitle>AeroTrainer</FooterTitle>
          <FooterText>
            Профессиональная платформа для подготовки пилотов гражданской авиации. 
            Современные технологии обучения с фокусом на навигацию и метеорологию.
          </FooterText>
          <FooterText>
            🚀 Развиваем авиационное образование
          </FooterText>
        </FooterSection>

        {/* Навигация по сайту */}
        <FooterSection>
          <FooterTitle>Навигация</FooterTitle>
          <FooterLink to="/">🏠 Главная</FooterLink>
          <FooterLink to="/navigation">🧭 Навигация</FooterLink>
          <FooterLink to="/meteorology">🌤️ Метеорология</FooterLink>
          <FooterLink to="/about">ℹ️ О проекте</FooterLink>
        </FooterSection>

        {/* Поддержка и правовая информация */}
        <FooterSection>
          <FooterTitle>Поддержка</FooterTitle>
          <FooterLink to="/docs">Документация</FooterLink>
          <FooterLink to="/support">Техподдержка</FooterLink>
          <FooterLink to="/bug-report">Сообщить об ошибке</FooterLink>
          <FooterLink to="/feedback">Обратная связь</FooterLink>
          <FooterLink to="/terms">Условия использования</FooterLink>
          <FooterLink to="/privacy">Политика конфиденциальности</FooterLink>
        </FooterSection>

        {/* Контакты */}
        <FooterSection>
          <FooterTitle>Контакты</FooterTitle>
          <FooterText>
            📧 contact@aerotrainer.ru
          </FooterText>
          <FooterText>
            📞 +7 (495) 123-45-67
          </FooterText>
          <FooterText>
            📍 Ульяновск, Можайского, 8/8
          </FooterText>
          <FooterText style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.7 }}>
            Пн-Пт: 9:00-18:00 МСК
          </FooterText>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>© 2025 AeroTrainer. Все права защищены. Проект разработан для образовательных целей.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.7 }}>
          AeroTrainer не является официальным средством подготовки и не заменяет утвержденные процедуры и документацию.
        </p>
      </FooterBottom>
    </FooterContainer>
  );
};