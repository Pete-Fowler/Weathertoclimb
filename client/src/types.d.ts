interface ImapLocation {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

interface Ilocation {
  id: number;
  name: string;
  state: string;
  coordinates: string;
  forecast_url: string;
  popular: boolean;
}

interface Iuser {
  admin: boolean;
  default_location: null | string;
  favorites: Ifavorite[] | [];
  id: number;
  password_digest: string;
  username: string;
}

interface Ifavorite {
  id: number;
  user_id: number;
  location_id: number;
}

interface Iperiod {
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

interface Iloaded {
  hourly: boolean;
  daily: boolean;
}

interface Imodal {
  locationID: number;
  periodNumber: number;
}
