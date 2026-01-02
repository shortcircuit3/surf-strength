"use client";

import { Suspense } from "react";
import { useState, FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Check if coming from successful payment
  const paymentSuccess = searchParams.get("payment") === "success";

  useEffect(() => {
    // If not from payment, redirect to home
    if (!paymentSuccess) {
      router.push("/");
    }
  }, [paymentSuccess, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsVerifying(true);

    if (!email.trim()) {
      setError("Please enter your email");
      setIsVerifying(false);
      return;
    }

    try {
      const response = await fetch("/api/verify-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (data.hasAccess) {
        // Store access in localStorage
        const stored = {
          email: data.email,
          verifiedAt: new Date().toISOString(),
        };
        localStorage.setItem("surf-workout-access", JSON.stringify(stored));
        setIsSuccess(true);
        
        // Redirect to workouts after a brief delay
        setTimeout(() => {
          router.push("/workouts");
        }, 2000);
      } else {
        setError(
          "We couldn't find your purchase yet. This can take a few minutes. Please try again shortly, or use the email you used at checkout."
        );
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  if (!paymentSuccess) {
    return null; // Will redirect
  }

  return (
    <div className="max-w-md w-full">
      {isSuccess ? (
        // Success state
        <div className="text-center">
          <div className="text-8xl mb-6">🎉</div>
          <h1
            className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            YOU&apos;RE IN!
          </h1>
          <p className="text-text-secondary mb-6">
            Your access has been verified. Redirecting you to your workouts...
          </p>
          <div className="w-12 h-12 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : (
        // Verification form
        <>
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✅</div>
            <h1
              className="text-3xl md:text-4xl font-bold text-text-primary mb-2"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              PAYMENT SUCCESSFUL!
            </h1>
            <p className="text-text-secondary">
              Thank you for your purchase! Enter the email you used at checkout to access your workouts.
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
                Checkout Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl bg-bg-primary border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
                disabled={isVerifying}
                autoFocus
              />
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm">
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
                "Access My Workouts"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-muted text-sm mb-4">
              Payment processing can take 1-2 minutes. If you don&apos;t see your access immediately, please wait and try again.
            </p>
            <Link
              href="/"
              className="text-text-muted hover:text-text-secondary transition-colors text-sm"
            >
              ← Back to home
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-text-secondary">Loading...</p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-animated flex items-center justify-center px-6">
      <Suspense fallback={<LoadingState />}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
