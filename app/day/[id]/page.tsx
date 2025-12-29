"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getWorkoutDay, getWeekForDay } from "../../data/workouts";
import { useProgress } from "../../context/ProgressContext";
import Header from "../../components/Header";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function WorkoutDayPage({ params }: PageProps) {
  const { id } = use(params);
  const dayId = parseInt(id, 10);
  const router = useRouter();
  const day = getWorkoutDay(dayId);
  const week = getWeekForDay(dayId);
  const { isDayComplete, toggleDayComplete } = useProgress();

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

        {/* Exercises */}
        <div className="space-y-4 mb-8">
          {day.exercises.map((exercise) => {
            const isCircuitItem = exercise.name.startsWith("→");

            return (
              <div
                key={exercise.id}
                className={`
                  exercise-card p-5 
                  ${isCircuitItem ? "ml-6 border-l-4 border-l-ocean-mid" : ""}
                `}
              >
                <div className="flex gap-4 md:gap-6">
                  {/* GIF - Left Side (Desktop) */}
                  {exercise.gif && (
                    <div className="hidden md:block shrink-0">
                      <Image
                        src={exercise.gif}
                        alt={exercise.name}
                        width={128}
                        height={128}
                        className="w-32 h-32 object-cover rounded-xl"
                        unoptimized
                      />
                    </div>
                  )}

                  {/* Exercise Content */}
                  <div className="flex-1">
                    {/* Exercise Name */}
                    <h3 className="text-lg font-semibold mb-3 text-text-primary">
                      {!isCircuitItem && (
                        <span className="text-accent-primary mr-2">
                          {exercise.id.toUpperCase()}:
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
                        <div className="stat-pill">
                          <span className="stat-label">Reps</span>
                          <span className="stat-value ml-2">
                            {exercise.reps}
                          </span>
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

                    {/* Mobile GIF */}
                    {exercise.gif && (
                      <div className="mt-4 md:hidden">
                        <Image
                          src={exercise.gif}
                          alt={exercise.name}
                          width={128}
                          height={128}
                          className="w-32 h-32 object-cover rounded-xl"
                          unoptimized
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

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
    </div>
  );
}
