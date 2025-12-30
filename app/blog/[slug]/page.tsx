import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPostSlugs, getPostBySlug, formatDate } from "@/lib/blog";
import Navigation from "@/app/components/Navigation";
import { mdxComponents } from "@/app/components/MDXComponents";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Surf Strength Blog",
    };
  }

  return {
    title: `${post.title} | Surf Strength Blog`,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

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
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-8"
          >
            <span>←</span>
            <span>Back to Blog</span>
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium rounded-full bg-ocean-mid/20 text-ocean-light"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold text-text-primary mb-6 leading-tight"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-text-secondary">
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span>By {post.author}</span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <article className="prose prose-surf">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </article>
      </main>

      {/* Author/CTA Section */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="landing-card border-accent-primary/30">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Ready to start training?
              </h3>
              <p className="text-text-secondary">
                Our 4-week surf strength program puts these principles into
                practice with guided workouts, progression tracking, and
                built-in mobility work.
              </p>
            </div>
            <Link
              href="/landing"
              className="landing-btn-primary whitespace-nowrap"
            >
              View Program →
            </Link>
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      <section className="py-16 bg-bg-secondary border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <h2
            className="text-2xl font-bold text-text-primary mb-8"
            style={{ fontFamily: "var(--font-bebas)" }}
          >
            MORE FROM THE BLOG
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/blog"
              className="flex-1 text-center py-4 px-6 rounded-xl bg-bg-card border border-border hover:border-accent-primary/30 transition-colors"
            >
              <span className="text-text-secondary">View all articles →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-bg-primary border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/landing" className="flex items-center gap-2">
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

