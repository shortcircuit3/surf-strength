"use client";

import { AccessProvider } from "../context/AccessContext";
import { ProgressProvider } from "../context/ProgressContext";
import { SettingsProvider } from "../context/SettingsContext";
import AccessGate from "../components/AccessGate";

export default function WorkoutsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AccessProvider>
      <ProgressProvider>
        <SettingsProvider>
          <AccessGate>{children}</AccessGate>
        </SettingsProvider>
      </ProgressProvider>
    </AccessProvider>
  );
}
