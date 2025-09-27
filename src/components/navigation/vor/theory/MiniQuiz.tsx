import React, { useState } from 'react';
import './MiniQuiz.css';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface MiniQuizProps {
  questions: QuizQuestion[];
}

export const MiniQuiz: React.FC<MiniQuizProps> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="mini-quiz">
      <h4>Проверьте знания</h4>
      
      <div className="quiz-question">
        <p>{currentQ.question}</p>
      </div>

      <div className="quiz-options">
        {currentQ.options.map((option, index) => (
          <button
            key={index}
            className={`quiz-option ${
              selectedAnswer === index
                ? index === currentQ.correctAnswer
                  ? 'correct'
                  : 'incorrect'
                : ''
            }`}
            onClick={() => handleAnswerSelect(index)}
            disabled={showExplanation}
          >
            {option}
          </button>
        ))}
      </div>

      {showExplanation && (
        <div className="quiz-explanation">
          <p>{currentQ.explanation}</p>
          <button className="quiz-next" onClick={handleNext}>
            Следующий вопрос →
          </button>
        </div>
      )}
    </div>
  );
};