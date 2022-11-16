import style from "./Loading.module.css";

interface Iprops {
  modal: string;
}

export default function Loading({ modal }: Iprops) {
  const isShown = modal === "loading" ? "" : "hidden";

  return <div className={`${style.loading}`}></div>;
}
