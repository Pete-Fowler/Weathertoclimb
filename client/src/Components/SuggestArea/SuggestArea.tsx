import style from './SuggestArea.module.css';

import React, { ChangeEvent, useState } from 'react';

interface Iprops {
  modal: string
}

export default function SuggestArea({ modal }: Iprops) {
  const [ formData, setFormData ] = useState({areaName: '', lat: '', lng: ''})

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
  }

  const isHidden = modal === 'suggestArea' ? '' : 'hidden'

  return <div className={`${isHidden} ${style.formBox}`}>
    <form className={style.form} onSubmit={handleSubmit}>
      <label htmlFor='areaName'>Area Name</label>
      <input type='text' id="areaName" name="areaName" value={formData.areaName} onChange={handleChange}></input>
      <label htmlFor='lat'>Latitude</label>
      <input type='text' id='lat' name='lat' value={formData.lat} onChange={handleChange}></input>
      <label htmlFor='lng'>Longitude</label>
      <input type='text' id='lng' name='lng' value={formData.lng} onChange={handleChange}></input>
      <button type='submit' className='link'>Submit</button>
    </form>
  </div>
}