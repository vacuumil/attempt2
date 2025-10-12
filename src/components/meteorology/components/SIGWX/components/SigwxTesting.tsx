// src/components/meteorology/components/SIGWX/components/SigwxTesting.tsx
import React, { useState, useEffect } from 'react';
import type { TestDifficulty, TestResult } from '../types/sigwx.types';
import { testQuestions } from '../data/testQuestions';

export const SigwxTesting: React.FC = () => {
  const [currentDifficulty, setCurrentDifficulty] = useState<TestDifficulty | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [testStarted, setTestStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>('');

  const difficulties: { level: TestDifficulty; name: string; questions: number }[] = [
    { level: 'easy', name: '🟢 Начальный', questions: 5 },
    { level: 'medium', name: '🟡 Средний', questions: 3 },
    { level: 'hard', name: '🔴 Продвинутый', questions: 3 },
    { level: 'exam', name: '🎓 Комплексный экзамен', questions: 8 }
  ];

  const currentQuestions = currentDifficulty 
    ? testQuestions.filter(q => 
        currentDifficulty === 'exam' ? true : q.difficulty === currentDifficulty
      ).slice(0, difficulties.find(d => d.level === currentDifficulty)?.questions || 5)
    : [];

  const currentQuestion = currentQuestions[currentQuestionIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (testStarted && !testFinished) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [testStarted, testFinished]);

  const startTest = (difficulty: TestDifficulty) => {
    setCurrentDifficulty(difficulty);
    setTestStarted(true);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setTimeSpent(0);
    setTestFinished(false);
    setSelectedAnswer('');
  };

  const handleAnswer = (answer: string | string[]) => {
    setSelectedAnswer(answer);
  };

  const isAnswerComplete = () => {
    if (currentQuestion?.type === 'matching' && Array.isArray(selectedAnswer)) {
      return selectedAnswer.length === currentQuestion.options?.length && 
             selectedAnswer.every(answer => answer !== '');
    }
    return selectedAnswer !== '';
  };

  const nextQuestion = () => {
    const newAnswers = [...userAnswers];
    
    if (currentQuestion.type === 'matching' && Array.isArray(selectedAnswer)) {
      newAnswers.push(JSON.stringify(selectedAnswer));
    } else {
      newAnswers.push(selectedAnswer as string);
    }
    
    setUserAnswers(newAnswers);
    setSelectedAnswer('');

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishTest(newAnswers);
    }
  };

  const finishTest = (answers: string[]) => {
    setTestFinished(true);
    setUserAnswers(answers);
  };

  const calculateResults = (): TestResult => {
    const correctAnswers = currentQuestions.filter((question, index) => {
      const userAnswer = userAnswers[index];
      
      if (question.type === 'matching') {
        try {
          const parsedAnswer = JSON.parse(userAnswer);
          return JSON.stringify(parsedAnswer) === JSON.stringify(question.correctAnswer);
        } catch {
          return false;
        }
      }
      
      return userAnswer === question.correctAnswer;
    }).length;

    const score = Math.round((correctAnswers / currentQuestions.length) * 100);

    return {
      score,
      totalQuestions: currentQuestions.length,
      correctAnswers,
      timeSpent,
      date: new Date(),
      difficulty: currentDifficulty!,
      wrongAnswers: currentQuestions
        .map((question, index) => ({ question, userAnswer: userAnswers[index] }))
        .filter(({ question, userAnswer }) => {
          if (question.type === 'matching') {
            try {
              const parsedAnswer = JSON.parse(userAnswer);
              return JSON.stringify(parsedAnswer) !== JSON.stringify(question.correctAnswer);
            } catch {
              return true;
            }
          }
          return userAnswer !== question.correctAnswer;
        })
        .map(({ question, userAnswer }) => ({
          questionId: question.id,
          userAnswer: question.type === 'matching' ? 
            (() => {
              try {
                const parsed = JSON.parse(userAnswer);
                return Array.isArray(parsed) ? parsed.join(', ') : userAnswer;
              } catch {
                return userAnswer;
              }
            })() : userAnswer,
          correctAnswer: Array.isArray(question.correctAnswer) 
            ? question.correctAnswer.join(', ') 
            : question.correctAnswer
        }))
    };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!testStarted) {
    return (
      <div style={{ textAlign: 'center', padding: '0 10px' }}>
        <h2 style={{ 
          color: '#64ffda', 
          fontFamily: 'Rajdhani, sans-serif', 
          marginBottom: '30px',
          fontSize: 'clamp(1.5rem, 4vw, 2rem)'
        }}>
          🎯 Тестирование знаний
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
          gap: 'clamp(15px, 3vw, 20px)',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 10px'
        }}>
          {difficulties.map(({ level, name, questions }) => (
            <div
              key={level}
              style={{
                background: '#112240',
                padding: 'clamp(20px, 4vw, 25px)',
                borderRadius: '12px',
                border: '2px solid #1a6fc4',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                minHeight: '120px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
              onClick={() => startTest(level)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = '#64ffda';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#1a6fc4';
              }}
            >
              <h3 style={{ 
                color: '#64ffda', 
                fontFamily: 'Rajdhani, sans-serif',
                marginBottom: '10px',
                fontSize: 'clamp(1.1rem, 3vw, 1.3rem)'
              }}>
                {name}
              </h3>
              <p style={{ 
                color: '#8892b0', 
                margin: 0,
                fontFamily: 'Exo 2, sans-serif',
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
              }}>
                {questions} вопросов
                {level === 'easy' && ' (70% для прохождения)'}
                {level === 'medium' && ' (75% для прохождения)'}
                {level === 'hard' && ' (80% для прохождения)'}
                {level === 'exam' && ' (85% для прохождения)'}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (testFinished) {
    const results = calculateResults();
    const passed = 
      (results.difficulty === 'easy' && results.score >= 70) ||
      (results.difficulty === 'medium' && results.score >= 75) ||
      (results.difficulty === 'hard' && results.score >= 80) ||
      (results.difficulty === 'exam' && results.score >= 85);

    return (
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto',
        padding: '0 15px'
      }}>
        <h2 style={{ 
          color: passed ? '#64ffda' : '#ff6b6b',
          fontFamily: 'Rajdhani, sans-serif',
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: 'clamp(1.5rem, 4vw, 2rem)'
        }}>
          {passed ? '✅ Тест пройден!' : '❌ Тест не пройден'}
        </h2>

        <div style={{
          background: '#112240',
          padding: 'clamp(20px, 4vw, 25px)',
          borderRadius: '12px',
          border: `2px solid ${passed ? '#64ffda' : '#ff6b6b'}`,
          marginBottom: '25px'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: 'clamp(10px, 2vw, 15px)', 
            marginBottom: '20px' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: 'clamp(2rem, 6vw, 2.5rem)', 
                color: '#64ffda', 
                fontWeight: 'bold' 
              }}>
                {results.score}%
              </div>
              <div style={{ 
                color: '#8892b0', 
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', 
                fontFamily: 'Exo 2, sans-serif' 
              }}>
                Результат
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: 'clamp(2rem, 6vw, 2.5rem)', 
                color: '#64ffda', 
                fontWeight: 'bold' 
              }}>
                {formatTime(results.timeSpent)}
              </div>
              <div style={{ 
                color: '#8892b0', 
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', 
                fontFamily: 'Exo 2, sans-serif' 
              }}>
                Время
              </div>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '10px',
            background: '#0a192f',
            padding: '15px',
            borderRadius: '8px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                color: '#64ffda', 
                fontSize: 'clamp(1.3rem, 4vw, 1.5rem)', 
                fontWeight: 'bold' 
              }}>
                {results.correctAnswers}
              </div>
              <div style={{ 
                color: '#8892b0', 
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', 
                fontFamily: 'Exo 2, sans-serif' 
              }}>
                Правильно
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                color: '#ff6b6b', 
                fontSize: 'clamp(1.3rem, 4vw, 1.5rem)', 
                fontWeight: 'bold' 
              }}>
                {results.totalQuestions - results.correctAnswers}
              </div>
              <div style={{ 
                color: '#8892b0', 
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', 
                fontFamily: 'Exo 2, sans-serif' 
              }}>
                Ошибки
              </div>
            </div>
          </div>
        </div>

        {results.wrongAnswers.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ 
              color: '#64ffda', 
              fontFamily: 'Rajdhani, sans-serif', 
              marginBottom: '15px',
              fontSize: 'clamp(1.2rem, 3vw, 1.3rem)'
            }}>
              Разбор ошибок:
            </h3>
            {results.wrongAnswers.map((wrong, index) => {
              const question = currentQuestions.find(q => q.id === wrong.questionId);
              return (
                <div
                  key={index}
                  style={{
                    background: '#112240',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    border: '1px solid #ff6b6b'
                  }}
                >
                  <p style={{ 
                    color: '#e6f1ff', 
                    margin: '0 0 10px 0',
                    fontFamily: 'Exo 2, sans-serif',
                    lineHeight: 1.4,
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                  }}>
                    {question?.question}
                  </p>
                  <div style={{ 
                    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', 
                    fontFamily: 'Exo 2, sans-serif' 
                  }}>
                    <div style={{ color: '#ff6b6b', marginBottom: '5px' }}>
                      <strong>Ваш ответ:</strong> {wrong.userAnswer}
                    </div>
                    <div style={{ color: '#64ffda', marginBottom: '5px' }}>
                      <strong>Правильный ответ:</strong> {wrong.correctAnswer}
                    </div>
                    {question?.explanation && (
                      <div style={{ 
                        color: '#8892b0', 
                        marginTop: '8px', 
                        paddingTop: '8px', 
                        borderTop: '1px solid #1a6fc4' 
                      }}>
                        <strong>📝 Объяснение:</strong> {question.explanation}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => {
              setTestStarted(false);
              setTestFinished(false);
              setCurrentDifficulty(null);
            }}
            style={{
              background: '#1a6fc4',
              color: '#e6f1ff',
              border: 'none',
              padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 30px)',
              borderRadius: '8px',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              cursor: 'pointer',
              fontFamily: 'Exo 2, sans-serif',
              transition: 'all 0.3s ease',
              fontWeight: '500',
              marginBottom: '20px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#64ffda';
              e.currentTarget.style.color = '#0a192f';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1a6fc4';
              e.currentTarget.style.color = '#e6f1ff';
            }}
          >
            Пройти другой тест
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div style={{ 
        textAlign: 'center', 
        color: '#64ffda',
        fontFamily: 'Rajdhani, sans-serif',
        fontSize: 'clamp(1rem, 3vw, 1.2rem)',
        padding: '40px 20px'
      }}>
        Загрузка вопроса...
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto',
      padding: '0 15px'
    }}>
      {/* Прогресс бар */}
      <div style={{ marginBottom: '25px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '10px',
          color: '#8892b0',
          fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
          fontFamily: 'Exo 2, sans-serif'
        }}>
          <span>Вопрос {currentQuestionIndex + 1} из {currentQuestions.length}</span>
          <span>Время: {formatTime(timeSpent)}</span>
        </div>
        <div style={{
          background: '#0a192f',
          height: '6px',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{
            background: '#64ffda',
            height: '100%',
            width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Вопрос */}
      <div style={{
        background: '#112240',
        padding: 'clamp(20px, 4vw, 25px)',
        borderRadius: '12px',
        border: '2px solid #1a6fc4',
        marginBottom: '25px'
      }}>
        <h3 style={{ 
          color: '#e6f1ff', 
          fontFamily: 'Exo 2, sans-serif',
          marginBottom: '20px',
          lineHeight: 1.4,
          fontSize: 'clamp(1rem, 3vw, 1.1rem)'
        }}>
          {currentQuestion.question}
        </h3>

        {/* Варианты ответов */}
        {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                style={{
                  background: selectedAnswer === option ? '#64ffda' : 'transparent',
                  color: selectedAnswer === option ? '#0a192f' : '#e6f1ff',
                  border: `2px solid ${selectedAnswer === option ? '#64ffda' : '#1a6fc4'}`,
                  padding: 'clamp(10px, 2vw, 12px) clamp(12px, 2vw, 15px)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'Exo 2, sans-serif',
                  transition: 'all 0.3s ease',
                  fontSize: 'clamp(0.9rem, 2vw, 0.95rem)'
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {currentQuestion.type === 'true-false' && (
          <div style={{ display: 'flex', gap: 'clamp(10px, 2vw, 15px)' }}>
            <button
              onClick={() => handleAnswer('true')}
              style={{
                background: selectedAnswer === 'true' ? '#64ffda' : 'transparent',
                color: selectedAnswer === 'true' ? '#0a192f' : '#e6f1ff',
                border: `2px solid ${selectedAnswer === 'true' ? '#64ffda' : '#1a6fc4'}`,
                padding: 'clamp(10px, 2vw, 12px) clamp(20px, 3vw, 25px)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'Exo 2, sans-serif',
                flex: 1,
                fontSize: 'clamp(0.9rem, 2vw, 0.95rem)',
                fontWeight: '500'
              }}
            >
              Верно
            </button>
            <button
              onClick={() => handleAnswer('false')}
              style={{
                background: selectedAnswer === 'false' ? '#64ffda' : 'transparent',
                color: selectedAnswer === 'false' ? '#0a192f' : '#e6f1ff',
                border: `2px solid ${selectedAnswer === 'false' ? '#64ffda' : '#1a6fc4'}`,
                padding: 'clamp(10px, 2vw, 12px) clamp(20px, 3vw, 25px)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'Exo 2, sans-serif',
                flex: 1,
                fontSize: 'clamp(0.9rem, 2vw, 0.95rem)',
                fontWeight: '500'
              }}
            >
              Неверно
            </button>
          </div>
        )}

        {currentQuestion.type === 'matching' && currentQuestion.options && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              background: '#0a192f',
              padding: '10px 15px',
              borderRadius: '6px',
              border: '1px solid #1a6fc4',
              marginBottom: '10px'
            }}>
              <p style={{ 
                color: '#64ffda', 
                margin: 0, 
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                fontFamily: 'Exo 2, sans-serif'
              }}>
                📋 Сопоставьте символы с их значениями
              </p>
            </div>
            
            {currentQuestion.options.map((symbol, index) => (
              <div 
                key={index} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'clamp(8px, 2vw, 12px)',
                  background: '#0a192f',
                  padding: 'clamp(10px, 2vw, 12px) clamp(12px, 2vw, 15px)',
                  borderRadius: '8px',
                  border: '1px solid #1a6fc4',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{
                  background: '#112240',
                  padding: 'clamp(8px, 2vw, 10px) clamp(12px, 2vw, 15px)',
                  borderRadius: '6px',
                  minWidth: 'clamp(60px, 12vw, 80px)',
                  textAlign: 'center',
                  fontFamily: 'Share Tech Mono, monospace',
                  fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                  border: '1px solid #64ffda',
                  color: '#64ffda',
                  flexShrink: 0
                }}>
                  {symbol}
                </div>
                
                <span style={{ 
                  color: '#8892b0', 
                  minWidth: 'clamp(40px, 8vw, 60px)',
                  fontFamily: 'Exo 2, sans-serif',
                  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                  textAlign: 'center',
                  flexShrink: 0
                }}>
                  →
                </span>
                
                <select
                  value={Array.isArray(selectedAnswer) ? selectedAnswer[index] || '' : ''}
                  onChange={(e) => {
                    const newAnswers = Array.isArray(selectedAnswer) 
                      ? [...selectedAnswer] 
                      : new Array(currentQuestion.options?.length).fill('');
                    newAnswers[index] = e.target.value;
                    setSelectedAnswer(newAnswers);
                  }}
                  style={{
                    background: '#112240',
                    color: '#e6f1ff',
                    border: '1px solid #1a6fc4',
                    padding: 'clamp(8px, 2vw, 10px) clamp(12px, 2vw, 15px)',
                    borderRadius: '6px',
                    flex: 1,
                    fontFamily: 'Exo 2, sans-serif',
                    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                    cursor: 'pointer',
                    minWidth: '150px'
                  }}
                >
                  <option value="">-- Выберите значение --</option>
                  {Array.isArray(currentQuestion.correctAnswer) && 
                    currentQuestion.correctAnswer.map((answer, ansIndex) => (
                      <option key={ansIndex} value={answer}>
                        {answer}
                      </option>
                    ))
                  }
                </select>
              </div>
            ))}
          </div>
        )}

        {currentQuestion.type === 'identification' && currentQuestion.options && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                style={{
                  background: selectedAnswer === option ? '#64ffda' : 'transparent',
                  color: selectedAnswer === option ? '#0a192f' : '#e6f1ff',
                  border: `2px solid ${selectedAnswer === option ? '#64ffda' : '#1a6fc4'}`,
                  padding: 'clamp(10px, 2vw, 12px) clamp(12px, 2vw, 15px)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'Exo 2, sans-serif',
                  transition: 'all 0.3s ease',
                  fontSize: 'clamp(0.9rem, 2vw, 0.95rem)'
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Кнопка продолжения */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={nextQuestion}
          disabled={!isAnswerComplete()}
          style={{
            background: isAnswerComplete() ? '#64ffda' : '#8892b0',
            color: isAnswerComplete() ? '#0a192f' : '#e6f1ff',
            border: 'none',
            padding: 'clamp(10px, 2vw, 12px) clamp(30px, 6vw, 40px)',
            borderRadius: '8px',
            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            cursor: isAnswerComplete() ? 'pointer' : 'not-allowed',
            fontFamily: 'Exo 2, sans-serif',
            transition: 'all 0.3s ease',
            fontWeight: '500',
            width: '100%',
            maxWidth: '300px'
          }}
        >
          {currentQuestionIndex < currentQuestions.length - 1 ? 'Следующий вопрос' : 'Завершить тест'}
        </button>
      </div>
    </div>
  );
};