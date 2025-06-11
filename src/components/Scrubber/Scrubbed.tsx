import type { PropsWithChildren } from "react";

const Scrubbed: React.FC<PropsWithChildren<object>> = ({ children }) => {
  return <div className="sticky top-0 left-0">{children}</div>;
};

export default Scrubbed;
