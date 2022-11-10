import style from './Favorites.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

interface Props {
  user: {admin: boolean,
    default_location: null | string,
    favorites: Ifavorite[] | [],
    id: number,
    password_digest: string
    username: string } | null,
  onChangeUser: Function
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

export default function Weather({ user, onChangeUser }: Props) {
  const [ loaded, setLoaded ] = useState<boolean>(false);
  const [ errors, setErrors ] = useState<string | null>(null);
  const [ locations, setLocations ] = useState<any[]>([]);
  const [ weather, setWeather ] = useState<any[]>([]);


  // Get saved locations from IDs
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
  }, [user])

  // fetch forecasts for each location
  useEffect(() => {
    setWeather([]);
    locations.forEach(location => {
      fetch(`${location.forecast_url}`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {
            setWeather(weather => ([...weather, {name: location.name, id: location.id, weather: data}]));
          });
        } else {
          r.json().then(err => console.log(err.errors));
          let i = 0;
          while(i < 10 && loaded === false) {
            setTimeout(() => {
              fetch(`${location.forecast_url}`)
              .then(r => {
                if(r.ok) {
                  r.json().then(data => {
                    setWeather(weather => ([...weather, {name: location.name, id: location.id, weather: data}]));
                  })
                } 
              })
            }, 100);
            i++;
          }
          setErrors('The National Weather Service did not load all data. Try refreshing the page momentarily.')
        }
      })
    });
  }, [locations])

  function unSave(locationID: number) {  
    const fav = user?.favorites.find(obj => obj.location_id === locationID);
    const favID = fav?.id;

    fetch(`/favorites/${favID}`, {
      method: 'DELETE'
    })
    .then(r => {
      if(r.ok) {
        r.json().then(data => {
          onChangeUser((user: Iuser) => ({...user, favorites: [...user.favorites.filter(fav => fav.id !== favID)]}))
        })
      } else {
        r.json().then(err => console.log(err));
      }
    })
  }

  return <div className={style.weatherSection}>
    {weather.length > 0 
      ? weather.map(location => 
        <div key={location.name} className={style.weatherCard} >
          <div className={style.name}>
            <Link className={style.link} to={`/locations/${location.id}`}>{location.name}</Link>
            <button className={style.unSaveBtn} onClick={() => unSave(location.id)}>Unsave area</button>
          </div>
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
        ) 
      : <div className={style.saveMessage}>Save areas to compare forecasts side by side</div>}
  </div>
}