import pin from "./pin.png";
import style from "./Marker.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useSaved from "../../App/Hooks/useSaved";

interface Iprops {
  user: Iuser | null;
  location: any;
  onChangeUser: Function;
  lat: string;
  lng: string;
}

export default function Marker({ user, onChangeUser, location }: Iprops) {
  const [isShown, setIsShown] = useState(false);

  const { setSavedStatus, handleSaveBtnClick, saveBtnText } = useSaved();

  useEffect(() => {
    setSavedStatus(user, location);
  }, [user, location, setSavedStatus]);

  function showModal() {
    setIsShown(true);
  }

  function hideModal() {
    setIsShown(false);
  }

  function handleClick() {
    handleSaveBtnClick(user, location, onChangeUser);
  }

  return (
    <div
      className={style.marker}
      onMouseEnter={showModal}
      onMouseLeave={hideModal}
    >
      {isShown ? (
        <div className={style.modal}>
          <Link
            className={`link ${style.name}`}
            to={`/locations/${location.id}`}
          >
            {location.name}
          </Link>
          <span className={style.toggleSave} onClick={handleClick}>
            {saveBtnText}
          </span>
        </div>
      ) : (
        ""
      )}
      <img src={pin} alt="marker" />
    </div>
  );
}
