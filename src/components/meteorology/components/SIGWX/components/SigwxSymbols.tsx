// SigwxSymbols.tsx - обновляем стили для адаптивности
import React, { useState } from 'react';
import type { WeatherSymbol } from '../types/sigwx.types';
import { weatherSymbols } from '../data/weatherSymbols';

export const SigwxSymbols: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'weather', 'fronts', 'clouds', 'other'];
  
  const filteredSymbols = selectedCategory === 'all' 
    ? weatherSymbols 
    : weatherSymbols.filter(symbol => symbol.category === selectedCategory);

  return (
    <div style={{ padding: '0 10px' }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#64ffda',
        fontFamily: 'Rajdhani, sans-serif',
        marginBottom: '25px',
        fontSize: 'clamp(1.5rem, 4vw, 2rem)'
      }}>
        Библиотека символов SIGWX
      </h2>

      {/* Фильтры по категориям */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        justifyContent: 'center',
        marginBottom: '25px',
        flexWrap: 'wrap',
        padding: '0 10px'
      }}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              background: selectedCategory === category ? '#64ffda' : '#1a6fc4',
              color: selectedCategory === category ? '#0a192f' : '#e6f1ff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '15px',
              cursor: 'pointer',
              fontFamily: 'Exo 2, sans-serif',
              fontSize: 'clamp(0.8rem, 2vw, 0.85rem)',
              transition: 'all 0.3s ease',
              fontWeight: '500',
              whiteSpace: 'nowrap'
            }}
          >
            {category === 'all' ? 'Все' :
             category === 'weather' ? 'Погода' :
             category === 'fronts' ? 'Фронты' :
             category === 'clouds' ? 'Облака' : 'Другие'}
          </button>
        ))}
      </div>

      {/* Адаптивная сетка символов */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
        gap: '15px',
        padding: '0 5px'
      }}>
        {filteredSymbols.map((symbol: WeatherSymbol) => (
          <div 
            key={symbol.id}
            style={{
              background: '#112240',
              padding: 'clamp(15px, 3vw, 18px)',
              borderRadius: '10px',
              border: '1px solid #1a6fc4',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              minHeight: '120px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: 'clamp(12px, 3vw, 15px)',
              marginBottom: '12px'
            }}>
              <div style={{ 
                fontSize: 'clamp(1.5rem, 4vw, 1.8rem)',
                minWidth: 'clamp(40px, 8vw, 45px)',
                textAlign: 'center',
                background: '#0a192f',
                padding: 'clamp(6px, 2vw, 8px)',
                borderRadius: '6px',
                border: '1px solid #64ffda',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {symbol.symbol}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ 
                  margin: '0 0 6px 0',
                  color: '#64ffda',
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: 'clamp(1rem, 3vw, 1.1rem)',
                  lineHeight: 1.2,
                  wordBreak: 'break-word'
                }}>
                  {symbol.name}
                </h3>
                <p style={{ 
                  margin: 0,
                  color: '#8892b0',
                  fontSize: 'clamp(0.8rem, 2vw, 0.85rem)',
                  fontFamily: 'Exo 2, sans-serif',
                  lineHeight: 1.3
                }}>
                  {symbol.description}
                </p>
              </div>
            </div>
            
            {symbol.importantNotes && (
              <div style={{
                background: 'rgba(26, 111, 196, 0.15)',
                padding: 'clamp(6px, 2vw, 8px) clamp(8px, 2vw, 10px)',
                borderRadius: '5px',
                fontSize: 'clamp(0.7rem, 2vw, 0.75rem)',
                color: '#e6f1ff',
                borderLeft: '2px solid #1a6fc4',
                fontFamily: 'Exo 2, sans-serif',
                lineHeight: 1.2
              }}>
                <strong>📝 </strong>{symbol.importantNotes}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredSymbols.length === 0 && (
        <div style={{
          textAlign: 'center',
          color: '#8892b0',
          fontSize: 'clamp(0.9rem, 3vw, 1rem)',
          marginTop: '40px',
          fontFamily: 'Exo 2, sans-serif',
          padding: '20px'
        }}>
          Символы не найдены для выбранной категории
        </div>
      )}

      {/* Статистика */}
      <div style={{
        textAlign: 'center',
        color: '#8892b0',
        fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
        marginTop: '25px',
        fontFamily: 'Exo 2, sans-serif',
        padding: '10px'
      }}>
        Показано: {filteredSymbols.length} из {weatherSymbols.length} символов
      </div>
    </div>
  );
};