import React from 'react';
import { ResultItem } from './ResultItem';
import type { CalculationResults } from '../types/types';

interface ResultsPanelProps {
  results: CalculationResults | null;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ results }) => {
  if (!results) {
    return (
      <div className="results-panel">
        <h3>Результаты</h3>
        <div className="no-results">
          Введите параметры и нажмите "Рассчитать"
        </div>
      </div>
    );
  }

  return (
    <div className="results-panel">
      <h3>Результаты расчета</h3>
      
      <div className="results-grid">
        <ResultItem
          label="Путевая скорость"
          value={results.groundspeed}
          unit="узлов"
          precision={1}
        />
        
        <ResultItem
          label="Угол сноса"
          value={results.wca}
          unit="°"
          isAngle={true}
          precision={1}
        />
        
        <ResultItem
          label="Фактический магнитный путевой угол"
          value={results.trueHeading}
          unit="°"
          precision={1}
        />
      </div>
    </div>
  );
};