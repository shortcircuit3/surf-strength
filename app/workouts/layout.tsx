"use client";

import { AccessProvider } from "../context/AccessContext";
import AccessGate from "../components/AccessGate";

export default function WorkoutsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AccessProvider>
      <AccessGate>{children}</AccessGate>
    </AccessProvider>
  );
}
