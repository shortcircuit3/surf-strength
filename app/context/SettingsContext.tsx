"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";

export type EquipmentType =
  | "bodyweight"
  | "bands"
  | "dumbbells"
  | "kettlebell"
  | "pullupbar"
  | "assault bike";

interface Settings {
  equipment: EquipmentType[];
}

interface SettingsContextType {
  settings: Settings;
  toggleEquipment: (type: EquipmentType) => void;
  hasEquipment: (type: EquipmentType) => boolean;
  setEquipment: (equipment: EquipmentType[]) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

const STORAGE_KEY = "surf-workout-settings";

// Default settings - bodyweight is always available
const DEFAULT_SETTINGS: Settings = {
  equipment: ["bodyweight", "dumbbells", "kettlebell", "pullupbar", "assault bike"], // Default to full equipment
};

// Store for settings with subscriber pattern
let listeners: Array<() => void> = [];
let cachedSettings: Settings | null = null;

function getSnapshot(): Settings {
  if (cachedSettings === null) {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const equipment = parsed.equipment || [];
        if (!equipment.includes("bodyweight")) {
          equipment.unshift("bodyweight");
        }
        cachedSettings = { equipment };
      } catch {
        console.error("Failed to parse stored settings");
        cachedSettings = DEFAULT_SETTINGS;
      }
    } else {
      cachedSettings = DEFAULT_SETTINGS;
    }
  }
  return cachedSettings;
}

function getServerSnapshot(): Settings {
  // Always return default settings on the server to ensure consistent hydration
  return DEFAULT_SETTINGS;
}

function subscribe(listener: () => void): () => void {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function updateSettings(newSettings: Settings) {
  cachedSettings = newSettings;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
  emitChange();
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const settings = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const toggleEquipment = useCallback((type: EquipmentType) => {
    // Don't allow toggling off bodyweight - it's always available
    if (type === "bodyweight") return;

    const currentSettings = getSnapshot();
    const hasType = currentSettings.equipment.includes(type);

    if (hasType) {
      updateSettings({
        ...currentSettings,
        equipment: currentSettings.equipment.filter((e) => e !== type),
      });
    } else {
      updateSettings({
        ...currentSettings,
        equipment: [...currentSettings.equipment, type],
      });
    }
  }, []);

  const hasEquipment = useCallback(
    (type: EquipmentType) => settings.equipment.includes(type),
    [settings.equipment]
  );

  const setEquipment = useCallback((equipment: EquipmentType[]) => {
    // Ensure bodyweight is always included
    if (!equipment.includes("bodyweight")) {
      equipment = ["bodyweight", ...equipment];
    }
    const currentSettings = getSnapshot();
    updateSettings({ ...currentSettings, equipment });
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        toggleEquipment,
        hasEquipment,
        setEquipment,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
