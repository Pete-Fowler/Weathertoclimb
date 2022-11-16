import style from "./Loading.module.css";

interface Iprops {
  loading: boolean;
}

export default function Loading({ loading }: Iprops) {
  const isShown = loading ? "" : "hidden";

  return <div className={`${isShown} ${style.loading}`}></div>;
}
