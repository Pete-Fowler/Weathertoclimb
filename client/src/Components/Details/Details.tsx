import style from './Details.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

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

  // Set location name from params id
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
            setLoaded(loaded => ({...loaded, daily: true}))
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
            setLoaded(loaded => ({...loaded, hourly: true}))
          });
        } else {
          r.json().then(err => console.log(err));
        }
      })
   }
  }, [location])

  return <div className={style.details}>
    <h1>{location ? location.name : ''}</h1>
    <div className={style.hourly}>
      {loaded.hourly 
        ? hourly.properties.periods.slice(0, 72).map((hour: Iperiod, index: number, array: Iperiod) => 
        <div key={hour.number} className={style.hour}>
          {index === 0 || format(new Date(hour.startTime), 'h aa') === '12 AM' 
            ? <div className={style.day}>{format(new Date(hour.startTime), 'ccc')}</div>
            : <div className={style.day}></div> }
          <div>{format(new Date(hour.startTime), 'h aa')}</div>
          <img src={hour.icon} alt={hour.shortForecast}></img>
          <div>{hour.temperature} F</div>
          <div>{hour.windSpeed}</div>
          <div className={style.shortForecast}>{hour.shortForecast}</div>
        </div>)
        : ''}
    </div>
    <div className={style.daily}>
      {loaded.daily ? daily.properties.periods.map((period: Iperiod, index: number,  array: Iperiod[]) => 
        !period.name.toLowerCase().includes('night') ? 
        <div key={period.number} className={style.period}>
          <div className={style.periodName}>{index === 0 ? 'Today' : period.name.toUpperCase()}</div>
          <img className={style.icon} src={period.icon} alt={period.shortForecast}/>
          <div className={style.temp}>{period.temperature}&deg; F / {index < array.length - 1 ? array[index + 1].temperature : ''}&deg; F</div>
          <div className={style.windSpeed}>{period.windSpeed}</div>
          <div className={style.detailedForecast}>{period.detailedForecast}</div>
        </div>
        : ''
      ) 
      : ''}
    </div>
  </div>
}