import style from "./Contact.module.css";
import emailjs from "@emailjs/browser";

import React, { ChangeEvent, useRef, useState } from "react";

interface Iprops {
  modal: string;
  changeModal: Function;
}

export default function SuggestArea({ modal, changeModal }: Iprops) {
  const form = useRef<HTMLFormElement>(null);
  const [inputs, setInputs] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  function sendEmail(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    form.current &&
      emailjs
        .sendForm(
          process.env.REACT_APP_SERVICE_ID as string,
          "template_5abz6io",
          form.current,
          process.env.REACT_APP_PUBLIC_EMAIL_KEY as string
        )
        .then(
          (r) => {
            console.log(r.text);
            changeModal("");
            setInputs({ user_name: "", user_email: "", message: "" });
          },
          (err) => {
            console.log(err.text);
          }
        );
  }

  const isHidden = modal === "suggestArea" ? "" : "hidden";

  return (
    <div className={`${isHidden} ${style.formBox}`}>
      <form ref={form} className={style.form} onSubmit={sendEmail}>
        <label htmlFor="user_name">Name:</label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          value={inputs.user_name}
          onChange={handleChange}
          minLength={2}
          maxLength={30}
        ></input>
        <label htmlFor="user_email">Email:</label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          value={inputs.user_email}
          onChange={handleChange}
        ></input>
        <label htmlFor="lng">Message:</label>
        <textarea
          id="message"
          name="message"
          value={inputs.message}
          onChange={handleChange}
          placeholder="To suggest an area, please include name and GPS coordinates"
          minLength={20}
          maxLength={2000}
        />
        <button type="submit" className="link">
          Submit
        </button>
      </form>
    </div>
  );
}
