import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function WavingHand() {
  const handRef = useRef<HTMLSpanElement>(null);

useGSAP(
    () => {
        if (!handRef.current) return;

        // Create a timeline for better control
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

        tl.to(handRef.current, {
            rotation: 20,
            duration: 0.15,
            ease: "power2.out",
            transformOrigin: "70% 70%",
        })
            .to(handRef.current, {
                rotation: -10,
                duration: 0.15,
                ease: "power2.inOut",
                transformOrigin: "70% 70%",
            })
            .to(handRef.current, {
                rotation: 20,
                duration: 0.15,
                ease: "power2.inOut",
                transformOrigin: "70% 70%",
            })
            .to(handRef.current, {
                rotation: 0,
                duration: 0.15,
                ease: "power2.in",
                transformOrigin: "70% 70%",
            });

        return () => {
            tl.kill();
        };
    },
    { scope: handRef }
);

  return (
    <span ref={handRef} style={{ display: "inline-block" }}>
      👋
    </span>
  );
}

export default WavingHand;
