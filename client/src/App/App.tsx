import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import style from './App.module.css';
import Login from '../Components/Login/Login';
import CreateAccount from '../Components/CreateAccount/CreateAccount';
import Home from '../Components/Home/Home';

export default function App() {
  const [ user, setUser ] = useState<object|null>(null);

  useEffect(() => {
    fetch(`/me`)
    .then(r => {
      if(r.ok) {
        r.json().then(data => setUser(data));
      } else {
        r.json().then(err => console.log(err.errors));
      }
    })
    }, [])

  function onChangeUser(data: object|null) {
    setUser(data);
  }

  return (
    <div className={style.app}>
      <Routes>
        <Route path='/' element={<Home user={user} onChangeUser={onChangeUser}/>}/>
        <Route path='login' element={<Login user={user} onChangeUser={onChangeUser}/>} />
        <Route path='create-account' element={<CreateAccount user={user} onChangeUser={onChangeUser}/>} />
      </Routes>
    </div>
  );
}