"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";


import { useEffect, useState } from "react";

const API_BASE = "";



function formatNumber(n) {
  if (n == null) return "-";
  return new Intl.NumberFormat("es-AR").format(n);
}

export default function Page() {
  const [data, setData] = useState({ season: "", updatedAtUtc: null, rows: [], top: [] });
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const sRes = await fetch(`${API_BASE}/api/season/current`, { cache: "no-store" });
    const sJson = await sRes.json();

    const res = await fetch(`${API_BASE}/api/leaderboard?season=${encodeURIComponent(sJson.season)}`, { cache: "no-store" });
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <div className="smoke" />
      <div className="container">
        <div className="header">
          <div className="brand">
            <div className="logo">🥦</div>
            <div>
              <div className="title">CHILLING.OG</div>
              <div className="subtitle">Leaderboard semanal — ranking por premio</div>
            </div>
          </div>
          <div className="pills">
            <span className="pill">Semana: <b style={{color:"rgba(255,255,255,.9)"}}>{data.season || "-"}</b></span>
            <a className="pill" href="/admin" style={{color:"rgba(255,255,255,.9)"}}>Admin</a>
          </div>
        </div>

        <div className="glass card" style={{marginBottom:14}}>
          <div style={{fontWeight:900, fontSize:18, marginBottom:8}}>Top 3</div>
          {data.top?.length ? (
            <div className="muted">
              1) {data.top[0]?.displayName} — Premio {formatNumber(data.top[0]?.prize)}
              <br />
              2) {data.top[1]?.displayName} — Premio {formatNumber(data.top[1]?.prize)}
              <br />
              3) {data.top[2]?.displayName} — Premio {formatNumber(data.top[2]?.prize)}
            </div>
          ) : (
            <div className="muted">{loading ? "Cargando..." : "Todavía no hay datos (subí un CSV desde /admin)"}</div>
          )}
        </div>

        <div className="glass card">
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10}}>
            <div style={{fontWeight:900, fontSize:18}}>Ranking completo</div>
            <div className="muted">{loading ? "Cargando..." : `${data.rows?.length || 0} usuarios`}</div>
          </div>

          <div style={{overflowX:"auto"}}>
            <table className="table">
              <thead>
                <tr>
                  <th style={{width:70}}>#</th>
                  <th>Usuario</th>
                  <th style={{width:200}}>Premio</th>
                  <th style={{width:200}}>Apostado</th>
                </tr>
              </thead>
              <tbody>
                {(data.rows || []).map((r) => (
                  <tr key={r.username}>
                    <td className="num">{r.rank}</td>
                    <td><b>{r.displayName}</b> <span className="muted">@{r.username}</span></td>
                    <td className="num">{formatNumber(r.prize)}</td>
                    <td className="num">{formatNumber(r.bet)}</td>
                  </tr>
                ))}
                {!loading && (data.rows || []).length === 0 && (
                  <tr><td colSpan={4} className="muted" style={{padding:"14px 10px"}}>Sin datos todavía.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
