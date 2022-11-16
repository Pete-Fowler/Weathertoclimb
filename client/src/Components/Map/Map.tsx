import GoogleMapReact from "google-map-react";
import style from "./Map.module.css";

interface Iprops {
  center: { lat: number; lng: number };
  zoom: number;
  markers: any;
}

export default function Map({ center, zoom, markers }: Iprops) {
  return (
    <div className={style.map}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API as string }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
}
