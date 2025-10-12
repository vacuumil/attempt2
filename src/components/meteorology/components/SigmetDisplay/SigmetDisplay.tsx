// src/components/meteorology/components/SigmetDisplay/SigmetDisplay.tsx
import React, { useState } from 'react';
import type { SigmetData } from '../../utils/sigmetParser';
import {
  SigmetContainer,
  EducationalSection,
  EducationalContent,
  ExampleCard,
  HazardMatrix,
  CodeExample,
  InteractiveExample
} from './SigmetDisplay.styles';

interface SigmetDisplayProps {
  sigmetData: SigmetData[];
  icaoCode: string;
}

// Типы для образовательного контента
interface HazardItem {
  phenomenon: string;
  code: string;
  severity: string;
  altitude: string;
}

export const SigmetDisplay: React.FC<SigmetDisplayProps> = ({ sigmetData, icaoCode }) => {
  const [activeExample, setActiveExample] = useState<string>('basic');

  // Основной образовательный контент
  const sigmetContent = {
    definition: {
      title: "📖 Что такое SIGMET?",
      content: `SIGMET (Significant Meteorological Information) — информация о значительных метеорологических явлениях, 
              которые могут представлять опасность для всех типов воздушных судов.`
    },
    types: {
      title: "🎯 Типы SIGMET",
      items: [
        "• **Конвективные** — грозы, град, турбулентность",
        "• **Неконвективные** — обледенение, горные волны, пыльные бури",
        "• **Вулканические** — вулканический пепел",
        "• **Тропические** — тропические циклоны"
      ]
    },
    hazards: {
      title: "⚠️ Опасные явления в SIGMET",
      matrix: [
        { phenomenon: "Грозы", code: "TS", severity: "Высокая", altitude: "Все уровни" },
        { phenomenon: "Сильная турбулентность", code: "SEV TURB", severity: "Высокая", altitude: "Выше FL100" },
        { phenomenon: "Сильное обледенение", code: "SEV ICE", severity: "Высокая", altitude: "Облака/осадки" },
        { phenomenon: "Горные волны", code: "MTW", severity: "Средняя", altitude: "Приземные-средние" },
        { phenomenon: "Пыльные/песчаные бури", code: "DS/SS", severity: "Средняя", altitude: "Приземные" }
      ] as HazardItem[]
    }
  };

  const formatExamples = [
    {
      title: "📋 Базовый формат SIGMET",
      code: `SIGMET A123 UUWW 1200/1400
UUWW TS INTSF AREA N5000 E03700 
FL250-FL350 MOV NE 25015KT`,
      explanation: [
        "• **SIGMET A123** — тип и идентификатор",
        "• **UUWW 1200/1400** — FIR регион и период действия",
        "• **TS INTSF** — явление (грозы) интенсивность (усиливающиеся)",
        "• **AREA N5000 E03700** — географическая область",
        "• **FL250-FL350** — высоты (25000-35000 ft)",
        "• **MOV NE 25015KT** — движение на северо-восток 15 узлов"
      ]
    },
    {
      title: "🧊 Пример с обледенением",
      code: `SIGMET B456 UUEE 1400/1600
UUEE SEV ICE FCST N5500 E03800 
FL150-FL280 OBS AT 1330Z`,
      explanation: [
        "• **SEV ICE** — сильное обледенение",
        "• **FCST** — прогнозируемое явление",
        "• **OBS AT 1330Z** — время наблюдения"
      ]
    }
  ];

  const renderHazardMatrix = () => (
    <HazardMatrix>
      <thead>
        <tr>
          <th>Явление</th>
          <th>Код</th>
          <th>Опасность</th>
          <th>Высоты</th>
        </tr>
      </thead>
      <tbody>
        {sigmetContent.hazards.matrix.map((hazard, index) => (
          <tr key={index}>
            <td>{hazard.phenomenon}</td>
            <td><code>{hazard.code}</code></td>
            <td>
              <span style={{ 
                color: hazard.severity === 'Высокая' ? '#ff6b6b' : '#ffd700',
                fontWeight: 'bold'
              }}>
                {hazard.severity}
              </span>
            </td>
            <td>{hazard.altitude}</td>
          </tr>
        ))}
      </tbody>
    </HazardMatrix>
  );

  const renderInteractiveExample = () => (
    <InteractiveExample>
      <h4>🎮 Интерактивный разбор SIGMET</h4>
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        {formatExamples.map((example, index) => (
          <button
            key={index}
            onClick={() => setActiveExample(example.title)}
            style={{
              padding: '10px 15px',
              background: activeExample === example.title ? '#64ffda' : 'rgba(100, 255, 218, 0.1)',
              color: activeExample === example.title ? '#0a192f' : '#64ffda',
              border: '1px solid #64ffda',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {example.title}
          </button>
        ))}
      </div>
      
      {formatExamples.map((example, index) => (
        activeExample === example.title && (
          <div key={index}>
            <CodeExample>
              {example.code}
            </CodeExample>
            <div style={{ marginTop: '15px' }}>
              {example.explanation.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '8px', color: '#e6f1ff' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </InteractiveExample>
  );

  return (
    <SigmetContainer>
      <EducationalSection>
        <EducationalContent>
          {/* Заголовок */}
          <h2 style={{ 
            color: '#64ffda', 
            textAlign: 'center',
            marginBottom: '30px',
            fontSize: '2rem'
          }}>
            ⚠️ SIGMET - Информация об опасных метеоявлениях
          </h2>

          {/* Основная информация */}
          <ExampleCard>
            <h3>{sigmetContent.definition.title}</h3>
            <p>{sigmetContent.definition.content}</p>
          </ExampleCard>

          {/* Типы SIGMET */}
          <ExampleCard>
            <h3>{sigmetContent.types.title}</h3>
            {sigmetContent.types.items.map((item, index) => (
              <div key={index} style={{ marginBottom: '8px', color: '#e6f1ff' }}>
                {item}
              </div>
            ))}
          </ExampleCard>

          {/* Матрица опасностей */}
          <ExampleCard>
            <h3>{sigmetContent.hazards.title}</h3>
            {renderHazardMatrix()}
          </ExampleCard>

          {/* Интерактивные примеры */}
          {renderInteractiveExample()}

          {/* Действия пилота */}
          <ExampleCard>
            <h3>🛡️ Действия пилота при получении SIGMET</h3>
            <div style={{ lineHeight: '1.6' }}>
              <div style={{ marginBottom: '15px' }}>
                <strong>1. Оценка маршрута:</strong>
                <div style={{ marginLeft: '20px', color: '#8892b0' }}>
                  • Изменение высоты полета<br/>
                  • Обход опасной зоны<br/>
                  • Возврат в аэропорт вылета
                </div>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <strong>2. Подготовка ВС:</strong>
                <div style={{ marginLeft: '20px', color: '#8892b0' }}>
                  • Включение противообледенительной системы<br/>
                  • Пристегнуть пассажиров<br/>
                  • Убрать трей
                </div>
              </div>
              
              <div>
                <strong>3. Коммуникация:</strong>
                <div style={{ marginLeft: '20px', color: '#8892b0' }}>
                  • Уведомление УВД<br/>
                  • Запрос нового разрешения<br/>
                  • Информирование пассажиров
                </div>
              </div>
            </div>
          </ExampleCard>

          {/* Источники информации */}
          <ExampleCard>
            <h3>📡 Источники получения SIGMET</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              <div style={{ padding: '15px', background: 'rgba(26, 111, 196, 0.1)', borderRadius: '6px' }}>
                <strong>Бортовые системы:</strong>
                <div style={{ color: '#8892b0', fontSize: '0.9rem', marginTop: '5px' }}>
                  • ACARS<br/>
                  • ATIS<br/>
                  • Бортовой радар
                </div>
              </div>
              
              <div style={{ padding: '15px', background: 'rgba(100, 255, 218, 0.1)', borderRadius: '6px' }}>
                <strong>Наземные источники:</strong>
                <div style={{ color: '#8892b0', fontSize: '0.9rem', marginTop: '5px' }}>
                  • Диспетчер УВД<br/>
                  • Метеослужба аэропорта<br/>
                  • NOTAM
                </div>
              </div>
              
              <div style={{ padding: '15px', background: 'rgba(255, 107, 107, 0.1)', borderRadius: '6px' }}>
                <strong>Электронные системы:</strong>
                <div style={{ color: '#8892b0', fontSize: '0.9rem', marginTop: '5px' }}>
                  • AeroTrainer<br/>
                  • Aviation Weather App<br/>
                  • EFB приложения
                </div>
              </div>
            </div>
          </ExampleCard>

        </EducationalContent>
      </EducationalSection>

      {/* Если есть реальные данные SIGMET, показываем их отдельно */}
      {sigmetData && sigmetData.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ color: '#ff6b6b', textAlign: 'center' }}>
            🚨 Активные SIGMET для региона {icaoCode}
          </h3>
          <div style={{ 
            padding: '20px', 
            background: 'rgba(255, 107, 107, 0.1)',
            border: '1px solid #ff6b6b',
            borderRadius: '8px',
            marginTop: '15px'
          }}>
            {sigmetData.map((sigmet, index) => (
              <div key={index} style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid rgba(255,107,107,0.3)' }}>
                <div style={{ fontFamily: 'Share Tech Mono, monospace', color: '#ff6b6b' }}>
                  {sigmet.raw}
                </div>
                <div style={{ color: '#e6f1ff', fontSize: '0.9rem', marginTop: '5px' }}>
                  Действует: {sigmet.validity.from} - {sigmet.validity.to}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </SigmetContainer>
  );
};