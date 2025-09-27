import React from 'react';
import { windPresets } from '../data/presets';
import type { WindPreset } from '../data/presets';
import type { SpeedTriangleState } from '../types/types';
import { getWindTypeFromAngle} from '../data/presets';
import { meteoToNavDirection } from '../calculations/calculations';

interface PresetSelectorProps {
  onSelectPreset: (preset: Partial<SpeedTriangleState>) => void;
  currentState: SpeedTriangleState;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  onSelectPreset,
  currentState
}) => {
  const handlePresetSelect = (preset: WindPreset) => {
    if (typeof preset.values === 'function') {
      const presetValues = preset.values(currentState.trueCourse);
      onSelectPreset(presetValues);
    } else {
      onSelectPreset(preset.values);
    }
  };

  // Правильная логика проверки активного пресета
const isPresetActive = (preset: WindPreset): boolean => {
  const { windSpeed, windDirection, trueCourse } = currentState;

  // Для штиля
  if (preset.id === 'calm') {
    return windSpeed === 0;
  }

  // Для ветреных условий
  if (windSpeed === 0) return false;

  // Преобразуем метеорологическое направление в навигационное
  const navWindDirection = meteoToNavDirection(windDirection);
  
  // Вычисляем угол ветра относительно курса
  const windAngle = ((navWindDirection - trueCourse + 360) % 360);
  const currentWindType = getWindTypeFromAngle(windAngle);

  // Получаем тип ветра для пресета
  let presetWindType = '';
  if (typeof preset.values === 'function') {
    const presetValues = preset.values(trueCourse);
    // Для пресетов также преобразуем в навигационное направление
    const presetNavDirection = meteoToNavDirection(presetValues.windDirection!);
    const presetWindAngle = ((presetNavDirection - trueCourse + 360) % 360);
    presetWindType = getWindTypeFromAngle(presetWindAngle);
  } else {
    const presetNavDirection = meteoToNavDirection(preset.values.windDirection!);
    const presetWindAngle = ((presetNavDirection - trueCourse + 360) % 360);
    presetWindType = getWindTypeFromAngle(presetWindAngle);
  }

  // Сравниваем типы ветра
  return currentWindType === presetWindType;
};

// Функция для получения отображаемого имени пресета
const getPresetDisplayName = (preset: WindPreset): string => {
  if (typeof preset.values === 'function') {
    const presetValues = preset.values(currentState.trueCourse);
    // Преобразуем для правильного определения типа
    const presetNavDirection = meteoToNavDirection(presetValues.windDirection!);
    const windAngle = ((presetNavDirection - currentState.trueCourse + 360) % 360);
    const windType = getWindTypeFromAngle(windAngle);
    
    const names: { [key: string]: string } = {
      'headwind': 'Встречный',
      'tailwind': 'Попутный',
      'crosswind-right': 'Боковой слева',
      'crosswind-left': 'Боковой справа',
      'headwind-right': 'Встр. слева',
      'headwind-left': 'Встр. справа',
      'tailwind-right': 'Попут. слева',
      'tailwind-left': 'Попут. справа'
    };
    
    return names[windType] || preset.name;
  }
    return preset.name;
  };
  return (
    <div className="preset-selector">
      <h4>Типовые сценарии ветра</h4>
      <div className="preset-grid">
        {windPresets.map((preset) => (
          <button
            key={preset.id}
            className={`preset-btn ${isPresetActive(preset) ? 'active' : ''}`}
            onClick={() => handlePresetSelect(preset)}
            title={preset.description}
          >
            <span className="preset-icon" style={{ fontSize: '1.5rem' }}>
              {preset.icon}
            </span>
            <span className="preset-name">{getPresetDisplayName(preset)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};