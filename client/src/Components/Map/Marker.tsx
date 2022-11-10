import pin from './pin.png';
import style from './Marker.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface Iprops {
  name: string,
  id: number,
  lat: number,
  lng: number
}

export default function Marker ({ name, id }: Iprops) {
  const [ isShown, setIsShown ] = useState(false);

  function showModal() {
    setIsShown(true);
  }

  function hideModal() {
    setIsShown(false);
  }

  return <Link to={`/locations/${id}`} className={style.marker} onMouseEnter={showModal} onMouseLeave={hideModal}>
    {isShown ? <div className={style.modal}>{name}</div> : ''}
    <img src={pin} alt='marker'/>
    </Link>
}