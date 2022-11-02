import style from './Weather.module.css';
import { useState, useEffect } from 'react';

export default function Weather() {

  const [ locations, setLocations ] = useState<any[]>([]);
  const [ weather, setWeather ] = useState<{}>({});

  // Set locations for development in place of props
  useEffect(() => {
    fetch(`/locations`)
    .then(r => {
      if(r.ok) {
        r.json().then(data => {
          console.log(data);
          setLocations([...data[0]]);
        });
      } else {
        r.json().then(err => alert(err.errors));
      }
    })
  }, [])

  // Fetch forecasts for each location
  useEffect(() => {
    locations.forEach(location => {
      fetch(`${location.forecast_url}`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {
            setWeather(weather => ({...weather, [location.name]: data}));
            console.log(weather);
          });
        } else {
          r.json().then(err => alert(err.errors));
        }
      })
    });
  }, [locations])  

  return <div className={style.weatherSection}>
    {locations.map(location => 
      <div key={location.name} className={style.weatherCard} >
        
      </div>
    )}
  </div>
}