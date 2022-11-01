import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import style from '../Login/Login.module.css';

interface Props {
  user: object | null,
  onChangeUser: Function
}

export default function CreateAccount({ user, onChangeUser }: Props) {
  const [ formData, setFormData ] = useState({username: '', password: '', password_confirmation: ''})

  const navigate = useNavigate();

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
          console.log(data);
          onChangeUser(data);
          navigate(`/`);
        });
      } else {
        r.json().then(err => {
          console.log(err);
          alert(err);
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
      <label htmlFor='password_confirmation'>Password confirmation:</label>
      <input id='password_confirmation' onChange={handleChange} value={formData.password_confirmation}></input>
      <button type='submit'>Create account</button>
      <div>Already have an account? <Link to='/login'>Log in instead</Link></div>
    </form>
  </div>
}