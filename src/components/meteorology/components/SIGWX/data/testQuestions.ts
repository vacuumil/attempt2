// src/components/meteorology/components/SIGWX/data/testQuestions.ts
import type { TestQuestion } from '../types/sigwx.types';

export const testQuestions: TestQuestion[] = [
  // Легкие вопросы - идентификация символов
  {
    id: 'q1-easy',
    type: 'identification',
    question: 'Что означает этот символ? ●',
    options: ['Тропический циклон', 'Сильное обледенение', 'Дождь', 'Туман'],
    correctAnswer: 'Тропический циклон',
    symbolId: 'tropical-cyclone',
    difficulty: 'easy',
    explanation: 'Символ ● обозначает тропический циклон'
  },
  {
    id: 'q2-easy',
    type: 'identification',
    question: 'Что означает этот символ? ▲',
    options: ['Вулканическое извержение', 'Линия жестоких шквалов', 'Холодный фронт', 'Ливень'],
    correctAnswer: 'Линия жестоких шквалов',
    symbolId: 'severe-squall-line',
    difficulty: 'easy',
    explanation: 'Символ ▲ обозначает линию жестоких шквалов'
  },
  {
    id: 'q3-easy',
    type: 'identification',
    question: 'Что означает этот символ? ⌇⌇',
    options: ['Умеренная турбулентность', 'Горные волны', 'Морось', 'Мгла'],
    correctAnswer: 'Умеренная турбулентность',
    symbolId: 'moderate-turbulence',
    difficulty: 'easy',
    explanation: 'Символ ⌇⌇ обозначает умеренную турбулентность'
  },
  {
    id: 'q4-easy',
    type: 'multiple-choice',
    question: 'Какой символ обозначает умеренное обледенение ВС?',
    options: ['●', '◐', '▲', '≈'],
    correctAnswer: '◐',
    symbolId: 'moderate-aircraft-icing',
    difficulty: 'easy',
    explanation: 'Символ ◐ обозначает умеренное обледенение воздушного судна'
  },
  {
    id: 'q5-easy',
    type: 'true-false',
    question: 'Символ ☢ обозначает радиоактивные материалы в атмосфере',
    correctAnswer: 'true',
    symbolId: 'radioactive-materials',
    difficulty: 'easy',
    explanation: 'Верно, символ ☢ используется для обозначения радиоактивных материалов'
  },

  // Средние вопросы
  {
    id: 'q1-medium',
    type: 'matching',
    question: 'Сопоставьте символы с их значениями',
    options: ['••', '≡', '*', '··'],
    correctAnswer: ['Дождь', 'Обширный туман', 'Снег', 'Морось'],
    difficulty: 'medium',
    explanation: '•• - Дождь, ≡ - Туман, * - Снег, ·· - Морось'
  },
  {
    id: 'q2-medium',
    type: 'multiple-choice',
    question: 'Какой символ используется для обозначения линии жестоких шквалов и для каких полетов он выделяется?',
    options: [
      '▲ - для полетов до FL 100',
      '● - для всех полетов', 
      '≈ - для полетов выше FL 250',
      '⌇⌇ - для трансконтинентальных полетов'
    ],
    correctAnswer: '▲ - для полетов до FL 100',
    symbolId: 'severe-squall-line',
    difficulty: 'medium',
    explanation: 'Символ ▲ выделяется для полетов до эшелона FL 100'
  },
  {
    id: 'q3-medium',
    type: 'true-false',
    question: 'Символ ⇒* обозначает обширную низовую метель',
    correctAnswer: 'true',
    symbolId: 'blowing-snow',
    difficulty: 'medium',
    explanation: 'Верно, символ ⇒* используется для обозначения обширной низовой метели'
  },

  // Сложные вопросы
  {
    id: 'q1-hard',
    type: 'multiple-choice',
    question: 'Что необходимо проверять при наличии символа вулканического извержения на карте?',
    options: [
      'CHECK SIGNET, ADVISORED FOR FC AND VA, AND ASI FINAL AND NOTAM FOR VAT',
      'CHECK SIGNET AND NOTAM FOR ROADET C++',
      'Проверить прогноз турбулентности',
      'Уточнить температуру на эшелоне'
    ],
    correctAnswer: 'CHECK SIGNET, ADVISORED FOR FC AND VA, AND ASI FINAL AND NOTAM FOR VAT',
    symbolId: 'volcanic-eruption',
    difficulty: 'hard',
    explanation: 'Для вулканического извержения необходимо проверять SIGNET, ADVISORED FOR FC AND VA, AND ASI FINAL AND NOTAM FOR VAT'
  },
  {
    id: 'q2-hard',
    type: 'identification',
    question: 'Что означает символ ▲◯▲◯ и к какой категории он относится?',
    options: [
      'Фронт окклюзии - фронты',
      'Тропический циклон - погода', 
      'Кучево-дождевые облака - облака',
      'Сильная турбулентность - погода'
    ],
    correctAnswer: 'Фронт окклюзии - фронты',
    symbolId: 'occluded-front',
    difficulty: 'hard',
    explanation: 'Символ ▲◯▲◯ обозначает фронт окклюзии и относится к категории фронтов'
  },
  {
    id: 'q3-hard',
    type: 'true-false',
    question: 'Символ замерзающих осадков относится к обледенению из-за контакта осадков с ВС при очень низкой температуре',
    correctAnswer: 'false',
    symbolId: 'freezing-precipitation',
    difficulty: 'hard',
    explanation: 'Неверно. Этот символ НЕ относится к обледенению из-за контакта осадков с ВС при очень низкой температуре'
  }
];