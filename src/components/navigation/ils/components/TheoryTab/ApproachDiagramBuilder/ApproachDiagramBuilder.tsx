import React, { useState } from 'react';
import { 
  BuilderContainer, 
  BuilderTitle,
  InteractiveDemo,
  DemoSection,
  SectionTitle,
  ControlPanel,
  Visualization,
  PFDDisplay,
  LocalizerDisplay,
  GlideSlopeDisplay,
  WindEffect,
  Instruction,
  DeviationInfo
} from './ApproachDiagramBuilder.styles';

export const ApproachDiagramBuilder: React.FC = () => {
  const [localizerDeviation, setLocalizerDeviation] = useState(0); // -2 to 2 dots
  const [glideSlopeDeviation, setGlideSlopeDeviation] = useState(0); // -2 to 2 dots
  const [windDirection, setWindDirection] = useState(0); // degrees
  const [windSpeed, setWindSpeed] = useState(0); // knots

  // Расчет угла сноса (упрощенный)
  const calculateWindCorrection = () => {
    if (windSpeed === 0) return 0;
    // Упрощенный расчет: 1° сноса на каждые 10 узлов бокового ветра
    const crosswind = windSpeed * Math.sin(windDirection * Math.PI / 180);
    return Math.round((crosswind / 10) * 10) / 10;
  };

  const windCorrectionAngle = calculateWindCorrection();

  // Правильные описания отклонений
  const getLocalizerInstruction = (deviation: number): string => {
    if (deviation === 0) return "✅ Идеально на курсе";
    if (deviation > 0) return `➡️ Ромбик справа: самолет слева от курса, поверните направо на ${deviation * 1.5}°`;
    return `⬅️ Ромбик слева: самолет справа от курса, поверните налево на ${Math.abs(deviation) * 1.5}°`;
  };

  const getGlideSlopeInstruction = (deviation: number): string => {
    if (deviation === 0) return "✅ Идеально на глиссаде";
    if (deviation > 0) return `⬇️ Ромбик снизу: самолет выше глиссады, увеличьте вертикальную скорость`;
    return `⬆️ Ромбик сверху: самолет ниже глиссады, уменьшите вертикальную скорость`;
  };

  const getWindInstruction = (direction: number, speed: number): string => {
    if (speed === 0) return "✅ Ветра нет";
    
    const directions = ['северный', 'северо-восточный', 'восточный', 'юго-восточный', 
                       'южный', 'юго-западный', 'западный', 'северо-западный'];
    const dirIndex = Math.round(direction / 45) % 8;
    
    return `💨 Ветер ${directions[dirIndex]} ${speed} узлов, угол сноса: ${windCorrectionAngle}°`;
  };

  return (
    <BuilderContainer>
      <BuilderTitle>🎮 Интерактивный демонстратор ILS</BuilderTitle>
      
      <InteractiveDemo>
        {/* Левая панель - управление */}
        <DemoSection>
          <SectionTitle>🎯 Управление параметрами</SectionTitle>
          
          <ControlPanel>
            <div>
              <label>Отклонение от курса: {localizerDeviation.toFixed(1)} точек</label>
              <input 
                type="range" 
                min="-2" 
                max="2" 
                step="0.1"
                value={localizerDeviation}
                onChange={(e) => setLocalizerDeviation(parseFloat(e.target.value))}
              />
              <Instruction>
                {getLocalizerInstruction(localizerDeviation)}
              </Instruction>
            </div>

            <div>
              <label>Отклонение от глиссады: {glideSlopeDeviation.toFixed(1)} точек</label>
              <input 
                type="range" 
                min="-2" 
                max="2" 
                step="0.1"
                value={glideSlopeDeviation}
                onChange={(e) => setGlideSlopeDeviation(parseFloat(e.target.value))}
              />
              <Instruction>
                {getGlideSlopeInstruction(glideSlopeDeviation)}
              </Instruction>
            </div>

            <div>
              <label>Направление ветра: {windDirection}°</label>
              <input 
                type="range" 
                min="0" 
                max="359" 
                step="1"
                value={windDirection}
                onChange={(e) => setWindDirection(parseInt(e.target.value))}
              />
            </div>

            <div>
              <label>Скорость ветра: {windSpeed} узлов</label>
              <input 
                type="range" 
                min="0" 
                max="30" 
                step="1"
                value={windSpeed}
                onChange={(e) => setWindSpeed(parseInt(e.target.value))}
              />
              <Instruction>
                {getWindInstruction(windDirection, windSpeed)}
              </Instruction>
            </div>
          </ControlPanel>

          <DeviationInfo>
            <h4>📊 Расшифровка отклонений:</h4>
            <ul>
              <li><strong>1 точка отклонения</strong> ≈ 1.0° от курса / 0.35° от глиссады</li>
              <li><strong>Полное отклонение (2 точки)</strong> ≈ 2.5° от курса / 0.7° от глиссады</li>
              <li><strong>Ромбик показывает положение ВПП относительно самолета</strong></li>
              <li><strong>Правило:</strong> "Лети к ромбику, а не от него"</li>
            </ul>
          </DeviationInfo>
        </DemoSection>

        {/* Правая панель - PFD */}
        <DemoSection>
          <SectionTitle>📊 Приборная панель (PFD)</SectionTitle>
          
          <Visualization>
            <PFDDisplay>
              {/* Основной дисплей PFD */}
              <div className="pfd-background">
                
                {/* Localizer Scale - горизонтальная */}
                <LocalizerDisplay $deviation={localizerDeviation}>
                  <div className="scale-horizontal">
                    <div className="dots">
                      {[-2, -1, 0, 1, 2].map(pos => (
                        <div key={pos} className={`dot ${pos === 0 ? 'center' : ''}`}></div>
                      ))}
                    </div>
                    <div className="diamond" style={{ left: `calc(50% + ${localizerDeviation * 20}px)` }}>
                      <div className="diamond-shape"></div>
                    </div>
                    <div className="center-line"></div>
                  </div>
                  <div className="label">LOC</div>
                </LocalizerDisplay>

                {/* Glide Slope Scale - вертикальная */}
                <GlideSlopeDisplay $deviation={glideSlopeDeviation}>
                  <div className="scale-vertical">
                    <div className="dots">
                      {[-2, -1, 0, 1, 2].map(pos => (
                        <div key={pos} className={`dot ${pos === 0 ? 'center' : ''}`}></div>
                      ))}
                    </div>
                    <div className="diamond" style={{ top: `calc(50% + ${glideSlopeDeviation * 20}px)` }}>
                      <div className="diamond-shape"></div>
                    </div>
                    <div className="center-line"></div>
                  </div>
                  <div className="label">GS</div>
                </GlideSlopeDisplay>

                {/* Центральное перекрестие */}
                <div className="crosshair">
                  <div className="vertical-line"></div>
                  <div className="horizontal-line"></div>
                </div>

                {/* Ветровой индикатор */}
                <WindEffect $direction={windDirection} $strength={windSpeed}>
                  <div className="wind-info">
                    <div className="wind-arrow">↑</div>
                    <div className="wind-text">{windSpeed}KT</div>
                  </div>
                </WindEffect>
              </div>
            </PFDDisplay>

            {/* Текущая ситуация */}
            <div className="situation-info">
              <h4>Текущая ситуация:</h4>
              <p>
                {localizerDeviation === 0 && glideSlopeDeviation === 0 && windSpeed === 0 
                  ? "Идеальный заход! Все параметры в норме." 
                  : `
                    ${localizerDeviation !== 0 ? (localizerDeviation > 0 ? 'Слева от курса' : 'Справа от курса') : 'На курсе'}, 
                    ${glideSlopeDeviation !== 0 ? (glideSlopeDeviation > 0 ? 'выше глиссады' : 'ниже глиссады') : 'на глиссаде'}
                    ${windSpeed > 0 ? `, ветер ${windSpeed} узлов` : ''}
                  `
                }
              </p>
              {windSpeed > 0 && (
                <p><strong>Требуемый угол сноса:</strong> {windCorrectionAngle}°</p>
              )}
            </div>
          </Visualization>
        </DemoSection>
      </InteractiveDemo>
    </BuilderContainer>
  );
};