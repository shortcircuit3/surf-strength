"use client";

import Header from "./components/Header";
import WeekCard from "./components/WeekCard";
import MobileCalendar from "./components/MobileCalendar";
import { workoutPlan } from "./data/workouts";
import { useProgress } from "./context/ProgressContext";

export default function Home() {
  const { getTotalProgress, progress, resetProgress } = useProgress();
  const totalProgress = getTotalProgress();

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden">
        <MobileCalendar />
      </div>

      {/* Desktop View */}
      <div className="hidden md:block min-h-screen bg-gradient-animated">
        <Header />

        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Hero Section */}
          <div
            className="mb-12 opacity-0 animate-fade-in"
            style={{ animationFillMode: "forwards" }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-text-primary mb-3"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              SURF-SPECIFIC STRENGTH
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl">
              4 weeks of functional training designed to improve your paddling
              power, pop-up speed, and rotational strength. No bulk, just
              performance.
            </p>

            {/* Key Rules */}
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                "No sets to failure",
                "Always 2 RIR",
                "Explosive intent",
                "Feel better than you started",
              ].map((rule, i) => (
                <span
                  key={rule}
                  className="stat-pill text-sm opacity-0 animate-fade-in"
                  style={{
                    animationDelay: `${0.3 + i * 0.05}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <span className="text-accent-primary mr-2">✓</span>
                  {rule}
                </span>
              ))}
            </div>
          </div>

          {/* Overall Progress */}
          {progress.completedDays.length > 0 && (
            <div
              className="mb-8 p-6 rounded-2xl bg-bg-secondary border border-border opacity-0 animate-fade-in"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-text-primary font-semibold mb-1">
                    Overall Progress
                  </h3>
                  <p className="text-text-muted text-sm">
                    {progress.completedDays.length} of 28 days completed
                  </p>
                </div>
                <button
                  onClick={resetProgress}
                  className="text-text-muted hover:text-red-400 text-sm transition-colors"
                >
                  Reset Progress
                </button>
              </div>
              <div className="progress-bar h-3">
                <div
                  className="progress-fill"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Calendar Grid */}
          <div className="space-y-2">
            {workoutPlan.map((week, index) => (
              <WeekCard key={week.id} week={week} weekIndex={index} />
            ))}
          </div>

          {/* Footer Info */}
          <div
            className="mt-12 p-6 rounded-2xl bg-bg-secondary border border-border opacity-0 animate-fade-in"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Equipment Guide
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="text-accent-primary font-medium mb-2">
                  Use Two Dumbbells For:
                </h4>
                <ul className="space-y-1 text-text-secondary">
                  <li>• Romanian Deadlifts</li>
                  <li>• Rows</li>
                  <li>• Carries</li>
                  <li>• Floor Press</li>
                </ul>
              </div>
              <div>
                <h4 className="text-accent-primary font-medium mb-2">
                  Use One Dumbbell For:
                </h4>
                <ul className="space-y-1 text-text-secondary">
                  <li>• Squats (Goblet)</li>
                  <li>• Single-Arm Pressing</li>
                  <li>• Windmills</li>
                  <li>• Rotational Work</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-text-muted text-sm italic">
              Unilateral loading = balance + core = better surfing 🏄‍♂️
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
