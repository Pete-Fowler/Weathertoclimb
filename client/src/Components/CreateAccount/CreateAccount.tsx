import { Link } from 'react-router-dom';
import { useState } from 'react';
import style from '../Login/Login.module.css';

interface Props {
  user: object | null,
  onChangeUser: Function
}

export default function CreateAccount({ user, onChangeUser }: Props) {
  const [ formData, setFormData ] = useState({username: '', password: '', passwordConfirmation: ''})

  function handleChange(e) {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault();

  }

  return <div className={style.login}>
    <form className={style.loginForm} onSubmit={handleSubmit}>
      <label htmlFor='username'>Username:</label>
      <input id='username' onChange={handleChange}></input>
      <label htmlFor='password'>Password:</label>
      <input id='password' onChange={handleChange}></input>
      <label htmlFor='passwordConfirmation'>Password confirmation:</label>
      <input id='passwordConfirmation' onChange={handleChange}></input>
      <button type='submit'>Create account</button>
      <div>Already have an account? <Link to='/login'>Log in instead</Link></div>
    </form>
  </div>
}