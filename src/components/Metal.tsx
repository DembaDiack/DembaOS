import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useMouseData from "../hooks/useMouseData";
import GlowingBall from "./GlowingBall";

const Metal: React.FC<
  React.PropsWithChildren<
    React.JSX.IntrinsicAttributes &
      React.ClassAttributes<HTMLDivElement> &
      React.HTMLAttributes<HTMLDivElement>
  >
> = ({ children, className, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const glowingBallRef = useRef<HTMLDivElement>(null);
  const [mouseInside, setMouseInside] = useState(false);

  const { x, y } = useMouseData();

  useGSAP(() => {
    const xTo = gsap.quickTo(glowingBallRef.current, "x", {
      ease: "power2.out",
      duration: 0.8,
    });
    const yTo = gsap.quickTo(glowingBallRef.current, "y", {
      ease: "power2.out",
      duration: 0.8,
    });

    if (mouseInside) {
      xTo(x);
      yTo(y);
    }
  }, [x, y, mouseInside]);

  return (
    <div
      onMouseEnter={() => {
        setMouseInside(true);
      }}
      onMouseLeave={() => {
        setMouseInside(false);
      }}
      ref={ref}
      className={`bg-white-metal metal-paper relative overflow-hidden`}
      {...props}
    >
      {
        <GlowingBall
          ref={glowingBallRef}
          className={mouseInside ? undefined : "hidden"}
        />
      }

      <div className={`relative z-10 p-4 ${className ?? ""}`}>{children}</div>
    </div>
  );
};

export default Metal;
