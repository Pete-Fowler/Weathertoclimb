import style from './Home.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Weather from '../Favorites/Favorites';

interface Props {
  user: {admin: boolean,
    default_location: null | string,
    id: number,
    password_digest: string
    username: string } | null,
  onChangeUser: Function,
}


export default function Home({ user, onChangeUser }: Props) {

  return <div className={style.home}>
    <div className={style.hero}>
      <div className={style.heroText}>Compare climbing area weather forecasts side by side</div>
    </div>
    
    {/* <Weather /> */}
  </div>
}