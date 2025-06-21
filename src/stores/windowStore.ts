import { create } from "zustand";

export interface WindowData {
  id: string;
  index: number;
  child: React.ReactNode;
  lastX?: number;
  lastY?: number;
}

interface WindowStore {
  windows: WindowData[];
  updateWindowId: (oldId: string, newId: string) => void;
  updateWindowIndex: (id: string, newIndex: number) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  addWindow: (window: WindowData) => void;
  removeWindow: (id: string) => void;
  getWindowPosition: (id: string) => { x: number; y: number } | null;
}

export const useWindowStore = create<WindowStore>()((set, get) => ({
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

    updateWindowPosition: (id, x, y) => {
        set((state) => ({
            windows: state.windows.map((w) =>
                w.id === id ? { ...w, lastX: x, lastY: y } : w
            ),
        }));
    },

    getWindowPosition: (id) => {
        const window = get().windows.find((w) => w.id === id);
        if (!window || (window.lastX === undefined || window.lastY === undefined)) {
            return null;
        }
        return { x: window.lastX, y: window.lastY };
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
}));
