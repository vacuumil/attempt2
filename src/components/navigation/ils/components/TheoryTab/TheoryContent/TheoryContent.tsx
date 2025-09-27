import React, { useState } from 'react';
import { 
  ContentFlow,
  Chapter,
  ChapterHeader,
  ChapterTitle,
  ChapterSubtitle,
  ContentSection,
  TextBlock,
  InteractiveIllustration,
  IllustrationContainer,
  IllustrationCaption,
  KeyConcept,
  ConceptGrid,
  ConceptItem,
  NavigationDots,
  Dot
} from './TheoryContent.styles';

export const TheoryContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { title: "Основы ILS", subtitle: "Что это и зачем нужно", color: "#64ffda" },
    { title: "Компоненты системы", subtitle: "Как устроена ILS", color: "#1a6fc4" },
    { title: "Приборная панель", subtitle: "Как читать показания", color: "#ff6b6b" },
    { title: "Процедура захода", subtitle: "Шаг за шагом", color: "#ffd166" }
  ];

  return (
    <ContentFlow>
      {/* Навигация точками */}
      <NavigationDots>
        {sections.map((_, index) => (
          <Dot 
            key={index}
            $active={activeSection === index}
            $color={sections[index].color}
            onClick={() => setActiveSection(index)}
          />
        ))}
      </NavigationDots>

      {/* Глава 1: Основы ILS */}
      <Chapter $active={activeSection === 0}>
        <ChapterHeader>
          <ChapterTitle $color={sections[0].color}>
            📡 Instrument Landing System
          </ChapterTitle>
          <ChapterSubtitle>
            Точная посадка в любых условиях
          </ChapterSubtitle>
        </ChapterHeader>

        <ContentSection>
          <TextBlock>
            <p>
              <strong>ILS</strong> — это радионавигационная система, которая направляет самолет 
              точно на ось взлетно-посадочной полосы при заходе на посадку в условиях плохой видимости.
            </p>
            
            <KeyConcept $color={sections[0].color}>
              <span>🎯</span>
              <div>
                <strong>Основная задача</strong>
                <p>Обеспечить безопасную посадку при видимости от 200 метров</p>
              </div>
            </KeyConcept>
          </TextBlock>

          <InteractiveIllustration>
            <IllustrationContainer>
              <div className="ils-visual">
                <div className="runway"></div>
                <div className="localizer-beam"></div>
                <div className="glidepath-beam"></div>
                <div className="aircraft"></div>
              </div>
              <IllustrationCaption>
                Схема работы ILS: курсовой и глиссадный лучи направляют самолет к ВПП
              </IllustrationCaption>
            </IllustrationContainer>
          </InteractiveIllustration>
        </ContentSection>
      </Chapter>

      {/* Глава 2: Компоненты системы */}
      <Chapter $active={activeSection === 1}>
        <ChapterHeader>
          <ChapterTitle $color={sections[1].color}>
            🔧 Три ключевых компонента
          </ChapterTitle>
        </ChapterHeader>

        <ConceptGrid>
          <ConceptItem $color="#64ffda">
            <div className="concept-icon">🏁</div>
            <h4>Курсовой маяк</h4>
            <p>Localizer</p>
            <div className="concept-details">
              <span>108.10-111.95 МГц</span>
              <span>±0.5° точность</span>
            </div>
          </ConceptItem>

          <ConceptItem $color="#1a6fc4">
            <div className="concept-icon">📐</div>
            <h4>Глиссадный маяк</h4>
            <p>Glide Path</p>
            <div className="concept-details">
              <span>329.15-335.00 МГц</span>
              <span>3.0° угол</span>
            </div>
          </ConceptItem>

          <ConceptItem $color="#ff6b6b">
            <div className="concept-icon">📍</div>
            <h4>Маркерные маяки</h4>
            <p>Marker Beacons</p>
            <div className="concept-details">
              <span>75 МГц</span>
              <span>Контрольные точки</span>
            </div>
          </ConceptItem>
        </ConceptGrid>
      </Chapter>

      {/* Остальные главы... */}
    </ContentFlow>
  );
};