"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProgress } from "../context/ProgressContext";

interface HeaderProps {
  isSettingsPage?: boolean;
}

export default function Header({ isSettingsPage = false }: HeaderProps) {
  const { getTotalProgress, progress } = useProgress();
  const router = useRouter();
  const totalProgress = getTotalProgress();
  const completedDays = progress.completedDays.length;

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
              <svg
                className="w-6 h-6 text-bg-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
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
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-text-muted uppercase tracking-wide">
                  Days Complete
                </p>
                <p className="text-xl font-bold text-text-primary">
                  {completedDays}
                  <span className="text-text-muted font-normal text-sm">
                    /28
                  </span>
                </p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-right">
                <p className="text-xs text-text-muted uppercase tracking-wide">
                  Progress
                </p>
                <p className="text-xl font-bold text-accent-primary">
                  {totalProgress}%
                </p>
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
                  <linearGradient
                    id="progressGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="var(--ocean-light)" />
                    <stop offset="100%" stopColor="var(--accent-primary)" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-text-primary">
                {totalProgress}%
              </span>
            </div>

            {/* Settings Link / Back Button */}
            {isSettingsPage ? (
              <button
                onClick={() => router.back()}
                className="w-10 h-10 rounded-xl bg-bg-card border border-border hover:border-border-highlight hover:bg-bg-card-hover flex items-center justify-center transition-all"
                title="Go Back"
              >
                <svg
                  className="w-5 h-5 text-text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            ) : (
              <Link
                href="/settings"
                className="w-10 h-10 rounded-xl bg-bg-card border border-border hover:border-border-highlight hover:bg-bg-card-hover flex items-center justify-center transition-all"
                title="Equipment Settings"
              >
                <svg
                  className="w-5 h-5 text-text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
