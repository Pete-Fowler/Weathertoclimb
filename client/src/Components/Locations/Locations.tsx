import style from './Locations.module.css';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Locations() {
  const [ locations, setLocations ] = useState<any[]>([]);
  const { term } = useParams();

  // Fetch locations with query param
  useEffect(() => {
    fetch(`/locations?q=${term}`)
    .then(r => {
      if(r.ok) {
        r.json().then(data => setLocations(data))
      }
    })
  }, [term])
console.log(locations);

  return <div>
    {locations.map(location => 
      <Link key={location.name} to={`/details/${location.name}`}>{location.name}</Link>
    )}
  </div>

}