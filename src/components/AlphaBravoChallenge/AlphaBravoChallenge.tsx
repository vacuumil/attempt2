// src/components/AlphaBravoChallenge/AlphaBravoChallenge.tsx
import React, { useState, useRef } from 'react';
import { getRandomLetters, type AviationLetter } from '../../data/aviationAlphabet';
import { ProgressBar } from '../ui/ProgressBar';
import {
  GameContainer,
  GameHeader,
  GameTitle,
  GameDescription,
  ModeSelector,
  ModeButton,
  QuestionContainer,
  QuestionText,
  QuestionSubtext,
  OptionsGrid,
  OptionButton,
  ScoreContainer,
  ActionButton,
  ResultsContainer,
  FinalScore,
  ResultMessage,
  RestartButton
} from './AlphaBravoChallenge.styles';

type GameMode = 'letter-to-word' | 'word-to-letter';

interface GameState {
  currentQuestion: AviationLetter | null;
  options: AviationLetter[];
  selectedAnswer: string | null;
  isAnswered: boolean;
  score: number;
  currentQuestionIndex: number;
}

export const AlphaBravoChallenge: React.FC = () => {
  const [gameMode, setGameMode] = useState<GameMode>('letter-to-word');
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: null,
    options: [],
    selectedAnswer: null,
    isAnswered: false,
    score: 0,
    currentQuestionIndex: 0
  });
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const TOTAL_QUESTIONS = 10;
  const gameStateRef = useRef(gameState);
  gameStateRef.current = gameState;

  const startGame = () => {
    setIsGameStarted(true);
    setIsGameFinished(false);
    setGameState({
      currentQuestion: null,
      options: [],
      selectedAnswer: null,
      isAnswered: false,
      score: 0,
      currentQuestionIndex: 0
    });
    generateNewQuestion();
  };

  const generateNewQuestion = () => {
    const randomLetters = getRandomLetters(4);
    const correctAnswer = randomLetters[0];
    const shuffledOptions = [...randomLetters].sort(() => 0.5 - Math.random());

    setGameState(prev => ({
      currentQuestion: correctAnswer,
      options: shuffledOptions,
      selectedAnswer: null,
      isAnswered: false,
      score: prev.score,
      currentQuestionIndex: prev.currentQuestionIndex + 1
    }));
  };

  const handleAnswer = (answer: string) => {
    if (gameState.isAnswered) return;

    const isCorrect = gameMode === 'letter-to-word' 
      ? answer === gameState.currentQuestion?.word
      : answer === gameState.currentQuestion?.letter;

    setGameState(prev => ({
      ...prev,
      selectedAnswer: answer,
      isAnswered: true,
      score: isCorrect ? prev.score + 1 : prev.score
    }));

    // Переход к следующему вопросу через 1.5 секунды
    setTimeout(() => {
      // Используем ref для получения актуального состояния
      if (gameStateRef.current.currentQuestionIndex >= TOTAL_QUESTIONS) {
        finishGame();
      } else {
        generateNewQuestion();
      }
    }, 1500);
  };

  const finishGame = () => {
    setIsGameFinished(true);
  };

  const getResultMessage = (score: number) => {
    const percentage = (score / TOTAL_QUESTIONS) * 100;
    if (percentage >= 90) return 'Отлично! Вы настоящий ас! ✈️';
    if (percentage >= 70) return 'Хорошо! Продолжайте в том же духе! 👍';
    if (percentage >= 50) return 'Неплохо! Есть над чем поработать. 📚';
    return 'Попробуйте еще раз! Практика ведет к совершенству. 🔄';
  };

  if (!isGameStarted) {
    return (
      <GameContainer>
        <GameHeader>
          <GameTitle>Alpha Bravo Challenge</GameTitle>
          <GameDescription>
            Проверьте свои знания авиационного алфавита ИКАО. Выберите режим и начните игру!
          </GameDescription>
        </GameHeader>

        <ModeSelector>
          <ModeButton 
            active={gameMode === 'letter-to-word'}
            onClick={() => setGameMode('letter-to-word')}
          >
            Буква → Слово
          </ModeButton>
          <ModeButton 
            active={gameMode === 'word-to-letter'}
            onClick={() => setGameMode('word-to-letter')}
          >
            Слово → Буква
          </ModeButton>
        </ModeSelector>

        <div style={{ textAlign: 'center' }}>
          <ActionButton onClick={startGame}>
            Начать игру
          </ActionButton>
        </div>
      </GameContainer>
    );
  }

  if (isGameFinished) {
    return (
      <GameContainer>
        <ResultsContainer>
          <GameTitle>Игра завершена!</GameTitle>
          <FinalScore>{gameState.score}/{TOTAL_QUESTIONS}</FinalScore>
          <ResultMessage>{getResultMessage(gameState.score)}</ResultMessage>
          <RestartButton onClick={startGame}>
            Играть снова
          </RestartButton>
        </ResultsContainer>
      </GameContainer>
    );
  }

  return (
    <GameContainer>
      <ScoreContainer>
        <div>Вопрос: {gameState.currentQuestionIndex}/{TOTAL_QUESTIONS}</div>
        <div>Счет: {gameState.score}</div>
      </ScoreContainer>

      <ProgressBar progress={gameState.currentQuestionIndex} max={TOTAL_QUESTIONS} />

      <QuestionContainer>
        <QuestionText>
          {gameMode === 'letter-to-word' 
            ? gameState.currentQuestion?.letter
            : gameState.currentQuestion?.word
          }
        </QuestionText>
        <QuestionSubtext>
          {gameMode === 'letter-to-word' 
            ? 'Выберите соответствующее слово'
            : 'Выберите соответствующую букву'
          }
        </QuestionSubtext>
      </QuestionContainer>

      <OptionsGrid>
        {gameState.options.map((option, index) => {
          const answer = gameMode === 'letter-to-word' ? option.word : option.letter;
          const isSelected = gameState.selectedAnswer === answer;
          const isCorrect = gameMode === 'letter-to-word' 
            ? answer === gameState.currentQuestion?.word
            : answer === gameState.currentQuestion?.letter;

          return (
            <OptionButton
              key={index}
              onClick={() => handleAnswer(answer)}
              disabled={gameState.isAnswered}
              isCorrect={gameState.isAnswered && isCorrect}
              isWrong={gameState.isAnswered && isSelected && !isCorrect}
            >
              {gameMode === 'letter-to-word' ? option.word : option.letter}
            </OptionButton>
          );
        })}
      </OptionsGrid>

      {gameState.isAnswered && (
        <div style={{ textAlign: 'center', color: '#64ffda', marginTop: '1rem' }}>
          {gameState.selectedAnswer === (gameMode === 'letter-to-word' 
            ? gameState.currentQuestion?.word 
            : gameState.currentQuestion?.letter
          ) ? '✅ Правильно!' : '❌ Неправильно'}
        </div>
      )}
    </GameContainer>
  );
};