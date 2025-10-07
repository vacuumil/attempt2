// src/pages/Docs/Docs.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DocsContainer = styled.div`
  min-height: 100vh;
  background: #0a192f;
  color: #e6f1ff;
  padding: 100px 2rem 2rem;
`;

const DocsContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Section = styled.section`
  margin-bottom: 4rem;
  background: rgba(26, 111, 196, 0.1);
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid rgba(26, 111, 196, 0.3);
`;

const SectionTitle = styled.h2`
  color: #64ffda;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const DocLink = styled(Link)`
  background: rgba(10, 25, 47, 0.6);
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 10px;
  border: 1px solid rgba(100, 255, 218, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: block;
  color: inherit;

  &:hover {
    border-color: #64ffda;
    transform: translateX(10px);
    text-decoration: none;
    color: inherit;
  }
`;

const List = styled.ul`
  color: #8892b0;
  margin: 1rem 0;
  padding-left: 1.5rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

export const Docs: React.FC = () => {
  const documentationSections = [
    {
      title: '🧭 Навигационные системы',
      items: [
        { 
          title: 'VOR Навигация - полное руководство', 
          description: 'Принципы работы, настройка, практическое применение',
          link: '/navigation?tab=vor'
        },
        { 
          title: 'Расчет РПП - пошаговое руководство', 
          description: 'Методика расчета радионавигационных параметров полета',
          link: '/navigation?tab=flightplan'
        },
        { 
          title: 'Треугольник скоростей', 
          description: 'Теория и практика расчета аэродинамических параметров',
          link: '/navigation?tab=triangle'
        }
      ]
    },
    {
      title: '🌤️ Метеорология',
      items: [
        { 
          title: 'Расшифровка METAR/TAF', 
          description: 'Полный справочник по метеорологическим кодам',
          link: '/meteorology'
        },
        { 
          title: 'Анализ опасных явлений', 
          description: 'SIGMET, AIRMET, грозы, обледенение',
          link: '/meteorology'
        },
        { 
          title: 'Метеоинструменты пилота', 
          description: 'Использование метеоданных в полете',
          link: '/meteorology'
        }
      ]
    },
    {
      title: '🎮 Практические сценарии',
      items: [
        { 
          title: 'Тренировочные миссии VOR', 
          description: 'Постепенное усложнение заданий',
          link: '/navigation?tab=vor'
        },
        { 
          title: 'Сценарии плохой погоды', 
          description: 'Полеты в сложных метеоусловиях',
          link: '/meteorology'
        },
        { 
          title: 'Аварийные процедуры', 
          description: 'Действия при отказе оборудования',
          link: '/docs/emergency'
        }
      ]
    }
  ];

  return (
    <DocsContainer>
      <DocsContent>
        <Title>Техническая документация</Title>
        
        <Section>
          <p style={{ textAlign: 'center', color: '#8892b0', fontSize: '1.1rem', marginBottom: '2rem' }}>
            📖 Полное руководство по использованию платформы AeroTrainer
          </p>
        </Section>

        {documentationSections.map((section, index) => (
          <Section key={index}>
            <SectionTitle>{section.title}</SectionTitle>
            {section.items.map((item, itemIndex) => (
              <DocLink 
                key={itemIndex} 
                to={item.link}
                title={`Перейти к ${item.title}`}
              >
                <h3 style={{ color: '#e6f1ff', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: '#8892b0', margin: 0 }}>{item.description}</p>
              </DocLink>
            ))}
          </Section>
        ))}

        <Section>
          <SectionTitle>❓ Часто задаваемые вопросы</SectionTitle>
          <div style={{ color: '#8892b0', lineHeight: '1.6' }}>
            <p><strong>Q: Нужно ли подключение к интернету?</strong><br/>
            A: Платформа работает полностью автономно после загрузки.</p>
            
            <p><strong>Q: Соответствует ли обучение требованиям ФАП?</strong><br/>
            A: Да, все материалы соответствуют Федеральным авиационным правилам.</p>
            
            <p><strong>Q: Можно ли использовать на мобильных устройствах?</strong><br/>
            A: Да, платформа полностью адаптирована для планшетов и смартфонов.</p>

            <p><strong>Q: Как часто обновляются данные?</strong><br/>
            A: Метеоданные обновляются в реальном времени, навигационные данные - ежеквартально.</p>
          </div>
        </Section>

        <Section>
          <SectionTitle>📞 Техническая поддержка</SectionTitle>
          <p style={{ color: '#8892b0', lineHeight: '1.6' }}>
            Если вы не нашли ответ на свой вопрос в документации, наша команда поддержки всегда готова помочь:
          </p>
          <List>
            <ListItem>📧 Email: support@aerotrainer.ru</ListItem>
            <ListItem>📞 Телефон: +7 (495) 123-45-67</ListItem>
            <ListItem>🕒 Время работы: Пн-Пт 9:00-18:00 МСК</ListItem>
          </List>
        </Section>
      </DocsContent>
    </DocsContainer>
  );
};