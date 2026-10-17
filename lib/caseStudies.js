import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { webApps } from "./data/projects";

const caseStudiesDirectory = path.join(process.cwd(), "content", "case-studies");
const caseStudyProjects = webApps.filter((project) => project.caseStudy);

export async function getCaseStudySlugs() {
  const files = await fs.readdir(caseStudiesDirectory);
  const availableSlugs = new Set(
    files
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.slice(0, -3))
  );

  return caseStudyProjects
    .filter((project) => availableSlugs.has(project.slug))
    .map((project) => project.slug);
}

export async function getCaseStudy(slug) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;

  const project = caseStudyProjects.find((item) => item.slug === slug);
  if (!project) return null;

  let source;
  try {
    source = await fs.readFile(
      path.join(caseStudiesDirectory, `${slug}.md`),
      "utf8"
    );
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }

  const { data, content } = matter(source);
  return {
    project,
    summary:
      typeof data.summary === "string" && data.summary.trim()
        ? data.summary
        : project.description,
    content,
  };
}
