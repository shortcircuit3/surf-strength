"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import WeekCard from "../components/WeekCard";
import MobileCalendar from "../components/MobileCalendar";
import YouTubeModal, { YouTubePreview } from "../components/YouTubeModal";
import { workoutPlan, RIR_EXPLANATION } from "../data/workouts";
import { useProgress } from "../context/ProgressContext";
import { useSettings, EquipmentType } from "../context/SettingsContext";

const EQUIPMENT_LABELS: Record<EquipmentType, string> = {
  bodyweight: "Bodyweight",
  bands: "Resistance Bands",
  dumbbells: "Dumbbells",
  kettlebell: "Kettlebell",
  pullupbar: "Pull-Up Bar",
};

export default function WorkoutsHome() {
  const { getTotalProgress, progress, resetProgress } = useProgress();
  const { settings } = useSettings();
  const totalProgress = getTotalProgress();
  const [showRirModal, setShowRirModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

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
              ].map((rule, i) => {
                const isRirRule = rule === "Always 2 RIR";
                return (
                  <button
                    key={rule}
                    onClick={
                      isRirRule ? () => setShowRirModal(true) : undefined
                    }
                    className={`stat-pill text-sm opacity-0 animate-fade-in inline-flex items-center ${
                      isRirRule
                        ? "cursor-pointer hover:border-accent-primary transition-colors"
                        : "cursor-default"
                    }`}
                    style={{
                      animationDelay: `${0.3 + i * 0.05}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <span className="text-accent-primary mr-2">✓</span>
                    {rule}
                    {isRirRule && (
                      <svg
                        className="w-4 h-4 ml-1.5 text-text-muted"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Your Equipment
              </h3>
              <Link
                href="/workouts/settings"
                className="text-ocean-light hover:text-accent-primary text-sm transition-colors flex items-center gap-1"
              >
                <svg
                  className="w-4 h-4"
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
                Change
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {settings.equipment.map((eq) => (
                <span
                  key={eq}
                  className="px-3 py-1.5 rounded-lg bg-bg-card border border-border text-sm text-text-secondary"
                >
                  {EQUIPMENT_LABELS[eq]}
                </span>
              ))}
            </div>
            <p className="text-text-muted text-sm">
              Exercises are automatically adjusted based on your available
              equipment. The workout intensity and surf-specific benefits remain
              the same.
            </p>
          </div>
        </main>
      </div>

      {/* RIR Explanation Modal */}
      {showRirModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowRirModal(false)}
        >
          <div
            className="bg-bg-card border border-border rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-xl font-bold text-text-primary"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {RIR_EXPLANATION.title}
              </h3>
              <button
                onClick={() => setShowRirModal(false)}
                className="text-text-muted hover:text-text-primary transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-text-secondary mb-4">
              {RIR_EXPLANATION.description}
            </p>
            <div className="space-y-2 mb-4">
              {RIR_EXPLANATION.examples.map((ex) => (
                <div key={ex.rir} className="flex items-center gap-3">
                  <span className="font-mono text-accent-primary font-semibold w-16">
                    {ex.rir}
                  </span>
                  <span className="text-text-muted">{ex.meaning}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-accent-secondary italic">
              {RIR_EXPLANATION.recommendation}
            </p>

            {RIR_EXPLANATION.youtube && (
              <div className="mt-4">
                <YouTubePreview
                  url={RIR_EXPLANATION.youtube}
                  alt="RIR Explanation Video"
                  onClick={() => {
                    setShowRirModal(false);
                    setActiveVideo(RIR_EXPLANATION.youtube!);
                  }}
                  className="w-full aspect-video rounded-xl"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* YouTube Video Modal */}
      <YouTubeModal
        videoUrl={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </>
  );
}

