import style from './Home.module.css';
import Map from '../Map/Map';
import Marker from '../Map/Marker';
import { useEffect, useState } from 'react';

interface Props {
  user: {admin: boolean,
    default_location: null | string,
    id: number,
    password_digest: string
    username: string } | null,
  onChangeUser?: Function,
}

interface Ilocation {
  name: string,
  coordinates: string,
}
export default function Home({ user }: Props) {
  const [ markers, setMarkers ] = useState([]);

  // Fetch locations and save in state as map markers
  useEffect(() => {
    fetch(`/locations`)
    .then(r => {
      if(r.ok) {
        r.json().then(data => setMarkers(data.map((loc: any) => 
        <Marker key={loc.name} name={loc.name} lat={loc.coordinates.split(',')[0]} lon={loc.coordinates.split(',')[1]}/>)))
      } else {
        r.json().then(err => console.log(err));
      }
    })
  }, [])
 
console.log(markers);
  return <div className={style.home}>
    <div className={style.hero}>
      <div className={style.heroText}>Compare climbing area weather forecasts side by side</div>
      <Map center={{lat: 39.725194, lng: -105.175531}} zoom={7} markers={markers}/>
    </div>
  </div>
}