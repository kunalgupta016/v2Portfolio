/**
 * GET /api/github
 * Server-side proxy for GitHub contribution data (last 1 year).
 * Uses github-contributions-api.jogruber.de — no auth needed.
 * Returns: { total: number, contributions: [{date, count, level}] }
 */

const USERNAME = "kunalgupta016";

export async function GET() {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) throw new Error("Upstream GitHub API error");

    const data = await res.json();
    return Response.json({
      total: data.total?.lastYear ?? 0,
      contributions: data.contributions ?? [],
    });
  } catch {
    return Response.json({ total: 0, contributions: [], error: true });
  }
}
