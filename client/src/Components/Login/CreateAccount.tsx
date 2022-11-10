import { ChangeEvent, useState } from 'react';
import style from '../Login/Login.module.css';

interface Props {
  user: {admin: boolean,
    default_location: null | string,
    id: number,
    password_digest: string
    username: string } | null,
  modal: string,
  onChangeUser: Function,
  changeModal: Function
}

export default function CreateAccount({ user, onChangeUser, modal, changeModal }: Props) {
  const [ formData, setFormData ] = useState({username: '', password: '', password_confirmation: ''})
  const [ errors, setErrors ] = useState([]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {  
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    fetch(`/users`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({...formData})
    })
    .then(r => {
      if(r.ok) {
        r.json()
        .then(data => {
          onChangeUser(data);
          changeModal('');
        });
      } else {
        r.json().then(err => {
          setErrors(err.errors);
        })
      }
    })
  }

  const isHidden = modal === 'createAccount' ? '' : 'hidden'

  return <div className={`${isHidden} ${style.login}`}>
    <form className={style.loginForm} onSubmit={handleSubmit}>
      <label htmlFor='username'>Username:</label>
      <input type='text' id='username' onChange={handleChange} value={formData.username}></input>
      <label htmlFor='password'>Password:</label>
      <input type='password' id='password' onChange={handleChange} value={formData.password}></input>
      <label htmlFor='password_confirmation'>Password confirmation:</label>
      <input type='password' id='password_confirmation' onChange={handleChange} value={formData.password_confirmation}></input>
      {errors.map(err => <div key={err} className={style.errors}>{err}</div>)}
      <button className='link' type='submit'>Create account</button>
      <div>Already have an account? <span className='link' onClick={() => changeModal('login')}>Log in instead</span></div>
    </form>
  </div>
}