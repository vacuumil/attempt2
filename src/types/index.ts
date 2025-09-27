export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface Runway {
  designator: string;
  heading: number;
  length_ft: number;
  width_ft: number;
  surface: string;
}

export interface Station {
  name: string;
  location: string;
  elevation_ft: number;
  latitude: number;
  longitude: number;
  runways: Runway[];
}

export interface RunwayVisibility {
  runway: string;
  visibility_meters: number;
  trend: string;
}

export interface MetarData {
  icao: string;
  raw_text: string;
  station: Station;
  observed: string;
  wind: {
    degrees: number;
    speed_kts: number;
    gust_kts?: number;
    variable: boolean;
    direction_from?: number | null;
    direction_to?: number | null;
  };
  visibility: {
    miles: string;
    meters: string;
    cavok?: boolean;
  };
  conditions: string[];
  clouds: {
    cover: string;
    altitude_ft?: number;
    type?: string | null;
    density?: string;
  }[];
  temperature: {
    celsius: number;
    fahrenheit: number;
  };
  dewpoint: {
    celsius: number;
    fahrenheit: number;
  };
  humidity_percent: number;
  barometer: {
    hg: number;
    mb: number;
    hpa?: number;
  };
  runway_visibility?: RunwayVisibility[];
  flight_category: string;
  trend?: string;
  remarks?: string;
}

export interface TafData {
  icao: string;
  raw_text: string;
  issued: string;
  valid_from: string;
  valid_to: string;
  forecasts: {
    timestamp: string;
    wind: {
      degrees: number;
      speed_kts: number;
      gust_kts?: number;
    };
    visibility: {
      miles: string;
    };
    conditions: string[];
    clouds: {
      cover: string;
      altitude_ft?: number;
    }[];
    wind_shear?: string;
    turbulence?: string;
    icing?: string;
  }[];
}

export interface Airport {
  icao: string;
  iata: string;
  name: string;
  city: string;
  country: string;
  elevation_ft: number;
  latitude: number;
  longitude: number;
}