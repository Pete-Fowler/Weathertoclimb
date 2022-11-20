import { useEffect } from "react";
import { Link } from "react-router-dom";
import useSaved from "../../App/Hooks/useSaved";
import style from "./Result.module.css";

interface Iprops {
  user: Iuser | null;
  location: Ilocation;
  onChangeUser: Function;
}

export default function Result({ user, location, onChangeUser }: Iprops) {
  const { setSavedStatus, handleSaveBtnClick, saveBtnText } = useSaved();

  useEffect(() => {
    setSavedStatus(user, location);
  }, [user, location, setSavedStatus]);

  function handleClick(e: React.MouseEvent<HTMLSpanElement>) {
    handleSaveBtnClick(user, location, onChangeUser);
  }

  return (
    <div className={style.result}>
      <Link to={`/locations/${location.id}`} className="link">
        {location.name}
      </Link>
      {user && (
        <span
          className={style.toggleSave}
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleClick}
        >
          {saveBtnText}
        </span>
      )}
    </div>
  );
}
