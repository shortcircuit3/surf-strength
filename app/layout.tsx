import type { Metadata } from "next";
import { DM_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "./context/ProgressContext";
import { SettingsProvider } from "./context/SettingsContext";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Surf Strength | 4-Week Training Program",
  description:
    "Functional strength training designed for surfers. Build paddle power, pop-up explosiveness, and rotational strength.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${bebasNeue.variable} antialiased`}>
        <SettingsProvider>
          <ProgressProvider>{children}</ProgressProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
