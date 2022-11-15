import style from './Details.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

interface Props {
  user: {admin: boolean,
    default_location: null | string,
    favorites: Ifavorite[] | [],
    id: number,
    password_digest: string
    username: string } | null,
  onChangeUser: Function, 
  changeModal: Function
}

interface Iuser {
  admin: boolean,
  default_location: null | string,
  favorites: Ifavorite[] | [],
  id: number,
  password_digest: string
  username: string 
}

interface Ifavorite {
  id: number,
  user_id: number,
  location_id: number,
}

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

export default function Details({ user, onChangeUser, changeModal }: Props) {
  const [ errors, setErrors ] = useState<string | null>(null);
  const [ location, setLocation ] = useState<any>(null);
  const [ hourly, setHourly ] = useState<any>([]);
  const [ daily, setDaily ] = useState<any>([]);
  const [ loaded, setLoaded ] = useState<Iloaded>({
    hourly: false, 
    daily: false
  })
  const [ saved, setSaved ] = useState<boolean>(false);

  const { id } = useParams();

  // Set location name from params id, set saved
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

  // Set saved status
  useEffect(() => {
    if(user && location && !!user.favorites.find((obj: Ifavorite) => obj.location_id === location.id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [user, location])

  // Fetch forecasts
  useEffect(() => {
    setErrors('');
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
          let i = 0;
          while(i < 10 && loaded.daily === false) {
            setTimeout(() => {
              fetch(`${location.forecast_url}`)
              .then(r => {
                if(r.ok) {
                  r.json().then(data => {
                    setDaily(data);
                    setLoaded(loaded => ({...loaded, daily: true}));
                    setErrors('');
                  })
                } 
              })
            }, 100);
            i++;
          }
          i > 10 && setErrors('The National Weather Service did not load all data. Try refreshing the page momentarily.')
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
          let i = 0;
          while(i < 10 && loaded.hourly === false) {
            setTimeout(() => {
              fetch(`${location.forecast_url}/hourly`)
              .then(r => {
                if(r.ok) {
                  r.json().then(data => {
                    setHourly(data);
                    setLoaded(loaded => ({...loaded, hourly: true}))
                    setErrors('');
                  })
                } 
              })
            }, 100);
            i++;
          }
          i > 10 && setErrors('The National Weather Service did not load all data. Try refreshing the page momentarily.');
        }
      })
   }
  }, [location])

  function handleSaveBtnClick(e: React.MouseEvent<HTMLButtonElement>) {
   
    if(!saved) {
      fetch(`/favorites`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({user_id: user?.id, location_id: location.id}),
      })
      .then(r => {
        if(r.ok) {
          r.json().then(data => {
            setSaved(true);
            onChangeUser((user: Iuser) => ({...user, favorites: [...user.favorites, data]}))
          });
        } else {
          r.json().then(err => console.log(err));
        }
      })
    } else {
      const fav = user?.favorites.find((obj: Ifavorite) => obj.location_id === location.id);
      const favID = saved && fav ? `${fav.id}`: '';
      
      fetch(`/favorites/${favID}`, {
        method: 'DELETE',
      })
      .then(r => {
        if(r.ok) {
          r.json().then(data => {
            onChangeUser((user: Iuser) => ({...user, favorites: [...user.favorites.filter(obj => parseInt(favID) !== obj.id)]}))
          })
        } else {
          r.json().then(err => console.log(err));
        }
      })
    }
  }

  const saveBtnText = saved ? 'Unsave area' : 'Save area';
  const isDisabled = user && user.favorites.length > 15 ? true : false;

  return <div className={style.details}>
    {errors && <div>{errors}</div>}
    
    <div className={style.titleBox}>
      <h1>{location && location.name}</h1>
      {user && <button className={style.saveBtn} onClick={isDisabled ? () => changeModal('max-favorites') : handleSaveBtnClick}>{saveBtnText}</button>} 
    </div>
    
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
          <div className={style.periodName}>{index === 0 ? 'TODAY' : period.name.toUpperCase()}</div>
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