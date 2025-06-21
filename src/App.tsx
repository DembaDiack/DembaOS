import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin, SplitText } from "gsap/all";
import Desktop from "./components/Desktop";
import { useWindowManager } from "./hooks/useWindowManager";
import Window from "./components/Window/Window";
import MenuBar from "./components/MenuBar/MenuBar";

gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(useGSAP);

export const App = () => {
  const { windows, bringToFront } = useWindowManager();

  return (
    <div>
      <MenuBar />
      <Desktop>
        {windows.map((w) => (
          <Window
            key={w.id}
            id={w.id}
            index={w.index}
            onClickWindow={(id) => {
              bringToFront(id);
            }}
          >
            {w.child}
          </Window>
        ))}
      </Desktop>
    </div>
  );
};

export default App;
