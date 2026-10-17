import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { getCaseStudy, getCaseStudySlugs } from "../../../lib/caseStudies";

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) return {};

  return {
    title: `${caseStudy.project.title} — Case Study | Kunal Gupta`,
    description: caseStudy.summary,
  };
}

export default async function ProjectCaseStudyPage({ params }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) notFound();

  const { project } = caseStudy;

  return (
    <>
      <Navbar />
      <main className="case-study-page">
        <div className="case-study-shell">
          <Link className="case-study-back" href="/#projects">
            <span aria-hidden="true">←</span> Back to selected work
          </Link>

          <header className="case-study-hero">
            <span className="eyebrow">Project case study</span>
            <h1>{project.title}</h1>
            <p>{caseStudy.summary}</p>

            <div className="case-study-tech" aria-label="Technology stack">
              {project.tech.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>

            <div className="case-study-actions">
              <a
                className="case-study-primary-action"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit live project <span aria-hidden="true">↗</span>
              </a>
              <a
                className="case-study-secondary-action"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                View source on GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </header>

          {project.images?.length > 0 && (
            <section
              className="case-study-gallery"
              aria-label={`${project.title} screenshots`}
            >
              {project.images.map((image, index) => (
                <figure className="case-study-image" key={image}>
                  <Image
                    src={image}
                    alt={`${project.title} interface screenshot ${index + 1}`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 720px) 100vw, 720px"
                  />
                </figure>
              ))}
            </section>
          )}

          <section className="case-study-architecture">
            <div className="case-study-section-heading">
              <span className="eyebrow">( 01 ) — System map</span>
              <h2>How the pieces fit together</h2>
            </div>
            <div className="architecture-flow">
              {project.architecture.map((layer, index) => (
                <div className="architecture-step" key={layer.label}>
                  <div className="architecture-node">
                    <span className="architecture-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{layer.label}</h3>
                      <p>{layer.detail}</p>
                    </div>
                  </div>
                  {index < project.architecture.length - 1 && (
                    <span
                      className="architecture-arrow"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          <article className="case-study-article">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {caseStudy.content}
            </ReactMarkdown>
          </article>

          <footer className="case-study-footer">
            <span className="glow-dot" />
            <p>Built with curiosity, iteration, and a lot of learning.</p>
            <Link href="/#projects">Explore more projects →</Link>
          </footer>
        </div>
      </main>
      <Footer />
    </>
  );
}
