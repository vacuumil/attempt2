import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (name: string, value: number) => void;
  helpText?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  min,
  max,
  step = 1,
  onChange,
  helpText
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      onChange(name, newValue);
    }
  };

  return (
    <div className="input-field">
      <label className="input-label">
        {label}
        {helpText && (
          <span className="help-tooltip" title={helpText}>
            ℹ️
          </span>
        )}
      </label>
      <input
        type="number"
        name={name}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        className="number-input"
      />
      <input
        type="range"
        name={name}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        className="range-slider"
      />
    </div>
  );
};