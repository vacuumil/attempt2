// src/components/meteorology/components/PirepDisplay/PirepDisplay.tsx
import React, { useState } from 'react';
import {
  EducationalSection,
  EducationalContent,
  ExampleCard,
  CodeExample,
  InteractiveExample,
  PirepForm
} from './PirepDisplay.styles';

interface PirepDisplayProps {
  icaoCode: string;
}

// Типы для кодов PIREP
interface PirepCodeItem {
  code: string;
  meaning: string;
  description?: string;
}

interface PirepIntensityCode extends PirepCodeItem {
  description: string;
}

// Убрали пустой интерфейс и используем базовый тип
type PirepPhenomenonCode = PirepCodeItem;

interface PirepExample {
  title: string;
  code: string;
  decoding: string[];
}

interface PirepContentSection {
  title: string;
  content?: string;
  items?: string[];
}

export const PirepDisplay: React.FC<PirepDisplayProps> = ({ icaoCode }) => {
  const [activeSection, setActiveSection] = useState<string>('definition');
  const [simulatedPirep, setSimulatedPirep] = useState<string>('');

  // Образовательный контент PIREP с правильной типизацией
  const pirepContent: Record<string, PirepContentSection> = {
    definition: {
      title: "✈️ Что такое PIREP?",
      content: `PIREP (Pilot Report) — добровольный отчет пилота о фактических погодных условиях, 
              полученный в ходе полета. Эти отчеты критически важны для других пилотов и метеослужб.`
    },
    importance: {
      title: "🎯 Значение PIREP",
      items: [
        "• **Подтверждение прогнозов** — проверка точности TAF и других прогнозов",
        "• **Оповещение об опасностях** — реальные данные о турбулентности, обледенении",
        "• **Поддержка УВД** — помощь в управлении воздушным движением",
        "• **Безопасность полетов** — предотвращение инцидентов"
      ]
    },
    types: {
      title: "📊 Типы PIREP",
      items: [
        "• **UA** — обычный отчет (Urgent Aircraft)",
        "• **UUA** — срочный отчет (Urgent Urgent Aircraft)",
        "• **Обычные** — стандартные наблюдения",
        "• **Срочные** — опасные явления, требующие немедленного внимания"
      ]
    }
  };

  const pirepExamples: PirepExample[] = [
    {
      title: "🧊 Отчет об обледенении",
      code: `UA/OV KOKC-KTUL/TM 1450/FL080/TP BE20/IC MOD RIME 065-075`,
      decoding: [
        "• **UA** — обычный отчет пилота",
        "• **OV KOKC-KTUL** — между Oklahoma City и Tulsa",
        "• **TM 1450** — время 14:50 UTC",
        "• **FL080** — высота 8000 ft",
        "• **TP BE20** — тип ВС Beechcraft 200",
        "• **IC MOD RIME** — умеренное обледенение типа иней",
        "• **065-075** — между 6500 и 7500 ft"
      ]
    },
    {
      title: "💨 Отчет о турбулентности",
      code: `UUA/OV ORD/TM 1522/FL310/TP B738/TB MOD CAT 300-310`,
      decoding: [
        "• **UUA** — срочный отчет пилота",
        "• **OV ORD** — в районе Chicago O'Hare",
        "• **TM 1522** — время 15:22 UTC",
        "• **FL310** — высота 31000 ft",
        "• **TP B738** — тип ВС Boeing 737-800",
        "• **TB MOD CAT** — умеренная турбулентность в ясном небе",
        "• **300-310** — между FL300 и FL310"
      ]
    }
  ];

  const pirepCodes = {
    intensity: [
      { code: "NEG", meaning: "Отсутствует", description: "Явление не наблюдается" },
      { code: "TRACE", meaning: "Следы", description: "Едва заметное явление" },
      { code: "LGT", meaning: "Слабое", description: "Легкое, не влияющее на полет" },
      { code: "MOD", meaning: "Умеренное", description: "Заметное, требует внимания" },
      { code: "SEV", meaning: "Сильное", description: "Опасное, требует уклонения" }
    ] as PirepIntensityCode[],
    phenomena: [
      { code: "TB", meaning: "Турбулентность" },
      { code: "IC", meaning: "Обледенение" },
      { code: "CAT", meaning: "Турбулентность в ясном небе" },
      { code: "MTW", meaning: "Горные волны" },
      { code: "VA", meaning: "Вулканический пепел" }
    ] as PirepPhenomenonCode[]
  };

  const simulatePirep = () => {
    const examples = [
      `UA/OV ${icaoCode}/TM 1430/FL120/TP A320/TB LGT 110-130/WX FV03SM RA/BKN030`,
      `UUA/OV ${icaoCode}/TM 1515/FL085/TP B737/SEV ICE 075-095/SKY OVC020`,
      `UA/OV ${icaoCode}/TM 1620/FL330/TP A321/TB MOD CAT 320-340`
    ];
    setSimulatedPirep(examples[Math.floor(Math.random() * examples.length)]);
  };

  const renderPirepForm = () => (
    <PirepForm>
      <h4>📝 Тренажер составления PIREP</h4>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={simulatePirep}
          style={{
            padding: '10px 20px',
            background: '#64ffda',
            color: '#0a192f',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🎮 Сгенерировать пример PIREP для {icaoCode}
        </button>
      </div>
      
      {simulatedPirep && (
        <div>
          <CodeExample>
            {simulatedPirep}
          </CodeExample>
          <div style={{ marginTop: '15px', color: '#64ffda' }}>
            <strong>Попробуйте расшифровать этот отчет!</strong>
          </div>
        </div>
      )}
    </PirepForm>
  );

  const renderCodeTable = (title: string, codes: PirepCodeItem[]) => (
    <div style={{ marginBottom: '25px' }}>
      <h4>{title}</h4>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '10px' 
      }}>
        {codes.map((item, index) => (
          <div key={index} style={{ 
            padding: '12px', 
            background: 'rgba(26, 111, 196, 0.1)',
            border: '1px solid #1a6fc4',
            borderRadius: '6px'
          }}>
            <div style={{ color: '#64ffda', fontWeight: 'bold' }}>{item.code}</div>
            <div style={{ color: '#e6f1ff' }}>{item.meaning}</div>
            {item.description && (
              <div style={{ color: '#8892b0', fontSize: '0.8rem', marginTop: '5px' }}>
                {item.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderActiveSectionContent = () => {
    const section = pirepContent[activeSection];
    
    switch (activeSection) {
      case 'definition':
        return <p>{section.content}</p>;
        
      case 'importance':
      case 'types':
        return (
          <div>
            {section.items?.map((item, index) => (
              <div key={index} style={{ marginBottom: '10px', color: '#e6f1ff' }}>
                {item}
              </div>
            ))}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <EducationalSection>
      <EducationalContent>
        {/* Заголовок */}
        <h2 style={{ 
          color: '#64ffda', 
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '2rem'
        }}>
          ✈️ PIREP - Отчеты пилотов о погодных условиях
        </h2>

        {/* Информация о текущем аэропорте */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '20px',
          padding: '15px',
          background: 'rgba(100, 255, 218, 0.1)',
          borderRadius: '8px',
          border: '1px solid #64ffda'
        }}>
          <h4 style={{ color: '#64ffda', margin: 0 }}>
            📍 Текущий аэропорт: <strong>{icaoCode}</strong>
          </h4>
          <p style={{ color: '#8892b0', margin: '5px 0 0 0', fontSize: '0.9rem' }}>
            Все примеры адаптированы для региона {icaoCode}
          </p>
        </div>

        {/* Навигация по разделам */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '30px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {Object.entries(pirepContent).map(([key, section]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              style={{
                padding: '10px 15px',
                background: activeSection === key ? '#64ffda' : 'rgba(100, 255, 218, 0.1)',
                color: activeSection === key ? '#0a192f' : '#64ffda',
                border: '1px solid #64ffda',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Основной контент */}
        <ExampleCard>
          <h3>{pirepContent[activeSection].title}</h3>
          {renderActiveSectionContent()}
        </ExampleCard>

        {/* Коды и интенсивности */}
        <ExampleCard>
          <h3>📋 Коды и интенсивности в PIREP</h3>
          {renderCodeTable("Интенсивность явлений", pirepCodes.intensity)}
          {renderCodeTable("Погодные явления", pirepCodes.phenomena)}
        </ExampleCard>

        {/* Примеры отчетов */}
        <ExampleCard>
          <h3>📖 Примеры расшифровки PIREP</h3>
          {pirepExamples.map((example, index) => (
            <div key={index} style={{ marginBottom: '25px' }}>
              <h4 style={{ color: '#ffd700' }}>{example.title}</h4>
              <CodeExample>{example.code}</CodeExample>
              <div style={{ marginTop: '15px' }}>
                {example.decoding.map((item, idx) => (
                  <div key={idx} style={{ marginBottom: '8px', color: '#e6f1ff' }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </ExampleCard>

        {/* Интерактивный тренажер */}
        <InteractiveExample>
          <h3>🎮 Тренажер работы с PIREP</h3>
          {renderPirepForm()}
          
          <div style={{ marginTop: '25px' }}>
            <h4>📋 Процедура передачи PIREP</h4>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '15px' 
            }}>
              <div style={{ padding: '15px', background: 'rgba(26, 111, 196, 0.1)', borderRadius: '6px' }}>
                <strong>1. Обнаружение</strong>
                <div style={{ color: '#8892b0', fontSize: '0.9rem', marginTop: '5px' }}>
                  • Идентификация явления<br/>
                  • Оценка интенсивности<br/>
                  • Запись параметров
                </div>
              </div>
              
              <div style={{ padding: '15px', background: 'rgba(100, 255, 218, 0.1)', borderRadius: '6px' }}>
                <strong>2. Подготовка</strong>
                <div style={{ color: '#8892b0', fontSize: '0.9rem', marginTop: '5px' }}>
                  • Формирование отчета<br/>
                  • Проверка точности<br/>
                  • Выбор приоритета
                </div>
              </div>
              
              <div style={{ padding: '15px', background: 'rgba(255, 107, 107, 0.1)', borderRadius: '6px' }}>
                <strong>3. Передача</strong>
                <div style={{ color: '#8892b0', fontSize: '0.9rem', marginTop: '5px' }}>
                  • Связь с УВД<br/>
                  • Четкая дикция<br/>
                  • Подтверждение приема
                </div>
              </div>
            </div>
          </div>
        </InteractiveExample>

        {/* Лучшие практики */}
        <ExampleCard>
          <h3>🏆 Лучшие практики составления PIREP</h3>
          <div style={{ lineHeight: '1.6' }}>
            <div style={{ marginBottom: '15px' }}>
              <strong>✅ Что делать:</strong>
              <div style={{ marginLeft: '20px', color: '#64ffda' }}>
                • Сообщать точное время и местоположение<br/>
                • Указывать тип воздушного судна<br/>
                • Описывать интенсивность явления<br/>
                • Использовать стандартные коды
              </div>
            </div>
            
            <div>
              <strong>❌ Чего избегать:</strong>
              <div style={{ marginLeft: '20px', color: '#ff6b6b' }}>
                • Субъективных оценок ("очень сильная")<br/>
                • Нестандартных сокращений<br/>
                • Неточных координат<br/>
                • Задержки в передаче срочных отчетов
              </div>
            </div>
          </div>
        </ExampleCard>

      </EducationalContent>
    </EducationalSection>
  );
};