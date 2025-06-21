import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Time from "../../assets/Time.svg";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
const Line = () => {
  useGSAP(() => {
    const chars = SplitText.create("#base-text", {
      type: "chars",
      charsClass: "char",
    });

    const tl = gsap.timeline({
      repeat: -1,
    });

    tl.fromTo(
      chars.chars,
      {
        color: "black",
        stagger: 0.1,
        delay: 0.6,
        ease: "power1.inOut",
      },
      {
        color: "#FFC107",
        stagger: 0.1,
        ease: "power1.inOut",
      }
    ).to(
      chars.chars,
      {
        color: "black",
        stagger: 0.1,
        delay: 0.6,
        ease: "power1.inOut",
      },
      0
    );
  }, []);

  return (
    <div className="p-8 h-[500px] w-full">
      <div className="h-full grid grid-cols-2">
        <div className="relative w-full">
          <div className="rotate-[2deg] absolute rounded-xl text-4xl flex gap-5 bg-purple-300 w-fit p-2 pl-4 pr-4 font-[500]">
            <span>Lets</span>
            <span>build</span>
          </div>
          <SwingText />

          <div
            id="base-text"
            className="pt-40 text-2xl font-[500] text-stone-800"
          >
            Lets create beautiful shiny things together
          </div>
        </div>
        <div className="relative">
          <div className="w-[300px] h-[300px] rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <img src={Time} />
        </div>
      </div>
    </div>
  );
};

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const SwingText = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;

    // Initial state - off screen
    gsap.set(element, { x: -100, opacity: 0 });

    // Animation to trigger on scroll
    gsap.to(element, {
      x: 0,
      opacity: 1,
      rotation: -5,
      duration: 1.5,
      ease: "elastic.out(1, 0.3)", // Swing effect
      scrollTrigger: {
        trigger: element,
        start: "top 80%", // Start when element is 80% in view
        toggleActions: "play none none none",
      },
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={textRef}
      className="top-12 absolute rounded-xl text-4xl flex gap-2 bg-orange-200 w-fit p-2 pl-4 pr-4 font-[500]"
    >
      <span>Anything,</span>
      <span>seriously,</span>
      <span>anything</span>
    </div>
  );
};

export default Line;
