// src/pages/BugReport/BugReport.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

const BugReportContainer = styled.div`
  min-height: 100vh;
  background: #0a192f;
  color: #e6f1ff;
  padding: 100px 2rem 2rem;
`;

const BugReportContent = styled.div`
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

const BugForm = styled.form`
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

const Select = styled.select`
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

  option {
    background: #0a192f;
    color: #e6f1ff;
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

const PriorityIndicator = styled.div<{ priority: string }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  margin-left: 1rem;
  background: ${props => {
    switch (props.priority) {
      case 'low': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'high': return '#F44336';
      case 'critical': return '#9C27B0';
      default: return '#64ffda';
    }
  }};
  color: white;
`;

export const BugReport: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    module: '',
    priority: 'medium',
    steps: '',
    expected: '',
    actual: '',
    contact: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Обработка отправки отчета об ошибке
    alert('Отчет об ошибке отправлен! Спасибо за вашу помощь в улучшении платформы.');
    setFormData({
      title: '',
      module: '',
      priority: 'medium',
      steps: '',
      expected: '',
      actual: '',
      contact: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'low': return 'Низкий';
      case 'medium': return 'Средний';
      case 'high': return 'Высокий';
      case 'critical': return 'Критический';
      default: return 'Средний';
    }
  };

  return (
    <BugReportContainer>
      <BugReportContent>
        <Title>Сообщить об ошибке</Title>
        <p style={{ textAlign: 'center', color: '#8892b0', fontSize: '1.2rem', marginBottom: '3rem' }}>
          Помогите нам улучшить AeroTrainer. Сообщайте о любых найденных проблемах.
        </p>

        <BugForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Краткое описание ошибки</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Например: Неправильный расчет курса в модуле VOR"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="module">Модуль, в котором обнаружена ошибка</Label>
            <Select
              id="module"
              name="module"
              value={formData.module}
              onChange={handleChange}
              required
            >
              <option value="">Выберите модуль</option>
              <option value="vor">VOR Навигация</option>
              <option value="flightplan">Расчет РПП</option>
              <option value="triangle">Треугольник скоростей</option>
              <option value="meteorology">Метеорология</option>
              <option value="general">Общие проблемы</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="priority">
              Приоритет ошибки 
              <PriorityIndicator priority={formData.priority}>
                {getPriorityText(formData.priority)}
              </PriorityIndicator>
            </Label>
            <Select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Низкий - Не влияет на функциональность</option>
              <option value="medium">Средний - Незначительная проблема</option>
              <option value="high">Высокий - Влияет на использование</option>
              <option value="critical">Критический - Блокирует работу</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="steps">Шаги для воспроизведения</Label>
            <TextArea
              id="steps"
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              placeholder="1. Откройте модуль VOR...
2. Установите курс 180°...
3. Обратите внимание на..."
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="expected">Ожидаемый результат</Label>
            <TextArea
              id="expected"
              name="expected"
              value={formData.expected}
              onChange={handleChange}
              placeholder="Каким должен быть правильный результат?"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="actual">Фактический результат</Label>
            <TextArea
              id="actual"
              name="actual"
              value={formData.actual}
              onChange={handleChange}
              placeholder="Что происходит на самом деле?"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="contact">Контактные данные (необязательно)</Label>
            <Input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Email или телефон для обратной связи"
            />
          </FormGroup>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <SubmitButton type="submit">Отправить отчет об ошибке</SubmitButton>
          </div>
        </BugForm>

        <div style={{ marginTop: '3rem', color: '#8892b0', textAlign: 'center' }}>
          <h3 style={{ color: '#64ffda', marginBottom: '1rem' }}>📋 Что происходит после отправки?</h3>
          <p>1. Вы получите ID вашего отчета для отслеживания</p>
          <p>2. Наша команда проверит ошибку в течение 48 часов</p>
          <p>3. Мы уведомим вас о статусе исправления</p>
        </div>
      </BugReportContent>
    </BugReportContainer>
  );
};