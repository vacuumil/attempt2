import React, { useState } from 'react';
import './InteractiveIndicator.css';

interface InteractiveIndicatorProps {
  type: 'cdi' | 'hsi';
}

export const InteractiveIndicator: React.FC<InteractiveIndicatorProps> = ({ type }) => {
  const [activeElement, setActiveElement] = useState<string | null>(null);

  const elements = {
    cdi: [
      { id: 'needle', label: 'Стрелка CDI', description: 'Показывает отклонение от курса' },
      { id: 'to-from', label: 'Индикатор TO/FROM', description: 'Указывает направление к/от станции' },
      { id: 'obs-knob', label: 'Ручка OBS', description: 'Для выбора курса' },
      { id: 'frequency', label: 'Окно частоты', description: 'Настройка частоты VOR-станции' }
    ],
    hsi: [
      { id: 'compass-card', label: 'Картушка курса', description: 'Вращающаяся шкала курсов' },
      { id: 'heading-bug', label: 'Маркер курса', description: 'Устанавливает желаемый курс' },
      { id: 'deviation-bar', label: 'Брус отклонения', description: 'Показывает положение относительно луча' }
    ]
  };

  return (
    <div className="interactive-indicator">
      <div className="indicator-visual">
        <div className={`indicator-image indicator-${type}`}>
          {elements[type].map((element) => (
            <div
              key={element.id}
              className={`indicator-part ${activeElement === element.id ? 'active' : ''}`}
              data-part={element.id}
              onMouseEnter={() => setActiveElement(element.id)}
              onMouseLeave={() => setActiveElement(null)}
            />
          ))}
        </div>
      </div>
      
      <div className="indicator-info">
        {activeElement && (
          <div className="element-tooltip">
            <h4>{elements[type].find(e => e.id === activeElement)?.label}</h4>
            <p>{elements[type].find(e => e.id === activeElement)?.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};