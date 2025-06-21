import { useWindowStore } from '../stores/windowStore';

// Example hook showing how to use the window store
export const useWindowManager = () => {
  const {
    windows,
    addWindow,
    removeWindow,
    updateWindowId,
    updateWindowIndex
  } = useWindowStore();

  const openWindow = (id: string) => {
    const existingWindow = windows.find(w => w.id === id);
    if (!existingWindow) {
      const newIndex = windows.length > 0 ? Math.max(...windows.map(w => w.index)) + 1 : 1;
      addWindow({ id, index: newIndex });
    } else {
      // Bring to front
      const newIndex = Math.max(...windows.map(w => w.index)) + 1;
      updateWindowIndex(id, newIndex);
    }
  };

  const closeWindow = (id: string) => {
    removeWindow(id);
  };

  const bringToFront = (id: string) => {
    if (windows.length === 0) return;
    const newIndex = Math.max(...windows.map(w => w.index)) + 1;
    updateWindowIndex(id, newIndex);
  };

  const getWindowById = (id: string) => {
    return windows.find(w => w.id === id);
  };

  const getTopWindow = () => {
    if (windows.length === 0) return null;
    return windows.reduce((top, current) =>
      current.index > top.index ? current : top
    );
  };

  return {
    windows,
    openWindow,
    closeWindow,
    bringToFront,
    getWindowById,
    getTopWindow,
    updateWindowId,
    updateWindowIndex
  };
};
