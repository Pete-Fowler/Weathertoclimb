import { useState } from "react";

interface Ifavorite {
  id: number;
  user_id: number;
  location_id: number;
}

interface Iuser {
  admin: boolean;
  default_location: null | string;
  favorites: Ifavorite[] | [];
  id: number;
  password_digest: string;
  username: string;
}

export default function useSaved() {
  const [saved, setSaved] = useState<boolean>(false);

  function isSaved(user: Iuser | null, location: any) {
    if (
      user &&
      location &&
      !!user.favorites.find((obj: Ifavorite) => obj.location_id === location.id)
    ) {
      setSaved(true);
    } else {
      setSaved(false);
    }
    return saved;
  }

  return { isSaved };
}
