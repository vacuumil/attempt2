// src/pages/About/About.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AboutContainer,
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroDescription,
  ContentSection,
  Section,
  SectionTitle,
  SectionGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  TeamSection,
  TeamGrid,
  TeamMember,
  MemberPhoto,
  MemberInfo,
  MemberName,
  MemberRole,
  MemberBio,
  StatsSection,
  StatsGrid,
  StatItem,
  StatNumber,
  StatLabel,
  TechStackSection,
  TechGrid,
  TechCategory,
  TechList,
  TechItem,
  CtaSection,
  CtaContent,
  CtaButton
} from './About.styles';

export const About: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '🧭',
      title: 'Профессиональная навигация',
      description: 'Интерактивные симуляторы VOR, ILS и современных систем навигации для отработки реальных сценариев полета'
    },
    {
      icon: '🌤️',
      title: 'Метеоанализ в реальном времени',
      description: 'Работа с актуальными METAR, TAF и SIGMET данными для принятия взвешенных решений'
    },
    {
      icon: '🎯',
      title: 'Практические сценарии',
      description: 'Реалистичные тренировочные задания на основе реальных аэронавигационных данных'
    },
    {
      icon: '📊',
      title: 'Визуализация данных',
      description: 'Интуитивно понятные диаграммы и графики для анализа метеоусловий и параметров полета'
    }
  ];

  const teamMembers = [
    {
      name: 'Тут точно кто-то будет',
      role: 'Lead Developer & Aviation Expert',
      bio: 'Пилот со стажем 10+ лет, специалист по авиационной навигации и метеорологии',
      photo: '👨‍✈️'
    },
    {
      name: 'Иващенко Илья Эдуардович',
      role: 'Frontend Architect',
      bio: 'Специалист по React и TypeScript с фокусом на UX/UI для сложных веб-приложений',
      photo: '👩‍💻'
    },
    {
      name: '3 АЭ',
      role: 'Aviation Consultant',
      bio: 'Инструктор по летной подготовке, эксперт по процедурам и методикам обучения',
      photo: '👨‍🏫'
    }
  ];

  const techStack = {
    frontend: ['React 18', 'TypeScript', 'Styled Components', 'React Router v6'],
    visualization: ['Canvas API', 'SVG', 'D3.js', 'WebGL'],
    data: ['REST API', 'JSON', 'Local Storage', 'IndexedDB'],
    tools: ['Vite', 'Git', 'Figma', 'ESLint', 'Prettier']
  };

  const handleGetStarted = () => {
    navigate('/navigation');
  };

  const handleExploreMeteo = () => {
    navigate('/meteorology');
  };

  return (
    <AboutContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>О проекте AeroTrainer</HeroTitle>
          <HeroDescription>
            Профессиональная образовательная платформа для подготовки пилотов гражданской авиации. 
            Мы объединяем современные технологии с проверенными методиками обучения для создания 
            самого эффективного опыта в области авиационной навигации и метеорологии.
          </HeroDescription>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <Section>
          <SectionTitle>Наша миссия</SectionTitle>
          <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', color: '#8892b0', maxWidth: '800px', margin: '0 auto' }}>
            Сделать качественную авиационную подготовку доступной для каждого пилота. 
            Мы создаем интерактивные инструменты, которые превращают сложные теоретические 
            концепции в понятные визуальные симуляции и практические задания.
          </p>
        </Section>

        <Section>
          <SectionTitle>Ключевые возможности</SectionTitle>
          <SectionGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </SectionGrid>
        </Section>

        <StatsSection>
          <SectionTitle>AeroTrainer в цифрах</SectionTitle>
          <StatsGrid>
            <StatItem>
              <StatNumber>15+</StatNumber>
              <StatLabel>Навигационных систем</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>30+</StatNumber>
              <StatLabel>Метео параметров</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>24/7</StatNumber>
              <StatLabel>Доступ к обучению</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>100%</StatNumber>
              <StatLabel>Автономная работа</StatLabel>
            </StatItem>
          </StatsGrid>
        </StatsSection>

        <TeamSection>
          <SectionTitle>Наша команда</SectionTitle>
          <TeamGrid>
            {teamMembers.map((member, index) => (
              <TeamMember key={index}>
                <MemberPhoto>{member.photo}</MemberPhoto>
                <MemberInfo>
                  <MemberName>{member.name}</MemberName>
                  <MemberRole>{member.role}</MemberRole>
                  <MemberBio>{member.bio}</MemberBio>
                </MemberInfo>
              </TeamMember>
            ))}
          </TeamGrid>
        </TeamSection>

        <Section>
          <SectionTitle>Технологический стек</SectionTitle>
          <TechStackSection>
            <TechGrid>
              <TechCategory>
                <h4>Frontend</h4>
                <TechList>
                  {techStack.frontend.map((tech, index) => (
                    <TechItem key={index}>{tech}</TechItem>
                  ))}
                </TechList>
              </TechCategory>
              
              <TechCategory>
                <h4>Визуализация</h4>
                <TechList>
                  {techStack.visualization.map((tech, index) => (
                    <TechItem key={index}>{tech}</TechItem>
                  ))}
                </TechList>
              </TechCategory>
              
              <TechCategory>
                <h4>Данные</h4>
                <TechList>
                  {techStack.data.map((tech, index) => (
                    <TechItem key={index}>{tech}</TechItem>
                  ))}
                </TechList>
              </TechCategory>
              
              <TechCategory>
                <h4>Инструменты</h4>
                <TechList>
                  {techStack.tools.map((tech, index) => (
                    <TechItem key={index}>{tech}</TechItem>
                  ))}
                </TechList>
              </TechCategory>
            </TechGrid>
          </TechStackSection>
        </Section>

        <CtaSection>
          <CtaContent>
            <SectionTitle>Готовы начать обучение?</SectionTitle>
            <p style={{ marginBottom: '2.5rem', fontSize: '1.2rem', opacity: 0.9, textAlign: 'center' }}>
              Присоединяйтесь к сообществу профессиональных пилотов и освойте современные системы навигации
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <CtaButton onClick={handleGetStarted}>
                Начать обучение
              </CtaButton>
              <CtaButton secondary onClick={handleExploreMeteo}>
                Изучить метео
              </CtaButton>
            </div>
          </CtaContent>
        </CtaSection>
      </ContentSection>
    </AboutContainer>
  );
};