import GoogleMapReact from 'google-map-react';
import style from './Map.module.css';

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

export default function Map(){
  const defaultProps = {
    center: {
      lat: 39.725194,
      lng: -105.175531
    },
    zoom: 7
  };
// style={{ height: '100vh', width: '100%' }}
  return (
    // Important! Always set the container height explicitly
    <div className={style.map}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API as string }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}