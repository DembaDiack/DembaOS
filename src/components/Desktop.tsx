import React, { type PropsWithChildren } from "react";

const Desktop: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative overflow-hidden mesh z-0" style={{ height: 'calc(100vh - 35px)' }}>
      {children}
    </div>
  );
};

export default Desktop;
