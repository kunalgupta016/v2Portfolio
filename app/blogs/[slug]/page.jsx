import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { getBlogPost, getBlogPosts } from "../../../lib/blogs";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) return {};

  return {
    title: `${post.title} | Kunal Gupta`,
    description: post.description,
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  const publishedDate = new Date(`${post.date}T00:00:00Z`).toLocaleDateString(
    "en",
    { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }
  );
  const articleContent = post.content.replace(/^# .+\r?\n+/, "");

  return (
    <>
      <Navbar />
      <main className="blog-article-page section-tone-a">
        <div className="blog-article-shell">
          <header className="blog-article-header">
            <Link className="blog-back-link" href="/blogs">
              <span aria-hidden="true">←</span> Back to all stories
            </Link>

            <div className="blog-article-kicker">
              <span className="blog-kicker-line" />
              <span>Engineering notes</span>
            </div>

            <h1>{post.title}</h1>
            <p className="blog-article-description">{post.description}</p>

            <div className="blog-author-row">
              <div className="blog-author-avatar" aria-hidden="true">
                K
              </div>
              <div className="blog-author-info">
                <span className="blog-author-name">Kunal Gupta</span>
                <span className="blog-article-meta">
                  {publishedDate}
                  <span aria-hidden="true">·</span>
                  {post.readingTime} min read
                </span>
              </div>
            </div>
          </header>

          <article className="blog-article">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {articleContent}
            </ReactMarkdown>
          </article>

          {post.tags.length > 0 && (
            <footer className="blog-article-tags" aria-label="Article tags">
              {post.tags.map((tag) => (
                <span className="blog-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </footer>
          )}

          <div className="blog-article-end">
            <span className="glow-dot" />
            <span>Thanks for reading</span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
