"use client";

import Link from "next/link";
import { useSettings, EquipmentType } from "../context/SettingsContext";
import Header from "../components/Header";

interface EquipmentOption {
  id: EquipmentType;
  name: string;
  description: string;
  icon: React.ReactNode;
  alwaysEnabled?: boolean;
}

const EQUIPMENT_OPTIONS: EquipmentOption[] = [
  {
    id: "bodyweight",
    name: "Bodyweight",
    description: "No equipment needed - just you",
    alwaysEnabled: true,
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    id: "bands",
    name: "Resistance Bands",
    description: "Loop or tube resistance bands",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 6h16M4 12h16M4 18h16"
        />
        <circle cx="4" cy="6" r="1.5" fill="currentColor" />
        <circle cx="20" cy="6" r="1.5" fill="currentColor" />
        <circle cx="4" cy="12" r="1.5" fill="currentColor" />
        <circle cx="20" cy="12" r="1.5" fill="currentColor" />
        <circle cx="4" cy="18" r="1.5" fill="currentColor" />
        <circle cx="20" cy="18" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "dumbbells",
    name: "Dumbbells",
    description: "Adjustable or fixed weight dumbbells",
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <rect x="1" y="9" width="4" height="6" rx="1" strokeWidth={1.5} />
        <rect x="19" y="9" width="4" height="6" rx="1" strokeWidth={1.5} />
        <rect x="5" y="10" width="3" height="4" rx="0.5" strokeWidth={1.5} />
        <rect x="16" y="10" width="3" height="4" rx="0.5" strokeWidth={1.5} />
        <line
          x1="8"
          y1="12"
          x2="16"
          y2="12"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "kettlebell",
    name: "Kettlebell",
    description: "Single or multiple kettlebells",
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          d="M12 4C9.5 4 7.5 5.5 7.5 7.5C7.5 8.5 8 9.5 8.5 10L6 18C6 20 8.5 22 12 22C15.5 22 18 20 18 18L15.5 10C16 9.5 16.5 8.5 16.5 7.5C16.5 5.5 14.5 4 12 4Z"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 7.5C9.5 6.1 10.6 5 12 5C13.4 5 14.5 6.1 14.5 7.5"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "pullupbar",
    name: "Pull-Up Bar",
    description: "Door frame bar or outdoor bar",
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <line
          x1="2"
          y1="6"
          x2="22"
          y2="6"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <line
          x1="4"
          y1="6"
          x2="4"
          y2="10"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="6"
          x2="20"
          y2="10"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <path
          d="M9 14c0-1 1-2 3-2s3 1 3 2v4"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="9"
          y1="18"
          x2="9"
          y2="22"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <line
          x1="15"
          y1="18"
          x2="15"
          y2="22"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function SettingsPage() {
  const { settings, toggleEquipment, hasEquipment } = useSettings();

  const selectedCount = settings.equipment.length;

  return (
    <div className="min-h-screen bg-gradient-animated">
      <Header isSettingsPage />

      <main className="max-w-2xl mx-auto px-6 py-8">
        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-8"
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

        {/* Page Header */}
        <div className="mb-8">
          <h1
            className="text-4xl font-bold text-text-primary mb-2"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            EQUIPMENT SETTINGS
          </h1>
          <p className="text-text-secondary">
            Select the equipment you have available. Your workout plan will be
            tailored to use only exercises you can perform.
          </p>
        </div>

        {/* Equipment Selection */}
        <div className="space-y-4 mb-8">
          {EQUIPMENT_OPTIONS.map((option, index) => {
            const isSelected = hasEquipment(option.id);
            const isDisabled = option.alwaysEnabled;

            return (
              <button
                key={option.id}
                onClick={() => !isDisabled && toggleEquipment(option.id)}
                disabled={isDisabled}
                className={`
                  w-full p-5 rounded-2xl border transition-all duration-200 text-left
                  opacity-0 animate-fade-in
                  ${
                    isSelected
                      ? "bg-bg-card-active border-accent-primary shadow-lg shadow-accent-glow"
                      : "bg-bg-secondary border-border hover:border-border-highlight hover:bg-bg-card"
                  }
                  ${isDisabled ? "cursor-default" : "cursor-pointer"}
                `}
                style={{
                  animationDelay: `${index * 0.05}s`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div
                    className={`
                      w-14 h-14 rounded-xl flex items-center justify-center transition-colors
                      ${
                        isSelected
                          ? "bg-accent-primary/20 text-accent-primary"
                          : "bg-bg-card text-text-muted"
                      }
                    `}
                  >
                    {option.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`font-semibold text-lg ${
                          isSelected
                            ? "text-text-primary"
                            : "text-text-secondary"
                        }`}
                      >
                        {option.name}
                      </h3>
                      {option.alwaysEnabled && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-ocean-dark/50 text-ocean-light">
                          Always included
                        </span>
                      )}
                    </div>
                    <p className="text-text-muted text-sm mt-0.5">
                      {option.description}
                    </p>
                  </div>

                  {/* Checkbox */}
                  <div
                    className={`
                      w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all
                      ${
                        isSelected
                          ? "bg-accent-primary border-accent-primary"
                          : "bg-bg-card border-border-highlight"
                      }
                      ${isDisabled ? "opacity-60" : ""}
                    `}
                  >
                    {isSelected && (
                      <svg
                        className="w-4 h-4 text-bg-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Summary */}
        <div className="p-5 rounded-2xl bg-bg-secondary border border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-text-primary font-semibold">Your Equipment</h3>
            <span className="text-text-muted text-sm">
              {selectedCount} item{selectedCount !== 1 ? "s" : ""} selected
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {settings.equipment.map((eq) => {
              const option = EQUIPMENT_OPTIONS.find((o) => o.id === eq);
              return (
                <span
                  key={eq}
                  className="px-3 py-1.5 rounded-lg bg-bg-card border border-border text-sm text-text-secondary"
                >
                  {option?.name || eq}
                </span>
              );
            })}
          </div>
        </div>

        {/* Info Note */}
        <div className="mt-6 p-4 rounded-xl bg-ocean-dark/20 border border-ocean-mid/30">
          <div className="flex gap-3">
            <svg
              className="w-5 h-5 text-ocean-light shrink-0 mt-0.5"
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
            <div>
              <p className="text-ocean-light text-sm font-medium mb-1">
                How it works
              </p>
              <p className="text-text-muted text-sm">
                Exercises will be automatically substituted based on your
                equipment. For example, if you only have bands, dumbbell rows
                become band rows. The workout intensity and surf-specific
                benefits remain the same.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
