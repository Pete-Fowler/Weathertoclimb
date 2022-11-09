import GoogleMapReact from 'google-map-react';
import style from './Map.module.css';

// const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

export default function Map(){
  const defaultProps = {
    center: {
      lat: 39.725194,
      lng: -105.175531
    },
    zoom: 7
  };

  return (
    <div className={style.map}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API as string }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {/* <AnyReactComponent
          lat={39.710506}
          lng={-105.120089}
          text="My Marker"
        /> */

        // Map locations prop here to <Marker /> 
        }
      </GoogleMapReact>
    </div>
  );
}