// src/components/meteorology/components/SIGWX/components/SigwxTheory.tsx
import React, { useState } from 'react';

// Типы для контента теории


interface TextContent {
  type: 'text';
  content: string;
}

interface ListContent {
  type: 'list';
  title: string;
  items: string[];
}

interface TableContent {
  type: 'table';
  title: string;
  headers: string[];
  rows: string[][];
}

interface WarningContent {
  type: 'warning';
  content: string;
}

interface ExampleContent {
  type: 'example';
  title: string;
  content: string;
}

type TheoryContent = TextContent | ListContent | TableContent | WarningContent | ExampleContent;

interface ChapterContent {
  title: string;
  content: TheoryContent[];
}

interface TheoryChapters {
  [key: string]: ChapterContent;
}

export const SigwxTheory: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<string>('introduction');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const chapters = [
    { id: 'introduction', name: 'Введение в SIGWX', icon: '📚' },
    { id: 'weather-phenomena', name: 'Погодные явления', icon: '🌪️' },
    { id: 'fronts-systems', name: 'Фронты и системы', icon: '🌡️' },
    { id: 'clouds', name: 'Облака', icon: '☁️' },
    { id: 'charts-types', name: 'Типы карт', icon: '🗺️' },
    { id: 'analysis', name: 'Анализ карт', icon: '🔍' }
  ];

  const theoryContent: TheoryChapters = {
    introduction: {
      title: 'Введение в SIGWX',
      content: [
        {
          type: 'text',
          content: 'SIGWX (Significant Weather Charts) - это карты значительных погодных явлений, используемые в авиации для отображения опасных метеорологических условий.'
        },
        {
          type: 'text',
          content: 'Эти карты разрабатываются в соответствии со стандартами ИКАО (ICAO) и предоставляют пилотам и диспетчерам критически важную информацию о погодных условиях на маршруте полета.'
        },
        {
          type: 'list',
          title: 'Основные цели SIGWX:',
          items: [
            'Предупреждение об опасных погодных явлениях',
            'Обеспечение безопасности полетов',
            'Планирование оптимальных маршрутов',
            'Своевременное принятие решений'
          ]
        },
        {
          type: 'text',
          content: 'Карты SIGWX обновляются регулярно и охватывают различные высотные слои атмосферы.'
        }
      ]
    },
    'weather-phenomena': {
      title: 'Значительные погодные явления',
      content: [
        {
          type: 'text',
          content: 'На картах SIGWX отображаются различные опасные погодные явления, которые могут повлиять на безопасность полетов.'
        },
        {
          type: 'table',
          title: 'Основные погодные явления:',
          headers: ['Явление', 'Символ', 'Описание', 'Опасность'],
          rows: [
            ['Тропический циклон', '●', 'Мощная погодная система с низким давлением', 'Сильная турбулентность, ливни'],
            ['Линия шквалов', '▲', 'Линия грозовых облаков с шквалами', 'Турбулентность, молнии, град'],
            ['Турбулентность', '⌇⌇ / ⌇⌇⌇', 'Умеренная/сильная болтанка', 'Потеря управления, травмы'],
            ['Обледенение', '◐ / ●', 'Умеренное/сильное обледенение', 'Ухудшение аэродинамики'],
            ['Туман', '≡', 'Обширный туман', 'Ухудшение видимости'],
            ['Вулканический пепел', '▲', 'Вулканическое извержение', 'Повреждение двигателей']
          ]
        },
        {
          type: 'warning',
          content: 'Особое внимание уделяется явлениям, требующим дополнительной проверки через SIGNET и NOTAM'
        }
      ]
    },
    'fronts-systems': {
      title: 'Фронты и атмосферные системы',
      content: [
        {
          type: 'text',
          content: 'Атмосферные фронты играют ключевую роль в формировании погодных условий и являются важными элементами на картах SIGWX.'
        },
        {
          type: 'table',
          title: 'Типы фронтов:',
          headers: ['Фронт', 'Символ', 'Описание', 'Погодные явления'],
          rows: [
            ['Холодный фронт', '▲▲▲', 'Холодный воздух вытесняет теплый', 'Кучево-дождевые облака, ливни'],
            ['Теплый фронт', '◯◯◯', 'Теплый воздух надвигается на холодный', 'Слоистые облака, обложные осадки'],
            ['Фронт окклюзии', '▲◯▲◯', 'Смыкание холодного и теплого фронтов', 'Сложные погодные условия'],
            ['Стационарный фронт', '▲◯▲◯', 'Мало подвижный фронт', 'Длительные осадки']
          ]
        },
        {
          type: 'text',
          content: 'Также на картах отображаются струйные течения, тропопауза и зоны конвергенции.'
        }
      ]
    },
    'clouds': {
      title: 'Облака и их классификация',
      content: [
        {
          type: 'text',
          content: 'Облака на картах SIGWX классифицируются по типам, количеству и высоте расположения.'
        },
        {
          type: 'table',
          title: 'Типы облаков:',
          headers: ['Тип', 'Сокращение', 'Высота', 'Характеристики'],
          rows: [
            ['Перистые', 'Ci', 'Высокие (6-13 км)', 'Волокнистые, ледяные кристаллы'],
            ['Кучево-дождевые', 'Cb', 'Развитые по вертикали', 'Грозы, ливни, турбулентность'],
            ['Слоисто-дождевые', 'Ns', 'Средние (2-7 км)', 'Обложные осадки'],
            ['Высоко-кучевые', 'Ac', 'Средние (2-7 км)', 'Волнообразные структуры']
          ]
        },
        {
          type: 'table',
          title: 'Количество облаков:',
          headers: ['Количество', 'Сокращение', 'Покрытие', 'Описание'],
          rows: [
            ['Небольшая', 'FEW', '1/8 - 2/8', 'Отдельные облака'],
            ['Рассеянная', 'SCT', '3/8 - 4/8', 'Разрозненные облака'],
            ['Разорванная', 'BKN', '5/8 - 7/8', 'Сплошной слой с разрывами'],
            ['Сплошная', 'OVC', '8/8', 'Сплошной облачный покров']
          ]
        }
      ]
    },
    'charts-types': {
      title: 'Типы карт SIGWX',
      content: [
        {
          type: 'text',
          content: 'Существует несколько типов карт SIGWX, каждая из которых предназначена для определенных высот и целей.'
        },
        {
          type: 'table',
          title: 'Основные типы карт:',
          headers: ['Тип карты', 'Обозначение', 'Высотный диапазон', 'Назначение'],
          rows: [
            ['Высокоуровневая', 'SWH', 'FL250 - FL630', 'Дальние и высотные полеты'],
            ['Среднеуровневая', 'SWM', 'FL100 - FL450', 'Средние высоты полетов'],
            ['Низкоуровневая', 'SWL', 'SFC - FL100', 'Взлет, посадка, низкие высоты']
          ]
        },
        {
          type: 'list',
          title: 'Элементы карт:',
          items: [
            'Области значительной погоды (волнистые линии)',
            'Струйные течения (жирные линии со стрелками)',
            'Тропопауза (прямоугольники с уровнями)',
            'Фронтальные системы',
            'Центры давления (H/L)'
          ]
        }
      ]
    },
    'analysis': {
      title: 'Анализ и интерпретация карт',
      content: [
        {
          type: 'text',
          content: 'Правильный анализ карт SIGWX позволяет принимать обоснованные решения по планированию полетов.'
        },
        {
          type: 'list',
          title: 'Этапы анализа:',
          items: [
            'Идентификация опасных зон',
            'Оценка интенсивности явлений',
            'Анализ временных характеристик',
            'Прогноз развития ситуации',
            'Планирование обходных маршрутов'
          ]
        },
        {
          type: 'example',
          title: 'Пример анализа:',
          content: 'При обнаружении зоны сильной турбулентности (⌇⌇⌇) на маршруте полета необходимо:\n• Оценить возможность обхода\n• Рассчитать дополнительное время\n• Уведомить диспетчерскую службу\n• Подготовить пассажиров и экипаж'
        },
        {
          type: 'warning',
          content: 'Всегда проверяйте актуальность карт и сопутствующую информацию через NOTAM и SIGMET'
        }
      ]
    }
  };

  const currentContent = theoryContent[activeChapter as keyof typeof theoryContent];

  const renderContent = (content: TheoryContent) => {
    switch (content.type) {
      case 'text':
        return (
          <div style={{
            marginBottom: '20px'
          }}>
            <p style={{
              color: '#e6f1ff',
              fontFamily: 'Exo 2, sans-serif',
              lineHeight: 1.6,
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              margin: 0
            }}>
              {content.content}
            </p>
          </div>
        );
      
      case 'list':
        return (
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{
              color: '#64ffda',
              fontFamily: 'Rajdhani, sans-serif',
              marginBottom: '12px',
              fontSize: 'clamp(1rem, 3vw, 1.1rem)',
              fontWeight: '600'
            }}>
              {content.title}
            </h4>
            <ul style={{
              color: '#e6f1ff',
              fontFamily: 'Exo 2, sans-serif',
              lineHeight: 1.6,
              paddingLeft: '20px',
              margin: 0,
              fontSize: 'clamp(0.9rem, 2vw, 1rem)'
            }}>
              {content.items.map((item: string, index: number) => (
                <li key={index} style={{ marginBottom: '8px' }}>{item}</li>
              ))}
            </ul>
          </div>
        );
      
      case 'table':
        return (
          <div style={{ 
            marginBottom: '20px', 
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}>
            <h4 style={{
              color: '#64ffda',
              fontFamily: 'Rajdhani, sans-serif',
              marginBottom: '15px',
              fontSize: 'clamp(1rem, 3vw, 1.1rem)',
              fontWeight: '600'
            }}>
              {content.title}
            </h4>
            <div style={{
              minWidth: 'min-content',
              background: '#0a192f',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #1a6fc4'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: '500px'
              }}>
                <thead>
                  <tr style={{ background: '#1a6fc4' }}>
                    {content.headers.map((header: string, index: number) => (
                      <th key={index} style={{
                        padding: '12px 10px',
                        textAlign: 'left',
                        color: '#e6f1ff',
                        fontFamily: 'Rajdhani, sans-serif',
                        fontWeight: '600',
                        fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                        whiteSpace: 'nowrap'
                      }}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.rows.map((row: string[], rowIndex: number) => (
                    <tr 
                      key={rowIndex}
                      style={{
                        background: rowIndex % 2 === 0 ? '#112240' : '#0a192f',
                        borderBottom: '1px solid #1a6fc4'
                      }}
                    >
                      {row.map((cell: string, cellIndex: number) => (
                        <td key={cellIndex} style={{
                          padding: '10px',
                          color: '#e6f1ff',
                          fontFamily: 'Exo 2, sans-serif',
                          fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                          lineHeight: 1.4,
                          borderRight: '1px solid #1a6fc4',
                          wordBreak: 'break-word'
                        }}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'warning':
        return (
          <div style={{
            background: 'rgba(255, 107, 107, 0.1)',
            border: '1px solid #ff6b6b',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '20px'
          }}>
            <div style={{
              color: '#ff6b6b',
              fontFamily: 'Exo 2, sans-serif',
              fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
              lineHeight: 1.5,
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px'
            }}>
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>⚠️</span>
              <span>{content.content}</span>
            </div>
          </div>
        );
      
      case 'example':
        return (
          <div style={{
            background: 'rgba(100, 255, 218, 0.1)',
            border: '1px solid #64ffda',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '20px'
          }}>
            <h4 style={{
              color: '#64ffda',
              fontFamily: 'Rajdhani, sans-serif',
              marginBottom: '10px',
              fontSize: 'clamp(1rem, 3vw, 1.1rem)',
              fontWeight: '600'
            }}>
              {content.title}
            </h4>
            <div style={{
              color: '#e6f1ff',
              fontFamily: 'Exo 2, sans-serif',
              fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
              lineHeight: 1.5,
              whiteSpace: 'pre-line'
            }}>
              {content.content}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const currentChapterIndex = chapters.findIndex(ch => ch.id === activeChapter);

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto',
      padding: '0 15px'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#64ffda',
        fontFamily: 'Rajdhani, sans-serif',
        marginBottom: '30px',
        fontSize: 'clamp(1.5rem, 4vw, 2rem)'
      }}>
        📚 Теоретический раздел
      </h2>

      {/* Мобильное меню для маленьких экранов */}
      <div style={{
        display: 'block',
        marginBottom: '20px'
      }}>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: '#1a6fc4',
            color: '#e6f1ff',
            border: 'none',
            padding: '14px 20px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontFamily: 'Exo 2, sans-serif',
            width: '100%',
            fontSize: 'clamp(0.95rem, 2vw, 1rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontWeight: '500'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.2rem' }}>
              {chapters.find(ch => ch.id === activeChapter)?.icon}
            </span>
            {chapters.find(ch => ch.id === activeChapter)?.name}
          </span>
          <span style={{ fontSize: '1rem' }}>{isMobileMenuOpen ? '▲' : '▼'}</span>
        </button>
        
        {isMobileMenuOpen && (
          <div style={{
            background: '#112240',
            borderRadius: '10px',
            marginTop: '10px',
            border: '1px solid #1a6fc4',
            overflow: 'hidden'
          }}>
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => {
                  setActiveChapter(chapter.id);
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  background: activeChapter === chapter.id ? '#64ffda' : 'transparent',
                  color: activeChapter === chapter.id ? '#0a192f' : '#e6f1ff',
                  border: 'none',
                  padding: '14px 16px',
                  width: '100%',
                  cursor: 'pointer',
                  fontFamily: 'Exo 2, sans-serif',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: 'clamp(0.9rem, 2vw, 0.95rem)',
                  borderBottom: '1px solid #1a6fc4',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{chapter.icon}</span>
                {chapter.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Основной контент */}
      <div style={{
        background: '#112240',
        borderRadius: '12px',
        padding: 'clamp(20px, 4vw, 30px)',
        border: '1px solid #1a6fc4'
      }}>
        <h3 style={{
          color: '#64ffda',
          fontFamily: 'Rajdhani, sans-serif',
          marginBottom: '25px',
          fontSize: 'clamp(1.3rem, 4vw, 1.5rem)',
          borderBottom: '2px solid #1a6fc4',
          paddingBottom: '12px',
          fontWeight: '600'
        }}>
          {currentContent.title}
        </h3>

        <div>
          {currentContent.content.map((section: TheoryContent, index: number) => (
            <div key={index}>
              {renderContent(section)}
            </div>
          ))}
        </div>

        {/* Навигация между главами */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #1a6fc4',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => {
              if (currentChapterIndex > 0) {
                setActiveChapter(chapters[currentChapterIndex - 1].id);
              }
            }}
            disabled={currentChapterIndex === 0}
            style={{
              background: currentChapterIndex === 0 ? '#8892b0' : '#1a6fc4',
              color: '#e6f1ff',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '8px',
              cursor: currentChapterIndex === 0 ? 'not-allowed' : 'pointer',
              fontFamily: 'Exo 2, sans-serif',
              fontSize: 'clamp(0.85rem, 2vw, 0.9rem)',
              flex: '1 1 140px',
              minWidth: '140px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            ← Предыдущая глава
          </button>

          <button
            onClick={() => {
              if (currentChapterIndex < chapters.length - 1) {
                setActiveChapter(chapters[currentChapterIndex + 1].id);
              }
            }}
            disabled={currentChapterIndex === chapters.length - 1}
            style={{
              background: currentChapterIndex === chapters.length - 1 ? '#8892b0' : '#1a6fc4',
              color: '#e6f1ff',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '8px',
              cursor: currentChapterIndex === chapters.length - 1 ? 'not-allowed' : 'pointer',
              fontFamily: 'Exo 2, sans-serif',
              fontSize: 'clamp(0.85rem, 2vw, 0.9rem)',
              flex: '1 1 140px',
              minWidth: '140px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            Следующая глава →
          </button>
        </div>
      </div>
    </div>
  );
};