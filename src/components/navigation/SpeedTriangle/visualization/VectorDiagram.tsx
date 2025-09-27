import React, { useEffect, useRef, useState, useCallback } from 'react';
import { toRad, meteoToNavDirection } from '../calculations/calculations';

interface VectorDiagramProps {
  tas: number;
  trueCourse: number;
  windSpeed: number;
  windDirection: number;
  groundspeed: number;
  wca: number;
  isCalculated: boolean;
}

interface VectorLabel {
  x: number;
  y: number;
  text: string;
  color: string;
  id: string;
  angle: number;
}

export const VectorDiagram: React.FC<VectorDiagramProps> = ({
  tas,
  trueCourse,
  windSpeed,
  windDirection,
  groundspeed,
  wca,
  isCalculated
}) => {
  const width = 400;
  const height = 400;
  const centerX = width / 2;
  const centerY = height / 2;
  const svgRef = useRef<SVGSVGElement>(null);
  const [labels, setLabels] = useState<VectorLabel[]>([]);
  
  const maxMagnitude = Math.max(tas, windSpeed, groundspeed, 1);
  const scale = 150 / maxMagnitude;

  const calculateVectorComponents = useCallback(() => {
  // Преобразуем метеорологическое направление в навигационное для отображения
  const navWindDirection = meteoToNavDirection(windDirection);
  const courseRad = toRad(trueCourse);
  const windRad = toRad(navWindDirection);

  return {
    tasX: tas * Math.sin(courseRad) * scale,
    tasY: tas * Math.cos(courseRad) * scale,
    windX: windSpeed * Math.sin(windRad) * scale,
    windY: windSpeed * Math.cos(windRad) * scale,
  };
}, [tas, trueCourse, windSpeed, windDirection, scale]);

  const { tasX, tasY, windX, windY } = calculateVectorComponents();
  const gsX = tasX + windX;
  const gsY = tasY + windY;

  // Функция для проверки пересечений подписей
  const checkLabelCollision = useCallback((newLabel: VectorLabel, existingLabels: VectorLabel[]): boolean => {
    const MARGIN = 30;
    
    return existingLabels.some(existingLabel => {
      const distance = Math.sqrt(
        Math.pow(newLabel.x - existingLabel.x, 2) + 
        Math.pow(newLabel.y - existingLabel.y, 2)
      );
      return distance < MARGIN;
    });
  }, []);

  // Функция для расчета оптимальной позиции подписи
  const calculateOptimalLabelPosition = useCallback((
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    text: string,
    color: string,
    id: string,
    existingLabels: VectorLabel[]
  ): VectorLabel => {
    const angle = Math.atan2(endY - startY, endX - startX);
    
    // Базовые позиции (с разных сторон от вектора)
    const positions = [
      // Перпендикулярно справа
      {
        x: (startX + endX) / 2 + 25 * Math.cos(angle + Math.PI / 2),
        y: (startY + endY) / 2 + 25 * Math.sin(angle + Math.PI / 2),
        angle: 0
      },
      // Перпендикулярно слева
      {
        x: (startX + endX) / 2 + 25 * Math.cos(angle - Math.PI / 2),
        y: (startY + endY) / 2 + 25 * Math.sin(angle - Math.PI / 2),
        angle: 0
      },
      // Вдоль вектора (в начале)
      {
        x: startX + 15 * Math.cos(angle),
        y: startY + 15 * Math.sin(angle),
        angle: angle
      },
      // Вдоль вектора (в конце)
      {
        x: endX - 15 * Math.cos(angle),
        y: endY - 15 * Math.sin(angle),
        angle: angle
      }
    ];

    // Пробуем все позиции, начина с наилучшей
    for (const position of positions) {
      const candidate: VectorLabel = {
        x: position.x,
        y: position.y,
        text,
        color,
        id,
        angle: position.angle
      };

      if (!checkLabelCollision(candidate, existingLabels)) {
        return candidate;
      }
    }

    // Если все позиции заняты, возвращаем первую
    return {
      x: positions[0].x,
      y: positions[0].y,
      text,
      color,
      id,
      angle: positions[0].angle
    };
  }, [checkLabelCollision]);

  useEffect(() => {
    if (isCalculated) {
      const newLabels: VectorLabel[] = [];
      
      // TAS label
      const tasLabel = calculateOptimalLabelPosition(
        centerX,
        centerY,
        centerX + tasX,
        centerY - tasY,
        `TAS: ${tas}kt`,
        '#1a6fc4', // Синий
        'tas',
        newLabels
      );
      newLabels.push(tasLabel);

      // Wind label
      const windLabel = calculateOptimalLabelPosition(
        centerX + tasX,
        centerY - tasY,
        centerX + tasX + windX,
        centerY - tasY - windY,
        `Wind: ${windSpeed}kt`,
        '#ff6b6b', // Красный
        'wind',
        newLabels
      );
      newLabels.push(windLabel);

      // GS label
      const gsLabel = calculateOptimalLabelPosition(
        centerX,
        centerY,
        centerX + gsX,
        centerY - gsY,
        `GS: ${groundspeed.toFixed(0)}kt`,
        '#6bff95', // Зеленый
        'gs',
        newLabels
      );
      newLabels.push(gsLabel);

      // WCA label (фиксированная позиция)
      newLabels.push({
        x: centerX + 60,
        y: centerY - 60,
        text: `WCA: ${wca.toFixed(1)}°`,
        color: '#ffd93d', // Желтый
        id: 'wca',
        angle: 0
      });

      setLabels(newLabels);
    }
  }, [tas, trueCourse, windSpeed, windDirection, groundspeed, wca, isCalculated, calculateOptimalLabelPosition, centerX, centerY, tasX, tasY, windX, windY, gsX, gsY]);

  const renderVector = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    color: string,
    id: string
  ) => {
    const angle = Math.atan2(endY - startY, endX - startX);
    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    
    return (
      <g key={id}>
        {/* Анимированная линия вектора */}
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={length}
          strokeDashoffset={length}
          className="vector-line"
        />
        
        {/* Стрелка */}
        <path
          d={`M ${endX} ${endY} 
               L ${endX - 10 * Math.cos(angle - Math.PI / 6)} ${endY - 10 * Math.sin(angle - Math.PI / 6)}
               L ${endX - 10 * Math.cos(angle + Math.PI / 6)} ${endY - 10 * Math.sin(angle + Math.PI / 6)} 
               Z`}
          fill={color}
          className="vector-arrow"
        />
      </g>
    );
  };

  const renderCompassMarkers = () => {
    const markers = [];
    const directions = ['N', 'E', 'S', 'W'];
    
    for (let i = 0; i < 360; i += 30) {
      const angleRad = toRad(i);
      const x1 = centerX + 180 * Math.sin(angleRad);
      const y1 = centerY - 180 * Math.cos(angleRad);
      const x2 = centerX + 170 * Math.sin(angleRad);
      const y2 = centerY - 170 * Math.cos(angleRad);

      markers.push(
        <line
          key={`marker-${i}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#8892b0"
          strokeWidth="1"
          opacity="0.6"
        />
      );

      if (i % 90 === 0) {
        const directionIndex = i / 90;
        markers.push(
          <text
            key={`text-${i}`}
            x={centerX + 195 * Math.sin(angleRad)}
            y={centerY - 195 * Math.cos(angleRad) + 4}
            fill={i === 0 ? '#64ffda' : '#8892b0'}
            fontSize="12"
            fontWeight={i === 0 ? 'bold' : 'normal'}
            textAnchor="middle"
            fontFamily="'Exo 2', sans-serif"
          >
            {directions[directionIndex]}
          </text>
        );
      }
    }
    return markers;
  };

  if (!isCalculated) {
    return (
      <div className="vector-diagram">
        <div className="diagram-placeholder">
          Введите параметры и нажмите "Рассчитать" для отображения диаграммы
        </div>
      </div>
    );
  }

  return (
    <div className="vector-diagram">
      <h3>Векторная диаграмма</h3>
      <svg 
        ref={svgRef}
        width={width} 
        height={height} 
        viewBox={`0 0 ${width} ${height}`}
        className="vector-svg"
      >
        {/* Фон с компасными направлениями */}
        <circle cx={centerX} cy={centerY} r="180" fill="rgba(10, 25, 47, 0.8)" stroke="#1a6fc4" opacity="0.8" />
        
        {/* Компасные маркеры */}
        {renderCompassMarkers()}
        
        {/* Оси */}
        <line x1={centerX} y1="20" x2={centerX} y2={height - 20} stroke="#8892b0" strokeWidth="1" strokeDasharray="5,5" opacity="0.4" />
        <line x1="20" y1={centerY} x2={width - 20} y2={centerY} stroke="#8892b0" strokeWidth="1" strokeDasharray="5,5" opacity="0.4" />
        
        {/* Северная отметка */}
        <text x={centerX} y="15" fill="#64ffda" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="'Exo 2', sans-serif">N</text>

        {/* Векторы */}
        {renderVector(centerX, centerY, centerX + tasX, centerY - tasY, '#1a6fc4', 'tas')}
        {renderVector(centerX + tasX, centerY - tasY, centerX + tasX + windX, centerY - tasY - windY, '#ff6b6b', 'wind')}
        {renderVector(centerX, centerY, centerX + gsX, centerY - gsY, '#6bff95', 'gs')}

        {/* Подписи с поворотом */}
        {labels.map((label) => (
          <text
            key={label.id}
            x={label.x}
            y={label.y}
            fill={label.color}
            fontSize="11"
            fontWeight="bold"
            textAnchor="middle"
            className="vector-label"
            fontFamily="'Share Tech Mono', monospace"
            transform={label.angle !== 0 ? `rotate(${label.angle * 180 / Math.PI}, ${label.x}, ${label.y})` : undefined}
          >
            {label.text}
          </text>
        ))}

        {/* Точка начала */}
        <circle cx={centerX} cy={centerY} r="5" fill="#64ffda" className="origin-point" />
        
        {/* Информация о курсе и ветре */}
        <text x={centerX} y={height - 10} fill="#8892b0" fontSize="10" textAnchor="middle" fontFamily="'Share Tech Mono', monospace">
          Курс: {trueCourse}° | Ветер: {windSpeed}kt/{windDirection}°
        </text>
      </svg>

      <div className="vector-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#1a6fc4' }}></div>
          <span>TAS - True Air Speed</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#ff6b6b' }}></div>
          <span>Wind - Ветер</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#6bff95' }}></div>
          <span>GS - Ground Speed</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#ffd93d' }}></div>
          <span>WCA - Угол сноса</span>
        </div>
      </div>
    </div>
  );
};