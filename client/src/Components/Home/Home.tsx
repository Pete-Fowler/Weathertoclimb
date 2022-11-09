import style from './Home.module.css';
import Map from '../Map/Map';

interface Props {
  user: {admin: boolean,
    default_location: null | string,
    id: number,
    password_digest: string
    username: string } | null,
  onChangeUser: Function,
}


export default function Home({ user, onChangeUser }: Props) {

  // fetch user locations
  // store in state
  // array of lat/lon to Map in props
  
  return <div className={style.home}>
    <div className={style.hero}>
      <div className={style.heroText}>Compare climbing area weather forecasts side by side</div>
      <Map />
    </div>
  </div>
}