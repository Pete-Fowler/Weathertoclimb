import { ChangeEvent, useState } from "react";
import style from "../Login/Login.module.css";

interface Iprops {
  modal: string;
  onChangeUser: Function;
  changeModal: Function;
}

export default function CreateAccount({
  onChangeUser,
  modal,
  changeModal,
}: Iprops) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState([]);
  const [frontendErrors, setFrontendErrors] = useState({
    username: "",
    password: "",
    password_confirmation: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    validate(e);
  }

  function validate(e: ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;

    setFrontendErrors((err) => ({ ...err, [id]: "" }));
    setErrors([]);

    switch (id) {
      case "username":
        if (value.length < 3 || value.length > 30) {
          setFrontendErrors((err) => ({
            ...err,
            [id]: "Please enter a username between 3 and 30 characters",
          }));
        }
        break;

      case "password":
        if (value.length < 6 || value.length > 16) {
          setFrontendErrors((err) => ({
            ...err,
            [id]: "Password must be between 6 and 16 characters",
          }));
        } else if (
          formData.password_confirmation &&
          value !== formData.password_confirmation
        ) {
          setFrontendErrors((err) => ({
            ...err,
            password_confirmation: "Passwords must match",
          }));
        }
        break;

      case "password_confirmation":
        if (value.length < 6 || value.length > 16) {
          setFrontendErrors((err) => ({
            ...err,
            [id]: "Password must be between 6 and 16 characters",
          }));
        } else if (formData.password && value !== formData.password) {
          setFrontendErrors((err) => ({
            ...err,
            [id]: "Passwords must match",
          }));
        }
        break;
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch(`/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          onChangeUser(data);
          changeModal("");
          setFormData({
            username: "",
            password: "",
            password_confirmation: "",
          });
        });
      } else {
        r.json().then((err) => {
          setErrors(err.errors);
        });
      }
    });
  }

  const isHidden = modal === "createAccount" ? "" : "hidden";
  const usernameClass = frontendErrors.username ? style.invalid : "";
  const passwordClass = frontendErrors.password ? style.invalid : "";
  const passwordConfirmationClass = frontendErrors.password_confirmation
    ? style.invalid
    : "";
  const isDisabled = Object.values(frontendErrors).some((val) => val !== "")
    ? true
    : false;

  return (
    <div className={`${isHidden} ${style.login}`}>
      <form className={style.loginForm} onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          className={usernameClass}
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={formData.username}
        ></input>
        {frontendErrors.username && (
          <div className={style.errors}>{frontendErrors.username}</div>
        )}

        <label htmlFor="password">Password:</label>
        <input
          className={passwordClass}
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        ></input>
        {frontendErrors.password && (
          <div className={style.errors}>{frontendErrors.password}</div>
        )}

        <label htmlFor="password_confirmation">Password confirmation:</label>
        <input
          className={passwordConfirmationClass}
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          onChange={handleChange}
          value={formData.password_confirmation}
        ></input>

        {frontendErrors.password_confirmation && (
          <div className={style.errors}>
            {frontendErrors.password_confirmation}
          </div>
        )}

        {errors.map((err) => (
          <div key={err} className={style.errors}>
            {err}
          </div>
        ))}

        <button className="link" type="submit" disabled={isDisabled}>
          Create account
        </button>

        <div>
          Already have an account?{" "}
          <span className="link" onClick={() => changeModal("login")}>
            Log in instead
          </span>
        </div>
      </form>
    </div>
  );
}
