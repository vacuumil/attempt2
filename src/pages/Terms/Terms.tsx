// src/pages/Terms/Terms.tsx
import React from 'react';
import styled from 'styled-components';

const TermsContainer = styled.div`
  min-height: 100vh;
  background: #0a192f;
  color: #e6f1ff;
  padding: 100px 2rem 2rem;
`;

const TermsContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.7;
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
  margin-bottom: 3rem;
  background: rgba(26, 111, 196, 0.1);
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid rgba(26, 111, 196, 0.3);
`;

const SectionTitle = styled.h2`
  color: #64ffda;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const List = styled.ul`
  color: #8892b0;
  margin: 1rem 0;
  padding-left: 1.5rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const Highlight = styled.span`
  color: #64ffda;
  font-weight: 600;
`;

export const Terms: React.FC = () => {
  return (
    <TermsContainer>
      <TermsContent>
        <Title>Условия использования</Title>
        
        <Section>
          <p style={{ textAlign: 'center', color: '#8892b0', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Последнее обновление: 1 января 2025 года
          </p>
        </Section>

        <Section>
          <SectionTitle>1. Принятие условий</SectionTitle>
          <p style={{ color: '#8892b0' }}>
            Используя платформу AeroTrainer, вы соглашаетесь с настоящими Условиями использования. 
            Если вы не согласны с какими-либо положениями, пожалуйста, не используйте нашу платформу.
          </p>
        </Section>

        <Section>
          <SectionTitle>2. Образовательная цель</SectionTitle>
          <p style={{ color: '#8892b0' }}>
            AeroTrainer является <Highlight>образовательной платформой</Highlight> и предназначен для обучения и тренировки. 
            Информация, предоставляемая платформой, не должна использоваться для реальных полетов без дополнительной проверки 
            через официальные источники и утвержденные процедуры.
          </p>
        </Section>

        <Section>
          <SectionTitle>3. Права и ограничения</SectionTitle>
          <List>
            <ListItem>Вы можете использовать платформу для личного обучения</ListItem>
            <ListItem>Запрещается коммерческое использование без лицензии</ListItem>
            <ListItem>Не допускается reverse engineering платформы</ListItem>
            <ListItem>Запрещено создание копий контента для распространения</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>4. Ответственность</SectionTitle>
          <p style={{ color: '#8892b0' }}>
            Разработчики AeroTrainer не несут ответственности за:
          </p>
          <List>
            <ListItem>Использование платформы для реальной навигации</ListItem>
            <ListItem>Любые последствия, связанные с применением знаний на практике</ListItem>
            <ListItem>Технические сбои и временную недоступность сервиса</ListItem>
            <ListItem>Действия пользователей, нарушающие данные условия</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>5. Конфиденциальность</SectionTitle>
          <p style={{ color: '#8892b0' }}>
            Мы собираем минимально необходимую информацию для работы платформы. 
            Подробности в нашей <Highlight>Политике конфиденциальности</Highlight>.
          </p>
        </Section>

        <Section>
          <SectionTitle>6. Изменения условий</SectionTitle>
          <p style={{ color: '#8892b0' }}>
            Мы оставляем за собой право изменять данные Условия использования. 
            Об изменениях будет сообщено через уведомления в платформе.
          </p>
        </Section>

        <Section>
          <SectionTitle>7. Контактная информация</SectionTitle>
          <p style={{ color: '#8892b0' }}>
            По вопросам, связанным с Условиями использования, обращайтесь:
            <br/>
            Email: <Highlight>legal@aerotrainer.ru</Highlight>
            <br/>
            Телефон: <Highlight>+7 (495) 123-45-67</Highlight>
          </p>
        </Section>
      </TermsContent>
    </TermsContainer>
  );
};