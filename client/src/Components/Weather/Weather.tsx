import style from './Weather.module.css';
import { useState, useEffect } from 'react';

export default function Weather() {

  const [ locations, setLocations ] = useState<any[]>([]);
  const [ weather, setWeather ] = useState<any[]>([]);

  // Set locations for development in place of props
  useEffect(() => {
    fetch(`/locations`)
    .then(r => {
      if(r.ok) {
        r.json().then(data => {
          setLocations(data.slice(0, 3));
        });
      } else {
        r.json().then(err => alert(err.errors));
      }
    })
  }, [])

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

  console.log('weather:', weather)

  return <div className={style.weatherSection}>
    {weather.map(location => 
      <div key={location.name} className={style.weatherCard} >
        <div className={style.name}>{location.name}</div>
        <div className={style.periods}>
          {location.weather.properties.periods
          .filter(period => !period.name.toLowerCase().includes('night'))
          .map((period, index )=> {
            return <div key={period.number} className={style.period}>
              <div className={style.periodName}>{index === 0 ? 'Today' : period.name}</div>
              <img className={style.icon} src={period.icon} alt={period.shortForecast}/>
              <div className={style.temp}>{period.temperature} F</div>
              <div className={style.windSpeed}>{period.windSpeed}</div>
            </div>
            }
          )}
        </div>
      </div>
    )}
  </div>
}