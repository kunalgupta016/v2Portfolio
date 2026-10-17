import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getBlogPosts } from "../../lib/blogs";

export const metadata = {
  title: "Blog | Kunal Gupta",
  description:
    "Notes on building software, real-time applications, AI, and lessons learned along the way.",
};

export default async function BlogsPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Navbar />
      <main className="blogs-page section-tone-a">
        <div className="container-main">
          <span className="eyebrow">( 04 ) — Notes & Ideas</span>
          <h1 className="blogs-title">
            The <span className="gradient-text">Blog</span>
          </h1>
          <p className="blogs-intro">
            Thoughts on building software, problem solving, and the things I
            learn along the way.
          </p>

          {posts.length ? (
            <div className="blog-list">
              {posts.map((post, index) => {
                const publishedDate = new Date(
                  `${post.date}T00:00:00Z`
                ).toLocaleDateString("en", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                });

                return (
                  <Link
                    className="blog-card"
                    href={`/blogs/${post.slug}`}
                    key={post.slug}
                  >
                    <div className="blog-card-topline">
                      <span>
                        {publishedDate} <span aria-hidden="true">·</span>{" "}
                        {post.readingTime} min read
                      </span>
                      <span className="blog-card-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <div className="blog-card-bottom">
                      <div className="blog-tag-list">
                        {post.tags.slice(0, 4).map((tag) => (
                          <span className="blog-tag" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="blog-read-link">
                        Read article <span aria-hidden="true">↗</span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="blog-empty-state glass-card">
              <span className="eyebrow">( Coming soon )</span>
              <h2>First post in progress</h2>
              <p>
                Add a Markdown article to <code>content/blogs/</code> and it
                will appear here automatically.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
