import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, type PropsWithChildren } from "react";
import Bar from "./Bar";

interface IWindow {
  id: string;
  index: number;
  onClickWindow?: (id: string, index: number) => void;
}

const Window: React.FC<PropsWithChildren<IWindow>> = ({
  id,
  index,
  children,
  onClickWindow,
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
        transform: `translate(calc(50vw - ${width / 2}px), calc(50vh - ${
          height / 2
        }px))`,
      }}
    >
      <Bar windowId={"#" + id} windowWidth={width} windowHeight={height} />
      <div>{children}</div>
    </div>
  );
};

export default Window;
