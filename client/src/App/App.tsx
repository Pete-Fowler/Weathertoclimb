import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./App.module.css";
import Login from "../Components/Login/Login";
import CreateAccount from "../Components/Login/CreateAccount";
import Home from "../Components/Home/Home";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Details from "../Components/Details/Details";
import Favorites from "../Components/Favorites/Favorites";
import MaxFavorites from "../Components/Modals/MaxFavorites/MaxFavorites";
import SuggestArea from "../Components/Modals/SuggestArea/Contact";
import CreateLocation from "../Components/CreateLocation/CreateLocation";
import Loading from "../Components/Modals/Loading/Loading";

interface Ifavorite {
  id: number;
  user_id: number;
  location_id: number;
}

interface Iuser {
  admin: boolean;
  default_location: null | string;
  favorites: Ifavorite[] | [];
  id: number;
  password_digest: string;
  username: string;
}

export default function App() {
  const [user, setUser] = useState<Iuser | null>(null);
  const [modal, setModal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/me`).then((r) => {
      if (r.ok) {
        r.json().then((data) => setUser(data));
      } else {
        r.json().then((err) => console.log(err.errors));
      }
    });
  }, []);

  function onChangeUser(data: Iuser | null) {
    setUser(data);
  }

  function changeModal(str: string) {
    setModal(str);
  }

  const isHidden = modal === "" ? "hidden" : "";

  return (
    <div className={style.app}>
      <div
        className={`${isHidden} ${style.screen}`}
        onClick={() => setModal("")}
      ></div>
      <Header
        user={user}
        onChangeUser={onChangeUser}
        changeModal={changeModal}
      />
      <div className={style.content}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                user={user}
                onChangeUser={onChangeUser}
                setLoading={setLoading}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                user={user}
                onChangeUser={onChangeUser}
                setLoading={setLoading}
              />
            }
          />
          <Route
            path="/locations/:id"
            element={
              <Details
                user={user}
                onChangeUser={onChangeUser}
                changeModal={changeModal}
                setLoading={setLoading}
              />
            }
          />
        </Routes>
        <Login
          user={user}
          onChangeUser={onChangeUser}
          modal={modal}
          changeModal={changeModal}
        />
        <CreateAccount
          onChangeUser={onChangeUser}
          modal={modal}
          changeModal={changeModal}
        />
        <MaxFavorites modal={modal} />
        <SuggestArea modal={modal} changeModal={changeModal} />
        <CreateLocation modal={modal} changeModal={changeModal} />
        <Loading loading={loading} />
      </div>
      <Footer user={user} changeModal={changeModal} />
    </div>
  );
}
