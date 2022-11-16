import style from "./CreateLocation.module.css";
import React, { useState, ChangeEvent } from "react";

interface Iprops {
  modal: string;
  changeModal: Function;
}

export default function CreateLocation({ modal, changeModal }: Iprops) {
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    coordinates: "",
    forecast_url: "",
    popular: false,
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(`/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => console.log(data));
      } else {
        r.json().then((err) => console.log(err));
      }
      changeModal("");
    });
  }

  const isHidden = modal === "createLocation" ? "" : "hidden";

  return (
    <div className={`${isHidden} ${style.formBox}`}>
      <form className={style.form} onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        ></input>

        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
        ></input>

        <label htmlFor="coordinates">Coordinates:</label>
        <input
          id="coordinates"
          name="coordinates"
          value={formData.coordinates}
          onChange={handleChange}
        ></input>

        <label htmlFor="forecast_url">Forecast URL:</label>
        <input
          id="forecast_url"
          name="forecast_url"
          value={formData.forecast_url}
          onChange={handleChange}
        ></input>

        <label htmlFor="popular">
          Popular:
          <input
            type="checkbox"
            id="popular"
            name="popular"
            checked={formData.popular}
            onChange={handleChange}
          ></input>
        </label>

        <button type="submit" className="link">
          Submit
        </button>
      </form>
    </div>
  );
}
