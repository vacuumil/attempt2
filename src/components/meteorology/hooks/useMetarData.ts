// src/components/meteorology/hooks/useMetarData.ts

import { useState, useEffect } from 'react';
import { fetchMetarData } from '../api';
import { parseMetar } from '../utils';
import type { ParsedMetar } from '../utils';

export const useMetarData = () => {
  const [icaoCode, setIcaoCode] = useState<string>('');
  const [metarData, setMetarData] = useState<ParsedMetar | null>(null);
  const [rawMetar, setRawMetar] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recentAirports, setRecentAirports] = useState<string[]>([]);

  // Загрузка недавних аэропортов из localStorage при инициализации
  useEffect(() => {
    const saved = localStorage.getItem('recentAirports');
    if (saved) {
      try {
        setRecentAirports(JSON.parse(saved));
      } catch {
        console.warn('Failed to parse recent airports from localStorage');
        setRecentAirports([]);
      }
    }
  }, []);

  // Сохранение аэропорта в список недавних
  const addToRecentAirports = (code: string) => {
    const codeUpper = code.toUpperCase();
    const updated = [codeUpper, ...recentAirports.filter(a => a !== codeUpper)].slice(0, 5);
    setRecentAirports(updated);
    try {
      localStorage.setItem('recentAirports', JSON.stringify(updated));
    } catch {
      console.warn('Failed to save recent airports to localStorage');
    }
  };

  const fetchData = async (code: string) => {
    const codeUpper = code.toUpperCase().trim();
    
    // Простая валидация
    if (!codeUpper || codeUpper.length !== 4) {
      setError('Введите корректный ICAO код (4 буквы)');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const rawData = await fetchMetarData(codeUpper);
      const parsedData = parseMetar(rawData);
      
      setRawMetar(rawData);
      setMetarData(parsedData);
      setIcaoCode(codeUpper);
      addToRecentAirports(codeUpper);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка при получении данных';
      setError(errorMessage);
      setMetarData(null);
      setRawMetar('');
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    icaoCode,
    metarData,
    rawMetar,
    loading,
    error,
    recentAirports,
    fetchData,
    clearError,
    setIcaoCode
  };
};