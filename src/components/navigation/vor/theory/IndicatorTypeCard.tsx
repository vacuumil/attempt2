import React from 'react';
import './IndicatorTypeCard.css';

export interface IndicatorType {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  keyFeatures: string[];
}

interface IndicatorTypeCardProps {
  indicator: IndicatorType;
}

const getFeatureIcon = (feature: string): string => {
  if (feature.includes('CDI')) return '↔️';
  if (feature.includes('TO/FROM')) return '🔁';
  if (feature.includes('OBS')) return '🎛️';
  if (feature.includes('частота')) return '📻';
  if (feature.includes('картушка')) return '🧭';
  if (feature.includes('маркер')) return '📍';
  if (feature.includes('брус')) return '📏';
  return '⚡';
};

export const IndicatorTypeCard: React.FC<IndicatorTypeCardProps> = ({ indicator }) => {
  return (
    <div className={`indicator-card ${indicator.id}`}>
      <h4>{indicator.name}</h4>
      <p className="indicator-description">{indicator.description}</p>
      <div className="indicator-features">
        <h5>Ключевые элементы:</h5>
        <ul>
          {indicator.keyFeatures.map((feature, index) => (
            <li key={index}>
              <span className="feature-icon">{getFeatureIcon(feature)}</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};