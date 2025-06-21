import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, type PropsWithChildren } from "react";
import { useWindowStore } from "../../stores/windowStore";
import Bar from "./Bar";

export const MIN_WINDOW_HEIGHT = 200; // Minimum height for the window
export const MIN_WINDOW_WIDTH = 300; // Minimum width for the window

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
  const windowRef = useRef<HTMLDivElement>(null);
  const getWindowPosition = useWindowStore((state) => state.getWindowPosition);

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

  const rect = windowRef.current?.getBoundingClientRect();
  const width = rect?.width || 300; // Default width if not available
  const height = rect?.height || 200; // Default height if not available

  // Try to get stored position, fallback to center if not available
  const storedPosition = getWindowPosition(id);
  const x = storedPosition?.x ?? (window.innerWidth / 2 - width / 2);
  const y = storedPosition?.y ?? (window.innerHeight / 2 - height / 2);

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
        minHeight: MIN_WINDOW_HEIGHT,
        minWidth: MIN_WINDOW_WIDTH,
        transform: `translate(calc(${x}px), calc(${y}px))`,
      }}
    >
      <Bar windowId={"#" + id} windowWidth={width} windowHeight={height} windowIdForStore={id} />
      <div>{children}</div>
    </div>
  );
};

export default Window;
