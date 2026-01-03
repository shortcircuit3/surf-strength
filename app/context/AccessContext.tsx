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
  magicLinkSent: boolean;
  error: string | null;
}

interface AccessContextType extends AccessState {
  sendMagicLink: (email: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AccessContext = createContext<AccessContextType | undefined>(undefined);

export function AccessProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AccessState>({
    hasAccess: false,
    email: null,
    isLoading: true,
    isVerifying: false,
    magicLinkSent: false,
    error: null,
  });

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();

        if (data.authenticated && data.hasAccess) {
          setState({
            hasAccess: true,
            email: data.email,
            isLoading: false,
            isVerifying: false,
            magicLinkSent: false,
            error: null,
          });
        } else {
          setState((prev) => ({
            ...prev,
            hasAccess: false,
            email: null,
            isLoading: false,
          }));
        }
      } catch {
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
    };

    checkSession();
  }, []);

  // Check for error params in URL (from magic link redirect)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get("error");

    if (errorParam) {
      const errorMessages: Record<string, string> = {
        invalid_link: "Invalid sign-in link. Please request a new one.",
        expired_link:
          "This sign-in link has expired. Please request a new one.",
        session_failed: "Failed to create session. Please try again.",
        verification_failed: "Verification failed. Please try again.",
      };

      // Use a microtask to avoid synchronous setState in effect
      queueMicrotask(() => {
        setState((prev) => ({
          ...prev,
          error:
            errorMessages[errorParam] || "An error occurred. Please try again.",
        }));
      });

      // Clean up URL
      const url = new URL(window.location.href);
      url.searchParams.delete("error");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  const sendMagicLink = async (email: string): Promise<boolean> => {
    setState((prev) => ({
      ...prev,
      isVerifying: true,
      magicLinkSent: false,
      error: null,
    }));

    try {
      const response = await fetch("/api/auth/send-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setState((prev) => ({
          ...prev,
          isVerifying: false,
          error: data.error || "Failed to send sign-in link",
        }));
        return false;
      }

      setState((prev) => ({
        ...prev,
        isVerifying: false,
        magicLinkSent: true,
      }));
      return true;
    } catch {
      setState((prev) => ({
        ...prev,
        isVerifying: false,
        error: "Failed to send sign-in link. Please try again.",
      }));
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      console.error("Logout failed");
    }

    setState({
      hasAccess: false,
      email: null,
      isLoading: false,
      isVerifying: false,
      magicLinkSent: false,
      error: null,
    });
  };

  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  return (
    <AccessContext.Provider
      value={{ ...state, sendMagicLink, logout, clearError }}
    >
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
