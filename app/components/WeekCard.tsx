"use client";

import Link from "next/link";
import { Week } from "../data/workouts";
import { useProgress } from "../context/ProgressContext";

interface WeekCardProps {
  week: Week;
  weekIndex: number;
}

export default function WeekCard({ week, weekIndex }: WeekCardProps) {
  const { isDayComplete } = useProgress();

  return (
    <div
      className="opacity-0 animate-fade-in"
      style={{
        animationDelay: `${weekIndex * 0.1}s`,
        animationFillMode: "forwards",
      }}
    >
      {/* Week Header */}
      <div className="flex items-center gap-4 mb-4">
        <span className="week-badge px-4 py-2 rounded-lg text-sm">
          {week.name}
        </span>
        <span className="text-text-secondary font-medium tracking-wide text-sm uppercase">
          {week.theme}
        </span>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-3 mb-8">
        {week.days.map((day, dayIndex) => {
          const isComplete = isDayComplete(day.id);

          return (
            <Link
              key={day.id}
              href={`/day/${day.id}`}
              className={`
                workout-card p-4 min-h-[140px] flex flex-col
                ${isComplete ? "completed" : ""}
                ${day.isRest ? "rest-card cursor-default" : "cursor-pointer"}
                opacity-0 animate-fade-in
              `}
              style={{
                animationDelay: `${weekIndex * 0.1 + dayIndex * 0.03}s`,
                animationFillMode: "forwards",
              }}
            >
              {/* Day Badge */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`day-badge px-3 py-1 rounded text-xs ${
                    isComplete ? "active" : ""
                  }`}
                >
                  DAY {day.id}
                </span>
                {isComplete && (
                  <svg
                    className="w-5 h-5 text-success"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>

              {/* Day Title */}
              <h3 className="text-text-primary font-semibold text-sm leading-tight mb-1">
                {day.title}
              </h3>
              {day.subtitle && (
                <p className="text-text-muted text-xs">{day.subtitle}</p>
              )}

              {/* Rest day icon */}
              {day.isRest && (
                <div className="mt-auto pt-2">
                  <span className="text-ocean-light text-xl">🌊</span>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
