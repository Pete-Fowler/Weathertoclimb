import { useState } from "react";

export default function useSaved() {
  const [saved, setSaved] = useState<boolean>(false);

  function setSavedStatus(user: Iuser | null, location: any) {
    if (
      user &&
      location &&
      !!user.favorites.find((obj: Ifavorite) => obj.location_id === location.id)
    ) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }

  function handleSaveBtnClick(
    user: Iuser | null,
    location: any,
    onChangeUser: Function
  ) {
    if (!saved) {
      fetch(`/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user?.id, location_id: location.id }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            onChangeUser((user: Iuser) => ({
              ...user,
              favorites: [...user.favorites, data],
            }));
          });
        } else {
          r.json().then((err) => console.log(err));
        }
      });
    } else {
      const fav = user?.favorites.find(
        (obj: Ifavorite) => obj.location_id === location.id
      );
      const favID = saved && fav ? `${fav.id}` : "";

      fetch(`/favorites/${favID}`, {
        method: "DELETE",
      }).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            onChangeUser((user: Iuser) => ({
              ...user,
              favorites: [
                ...user.favorites.filter((obj) => parseInt(favID) !== obj.id),
              ],
            }));
          });
        } else {
          r.json().then((err) => console.log(err));
        }
      });
    }
  }

  const saveBtnText = saved ? "Unsave" : "Save";

  return { setSavedStatus, handleSaveBtnClick, saveBtnText };
}
