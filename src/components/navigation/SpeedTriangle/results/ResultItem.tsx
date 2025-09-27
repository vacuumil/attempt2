import React from 'react';

interface ResultItemProps {
  label: string;
  value: number;
  unit: string;
  precision?: number;
  isAngle?: boolean;
}

export const ResultItem: React.FC<ResultItemProps> = ({
  label,
  value,
  unit,
  precision = 1,
  isAngle = false
}) => {
  const formattedValue = value.toFixed(precision);
  
  const getAngleColor = (angle: number): string => {
    const absAngle = Math.abs(angle);
    if (absAngle > 10) return 'result-angle-high';
    if (absAngle > 5) return 'result-angle-medium';
    return 'result-angle-low';
  };

  return (
    <div className="result-item">
      <div className="result-label">{label}</div>
      <div className={`result-value ${isAngle ? getAngleColor(value) : ''}`}>
        {formattedValue} {unit}
      </div>
    </div>
  );
};