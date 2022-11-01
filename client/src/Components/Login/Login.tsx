import { Link } from 'react-router-dom';

export default function Login({ user, onChangeUser }) {

  return <div>
    <form>
      <label>
        <input name='username'></input>
      </label>
      <label>
        <input name='password'></input>
      </label>
    </form>
    <Link to='create-account'>Create an account</Link>
  </div>
}