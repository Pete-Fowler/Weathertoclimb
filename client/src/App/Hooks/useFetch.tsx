import { useState } from "react";

export default function useFetch() {
  const [errors, setErrors] = useState<string | null>(null);
  const [daily, setDaily] = useState<any>([]);
  const [hourly, setHourly] = useState<any>([]);
  const [loaded, setLoaded] = useState<Iloaded>({
    hourly: false,
    daily: false,
  });

  function getDaily(location: any) {
    setErrors("");
    if (location) {
      fetch(`${location.forecast_url}`).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setDaily(data);
            setLoaded((loaded) => ({ ...loaded, daily: true }));
          });
        } else {
          r.json().then((err) => console.log(err));
          let i = 0;
          while (i < 6 && loaded.daily === false) {
            setTimeout(() => {
              fetch(`${location.forecast_url}`).then((r) => {
                if (r.ok) {
                  r.json().then((data) => {
                    setDaily(data);
                    setLoaded((loaded) => ({ ...loaded, daily: true }));
                    setErrors("");
                  });
                }
              });
            }, 250);
            i++;
          }
          i >= 6 &&
            setErrors(
              "The National Weather Service did not load all data. Try refreshing the page momentarily."
            );
        }
      });
    }
  }

  function getHourly(location: any) {
    if (location) {
      fetch(`${location.forecast_url}/hourly`).then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            setHourly(data);
            setLoaded((loaded) => ({ ...loaded, hourly: true }));
          });
        } else {
          r.json().then((err) => console.log(err));
          let i = 0;
          while (i < 6 && loaded.hourly === false) {
            setTimeout(() => {
              fetch(`${location.forecast_url}/hourly`).then((r) => {
                if (r.ok) {
                  r.json().then((data) => {
                    setHourly(data);
                    setLoaded((loaded) => ({ ...loaded, hourly: true }));
                    setErrors("");
                  });
                }
              });
            }, 250);
            i++;
          }
          i >= 6 &&
            setErrors(
              "The National Weather Service did not load all data. Try refreshing the page momentarily."
            );
        }
      });
    }
  }
  return { getDaily, errors, daily, loaded };
}
