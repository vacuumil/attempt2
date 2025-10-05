import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import type { VisualizedLeg, Point } from './types';
import { magneticToTrue, normalizeLength, toRadians } from './compassUtils';
import {
  VisualizationContainer,
  VisualizationHeader,
  VisualizationTitle,
  ControlsPanel,
  ControlGroup,
  Input,
  CanvasContainer,
  Legend,
  LegendItem,
  ColorSwatch
} from './RouteVisualization.styles';

interface RouteVisualizationProps {
  legs: VisualizedLeg[];
  windDirection: number;
  windSpeed: number;
}

export const RouteVisualization: React.FC<RouteVisualizationProps> = ({
  legs,
  windDirection,
  windSpeed
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [magneticDeclination, setMagneticDeclination] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const [showMeasurements, setShowMeasurements] = useState(true);
  
  // Адаптивный размер canvas
  const [canvasSize, setCanvasSize] = useState(600);

  // Автоматически подстраиваем размер под контейнер
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const maxSize = Math.min(containerWidth - 40, 800);
        const minSize = 300;
        const newSize = Math.max(minSize, maxSize);
        setCanvasSize(newSize);
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  // Упрощенные стили
  const styles = useMemo(() => ({
    background: {
      primary: 'rgba(10, 25, 47, 0.4)',
      secondary: 'rgba(17, 34, 64, 0.3)',
      overlay: 'rgba(10, 25, 47, 0.8)'
    },
    grid: {
      majorLine: 'rgba(26, 111, 196, 0.3)',
      minorLine: 'rgba(26, 111, 196, 0.15)',
      border: '#1a6fc4',
      text: '#8892b0'
    },
    route: {
      line: '#64ffda',
      takeoff: '#64ffda',
      landing: '#ff6b6b',
      waypoint: '#e6f1ff',
      arrow: '#64ffda',
      highlight: 'rgba(100, 255, 218, 0.2)'
    },
    wind: {
      background: 'rgba(255, 215, 0, 0.15)',
      border: '#ffd700',
      text: '#ffd700',
      arrow: '#ffd700'
    },
    drift: {
      positive: '#ff6b6b',
      negative: '#64ffda'
    },
    north: {
      arrow: '#ff6b6b',
      text: '#ff6b6b'
    },
    measurement: {
      line: 'rgba(157, 78, 221, 0.6)',
      text: '#9d4edd'
    }
  }), []);

  // Рассчитываем границы маршрута для автоматического масштабирования
  const routeBounds = useMemo(() => {
    if (legs.length < 2) return { 
      minX: 0, maxX: 0, minY: 0, maxY: 0, 
      width: 0, height: 0, centerX: 0, centerY: 0 
    };

    const points: Point[] = [];
    let currentPoint: Point = { x: 0, y: 0 };
    points.push(currentPoint);

    const maxDistance = Math.max(...legs.map(leg => leg.distance), 1);

    legs.forEach((leg, index) => {
      if (index === 0) return;

      const trueHeading = magneticToTrue(leg.magneticHeading, magneticDeclination);
      const segmentLength = normalizeLength(leg.distance, maxDistance, canvasSize * 0.3);
      
      const angleRad = toRadians(trueHeading);
      const endPoint: Point = {
        x: currentPoint.x + segmentLength * Math.sin(angleRad),
        y: currentPoint.y - segmentLength * Math.cos(angleRad)
      };
      
      points.push(endPoint);
      currentPoint = endPoint;
    });

    const xs = points.map(p => p.x);
    const ys = points.map(p => p.y);
    
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const width = maxX - minX;
    const height = maxY - minY;
    
    return {
      minX, maxX, minY, maxY,
      width,
      height,
      centerX: minX + width / 2,
      centerY: minY + height / 2
    };
  }, [legs, magneticDeclination, canvasSize]);

  // Центрируем маршрут на canvas
  const getCenteredPoint = useCallback((point: Point): Point => {
    const padding = canvasSize * 0.15;
    
    if (routeBounds.width === 0 && routeBounds.height === 0) {
      return { x: canvasSize / 2, y: canvasSize / 2 };
    }
    
    const scale = Math.min(
      (canvasSize - padding * 2) / Math.max(routeBounds.width, 50),
      (canvasSize - padding * 2) / Math.max(routeBounds.height, 50)
    );

    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;
    
    return {
      x: centerX + (point.x - routeBounds.centerX) * scale,
      y: centerY + (point.y - routeBounds.centerY) * scale
    };
  }, [canvasSize, routeBounds]);

  const drawBackground = useCallback((ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(0, 0, canvasSize, canvasSize);
    gradient.addColorStop(0, styles.background.primary);
    gradient.addColorStop(1, styles.background.secondary);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasSize, canvasSize);
  }, [canvasSize, styles]);

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!showGrid) return;

    const gridSize = Math.max(40, canvasSize / 15);
    const majorGridSize = gridSize * 5;

    // Мелкая сетка
    ctx.strokeStyle = styles.grid.minorLine;
    ctx.lineWidth = 0.5;
    
    for (let x = 0; x <= canvasSize; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasSize);
      ctx.stroke();
    }
    
    for (let y = 0; y <= canvasSize; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasSize, y);
      ctx.stroke();
    }

    // Основная сетка
    ctx.strokeStyle = styles.grid.majorLine;
    ctx.lineWidth = 1;
    
    for (let x = 0; x <= canvasSize; x += majorGridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasSize);
      ctx.stroke();
    }
    
    for (let y = 0; y <= canvasSize; y += majorGridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasSize, y);
      ctx.stroke();
    }
  }, [canvasSize, styles, showGrid]);

  // УПРОЩЕННЫЙ ИНДИКАТОР СЕВЕРА - всегда отображается
  const drawNorthIndicator = useCallback((ctx: CanvasRenderingContext2D) => {
    const size = Math.max(40, canvasSize / 15);
    const margin = Math.max(15, canvasSize / 40);
    
    const center: Point = {
      x: canvasSize - margin - size / 2,
      y: margin + size / 2
    };

    // Простой круг
    ctx.fillStyle = 'rgba(255, 107, 107, 0.1)';
    ctx.strokeStyle = styles.north.arrow;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(center.x, center.y, size / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // Стрелка севера (всегда вверх)
    const arrowLength = size * 0.35;
    const arrowEnd = {
      x: center.x,
      y: center.y - arrowLength
    };

    // Линия севера
    ctx.strokeStyle = styles.north.arrow;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(arrowEnd.x, arrowEnd.y);
    ctx.stroke();

    // Стрелка
    ctx.fillStyle = styles.north.arrow;
    ctx.beginPath();
    ctx.moveTo(arrowEnd.x, arrowEnd.y);
    ctx.lineTo(arrowEnd.x - 6, arrowEnd.y + 8);
    ctx.lineTo(arrowEnd.x + 6, arrowEnd.y + 8);
    ctx.closePath();
    ctx.fill();

    // Буква "N"
    ctx.fillStyle = styles.north.text;
    const fontSize = Math.max(14, canvasSize / 40);
    ctx.font = `bold ${fontSize}px "Exo 2", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('N', center.x, center.y);
  }, [canvasSize, styles]);

  // УПРОЩЕННЫЙ ИНДИКАТОР ВЕТРА
  const drawWindIndicator = useCallback((ctx: CanvasRenderingContext2D) => {
    if (windSpeed === 0) return;

    const size = Math.max(50, canvasSize / 12);
    const margin = Math.max(15, canvasSize / 40);
    
    const center: Point = {
      x: margin + size / 2,
      y: margin + size / 2
    };

    // Простой круг
    ctx.fillStyle = 'rgba(255, 215, 0, 0.1)';
    ctx.strokeStyle = styles.wind.border;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(center.x, center.y, size / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // Стрелка ветра (метеорологический - откуда дует)
    const windAngleRad = toRadians(windDirection);
    const windLength = (size / 2 - 10) * Math.min(windSpeed / 50, 1);
    
    const windEnd = {
      x: center.x + Math.sin(windAngleRad) * windLength,
      y: center.y - Math.cos(windAngleRad) * windLength
    };

    // Линия ветра
    ctx.strokeStyle = styles.wind.arrow;
    ctx.lineWidth = Math.max(3, (windSpeed / 50) * 5);
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(windEnd.x, windEnd.y);
    ctx.stroke();

    // Информация о ветре
    ctx.fillStyle = styles.wind.text;
    const mainFontSize = Math.max(12, canvasSize / 50);
    ctx.font = `bold ${mainFontSize}px "Exo 2", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    ctx.fillText(`${windDirection}°`, center.x, center.y - mainFontSize * 0.8);
    
    const speedFontSize = Math.max(10, canvasSize / 60);
    ctx.font = `bold ${speedFontSize}px "Share Tech Mono", monospace`;
    ctx.fillText(`${windSpeed} км/ч`, center.x, center.y + mainFontSize * 0.8);
  }, [windDirection, windSpeed, styles, canvasSize]);

  const drawArrow = useCallback((ctx: CanvasRenderingContext2D, from: Point, to: Point, color: string) => {
    const centeredFrom = getCenteredPoint(from);
    const centeredTo = getCenteredPoint(to);
    
    const headLength = Math.max(12, canvasSize / 50);
    const angle = Math.atan2(centeredTo.y - centeredFrom.y, centeredTo.x - centeredFrom.x);
    
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = Math.max(3, canvasSize / 200);
    ctx.lineCap = 'round';
    
    // Линия маршрута
    ctx.beginPath();
    ctx.moveTo(centeredFrom.x, centeredFrom.y);
    ctx.lineTo(centeredTo.x, centeredTo.y);
    ctx.stroke();
    
    // Стрелка
    ctx.beginPath();
    ctx.moveTo(centeredTo.x, centeredTo.y);
    ctx.lineTo(
      centeredTo.x - headLength * Math.cos(angle - Math.PI / 6),
      centeredTo.y - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      centeredTo.x - headLength * Math.cos(angle + Math.PI / 6),
      centeredTo.y - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
  }, [getCenteredPoint, canvasSize]);

  const drawDriftIndicator = useCallback((
    ctx: CanvasRenderingContext2D, 
    from: Point, 
    to: Point, 
    driftAngle: number
  ) => {
    const centeredFrom = getCenteredPoint(from);
    const centeredTo = getCenteredPoint(to);

    const midPoint = {
      x: (centeredFrom.x + centeredTo.x) / 2,
      y: (centeredFrom.y + centeredTo.y) / 2
    };

    const angle = Math.atan2(centeredTo.y - centeredFrom.y, centeredTo.x - centeredFrom.x);
    const perpendicularAngle = angle + (driftAngle > 0 ? -Math.PI / 2 : Math.PI / 2);
    const driftLength = Math.max(25, canvasSize / 20);
    
    const driftEnd = {
      x: midPoint.x + Math.cos(perpendicularAngle) * driftLength,
      y: midPoint.y + Math.sin(perpendicularAngle) * driftLength
    };

    // Линия сноса
    ctx.strokeStyle = driftAngle > 0 ? styles.drift.positive : styles.drift.negative;
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(midPoint.x, midPoint.y);
    ctx.lineTo(driftEnd.x, driftEnd.y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Подпись угла сноса
    ctx.fillStyle = driftAngle > 0 ? styles.drift.positive : styles.drift.negative;
    const fontSize = Math.max(10, canvasSize / 70);
    ctx.font = `bold ${fontSize}px "Share Tech Mono", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const labelPoint = {
      x: midPoint.x + Math.cos(perpendicularAngle) * (driftLength / 2),
      y: midPoint.y + Math.sin(perpendicularAngle) * (driftLength / 2)
    };
    
    ctx.fillStyle = styles.background.overlay;
    ctx.fillRect(labelPoint.x - 15, labelPoint.y - 6, 30, 12);
    
    ctx.fillStyle = driftAngle > 0 ? styles.drift.positive : styles.drift.negative;
    ctx.fillText(
      `УС ${driftAngle > 0 ? '+' : ''}${Math.round(driftAngle)}°`,
      labelPoint.x,
      labelPoint.y
    );
  }, [getCenteredPoint, styles, canvasSize]);

  const drawMeasurements = useCallback((ctx: CanvasRenderingContext2D, legs: VisualizedLeg[]) => {
    if (!showMeasurements || legs.length < 2) return;

    let currentPoint: Point = { x: 0, y: 0 };
    const maxDistance = Math.max(...legs.map(leg => leg.distance), 1);

    legs.forEach((leg, index) => {
      if (index === 0) return;

      const trueHeading = magneticToTrue(leg.magneticHeading, magneticDeclination);
      const segmentLength = normalizeLength(leg.distance, maxDistance, canvasSize * 0.3);
      
      const angleRad = toRadians(trueHeading);
      const endPoint: Point = {
        x: currentPoint.x + segmentLength * Math.sin(angleRad),
        y: currentPoint.y - segmentLength * Math.cos(angleRad)
      };

      const centeredFrom = getCenteredPoint(currentPoint);
      const centeredTo = getCenteredPoint(endPoint);

      // Линия измерения
      ctx.strokeStyle = styles.measurement.line;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(centeredFrom.x, centeredFrom.y);
      ctx.lineTo(centeredTo.x, centeredTo.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Подпись расстояния
      const midPoint = {
        x: (centeredFrom.x + centeredTo.x) / 2,
        y: (centeredFrom.y + centeredTo.y) / 2
      };

      const fontSize = Math.max(10, canvasSize / 70);
      ctx.font = `${fontSize}px "Share Tech Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      ctx.fillStyle = styles.background.overlay;
      const text = `${leg.distance} км`;
      const textWidth = ctx.measureText(text).width;
      ctx.fillRect(midPoint.x - textWidth / 2 - 4, midPoint.y - 8, textWidth + 8, 16);
      
      ctx.fillStyle = styles.measurement.text;
      ctx.fillText(text, midPoint.x, midPoint.y);

      currentPoint = endPoint;
    });
  }, [magneticDeclination, getCenteredPoint, styles, showMeasurements, canvasSize]);

  const drawPoint = useCallback((ctx: CanvasRenderingContext2D, point: Point, color: string, label: string, isImportant = false) => {
    const radius = isImportant ? Math.max(8, canvasSize / 75) : Math.max(6, canvasSize / 100);
    const centeredPoint = getCenteredPoint(point);

    // Точка
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(centeredPoint.x, centeredPoint.y, radius, 0, 2 * Math.PI);
    ctx.fill();

    // Обводка
    ctx.strokeStyle = '#0a192f';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Подпись
    ctx.fillStyle = styles.background.overlay;
    const fontSize = Math.max(10, canvasSize / 70);
    ctx.font = isImportant ? `bold ${fontSize}px "Exo 2", sans-serif` : `${fontSize}px "Exo 2", sans-serif`;
    const textWidth = ctx.measureText(label).width;
    ctx.fillRect(
      centeredPoint.x - textWidth / 2 - 4,
      centeredPoint.y + radius + 3,
      textWidth + 8,
      fontSize + 6
    );

    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(label, centeredPoint.x, centeredPoint.y + radius + 5);
  }, [getCenteredPoint, styles, canvasSize]);

  const drawRoute = useCallback((ctx: CanvasRenderingContext2D, legs: VisualizedLeg[]) => {
    if (legs.length < 2) return;

    let currentPoint: Point = { x: 0, y: 0 };
    const maxDistance = Math.max(...legs.map(leg => leg.distance), 1);

    // Рисуем взлет
    drawPoint(ctx, currentPoint, styles.route.takeoff, 'ВЗЛЕТ', true);

    // Рисуем маршрут через все точки кроме посадки
    for (let i = 1; i < legs.length - 1; i++) {
      const leg = legs[i];
      const trueHeading = magneticToTrue(leg.magneticHeading, magneticDeclination);
      const segmentLength = normalizeLength(leg.distance, maxDistance, canvasSize * 0.3);
      
      const angleRad = toRadians(trueHeading);
      const endPoint: Point = {
        x: currentPoint.x + segmentLength * Math.sin(angleRad),
        y: currentPoint.y - segmentLength * Math.cos(angleRad)
      };

      // Рисуем линию участка со стрелкой
      drawArrow(ctx, currentPoint, endPoint, styles.route.line);

      // Рисуем вектор сноса если есть значительный угол
      if (Math.abs(leg.driftAngle) > 0.5) {
        drawDriftIndicator(ctx, currentPoint, endPoint, leg.driftAngle);
      }

      // Рисуем точку ППМ
      drawPoint(ctx, endPoint, styles.route.waypoint, leg.name, false);

      currentPoint = endPoint;
    }

    // Рисуем посадку
    if (legs.length > 1) {
      const lastLeg = legs[legs.length - 1];
      const trueHeading = magneticToTrue(lastLeg.magneticHeading, magneticDeclination);
      const segmentLength = normalizeLength(lastLeg.distance, maxDistance, canvasSize * 0.3);
      
      const angleRad = toRadians(trueHeading);
      const landingPoint: Point = {
        x: currentPoint.x + segmentLength * Math.sin(angleRad),
        y: currentPoint.y - segmentLength * Math.cos(angleRad)
      };

      drawPoint(ctx, landingPoint, styles.route.landing, 'ПОСАДКА', true);
    }
  }, [
    magneticDeclination, 
    drawPoint, 
    drawArrow,
    drawDriftIndicator,
    styles, 
    canvasSize
  ]);

  const drawRouteInfo = useCallback((ctx: CanvasRenderingContext2D) => {
    if (legs.length < 2) return;

    const totalDistance = legs.reduce((sum, leg) => sum + leg.distance, 0);
    const totalTime = legs.reduce((sum, leg) => sum + leg.legTime, 0);
    
    const infoLines = [
      `Участков: ${legs.length - 2}`,
      `Общее расстояние: ${totalDistance.toFixed(1)} км`,
      `Общее время: ${Math.round(totalTime)} мин`
    ];

    const margin = Math.max(10, canvasSize / 60);
    const fontSize = Math.max(10, canvasSize / 70);
    
    ctx.fillStyle = styles.background.overlay;
    ctx.strokeStyle = styles.grid.border;
    ctx.lineWidth = 1;
    
    const boxWidth = 180;
    const boxHeight = infoLines.length * (fontSize + 5) + 10;
    const boxX = margin;
    const boxY = canvasSize - boxHeight - margin;
    
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    ctx.fillStyle = '#e6f1ff';
    ctx.font = `${fontSize}px "Share Tech Mono", monospace`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    infoLines.forEach((line, index) => {
      ctx.fillText(line, boxX + 8, boxY + 8 + index * (fontSize + 5));
    });
  }, [legs, canvasSize, styles]);

  const drawScale = useCallback((ctx: CanvasRenderingContext2D) => {
    const margin = Math.max(10, canvasSize / 60);
    const scaleWidth = 100;
    const scaleHeight = 4;
    
    const scaleX = canvasSize - margin - scaleWidth;
    const scaleY = canvasSize - margin - 20;

    ctx.strokeStyle = '#e6f1ff';
    ctx.lineWidth = scaleHeight;
    
    ctx.beginPath();
    ctx.moveTo(scaleX, scaleY);
    ctx.lineTo(scaleX + scaleWidth, scaleY);
    ctx.stroke();

    ctx.strokeStyle = '#e6f1ff';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(scaleX, scaleY - 5);
    ctx.lineTo(scaleX, scaleY + 5);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(scaleX + scaleWidth, scaleY - 5);
    ctx.lineTo(scaleX + scaleWidth, scaleY + 5);
    ctx.stroke();

    ctx.fillStyle = '#e6f1ff';
    const fontSize = Math.max(9, canvasSize / 80);
    ctx.font = `${fontSize}px "Share Tech Mono", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    ctx.fillText('100 км', scaleX + scaleWidth / 2, scaleY + 8);
  }, [canvasSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Очистка canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем элементы в правильном порядке
    drawBackground(ctx);
    drawGrid(ctx);
    drawRoute(ctx, legs);
    drawMeasurements(ctx, legs);
    
    // ИНДИКАТОРЫ - всегда отображаются
    drawNorthIndicator(ctx);
    drawWindIndicator(ctx);
    
    drawRouteInfo(ctx);
    drawScale(ctx);

    // Граница
    ctx.strokeStyle = styles.grid.border;
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvasSize, canvasSize);

  }, [
    legs, magneticDeclination, windDirection, windSpeed, canvasSize, 
    showGrid, showMeasurements,
    drawBackground, drawGrid, drawRoute, drawNorthIndicator, 
    drawWindIndicator, drawRouteInfo, drawScale, drawMeasurements, styles
  ]);

  return (
    <VisualizationContainer ref={containerRef}>
      <VisualizationHeader>
        <VisualizationTitle>🗺️ Схема маршрута</VisualizationTitle>
        <ControlsPanel>
          <ControlGroup>
            <label>Магнитное склонение ΔМ:</label>
            <Input
              type="number"
              value={magneticDeclination}
              onChange={(e) => {
                let value = Number(e.target.value);
                if (value < -180) value = -180;
                if (value > 180) value = 180;
                setMagneticDeclination(value);
              }}
              onBlur={(e) => {
                let value = Number(e.target.value);
                if (value < -180) value = -180;
                if (value > 180) value = 180;
                if (isNaN(value)) value = 0;
                setMagneticDeclination(value);
              }}
              min="-180"
              max="180"
              step="1"
            />°
          </ControlGroup>
          
          <ControlGroup>
            <label>
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
                style={{ marginRight: '0.5rem' }}
              />
              Сетка
            </label>
          </ControlGroup>
          
          <ControlGroup>
            <label>
              <input
                type="checkbox"
                checked={showMeasurements}
                onChange={(e) => setShowMeasurements(e.target.checked)}
                style={{ marginRight: '0.5rem' }}
              />
              Измерения
            </label>
          </ControlGroup>
        </ControlsPanel>
      </VisualizationHeader>

      <CanvasContainer style={{ height: `${canvasSize}px` }}>
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          style={{
            display: 'block',
            margin: '0 auto',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      </CanvasContainer>

      <Legend>
        <LegendItem>
          <ColorSwatch color={styles.route.takeoff} />
          <span>Взлет</span>
        </LegendItem>
        <LegendItem>
          <ColorSwatch color={styles.route.waypoint} />
          <span>ППМ (Поворотные пункты маршрута)</span>
        </LegendItem>
        <LegendItem>
          <ColorSwatch color={styles.route.landing} />
          <span>Посадка</span>
        </LegendItem>
        <LegendItem>
          <ColorSwatch color="#ffd700" />
          <span>Ветер (метеорологический)</span>
        </LegendItem>
        <LegendItem>
          <ColorSwatch color={styles.north.arrow} />
          <span>Истинный север</span>
        </LegendItem>
        <LegendItem>
          <ColorSwatch color={styles.drift.positive} />
          <span>УС+ (Правый снос)</span>
        </LegendItem>
        <LegendItem>
          <ColorSwatch color={styles.drift.negative} />
          <span>УС- (Левый снос)</span>
        </LegendItem>
      </Legend>
    </VisualizationContainer>
  );
};