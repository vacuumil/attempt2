// src/pages/Privacy/Privacy.tsx
import React from 'react';
import styled from 'styled-components';

const PrivacyContainer = styled.div`
  min-height: 100vh;
  background: #0a192f;
  color: #e6f1ff;
  padding: 100px 2rem 2rem;
`;

const PrivacyContent = styled.div`
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

export const Privacy: React.FC = () => {
  return (
    <PrivacyContainer>
      <PrivacyContent>
        <Title>Политика конфиденциальности</Title>
        
        <Section>
          <p style={{ textAlign: 'center', color: '#8892b0', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Последнее обновление: 1 января 2025 года
          </p>
        </Section>

        <Section>
          <SectionTitle>1. Сбор информации</SectionTitle>
          <p style={{ color: '#8892b0' }}>
            AeroTrainer собирает минимальный объем информации, необходимый для работы платформы:
          </p>
          <List>
            <ListItem><Highlight>Технические данные:</Highlight> тип браузера, версия ОС, разрешение экрана</ListItem>
            <ListItem><Highlight>Данные использования:</Highlight> пройденные модули, результаты тренировок</ListItem>
            <ListItem><Highlight>Добровольная информация:</Highlight> контактные данные при обращении в поддержку</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>2. Использование информации</SectionTitle>
          <p style={{ color: '#8892b0' }}>
            Собранная информация используется для:
          </p>
          <List>
            <ListItem>Улучшения работы платформы</ListItem>
            <ListItem>Персонализации обучения</ListItem>
            <ListItem>Технической поддержки пользователей</ListItem>
            <ListItem>Аналитики для развития продукта</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>3. Защита данных</SectionTitle>
          <p style={{ color: '#8892b0' }}>
            Мы применяем современные меры безопасности для защиты ваших данных:
          </p>
          <List>
            <ListItem>Шифрование передаваемых данных</ListItem>
            <ListItem>Регулярное обновление систем безопасности</ListItem>
            <ListItem>Ограниченный доступ к персональным данным</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>4. Файлы cookies</SectionTitle>
          <p style={{ color: '#8892b0' }}>
            Платформа использует cookies для:
          </p>
          <List>
            <ListItem>Сохранения прогресса обучения</ListItem>
            <ListItem>Запоминания предпочтений интерфейса</ListItem>
            <ListItem>Аналитики использования платформы</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>5. Третьи стороны</SectionTitle>
          <p style={{ color: '#8892b0' }}>
            Мы не передаем ваши данные третьим лицам, за исключением:
          </p>
          <List>
            <ListItem>Случаев, требуемых законодательством</ListItem>
            <ListItem>Сервисов аналитики (в обезличенной форме)</ListItem>
            <ListItem>Партнеров при явном согласии пользователя</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>6. Ваши права</SectionTitle>
          <p style={{ color: '#8892b0' }}>
            Вы имеете право:
          </p>
          <List>
            <ListItem>На доступ к вашим данным</ListItem>
            <ListItem>На исправление неточной информации</ListItem>
            <ListItem>На удаление ваших данных</ListItem>
            <ListItem>На отзыв согласия на обработку</ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>7. Контакты</SectionTitle>
          <p style={{ color: '#8892b0' }}>
            По вопросам конфиденциальности обращайтесь:
            <br/>
            Email: <Highlight>privacy@aerotrainer.ru</Highlight>
            <br/>
            Телефон: <Highlight>+7 (495) 123-45-67</Highlight>
          </p>
        </Section>
      </PrivacyContent>
    </PrivacyContainer>
  );
};