import pin from "./pin.png";
import style from "./Marker.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useSaved from "../../App/Hooks/useSaved";
import useFetch from "../../App/Hooks/useFetch";

interface Iprops {
  user: Iuser | null;
  location: any;
  onChangeUser: Function;
  setLoading: Function;
  lat: string;
  lng: string;
}

export default function Marker({
  user,
  onChangeUser,
  location,
  setLoading,
}: Iprops) {
  const [isShown, setIsShown] = useState(false);

  const { setSavedStatus, handleSaveBtnClick, saveBtnText } = useSaved();

  const { getDaily, daily, errors, loaded } = useFetch();

  useEffect(() => {
    setSavedStatus(user, location);
  }, [user, location, setSavedStatus]);

  useEffect(() => {
    loaded.daily && setLoading(false);
  }, [loaded, setLoading]);

  function showModal() {
    setIsShown(true);
    getDaily(location, setLoading);
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
          {user && (
            <span className={style.toggleSave} onClick={handleClick}>
              {saveBtnText}
            </span>
          )}

          <div className={style.daily}>
            {loaded.daily
              ? daily.properties.periods
                  .slice(0, 6)
                  .map((period: Iperiod, index: number, array: Iperiod[]) =>
                    !period.name.toLowerCase().includes("night") ? (
                      <div key={period.number} className={style.period}>
                        <div className={style.periodName}>
                          {index === 0 ? "TODAY" : period.name.toUpperCase()}
                        </div>
                        <img
                          className={style.icon}
                          src={period.icon}
                          alt={period.shortForecast}
                        />
                        <div className={style.temp}>
                          {period.temperature}&deg; F /{" "}
                          {index < array.length - 1
                            ? array[index + 1].temperature
                            : ""}
                          &deg; F
                        </div>
                        <div className={style.windSpeed}>
                          {period.windSpeed}
                        </div>
                        {/* <div className={style.detailedForecast}>
                          {period.detailedForecast}
                        </div> */}
                      </div>
                    ) : (
                      ""
                    )
                  )
              : ""}
          </div>
        </div>
      ) : (
        ""
      )}
      <img className={style.pin} src={pin} alt="marker" />
    </div>
  );
}
