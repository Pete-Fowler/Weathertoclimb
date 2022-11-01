
export default function CreateAccount({ user, onChangeUser }) {

  return <div>
    <form>
      <label>
        <input name='username'></input>
      </label>
      <label>
        <input name='password'></input>
      </label>
      <label>
        <input name='passwordConfirmation'></input>
      </label>
    </form>
  </div>
}