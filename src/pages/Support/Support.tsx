// src/pages/Support/Support.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

const SupportContainer = styled.div`
  min-height: 100vh;
  background: #0a192f;
  color: #e6f1ff;
  padding: 100px 2rem 2rem;
`;

const SupportContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const ContactCard = styled.div`
  background: rgba(26, 111, 196, 0.1);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(26, 111, 196, 0.3);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #64ffda;
    transform: translateY(-5px);
  }
`;

const SupportForm = styled.form`
  background: rgba(26, 111, 196, 0.1);
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid rgba(26, 111, 196, 0.3);
  margin-top: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #64ffda;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(10, 25, 47, 0.6);
  border: 1px solid rgba(100, 255, 218, 0.3);
  border-radius: 8px;
  color: #e6f1ff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #64ffda;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: rgba(10, 25, 47, 0.6);
  border: 1px solid rgba(100, 255, 218, 0.3);
  border-radius: 8px;
  color: #e6f1ff;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #64ffda;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #1a6fc4 0%, #64ffda 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(100, 255, 218, 0.3);
  }
`;

export const Support: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Обработка отправки формы
    alert('Сообщение отправлено! Мы ответим вам в течение 24 часов.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <SupportContainer>
      <SupportContent>
        <Title>Техническая поддержка</Title>
        <p style={{ textAlign: 'center', color: '#8892b0', fontSize: '1.2rem', marginBottom: '3rem' }}>
          Мы всегда готовы помочь с любыми вопросами по работе платформы
        </p>

        <ContactGrid>
          <ContactCard>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
            <h3 style={{ color: '#64ffda', marginBottom: '1rem' }}>Электронная почта</h3>
            <p style={{ color: '#8892b0' }}>support@aerotrainer.ru</p>
            <p style={{ color: '#8892b0', fontSize: '0.9rem' }}>Ответ в течение 24 часов</p>
          </ContactCard>

          <ContactCard>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📞</div>
            <h3 style={{ color: '#64ffda', marginBottom: '1rem' }}>Телефон</h3>
            <p style={{ color: '#8892b0' }}>+7 (495) 123-45-67</p>
            <p style={{ color: '#8892b0', fontSize: '0.9rem' }}>Пн-Пт 9:00-18:00 МСК</p>
          </ContactCard>

          <ContactCard>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
            <h3 style={{ color: '#64ffda', marginBottom: '1rem' }}>Чат поддержки</h3>
            <p style={{ color: '#8892b0' }}>Онлайн-консультант</p>
            <p style={{ color: '#8892b0', fontSize: '0.9rem' }}>Круглосуточно</p>
          </ContactCard>
        </ContactGrid>

        <SupportForm onSubmit={handleSubmit}>
          <h2 style={{ color: '#64ffda', marginBottom: '2rem', textAlign: 'center' }}>Форма обратной связи</h2>
          
          <FormGroup>
            <Label htmlFor="name">Ваше имя</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Электронная почта</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="subject">Тема обращения</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">Подробное описание проблемы</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Опишите вашу проблему как можно подробнее..."
            />
          </FormGroup>

          <div style={{ textAlign: 'center' }}>
            <SubmitButton type="submit">Отправить сообщение</SubmitButton>
          </div>
        </SupportForm>

        <div style={{ marginTop: '3rem', textAlign: 'center', color: '#8892b0' }}>
          <h3 style={{ color: '#64ffda', marginBottom: '1rem' }}>⚡ Экстренная поддержка</h3>
          <p>Для срочных вопросов, связанных с безопасностью полетов: <strong>+7 (495) 123-45-68</strong></p>
        </div>
      </SupportContent>
    </SupportContainer>
  );
};