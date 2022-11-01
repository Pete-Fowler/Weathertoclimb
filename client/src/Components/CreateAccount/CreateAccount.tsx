import { Link } from 'react-router-dom';
import style from '../Login/Login.module.css';

interface Props {
  user: object | null,
  onChangeUser: Function
}

export default function CreateAccount({ user, onChangeUser }: Props) {

  return <div className={style.login}>
    <form className={style.loginForm}>
      <label htmlFor='username'>Username:</label>
      <input id='username'></input>
      <label htmlFor='password'>Password:</label>
      <input id='password'></input>
      <label htmlFor='passwordConfirmation'>Password confirmation:</label>
      <input id='passwordConfirmation'></input>
      <button type='submit'>Create account</button>
      <div>Already have an account? <Link to='/login'>Log in instead</Link></div>
    </form>
  </div>
}