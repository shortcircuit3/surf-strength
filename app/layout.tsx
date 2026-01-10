import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Surf Strength | 4-Week Training Program",
  description:
    "Functional strength training designed for surfers. Build paddle power, pop-up explosiveness, and rotational strength.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
