import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import style from './App.module.css';
import Login from '../Components/Login/Login';
import CreateAccount from '../Components/Login/CreateAccount';
import Home from '../Components/Home/Home';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import Details from '../Components/Details/Details';
import Favorites from '../Components/Favorites/Favorites';

interface Ifavorite {
  id: number,
  user_id: number,
  location_id: number,
}

interface Iuser {
  admin: boolean,
  default_location: null | string,
  favorites: Ifavorite[] | [],
  id: number,
  password_digest: string
  username: string 
}

export default function App() {
  const [ user, setUser ] = useState<Iuser | null>(null);
  const [ modals, setModals ] = useState({login: false, createAccount: false, submitArea: false});

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

  function toggleModal(modal: 'login' | 'createAccount' | 'submitArea') {
    const opposite = !modals[modal];
    setModals(modals => ({...modals, [modal]: opposite }))
    if(Object.values(modals).some(val => val === true)) {
      window.addEventListener('scroll', resetModals);
      
    } else {
      window.removeEventListener('scroll', resetModals);
    }

    function resetModals() {
      setModals(modals => ({login: false, createAccount: false, submitArea: false}))
    }
  }

  return (
    <div className={style.app}>
      <Header user={user} onChangeUser={onChangeUser} toggleModal={toggleModal}/>
      <div className={style.content}>
        <Routes>
            <Route path='/' element={<Home user={user} />}/>
            <Route path='/favorites' element={<Favorites user={user} onChangeUser={onChangeUser}/>} />
            <Route path='/locations/:id' element={<Details user={user} onChangeUser={onChangeUser}/>} />
        </Routes>
        {modals.login ? <Login user={user} onChangeUser={onChangeUser} toggleModal={toggleModal}/> : ''}
        {modals.createAccount ? <CreateAccount user={user} onChangeUser={onChangeUser} toggleModal={toggleModal}/> : ''}
        {/* {modals.submitArea ? <SubmitArea /> : ''} */}
      </div>
      <Footer />
    </div>
  );
}