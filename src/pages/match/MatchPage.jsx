import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../../components/Layout/Container";
import TeamLogo from "../../components/Match/TeamLogo";
import Countdown from "../../components/Match/Countdown";
import VideoPlayer from "../../components/Match/VideoPlayer";
import { getMatchById } from "../../data/matches";
import { getStreamUrl } from "../../services/api";
import { formatKickoff } from "../../utils/formatTime";
import { leagues } from "../../data/leagues";

export default function MatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const match = getMatchById(id);
  const [streamUrl, setStreamUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!match) return;
    getStreamUrl(match.id).then((url) => {
      setStreamUrl(url);
      setLoading(false);
    });
  }, [match?.id]);

  if (!match) {
    return (
      <main className="page-content" style={{ paddingTop: 80, textAlign: "center" }}>
        <p style={{ color: "var(--color-text-2)" }}>Match not found.</p>
        <button
          onClick={() => navigate("/")}
          style={{ marginTop: 16, color: "var(--color-accent)", background: "none", border: "none", cursor: "pointer", fontSize: 14 }}
        >
          ← Back
        </button>
      </main>
    );
  }

  const league = leagues.find((l) => l.id === match.leagueId);
  const isLive = match.status === "live";

  return (
    <main className="page-content" style={{ paddingBottom: 80 }}>
      <Container>
        <button
          onClick={() => navigate(-1)}
          style={{ marginTop: 32, marginBottom: 24, display: "flex", alignItems: "center", gap: 6, color: "var(--color-text-2)", background: "none", border: "none", cursor: "pointer", fontSize: 14 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-1)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-2)")}
        >
          ← Back
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14, marginBottom: 24 }}>
          <div>
            <p className="section-label">{league?.name || match.leagueId}</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 4vw, 32px)", fontWeight: 900, letterSpacing: "0.03em", textTransform: "uppercase", lineHeight: 1 }}>
              {match.homeTeam.name} <span style={{ color: "var(--color-text-3)" }}>vs</span> {match.awayTeam.name}
            </h1>
            <p style={{ marginTop: 6, fontSize: 13, color: "var(--color-text-2)" }}>
              {formatKickoff(match.kickoff)}{match.venue && ` · ${match.venue}`}
            </p>
          </div>
          {isLive
            ? <span className="live-badge" style={{ fontSize: 13, padding: "6px 14px" }}>LIVE NOW</span>
            : <Countdown kickoff={match.kickoff} status={match.status} variant="featured" />
          }
        </div>

        {/* Video Player or Placeholder */}
        <div style={{ marginBottom: 36 }}>
          {loading ? (
            <div style={{
              position: "relative", width: "100%", aspectRatio: "16/9",
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-xl)", overflow: "hidden",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10
            }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid var(--color-surface-4)", borderTopColor: "var(--color-accent)", animation: "spin 0.8s linear infinite" }} />
              <p style={{ fontSize: 13, color: "var(--color-text-2)" }}>Loading stream...</p>
            </div>
          ) : streamUrl ? (
            <VideoPlayer
              src={streamUrl}
              title={`${match.homeTeam.name} vs ${match.awayTeam.name}`}
            />
          ) : (
            <div style={{
              position: "relative", width: "100%", aspectRatio: "16/9",
              background: "var(--color-surface-2)",
              border: `1px solid ${isLive ? "var(--color-accent)" : "var(--color-border)"}`,
              borderRadius: "var(--radius-xl)", overflow: "hidden",
              boxShadow: "var(--shadow-md)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                <TeamLogo src={match.homeTeam.logo} name={match.homeTeam.name} shortName={match.homeTeam.shortName} size="xl" />
                <span style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 900, color: "var(--color-border-hover)" }}>VS</span>
                <TeamLogo src={match.awayTeam.logo} name={match.awayTeam.name} shortName={match.awayTeam.shortName} size="xl" />
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-2)" }}>
                {isLive ? "Stream unavailable" : "Stream starts at kickoff"}
              </p>
            </div>
          )}
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </Container>
    </main>
  );
}