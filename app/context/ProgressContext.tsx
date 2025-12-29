"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

interface Progress {
  completedDays: number[];
}

interface ProgressContextType {
  progress: Progress;
  toggleDayComplete: (dayId: number) => void;
  isDayComplete: (dayId: number) => boolean;
  getTotalProgress: () => number;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

const STORAGE_KEY = "surf-workout-progress";
const TOTAL_WORKOUT_DAYS = 28;

function getInitialProgress(): Progress {
  if (typeof window === "undefined") {
    return { completedDays: [] };
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return { completedDays: parsed.completedDays || [] };
    } catch {
      console.error("Failed to parse stored progress");
    }
  }
  return { completedDays: [] };
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Progress>(getInitialProgress);
  const isFirstRender = useRef(true);

  // Save to localStorage on change (skip first render to avoid overwriting)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const toggleDayComplete = useCallback((dayId: number) => {
    setProgress((prev) => {
      const isComplete = prev.completedDays.includes(dayId);
      return {
        ...prev,
        completedDays: isComplete
          ? prev.completedDays.filter((id) => id !== dayId)
          : [...prev.completedDays, dayId],
      };
    });
  }, []);

  const isDayComplete = useCallback(
    (dayId: number) => progress.completedDays.includes(dayId),
    [progress.completedDays]
  );

  const getTotalProgress = useCallback(() => {
    return Math.round(
      (progress.completedDays.length / TOTAL_WORKOUT_DAYS) * 100
    );
  }, [progress.completedDays]);

  const resetProgress = useCallback(() => {
    setProgress({ completedDays: [] });
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        toggleDayComplete,
        isDayComplete,
        getTotalProgress,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
