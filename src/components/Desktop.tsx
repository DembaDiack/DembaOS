import React, { type PropsWithChildren } from "react";
import Window from "./Window/Window";

const Desktop: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative overflow-hidden mesh z-0 h-screen">
      {children}
      <Window index={1} id="window-1">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold text-white">
            Welcome to My Desktop
          </h1>
          <p className="text-white mt-2">Click and drag to move this window.</p>
        </div>
      </Window>
    </div>
  );
};

export default Desktop;
