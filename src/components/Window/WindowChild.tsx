import React, { type PropsWithChildren } from "react";
import { MIN_WINDOW_WIDTH, MIN_WINDOW_HEIGHT } from "./Window";

interface IWindowChild {
  width: number;
  height: number;
}

export const WindowChild: React.FC<PropsWithChildren<IWindowChild>> = ({
  height,
  width,
  children,
}) => {
  const [childWidth] = React.useState(Math.max(width, MIN_WINDOW_WIDTH));
  const [childHeight] = React.useState(Math.max(height, MIN_WINDOW_HEIGHT));

  return (
    <div
      style={{
        width: childWidth,
        height: childHeight,
      }}
      className="overflow-hidden"
    >
      {children}
    </div>
  );
};
