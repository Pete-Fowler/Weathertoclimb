import { Link, useNavigate } from 'react-router-dom';
import React, { ChangeEvent, useState } from 'react';
import style from './Login.module.css';

interface Props {
  user: object | null,
  onChangeUser: Function,
  toggleModal: Function
}

export default function Login({ user, onChangeUser, toggleModal }: Props) {
  const [ formData, setFormData ] = useState({username: '', password: ''});
  const [ errors, setErrors ] = useState([]);

  const navigate = useNavigate();

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
          onChangeUser(data);
          toggleModal('login');
        })
      } else {
        r.json().then(err => {
          setErrors(err.errors);
        })
      }
    })
  }

  function createAccountModal() {
    toggleModal('login');
    toggleModal('createAccount');
  }

  return <div className={style.login} onClick={() => toggleModal('login')}>
    <form className={style.loginForm} onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
      <label htmlFor='username'>Username:</label>
      <input type='text' id='username' onChange={handleChange} value={formData.username}></input>
      <label htmlFor='password'>Password:</label> 
      <input type='password' id='password' onChange={handleChange} value={formData.password}></input>
      <button type='submit'>Login</button>
      {errors.map(err => <div key={err} className={style.errors}>{err}</div>)}
      <div className='link' onClick={createAccountModal}>Create an account</div>
    </form>
  </div>
}