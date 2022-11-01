import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Login from ''

function App() {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    fetch(`/me`)
    .then(r => {
      if(r.ok) {
        r.json().then(data => setUser(data));
      } else {
        r.json().then(err => alert(err.errors));
      }
    })
    }, [])

  function onChangeUser(data) {
    setUser(data);
  }

  return (
    <div className="App">
      <Routes>
        <Route path='login' element={<Login user={user} onChangeUser={onChangeUser}/>} />
        <Route path='create-account' element={<CreateAccount user={user} onChangeUser={onChangeUser}/>} />
      </Routes>
    </div>
  );
}

export default App;
