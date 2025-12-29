"use client";

import { useState } from "react";
import Link from "next/link";
import { workoutPlan, Week } from "../data/workouts";
import { useProgress } from "../context/ProgressContext";
import Header from "./Header";

export default function MobileCalendar() {
  const { isDayComplete, getTotalProgress, resetProgress, progress } =
    useProgress();
  const [selectedDay, setSelectedDay] = useState(1);
  const [equipmentExpanded, setEquipmentExpanded] = useState(false);
  const totalProgress = getTotalProgress();

  // Get all 28 days in a flat array
  const allDays = workoutPlan.flatMap((week) => week.days);

  // Find which week the selected day belongs to
  const getWeekForDay = (dayId: number): Week => {
    return (
      workoutPlan.find((week) => week.days.some((day) => day.id === dayId)) ||
      workoutPlan[0]
    );
  };

  const selectedWeek = getWeekForDay(selectedDay);
  const weekNumber = workoutPlan.findIndex((w) => w.id === selectedWeek.id) + 1;

  return (
    <div className="min-h-screen bg-bg-primary bg-gradient-animated">
      <Header />

      {/* Hero Section */}
      <div className="px-4 pt-6 pb-4">
        <h2
          className="text-2xl font-bold text-text-primary mb-2"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          SURF-SPECIFIC STRENGTH
        </h2>
        <p className="text-text-secondary text-sm mb-4">
          4 weeks of functional training for paddling power, pop-up speed, and
          rotational strength.
        </p>

        {/* Key Rules */}
        <div className="flex flex-wrap gap-2">
          {["No sets to failure", "Always 2 RIR", "Explosive intent"].map(
            (rule) => (
              <span key={rule} className="stat-pill text-xs px-2 py-1">
                <span className="text-accent-primary mr-1">✓</span>
                {rule}
              </span>
            )
          )}
        </div>
      </div>

      {/* Month Label */}
      <div className="px-4 pb-2">
        <h3 className="text-lg tracking-wide">
          <span
            className="italic font-bold text-text-primary"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            MONTH
          </span>
          <span
            className="text-text-secondary font-normal ml-1"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            #1
          </span>
        </h3>
      </div>

      {/* Main Card */}
      <div className="mx-4 bg-bg-secondary rounded-2xl p-5 border border-border">
        {/* Progress Circle */}
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="var(--border-color)"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="var(--ocean-light)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${totalProgress * 2.64} 264`}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-text-primary">
                {Math.round(totalProgress)}%
              </span>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        {progress.completedDays.length > 0 && (
          <div className="flex justify-center mb-4">
            <button
              onClick={resetProgress}
              className="text-text-muted hover:text-red-400 text-xs transition-colors"
            >
              Reset Progress
            </button>
          </div>
        )}

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {allDays.map((day) => {
            const isComplete = isDayComplete(day.id);
            const isSelected = selectedDay === day.id;

            return (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={`
                  aspect-square rounded-lg flex items-center justify-center text-lg font-semibold
                  transition-all duration-200
                  ${
                    isSelected
                      ? "bg-ocean-light text-bg-primary shadow-lg"
                      : isComplete
                      ? "bg-success/20 text-success border border-success/30"
                      : "bg-bg-card text-text-primary hover:bg-bg-card-hover border border-border"
                  }
                `}
              >
                {day.id}
              </button>
            );
          })}
        </div>

        {/* Ocean Accent Bar */}
        <div className="h-1 bg-linear-to-r from-ocean-light via-ocean-mid to-transparent rounded mb-5" />

        {/* Required Equipment Section */}
        <button
          onClick={() => setEquipmentExpanded(!equipmentExpanded)}
          className="w-full flex items-center justify-between py-2"
        >
          <span className="text-xs tracking-widest text-text-muted font-semibold">
            REQUIRED EQUIPMENT
          </span>
          <span className="text-text-muted text-sm">
            [{equipmentExpanded ? "−" : "+"}]
          </span>
        </button>

        {equipmentExpanded && (
          <div className="pb-4 text-sm text-text-secondary space-y-2 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-ocean-light">•</span>
              <span>Dumbbells (pair + single)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-ocean-light">•</span>
              <span>Bench or elevated surface</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-ocean-light">•</span>
              <span>Open floor space</span>
            </div>
          </div>
        )}
      </div>

      {/* Week Section */}
      <div className="mx-4 mt-6 mb-8">
        {/* Week Header */}
        <div className="week-badge rounded-t-lg px-4 py-2.5">
          <span className="text-xs font-bold tracking-wider">
            WEEK #{weekNumber}
          </span>
          <span className="text-xs font-bold tracking-wider opacity-70 ml-2">
            {selectedWeek.theme}
          </span>
        </div>

        {/* Workout List */}
        <div className="bg-bg-secondary rounded-b-lg overflow-hidden border border-t-0 border-border">
          {selectedWeek.days.map((day) => {
            const isSelected = selectedDay === day.id;
            const isComplete = isDayComplete(day.id);

            return (
              <Link
                key={day.id}
                href={`/day/${day.id}`}
                className={`
                  flex items-center px-4 py-3 border-b border-border last:border-b-0
                  transition-all duration-200
                  ${
                    isSelected
                      ? "border-l-4 border-l-ocean-light bg-bg-card-active"
                      : "border-l-4 border-l-transparent hover:bg-bg-card"
                  }
                  ${isComplete && !isSelected ? "bg-success/5" : ""}
                `}
              >
                <div
                  className={`
                    w-10 h-8 rounded flex items-center justify-center text-sm font-bold mr-4
                    ${
                      isSelected
                        ? "bg-ocean-light text-bg-primary"
                        : isComplete
                        ? "bg-success/20 text-success"
                        : "bg-bg-card text-text-muted border border-border"
                    }
                  `}
                >
                  {day.id}
                </div>
                <div className="flex-1">
                  <span
                    className={`
                      text-sm font-semibold tracking-wide uppercase
                      ${
                        isSelected ? "text-text-primary" : "text-text-secondary"
                      }
                    `}
                  >
                    {day.title}
                    {day.subtitle && (
                      <span className="text-text-muted font-normal ml-2">
                        / {day.subtitle}
                      </span>
                    )}
                  </span>
                </div>
                {isComplete && (
                  <svg
                    className="w-5 h-5 text-success ml-2"
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
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
