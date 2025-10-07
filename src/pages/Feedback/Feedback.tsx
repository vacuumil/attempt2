// src/pages/Feedback/Feedback.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

const FeedbackContainer = styled.div`
  min-height: 100vh;
  background: #0a192f;
  color: #e6f1ff;
  padding: 100px 2rem 2rem;
`;

const FeedbackContent = styled.div`
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

const FeedbackForm = styled.form`
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
  min-height: 200px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #64ffda;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const RatingButton = styled.button<{ selected: boolean }>`
  background: ${props => props.selected ? '#64ffda' : 'rgba(10, 25, 47, 0.6)'};
  color: ${props => props.selected ? '#0a192f' : '#e6f1ff'};
  border: 1px solid ${props => props.selected ? '#64ffda' : 'rgba(100, 255, 218, 0.3)'};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${props => props.selected ? 'bold' : 'normal'};

  &:hover {
    background: #64ffda;
    color: #0a192f;
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

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
`;

const FeatureCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #8892b0;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(100, 255, 218, 0.1);
  }

  input {
    accent-color: #64ffda;
  }
`;

export const Feedback: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'suggestion',
    rating: 0,
    message: '',
    features: [] as string[]
  });

  const featuresList = [
    'VOR Навигация',
    'Расчет РПП',
    'Треугольник скоростей',
    'Метеорология',
    'Интерфейс',
    'Производительность',
    'Документация'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Обработка отправки обратной связи
    alert('Спасибо за ваш отзыв! Мы ценим ваше мнение и обязательно его рассмотрим.');
    setFormData({
      name: '',
      email: '',
      type: 'suggestion',
      rating: 0,
      message: '',
      features: []
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  return (
    <FeedbackContainer>
      <FeedbackContent>
        <Title>Обратная связь</Title>
        <p style={{ textAlign: 'center', color: '#8892b0', fontSize: '1.2rem', marginBottom: '3rem' }}>
          Помогите нам сделать AeroTrainer лучше! Мы ценим каждое ваше мнение.
        </p>

        <FeedbackForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Ваше имя (необязательно)</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Как к вам обращаться?"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Электронная почта (необязательно)</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Для обратной связи"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="type">Тип обратной связи</Label>
            <Select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="suggestion">Предложение по улучшению</option>
              <option value="praise">Благодарность</option>
              <option value="complaint">Жалоба</option>
              <option value="question">Вопрос</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Общая оценка платформы</Label>
            <RatingContainer>
              {[1, 2, 3, 4, 5].map((rating) => (
                <RatingButton
                  key={rating}
                  type="button"
                  selected={formData.rating === rating}
                  onClick={() => handleRatingClick(rating)}
                >
                  {'⭐'.repeat(rating)}
                </RatingButton>
              ))}
            </RatingContainer>
          </FormGroup>

          <FormGroup>
            <Label>Какие модули вас интересуют? (необязательно)</Label>
            <FeatureGrid>
              {featuresList.map((feature) => (
                <FeatureCheckbox key={feature}>
                  <input
                    type="checkbox"
                    checked={formData.features.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                  />
                  {feature}
                </FeatureCheckbox>
              ))}
            </FeatureGrid>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">Ваш отзыв или предложение</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Расскажите, что вам нравится, что можно улучшить, или поделитесь своими идеями..."
              required
            />
          </FormGroup>

          <div style={{ textAlign: 'center' }}>
            <SubmitButton type="submit">Отправить отзыв</SubmitButton>
          </div>
        </FeedbackForm>

        <div style={{ marginTop: '3rem', color: '#8892b0', textAlign: 'center' }}>
          <h3 style={{ color: '#64ffda', marginBottom: '1rem' }}>💡 Что мы делаем с вашими отзывами?</h3>
          <p>• Анализируем все предложения на еженедельных планерках</p>
          <p>• Включаем лучшие идеи в план разработки</p>
          <p>• Сообщаем об реализации предложенных улучшений</p>
        </div>
      </FeedbackContent>
    </FeedbackContainer>
  );
};