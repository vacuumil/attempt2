// src/components/meteorology/components/AirportSelector/AirportSelector.tsx
import React, { useState, useMemo } from 'react';
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
import { searchAirports } from '../../utils/airportDatabase';

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
  const [isInputActive, setIsInputActive] = useState(false);

  const suggestions = useMemo(() => {
    if (!icaoCode || icaoCode.length < 1) return [];
    
    return searchAirports(icaoCode, 5);
  }, [icaoCode]);

  // Валидация ICAO кода
  const validateIcaoCode = (code: string): boolean => {
    const codeUpper = code.toUpperCase().trim();
    return codeUpper.length === 4 && /^[A-Z]{4}$/.test(codeUpper);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    
    if (!icaoCode.trim()) {
      setLocalError('Введите ICAO код аэропорта');
      return;
    }
    
    if (!validateIcaoCode(icaoCode)) {
      setLocalError('Введите корректный ICAO код (4 буквы)');
      return;
    }
    
    setLocalError(null);
    onSearch(icaoCode.trim().toUpperCase());
  };

  const handleInputChange = (value: string) => {
    setLocalError(null);
    onCodeChange(value.toUpperCase());
    setShowSuggestions(value.length >= 1);
  };

  const handleSuggestionClick = (icao: string) => {
    // Всегда заменяем текущее значение, даже если поле не пустое
    onCodeChange(icao);
    setShowSuggestions(false);
    setLocalError(null);
    // Автоматически выполняем поиск при выборе из подсказок
    onSearch(icao);
  };

  const handleRecentClick = (code: string) => {
    // Всегда заменяем текущее значение при выборе из недавних
    onCodeChange(code);
    setShowSuggestions(false);
    setLocalError(null);
    // Автоматически выполняем поиск
    onSearch(code);
  };

  const handleModalSelect = (icao: string) => {
    // Всегда заменяем текущее значение при выборе из модального окна
    onCodeChange(icao);
    setShowModal(false);
    setLocalError(null);
    // Автоматически выполняем поиск
    onSearch(icao);
  };

  const handleInputFocus = () => {
    setIsInputActive(true);
    // Показываем подсказки если есть текст
    if (icaoCode.length >= 1) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    setIsInputActive(false);
    // Небольшая задержка чтобы успеть кликнуть на подсказку
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleClearInput = () => {
    onCodeChange('');
    setLocalError(null);
    setShowSuggestions(false);
  };

  const handleSelectAllText = (e: React.FocusEvent<HTMLInputElement>) => {
    // При фокусе выделяем весь текст для удобства замены
    e.target.select();
  };

  // Показываем подсказки только если поле активно и есть что искать
  const shouldShowSuggestions = showSuggestions && isInputActive && suggestions.length > 0;

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
              <div style={{ position: 'relative' }}>
                <AirportInput
                  id="airport-code"
                  type="text"
                  value={icaoCode}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onFocus={(e) => {
                    handleInputFocus();
                    handleSelectAllText(e);
                  }}
                  onBlur={handleInputBlur}
                  placeholder="Например: UUEE"
                  maxLength={4}
                  disabled={loading}
                  style={{ 
                    borderColor: localError ? '#ff6b6b' : '#1a6fc4',
                    paddingRight: icaoCode ? '40px' : '16px'
                  }}
                />
                {icaoCode && (
                  <button
                    type="button"
                    onClick={handleClearInput}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#8892b0',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ff6b6b';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#8892b0';
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
              
              {shouldShowSuggestions && (
                <SuggestionsList>
                  {suggestions.map((airport) => (
                    <SuggestionItem
                      key={airport.icao}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSuggestionClick(airport.icao)}
                    >
                      <strong>{airport.icao}</strong> - {airport.name}, {airport.country}
                    </SuggestionItem>
                  ))}
                </SuggestionsList>
              )}
            </div>
            
            <SearchButton 
              type="submit" 
              disabled={loading || !icaoCode.trim()}
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
                style={{
                  opacity: code === icaoCode ? 0.6 : 1
                }}
                title={code === icaoCode ? 'Текущий аэропорт' : `Выбрать ${code}`}
              >
                ✈️ {code} {code === icaoCode && '✓'}
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