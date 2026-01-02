"use client";

import { useState, FormEvent, ReactNode } from "react";
import Link from "next/link";
import { useAccess } from "../context/AccessContext";

interface AccessGateProps {
  children: ReactNode;
}

export default function AccessGate({ children }: AccessGateProps) {
  const { hasAccess, isLoading, isVerifying, verifyEmail } = useAccess();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    const success = await verifyEmail(email.trim());

    if (!success) {
      setError(
        "No purchase found for this email. Please use the email you used at checkout."
      );
    }
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
              Enter the email you used to purchase to access your workouts
            </p>
          </div>

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
                  Verifying...
                </>
              ) : (
                "Access Workouts"
              )}
            </button>
          </form>

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
