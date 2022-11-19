export interface Ilocation {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export interface Iuser {
  admin: boolean;
  default_location: null | string;
  favorites: Ifavorite[] | [];
  id: number;
  password_digest: string;
  username: string;
}

export interface Ifavorite {
  id: number;
  user_id: number;
  location_id: number;
}

export interface Iperiod {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: "F";
  temperatureTrend: string;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}

export interface Iloaded {
  hourly: boolean;
  daily: boolean;
}
