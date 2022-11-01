import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

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

  return (
    <div className="App">
      <Routes>
        <Route path='login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
