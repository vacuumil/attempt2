import React from 'react';
import { InputField } from './InputField';
import { PresetSelector } from './PresetSelector';
import { WindInfoPanel } from './WindInfoPanel';
import type { SpeedTriangleState } from '../types/types';

interface ControlPanelProps {
  state: SpeedTriangleState;
  onChange: (field: keyof SpeedTriangleState, value: number) => void;
  onPresetSelect: (preset: Partial<SpeedTriangleState>) => void;
  wca: number;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  state,
  onChange,
  onPresetSelect,
  wca
}) => {
  const handleInputChange = (name: string, value: number) => {
    onChange(name as keyof SpeedTriangleState, value);
  };

  return (
    <div className="control-panel">
      <h3>Параметры полета</h3>
      
      <div className="input-grid">
        <InputField
          label="TAS (узлы)"
          name="tas"
          value={state.tas}
          min={50}
          max={500}
          onChange={handleInputChange}
        />

        <InputField
          label="Магнитный курс (°)"
          name="trueCourse"
          value={state.trueCourse}
          min={0}
          max={359}
          onChange={handleInputChange}
        />

        <InputField
          label="Скорость ветра (узлы)"
          name="windSpeed"
          value={state.windSpeed}
          min={0}
          max={100}
          onChange={handleInputChange}
        />

        <InputField
          label="Направление ветра (°)"
          name="windDirection"
          value={state.windDirection}
          min={0}
          max={359}
          onChange={handleInputChange}
        />
      </div>

      <WindInfoPanel state={state} wca={wca} />

      <PresetSelector
        onSelectPreset={onPresetSelect}
        currentState={state}
      />
    </div>
  );
};