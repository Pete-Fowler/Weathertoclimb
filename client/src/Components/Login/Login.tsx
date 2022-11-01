import { Link } from 'react-router-dom';
import React, { ChangeEvent, useState } from 'react';
import style from './Login.module.css';

interface Props {
  user: object | null,
  onChangeUser: Function
}

export default function Login({ user, onChangeUser }: Props) {
  const [ formData, setFormData ] = useState({username: '', password: ''})

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch(`/login`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(r => {
      if(r.ok) {
        r.json().then(data => {
          console.log(data);
          onChangeUser(data);
        })
      }
    })
  }

  return <div className={style.login}>
    <form className={style.loginForm} onSubmit={handleSubmit}>
      <label htmlFor='username'>Username:</label>
      <input id='username' onChange={handleChange} value={formData.username}></input>
      <label htmlFor='password'>Password:</label> 
      <input id='password' onChange={handleChange} value={formData.password}></input>
      <button type='submit'>Login</button>
      <Link to='/create-account'>Create an account</Link>
    </form>
  </div>
}