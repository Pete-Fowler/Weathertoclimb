import React, { ChangeEvent, useState } from "react";
import style from "./Login.module.css";

interface Iprops {
  user: Iuser | null;
  onChangeUser: Function;
  modal: string;
  changeModal: Function;
}

export default function Login({
  user,
  onChangeUser,
  modal,
  changeModal,
}: Iprops) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState([]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch(`/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          onChangeUser(data);
          changeModal("");
          setFormData({ username: "", password: "" });
        });
      } else {
        r.json().then((err) => {
          setErrors(err.errors);
        });
      }
    });
  }

  const isHidden = modal === "login" ? "" : "hidden";

  return (
    <div className={`${isHidden} ${style.login}`}>
      <form
        className={style.loginForm}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <label htmlFor="usernameLogin">Username:</label>
        <input
          type="text"
          id="usernameLogin"
          name="username"
          onChange={handleChange}
          value={formData.username}
        ></input>

        <label htmlFor="passwordLogin">Password:</label>
        <input
          type="password"
          id="passwordLogin"
          name="password"
          onChange={handleChange}
          value={formData.password}
        ></input>

        <button className="link" type="submit">
          Login
        </button>

        {errors.map((err) => (
          <div key={err} className={style.errors}>
            {err}
          </div>
        ))}

        <div className="link" onClick={() => changeModal("createAccount")}>
          Create an account
        </div>
      </form>
    </div>
  );
}
