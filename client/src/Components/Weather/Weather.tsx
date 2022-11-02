import style from './Weather.module.css';
import { useState } from 'react';

export default function Weather() {

  const [ locations, setLocations ] = useState<any[]>([]);

  return <div className={style.weatherSection}>
    {locations.map(location => 
      <div key={location.name} className={style.weatherCard} >
        
      </div>
    )}
  </div>
}