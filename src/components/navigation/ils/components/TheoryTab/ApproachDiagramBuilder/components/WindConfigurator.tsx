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
  WindDirection,
  WindSpeedIndicator
} from './Configurator.styles';

interface WindConfiguratorProps {
  config: ApproachConfig;
  onUpdate: (config: Partial<ApproachConfig>) => void;
}

const windPresets = [
  { direction: 0, speed: 5, label: 'Легкий северный' },
  { direction: 90, speed: 10, label: 'Умеренный восточный' },
  { direction: 180, speed: 15, label: 'Сильный южный' },
  { direction: 270, speed: 20, label: 'Штормовой западный' },
  { direction: 45, speed: 8, label: 'СВ порывистый' },
];

export const WindConfigurator: React.FC<WindConfiguratorProps> = ({ config, onUpdate }) => {
  const handleWindDirectionChange = (value: number) => {
    onUpdate({ 
      wind: { ...config.wind, direction: value } 
    });
  };

  const handleWindSpeedChange = (value: number) => {
    onUpdate({ 
      wind: { ...config.wind, speed: value } 
    });
  };

  const handlePresetSelect = (preset: typeof windPresets[0]) => {
    onUpdate({ 
      wind: { direction: preset.direction, speed: preset.speed } 
    });
  };

  const getWindDirectionName = (degrees: number): string => {
    const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  const getWindStrength = (speed: number): string => {
    if (speed < 5) return 'Штиль';
    if (speed < 10) return 'Легкий';
    if (speed < 15) return 'Умеренный';
    if (speed < 20) return 'Сильный';
    return 'Штормовой';
  };

  return (
    <ConfigSection>
      <SectionTitle>💨 Конфигурация ветра</SectionTitle>
      
      <ControlGroup>
        <Label>
          Направление ветра: 
          <ValueDisplay>
            {config.wind.direction}° ({getWindDirectionName(config.wind.direction)})
          </ValueDisplay>
        </Label>
        <WindDirection $direction={config.wind.direction}>
          ↑
        </WindDirection>
        <Slider
          type="range"
          min="0"
          max="359"
          value={config.wind.direction}
          onChange={(e) => handleWindDirectionChange(parseInt(e.target.value))}
        />
        <NumberInput
          type="number"
          min="0"
          max="359"
          value={config.wind.direction}
          onChange={(e) => handleWindDirectionChange(parseInt(e.target.value))}
        />
      </ControlGroup>

      <ControlGroup>
        <Label>
          Скорость ветра: 
          <ValueDisplay>
            {config.wind.speed} узлов ({getWindStrength(config.wind.speed)})
          </ValueDisplay>
        </Label>
        <WindSpeedIndicator $speed={config.wind.speed}>
          {['💨', '💨💨', '💨💨💨', '🌬️', '🌀'][Math.min(Math.floor(config.wind.speed / 5), 4)]}
        </WindSpeedIndicator>
        <Slider
          type="range"
          min="0"
          max="30"
          step="1"
          value={config.wind.speed}
          onChange={(e) => handleWindSpeedChange(parseInt(e.target.value))}
        />
        <NumberInput
          type="number"
          min="0"
          max="50"
          step="1"
          value={config.wind.speed}
          onChange={(e) => handleWindSpeedChange(parseInt(e.target.value))}
        />
      </ControlGroup>

      <ControlGroup>
        <Label>Погодные пресеты:</Label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {windPresets.map((preset, index) => (
            <button
              key={index}
              onClick={() => handlePresetSelect(preset)}
              style={{
                padding: '0.5rem',
                background: 'rgba(100, 255, 218, 0.1)',
                border: '1px solid rgba(100, 255, 218, 0.3)',
                borderRadius: '5px',
                color: '#e6f1ff',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              {preset.label} ({preset.speed} узлов)
            </button>
          ))}
        </div>
      </ControlGroup>
    </ConfigSection>
  );
};