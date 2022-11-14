import style from './CreateLocation.module.css';
import { useState, ChangeEvent } from 'react';

interface Iprops {
  modal: string,
  changeModal: Function
}

export default function CreateLocation({ modal, changeModal }: Iprops) {
  const [ formData, setFormData ] = useState({
    name: '',
    state: '',
    coordinates: '',
    forecast_url: '',
    popular: false,
  })

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({...formData, [e.target.name]: value})
  }

  function handleSubmit() {

  }

  const isHidden = modal === 'max-favorites' ? '' : 'hidden';
console.log(formData)
  return (
  <div className={`${isHidden} ${style.formBox}`}>
    <form className={style.form} onSubmit={handleSubmit}>
      <label htmlFor='name'>Name:</label>
      <input type='text' id="name" name="name" value={formData.name} onChange={handleChange}></input>
      <label htmlFor='state'>Email:</label>
      <input type='email' id='state' name='state' value={formData.state} onChange={handleChange}></input>
      <label htmlFor='coordinates'>Message:</label>
      <input id='coordinates' name='coordinates' value={formData.coordinates} onChange={handleChange}></input>
      <label htmlFor='popular'>Popular</label>
      <input type='checkbox' id='popular' name='popular' checked={formData.popular}></input>
      <button type='submit' className='link'>Submit</button>
    </form>
  </div>)
}