// src/pages/Home/Home.tsx
import React, { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Hero } from '../../components/Hero/Hero';
import { Features } from '../../components/Features/Features';
import { AnimatedCounter } from '../../components/AnimatedCounter/AnimatedCounter';
import { InteractiveCompass } from '../../components/InteractiveCompass/InteractiveCompass';
import { AlphaBravoChallenge } from '../../components/AlphaBravoChallenge';
import {
  HomeContainer,
  CenteredSection,
  StatsSection,
  StatsContent,
  StatsGrid,
  CtaSection,
  CtaContent,
  CtaTitle,
  CtaDescription,
  CtaButton,
  InteractiveSection,
  DemoContainer,
  DemoTitle,
  DemoGrid,
  DemoCard,
  ChallengeSection,
  ChallengeContainer
} from './Home.styles';

export const Home: React.FC = () => {
  const statsRef = useRef(null);
  useInView(statsRef, { once: true });
  const [hoveredDemo, setHoveredDemo] = useState<string | null>(null);

  const handleDemoClick = (demo: string) => {
    alert(`Демо-модуль "${demo}" будет доступен в ближайшем обновлении!`);
  };

  const handleTryNavigation = () => {
    alert('Модуль навигации находится в активной разработке. Ожидайте запуск в ближайшее время!');
  };

  return (
    <HomeContainer id="home">
      <CenteredSection>
        <Hero />
      </CenteredSection>
      
      <StatsSection ref={statsRef}>
        <StatsContent>
          <StatsGrid>
            <AnimatedCounter
              value={15}
              label="Отработайте навигацию на 15+ системах"
              icon="✈️"
              suffix="+"
              duration={2000}
            />
            <AnimatedCounter
              value={30}
              label="Анализируйте 30+ реальных метеосводок"
              icon="🌤️"
              suffix="+"
              duration={2000}
            />
            <AnimatedCounter
              value={24}
              label="Доступ к урокам 24/7"
              icon="🕒"
              suffix="/7"
              duration={1500}
            />
            <AnimatedCounter
              value={100}
              label="Полностью автономная работа"
              icon="🔋"
              suffix="%"
              duration={1500}
            />
          </StatsGrid>
        </StatsContent>
      </StatsSection>

      <CenteredSection>
        <Features />
      </CenteredSection>

      <InteractiveSection>
        <DemoContainer>
          <DemoTitle>Интерактивные демо-модули</DemoTitle>
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem', opacity: 0.9 }}>
            Попробуйте игровые модули платформы в действии
          </p>
          <DemoGrid>
            <InteractiveCompass />

            <DemoCard 
              onClick={() => handleDemoClick('VOR Симулятор')}
              onMouseEnter={() => setHoveredDemo('vor')}
              onMouseLeave={() => setHoveredDemo(null)}
              style={{
                transform: hoveredDemo === 'vor' ? 'translateY(-8px) scale(1.02)' : 'none',
                transition: 'all 0.3s ease',
                boxShadow: hoveredDemo === 'vor' ? '0 10px 30px rgba(100, 255, 218, 0.2)' : 'none'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📡</div>
              <h4 style={{ marginBottom: '0.5rem', color: '#64ffda' }}>VOR Симулятор</h4>
              <p style={{ opacity: 0.8 }}>Отработка работы с радиомаяками</p>
            </DemoCard>
            
            <DemoCard 
              onClick={() => handleDemoClick('Анализ METAR')}
              onMouseEnter={() => setHoveredDemo('metar')}
              onMouseLeave={() => setHoveredDemo(null)}
              style={{
                transform: hoveredDemo === 'metar' ? 'translateY(-8px) scale(1.02)' : 'none',
                transition: 'all 0.3s ease',
                boxShadow: hoveredDemo === 'metar' ? '0 10px 30px rgba(100, 255, 218, 0.2)' : 'none'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌤️</div>
              <h4 style={{ marginBottom: '0.5rem', color: '#64ffda' }}>Анализ METAR</h4>
              <p style={{ opacity: 0.8 }}>Чтение метеосводок</p>
            </DemoCard>
          </DemoGrid>
        </DemoContainer>
      </InteractiveSection>

      {/* секция с игрой Alpha Bravo Challenge */}
      <ChallengeSection>
        <ChallengeContainer>
          <DemoTitle>Alpha Bravo Challenge</DemoTitle>
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem', opacity: 0.9 }}>
            Проверьте свои знания авиационного алфавита ИКАО в увлекательной игре
          </p>
          <AlphaBravoChallenge />
        </ChallengeContainer>
      </ChallengeSection>

      <CtaSection>
        <CtaContent>
          <CtaTitle>Готовы начать обучение?</CtaTitle>
          <CtaDescription>
            Присоединяйтесь к сообществу профессиональных пилотов уже сегодня.
            Освойте современные системы навигации и метеоанализа в интерактивной среде.
          </CtaDescription>
          <CtaButton onClick={handleTryNavigation}>
            Начать бесплатно
          </CtaButton>
        </CtaContent>
      </CtaSection>
    </HomeContainer>
  );
};