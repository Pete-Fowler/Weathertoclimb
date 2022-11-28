import style from "./Favorites.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Iprops {
  user: Iuser | null;
  onChangeUser: Function;
  setLoading: Function;
}

export default function Weather({ user, onChangeUser, setLoading }: Iprops) {
  const [errors, setErrors] = useState<string | null>(null);
  const [locations, setLocations] = useState<Ilocation[]>([]);
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
    Promise.allSettled(
      locations.map((location) => fetch(location.forecast_url))
    ).then((responses) => responses.forEach((res) => console.log(res)));
    // setWeather([]);
    // locations.forEach((location) => {
    //   setLoading(true);
    //   fetch(`${location.forecast_url}`).then((r) => {
    //     if (r.ok) {
    //       r.json().then((data) => {
    //         setWeather((weather) => [
    //           ...weather,
    //           { name: location.name, id: location.id, weather: data },
    //         ]);
    //         setLoading(false);
    //       });
    //     } else {
    //       r.json().then((err) => console.log(err));
    //       reFetch(location);
    //     }
    //   });
    // });
  }, [locations]);

  function reFetch(location: Ilocation) {
    let i = 0;
    while (i < 6 && !weather.some((obj) => obj.id === location.id)) {
      setTimeout(() => {
        fetch(`${location.forecast_url}`).then((r) => {
          if (r.ok) {
            r.json().then((data) => {
              setWeather((weather) => [
                ...weather,
                { name: location.name, id: location.id, weather: data },
              ]);
              setLoading(false);
            });
          }
        });
      }, 250);
      i++;
    }
    i > 5 &&
      setErrors(
        "The National Weather Service did not load all data. Try refreshing the page momentarily."
      );
  }

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
          {(provided: any, snapshot: any) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {weather.map((location, index) => (
                <Draggable
                  key={location.name}
                  draggableId={location.name}
                  index={index}
                >
                  {(provided: any, snapshot: any) => (
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
