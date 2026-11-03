"use client";

import { useState, useCallback, useEffect } from "react";
import { sound } from "@/lib/audio";

export interface WindowState {
  id: string;
  title: string;
  iconName: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  defaultSize: { width: number; height: number };
}

const DEFAULT_WINDOWS: Record<string, Omit<WindowState, "id" | "zIndex" | "isOpen" | "isMinimized" | "isMaximized">> = {
  about: {
    title: "About Shahriar Hossain // Profile & Philosophy",
    iconName: "User",
    position: { x: 80, y: 55 },
    size: { width: 780, height: 560 },
    defaultSize: { width: 780, height: 560 }
  },
  projects: {
    title: "Case Studies & Work // Interactive Archive",
    iconName: "Briefcase",
    position: { x: 140, y: 70 },
    size: { width: 920, height: 600 },
    defaultSize: { width: 920, height: 600 }
  },
  skills: {
    title: "Skills Matrix & Tech Architecture",
    iconName: "Layers",
    position: { x: 200, y: 85 },
    size: { width: 840, height: 560 },
    defaultSize: { width: 840, height: 560 }
  },
  terminal: {
    title: "shahriar@nexus-os: ~ / bin / zsh",
    iconName: "Terminal",
    position: { x: 240, y: 120 },
    size: { width: 760, height: 480 },
    defaultSize: { width: 760, height: 480 }
  },
  creativeLab: {
    title: "Creative Lab // Interactive Particle Shader Playground",
    iconName: "Sparkles",
    position: { x: 180, y: 90 },
    size: { width: 880, height: 580 },
    defaultSize: { width: 880, height: 580 }
  },
  contact: {
    title: "Secure Comms // Dispatch & Transmission",
    iconName: "Send",
    position: { x: 260, y: 110 },
    size: { width: 680, height: 520 },
    defaultSize: { width: 680, height: 520 }
  },
  settings: {
    title: "System Preferences // Visuals & Audio",
    iconName: "Settings",
    position: { x: 300, y: 130 },
    size: { width: 600, height: 460 },
    defaultSize: { width: 600, height: 460 }
  }
};

export function useWindowManager() {
  const [windows, setWindows] = useState<Record<string, WindowState>>(() => {
    const initial: Record<string, WindowState> = {};
    Object.entries(DEFAULT_WINDOWS).forEach(([id, def], index) => {
      initial[id] = {
        ...def,
        id,
        // Start with projects open, about open behind it
        isOpen: id === "projects",
        isMinimized: false,
        isMaximized: false,
        zIndex: id === "projects" ? 20 : 10 + index
      };
    });
    return initial;
  });

  const [activeWindowId, setActiveWindowId] = useState<string>("projects");
  const [maxZIndex, setMaxZIndex] = useState<number>(30);

  // Responsive position adjustment on window resize
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // If mobile, default windows to near fullscreen
      setWindows((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((key) => {
          next[key] = {
            ...next[key],
            position: { x: 8, y: 44 },
            size: { width: window.innerWidth - 16, height: window.innerHeight - 110 }
          };
        });
        return next;
      });
    }
  }, []);

  const bringToFront = useCallback((id: string) => {
    setMaxZIndex((prevZ) => {
      const nextZ = prevZ + 1;
      setWindows((prev) => {
        if (!prev[id]) return prev;
        return {
          ...prev,
          [id]: {
            ...prev[id],
            zIndex: nextZ,
            isMinimized: false
          }
        };
      });
      return nextZ;
    });
    setActiveWindowId(id);
  }, []);

  const openWindow = useCallback(
    (id: string) => {
      sound.playWindowOpen();
      setMaxZIndex((prevZ) => {
        const nextZ = prevZ + 1;
        setWindows((prev) => {
          const target = prev[id] || {
            id,
            title: id,
            iconName: "AppWindow",
            position: { x: 100, y: 100 },
            size: { width: 700, height: 500 },
            defaultSize: { width: 700, height: 500 },
            isOpen: false,
            isMinimized: false,
            isMaximized: false,
            zIndex: nextZ
          };

          return {
            ...prev,
            [id]: {
              ...target,
              isOpen: true,
              isMinimized: false,
              zIndex: nextZ
            }
          };
        });
        return nextZ;
      });
      setActiveWindowId(id);
    },
    []
  );

  const closeWindow = useCallback((id: string) => {
    sound.playWindowClose();
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: false,
          isMinimized: false
        }
      };
    });
    setActiveWindowId((prevActive) => (prevActive === id ? "" : prevActive));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    sound.playClick();
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: true
        }
      };
    });
    setActiveWindowId((prevActive) => (prevActive === id ? "" : prevActive));
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    sound.playClick();
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isMaximized: !prev[id].isMaximized
        }
      };
    });
  }, []);

  const updatePosition = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          position: { x, y }
        }
      };
    });
  }, []);

  const updateSize = useCallback((id: string, width: number, height: number) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          size: {
            width: Math.max(380, width),
            height: Math.max(280, height)
          }
        }
      };
    });
  }, []);

  return {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    bringToFront,
    updatePosition,
    updateSize
  };
}

