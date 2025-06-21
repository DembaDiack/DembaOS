import React, { type PropsWithChildren } from "react";

const Desktop: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative overflow-hidden mesh z-0 h-screen">
      {children}
    </div>
  );
};

export default Desktop;
