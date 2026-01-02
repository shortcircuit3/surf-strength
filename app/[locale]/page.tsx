import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import CheckoutButton from "@/app/components/CheckoutButton";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

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

const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const workoutDays = [0, 1, 3, 4];

const mockExercises = [
  { name: "DB Floor Press", sets: "3×8", done: true },
  { name: "Single Arm Row", sets: "3×10/side", done: true },
  { name: "Half-Kneeling Press", sets: "3×8/side", done: false },
  { name: "Farmer Carry", sets: "3×40m", done: false },
];

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations();

  const trustBadges = [
    { icon: "🏄", text: t("trustBadges.surfSpecific") },
    { icon: "🦴", text: t("trustBadges.shoulderSafe") },
    { icon: "🎛️", text: t("trustBadges.customizable") },
    { icon: "⏱", text: t("trustBadges.sessionTime") },
  ];

  const problems = [
    { icon: "🦵", text: t("problem.problems.legs") },
    { icon: "🤕", text: t("problem.problems.shoulders") },
    { icon: "🏋️", text: t("problem.problems.strength") },
    { icon: "😫", text: t("problem.problems.programs") },
  ];

  const surfDemands = [
    { icon: "🌊", label: t("solution.demands.longPaddles") },
    { icon: "⚡", label: t("solution.demands.explosivePopups") },
    { icon: "🔄", label: t("solution.demands.rotationalPower") },
    { icon: "🎯", label: t("solution.demands.unstablePositions") },
    { icon: "💪", label: t("solution.demands.highShoulderVolume") },
  ];

  const sessionIncludes = [
    t("howItWorks.sessionIncludes.strength"),
    t("howItWorks.sessionIncludes.mobility"),
    t("howItWorks.sessionIncludes.progression"),
  ];

  const features = [
    {
      icon: "🌊",
      title: t("features.surfSpecific.title"),
      items: [
        t("features.surfSpecific.items.horizontal"),
        t("features.surfSpecific.items.unilateral"),
        t("features.surfSpecific.items.power"),
      ],
    },
    {
      icon: "🦴",
      title: t("features.shoulderHealth.title"),
      items: [
        t("features.shoulderHealth.items.scapular"),
        t("features.shoulderHealth.items.pressing"),
        t("features.shoulderHealth.items.carries"),
      ],
    },
    {
      icon: "🎛️",
      title: t("features.adapts.title"),
      items: [
        t("features.adapts.items.customize"),
        t("features.adapts.items.works"),
        t("features.adapts.items.autoSubs"),
      ],
    },
    {
      icon: "📈",
      title: t("features.progress.title"),
      items: [
        t("features.progress.items.rep"),
        t("features.progress.items.noMax"),
        t("features.progress.items.noHypertrophy"),
      ],
    },
  ];

  const equipmentOptions = [
    {
      icon: "🏋️",
      name: t("equipment.options.dumbbells"),
      desc: t("equipment.options.dumbellsDesc"),
    },
    {
      icon: "🔔",
      name: t("equipment.options.kettlebell"),
      desc: t("equipment.options.kettlebellDesc"),
    },
    {
      icon: "🎯",
      name: t("equipment.options.pullupBar"),
      desc: t("equipment.options.pullupBarDesc"),
    },
    {
      icon: "🪢",
      name: t("equipment.options.bands"),
      desc: t("equipment.options.bandsDesc"),
    },
    {
      icon: "🤸",
      name: t("equipment.options.bodyweight"),
      desc: t("equipment.options.bodyweightDesc"),
    },
  ];

  const yesReasons = [
    t("whoItsFor.yes.surf"),
    t("whoItsFor.yes.feel"),
    t("whoItsFor.yes.shoulder"),
    t("whoItsFor.yes.train"),
  ];

  const noReasons = [
    t("whoItsFor.no.bodybuilding"),
    t("whoItsFor.no.maxLifts"),
    t("whoItsFor.no.pump"),
  ];

  const results = [
    { icon: "🚀", text: t("results.items.paddling") },
    { icon: "⚡", text: t("results.items.popups") },
    { icon: "🎯", text: t("results.items.balance") },
    { icon: "🦴", text: t("results.items.tightness") },
    { icon: "💪", text: t("results.items.strength") },
  ];

  const appFeatures = [
    t("app.features.customize"),
    t("app.features.guided"),
    t("app.features.visuals"),
    t("app.features.mobility"),
    t("app.features.repeatable"),
    t("app.features.tracking"),
  ];

  const pricingIncludes = [
    t("pricing.includes.program"),
    t("pricing.includes.customize"),
    t("pricing.includes.mobility"),
    t("pricing.includes.progression"),
    t("pricing.includes.demos"),
    t("pricing.includes.cycles"),
  ];

  const faqs = [
    {
      q: t("faq.questions.equipment.q"),
      a: t("faq.questions.equipment.a"),
    },
    {
      q: t("faq.questions.bulky.q"),
      a: t("faq.questions.bulky.a"),
    },
    {
      q: t("faq.questions.repeat.q"),
      a: t("faq.questions.repeat.a"),
    },
    {
      q: t("faq.questions.surfVolume.q"),
      a: t("faq.questions.surfVolume.a"),
    },
    {
      q: t("faq.questions.gym.q"),
      a: t("faq.questions.gym.a"),
    },
    {
      q: t("faq.questions.duration.q"),
      a: t("faq.questions.duration.a"),
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary overflow-x-hidden">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-accent-primary focus:text-bg-primary focus:rounded-lg focus:font-semibold"
      >
        {t("common.skipToContent")}
      </a>

      {/* Simple Header for Landing */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏄</span>
            <span
              className="text-xl text-text-primary tracking-wider"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              {t("nav.brand")}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="text-text-secondary hover:text-text-primary transition-colors text-sm"
            >
              {t("nav.blog")}
            </Link>
            <Link
              href="/workouts"
              className="text-text-secondary hover:text-text-primary transition-colors text-sm"
            >
              {t("nav.login")}
            </Link>
            <LanguageSwitcher />
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
              {t("hero.badge")}
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
            <span className="sr-only">{t("hero.srTitle")}</span>
            {t("hero.title1")} <span className="text-gradient">{t("hero.titleHighlight")}</span>
            <br />
            {t("hero.title2")}
          </h1>

          <p
            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-10 opacity-0 animate-fade-in leading-relaxed"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            {t("hero.description")}{" "}
            <span className="text-text-primary font-medium">{t("hero.paddleLonger")}</span>
            ,{" "}
            <span className="text-text-primary font-medium">{t("hero.popUpFaster")}</span>
            , and{" "}
            <span className="text-text-primary font-medium">
              {t("hero.stayInjuryFree")}
            </span>{" "}
            —{" "}
            <span className="text-accent-primary font-semibold">
              {t("hero.withoutBulky")}
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
              aria-label={t("hero.ctaPrimary")}
            >
              {t("hero.ctaPrimary")}
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </a>
            <a
              href="#how-it-works"
              className="landing-btn-ghost text-lg px-8 py-4"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>

          {/* Trust badges */}
          <div
            className="mt-12 md:mt-16 pb-8 md:pb-0 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 opacity-0 animate-fade-in"
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
                <span className="text-text-secondary text-sm whitespace-nowrap">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator - hidden on mobile */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in hidden md:block"
          style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2 text-text-muted">
            <span className="text-xs uppercase tracking-widest">{t("hero.scroll")}</span>
            <div className="w-6 h-10 rounded-full border-2 border-text-muted/30 flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-text-muted/50 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </header>

      <main id="main-content">
        {/* Social Proof Strip */}
        <div className="bg-bg-secondary py-8 border-y border-border">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-center text-xl text-text-secondary italic">
              &ldquo;Designed for surfers who want to stay{" "}
              <span className="text-text-primary font-medium">{t("socialProof.light")}</span>,{" "}
              <span className="text-text-primary font-medium">{t("socialProof.mobile")}</span>, and{" "}
              <span className="text-text-primary font-medium">{t("socialProof.powerful")}</span> —
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
                  {t("problem.label")}
                </span>
                <h2
                  id="problem-heading"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-4 mb-6"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  {t("problem.title1")}
                  <br />
                  <span className="text-gradient">
                    {t("problem.title2")}
                  </span>
                </h2>
                <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                  {t("problem.description")}
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
                {t("problem.conclusion")}
                <br />
                <span className="text-gradient font-bold">
                  {t("problem.solution")}
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
                {t("solution.label")}
              </span>
              <h2
                id="solution-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-4 mb-6"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {t("solution.title1")}
                <br />
                <span className="text-gradient">{t("solution.title2")}</span>
              </h2>
              <p className="text-text-secondary text-lg max-w-3xl mx-auto leading-relaxed">
                {t("solution.description")}
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
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-accent-primary text-sm font-semibold uppercase tracking-wider">
                {t("howItWorks.label")}
              </span>
              <h2
                id="how-it-works-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-4 mb-6"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {t("howItWorks.title1")}
                <br />
                <span className="text-gradient">{t("howItWorks.title2")}</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Schedule */}
              <div className="landing-card">
                <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">
                    📅
                  </span>
                  {t("howItWorks.workoutsPerWeek")}
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
                          {t(`howItWorks.days.${day}`)}
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
                  {t("howItWorks.eachSession")}
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
                    {t("howItWorks.noGuesswork")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment Customization Section */}
        <section
          className="py-24 bg-bg-primary relative overflow-hidden"
          aria-labelledby="equipment-heading"
        >
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 70% 30%, var(--ocean-mid) 0%, transparent 50%),
                                 radial-gradient(circle at 30% 70%, var(--accent-primary) 0%, transparent 40%)`,
              }}
            />
          </div>
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-accent-primary text-sm font-semibold uppercase tracking-wider">
                  {t("equipment.label")}
                </span>
                <h2
                  id="equipment-heading"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-4 mb-6"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  {t("equipment.title1")}
                  <br />
                  <span className="text-gradient">{t("equipment.title2")}</span>
                </h2>
                <p className="text-text-secondary text-lg mb-6 leading-relaxed">
                  {t("equipment.description")}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      <span className="text-success text-sm">✓</span>
                    </span>
                    <span className="text-text-secondary">
                      <span className="text-text-primary font-medium">
                        {t("equipment.features.smartSubstitutions")}
                      </span>{" "}
                      — {t("equipment.features.smartSubstitutionsDesc")}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      <span className="text-success text-sm">✓</span>
                    </span>
                    <span className="text-text-secondary">
                      <span className="text-text-primary font-medium">
                        {t("equipment.features.sameResults")}
                      </span>{" "}
                      — {t("equipment.features.sameResultsDesc")}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      <span className="text-success text-sm">✓</span>
                    </span>
                    <span className="text-text-secondary">
                      <span className="text-text-primary font-medium">
                        {t("equipment.features.changeAnytime")}
                      </span>{" "}
                      — {t("equipment.features.changeAnytimeDesc")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative">
                {/* Equipment selector mockup */}
                <div className="relative mx-auto max-w-md">
                  <div
                    className="absolute -inset-4 bg-linear-to-r from-ocean-light/20 to-accent-primary/20 rounded-3xl blur-xl"
                    aria-hidden="true"
                  />
                  <div className="relative bg-bg-card rounded-3xl border border-border p-6 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <h4
                        className="text-xl font-bold text-text-primary"
                        style={{ fontFamily: "var(--font-bebas)" }}
                      >
                        {t("equipment.yourEquipment")}
                      </h4>
                      <span className="text-text-muted text-sm">{t("equipment.settings")}</span>
                    </div>
                    <div className="space-y-3">
                      {equipmentOptions.map((eq, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                            i < 3
                              ? "bg-success/10 border border-success/30"
                              : "bg-bg-primary/50 border border-border hover:border-border-highlight"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl" aria-hidden="true">
                              {eq.icon}
                            </span>
                            <div>
                              <span
                                className={`font-medium ${
                                  i < 3
                                    ? "text-text-primary"
                                    : "text-text-secondary"
                                }`}
                              >
                                {eq.name}
                              </span>
                              <p className="text-text-muted text-xs">
                                {eq.desc}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`w-10 h-6 rounded-full relative transition-colors ${
                              i < 3 ? "bg-success" : "bg-border"
                            }`}
                            aria-hidden="true"
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                                i < 3 ? "right-1" : "left-1"
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-border">
                      <p className="text-text-muted text-sm text-center">
                        {t("equipment.adaptNote")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-24 bg-bg-secondary relative"
          aria-labelledby="features-heading"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-accent-primary text-sm font-semibold uppercase tracking-wider">
                {t("features.label")}
              </span>
              <h2
                id="features-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-4"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {t("features.title1")}
                <br />
                <span className="text-gradient">{t("features.title2")}</span>
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
                {t("whoItsFor.label")}
              </span>
              <h2
                id="who-its-for-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-4"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {t("whoItsFor.title1")}
                <br />
                <span className="text-gradient">{t("whoItsFor.title2")}</span>
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
                    {t("whoItsFor.yesTitle")}
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
                    {t("whoItsFor.noTitle")}
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
                {t("results.label")}
              </span>
              <h2
                id="results-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-4"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {t("results.title1")}
                <br />
                <span className="text-gradient">{t("results.title2")}</span>
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
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-accent-primary text-sm font-semibold uppercase tracking-wider">
                  {t("app.label")}
                </span>
                <h2
                  id="app-heading"
                  className="text-4xl md:text-5xl font-bold text-text-primary mt-4 mb-6"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  {t("app.title1")}
                  <br />
                  <span className="text-gradient">{t("app.title2")}</span>
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
                  {t("app.noSpreadsheets")}
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
                        {t("app.weekDay")}
                      </span>
                    </div>
                    <h4
                      className="text-xl font-bold text-text-primary mb-4"
                      style={{ fontFamily: "var(--font-bebas)" }}
                    >
                      {t("app.upperBody")}
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
                        <span className="text-text-muted">{t("app.progress")}</span>
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
                {t("pricing.label")}
              </span>
              <h2
                id="pricing-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-4"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {t("pricing.title1")}
                <br />
                <span className="text-gradient">{t("pricing.title2")}</span>
              </h2>
            </div>

            <div className="relative max-w-lg mx-auto">
              <div
                className="absolute -inset-4 bg-linear-to-r from-ocean-light/30 to-accent-primary/30 rounded-3xl blur-xl opacity-50"
                aria-hidden="true"
              />
              <div className="relative bg-bg-card rounded-3xl border border-accent-primary/50 p-8 md:p-12">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-accent-primary text-bg-primary text-sm font-bold whitespace-nowrap">
                    {t("pricing.badge")}
                  </span>
                </div>

                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span
                      className="text-6xl md:text-7xl font-bold text-text-primary"
                      style={{ fontFamily: "var(--font-bebas)" }}
                    >
                      {t("pricing.price")}
                    </span>
                  </div>
                  <p className="text-text-muted">
                    {t("pricing.lifetime")}
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

                <CheckoutButton className="landing-btn-primary w-full text-lg py-4 flex items-center justify-center gap-2">
                  {t("pricing.cta")}
                  <span aria-hidden="true">→</span>
                </CheckoutButton>

                <p className="text-center text-text-muted text-sm mt-4">
                  {t("pricing.instant")}
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
                {t("faq.label")}
              </span>
              <h2
                id="faq-heading"
                className="text-4xl md:text-5xl font-bold text-text-primary mt-4"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                {t("faq.title")}
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
                  <div className="px-6 py-6">
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
              {t("finalCta.title1")}
              <br />
              <span className="text-gradient">{t("finalCta.title2")}</span>
            </h2>
            <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
              {t("finalCta.description")}
            </p>
            <CheckoutButton className="landing-btn-primary text-xl px-10 py-5 inline-flex items-center gap-3">
              {t("finalCta.cta")}
              <span aria-hidden="true">→</span>
            </CheckoutButton>
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
                {t("nav.brand")}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/blog"
                className="text-text-muted hover:text-text-primary transition-colors text-sm"
              >
                {t("nav.blog")}
              </Link>
              <p className="text-text-muted text-sm">
                {t("footer.tagline")}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
