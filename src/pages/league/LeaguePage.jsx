import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../../components/Layout/Container";
import MatchCard from "../../components/Match/MatchCard";
import StandingsTable from "./StandingsTable";
import TopScorers from "./TopScorers";
import { getLeagueById } from "../../data/leagues";
import { getMatchesByLeague } from "../../data/matches";
import "./league-tables.css";

export default function LeaguePage() {
  const { league: leagueId } = useParams();
  const navigate = useNavigate();
  const league = getLeagueById(leagueId);
  const leagueMatches = getMatchesByLeague(leagueId);

  // Tab state — default to "matches"
  const [activeTab, setActiveTab] = useState("matches");

  if (!league) {
    return (
      <main className="page-content" style={{ paddingTop: 80, textAlign: "center" }}>
        <p style={{ color: "var(--color-text-2)" }}>League not found.</p>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: 16,
            color: "var(--color-accent)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          Back to Home
        </button>
      </main>
    );
  }

  // Build tabs from subleagues — map subleague names to tab types
  const getTabType = (subName) => {
    const lower = subName.toLowerCase();
    if (lower.includes("standing") || lower.includes("table")) return "standings";
    if (lower.includes("scorer") || lower.includes("goal")) return "top-scorers";
    return "matches";
  };

  const tabs = league.subleagues.map((sub) => ({
    id: sub.id,
    name: sub.name,
    type: getTabType(sub.name),
  }));

  // Deduplicate tab types (keep first of each type)
  const uniqueTabs = [];
  const seenTypes = new Set();
  for (const tab of tabs) {
    if (!seenTypes.has(tab.type)) {
      seenTypes.add(tab.type);
      uniqueTabs.push(tab);
    }
  }

  return (
    <main className="page-content" style={{ paddingBottom: 80 }}>
      <Container>

        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: 32,
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "var(--color-text-2)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 14,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-1)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-2)")}
        >
          ← Back
        </button>

        <div style={{ marginBottom: 28 }}>
          <p className="section-label">{league.country}</p>
          <h1
            className="section-title"
            style={{ fontSize: "clamp(24px, 5vw, 40px)" }}
          >
            {league.name}
          </h1>
        </div>

        {/* Tab buttons */}
        <div className="league-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`league-tab${activeTab === tab.type ? " active" : ""}`}
              onClick={() => setActiveTab(tab.type)}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "matches" && (
          <>
            {leagueMatches.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: 20,
                }}
              >
                {leagueMatches.map((match, i) => (
                  <div
                    key={match.id}
                    className="fade-up"
                    style={{
                      animationDelay: i * 70 + "ms",
                      animationFillMode: "both",
                      opacity: 0,
                    }}
                  >
                    <MatchCard match={match} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="table-empty">
                <p className="table-empty-title">No matches scheduled yet</p>
                <p className="table-empty-sub">
                  Add matches in src/data/matches.js with leagueId: "{league.id}"
                </p>
              </div>
            )}
          </>
        )}

        {activeTab === "standings" && (
          <div className="fade-up" style={{ animationFillMode: "both", opacity: 0 }}>
            <StandingsTable leagueId={leagueId} />
          </div>
        )}

        {activeTab === "top-scorers" && (
          <div className="fade-up" style={{ animationFillMode: "both", opacity: 0 }}>
            <TopScorers leagueId={leagueId} />
          </div>
        )}

      </Container>
    </main>
  );
}