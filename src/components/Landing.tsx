import { useRef } from "react";
import MetalPaper from "./MetalPaper";
import WavingHand from "./WavingHand";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

type TLandingProps = {
  scrollRatio?: number;
};

const Landing: React.FC<TLandingProps> = () => {
  const nameRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(nameRef.current, { opacity: 1 });
    const split = SplitText.create(".animate-me", {
      type: "words",
      aria: "hidden",
    });

    gsap.fromTo(
      split.words,
      {
        opacity: 0,
        y: 5,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "sine.out",
        stagger: 0.2,
      }
    );
  }, []);

  return (
    <div
      ref={nameRef}
      className="hero bg-white flex flex-col items-center gap-10"
    >
      <MetalPaper className="container  grid grid-cols-2 grid-rows-3 h-[500px] ">
        <div className="flex flex-col items-start gap-5 justify-end pb-5 col-start-1 row-span-3">
          <div className="pl-5 text-2xl text-gray-500 font-[500] tracking-tight leading-5 antialiased">
            <WavingHand />{" "}
            <span className="animate-me">
              Yo! im <b>Demba</b> a Software Engineer
            </span>
          </div>
          <div className="animate-me pl-5 text-4xl font-semibold tracking-tight leading-12 antialiased ">
            helping create beautiful and performant web applications.
          </div>
        </div>
      </MetalPaper>
    </div>
  );
};

export default Landing;
