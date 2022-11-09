import pin from './pin.png';
import style from './Marker.module.css';

export default function Marker ({ name }: any) {

return <div className={style.marker}>
  <img src={pin} alt='marker'/>
  </div>

}