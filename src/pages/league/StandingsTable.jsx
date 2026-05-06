import { useState, useEffect } from "react";
import { getStandings } from "../../services/api";
import "./league-tables.css";

export default function StandingsTable({ leagueId }) {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    getStandings(leagueId)
      .then((data) => setStandings(data))
      .catch((err) => setError(err.message || "Failed to load standings"))
      .finally(() => setLoading(false));
  }, [leagueId]);

  if (loading) {
    return (
      <div className="table-loading">
        <div className="table-spinner" />
        <p>Loading standings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-empty">
        <p className="table-empty-title">⚠️ {error}</p>
        <p className="table-empty-sub">Make sure the "standings" table exists in your Supabase project.</p>
      </div>
    );
  }

  if (standings.length === 0) {
    return (
      <div className="table-empty">
        <p className="table-empty-title">No standings data yet</p>
        <p className="table-empty-sub">Add rows to the "standings" table in Supabase for league: {leagueId}</p>
      </div>
    );
  }

  return (
    <div className="standings-wrapper">
      <table className="standings-table">
        <thead>
          <tr>
            <th className="col-pos">#</th>
            <th className="col-team">Team</th>
            <th className="col-num">P</th>
            <th className="col-num">W</th>
            <th className="col-num">D</th>
            <th className="col-num">L</th>
            <th className="col-num hide-mobile">GF</th>
            <th className="col-num hide-mobile">GA</th>
            <th className="col-num hide-mobile">GD</th>
            <th className="col-num col-pts">PTS</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((row, i) => (
            <tr key={row.id || i} className={`standings-row ${i < 4 ? "top-four" : ""} ${i >= standings.length - 3 ? "bottom-three" : ""}`}>
              <td className="col-pos">
                <span className={`pos-badge ${i < 4 ? "champions" : ""} ${i >= standings.length - 3 ? "relegation" : ""}`}>
                  {row.position}
                </span>
              </td>
              <td className="col-team">
                <span className="team-name">{row.team_name}</span>
                {row.short_name && <span className="team-short">{row.short_name}</span>}
              </td>
              <td className="col-num">{row.played}</td>
              <td className="col-num">{row.won}</td>
              <td className="col-num">{row.drawn}</td>
              <td className="col-num">{row.lost}</td>
              <td className="col-num hide-mobile">{row.gf}</td>
              <td className="col-num hide-mobile">{row.ga}</td>
              <td className="col-num hide-mobile">
                <span className={row.gd > 0 ? "gd-positive" : row.gd < 0 ? "gd-negative" : ""}>
                  {row.gd > 0 ? `+${row.gd}` : row.gd}
                </span>
              </td>
              <td className="col-num col-pts">{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
