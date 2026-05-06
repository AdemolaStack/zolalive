import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Countdown from "./Countdown";
import { leagues } from "../../data/leagues";
import "./matchcard.css";

const MatchCard = ({ match }) => {
  const navigate = useNavigate();
  const league = leagues.find((l) => l.id === match.leagueId);
  const isLive = match.status === "live";

  return (
    <div
      className={`match-card${isLive ? " is-live" : ""}`}
      onClick={() => navigate(`/match/${match.id}`)}
    >
      {/* League chip + round badge */}
      <div className="match-card-league">
        <span className="league-chip">
          {league?.shortName || match.leagueId}
        </span>
        {match.round && (
          <span className="round-chip">{match.round}</span>
        )}
      </div>

      {/* Teams */}
      <div className="match-card-teams">
        <div className="match-card-team">
          <TeamAvatar
            src={match.homeTeam.logo}
            name={match.homeTeam.name}
            shortName={match.homeTeam.shortName}
          />
          <span className="match-card-team-name">{match.homeTeam.shortName}</span>
        </div>

        <span className="match-card-vs">VS</span>

        <div className="match-card-team">
          <TeamAvatar
            src={match.awayTeam.logo}
            name={match.awayTeam.name}
            shortName={match.awayTeam.shortName}
          />
          <span className="match-card-team-name">{match.awayTeam.shortName}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="match-card-footer">
        <span className="match-card-venue">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
            <path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z" fill="currentColor" opacity="0.5"/>
          </svg>
          {match.venue}
        </span>
        <Countdown kickoff={match.kickoff} status={match.status} variant="compact" />
      </div>
    </div>
  );
};

/* Inline team avatar with fallback to initials */
function TeamAvatar({ src, name, shortName }) {
  const [err, setErr] = useState(false);
  const initials = (shortName || name || "?").slice(0, 3).toUpperCase();

  return (
    <div className="match-card-team-logo">
      {src && !err ? (
        <img
          src={src}
          alt={name}
          onError={() => setErr(true)}
        />
      ) : (
        <span className="match-card-team-initials">{initials}</span>
      )}
    </div>
  );
}

export default MatchCard;