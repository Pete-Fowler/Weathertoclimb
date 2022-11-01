import { Link } from 'react-router-dom';
import style from './Login.module.css';

export default function Login({ user, onChangeUser }) {

  return <div>
    <form className={style.login}>
      <div><label>Username: <input name='username'></input></label></div>
      <div><label>Password: <input name='password'></input></label></div>
    </form>
    <Link to='create-account'>Create an account</Link>
  </div>
}