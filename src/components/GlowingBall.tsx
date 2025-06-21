import { forwardRef } from "react";

const GlowingBall = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<
    React.JSX.IntrinsicAttributes &
      React.ClassAttributes<HTMLDivElement> &
      React.HTMLAttributes<HTMLDivElement>
  >
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`z-[1] absolute top-0 left-0 h-[0px] w-[0px] bg-black rounded-full glow ${className}`}
      {...props}
    ></div>
  );
});

export default GlowingBall;
