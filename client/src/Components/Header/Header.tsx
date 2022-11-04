import style from './Header.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';

interface Props {
  user: {
    admin: boolean,
    default_location: null | string,
    id: number,
    password_digest: string
    username: string 
  } | null,
  onChangeUser: Function,
}

export default function Header({ user, onChangeUser }: Props) {
  const [ searchTerm, setSearchTerm ] = useState<string>('')

  const navigate = useNavigate(); 

  function handleLogout() {
    fetch(`/logout`, {
    method: "DELETE"})
    .then(r => {
      if(r.ok) {
        r.json().then(data => {
          console.log(data);
          onChangeUser(null);
        }) 
      } else {
        r.json().then(err => console.log(err.errors));
      }
    })
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(`/locations/${searchTerm}`)
    setSearchTerm('');
  }

  return <div className={style.header}>
    <Link to='/' className={`link ${style.icon}`}>
      Weather ☁️ to climb
    </Link>
    <form onSubmit={handleSubmit}>
      <input className={style.input} type='text' placeholder='SEARCH CLIMBING AREAS' value={searchTerm} onChange={handleChange}></input>
    </form>
    <div className={style.links}>
      <Link className='link' to='/'>BROWSE AREAS</Link>
      {user 
      ? <><div className={style.username}>{user.username}</div> 
        <button className='link' onClick={handleLogout}>LOG OUT</button></>
      : <Link className={`link`} to='/login'>LOG IN</Link>}
    </div>
  </div>
}