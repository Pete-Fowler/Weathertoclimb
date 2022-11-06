import style from './Details.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Details() {
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

  interface Iloaded {
    hourly: boolean,
    daily: boolean
  }
 
  const [ location, setLocation ] = useState<any>(null);
  const [ hourly, setHourly ] = useState<any>([]);
  const [ daily, setDaily ] = useState<any>([]);
  const [ loaded, setLoaded ] = useState<Iloaded>({
    hourly: false, 
    daily: false
  })

  const { id } = useParams();

  // Set location name from params
  useEffect(() => {
    fetch(`/locations/${id}`)
    .then(r => {
      if(r.ok) {
        r.json().then(data => setLocation(data))
      } else {
        r.json().then(err => console.log(err));
      }
    })
  }, [id])

  // Fetch forecasts
  useEffect(() => {
    if(location) {
      fetch(`${location.forecast_url}`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {
            setDaily(data);
            setLoaded({...loaded, daily: true})
          });
        } else {
          r.json().then(err => console.log(err));
        }
      })

      fetch(`${location.forecast_url}/hourly`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {
            setHourly(data);
            setLoaded({...loaded, hourly: true})
          });
        } else {
          r.json().then(err => console.log(err));
        }
      })
   }
  }, [location])

  console.log(hourly, daily)
  return <div className={style.details}>
    <div className={style.hourly}>
      {loaded.hourly ? hourly.properties.periods.slice(0, 72).map((hour: Iperiod) => 
        <div key={hour.number}>
          <div>{hour.startTime}</div>
          <img src={hour.icon} alt={hour.shortForecast}></img>
          <div>{hour.temperature} F</div>
          <div>{hour.windSpeed}</div>
          <div>{hour.shortForecast}</div>
        </div>)
        : ''}
    </div>
    <div className={style.daily}>
      {loaded.daily ? daily.properties.periods.map((period: Iperiod, index: number,  array: Iperiod[]) => 
        !period.name.toLowerCase().includes('night') ? 
        <div key={period.number} className={style.period}>
          <div className={style.periodName}>{index === 0 ? 'Today' : period.name}</div>
          <img className={style.icon} src={period.icon} alt={period.shortForecast}/>
          <div className={style.temp}>{period.temperature} F / {index < array.length - 1 ? array[index + 1].temperature : ''} F</div>
          <div className={style.windSpeed}>{period.windSpeed}</div>
        </div>
        : ''
      ) 
      : ''}
    </div>
  </div>
}