import style from './Details.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Details() {
  const [ locationName, setLocationName ] = useState<[]>([]);
  const [ hourly, setHourly ] = useState<[]>([]);
  const [ daily, setDaily ] = useState<[]>([]);

  const { location } = useParams();

  useEffect(() => {
    fetch(`/locationsq?=${location}`)
    .then(r => {
      if(r.ok) {
        r.json().then(data => setLocationName(data))
      } else {
        r.json().then(err => console.log(err));
      }
    })
  }, [])

  return <div className={style.details}>

  </div>
}