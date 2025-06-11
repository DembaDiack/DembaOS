import Cursor from "./components/Cursor";
import ScrubText from "./components/ScrubText";
import SimpleHorizontalScroll from "./components/SimpleHorizontalScroll";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

function App() {
  useGSAP(() => {}, []);

  return (
    <div className="flex flex-col gap-5">
      <Cursor />

      {/* Hero section */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700">
        <h1 className="text-6xl font-bold text-white">Welcome to My Portfolio</h1>
      </div>

      {/* Horizontal Scroll Text Effect */}
      <ScrubText
        text="CREATIVE DEVELOPER • FRONTEND SPECIALIST • UI/UX DESIGNER • REACT EXPERT • GSAP ANIMATOR • CREATIVE DEVELOPER • FRONTEND SPECIALIST •"
        height="300vh"
        className="bg-black text-white"
      />

      {/* Another section */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-700">
        <h2 className="text-4xl font-bold text-white">More Content Below</h2>
      </div>

      {/* Second scroll text with different content */}
      <ScrubText
        text="INNOVATION • CREATIVITY • TECHNOLOGY • DESIGN • DEVELOPMENT • ANIMATION • INTERACTION • EXPERIENCE •"
        height="250vh"
        className="bg-gradient-to-r from-purple-900 to-pink-900 text-white"
      />

      {/* Simple horizontal scroll alternative */}
      <SimpleHorizontalScroll
        text="SMOOTH SCROLLING • LETTER ANIMATIONS • DYNAMIC COLORS • WAVE EFFECTS •"
        className="bg-gradient-to-r from-green-900 to-blue-900 text-white"
        speed={2}
        direction="left"
      />

      {/* Footer section */}
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <p className="text-2xl text-gray-300">Scroll back up to see the effects!</p>
      </div>
    </div>
  );
}

export default App;
