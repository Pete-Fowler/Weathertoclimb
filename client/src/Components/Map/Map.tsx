import GoogleMapReact from 'google-map-react';
import style from './Map.module.css';
import Marker from './Marker';

interface Iprops {
  center: {lat: number, lng: number},
  zoom: number
}

export default function Map({center, zoom}: Iprops){

  return (
    <div className={style.map}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API as string }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {
        <Marker
          lat={39.710506}
          lng={-105.120089}
          text="My Marker"
        />
        // Map locations prop here to <Marker /> 
        }
      </GoogleMapReact>
    </div>
  );
}