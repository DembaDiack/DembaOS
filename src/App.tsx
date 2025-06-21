import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin, SplitText } from "gsap/all";
import MenuButton from "./components/MenuButton";
import MenuItem from "./components/MenuItem";
import Desktop from "./components/Desktop";

gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(useGSAP);

export const App = () => {
  return (
    <div>
      {/* <Cursor /> */}

      <Desktop>
        <div className="h-[35px] bg-stone-100 shadow-lg pl-5 pr-5 grid grid-cols-[70%_30%] items-center ">
          <div className="flex gap-2">
            <MenuButton title="Demba">
              <MenuItem>Read me</MenuItem>
            </MenuButton>
            <MenuButton title="Work">
              <MenuItem>Portfolio</MenuItem>
              <MenuItem>Projects</MenuItem>
              <MenuItem>Blog</MenuItem>
              <MenuItem>Contact</MenuItem>
              <MenuItem>Resume</MenuItem>
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
      </Desktop>
    </div>
  );
};

export default App;
