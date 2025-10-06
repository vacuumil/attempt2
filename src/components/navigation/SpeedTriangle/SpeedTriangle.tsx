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
    windDirection: 90,
    useMagneticWind: true
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
      state.useMagneticWind
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

      {/* КОМПАКТНАЯ СЕТКА */}
      <div className="speed-triangle-compact-grid">
        {/* ЛЕВАЯ КОЛОНКА - УПРАВЛЕНИЕ И РЕЗУЛЬТАТЫ */}
        <div className="left-column">
          <ControlPanel
            state={state}
            onChange={handleStateChange}
            onPresetSelect={handlePresetSelect}
            wca={results?.wca || 0}
          />
          
          <ResultsPanel results={results} />
          
          {/* ИТОГИ РАСЧЕТА */}
          {results && (
            <div className="calculation-summary">
              <h4>Итоги расчета</h4>
              <p>
                При воздушной скорости <strong>{state.tas} узлов</strong> и ветре 
                <strong> {state.windSpeed} kt/{state.windDirection}°</strong>:
              </p>
              <p>
                Для следования курсом <strong>{state.trueCourse}°</strong> необходимо 
                установить курс <strong>{results.trueHeading.toFixed(1)}°</strong>.
              </p>
              <p>
                Путевая скорость составит <strong>{results.groundspeed.toFixed(1)} узлов</strong>.
              </p>
            </div>
          )}
        </div>

        {/* ПРАВАЯ КОЛОНКА - ДИАГРАММА И КНОПКИ */}
        <div className="right-column">
          <VectorDiagram
            tas={state.tas}
            trueCourse={state.trueCourse}
            windSpeed={state.windSpeed}
            windDirection={state.windDirection}
            groundspeed={results?.groundspeed || 0}
            wca={results?.wca || 0}
            isCalculated={isCalculated}
          />
          
          {/* КНОПКИ УПРАВЛЕНИЯ ПОД ДИАГРАММОЙ */}
          <div className="diagram-control-buttons">
            <button onClick={handleCalculate} className="calculate-btn">
              Рассчитать
            </button>
            <button onClick={handleReset} className="reset-btn">
              Сброс
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};