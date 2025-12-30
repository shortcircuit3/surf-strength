import Link from "next/link";

// Animated wave SVG component
function WaveDecoration({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
      role="presentation"
    >
      <path
        d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Feature card component
function FeatureCard({
  icon,
  title,
  items,
  index,
}: {
  icon: string;
  title: string;
  items: string[];
  index: number;
}) {
  return (
    <article
      className="landing-card group opacity-0 animate-fade-in"
      style={{
        animationDelay: `${0.1 + index * 0.1}s`,
        animationFillMode: "forwards",
      }}
    >
      <div
        className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300"
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-text-primary mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-text-secondary text-sm flex items-start gap-2"
          >
            <span className="text-accent-primary mt-0.5" aria-hidden="true">
              →
            </span>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

// Data arrays for cleaner JSX
const trustBadges = [
  { icon: "🏄", text: "Surf-specific movements" },
  { icon: "🦴", text: "Shoulder-safe by design" },
  { icon: "💪", text: "Dumbbells only" },
  { icon: "⏱", text: "40–50 min sessions" },
];

const problems = [
  { icon: "🦵", text: "Heavy legs that feel dead in the water" },
  { icon: "🤕", text: "Tight shoulders and cranky elbows" },
  { icon: "🏋️", text: "Strength that doesn't translate to the board" },
  { icon: "😫", text: "Programs that leave you sore instead of surf-ready" },
];

const surfDemands = [
  { icon: "🌊", label: "Long Paddles" },
  { icon: "⚡", label: "Explosive Pop-ups" },
  { icon: "🔄", label: "Rotational Power" },
  { icon: "🎯", label: "Unstable Positions" },
  { icon: "💪", label: "High Shoulder Volume" },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const workoutDays = [0, 1, 3, 4];

const sessionIncludes = [
  "Strength that supports paddling and pop-ups",
  "Built-in mobility and shoulder health",
  "Clear progression without chasing heavier weights",
];

const features = [
  {
    icon: "🌊",
    title: "Surf-Specific Strength",
    items: [
      "Horizontal pulling for paddling endurance",
      "Unilateral work for balance and control",
      "Power without bulk",
    ],
  },
  {
    icon: "🦴",
    title: "Built-In Shoulder Health",
    items: [
      "Scapular control",
      "Smart pressing angles",
      "Carries and mobility baked in",
    ],
  },
  {
    icon: "🎒",
    title: "Minimal Equipment",
    items: [
      "Dumbbells or kettlebells",
      "No machines needed",
      "Perfect for home or travel",
    ],
  },
  {
    icon: "📈",
    title: "Progress Without Bulk",
    items: [
      "Rep, tempo, and density progression",
      "No maxing out",
      "No hypertrophy chasing",
    ],
  },
];

const yesReasons = [
  "Surf 2–6x per week",
  "Want to feel lighter and faster in the water",
  "Care about shoulder longevity",
  "Train at home or while traveling",
];

const noReasons = [
  "Your main goal is bodybuilding",
  "You want to max out lifts",
  "You enjoy high-volume pump workouts",
];

const results = [
  { icon: "🚀", text: "Easier paddling on long sessions" },
  { icon: "⚡", text: "Faster, cleaner pop-ups" },
  { icon: "🎯", text: "Better balance when the board gets unstable" },
  { icon: "🦴", text: "Less shoulder tightness" },
  { icon: "💪", text: "Strength that feels useful, not heavy" },
];

const appFeatures = [
  "Guided workouts with clear sets, reps, tempo",
  "Exercise visuals and demonstrations",
  "Mobility flows included",
  "Repeatable 4-week cycles",
  "Progress tracking",
];

const mockExercises = [
  { name: "DB Floor Press", sets: "3×8", done: true },
  { name: "Single Arm Row", sets: "3×10/side", done: true },
  { name: "Half-Kneeling Press", sets: "3×8/side", done: false },
  { name: "Farmer Carry", sets: "3×40m", done: false },
];

const pricingIncludes = [
  "Full 4-week surf-strength program",
  "Built-in mobility & shoulder health",
  "Progression guidance",
  "Exercise demonstrations",
  "Repeatable cycles forever",
];

const faqs = [
  {
    q: "Will this make me bulky?",
    a: "No. The program is specifically designed to improve strength without adding unnecessary mass. You'll get stronger and more functional, not bigger.",
  },
  {
    q: "Can I repeat the program?",
    a: "Yes — it's built to be cycled again and again, with small, sustainable progressions. Many surfers run this year-round.",
  },
  {
    q: "What if I surf a lot one week?",
    a: "The volume is flexible. You'll learn how to adjust sessions around swell. The app tracks your progress so you can pick up where you left off.",
  },
  {
    q: "Do I need a gym?",
    a: "No. Dumbbells or kettlebells are enough. Perfect for home workouts, garage gyms, or training while traveling.",
  },
  {
    q: "How long are the workouts?",
    a: "Each session is 40-50 minutes including warm-up and mobility work. No wasted time, no fluff.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-primary overflow-x-hidden">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-accent-primary focus:text-bg-primary focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Floating navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto">
          <div className="landing-nav flex items-center justify-between px-6 py-3">
            <a
              href="#"
              className="flex items-center gap-2"
              aria-label="Surf Strength - Home"
            >
              <span className="text-2xl" aria-hidden="true">
                🏄
              </span>
              <span
                className="text-xl text-text-primary tracking-wider"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                SURF STRENGTH
              </span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#how-it-works"
                className="text-text-secondary hover:text-text-primary transition-colors text-sm"
              >
                How It Works
              </a>
              <a
                href="#features"
                className="text-text-secondary hover:text-text-primary transition-colors text-sm"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-text-secondary hover:text-text-primary transition-colors text-sm"
              >
                Pricing
              </a>
            </div>
            <a
              href="#pricing"
              className="landing-btn-secondary text-sm px-4 py-2"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 landing-hero-bg" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, var(--ocean-mid) 0%, transparent 50%),
                             radial-gradient(circle at 70% 60%, var(--accent-primary) 0%, transparent 40%)`,
          }}
        />

        {/* Floating particles */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-accent-primary/20 floating-particle"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-card/80 border border-border mb-8 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            <span
              className="w-2 h-2 rounded-full bg-success animate-pulse"
              aria-hidden="true"
            />
            <span className="text-text-secondary text-sm">
              Designed for surfers who train smart
            </span>
          </div>

          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-text-primary mb-6 leading-none opacity-0 animate-fade-in"
            style={{
              fontFamily: "var(--font-bebas)",
              animationDelay: "0.3s",
              animationFillMode: "forwards",
            }}
          >
            <span className="sr-only">
              Surf Workout Program: 4-Week Strength Training for Surfers -
            </span>
            TRAIN FOR <span className="text-gradient">SURFING</span>
            <br />
            NOT THE GYM
          </h1>

          <p
            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-10 opacity-0 animate-fade-in leading-relaxed"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            A surf-first strength, mobility, and shoulder-health program built
            to make you{" "}
            <span className="text-text-primary font-medium">paddle longer</span>
            ,{" "}
            <span className="text-text-primary font-medium">pop up faster</span>
            , and{" "}
            <span className="text-text-primary font-medium">
              stay injury-free
            </span>{" "}
            —{" "}
            <span className="text-accent-primary font-semibold">
              without getting bulky
            </span>
            .
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in"
            style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
          >
            <a
              href="#pricing"
              className="landing-btn-primary text-lg px-8 py-4"
              aria-label="Start your 4-week surf workout cycle - view pricing"
            >
              Start Your 4-Week Cycle
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </a>
            <a
              href="#how-it-works"
              className="landing-btn-ghost text-lg px-8 py-4"
              aria-label="Learn how the surf workout program works"
            >
              See How It Works
            </a>
          </div>

          {/* Trust badges */}
          <div
            className="mt-16 flex flex-wrap justify-center gap-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
          >
            {trustBadges.map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-card/50 border border-border/50"
              >
                <span className="text-xl" aria-hidden="true">
                  {badge.icon}
                </span>
                <span className="text-text-secondary text-sm">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in"
          style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2 text-text-muted">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-text-muted/30 flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-text-muted/50 rounded-full animate-bounce" />
            </div>
          </div>
        </div>

        <WaveDecoration className="absolute bottom-0 left-0 right-0 h-24 text-bg-secondary" />
      </header>

      <main id="main-content">
        {/* Social Proof Strip */}
        <div className="bg-bg-secondary py-8 border-y border-border">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-center text-xl text-text-secondary italic">
              &ldquo;Designed for surfers who want to stay{" "}
              <span className="text-text-primary font-medium">light</span>,{" "}
              <span className="text-text-primary font-medium">mobile</span>, and{" "}
              <span className="text-text-primary font-medium">powerful</span> —
              in and out of the water.&rdquo;
            </p>
          </div>
        </div>

        {/* Problem Section */}
        <section
          className="py-24 bg-bg-secondary relative"
          aria-labelledby="problem-heading"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-accent-primary text-sm font-semibold uppercase tracking-wider">
                  The Problem
                </span>
                <h2
                  id="problem-heading"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-4 mb-6"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  MOST STRENGTH PROGRAMS
                  <br />
                  <span className="text-gradient">
                    WORK AGAINST YOUR SURFING
                  </span>
                </h2>
                <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                  Traditional gym programs are built for size and symmetry — not
                  paddling endurance, balance, or shoulder longevity. Surfers
                  run into the same problems over and over.
                </p>
              </div>
              <div className="space-y-4">
                {problems.map((problem, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl bg-bg-card border border-border hover:border-red-500/30 transition-colors group"
                  >
                    <span
                      className="text-2xl group-hover:scale-110 transition-transform"
                      aria-hidden="true"
                    >
                      {problem.icon}
                    </span>
                    <span className="text-text-secondary group-hover:text-text-primary transition-colors">
                      {problem.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-16 text-center">
              <p className="text-2xl md:text-3xl text-text-primary font-medium">
                You don&apos;t need more muscle.
                <br />
                <span className="text-gradient font-bold">
                  You need the right strength.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section
          className="py-24 bg-bg-primary relative overflow-hidden"
          aria-labelledby="solution-heading"
        >
          <div className="absolute inset-0 opacity-20" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 80% 20%, var(--ocean-mid) 0%, transparent 50%)`,
              }}
            />
          </div>
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="text-accent-primary text-sm font-semibold uppercase tracking-wider">
                The Solution
              </span>
              <h2
                id="solution-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-4 mb-6"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                BUILT AROUND HOW SURFERS
                <br />
                <span className="text-gradient">ACTUALLY MOVE</span>
              </h2>
              <p className="text-text-secondary text-lg max-w-3xl mx-auto leading-relaxed">
                This program was designed around the real demands of surfing —
                every exercise earns its place based on carryover to the water,
                not gym aesthetics.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {surfDemands.map((demand, i) => (
                <div
                  key={i}
                  className="text-center p-6 rounded-2xl bg-bg-card/50 border border-border hover:border-ocean-light/50 transition-all hover:scale-105 group"
                >
                  <span
                    className="text-4xl block mb-3 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  >
                    {demand.icon}
                  </span>
                  <span className="text-text-secondary text-sm group-hover:text-text-primary transition-colors">
                    {demand.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-24 bg-bg-secondary relative"
          aria-labelledby="how-it-works-heading"
        >
          <WaveDecoration className="absolute top-0 left-0 right-0 h-24 text-bg-primary rotate-180" />
          <div className="max-w-6xl mx-auto px-6 pt-12">
            <div className="text-center mb-16">
              <span className="text-accent-primary text-sm font-semibold uppercase tracking-wider">
                How It Works
              </span>
              <h2
                id="how-it-works-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-4 mb-6"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                SIMPLE STRUCTURE
                <br />
                <span className="text-gradient">SMART PROGRESSION</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Schedule */}
              <div className="landing-card">
                <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">
                    📅
                  </span>
                  4 Workouts Per Week
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {weekDays.map((day, i) => {
                    const isWorkoutDay = workoutDays.includes(i);
                    return (
                      <div
                        key={day}
                        className={`text-center py-4 rounded-lg transition-all ${
                          isWorkoutDay
                            ? "bg-accent-primary/20 border border-accent-primary/40"
                            : "bg-bg-primary/50 border border-border"
                        }`}
                      >
                        <span
                          className={`text-xs uppercase tracking-wider ${
                            isWorkoutDay
                              ? "text-accent-primary"
                              : "text-text-muted"
                          }`}
                        >
                          {day}
                        </span>
                        <div className="mt-2" aria-hidden="true">
                          {isWorkoutDay ? (
                            <span className="text-lg">💪</span>
                          ) : (
                            <span className="text-lg opacity-30">🌊</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Session includes */}
              <div className="landing-card">
                <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">
                    ✨
                  </span>
                  Each Session Includes
                </h3>
                <ul className="space-y-4">
                  {sessionIncludes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="w-6 h-6 rounded-full bg-ocean-mid/30 flex items-center justify-center shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        <span className="text-ocean-light text-sm">✓</span>
                      </span>
                      <span className="text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-text-primary font-semibold">
                    No guesswork. No junk volume.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-24 bg-bg-primary relative"
          aria-labelledby="features-heading"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-accent-primary text-sm font-semibold uppercase tracking-wider">
                Features
              </span>
              <h2
                id="features-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-4"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                EVERYTHING YOU NEED
                <br />
                <span className="text-gradient">NOTHING YOU DON&apos;T</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <FeatureCard
                  key={i}
                  icon={feature.icon}
                  title={feature.title}
                  items={feature.items}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Who It's For Section */}
        <section
          className="py-24 bg-bg-secondary relative overflow-hidden"
          aria-labelledby="who-its-for-heading"
        >
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 80%, var(--accent-primary) 0%, transparent 40%)`,
              }}
            />
          </div>
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="text-accent-primary text-sm font-semibold uppercase tracking-wider">
                Is This For You?
              </span>
              <h2
                id="who-its-for-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-4"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                IS THIS PROGRAM
                <br />
                <span className="text-gradient">RIGHT FOR YOU?</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Yes */}
              <div className="landing-card border-success/30 hover:border-success/50">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="text-success text-xl">✓</span>
                  </span>
                  <h3 className="text-xl font-bold text-success">
                    Yes, if you:
                  </h3>
                </div>
                <ul className="space-y-3">
                  {yesReasons.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-text-secondary"
                    >
                      <span className="text-success" aria-hidden="true">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* No */}
              <div className="landing-card border-red-500/30 hover:border-red-500/50">
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="text-red-400 text-xl">✕</span>
                  </span>
                  <h3 className="text-xl font-bold text-red-400">
                    Not for you if:
                  </h3>
                </div>
                <ul className="space-y-3">
                  {noReasons.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-text-secondary"
                    >
                      <span className="text-red-400" aria-hidden="true">
                        ✕
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section
          className="py-24 bg-bg-primary relative"
          aria-labelledby="results-heading"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-accent-primary text-sm font-semibold uppercase tracking-wider">
                Results
              </span>
              <h2
                id="results-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-4"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                WHAT YOU&apos;LL NOTICE
                <br />
                <span className="text-gradient">AFTER A FEW WEEKS</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {results.map((result, i) => (
                <div
                  key={i}
                  className="text-center p-6 rounded-2xl bg-bg-card border border-border hover:border-accent-primary/30 transition-all hover:-translate-y-1 group"
                >
                  <span
                    className="text-4xl block mb-4 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  >
                    {result.icon}
                  </span>
                  <span className="text-text-secondary text-sm leading-relaxed">
                    {result.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* App Preview Section */}
        <section
          className="py-24 bg-bg-secondary relative overflow-hidden"
          aria-labelledby="app-heading"
        >
          <WaveDecoration className="absolute top-0 left-0 right-0 h-24 text-bg-primary rotate-180" />
          <div className="max-w-6xl mx-auto px-6 pt-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-accent-primary text-sm font-semibold uppercase tracking-wider">
                  The App
                </span>
                <h2
                  id="app-heading"
                  className="text-4xl md:text-5xl font-bold text-text-primary mt-4 mb-6"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  EVERYTHING YOU NEED
                  <br />
                  <span className="text-gradient">RIGHT IN THE APP</span>
                </h2>
                <ul className="space-y-4 mb-8">
                  {appFeatures.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span
                        className="w-6 h-6 rounded-full bg-accent-primary/20 flex items-center justify-center shrink-0"
                        aria-hidden="true"
                      >
                        <span className="text-accent-primary text-sm">✓</span>
                      </span>
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-text-primary font-semibold text-lg">
                  No spreadsheets. No thinking.
                </p>
              </div>
              <div className="relative">
                {/* App mockup */}
                <div className="relative mx-auto max-w-sm">
                  <div
                    className="absolute -inset-4 bg-linear-to-r from-ocean-light/20 to-accent-primary/20 rounded-3xl blur-xl"
                    aria-hidden="true"
                  />
                  <div className="relative bg-bg-card rounded-3xl border border-border p-6 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-2xl" aria-hidden="true">
                        🏄
                      </span>
                      <span className="text-text-muted text-sm">
                        Week 1 • Day 1
                      </span>
                    </div>
                    <h4
                      className="text-xl font-bold text-text-primary mb-4"
                      style={{ fontFamily: "var(--font-bebas)" }}
                    >
                      UPPER BODY STRENGTH
                    </h4>
                    <div className="space-y-3">
                      {mockExercises.map((exercise, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            exercise.done
                              ? "bg-success/10 border border-success/30"
                              : "bg-bg-primary border border-border"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-md flex items-center justify-center ${
                                exercise.done
                                  ? "bg-success"
                                  : "border border-border"
                              }`}
                              aria-hidden="true"
                            >
                              {exercise.done && (
                                <span className="text-white text-xs">✓</span>
                              )}
                            </div>
                            <span
                              className={
                                exercise.done
                                  ? "text-text-muted"
                                  : "text-text-primary"
                              }
                            >
                              {exercise.name}
                            </span>
                          </div>
                          <span className="text-text-muted text-sm">
                            {exercise.sets}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-border">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">Progress</span>
                        <span className="text-accent-primary font-medium">
                          50%
                        </span>
                      </div>
                      <div className="progress-bar mt-2">
                        <div
                          className="progress-fill"
                          style={{ width: "50%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="py-24 bg-bg-primary relative"
          aria-labelledby="pricing-heading"
        >
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-accent-primary text-sm font-semibold uppercase tracking-wider">
                Get Started
              </span>
              <h2
                id="pricing-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-4"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                START YOUR FIRST
                <br />
                <span className="text-gradient">4-WEEK CYCLE</span>
              </h2>
            </div>

            <div className="relative max-w-lg mx-auto">
              <div
                className="absolute -inset-4 bg-linear-to-r from-ocean-light/30 to-accent-primary/30 rounded-3xl blur-xl opacity-50"
                aria-hidden="true"
              />
              <div className="relative bg-bg-card rounded-3xl border border-accent-primary/50 p-8 md:p-12">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-accent-primary text-bg-primary text-sm font-bold">
                    ONE-TIME PURCHASE
                  </span>
                </div>

                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span
                      className="text-6xl md:text-7xl font-bold text-text-primary"
                      style={{ fontFamily: "var(--font-bebas)" }}
                    >
                      $79
                    </span>
                  </div>
                  <p className="text-text-muted">
                    Lifetime access • No subscription
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {pricingIncludes.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span
                        className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0"
                        aria-hidden="true"
                      >
                        <span className="text-success text-sm">✓</span>
                      </span>
                      <span className="text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/"
                  className="landing-btn-primary w-full text-lg py-4 flex items-center justify-center gap-2"
                >
                  Start Training for Surfing
                  <span aria-hidden="true">→</span>
                </Link>

                <p className="text-center text-text-muted text-sm mt-4">
                  Instant access • Works on all devices
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          className="py-24 bg-bg-secondary"
          aria-labelledby="faq-heading"
        >
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-accent-primary text-sm font-semibold uppercase tracking-wider">
                FAQ
              </span>
              <h2
                id="faq-heading"
                className="text-4xl md:text-5xl font-bold text-text-primary mt-4"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                COMMON QUESTIONS
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-bg-card rounded-xl border border-border hover:border-border-highlight transition-colors"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="text-text-primary font-medium pr-4">
                      {faq.q}
                    </span>
                    <span
                      className="text-accent-primary text-2xl group-open:rotate-45 transition-transform"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-text-secondary leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section
          className="py-24 bg-bg-primary relative overflow-hidden"
          aria-labelledby="final-cta-heading"
        >
          <div className="absolute inset-0" aria-hidden="true">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, var(--ocean-mid) 0%, transparent 60%)`,
              }}
            />
          </div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2
              id="final-cta-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              TRAIN SO SURFING FEELS
              <br />
              <span className="text-gradient">BETTER — NOT HARDER</span>
            </h2>
            <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
              Stronger paddles. Faster pop-ups. Healthier shoulders.
            </p>
            <Link
              href="/"
              className="landing-btn-primary text-xl px-10 py-5 inline-flex items-center gap-3"
            >
              Start Your 4-Week Surf Strength Cycle
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-bg-secondary border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">
                🏄
              </span>
              <span
                className="text-lg text-text-primary tracking-wider"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                SURF STRENGTH
              </span>
            </div>
            <p className="text-text-muted text-sm">
              Built for surfers, by surfers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
