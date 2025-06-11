import { useCallback, useEffect, useState } from "react";

type TScrollData = {
  pageYOffset: number;
};

const useScrollData = () => {
  const [data, setData] = useState<TScrollData>({ pageYOffset: 0 });

  const listener = useCallback(() => {
    let tick = false;
    if (!tick) {
      window.requestAnimationFrame(() => {
        setData({ pageYOffset: window.pageYOffset });
        tick = false;
      });
    }

    tick = true;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [listener]);

  return data;
};

export default useScrollData;
