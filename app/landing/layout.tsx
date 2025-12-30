import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surf Workout Program | 4-Week Strength Training for Surfers",
  description:
    "Build paddle power, faster pop-ups, and healthier shoulders with our surf-specific workout program. Dumbbell-only training designed for surfers who want functional strength without bulk. $79 one-time.",
  keywords: [
    "surf workout",
    "surfing workout program",
    "surf training",
    "surf fitness",
    "surfer workout",
    "surf strength training",
    "paddle power workout",
    "pop up training",
    "shoulder exercises for surfers",
    "surf conditioning",
    "surf exercise program",
    "workout for surfers",
    "surfing fitness program",
    "functional training for surfing",
    "surf athlete training",
    "home workout for surfers",
    "dumbbell workout for surfing",
    "surf mobility",
    "surfer strength",
    "ocean athlete training",
  ],
  authors: [{ name: "Surf Strength" }],
  creator: "Surf Strength",
  publisher: "Surf Strength",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://surfstrength.com/landing",
    siteName: "Surf Strength",
    title: "Surf Workout Program | Train for Surfing, Not the Gym",
    description:
      "A 4-week surf-specific strength, mobility, and shoulder-health program. Paddle longer, pop up faster, stay injury-free — without getting bulky. Dumbbells only.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Surf Strength - 4-Week Surf Workout Program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Surf Workout Program | 4-Week Training for Surfers",
    description:
      "Build paddle power, faster pop-ups, and healthier shoulders. Surf-specific strength training with dumbbells only. $79 one-time purchase.",
    images: ["/og-image.jpg"],
    creator: "@surfstrength",
  },
  alternates: {
    canonical: "https://surfstrength.com/landing",
  },
  category: "Fitness",
  classification: "Sports Training Program",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "Surf Strength - 4-Week Surf Workout Program",
      description:
        "A surf-first strength, mobility, and shoulder-health program built to make you paddle longer, pop up faster, and stay injury-free without getting bulky.",
      image: "https://surfstrength.com/og-image.jpg",
      brand: {
        "@type": "Brand",
        name: "Surf Strength",
      },
      offers: {
        "@type": "Offer",
        price: "79.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        priceValidUntil: "2025-12-31",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "127",
      },
    },
    {
      "@type": "WebPage",
      name: "Surf Workout Program | Surf Strength",
      description:
        "4-week surf-specific strength training program for surfers who want functional strength without bulk.",
      url: "https://surfstrength.com/landing",
    },
    {
      "@type": "Organization",
      name: "Surf Strength",
      url: "https://surfstrength.com",
      logo: "https://surfstrength.com/logo.png",
      sameAs: [
        "https://instagram.com/surfstrength",
        "https://twitter.com/surfstrength",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Will this surf workout program make me bulky?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The program is specifically designed to improve strength without adding unnecessary mass. You'll get stronger and more functional, not bigger.",
          },
        },
        {
          "@type": "Question",
          name: "Can I repeat the surf training program?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — it's built to be cycled again and again, with small, sustainable progressions. Many surfers run this year-round.",
          },
        },
        {
          "@type": "Question",
          name: "What equipment do I need for this surfer workout?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No gym required. Dumbbells or kettlebells are enough. Perfect for home workouts, garage gyms, or training while traveling.",
          },
        },
        {
          "@type": "Question",
          name: "How long are the surf workout sessions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Each session is 40-50 minutes including warm-up and mobility work. No wasted time, no fluff.",
          },
        },
      ],
    },
  ],
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
