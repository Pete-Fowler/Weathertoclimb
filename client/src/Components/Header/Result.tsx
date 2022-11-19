import { Link } from "react-router-dom";

interface Iprops {
  location: Ilocation;
}

export default function Result({ location }: Iprops) {
  return (
    <div>
      <Link to={`/locations/${location.id}`} className="link">
        {location.name}
      </Link>
    </div>
  );
}
