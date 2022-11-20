import style from "./Details.module.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import useIsSaved from "../../App/Hooks/useSaved";
import useFetch from "../../App/Hooks/useFetch";

interface Iprops {
  user: Iuser | null;
  onChangeUser: Function;
  changeModal: Function;
  setLoading: Function;
}

export default function Details({
  user,
  onChangeUser,
  changeModal,
  setLoading,
}: Iprops) {
  const [location, setLocation] = useState<any>(null);

  const { setSavedStatus, handleSaveBtnClick, saveBtnText } = useIsSaved();
  const { getDaily, daily, getHourly, hourly, errors, loaded } = useFetch();

  const { id } = useParams();

  const navigate = useNavigate();

  // Set location from params id
  useEffect(() => {
    setLoading(true);
    fetch(`/locations/${id}`).then((r) => {
      if (r.ok) {
        r.json().then((data) => setLocation(data));
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }, [id, setLoading]);

  // Fetch forecasts
  useEffect(() => {
    setLoading(true);
    getDaily(location);
    getHourly(location);
  }, [location, getDaily, getHourly, setLoading]);

  function deleteArea() {
    fetch(`/locations/${location.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        navigate("/");
      });
  }

  function handleClick() {
    handleSaveBtnClick(user, location, onChangeUser);
  }

  useEffect(() => {
    setSavedStatus(user, location);
  }, [user, location, setSavedStatus]);

  const isDisabled = user && user.favorites.length > 15 ? true : false;

  useEffect(() => {
    if (loaded.daily && loaded.hourly) setLoading(false);
  }, [loaded, setLoading]);

  return (
    <div className={style.details}>
      {errors && <div>{errors}</div>}

      <div className={style.titleBox}>
        <h1>{location && location.name}</h1>
        {user && (
          <button
            className={style.saveBtn}
            onClick={
              isDisabled ? () => changeModal("max-favorites") : handleClick
            }
          >
            {saveBtnText}
          </button>
        )}
        {user && user.admin ? (
          <button className={style.deleteBtn} onClick={deleteArea}>
            Delete Area
          </button>
        ) : (
          ""
        )}
      </div>

      <div className={style.hourly}>
        {loaded.hourly
          ? hourly.properties.periods
              .slice(0, 72)
              .map((hour: Iperiod, index: number, array: Iperiod) => (
                <div key={hour.number} className={style.hour}>
                  {index === 0 ||
                  format(new Date(hour.startTime), "h aa") === "12 AM" ? (
                    <div className={style.day}>
                      {format(new Date(hour.startTime), "ccc")}
                    </div>
                  ) : (
                    <div className={style.day}></div>
                  )}
                  <div>{format(new Date(hour.startTime), "h aa")}</div>
                  <img src={hour.icon} alt={hour.shortForecast}></img>
                  <div>{hour.temperature} F</div>
                  <div>{hour.windSpeed}</div>
                  <div className={style.shortForecast}>
                    {hour.shortForecast}
                  </div>
                </div>
              ))
          : ""}
      </div>

      <div className={style.daily}>
        {loaded.daily
          ? daily.properties.periods.map(
              (period: Iperiod, index: number, array: Iperiod[]) =>
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
                    <div className={style.windSpeed}>{period.windSpeed}</div>
                    <div className={style.detailedForecast}>
                      {period.detailedForecast}
                    </div>
                  </div>
                ) : (
                  ""
                )
            )
          : ""}
      </div>
    </div>
  );
}
