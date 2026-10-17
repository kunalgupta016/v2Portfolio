import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const blogsDirectory = path.join(process.cwd(), "content", "blogs");

function getPostMetadata(data, slug, content) {
  const requiredFields = ["title", "description", "excerpt", "date"];
  const missingFields = requiredFields.filter(
    (field) => typeof data[field] !== "string" || !data[field].trim()
  );

  if (missingFields.length) {
    throw new Error(
      `Blog "${slug}" is missing required frontmatter: ${missingFields.join(", ")}`
    );
  }

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: data.title,
    description: data.description,
    excerpt: data.excerpt,
    date: data.date,
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTime: Math.max(1, Math.ceil(wordCount / 220)),
  };
}

export async function getBlogPosts() {
  const files = await fs.readdir(blogsDirectory);
  const markdownFiles = files.filter((file) => file.endsWith(".md"));
  const posts = await Promise.all(
    markdownFiles.map(async (file) => {
      const slug = file.slice(0, -3);
      const source = await fs.readFile(path.join(blogsDirectory, file), "utf8");
      const { data, content } = matter(source);
      return getPostMetadata(data, slug, content);
    })
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getBlogPost(slug) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;

  const filePath = path.join(blogsDirectory, `${slug}.md`);
  let source;

  try {
    source = await fs.readFile(filePath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }

  const { data, content } = matter(source);
  return {
    ...getPostMetadata(data, slug, content),
    content,
  };
}
