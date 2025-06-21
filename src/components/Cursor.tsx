import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const xTo = gsap.quickTo("#cursor", "x", {
      ease: "power2",
      duration: 0.2,
    });

    const yTo = gsap.quickTo("#cursor", "y", {
      ease: "power2",
      duration: 0.2,
    });

    let tick = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!tick) {
        tick = true;
        window.requestAnimationFrame(() => {
          xTo(e.clientX);
          yTo(e.clientY);

          tick = false;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      id="cursor"
      className="fixed w-[12px] h-[12px] mix-blend-difference bg-white rounded-full pointer-events-none z-50"
    ></div>
  );
}

export default Cursor;
