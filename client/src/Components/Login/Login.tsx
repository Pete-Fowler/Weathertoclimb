import { Link } from 'react-router-dom';
import style from './Login.module.css';

interface Props {
  user: object | null,
  onChangeUser: Function
}

export default function Login({ user, onChangeUser }: Props) {


  return <div className={style.login}>
    <form className={style.loginForm}>
      <label htmlFor='username'>Username:</label>
      <input id='username'></input>
      <label htmlFor='password'>Password:</label> 
      <input id='password'></input>
      <button type='submit'>Login</button>
      <Link to='/create-account'>Create an account</Link>
    </form>
  </div>
}