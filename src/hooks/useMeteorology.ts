import { useEffect } from 'react';
import { useMeteorologyStore } from '../stores/meteorologyStore';

export const useMeteorology = () => {
  const {
    selectedAirport,
    metarData,
    tafData,
    airports,
    isLoading,
    error,
    setSelectedAirport,
    fetchAirports,
  } = useMeteorologyStore();

  useEffect(() => {
    console.log('Fetching airports...');
    fetchAirports().catch(err => {
      console.error('Failed to fetch airports:', err);
    });
  }, [fetchAirports]);

  useEffect(() => {
    if (selectedAirport) {
      console.log('Fetching data for airport:', selectedAirport);
      setSelectedAirport(selectedAirport);
    }
  }, [selectedAirport, setSelectedAirport]);

  return {
    selectedAirport,
    metarData,
    tafData,
    airports,
    isLoading,
    error,
    setSelectedAirport,
  };
};