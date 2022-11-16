import style from "./MaxFavorites.module.css";

interface Props {
  modal: string;
}

export default function Login({ modal }: Props) {
  const isHidden = modal === "max-favorites" ? "" : "hidden";

  return (
    <div className={`${isHidden} ${style.maxFavorites}`}>
      Maximum number of saved areas is 15. Unsave some areas in order to save
      more.
    </div>
  );
}
