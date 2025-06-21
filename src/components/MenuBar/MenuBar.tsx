import MenuButton from "../MenuButton";
import MenuItem from "../MenuItem";
import { useWindowManager } from "../../hooks/useWindowManager";

const MenuBar = () => {
  const { openWindow } = useWindowManager();

  const handleOpenWindow = (windowId: string) => {
    openWindow(windowId);
  };
  return (
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
          <MenuItem onClick={() => handleOpenWindow("resume")}>Resume</MenuItem>
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
  );
};

export default MenuBar;
