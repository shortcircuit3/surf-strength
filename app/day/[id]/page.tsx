"use client";

import { use, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getWorkoutDay,
  getWeekForDay,
  DAILY_MOBILITY,
  transformWorkoutDayForEquipment,
  RIR_EXPLANATION,
} from "../../data/workouts";
import { useProgress } from "../../context/ProgressContext";
import { useSettings } from "../../context/SettingsContext";
import Header from "../../components/Header";
import YouTubeModal, { YouTubePreview } from "../../components/YouTubeModal";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function WorkoutDayPage({ params }: PageProps) {
  const { id } = use(params);
  const dayId = parseInt(id, 10);
  const router = useRouter();
  const baseDay = getWorkoutDay(dayId);
  const week = getWeekForDay(dayId);
  const { isDayComplete, toggleDayComplete } = useProgress();
  const { settings } = useSettings();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [showRirTooltip, setShowRirTooltip] = useState(false);
  const [isMobilityMinimized, setIsMobilityMinimized] = useState(true);

  // Transform exercises based on available equipment
  const day = useMemo(() => {
    if (!baseDay) return null;
    return transformWorkoutDayForEquipment(baseDay, settings.equipment);
  }, [baseDay, settings.equipment]);

  if (!day || !week) {
    return (
      <div className="min-h-screen bg-gradient-animated flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            Workout not found
          </h1>
          <Link href="/" className="text-accent-primary hover:underline">
            Return to calendar
          </Link>
        </div>
      </div>
    );
  }

  const isComplete = isDayComplete(dayId);

  const handleCompleteDay = () => {
    toggleDayComplete(dayId);
  };

  const handleNext = () => {
    if (dayId < 28) {
      router.push(`/day/${dayId + 1}`);
    }
  };

  const handlePrev = () => {
    if (dayId > 1) {
      router.push(`/day/${dayId - 1}`);
    }
  };

  // Rest day view
  if (day.isRest) {
    return (
      <div className="min-h-screen bg-gradient-animated">
        <Header />
        <main className="max-w-4xl mx-auto px-6 py-8">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Calendar
            </Link>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                disabled={dayId <= 1}
                className="p-2 rounded-lg bg-bg-card border border-border hover:bg-bg-card-hover disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                disabled={dayId >= 28}
                className="p-2 rounded-lg bg-bg-card border border-border hover:bg-bg-card-hover disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Rest Day Content */}
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🌊</div>
            <h1
              className="text-4xl font-bold text-text-primary mb-2"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              REST DAY
            </h1>
            <p className="text-text-secondary text-lg mb-2">
              {day.dayOfWeek} • Day {day.id}
            </p>
            <p className="text-text-muted max-w-md mx-auto">
              {day.subtitle}. Take this time to recover, stretch, or hit the
              waves!
            </p>

            <button
              onClick={handleCompleteDay}
              className={`btn-complete mt-8 ${isComplete ? "completed" : ""}`}
            >
              {isComplete ? "✓ Day Logged" : "Log Rest Day"}
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-animated">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Calendar
          </Link>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={dayId <= 1}
              className="p-2 rounded-lg bg-bg-card border border-border hover:bg-bg-card-hover disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={dayId >= 28}
              className="p-2 rounded-lg bg-bg-card border border-border hover:bg-bg-card-hover disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Day Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="week-badge px-3 py-1 rounded text-xs">
              {week.name}
            </span>
            <span className="text-text-muted text-sm">{week.theme}</span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold text-text-primary mb-2"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            {day.title}
          </h1>
          <p className="text-text-secondary text-lg">
            {day.dayOfWeek} • Day {day.id} • {day.subtitle}
          </p>
        </div>

        {/* Mobility Warmup Section */}
        <div className="mb-8">
          <button
            onClick={() => setIsMobilityMinimized(!isMobilityMinimized)}
            className="w-full flex items-center justify-between gap-3 mb-4 group"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <h2
                  className="text-xl font-bold text-text-primary"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  MOBILITY WARMUP
                </h2>
              </div>
              <span className="text-text-muted text-sm">5-8 min</span>
            </div>
            <svg
              className={`w-5 h-5 text-text-muted transition-transform ${
                isMobilityMinimized ? "" : "rotate-180"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {!isMobilityMinimized && (
            <div className="space-y-4">
              {DAILY_MOBILITY.map((block, blockIndex) => (
                <div key={block.title}>
                  {/* Block Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-accent-secondary font-semibold text-sm uppercase tracking-wide">
                      {block.title}
                    </span>
                    <span className="text-text-muted text-xs">
                      ({block.duration})
                    </span>
                  </div>

                  {/* Block Exercises */}
                  <div className="space-y-3">
                    {block.exercises.map((ex, exIndex) => {
                      return (
                        <div key={ex.id} className="exercise-card p-5">
                          <div className="flex gap-4 md:gap-6">
                            {/* Media - Left Side (Desktop) */}
                            <div className="hidden md:block shrink-0">
                              {ex.youtube ? (
                                <YouTubePreview
                                  url={ex.youtube}
                                  alt={ex.name}
                                  onClick={() => setActiveVideo(ex.youtube!)}
                                  className="w-32 h-32 rounded-xl"
                                />
                              ) : ex.gif ? (
                                <Image
                                  src={ex.gif}
                                  alt={ex.name}
                                  width={128}
                                  height={128}
                                  className="w-32 h-32 object-cover rounded-xl"
                                  unoptimized
                                />
                              ) : (
                                <div className="w-32 h-32 rounded-xl bg-bg-card-hover border border-border flex items-center justify-center">
                                  <span className="text-3xl opacity-40">
                                    🧘
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Exercise Content */}
                            <div className="flex-1">
                              {/* Exercise Name */}
                              <h3 className="text-lg font-semibold mb-3 text-text-primary">
                                <span className="text-accent-secondary mr-2">
                                  {String.fromCharCode(65 + blockIndex)}
                                  {exIndex + 1}:
                                </span>
                                {ex.name}
                              </h3>

                              {/* Stats */}
                              <div className="flex flex-wrap gap-3 mb-3">
                                {ex.reps && (
                                  <div className="stat-pill">
                                    <span className="stat-label">Reps</span>
                                    <span className="stat-value ml-2">
                                      {ex.reps}
                                    </span>
                                  </div>
                                )}
                                {ex.time && (
                                  <div className="stat-pill">
                                    <span className="stat-label">Time</span>
                                    <span className="stat-value ml-2">
                                      {ex.time}
                                    </span>
                                  </div>
                                )}
                                <div className="stat-pill">
                                  <span className="stat-label">Load</span>
                                  <span className="stat-value ml-2">BW</span>
                                </div>
                              </div>

                              {/* Notes */}
                              {ex.notes && (
                                <p className="text-text-muted text-sm leading-relaxed">
                                  {ex.notes}
                                </p>
                              )}

                              {/* Mobile Media */}
                              <div className="mt-4 md:hidden">
                                {ex.youtube ? (
                                  <YouTubePreview
                                    url={ex.youtube}
                                    alt={ex.name}
                                    onClick={() => setActiveVideo(ex.youtube!)}
                                    className="w-32 h-32 rounded-xl"
                                  />
                                ) : ex.gif ? (
                                  <Image
                                    src={ex.gif}
                                    alt={ex.name}
                                    width={128}
                                    height={128}
                                    className="w-32 h-32 object-cover rounded-xl"
                                    unoptimized
                                  />
                                ) : (
                                  <div className="w-32 h-32 rounded-xl bg-bg-card-hover border border-border flex items-center justify-center">
                                    <span className="text-3xl opacity-40">
                                      🧘
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Workout Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💪</span>
            <h2
              className="text-xl font-bold text-text-primary"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              MAIN WORKOUT
            </h2>
          </div>
        </div>

        {/* Exercises */}
        <div className="space-y-4 mb-8">
          {day.exercises.map((exercise) => {
            const isCircuitItem = exercise.name.startsWith("→");
            const hasMedia = exercise.gif || exercise.youtube;

            return (
              <div
                key={exercise.id}
                className={`
                  exercise-card p-5 
                  ${isCircuitItem ? "ml-6 border-l-4 border-l-ocean-mid" : ""}
                `}
              >
                <div className="flex gap-4 md:gap-6">
                  {/* Media - Left Side (Desktop) */}
                  {hasMedia && (
                    <div className="hidden md:block shrink-0">
                      {exercise.youtube ? (
                        <YouTubePreview
                          url={exercise.youtube}
                          alt={exercise.name}
                          onClick={() => setActiveVideo(exercise.youtube!)}
                          className="w-32 h-32 rounded-xl"
                        />
                      ) : exercise.gif ? (
                        <Image
                          src={exercise.gif}
                          alt={exercise.name}
                          width={128}
                          height={128}
                          className="w-32 h-32 object-cover rounded-xl"
                          unoptimized
                        />
                      ) : null}
                    </div>
                  )}

                  {/* Exercise Content */}
                  <div className="flex-1">
                    {/* Exercise Name */}
                    <h3 className="text-lg font-semibold mb-3 text-text-primary">
                      {!isCircuitItem && (
                        <span className="text-accent-primary mr-2">
                          {exercise.id}:
                        </span>
                      )}
                      {exercise.name.replace("→ ", "")}
                    </h3>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-3 mb-3">
                      {exercise.sets && (
                        <div className="stat-pill">
                          <span className="stat-label">Sets</span>
                          <span className="stat-value ml-2">
                            {exercise.sets}
                          </span>
                        </div>
                      )}
                      {exercise.reps && (
                        <div className="stat-pill relative">
                          <span className="stat-label">Reps</span>
                          <span className="stat-value ml-2">
                            {exercise.reps}
                          </span>
                          {exercise.reps.toLowerCase().includes("rir") && (
                            <button
                              onClick={() => setShowRirTooltip(!showRirTooltip)}
                              className="ml-1 text-accent-secondary hover:text-accent-primary transition-colors"
                              aria-label="What is RIR?"
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
                                  strokeWidth={2}
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      )}
                      {exercise.time && (
                        <div className="stat-pill">
                          <span className="stat-label">Time</span>
                          <span className="stat-value ml-2">
                            {exercise.time}
                          </span>
                        </div>
                      )}
                      {exercise.tempo && (
                        <div className="stat-pill">
                          <span className="stat-label">Tempo</span>
                          <span className="stat-value ml-2">
                            {exercise.tempo}
                          </span>
                        </div>
                      )}
                      {exercise.rest && (
                        <div className="stat-pill">
                          <span className="stat-label">Rest</span>
                          <span className="stat-value ml-2">
                            {exercise.rest}
                          </span>
                        </div>
                      )}
                      <div className="stat-pill">
                        <span className="stat-label">Load</span>
                        <span className="stat-value ml-2">{exercise.load}</span>
                      </div>
                    </div>

                    {/* Notes */}
                    {exercise.notes && (
                      <p className="text-text-muted text-sm leading-relaxed">
                        {exercise.notes}
                      </p>
                    )}

                    {/* Mobile Media */}
                    {hasMedia && (
                      <div className="mt-4 md:hidden">
                        {exercise.youtube ? (
                          <YouTubePreview
                            url={exercise.youtube}
                            alt={exercise.name}
                            onClick={() => setActiveVideo(exercise.youtube!)}
                            className="w-32 h-32 rounded-xl"
                          />
                        ) : exercise.gif ? (
                          <Image
                            src={exercise.gif}
                            alt={exercise.name}
                            width={128}
                            height={128}
                            className="w-32 h-32 object-cover rounded-xl"
                            unoptimized
                          />
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Shoulder Finisher Section (Upper Body Days Only) */}
        {day.shoulderFinisher && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <h2
                  className="text-xl font-bold text-text-primary"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  SHOULDER FINISHER
                </h2>
              </div>
              <span className="text-text-muted text-sm">
                {day.shoulderFinisher.name} • 2-4 min
              </span>
            </div>

            <div className="space-y-3">
              {day.shoulderFinisher.exercises.map((ex, index) => {
                return (
                  <div key={ex.id} className="exercise-card p-5">
                    <div className="flex gap-4 md:gap-6">
                      {/* Media - Left Side (Desktop) */}
                      <div className="hidden md:block shrink-0">
                        {ex.youtube ? (
                          <YouTubePreview
                            url={ex.youtube}
                            alt={ex.name}
                            onClick={() => setActiveVideo(ex.youtube!)}
                            className="w-32 h-32 rounded-xl"
                          />
                        ) : ex.gif ? (
                          <Image
                            src={ex.gif}
                            alt={ex.name}
                            width={128}
                            height={128}
                            className="w-32 h-32 object-cover rounded-xl"
                            unoptimized
                          />
                        ) : (
                          <div className="w-32 h-32 rounded-xl bg-bg-card-hover border border-border flex items-center justify-center">
                            <span className="text-3xl opacity-40">💪</span>
                          </div>
                        )}
                      </div>

                      {/* Exercise Content */}
                      <div className="flex-1">
                        {/* Exercise Name */}
                        <h3 className="text-lg font-semibold mb-3 text-text-primary">
                          <span className="text-ocean-light mr-2">
                            F{index + 1}:
                          </span>
                          {ex.name}
                        </h3>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-3 mb-3">
                          {ex.reps && (
                            <div className="stat-pill">
                              <span className="stat-label">Reps</span>
                              <span className="stat-value ml-2">{ex.reps}</span>
                            </div>
                          )}
                          {ex.time && (
                            <div className="stat-pill">
                              <span className="stat-label">Time</span>
                              <span className="stat-value ml-2">{ex.time}</span>
                            </div>
                          )}
                          <div className="stat-pill">
                            <span className="stat-label">Load</span>
                            <span className="stat-value ml-2">Light</span>
                          </div>
                        </div>

                        {/* Notes */}
                        {ex.notes && (
                          <p className="text-text-muted text-sm leading-relaxed">
                            {ex.notes}
                          </p>
                        )}

                        {/* Mobile Media */}
                        <div className="mt-4 md:hidden">
                          {ex.youtube ? (
                            <YouTubePreview
                              url={ex.youtube}
                              alt={ex.name}
                              onClick={() => setActiveVideo(ex.youtube!)}
                              className="w-32 h-32 rounded-xl"
                            />
                          ) : ex.gif ? (
                            <Image
                              src={ex.gif}
                              alt={ex.name}
                              width={128}
                              height={128}
                              className="w-32 h-32 object-cover rounded-xl"
                              unoptimized
                            />
                          ) : (
                            <div className="w-32 h-32 rounded-xl bg-bg-card-hover border border-border flex items-center justify-center">
                              <span className="text-3xl opacity-40">💪</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Complete Day Button */}
        <div className="text-center py-6">
          <button
            onClick={handleCompleteDay}
            className={`btn-complete ${isComplete ? "completed" : ""}`}
          >
            {isComplete ? "✓ Workout Complete" : "Mark Day Complete"}
          </button>

          {isComplete && dayId < 28 && (
            <button
              onClick={handleNext}
              className="block mx-auto mt-4 text-ocean-light hover:text-accent-primary transition-colors"
            >
              Continue to Day {dayId + 1} →
            </button>
          )}
        </div>
      </main>

      {/* YouTube Video Modal */}
      <YouTubeModal
        videoUrl={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

      {/* RIR Explanation Modal */}
      {showRirTooltip && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowRirTooltip(false)}
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
                onClick={() => setShowRirTooltip(false)}
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
              <button
                onClick={() => {
                  setShowRirTooltip(false);
                  setActiveVideo(RIR_EXPLANATION.youtube!);
                }}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
                Watch Video Explainer
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
