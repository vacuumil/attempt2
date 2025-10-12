// src/components/meteorology/components/SIGWX/types/sigwx.types.ts
export type SigwxSection = 'theory' | 'symbols' | 'practice' | 'testing';
export type TestDifficulty = 'easy' | 'medium' | 'hard' | 'exam';

export interface WeatherSymbol {
  id: string;
  symbol: string;
  name: string;
  description: string;
  category: 'weather' | 'fronts' | 'clouds' | 'other';
  importantNotes?: string;
}

export interface TestQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'matching' | 'identification';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  symbolId?: string;
  difficulty: TestDifficulty;
  explanation?: string;
}

export interface TestResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  date: Date;
  difficulty: TestDifficulty;
  wrongAnswers: {
    questionId: string;
    userAnswer: string;
    correctAnswer: string;
  }[];
}