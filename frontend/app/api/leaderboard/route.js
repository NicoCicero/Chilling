export const dynamic = "force-dynamic";

export async function GET(req) {
  const base = process.env.BACKEND_URL || "http://backend:8080";
  const url = new URL(req.url);
  const season = url.searchParams.get("season") || "";
  const r = await fetch(
    `${base}/api/leaderboard?season=${encodeURIComponent(season)}`,
    { cache: "no-store" }
  );
  const text = await r.text();
  return new Response(text, {
    status: r.status,
    headers: { "content-type": "application/json" },
  });
}
