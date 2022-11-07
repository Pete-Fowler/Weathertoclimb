import style from './Favorites.module.css';
import { useState, useEffect } from 'react';

interface Ifavorite {
  id: number,
  user_id: number,
  location_id: number,
}

interface Props {
  user: {admin: boolean,
    default_location: null | string,
    favorites: Ifavorite[] | [],
    id: number,
    password_digest: string
    username: string } | null,
  onChangeUser: Function
}

export default function Weather({ user, onChangeUser }: Props) {
  interface Iperiod {
    number: number,
    name: string,
    startTime: string,
    endTime: string,
    isDaytime: boolean,
    temperature: number,
    temperatureUnit: "F",
    temperatureTrend: string,
    windSpeed: string,
    windDirection: string,
    icon: string,
    shortForecast: string,
    detailedForecast: string
  }

  const [ locations, setLocations ] = useState<any[]>([]);
  const [ weather, setWeather ] = useState<any[]>([]);

  // Get saved locations
  useEffect(() => {
    const ids: number[] = [];
    user?.favorites.forEach(obj => {
      ids.push(obj.location_id);
    })

    fetch(`/locations?ids=${ids}`)
    .then(r => {
      if(r.ok) {
        r.json().then(data => {
          setLocations(data.slice(0, 10));
        });
      } else {
        r.json().then(err => alert(err.errors));
      }
    })
  }, [user?.favorites])

  // fetch forecasts for each location
  useEffect(() => {
    locations.forEach(location => {
      fetch(`${location.forecast_url}`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {
            setWeather(weather => ([...weather, {name: location.name, weather: data}]));
          });
        } else {
          r.json().then(err => console.log(err.errors));
        }
      })
    });
  }, [locations])
  
  return <div className={style.weatherSection}>
    {weather.map(location => 
      <div key={location.name} className={style.weatherCard} >
        <div className={style.name}>{location.name}</div>
        <div className={style.periods}>
          {location.weather.properties.periods
          .map((period: Iperiod, index: number, array: Iperiod[] )=> 
            !period.name.toLowerCase().includes('night') ? 
            <div key={period.number} className={style.period}>
              <div className={style.periodName}>{index === 0 ? 'Today' : period.name}</div>
              <img className={style.icon} src={period.icon} alt={period.shortForecast}/>
              <div className={style.temp}>{period.temperature}&deg; F / {index < array.length - 1 ? array[index + 1].temperature : ''}&deg; F</div>
              <div className={style.windSpeed}>{period.windSpeed}</div>
            </div>
            : ''
          )}
        </div>
      </div>
    )}
  </div>
}