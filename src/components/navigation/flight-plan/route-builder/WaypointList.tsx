// components/navigation/flight-plan/route-builder/WaypointList.tsx
import React, { useState } from 'react';
import {
  ListContainer,
  ListHeader,
  SearchContainer,
  SearchInput,
  SearchIcon,
  WaypointsGrid,
  WaypointCard,
  WaypointHeader,
  WaypointName,
  WaypointInfo,
  SelectedWaypoints,
  SelectedHeader,
  SelectedList,
  SelectedItem,
  SelectedItemInfo,
  RemoveButton,
  EmptyState
} from './WaypointList.styles';
import { waypoints, type Waypoint } from './data/waypoints';
import { getWaypointIcon, getWaypointColor, formatDistance, formatBearing } from './utils/helpers';

interface WaypointListProps {
  selectedWaypoints: Waypoint[];
  onWaypointSelect: (waypoint: Waypoint) => void;
  onWaypointAdd: (waypoint: Waypoint) => void;
  onWaypointRemove: (waypointId: string) => void;
}

export const WaypointList: React.FC<WaypointListProps> = ({
  selectedWaypoints,
  onWaypointSelect,
  onWaypointAdd,
  onWaypointRemove
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<Waypoint['type'] | 'all'>('all');

  // Фильтрация ППМ
  const filteredWaypoints = waypoints.filter((waypoint: Waypoint) => {
    const matchesSearch = waypoint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         waypoint.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || waypoint.type === filterType;
    return matchesSearch && matchesType;
  });

  // Группировка по типу для статистики
  const waypointsByType = {
    all: waypoints.length,
    airport: waypoints.filter(wp => wp.type === 'airport').length,
    vor: waypoints.filter(wp => wp.type === 'vor').length,
    fix: waypoints.filter(wp => wp.type === 'fix').length
  };

  const isWaypointSelected = (waypoint: Waypoint) => {
    return selectedWaypoints.some(wp => wp.id === waypoint.id);
  };

  const getTypeDisplayName = (type: Waypoint['type']) => {
    switch (type) {
      case 'airport': return '🛬 Аэродром';
      case 'vor': return '📡 VOR/DME';
      case 'fix': return '📍 ППМ';
      default: return type;
    }
  };

  return (
    <ListContainer>
      <ListHeader>
        <div>
          <h3>🗺️ База данных ППМ</h3>
          <div style={{ color: '#8892b0', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            {filteredWaypoints.length} из {waypoints.length} точек
          </div>
        </div>
        <SearchContainer>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            type="text"
            placeholder="Поиск ППМ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>
      </ListHeader>

      {/* Фильтры по типу с подсчетом */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '0.5rem', 
        marginBottom: '1.5rem'
      }}>
        {[
          { type: 'all' as const, label: 'Все', count: waypointsByType.all },
          { type: 'airport' as const, label: 'Аэродромы', count: waypointsByType.airport },
          { type: 'vor' as const, label: 'VOR/DME', count: waypointsByType.vor },
          { type: 'fix' as const, label: 'ППМ', count: waypointsByType.fix }
        ].map(({ type, label, count }) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            style={{
              padding: '0.75rem 0.5rem',
              background: filterType === type ? 
                'linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%)' : 
                'rgba(17, 34, 64, 0.6)',
              color: filterType === type ? '#0a192f' : '#e6f1ff',
              border: `1px solid ${filterType === type ? '#64ffda' : '#1a6fc4'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <span>{label}</span>
            <span style={{
              fontSize: '0.7rem',
              opacity: 0.8,
              background: filterType === type ? 'rgba(10, 25, 47, 0.2)' : 'rgba(100, 255, 218, 0.1)',
              padding: '0.1rem 0.4rem',
              borderRadius: '10px'
            }}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Список доступных ППМ */}
      {filteredWaypoints.length > 0 ? (
        <WaypointsGrid>
          {filteredWaypoints.map((waypoint: Waypoint) => {
            const selected = isWaypointSelected(waypoint);
            const color = getWaypointColor(waypoint.type);
            
            return (
              <WaypointCard
                key={waypoint.id}
                selected={selected}
                onClick={() => onWaypointSelect(waypoint)}
                onDoubleClick={() => onWaypointAdd(waypoint)}
                style={{
                  cursor: 'pointer',
                  opacity: selected ? 0.8 : 1,
                  transform: selected ? 'scale(0.98)' : 'scale(1)',
                  transition: 'all 0.2s ease'
                }}
              >
                <WaypointHeader selected={selected}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="icon" style={{ 
                      color,
                      fontSize: '1.3rem'
                    }}>
                      {getWaypointIcon(waypoint.type)}
                    </span>
                    <div>
                      <span className="code" style={{ fontSize: '1.1rem' }}>
                        {waypoint.code}
                      </span>
                      <div style={{ 
                        fontSize: '0.7rem', 
                        color: selected ? 'rgba(10, 25, 47, 0.7)' : '#8892b0',
                        marginTop: '0.1rem'
                      }}>
                        {getTypeDisplayName(waypoint.type)}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '0.2rem'
                  }}>
                    <div style={{
                      fontSize: '0.8rem',
                      color: selected ? 'rgba(10, 25, 47, 0.8)' : '#64ffda',
                      fontWeight: 'bold'
                    }}>
                      {formatBearing(waypoint.coordinates.bearing)}
                    </div>
                    <div style={{
                      fontSize: '0.7rem',
                      color: selected ? 'rgba(10, 25, 47, 0.6)' : '#8892b0'
                    }}>
                      {formatDistance(waypoint.coordinates.distance)}
                    </div>
                  </div>
                </WaypointHeader>

                <WaypointName selected={selected}>
                  {waypoint.name}
                </WaypointName>

                {waypoint.frequency && (
                  <WaypointInfo selected={selected}>
                    <span style={{ color: selected ? 'rgba(10, 25, 47, 0.8)' : '#64ffda' }}>
                      📻
                    </span>
                    <strong>Частота:</strong> {waypoint.frequency} MHz
                  </WaypointInfo>
                )}

                {waypoint.elevation && (
                  <WaypointInfo selected={selected}>
                    <span style={{ color: selected ? 'rgba(10, 25, 47, 0.8)' : '#64ffda' }}>
                      ⛰️
                    </span>
                    <strong>Высота:</strong> {waypoint.elevation} м
                  </WaypointInfo>
                )}

                {waypoint.description && (
                  <WaypointInfo selected={selected} style={{ fontStyle: 'italic' }}>
                    {waypoint.description}
                  </WaypointInfo>
                )}

                <div style={{ 
                  marginTop: '1rem', 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '0.75rem',
                  borderTop: `1px solid ${selected ? 'rgba(10, 25, 47, 0.2)' : 'rgba(100, 255, 218, 0.1)'}`
                }}>
                  <span style={{
                    fontSize: '0.7rem',
                    color: selected ? 'rgba(10, 25, 47, 0.6)' : '#8892b0'
                  }}>
                    {selected ? '✅ В маршруте' : '💡 Клик - информация • Двойной клик - добавить'}
                  </span>
                  
                  {!selected && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onWaypointAdd(waypoint);
                      }}
                      style={{
                        background: 'linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%)',
                        border: 'none',
                        color: '#0a192f',
                        borderRadius: '6px',
                        padding: '0.4rem 0.8rem',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(100, 255, 218, 0.3)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      + Добавить
                    </button>
                  )}
                </div>
              </WaypointCard>
            );
          })}
        </WaypointsGrid>
      ) : (
        <EmptyState>
          <div className="icon">🔍</div>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>ППМ не найдены</p>
          <p style={{ fontSize: '0.9rem', color: '#8892b0' }}>
            Попробуйте изменить поисковый запрос или выберите другой фильтр
          </p>
        </EmptyState>
      )}

      {/* Выбранные ППМ */}
      <SelectedWaypoints>
        <SelectedHeader>
          <span>📋 Текущий маршрут</span>
          <span style={{ 
            fontSize: '0.8rem', 
            color: '#8892b0',
            fontWeight: 'normal'
          }}>
            {selectedWaypoints.length} точек
          </span>
        </SelectedHeader>

        {selectedWaypoints.length > 0 ? (
          <SelectedList>
            {selectedWaypoints.map((waypoint, index) => (
              <SelectedItem key={waypoint.id}>
                <SelectedItemInfo>
                  <div className="index" style={{
                    background: 'linear-gradient(135deg, #64ffda 0%, #1a6fc4 100%)',
                    color: '#0a192f',
                    fontWeight: 'bold'
                  }}>
                    {index + 1}
                  </div>
                  <div className="details">
                    <div className="name" style={{ fontWeight: '500' }}>
                      {waypoint.name}
                    </div>
                    <div className="code" style={{ fontSize: '0.8rem' }}>
                      {waypoint.code} • {formatBearing(waypoint.coordinates.bearing)} / {formatDistance(waypoint.coordinates.distance)}
                    </div>
                  </div>
                </SelectedItemInfo>

                <RemoveButton
                  onClick={() => onWaypointRemove(waypoint.id)}
                  title="Удалить из маршрута"
                  style={{
                    background: 'rgba(255, 107, 107, 0.1)',
                    border: '1px solid #ff6b6b',
                    color: '#ff6b6b',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 107, 107, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 107, 107, 0.1)';
                  }}
                >
                  ✕
                </RemoveButton>
              </SelectedItem>
            ))}
          </SelectedList>
        ) : (
          <EmptyState style={{ padding: '2rem 1rem' }}>
            <div className="icon">🗺️</div>
            <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Маршрут пуст</p>
            <p style={{ fontSize: '0.85rem', color: '#8892b0' }}>
              Выберите ППМ из списка выше для построения маршрута
            </p>
          </EmptyState>
        )}

        {selectedWaypoints.length > 0 && (
          <div style={{ 
            marginTop: '1rem', 
            padding: '0.75rem',
            background: 'rgba(100, 255, 218, 0.05)',
            borderRadius: '6px',
            border: '1px solid rgba(100, 255, 218, 0.1)',
            fontSize: '0.75rem',
            color: '#8892b0',
            textAlign: 'center'
          }}>
            <strong>💡 Управление:</strong> Используйте панель справа для изменения порядка точек
          </div>
        )}
      </SelectedWaypoints>
    </ListContainer>
  );
};