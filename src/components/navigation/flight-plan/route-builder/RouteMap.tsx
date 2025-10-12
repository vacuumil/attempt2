// components/navigation/flight-plan/route-builder/RouteMap.tsx
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { 
  MapContainer, 
  Canvas, 
  MapControls, 
  ControlButton,
  WaypointTooltip,
  ScaleIndicator
} from './RouteMap.styles';
import { waypoints, type Waypoint } from './data/waypoints';
import { convertToCartesian, isPointInCircle, calculateRouteLegs } from './utils/calculations';
import { getWaypointIcon, getWaypointColor, formatDistance, formatBearing } from './utils/helpers';

interface RouteMapProps {
  selectedWaypoints: Waypoint[];
  onWaypointSelect: (waypoint: Waypoint) => void;
  onWaypointAdd: (waypoint: Waypoint) => void;
}

export const RouteMap: React.FC<RouteMapProps> = ({ 
  selectedWaypoints, 
  onWaypointSelect, 
  onWaypointAdd 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(2.5);
  const [tooltip, setTooltip] = useState<{ waypoint: Waypoint; x: number; y: number } | null>(null);
  const [mapSize, setMapSize] = useState(600);

  // Адаптивный размер карты
  useEffect(() => {
    const updateMapSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const maxSize = Math.min(containerWidth - 40, 800);
        const minSize = 400;
        const newSize = Math.max(minSize, maxSize);
        setMapSize(newSize);
      }
    };

    updateMapSize();
    window.addEventListener('resize', updateMapSize);
    
    return () => window.removeEventListener('resize', updateMapSize);
  }, []);
  
  const center = useMemo(() => ({ 
    x: mapSize / 2, 
    y: mapSize / 2 
  }), [mapSize]);

  // Расчет параметров маршрута
  const routeLegs = useMemo(() => {
    return calculateRouteLegs(selectedWaypoints);
  }, [selectedWaypoints]);

  // Отрисовка карты
  const drawMap = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Очистка canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Фон с градиентом
    const gradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, mapSize / 2);
    gradient.addColorStop(0, 'rgba(10, 25, 47, 0.95)');
    gradient.addColorStop(0.5, 'rgba(17, 34, 64, 0.9)');
    gradient.addColorStop(1, 'rgba(23, 42, 70, 0.85)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Концентрические круги расстояний
    ctx.strokeStyle = 'rgba(100, 255, 218, 0.2)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([]);

    for (let distance = 20; distance <= 100; distance += 20) {
      ctx.beginPath();
      ctx.arc(center.x, center.y, distance * scale, 0, 2 * Math.PI);
      ctx.stroke();

      // Подписи расстояний
      ctx.fillStyle = 'rgba(100, 255, 218, 0.8)';
      const fontSize = Math.max(10, mapSize / 60);
      ctx.font = `bold ${fontSize}px "Share Tech Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${distance} км`, center.x, center.y - distance * scale - 12);
    }

    // Основные направления (N, E, S, W)
    ctx.strokeStyle = 'rgba(100, 255, 218, 0.3)';
    ctx.lineWidth = 1.5;
    
    const directions = [
      { angle: 0, label: 'N' },
      { angle: 90, label: 'E' },
      { angle: 180, label: 'S' },
      { angle: 270, label: 'W' }
    ];

    directions.forEach(({ angle, label }) => {
      const angleRad = (angle - 90) * Math.PI / 180;
      const endX = center.x + Math.cos(angleRad) * 110 * scale;
      const endY = center.y + Math.sin(angleRad) * 110 * scale;

      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Подписи направлений
      const labelX = center.x + Math.cos(angleRad) * (120 * scale + 20);
      const labelY = center.y + Math.sin(angleRad) * (120 * scale + 20);

      ctx.fillStyle = 'rgba(100, 255, 218, 0.9)';
      const fontSize = Math.max(14, mapSize / 45);
      ctx.font = `bold ${fontSize}px "Exo 2", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, labelX, labelY);
    });

    // Отрисовка маршрута с информацией
    if (selectedWaypoints.length > 1) {
      // Линия маршрута
      ctx.strokeStyle = '#64ffda';
      ctx.lineWidth = Math.max(3, mapSize / 150);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.setLineDash([]);

      ctx.beginPath();
      
      selectedWaypoints.forEach((waypoint: Waypoint, index: number) => {
        const coords = convertToCartesian(waypoint, center, scale);
        if (index === 0) {
          ctx.moveTo(coords.x, coords.y);
        } else {
          ctx.lineTo(coords.x, coords.y);
        }
      });

      ctx.stroke();

      // Стрелки направления и подписи участков
      routeLegs.forEach((leg, index) => {
        if (index < selectedWaypoints.length - 1) {
          const from = selectedWaypoints[index];
          const to = selectedWaypoints[index + 1];
          const fromCoords = convertToCartesian(from, center, scale);
          const toCoords = convertToCartesian(to, center, scale);

          // Расчет середины отрезка
          const midX = (fromCoords.x + toCoords.x) / 2;
          const midY = (fromCoords.y + toCoords.y) / 2;

          // Расчет угла
          const angle = Math.atan2(toCoords.y - fromCoords.y, toCoords.x - fromCoords.x);

          // Стрелка направления
          ctx.fillStyle = '#64ffda';
          const arrowSize = Math.max(10, mapSize / 60);
          ctx.beginPath();
          ctx.moveTo(midX, midY);
          ctx.lineTo(
            midX - arrowSize * Math.cos(angle - Math.PI / 6),
            midY - arrowSize * Math.sin(angle - Math.PI / 6)
          );
          ctx.lineTo(
            midX - arrowSize * Math.cos(angle + Math.PI / 6),
            midY - arrowSize * Math.sin(angle + Math.PI / 6)
          );
          ctx.closePath();
          ctx.fill();

          // Подпись участка
          const labelX = midX + Math.cos(angle + Math.PI / 2) * 25;
          const labelY = midY + Math.sin(angle + Math.PI / 2) * 25;

          ctx.fillStyle = 'rgba(10, 25, 47, 0.95)';
          const fontSize = Math.max(10, mapSize / 70);
          ctx.font = `bold ${fontSize}px "Share Tech Mono", monospace`;
          const text = `${leg.distance}км`;
          const textWidth = ctx.measureText(text).width;
          ctx.fillRect(labelX - textWidth / 2 - 6, labelY - 10, textWidth + 12, 20);
          
          ctx.fillStyle = '#64ffda';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(text, labelX, labelY);
        }
      });
    }

    // Отрисовка всех ППМ
    waypoints.forEach((waypoint: Waypoint) => {
      const coords = convertToCartesian(waypoint, center, scale);
      const isSelected = selectedWaypoints.some(wp => wp.id === waypoint.id);
      const color = getWaypointColor(waypoint.type);
      const radius = isSelected ? Math.max(8, mapSize / 80) : Math.max(6, mapSize / 100);

      // Подсветка выбранных точек
      if (isSelected) {
        ctx.fillStyle = color + '40';
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, radius + 8, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Внешнее кольцо для лучшей видимости
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(coords.x, coords.y, radius + 3, 0, 2 * Math.PI);
      ctx.fill();

      // Основная точка
      ctx.fillStyle = '#0a192f';
      ctx.beginPath();
      ctx.arc(coords.x, coords.y, radius, 0, 2 * Math.PI);
      ctx.fill();

      // Иконка
      ctx.fillStyle = color;
      const iconSize = Math.max(14, mapSize / 50);
      ctx.font = `${iconSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(getWaypointIcon(waypoint.type), coords.x, coords.y);

      // Подпись для всех точек
      ctx.fillStyle = color;
      const labelSize = Math.max(10, mapSize / 70);
      ctx.font = isSelected ? `bold ${labelSize}px "Exo 2", sans-serif` : `${labelSize}px "Exo 2", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      
      const labelY = coords.y + radius + 10;
      ctx.fillText(waypoint.code, coords.x, labelY);

      // Дополнительная информация для выбранных точек
      if (isSelected) {
        const index = selectedWaypoints.findIndex(wp => wp.id === waypoint.id);
        if (index >= 0) {
          ctx.fillStyle = '#64ffda';
          const indexSize = Math.max(11, mapSize / 65);
          ctx.font = `bold ${indexSize}px "Share Tech Mono", monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillText(`${index + 1}`, coords.x, coords.y - radius - 6);
        }
      }
    });

  }, [selectedWaypoints, scale, center, mapSize, routeLegs]);

  // Обработчики взаимодействия
  const handleMapClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const clickedWaypoint = waypoints.find((waypoint: Waypoint) => {
      const coords = convertToCartesian(waypoint, center, scale);
      return isPointInCircle({ x: clickX, y: clickY }, coords, 15);
    });

    if (clickedWaypoint) {
      onWaypointSelect(clickedWaypoint);
    }
  };

  const handleMapDoubleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const clickedWaypoint = waypoints.find((waypoint: Waypoint) => {
      const coords = convertToCartesian(waypoint, center, scale);
      return isPointInCircle({ x: clickX, y: clickY }, coords, 15);
    });

    if (clickedWaypoint) {
      onWaypointAdd(clickedWaypoint);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const hoveredWaypoint = waypoints.find((waypoint: Waypoint) => {
      const coords = convertToCartesian(waypoint, center, scale);
      return isPointInCircle({ x: mouseX, y: mouseY }, coords, 12);
    });

    if (hoveredWaypoint) {
      setTooltip({ waypoint: hoveredWaypoint, x: mouseX, y: mouseY });
    } else {
      setTooltip(null);
    }
  };

  const handleWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const delta = -event.deltaY / 1000;
    setScale(prev => Math.max(1, Math.min(6, prev + delta)));
  };

  useEffect(() => {
    drawMap();
  }, [drawMap]);
  return (
    <MapContainer ref={containerRef}>
      <Canvas
        ref={canvasRef}
        width={mapSize}
        height={mapSize}
        onClick={handleMapClick}
        onDoubleClick={handleMapDoubleClick}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
        onMouseLeave={() => setTooltip(null)}
        style={{ 
          cursor: 'pointer',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
      />

      <MapControls>
        <ControlButton
          onClick={() => setScale(prev => Math.min(6, prev + 0.5))}
          title="Увеличить масштаб"
        >
          🔍+
        </ControlButton>
        <ControlButton
          onClick={() => setScale(prev => Math.max(1, prev - 0.5))}
          title="Уменьшить масштаб"
        >
          🔍-
        </ControlButton>
        <ControlButton
          onClick={() => setScale(2.5)}
          title="Сбросить масштаб"
        >
          🎯 Сброс
        </ControlButton>
      </MapControls>



      <ScaleIndicator>
        Масштаб: 1:{Math.round(100 / scale)}
      </ScaleIndicator>

      {tooltip && (
        <WaypointTooltip style={{ left: tooltip.x + 20, top: tooltip.y + 20 }}>
          <strong>{tooltip.waypoint.name}</strong>
          <div>📏 {formatBearing(tooltip.waypoint.coordinates.bearing)} / {formatDistance(tooltip.waypoint.coordinates.distance)}</div>
          <div>🎯 {tooltip.waypoint.code} • {tooltip.waypoint.type === 'airport' ? 'Аэродром' : 
                                            tooltip.waypoint.type === 'vor' ? 'VOR/DME' : 'ППМ'}</div>
          {tooltip.waypoint.frequency && (
            <div>📻 {tooltip.waypoint.frequency} MHz</div>
          )}
          {tooltip.waypoint.description && (
            <div>💡 {tooltip.waypoint.description}</div>
          )}
          <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#64ffda' }}>
            Клик - информация • Двойной клик - добавить в маршрут
          </div>
        </WaypointTooltip>
      )}
    </MapContainer>
  );
};