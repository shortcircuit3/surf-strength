"use client";

import Link from "next/link";
import { useProgress } from "../context/ProgressContext";

export default function Header() {
  const { getTotalProgress, progress } = useProgress();
  const totalProgress = getTotalProgress();
  const completedDays = progress.completedDays.length;

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
              <svg className="w-6 h-6 text-bg-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                SURF STRENGTH
              </h1>
              <p className="text-xs text-text-muted -mt-0.5">4-Week Program</p>
            </div>
          </Link>

          {/* Progress Stats */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-text-muted uppercase tracking-wide">Days Complete</p>
                <p className="text-xl font-bold text-text-primary">
                  {completedDays}
                  <span className="text-text-muted font-normal text-sm">/28</span>
                </p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-right">
                <p className="text-xs text-text-muted uppercase tracking-wide">Progress</p>
                <p className="text-xl font-bold text-accent-primary">{totalProgress}%</p>
              </div>
            </div>

            {/* Progress Ring */}
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-bg-card"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="url(#progressGradient)"
                  strokeWidth="4"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={`${totalProgress * 1.257} 125.7`}
                  className="transition-all duration-500"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--ocean-light)" />
                    <stop offset="100%" stopColor="var(--accent-primary)" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-text-primary">
                {totalProgress}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

