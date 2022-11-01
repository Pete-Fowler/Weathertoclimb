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

  }

  return <div className={style.header}>
    <Link to='/' className={style.links}>Home</Link>
    <div className={style.userArea}>
      {user 
      ? <><div>{user.username}</div> 
        <button onClick={handleLogout}>Log out</button></>
      : <Link to='/login'>Log in</Link>}
    </div>
  </div>
}