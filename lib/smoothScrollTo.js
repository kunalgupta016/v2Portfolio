// Routes in-page anchor navigation through Lenis so it matches the rest of
// the site's scroll physics instead of the browser's instant hash jump.
export function smoothScrollToHash(e, href) {
  if (!href?.startsWith("#")) return;
  const target = document.querySelector(href);
  if (!target) return;
  e.preventDefault();
  if (window.lenis) {
    window.lenis.scrollTo(target, { duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
