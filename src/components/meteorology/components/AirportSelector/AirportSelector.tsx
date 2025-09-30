// src/components/meteorology/components/AirportSelector/AirportSelector.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { 
  SelectorContainer, 
  InputGroup, 
  AirportInput, 
  SearchButton, 
  RecentAirports, 
  RecentButton,
  Label,
  SuggestionsList,
  SuggestionItem,
  ModalButton
} from './AirportSelector.styles';
import { AirportModal } from '../AirportModal/AirportModal';

// Расширенная база данных аэропортов
const AIRPORT_DATABASE = [
  { icao: 'UUEE', name: 'Шереметьево, Москва' },
  { icao: 'UUDD', name: 'Домодедово, Москва' },
  { icao: 'UUWW', name: 'Внуково, Москва' },
  { icao: 'URSS', name: 'Сочи' },
  { icao: 'URMM', name: 'Минеральные Воды' },
  { icao: 'URKK', name: 'Краснодар' },
  { icao: 'USSS', name: 'Екатеринбург' },
  { icao: 'UWGG', name: 'Нижний Новгород' },
  { icao: 'UWWW', name: 'Самара' },
  { icao: 'UNNT', name: 'Толмачево, Новосибирск' },
  { icao: 'ULLI', name: 'Пулково, Санкт-Петербург' },
  { icao: 'UHWW', name: 'Владивосток' },
  { icao: 'UHHH', name: 'Хабаровск' },
  { icao: 'UWKS', name: 'Курган' },
  { icao: 'UOOO', name: 'Новый Уренгой' },
  { icao: 'KJFK', name: 'JFK, Нью-Йорк' },
  { icao: 'KLAX', name: 'Лос-Анджелес' },
  { icao: 'EGLL', name: 'Хитроу, Лондон' },
  { icao: 'LFPG', name: 'Шарль де Голль, Париж' },
  { icao: 'EDDF', name: 'Франкфурт' },
  { icao: 'UAAA', name: 'Алматы, Казахстан' },
  { icao: 'ZBAA', name: 'Пекин Столичный, Китай' },
  { icao: 'RJTT', name: 'Токио Ханэда, Япония' },
];

interface AirportSelectorProps {
  icaoCode: string;
  onCodeChange: (code: string) => void;
  onSearch: (code: string) => void;
  recentAirports: string[];
  loading: boolean;
}

export const AirportSelector: React.FC<AirportSelectorProps> = ({
  icaoCode,
  onCodeChange,
  onSearch,
  recentAirports,
  loading
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState(icaoCode);

  // Синхронизация с внешним состоянием
  useEffect(() => {
    setInputValue(icaoCode);
  }, [icaoCode]);

  const suggestions = useMemo(() => {
    if (!inputValue || inputValue.length < 2) return [];
    
    return AIRPORT_DATABASE.filter(airport =>
      airport.icao.toLowerCase().includes(inputValue.toLowerCase()) ||
      airport.name.toLowerCase().includes(inputValue.toLowerCase())
    ).slice(0, 5);
  }, [inputValue]);

  // Валидация ICAO кода
  const validateIcaoCode = (code: string): boolean => {
    const codeUpper = code.toUpperCase().trim();
    return codeUpper.length === 4 && /^[A-Z]{4}$/.test(codeUpper);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    
    const codeToSearch = inputValue.trim().toUpperCase();
    
    if (!codeToSearch) {
      setLocalError('Введите ICAO код аэропорта');
      return;
    }
    
    if (!validateIcaoCode(codeToSearch)) {
      setLocalError('Введите корректный ICAO код (4 буквы)');
      return;
    }
    
    setLocalError(null);
    onSearch(codeToSearch);
  };

  const handleInputChange = (value: string) => {
    const upperValue = value.toUpperCase();
    setInputValue(upperValue);
    onCodeChange(upperValue);
    setShowSuggestions(value.length >= 2);
    setLocalError(null);
  };

  const handleSuggestionClick = (icao: string) => {
    setInputValue(icao);
    onCodeChange(icao);
    setShowSuggestions(false);
    setLocalError(null);
    onSearch(icao);
  };

  const handleRecentClick = (code: string) => {
    setInputValue(code);
    onCodeChange(code);
    setShowSuggestions(false);
    setLocalError(null);
    onSearch(code);
  };

  const handleModalSelect = (icao: string) => {
    setInputValue(icao);
    onCodeChange(icao);
    setShowModal(false);
    setLocalError(null);
    onSearch(icao);
  };

  return (
    <>
      <SelectorContainer>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="airport-code">
            <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>✈️</span>
            Введите ICAO код аэродрома:
          </Label>
          
          <InputGroup>
            <div style={{ position: 'relative', flex: 1 }}>
              <AirportInput
                id="airport-code"
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={() => setShowSuggestions(inputValue.length >= 2)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Например: UUEE"
                maxLength={4}
                disabled={loading}
                style={{ 
                  borderColor: localError ? '#ff6b6b' : '#1a6fc4' 
                }}
              />
              
              {showSuggestions && suggestions.length > 0 && (
                <SuggestionsList>
                  {suggestions.map((airport) => (
                    <SuggestionItem
                      key={airport.icao}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSuggestionClick(airport.icao)}
                    >
                      <strong>{airport.icao}</strong> - {airport.name}
                    </SuggestionItem>
                  ))}
                </SuggestionsList>
              )}
            </div>
            
            <SearchButton 
              type="submit" 
              disabled={loading}
            >
              {loading ? '⏳ Загрузка...' : '🔍 Поиск'}
            </SearchButton>
          </InputGroup>

          {localError && (
            <div style={{ 
              color: '#ff6b6b', 
              fontSize: '0.9rem', 
              textAlign: 'center',
              marginTop: '10px'
            }}>
              {localError}
            </div>
          )}
        </form>

        <div style={{ textAlign: 'center', margin: '15px 0' }}>
          <ModalButton 
            type="button"
            onClick={() => setShowModal(true)}
            disabled={loading}
          >
            📋 Выбрать из списка аэропортов
          </ModalButton>
        </div>

        {recentAirports.length > 0 && (
          <RecentAirports>
            <span>Недавние запросы: </span>
            {recentAirports.map((code) => (
              <RecentButton
                key={code}
                type="button"
                onClick={() => handleRecentClick(code)}
                disabled={loading}
              >
                ✈️ {code}
              </RecentButton>
            ))}
          </RecentAirports>
        )}
      </SelectorContainer>

      <AirportModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSelect={handleModalSelect}
      />
    </>
  );
};