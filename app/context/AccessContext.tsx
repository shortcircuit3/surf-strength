"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AccessState {
  hasAccess: boolean;
  email: string | null;
  isLoading: boolean;
  isVerifying: boolean;
}

interface AccessContextType extends AccessState {
  verifyEmail: (email: string) => Promise<boolean>;
  logout: () => void;
}

const AccessContext = createContext<AccessContextType | undefined>(undefined);

const ACCESS_STORAGE_KEY = "surf-workout-access";

interface StoredAccess {
  email: string;
  verifiedAt: string;
}

export function AccessProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AccessState>({
    hasAccess: false,
    email: null,
    isLoading: true,
    isVerifying: false,
  });

  // Check for stored access on mount
  useEffect(() => {
    const checkStoredAccess = async () => {
      const stored = localStorage.getItem(ACCESS_STORAGE_KEY);

      if (!stored) {
        setState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        const { email: storedEmail } = JSON.parse(stored) as StoredAccess;

        const response = await fetch("/api/verify-access", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: storedEmail }),
        });

        const data = await response.json();

        if (data.hasAccess) {
          setState({
            hasAccess: true,
            email: data.email,
            isLoading: false,
            isVerifying: false,
          });
        } else {
          localStorage.removeItem(ACCESS_STORAGE_KEY);
          setState({
            hasAccess: false,
            email: null,
            isLoading: false,
            isVerifying: false,
          });
        }
      } catch {
        // On parse error, clear storage; on network error, keep offline access
        const stored2 = localStorage.getItem(ACCESS_STORAGE_KEY);
        if (stored2) {
          try {
            const { email: offlineEmail } = JSON.parse(stored2) as StoredAccess;
            setState((prev) => ({
              ...prev,
              hasAccess: true,
              email: offlineEmail,
              isLoading: false,
            }));
          } catch {
            localStorage.removeItem(ACCESS_STORAGE_KEY);
            setState((prev) => ({ ...prev, isLoading: false }));
          }
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      }
    };

    checkStoredAccess();
  }, []);

  const verifyEmail = async (email: string): Promise<boolean> => {
    setState((prev) => ({ ...prev, isVerifying: true }));

    try {
      const response = await fetch("/api/verify-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.hasAccess) {
        // Store access in localStorage
        const stored: StoredAccess = {
          email: data.email,
          verifiedAt: new Date().toISOString(),
        };
        localStorage.setItem(ACCESS_STORAGE_KEY, JSON.stringify(stored));

        setState({
          hasAccess: true,
          email: data.email,
          isLoading: false,
          isVerifying: false,
        });
        return true;
      }

      setState((prev) => ({
        ...prev,
        isVerifying: false,
      }));
      return false;
    } catch {
      setState((prev) => ({
        ...prev,
        isVerifying: false,
      }));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_STORAGE_KEY);
    setState({
      hasAccess: false,
      email: null,
      isLoading: false,
      isVerifying: false,
    });
  };

  return (
    <AccessContext.Provider value={{ ...state, verifyEmail, logout }}>
      {children}
    </AccessContext.Provider>
  );
}

export function useAccess() {
  const context = useContext(AccessContext);
  if (context === undefined) {
    throw new Error("useAccess must be used within an AccessProvider");
  }
  return context;
}
