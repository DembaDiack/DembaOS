import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type React from "react";
import { useRef, useState, type PropsWithChildren } from "react";

const MenuButton: React.FC<
  PropsWithChildren<{
    title?: string;
  }>
> = ({ title, children }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [displayDropdown, setDisplayDropdown] = useState(false);

  const handleMouseEnter = () => {
    setDisplayDropdown(true);
  };
  const handleMouseLeave = () => {
    setDisplayDropdown(false);
  };

  useGSAP(() => {
    if (displayDropdown) {
      gsap.fromTo(
        dropdownRef.current,
        {
          display: "block",
          opacity: 1,
          y: 10,
        },
        {
          display: "block",
          opacity: 1,
          y: 0,
          duration: 0.1,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(dropdownRef.current, {
        display: "none",
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [displayDropdown]);

  return (
    <div
      className="font-[500] capitalize w-fit hover:bg-stone-200 pl-2 pr-2 rounded-sm text-stone-800 transition group z-[100000]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {title}
      <div
        id="dropdown"
        ref={dropdownRef}
        className="absolute min-w-[200px] bg-stone-100 hidden transition-transform duration-300 origin-top rounded-md shadow-sm p-2"
      >
        <Paper>{children}</Paper>
      </div>
    </div>
  );
};

const Paper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="z-50 text-stone-800 text-sm flex flex-col gap-1 bg-gradient-to-b from-white/30 to-stone-100/30 backdrop-blur-md">
      {children}
    </div>
  );
};

export default MenuButton;
