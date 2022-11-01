import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home({ user, onChangeUser }) {
  const [ modals, setModals ] = useState<object>({login: false, createAccount: false});

  return <div>

    <button>Login</button>
    
  </div>
}