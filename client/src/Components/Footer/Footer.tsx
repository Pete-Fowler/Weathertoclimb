import style from './Footer.module.css';
import mountains from './mountains.svg';

interface Iprops {
  changeModal: Function
}

export default function Footer({ changeModal }: Iprops) {

  return <div className={style.footer}>
    <img src={mountains} alt={'Mountains'}/>
    <ul>
      <li className='link' onClick={() => changeModal('createLocation')}>Create an area</li>
      <li className='link' onClick={() => changeModal('suggestArea')}>Contact us to suggest an area</li>
      <li>Powered by the <a className='link' href="https://www.weather.gov/documentation/services-web-api" title="National Weather Service">National Weather Service API</a></li>
      <li>Map location icons created by IconMarketPK - <a className='link' href="https://www.flaticon.com/free-icons/location" title="location icons">Flaticon</a></li>
    </ul>
</div>
}