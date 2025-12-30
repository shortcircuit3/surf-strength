import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
  tags: string[];
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image?: string;
  tags: string[];
}

/**
 * Get all blog post slugs for static generation
 */
export function getAllPostSlugs(): string[] {
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

/**
 * Get metadata for all blog posts (for listing page)
 */
export function getAllPosts(): BlogPostMeta[] {
  const slugs = getAllPostSlugs();
  const posts = slugs.map((slug) => {
    const filePath = getPostFilePath(slug);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || "Untitled",
      description: data.description || "",
      date: data.date || "",
      author: data.author || "Surf Strength Team",
      image: data.image,
      tags: data.tags || [],
    };
  });

  // Sort by date (newest first)
  return posts.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = getPostFilePath(slug);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || "Untitled",
    description: data.description || "",
    date: data.date || "",
    author: data.author || "Surf Strength Team",
    image: data.image,
    tags: data.tags || [],
    content,
  };
}

/**
 * Get posts filtered by tag
 */
export function getPostsByTag(tag: string): BlogPostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

/**
 * Get all unique tags from all posts
 */
export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tagSet = new Set<string>();

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag.toLowerCase()));
  });

  return Array.from(tagSet).sort();
}

/**
 * Helper to get the file path for a post
 */
function getPostFilePath(slug: string): string {
  // Try .mdx first, then .md
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);

  if (fs.existsSync(mdxPath)) {
    return mdxPath;
  }
  return mdPath;
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
