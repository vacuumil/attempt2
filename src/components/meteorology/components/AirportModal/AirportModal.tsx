// src/components/meteorology/components/AirportModal/AirportModal.tsx
import React from 'react';
import { ModalOverlay, ModalContent, AirportGrid, AirportCard, CloseButton } from './AirportModal.styles';
import { LOCAL_AIRPORT_DATABASE } from '../../utils/airportDatabase';

interface Airport {
  icao: string;
  name: string;
  country: string;
}

interface AirportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (icao: string) => void;
}

// Используем расширенную базу данных
const POPULAR_AIRPORTS: Airport[] = LOCAL_AIRPORT_DATABASE;

export const AirportModal: React.FC<AirportModalProps> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  const handleAirportSelect = (icao: string) => {
    onSelect(icao);
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#64ffda', fontFamily: 'Orbitron, sans-serif' }}>
            ✈️ Выбор аэропорта
          </h2>
          <CloseButton onClick={onClose}>×</CloseButton>
        </div>
        
        <p style={{ color: '#8892b0', marginBottom: '20px', fontFamily: 'Rajdhani, sans-serif' }}>
          Выберите аэропорт из списка. Выбранный аэропорт заменит текущий в поле ввода.
        </p>
        
        <AirportGrid>
          {POPULAR_AIRPORTS.map((airport) => (
            <AirportCard
              key={airport.icao}
              onClick={() => handleAirportSelect(airport.icao)}
              style={{
                borderColor: '#1a6fc4',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#64ffda';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1a6fc4';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>✈️</div>
              <div style={{ fontWeight: 'bold', color: '#64ffda', fontFamily: 'Share Tech Mono, monospace' }}>
                {airport.icao}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#e6f1ff' }}>{airport.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#8892b0' }}>{airport.country}</div>
            </AirportCard>
          ))}
        </AirportGrid>
      </ModalContent>
    </ModalOverlay>
  );
};