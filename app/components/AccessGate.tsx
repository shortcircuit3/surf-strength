"use client";

import { useState, FormEvent, ReactNode } from "react";
import Link from "next/link";
import { useAccess } from "../context/AccessContext";

interface AccessGateProps {
  children: ReactNode;
}

export default function AccessGate({ children }: AccessGateProps) {
  const {
    hasAccess,
    isLoading,
    isVerifying,
    magicLinkSent,
    error: contextError,
    sendMagicLink,
    clearError,
  } = useAccess();
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState("");

  const error = contextError || localError;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError("");
    clearError();

    if (!email.trim()) {
      setLocalError("Please enter your email");
      return;
    }

    await sendMagicLink(email.trim());
  };

  const handleResend = () => {
    clearError();
    sendMagicLink(email.trim());
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-animated flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  // Show access form if not authenticated
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-animated flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🏄</div>
            <h1
              className="text-3xl md:text-4xl font-bold text-text-primary mb-2"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              SURF STRENGTH
            </h1>
            <p className="text-text-secondary">
              {magicLinkSent
                ? "Check your email for the sign-in link"
                : "Enter the email you used to purchase to access your workouts"}
            </p>
          </div>

          {magicLinkSent ? (
            // Success state - magic link sent
            <div className="bg-bg-card rounded-2xl border border-border p-6 shadow-xl text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                Check your inbox!
              </h2>
              <p className="text-text-secondary mb-6">
                We sent a sign-in link to{" "}
                <span className="text-text-primary font-medium">{email}</span>.
                Click the link to access your workouts.
              </p>
              <p className="text-text-muted text-sm mb-4">
                The link expires in 15 minutes.
              </p>
              <button
                onClick={handleResend}
                disabled={isVerifying}
                className="text-accent-primary hover:text-accent-hover transition-colors text-sm font-medium disabled:opacity-50"
              >
                {isVerifying ? "Sending..." : "Didn't receive it? Send again"}
              </button>
            </div>
          ) : (
            // Email input form
            <form
              onSubmit={handleSubmit}
              className="bg-bg-card rounded-2xl border border-border p-6 shadow-xl"
            >
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-text-secondary text-sm mb-2"
                >
                  Purchase Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
                  disabled={isVerifying}
                />
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-3 px-4 rounded-xl bg-accent-primary hover:bg-accent-hover text-bg-primary font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <div className="w-5 h-5 border-2 border-bg-primary border-t-transparent rounded-full animate-spin" />
                    Sending Link...
                  </>
                ) : (
                  "Send Sign-In Link"
                )}
              </button>

              <p className="text-text-muted text-xs text-center mt-4">
                We&apos;ll email you a secure link to sign in. No password
                needed.
              </p>
            </form>
          )}

          <div className="mt-6 text-center space-y-4">
            <p className="text-text-muted text-sm">
              Don&apos;t have access yet?
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-accent-primary hover:text-accent-hover transition-colors font-medium"
            >
              Get the Program
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // User has access, render children
  return <>{children}</>;
}
