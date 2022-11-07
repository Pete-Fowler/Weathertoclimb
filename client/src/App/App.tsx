import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import style from './App.module.css';
import Login from '../Components/Login/Login';
import CreateAccount from '../Components/CreateAccount/CreateAccount';
import Home from '../Components/Home/Home';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import Details from '../Components/Details/Details';

interface Iuser {
  admin: boolean,
  default_location: null | string,
  favorites?: number[],
  id: number,
  password_digest: string
  username: string 
}

export default function App() {
  const [ user, setUser ] = useState<Iuser | null>(null);


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

  function onChangeUser(data: Iuser | null) {
    setUser(data);
  }

  return (
    <div className={style.app}>
      <Header user={user} onChangeUser={onChangeUser}/>
      <div className={style.content}>
        <Routes>
            <Route path='/' element={<Home user={user} onChangeUser={onChangeUser} />}/>
            <Route path='/login' element={<Login user={user} onChangeUser={onChangeUser}/>} />
            <Route path='/create-account' element={<CreateAccount user={user} onChangeUser={onChangeUser}/>} />
            <Route path='/locations/:id' element={<Details user={user}/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}