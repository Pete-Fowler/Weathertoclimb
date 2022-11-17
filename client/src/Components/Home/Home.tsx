import style from "./Home.module.css";
import Map from "../Map/Map";
import Marker from "../Map/Marker";
import { useEffect, useState } from "react";

interface Props {
  user: {
    admin: boolean;
    default_location: null | string;
    id: number;
    password_digest: string;
    username: string;
  } | null;
  onChangeUser?: Function;
}

interface Ilocation {
  id: number;
  name: string;
  lat: number;
  lng: number;
}
export default function Home({ user }: Props) {
  const [markers, setMarkers] = useState<Ilocation[]>([]);

  // Fetch locations and save in state as map markers
  useEffect(() => {
    fetch(`/locations`).then((r) => {
      if (r.ok) {
        r.json().then((data) =>
          setMarkers(
            data.map((loc: any) => (
              <Marker
                key={loc.id}
                id={loc.id}
                name={loc.name}
                lat={loc.coordinates.split(",")[0]}
                lng={loc.coordinates.split(",")[1]}
              />
            ))
          )
        );
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }, []);

  const heroText = user
    ? "Save Areas to Compare Forecasts Side by Side"
    : "Log in to Save Areas and Compare Forecasts Side by Side";
  return (
    <div className={style.home}>
      <div className={style.hero}>
        <Map
          center={{ lat: 39.725194, lng: -105.175531 }}
          zoom={7}
          markers={markers}
        />
        <div className={style.heroText}>{heroText}</div>
      </div>
    </div>
  );
}
