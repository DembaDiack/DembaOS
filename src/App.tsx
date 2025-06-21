import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin, SplitText } from "gsap/all";
import MenuButton from "./components/MenuButton";
import MenuItem from "./components/MenuItem";
import Desktop from "./components/Desktop";
import { useWindowManager } from "./hooks/useWindowManager";
import Window from "./components/Window/Window";

gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(useGSAP);

export const App = () => {
  const { windows, openWindow, bringToFront } = useWindowManager();

  const handleOpenWindow = (windowId: string) => {
    openWindow(windowId);
  };

  return (
    <div>
      {/* <Cursor /> */}

      <Desktop>
        <div className="h-[35px] bg-stone-100 shadow-lg pl-5 pr-5 grid grid-cols-[70%_30%] items-center ">
          <div className="flex gap-2">
            <MenuButton title="Demba">
              <MenuItem onClick={() => handleOpenWindow("readme")}>
                Read me
              </MenuItem>
            </MenuButton>
            <MenuButton title="Work">
              <MenuItem onClick={() => handleOpenWindow("portfolio")}>
                Portfolio
              </MenuItem>
              <MenuItem onClick={() => handleOpenWindow("projects")}>
                Projects
              </MenuItem>
              <MenuItem onClick={() => handleOpenWindow("blog")}>Blog</MenuItem>
              <MenuItem onClick={() => handleOpenWindow("contact")}>
                Contact
              </MenuItem>
              <MenuItem onClick={() => handleOpenWindow("resume")}>
                Resume
              </MenuItem>
            </MenuButton>
            <MenuButton title="Social">
              <MenuItem>Twitter</MenuItem>
              <MenuItem>LinkedIn</MenuItem>
              <MenuItem>Facebook</MenuItem>
              <MenuItem>YouTube</MenuItem>
              <MenuItem>Instagram</MenuItem>
            </MenuButton>
            <MenuButton title="Favorites">
              <MenuItem>React</MenuItem>
              <MenuItem>GSAP</MenuItem>
              <MenuItem>Tailwind CSS</MenuItem>
              <MenuItem>TypeScript</MenuItem>
              <MenuItem>JavaScript</MenuItem>
            </MenuButton>
          </div>
          <div className="flex justify-end">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>

        {windows.map((w) => (
          <Window
            key={w.id}
            id={w.id}
            index={w.index}
            onClickWindow={(id) => {
              bringToFront(id);
            }}
          >
            {w.id} (index: {w.index})
          </Window>
        ))}
      </Desktop>
    </div>
  );
};

export default App;
