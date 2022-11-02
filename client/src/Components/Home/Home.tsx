import style from './Home.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
    Home
    <Link to='/login'>Login</Link>
  </div>
}