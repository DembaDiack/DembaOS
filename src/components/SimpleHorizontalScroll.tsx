import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface SimpleHorizontalScrollProps {
  text: string;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
}

const SimpleHorizontalScroll: React.FC<SimpleHorizontalScrollProps> = ({
  text,
  className = "",
  speed = 1,
  direction = "right",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !textRef.current) return;

    const container = containerRef.current;
    const textElement = textRef.current;

    // Use SplitText to split into characters
    const split = new SplitText(textElement, { type: "chars" });

    // Calculate scroll distance
    const textWidth = textElement.scrollWidth;
    const containerWidth = container.offsetWidth;
    const scrollDistance = textWidth + containerWidth;

    // Create the horizontal scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: speed,
        markers: true,
        onUpdate: (self) => {
          const rotation = self.direction * 2;
          gsap.set(textElement, {
            rotationZ: rotation,
            scale: 1 + Math.abs(rotation) * 0.001,
          });
        },
      },
    });

    if (direction === "right") {
      tl.fromTo(
        textElement,
        { x: -scrollDistance },
        { x: containerWidth, ease: "none" }
      );
    } else {
      tl.fromTo(
        textElement,
        { x: containerWidth },
        { x: -scrollDistance, ease: "none" }
      );
    }

    // Animate individual characters
    split.chars.forEach((char, index) => {
      ScrollTrigger.create({
        trigger: container,
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          const progress = self.progress;
          const charProgress = progress * split.chars.length - index;

          if (charProgress > 0 && charProgress < 1) {
            const intensity = Math.sin(charProgress * Math.PI);

            gsap.set(char, {
              y:
                Math.sin(progress * Math.PI * 4 + index * 0.5) * 20 * intensity,
              rotationZ:
                Math.sin(progress * Math.PI * 2 + index * 0.3) * 15 * intensity,
              color: `hsl(${(progress * 360 + index * 10) % 360}, 70%, 70%)`,
            });
          }
        },
      });
    });

    return () => {
      tl.kill();
      split.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [text, speed, direction]);

  return (
    <div
      ref={containerRef}
      className={`relative h-screen overflow-hidden flex items-center ${className}`}
    >
      <div
        ref={textRef}
        className="whitespace-nowrap text-6xl md:text-8xl lg:text-9xl font-bold"
        style={{ width: "max-content" }}
      >
        {text}
      </div>
    </div>
  );
};

export default SimpleHorizontalScroll;
