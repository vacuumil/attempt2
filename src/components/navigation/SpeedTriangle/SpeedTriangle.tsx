import React, { useState } from 'react';
import { ControlPanel } from './controls/ControlPanel';
import { ResultsPanel } from './results/ResultsPanel';
import { VectorDiagram } from './visualization/VectorDiagram';
import { 
  calculateWindCorrectionAngle, 
  calculateGroundspeed, 
  calculateTrueHeading 
} from './calculations/calculations';
import type { SpeedTriangleState, CalculationResults } from './types/types';
import './SpeedTriangle.css';

export const SpeedTriangle: React.FC = () => {
  const [state, setState] = useState<SpeedTriangleState>({
    tas: 200,
    trueCourse: 90,
    windSpeed: 20,
    windDirection: 90, // Теперь 90° означает ветер с востока (метеорологическое)
    useMagneticWind: true // По умолчанию используем метеорологический формат
  });

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleStateChange = (field: keyof SpeedTriangleState, value: number) => {
    setState(prev => ({ ...prev, [field]: value }));
    setIsCalculated(false);
  };

  const handlePresetSelect = (preset: Partial<SpeedTriangleState>) => {
    setState(prev => ({ ...prev, ...preset }));
    setIsCalculated(false);
  };

  const handleCalculate = () => {
    const wca = calculateWindCorrectionAngle(
      state.tas,
      state.windSpeed,
      state.windDirection,
      state.trueCourse,
      state.useMagneticWind // Передаем флаг типа ветра
    );

    const groundspeed = calculateGroundspeed(
      state.tas,
      state.windSpeed,
      state.windDirection,
      state.trueCourse,
      state.useMagneticWind
    );

    const trueHeading = calculateTrueHeading(state.trueCourse, wca);

    setResults({ wca, groundspeed, trueHeading });
    setIsCalculated(true);
  };

  const handleReset = () => {
    setState({
      tas: 200,
      trueCourse: 90,
      windSpeed: 20,
      windDirection: 270
    });
    setResults(null);
    setIsCalculated(false);
  };

  return (
    <div className="speed-triangle-container">
      <div className="speed-triangle-header">
        <h2>Треугольник скоростей</h2>
        <p className="subtitle">Расчет угла сноса и путевой скорости</p>
      </div>

      <div className="speed-triangle-grid">
        <div className="control-section">
          <ControlPanel
            state={state}
            onChange={handleStateChange}
            onCalculate={handleCalculate}
            onReset={handleReset}
            onPresetSelect={handlePresetSelect}
            wca={results?.wca || 0}
          />
          
          <ResultsPanel results={results} />
        </div>

        <div className="visualization-section">
          <VectorDiagram
            tas={state.tas}
            trueCourse={state.trueCourse}
            windSpeed={state.windSpeed}
            windDirection={state.windDirection}
            groundspeed={results?.groundspeed || 0}
            wca={results?.wca || 0}
            isCalculated={isCalculated}
          />
        </div>
      </div>

      
    </div>
  );
};