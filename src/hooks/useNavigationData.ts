import { useState, useEffect } from 'react';
import type { Airport, Procedure, Route } from '../types/navigation';

interface NavigationData {
  airports: Airport[];
  procedures: Record<string, { SID: Procedure[]; STAR: Procedure[] }>;
  routes: Route[];
  loading: boolean;
  error: string | null;
}

export const useNavigationData = (): NavigationData => {
  const [data, setData] = useState<NavigationData>({
    airports: [],
    procedures: {},
    routes: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [airportsResponse, proceduresResponse, routesResponse] = await Promise.all([
          fetch('/data/navigation/airports.json'),
          fetch('/data/navigation/procedures.json'),
          fetch('/data/navigation/routes.json')
        ]);

        if (!airportsResponse.ok) throw new Error('Failed to load airports');
        if (!proceduresResponse.ok) throw new Error('Failed to load procedures');
        if (!routesResponse.ok) throw new Error('Failed to load routes');

        const airportsData = await airportsResponse.json();
        const proceduresData = await proceduresResponse.json();
        const routesData = await routesResponse.json();

        setData({
          airports: airportsData.airports || [],
          procedures: proceduresData || {},
          routes: routesData.routes || [],
          loading: false,
          error: null
        });
      } catch (error) {
        setData({
          airports: [],
          procedures: {},
          routes: [],
          loading: false,
          error: 'Ошибка загрузки данных: ' + (error instanceof Error ? error.message : String(error))
        });
      }
    };

    loadData();
  }, []);

  return data;
};