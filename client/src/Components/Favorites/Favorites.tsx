import style from './Favorites.module.css';
import React, { useState, useEffect, useRef } from 'react';
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

interface Iprops {
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

interface Imodal {
  locationID: number,
  periodNumber: number,
}

export default function Weather({ user, onChangeUser }: Iprops) {
  const [ errors, setErrors ] = useState<string | null>(null);
  const [ locations, setLocations ] = useState<any[]>([]);
  const [ weather, setWeather ] = useState<any[]>([]);
  const [ modal, setModal ] = useState<Imodal | null>(null);

  const dragged = useRef<number | null>(null);
  const draggedOver = useRef<number | null>(null);


  // Get user's saved locations from IDs
  useEffect(() => {
    const ids: number[] = [];
    user?.favorites.forEach(obj => {
      ids.push(obj.location_id);
    })

    fetch(`/locations?ids=${ids}`)
    .then(r => {
      if(r.ok) {
        r.json().then(data => {
          setLocations(data);
        });
      } else {
        r.json().then(err => console.log(err));
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
          console.log('fail');
          let i = 0;
          while(i < 10 && weather.some(obj => obj.id === location.id)) {
            console.log('loop');
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
          i > 10 && setErrors('The National Weather Service did not load all data. Try refreshing the page momentarily.')
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

  function showModal(location: number, period: number) {
    setModal({locationID: location, periodNumber: period})
  }

  function hideModal() {
    setModal(null);
  }

  function handleDragStart(index: number) {
    dragged.current = index;
  }

  function handleDragEnter(index: number) {
    draggedOver.current = index;
  }

  function handleDrop() {
    const weatherCopy = [...weather];
    const draggedItem = weatherCopy[dragged.current as number];
    weatherCopy.splice(dragged.current as number, 1);
    weatherCopy.splice(draggedOver.current as number, 0, draggedItem);
    setWeather(weatherCopy);
  }

  return <div className={style.weatherSection}>
    {errors && <div className='errors'>{errors}</div>}
    
    {user?.favorites.length === 0 && <div className={style.saveMessage}>Save areas to compare weather forecases side by side</div>}
    
    {weather.map((location, index) => 
      <div key={location.name} className={style.weatherCard} draggable onDragStart={() => handleDragStart(index)} onDragEnter={() => handleDragEnter(index)} onDragEnd={handleDrop}>
        <div className={style.name}>
          <Link className={style.link} to={`/locations/${location.id}`}>{location.name}</Link>
          <button className={style.unSaveBtn} onClick={() => unSave(location.id)}>Unsave Area</button>
        </div>
        
        <div className={style.periods}>
          {location.weather.properties.periods
          .map((period: Iperiod, index: number, array: Iperiod[]) => 
            !period.name.toLowerCase().includes('night')
            ? <div key={period.number} className={style.period} >
              
              <div className={`${location.id === modal?.locationID && period.number === modal?.periodNumber ? '' : 'hidden'} ${style.modal}`}>{period.detailedForecast}</div>

                <div className={style.periodName}>{index === 0 ? 'Today' : period.name}</div>
                <img className={style.icon} src={period.icon} alt={period.shortForecast} onMouseEnter={() => showModal(location.id, period.number)} onMouseLeave={hideModal}/>
                <div className={style.temp}>{period.temperature}&deg; F / {index < array.length - 1 ? array[index + 1].temperature : ''}&deg; F</div>
                <div className={style.windSpeed}>{period.windSpeed}</div>
              </div>
            : ''
          )}
        </div>
      </div>
      ) 
     }
  </div>
}