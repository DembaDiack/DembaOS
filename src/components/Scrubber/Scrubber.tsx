import React, { useEffect, useRef, type PropsWithChildren } from "react";
import useScrollData from "../../hooks/useScrollData";

const Scrubber: React.FC<
  PropsWithChildren<{
    height?: string | number;
    onScroll?: (progress: number) => void;
  }>
> = ({ children, height = "auto", onScroll }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { pageYOffset } = useScrollData();

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const totalScrollableHeight = rect.height + windowHeight;
    const scrolled = windowHeight - rect.top;

    const progress = scrolled / totalScrollableHeight;
    const clampedProgress = Math.min(Math.max(progress, 0), 1);
    console.log(clampedProgress);
    onScroll?.(clampedProgress);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageYOffset]);

  return (
    <div
      ref={ref}
      style={{
        height,
      }}
      className="bg-white"
    >
      {children}
    </div>
  );
};

export default Scrubber;
