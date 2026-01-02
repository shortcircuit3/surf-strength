import Link from "next/link";
import { Metadata } from "next";
import { getAllPosts, formatDate } from "@/lib/blog";
import Navigation from "@/app/components/Navigation";

export const metadata: Metadata = {
  title: "Surf Training Blog | Surf Strength",
  description:
    "Expert articles on surf fitness, strength training for surfers, injury prevention, and how to improve your performance in the water.",
  openGraph: {
    title: "Surf Training Blog | Surf Strength",
    description:
      "Expert articles on surf fitness, strength training for surfers, injury prevention, and how to improve your performance in the water.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navigation currentPage="blog" />

      {/* Header */}
      <header className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 landing-hero-bg" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, var(--ocean-mid) 0%, transparent 50%)`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1
            className="text-5xl md:text-7xl font-bold text-text-primary mb-4"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            SURF TRAINING <span className="text-gradient">BLOG</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl">
            Expert insights on building surf-specific strength, preventing
            injuries, and improving your performance in the water.
          </p>
        </div>
      </header>

      {/* Posts Grid */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-8">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="group opacity-0 animate-fade-in"
              style={{
                animationDelay: `${0.1 + index * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="landing-card hover:border-accent-primary/30 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-1">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs font-medium rounded-full bg-ocean-mid/20 text-ocean-light"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl font-bold text-text-primary group-hover:text-accent-primary transition-colors mb-3">
                        {post.title}
                      </h2>

                      {/* Description */}
                      <p className="text-text-secondary mb-4 line-clamp-2">
                        {post.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-text-muted">
                        <span>{formatDate(post.date)}</span>
                        <span>•</span>
                        <span>{post.author}</span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-bg-secondary border border-border group-hover:border-accent-primary group-hover:bg-accent-primary/10 transition-all">
                      <span className="text-text-muted group-hover:text-accent-primary transition-colors">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-secondary text-lg">
              No posts yet. Check back soon!
            </p>
          </div>
        )}
      </main>

      {/* CTA Section */}
      <section className="py-16 bg-bg-secondary border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            READY TO START TRAINING?
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            Put these concepts into practice with our complete 4-week surf
            strength program.
          </p>
          <Link
            href="/"
            className="landing-btn-primary inline-flex items-center gap-2"
          >
            View the Program
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-bg-primary border-t border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl">🏄</span>
              <span
                className="text-lg text-text-primary tracking-wider"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                SURF STRENGTH
              </span>
            </Link>
            <p className="text-text-muted text-sm">
              Built for surfers, by surfers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
