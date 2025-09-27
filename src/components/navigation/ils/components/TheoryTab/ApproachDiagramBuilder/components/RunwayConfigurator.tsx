import React from 'react';
import type { ApproachConfig } from '../../../../types/ils.types';
import { 
  ConfigSection, 
  SectionTitle, 
  ControlGroup,
  Label,
  ValueDisplay,
  Slider,
  NumberInput,
  PresetGrid,
  PresetButton
} from './Configurator.styles';

interface RunwayConfiguratorProps {
  config: ApproachConfig;
  onUpdate: (config: Partial<ApproachConfig>) => void;
}

const runwayPresets = [
  { value: 90, label: '09 (90°) - Восток', symbol: '→' },
  { value: 180, label: '18 (180°) - Юг', symbol: '↓' },
  { value: 270, label: '27 (270°) - Запад', symbol: '←' },
  { value: 360, label: '36 (360°/0°) - Север', symbol: '↑' },
  { value: 45, label: '04 (45°) - СВ', symbol: '↗' },
  { value: 135, label: '13 (135°) - ЮВ', symbol: '↘' },
  { value: 225, label: '22 (225°) - ЮЗ', symbol: '↙' },
  { value: 315, label: '31 (315°) - СЗ', symbol: '↖' }
];

export const RunwayConfigurator: React.FC<RunwayConfiguratorProps> = ({ config, onUpdate }) => {
  const handleRunwayChange = (value: number) => {
    onUpdate({ runwayHeading: value });
  };

  const handleGlideSlopeChange = (value: number) => {
    onUpdate({ glideSlopeAngle: value });
  };

  const handlePresetSelect = (value: number) => {
    onUpdate({ runwayHeading: value });
  };

  return (
    <ConfigSection>
      <SectionTitle>🏃‍♂️ Конфигурация ВПП</SectionTitle>
      
      <ControlGroup>
        <Label>
          Курс ВПП: 
          <ValueDisplay>{config.runwayHeading}°</ValueDisplay>
        </Label>
        <Slider
          type="range"
          min="0"
          max="359"
          value={config.runwayHeading}
          onChange={(e) => handleRunwayChange(parseInt(e.target.value))}
        />
        <NumberInput
          type="number"
          min="0"
          max="359"
          value={config.runwayHeading}
          onChange={(e) => handleRunwayChange(parseInt(e.target.value))}
        />
      </ControlGroup>

      <ControlGroup>
        <Label>
          Угол глиссады: 
          <ValueDisplay>{config.glideSlopeAngle}°</ValueDisplay>
        </Label>
        <Slider
          type="range"
          min="2.5"
          max="3.5"
          step="0.1"
          value={config.glideSlopeAngle}
          onChange={(e) => handleGlideSlopeChange(parseFloat(e.target.value))}
        />
        <NumberInput
          type="number"
          min="2.5"
          max="3.5"
          step="0.1"
          value={config.glideSlopeAngle}
          onChange={(e) => handleGlideSlopeChange(parseFloat(e.target.value))}
        />
      </ControlGroup>

      <ControlGroup>
        <Label>Быстрые пресеты:</Label>
        <PresetGrid>
          {runwayPresets.map(preset => (
            <PresetButton
              key={preset.value}
              $active={config.runwayHeading === preset.value}
              onClick={() => handlePresetSelect(preset.value)}
              title={preset.label}
            >
              <span style={{ fontSize: '1.2rem' }}>{preset.symbol}</span>
              <span>{preset.value}°</span>
            </PresetButton>
          ))}
        </PresetGrid>
      </ControlGroup>
    </ConfigSection>
  );
};