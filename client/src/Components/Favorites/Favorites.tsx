import style from "./Favorites.module.css";
import dragIndicator from "./dragIndicator.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Iuser {
  admin: boolean;
  default_location: null | string;
  favorites: Ifavorite[] | [];
  id: number;
  password_digest: string;
  username: string;
}

interface Ifavorite {
  id: number;
  user_id: number;
  location_id: number;
}

interface Iprops {
  user: {
    admin: boolean;
    default_location: null | string;
    favorites: Ifavorite[] | [];
    id: number;
    password_digest: string;
    username: string;
  } | null;
  onChangeUser: Function;
}

interface Iperiod {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: "F";
  temperatureTrend: string;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}

interface Imodal {
  locationID: number;
  periodNumber: number;
}

export default function Weather({ user, onChangeUser }: Iprops) {
  const [errors, setErrors] = useState<string | null>(null);
  const [locations, setLocations] = useState<any[]>([]);
  const [weather, setWeather] = useState<any[]>([]);
  const [modal, setModal] = useState<Imodal | null>(null);

  // Get user's saved locations from IDs
  useEffect(() => {
    const ids: number[] = [];
    user?.favorites.forEach((obj) => {
      ids.push(obj.location_id);
    });

    fetch(`/locations?ids=${ids}`).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setLocations(data);
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }, [user]);

  // fetch forecasts for each location
  useEffect(() => {
    setWeather([]);
    locations.forEach((location) => {
      fetch(`${location.forecast_url}`).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setWeather((weather) => [
              ...weather,
              { name: location.name, id: location.id, weather: data },
            ]);
          });
        } else {
          r.json().then((err) => console.log(err.errors));
          console.log("fail");
          let i = 0;
          while (i < 10 && weather.some((obj) => obj.id === location.id)) {
            setTimeout(() => {
              fetch(`${location.forecast_url}`).then((r) => {
                if (r.ok) {
                  r.json().then((data) => {
                    setWeather((weather) => [
                      ...weather,
                      { name: location.name, id: location.id, weather: data },
                    ]);
                  });
                }
              });
            }, 100);
            i++;
          }
          i > 10 &&
            setErrors(
              "The National Weather Service did not load all data. Try refreshing the page momentarily."
            );
        }
      });
    });
  }, [locations]);

  function unSave(locationID: number) {
    const fav = user?.favorites.find((obj) => obj.location_id === locationID);
    const favID = fav?.id;

    fetch(`/favorites/${favID}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          onChangeUser((user: Iuser) => ({
            ...user,
            favorites: [...user.favorites.filter((fav) => fav.id !== favID)],
          }));
        });
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }

  function showModal(location: number, period: number) {
    setModal({ locationID: location, periodNumber: period });
  }

  function hideModal() {
    setModal(null);
  }

  function onDragEnd(result: any) {
    const newWeather = [...weather];
    const [removed] = newWeather.splice(result.source.index, 1);
    newWeather.splice(result.destination.index, 0, removed);
    setWeather(newWeather);
  }

  return (
    <div className={style.weatherSection}>
      {errors && <div className="errors">{errors}</div>}

      {user?.favorites.length === 0 && (
        <div className={style.saveMessage}>
          Save areas to compare weather forecases side by side
        </div>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {weather.map((location, index) => (
                <Draggable
                  key={location.name}
                  draggableId={location.name}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className={style.weatherCard}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className={style.name}>
                        <Link
                          className={style.link}
                          to={`/locations/${location.id}`}
                        >
                          {location.name}
                        </Link>
                        <button
                          className={style.unSaveBtn}
                          onClick={() => unSave(location.id)}
                        >
                          Unsave Area
                        </button>
                      </div>
                      <div className={style.periods}>
                        {location.weather.properties.periods.map(
                          (period: Iperiod, index: number, array: Iperiod[]) =>
                            !period.name.toLowerCase().includes("night") ? (
                              <div key={period.number} className={style.period}>
                                <div
                                  className={`${
                                    location.id === modal?.locationID &&
                                    period.number === modal?.periodNumber
                                      ? ""
                                      : "hidden"
                                  } ${style.modal}`}
                                >
                                  {period.detailedForecast}
                                </div>
                                <div className={style.periodName}>
                                  {index === 0 ? "Today" : period.name}
                                </div>
                                <img
                                  className={style.icon}
                                  src={period.icon}
                                  alt={period.shortForecast}
                                  onMouseEnter={() =>
                                    showModal(location.id, period.number)
                                  }
                                  onMouseLeave={hideModal}
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
                              </div>
                            ) : (
                              ""
                            )
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
