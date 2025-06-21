import type { PropsWithChildren } from "react";

interface MenuItemProps {
  onClick?: () => void;
}

export const MenuItem: React.FC<PropsWithChildren<MenuItemProps>> = ({
  children,
  onClick
}) => {
  return (
    <div
      className="hover:bg-blue-400 hover:text-white pl-2 pt-1 pb-1 transition rounded-sm cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default MenuItem;