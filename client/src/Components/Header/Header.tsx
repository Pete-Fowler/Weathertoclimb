import style from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
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
  const [ searchTerm, setSearchTerm ] = useState<string>('');
  const [ locations, setLocations ] = useState<any[]>([]);
  const [ isShown, setIsShown ] = useState(false);

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
    
    if(e.target.value.length > 2) {
      fetch(`/locations?q=${searchTerm}`)
      .then(r => {
        if(r.ok) {
          r.json().then(data => {
            setLocations(data);
            setIsShown(true);
          })
        } else {
          r.json().then(err => console.log(err));
        }
      })
    } else {
      setLocations([]);
      setIsShown(false);
    }
  }

  return <div className={style.header}>
    <Link to='/' className={`link ${style.icon}`}>
      Weather ☁️ to climb
    </Link>
    <div className={style.inputBox}>
      <input className={style.input} type='text' placeholder='SEARCH  CLIMBING AREAS' value={searchTerm} onChange={handleChange}>
      </input>
      {isShown 
        ? <div className={style.dropdown}>
            {locations.map(location => 
              <Link to={`/locations/${location.id}`} key={location.name} className='link'>{location.name}</Link>
            )}
        </div>
        : ''}
    </div>
    <div className={style.links}>
      <Link className='link' to='/'>BROWSE AREAS</Link>
      {user 
      ? <><div className={style.username}>{user.username}</div> 
        <button className='link' onClick={handleLogout}>LOG OUT</button></>
      : <Link className={`link`} to='/login'>LOG IN</Link>}
    </div>
  </div>
}