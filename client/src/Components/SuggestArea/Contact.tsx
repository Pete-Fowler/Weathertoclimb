import style from './Contact.module.css';
import emailjs from '@emailjs/browser';

import React, { useRef } from 'react';

interface Iprops {
  modal: string
}

export default function SuggestArea({ modal }: Iprops) {
  const form = useRef<HTMLFormElement>(null);

  function sendEmail(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();

    form.current && emailjs.sendForm(process.env.REACT_APP_SERVICE_ID as string, 'template_5abz6io', form.current, process.env.REACT_APP_PUBLIC_EMAIL_KEY as string)
      .then((r) => {
          console.log(r.text);
      }, (err) => {
          console.log(err.text);
      });
  };
  const isHidden = modal === 'suggestArea' ? '' : 'hidden'

  return <div className={`${isHidden} ${style.formBox}`}>
    <form ref={form} className={style.form} onSubmit={sendEmail}>
      <label htmlFor='name'>Name:</label>
      <input type='text' id="name" name="name" minLength={2} maxLength={30}></input>
      <label htmlFor='email'>Email:</label>
      <input type='email' id='email' name='email'></input>
      <label htmlFor='lng'>Message:</label>
      <textarea id='message' name='message' placeholder='To suggest an area, please include name and GPS coordinates' minLength={20} maxLength={2000}></textarea>
      <button type='submit' className='link'>Submit</button>
    </form>
  </div>
}