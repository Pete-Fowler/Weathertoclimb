import style from './Favorites.module.css';
import Weather from '../Weather/Weather';

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

export default function Favorites({ user, onChangeUser }: Props) {

  console.log(user);
  
  return <div className={style.favorites}>
    <Weather />
  </div>
}