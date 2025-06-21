import type { PropsWithChildren } from "react";

export const MenuItem: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="hover:bg-blue-400 hover:text-white pl-2 pt-1 pb-1 transition rounded-sm cursor-pointer">
      {children}
    </div>
  );
};

export default MenuItem;