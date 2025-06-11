import { useState, useEffect } from "react";

const useMouseData = ()=>{

  const [mouseData, setMouseData] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouseData({ x: event.x, y: event.y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return mouseData;

}

export default useMouseData;