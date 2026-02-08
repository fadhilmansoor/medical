import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(
  process.cwd(),
  "src/app/(blogs)/blog-details/posts"
);

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  cover: string;
  tags: string[];
  excerpt: string;
  comments?: number;
};

/**
 * Get all blog posts from markdown files
 */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(POSTS_DIR);
  const posts = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const filePath = path.join(POSTS_DIR, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      // Extract first paragraph as excerpt
      const excerpt =
        data.excerpt ||
        content
          .split("\n")
          .find((line) => line.trim().length > 0)
          ?.substring(0, 150) ||
        "";

      return {
        slug,
        title: data.title || "",
        date: data.date || "",
        author: data.author || "",
        cover: data.cover || "/assets/images/blog/default.jpg",
        tags: data.tags || [],
        excerpt,
        comments: data.comments || 0,
      };
    })
    .sort((a, b) => {
      // Sort by date (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return posts;
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: {
      title: data.title || "",
      date: data.date || "",
      author: data.author || "",
      cover: data.cover || "",
      tags: data.tags || [],
    },
    content,
  };
}