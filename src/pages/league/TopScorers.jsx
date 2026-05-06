import { useState, useEffect } from "react";
import { getTopScorers } from "../../services/api";
import "./league-tables.css";

export default function TopScorers({ leagueId }) {
  const [scorers, setScorers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    getTopScorers(leagueId)
      .then((data) => setScorers(data))
      .catch((err) => setError(err.message || "Failed to load top scorers"))
      .finally(() => setLoading(false));
  }, [leagueId]);

  if (loading) {
    return (
      <div className="table-loading">
        <div className="table-spinner" />
        <p>Loading top scorers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-empty">
        <p className="table-empty-title">⚠️ {error}</p>
        <p className="table-empty-sub">Make sure the "top_scorers" table exists in your Supabase project.</p>
      </div>
    );
  }

  if (scorers.length === 0) {
    return (
      <div className="table-empty">
        <p className="table-empty-title">No top scorers data yet</p>
        <p className="table-empty-sub">Add rows to the "top_scorers" table in Supabase for league: {leagueId}</p>
      </div>
    );
  }

  return (
    <div className="scorers-wrapper">
      <div className="scorers-list">
        {scorers.map((player, i) => (
          <div key={player.id || i} className={`scorer-card ${i < 3 ? "top-three" : ""}`}>
            <div className="scorer-rank">
              {i < 3 ? (
                <span className={`rank-medal rank-${i + 1}`}>{i + 1}</span>
              ) : (
                <span className="rank-num">{player.position}</span>
              )}
            </div>

            <div className="scorer-info">
              <span className="scorer-name">{player.player_name}</span>
              <span className="scorer-team">{player.team_name}</span>
            </div>

            <div className="scorer-stats">
              <div className="stat-item stat-goals">
                <span className="stat-value">{player.goals}</span>
                <span className="stat-label">Goals</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{player.assists}</span>
                <span className="stat-label">Assists</span>
              </div>
              <div className="stat-item hide-mobile">
                <span className="stat-value">{player.matches_played}</span>
                <span className="stat-label">Apps</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
