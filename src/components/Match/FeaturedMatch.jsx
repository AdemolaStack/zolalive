import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Countdown from "./Countdown";
import { leagues } from "../../data/leagues";
import { formatKickoff } from "../../utils/formatTime";
import "./featured.css";

const FeaturedMatch = ({ match }) => {
  const navigate = useNavigate();
  const league = leagues.find((l) => l.id === match.leagueId);
  const isLive = match.status === "live";

  return (
    <div className="featured" onClick={() => navigate(`/match/${match.id}`)} style={{ cursor: "pointer" }}>
      <div className="featured-overlay">

        {/* League badge */}
        <span className="featured-league">
          {league?.name || match.leagueId}
        </span>

        {/* Title */}
        <h2 className="featured-title">
          {match.homeTeam.name}
          <span className="vs-text"> vs </span>
          {match.awayTeam.name}
        </h2>

        {/* Team logos */}
        <div className="featured-teams">
          <FeaturedTeamLogo
            src={match.homeTeam.logo}
            name={match.homeTeam.name}
            shortName={match.homeTeam.shortName}
          />
          <span className="featured-vs">VS</span>
          <FeaturedTeamLogo
            src={match.awayTeam.logo}
            name={match.awayTeam.name}
            shortName={match.awayTeam.shortName}
          />
        </div>

        {/* Meta: venue + kickoff */}
        <div className="featured-meta">
          {match.venue && (
            <span className="featured-meta-item">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z" fill="currentColor"/>
              </svg>
              {match.venue}
            </span>
          )}
          <span className="featured-meta-item">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M8 4.5v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            {formatKickoff(match.kickoff)}
          </span>
        </div>

        {/* Countdown or Live badge */}
        <div className="featured-status">
          <Countdown kickoff={match.kickoff} status={match.status} variant="featured" />
        </div>

        {/* CTA */}
        <button className="featured-cta" onClick={(e) => { e.stopPropagation(); navigate(`/match/${match.id}`); }}>
          {isLive ? "Watch Now" : "View Match"}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>
    </div>
  );
};

/* Team logo with fallback */
function FeaturedTeamLogo({ src, name, shortName }) {
  const [err, setErr] = useState(false);
  const initials = (shortName || name || "?").slice(0, 3).toUpperCase();

  return (
    <div className="featured-team-logo">
      {src && !err ? (
        <img src={src} alt={name} onError={() => setErr(true)} />
      ) : (
        <span className="featured-team-initials">{initials}</span>
      )}
    </div>
  );
}

export default FeaturedMatch;