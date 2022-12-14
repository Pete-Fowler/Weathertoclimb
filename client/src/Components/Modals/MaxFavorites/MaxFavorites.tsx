import style from "./MaxFavorites.module.css";

interface Iprops {
  modal: string;
}

export default function Login({ modal }: Iprops) {
  const isHidden = modal === "max-favorites" ? "" : "hidden";

  return (
    <div className={`${isHidden} ${style.maxFavorites}`}>
      Maximum number of saved areas is 15. Unsave some areas in order to save
      more.
    </div>
  );
}
