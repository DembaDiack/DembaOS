import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface IBar {
  windowId: string;
  windowWidth: number;
  windowHeight: number;
}

const barHeight = 25;

const Bar: React.FC<IBar> = ({ windowId }) => {
  const ref = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  useGSAP(() => {
    if (!ref.current) return;    ref.current.addEventListener("click", (e) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const distance = rect.x + rect.width;

      console.log(distance, distance / 2, e.clientX);
    });

    ref.current?.addEventListener("dragstart", (e) => {
      e?.dataTransfer?.setDragImage(new Image(), 0, 0); // Disable drag ghost
      // Get the current position of the bar at drag start
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      // Store the initial offset between mouse position and window position
      dragOffset.current = {
        x: e.clientX - rect.x,
        y: e.clientY - rect.y,
      };
      console.log("Drag started");
    });

    ref.current?.addEventListener("drag", (e) => {
      if (e.clientX === 0 && e.clientY === 0) return; // Ignore if no movement

      gsap.to(windowId, {
        transform: `translate(${e.clientX - dragOffset.current.x}px, ${
          e.clientY - dragOffset.current.y
        }px)`,
      });
    });
  }, []);

  return (
    <div
      draggable
      ref={ref}
      className={`h-[${barHeight}px] bg-stone-100 flex gap-2 p-2 pl-0 z-1`}
    >
      <div className="flex items-center gap-2 pl-2">
        <span className="h-[10px] w-[10px] bg-red-500 rounded-full"></span>
        <span className="h-[10px] w-[10px] bg-yellow-500 rounded-full"></span>
        <span className="h-[10px] w-[10px] bg-green-500 rounded-full"></span>
      </div>
    </div>
  );
};

export default Bar;
