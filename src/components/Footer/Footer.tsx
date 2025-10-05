// src/components/Footer/Footer.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FooterContainer,
  FooterContent,
  FooterGrid,
  FooterSection,
  FooterTitle,
  FooterLinks,
  FooterLink,
  FooterBottom,
  Copyright,
  ContactInfo
} from './Footer.styles';

interface FooterLinkItem {
  label: string;
  path: string;
}

interface FooterSection {
  title: string;
  links: FooterLinkItem[];
}

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const footerSections: FooterSection[] = [
    {
      title: 'Навигация',
      links: [
        { label: 'Главная', path: '/' },
        { label: 'Навигация', path: '/navigation' },
        { label: 'Метеорология', path: '/meteorology' },
        { label: 'О проекте', path: '/about' }
      ]
    },
    {
      title: 'Обучение',
      links: [
        { label: 'VOR Навигация', path: '/navigation?tab=vor' },
        { label: 'Расчет РПП', path: '/navigation?tab=flight-plan' },
        { label: 'Треугольник скоростей', path: '/navigation?tab=triangle' },
        { label: 'Анализ METAR', path: '/meteorology' }
      ]
    },
    {
      title: 'Поддержка',
      links: [
        { label: 'Документация', path: '/docs' },
        { label: 'Техподдержка', path: '/support' },
        { label: 'Сообщить об ошибке', path: '/bug-report' },
        { label: 'Обратная связь', path: '/feedback' }
      ]
    }
  ];

  const handleLinkClick = (path: string) => {
    if (path.startsWith('/')) {
      navigate(path);
    }
  };

  const handleExternalLink = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    handleLinkClick(path);
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          {footerSections.map((section, index) => (
            <FooterSection key={index}>
              <FooterTitle>{section.title}</FooterTitle>
              <FooterLinks>
                {section.links.map((link, linkIndex) => (
                  <FooterLink 
                    key={linkIndex}
                    onClick={(e) => handleExternalLink(e, link.path)}
                    title={`Перейти на ${link.label}`}
                  >
                    {link.label}
                  </FooterLink>
                ))}
              </FooterLinks>
            </FooterSection>
          ))}
          
          <FooterSection>
            <FooterTitle>Контакты</FooterTitle>
            <ContactInfo>
              <div>📧 support@aerotrainer.ru</div>
              <div>📞 +7 (495) 123-45-67</div>
              <div>📍 Москва, Ленинградский пр-т, 37</div>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>
        
        <FooterBottom>
          <Copyright>
            © 2025 AeroTrainer. Все права защищены.
          </Copyright>
          <FooterLinks style={{ flexDirection: 'row', gap: '2rem' }}>
            <FooterLink 
              onClick={(e) => handleExternalLink(e, '/privacy')}
              title="Политика конфиденциальности"
            >
              Политика конфиденциальности
            </FooterLink>
            <FooterLink 
              onClick={(e) => handleExternalLink(e, '/terms')}
              title="Условия использования"
            >
              Условия использования
            </FooterLink>
          </FooterLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};