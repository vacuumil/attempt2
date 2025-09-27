import { create } from 'zustand';
import type { MetarData, TafData, Airport } from '../types';

interface MeteorologyState {
  selectedAirport: string;
  metarData: MetarData | null;
  tafData: TafData | null;
  airports: Airport[];
  isLoading: boolean;
  error: string | null;
  setSelectedAirport: (icao: string) => void;
  fetchMetarData: (icao: string) => Promise<void>;
  fetchTafData: (icao: string) => Promise<void>;
  fetchAirports: () => Promise<void>;
}

export const useMeteorologyStore = create<MeteorologyState>((set, get) => ({
  selectedAirport: 'UUEE',
  metarData: null,
  tafData: null,
  airports: [],
  isLoading: false,
  error: null,
  
  setSelectedAirport: (icao: string) => {
    console.log('Setting selected airport to:', icao);
    set({ 
      selectedAirport: icao,
      metarData: null,
      tafData: null,
      error: null 
    });
    
    // Вызываем методы для загрузки данных
    get().fetchMetarData(icao).catch(console.error);
    get().fetchTafData(icao).catch(console.error);
  },
  
  fetchMetarData: async (icao: string) => {
    console.log('Fetching METAR for:', icao);
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch('/data/metarData.json');
      if (!response.ok) throw new Error('Network response was not ok');
      
      const allData = await response.json();
      const metar = allData.find((item: MetarData) => item.icao === icao);
      
      console.log('METAR data found:', !!metar);
      set({ metarData: metar || null });
    } catch (err) {
      console.error('Error fetching METAR:', err);
      set({ error: 'Ошибка загрузки данных METAR' });
    } finally {
      set({ isLoading: false });
    }
  },
  
  fetchTafData: async (icao: string) => {
    console.log('Fetching TAF for:', icao);
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch('/data/tafData.json');
      if (!response.ok) throw new Error('Network response was not ok');
      
      const allData = await response.json();
      const taf = allData.find((item: TafData) => item.icao === icao);
      
      console.log('TAF data found:', !!taf);
      set({ tafData: taf || null });
    } catch (err) {
      console.error('Error fetching TAF:', err);
      set({ error: 'Ошибка загрузки данных TAF' });
    } finally {
      set({ isLoading: false });
    }
  },
  
  fetchAirports: async () => {
    try {
      const response = await fetch('/data/airports.json');
      if (!response.ok) throw new Error('Network response was not ok');
      
      const airports = await response.json();
      console.log('Airports loaded:', airports.length);
      set({ airports });
    } catch (err) {
      console.error('Error fetching airports:', err);
      set({ error: 'Ошибка загрузки списка аэропортов' });
    }
  },
}));