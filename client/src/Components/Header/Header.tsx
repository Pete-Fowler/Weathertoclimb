import style from './Header.module.css';
import { Link } from 'react-router-dom';

interface Props {
  user: {admin: boolean,
    default_location: null | string,
    id: number,
    password_digest: string
    username: string } | null,
  onChangeUser: Function,
}

export default function Header({ user, onChangeUser }: Props) {

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

  return <div className={style.header}>
    <Link to='/' className={`link ${style.icon}`}>
      Weather ☁️ to climb
    </Link>
    <div className={style.userArea}>
      {user 
      ? <><div className={style.username}>{user.username}</div> 
        <button className='link' onClick={handleLogout}>LOG OUT</button></>
      : <Link className={`link`} to='/login'>LOG IN</Link>}
    </div>
  </div>
}