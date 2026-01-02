import Link from "next/link";

interface NavigationProps {
  currentPage?: "landing" | "blog";
}

export default function Navigation({ currentPage }: NavigationProps) {
  const isLanding = currentPage === "landing";

  // Use anchor links on landing page, full URLs elsewhere
  const howItWorksHref = isLanding ? "#how-it-works" : "/#how-it-works";
  const featuresHref = isLanding ? "#features" : "/#features";
  const pricingHref = isLanding ? "#pricing" : "/#pricing";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto">
        <div className="landing-nav flex items-center justify-between px-6 py-3">
          <Link
            href="/"
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
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a
              href={howItWorksHref}
              className="text-text-secondary hover:text-text-primary transition-colors text-sm"
            >
              How It Works
            </a>
            <a
              href={featuresHref}
              className="text-text-secondary hover:text-text-primary transition-colors text-sm"
            >
              Features
            </a>
            <a
              href={pricingHref}
              className="text-text-secondary hover:text-text-primary transition-colors text-sm"
            >
              Pricing
            </a>
            <Link
              href="/blog"
              className={`transition-colors text-sm ${
                currentPage === "blog"
                  ? "text-accent-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Blog
            </Link>
          </div>
          <a
            href={pricingHref}
            className="landing-btn-secondary text-sm px-4 py-2"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
