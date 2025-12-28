export const dynamic = "force-dynamic";

export async function GET() {
  const base = process.env.BACKEND_URL || "http://backend:8080";
  const r = await fetch(`${base}/api/season/current`, { cache: "no-store" });
  const text = await r.text();
  return new Response(text, {
    status: r.status,
    headers: { "content-type": "application/json" },
  });
}
