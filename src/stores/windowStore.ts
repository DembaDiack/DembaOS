import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WindowData {
  id: string;
  index: number;
}

interface WindowStore {
  windows: WindowData[];
  updateWindowId: (oldId: string, newId: string) => void;
  updateWindowIndex: (id: string, newIndex: number) => void;
  addWindow: (window: WindowData) => void;
  removeWindow: (id: string) => void;
}

export const useWindowStore = create<WindowStore>()(
  persist(
    (set) => ({
      windows: [],

      updateWindowId: (oldId, newId) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === oldId ? { ...w, id: newId } : w
          ),
        }));
      },

      updateWindowIndex: (id, newIndex) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, index: newIndex } : w
          ),
        }));
      },

      addWindow: (window) => {
        set((state) => ({
          windows: [...state.windows, window],
        }));
      },

      removeWindow: (id) => {
        set((state) => ({
          windows: state.windows.filter((w) => w.id !== id),
        }));
      },
    }),
    {
      name: "window-storage",
    }
  )
);
