import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";

export const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  useGSAP(() => {
    gsap.from("#navbar", {
      y: -100,
      opacity: 0,
      duration: 0.2,
      ease: "power3.out",
      delay: 0.5,
      //   width: "-=150px",
    });
  }, []);

  const expandNavbar = () => {
    // gsap.to("#navbar", {
    //   scale: 1.2,
    //   duration: 0.3,
    //   ease: "elastic.in(2, 0.8)",
    //   height: "120px",
    //   borderRadius: "20px",
    // });
    // setExpanded(true);
  };

  const shrinkNavbar = () => {
    // gsap.to("#navbar", {
    //   scale: 1,
    //   duration: 0.6,
    //   ease: "elastic.out(2, 0.8)",
    //   height: "40px",
    // });
    // setExpanded(false);
  };

  return (
    <nav
      id="navbar"
      onMouseEnter={expandNavbar}
      onMouseLeave={shrinkNavbar}
      className="overflow-hidden z-1 top-4 translate-x-[-50%] bg-linear-to-br from-stone-800 to-stone-900 h-[40px] w-sm shadow-md fixed left-1/2 rounded-full"
    >
      <div className="flex flex-col pl-5 pr-5 pt-2">
        <div className="flex items-center gap-2 justify-between w-[360px]">
          <div className="bg-green-300 h-[10px] w-[10px] rounded-full"></div>
          <div className="text-white">Im ready for action 🤘</div>
        </div>
      </div>
    </nav>
  );
};
