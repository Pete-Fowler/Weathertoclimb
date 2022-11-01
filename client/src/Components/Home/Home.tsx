import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  user: object | null,
  onChangeUser: Function,

}

export default function Home({ user, onChangeUser }: Props) {

  return <div>
    Home
    <Link to='/login'>Login</Link>
  </div>
}