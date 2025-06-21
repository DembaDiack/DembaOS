import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState, type PropsWithChildren } from "react";
import Bar from "./Bar";

interface IWindow {
  id: string;
  index: number;
  onClickWindow?: (id: string, index: number) => void;
  lastX?: number;
  lastY?: number;
}

const Window: React.FC<PropsWithChildren<IWindow>> = ({
  id,
  index,
  children,
  onClickWindow,
  lastX = 0,
  lastY = 0,
}) => {
  const width = 800;
  const height = 500;

  const windowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!windowRef.current) return;

    gsap.fromTo(
      windowRef.current,
      {
        scale: 0.5,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      }
    );
  }, []);

  console.log("lastX:", lastX, "lastY:", lastY);

  const [x] = useState(lastX ? lastX : window.innerWidth / 2 - width / 2);
  const [y] = useState(lastY ? lastY : window.innerHeight / 2 - height / 2);

  return (
    <div
      onClick={() => {
        onClickWindow?.(id, index);
      }}
      id={id}
      ref={windowRef}
      className={`absolute bg-stone-500 rounded-md shadow-md`}
      style={{
        zIndex: index,
        width,
        height,
        transform: `translate(calc(${x}px), calc(${y}px))`,
      }}
    >
      <Bar windowId={"#" + id} windowWidth={width} windowHeight={height} />
      <div>{children}</div>
    </div>
  );
};

export default Window;
