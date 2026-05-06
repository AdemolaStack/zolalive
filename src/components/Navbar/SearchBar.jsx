import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { matches } from "../../data/matches";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    if (q.trim().length < 2) { setResults([]); return; }
    const lower = q.toLowerCase();
    setResults(
      matches.filter((m) =>
        m.homeTeam.name.toLowerCase().includes(lower) ||
        m.awayTeam.name.toLowerCase().includes(lower) ||
        m.leagueId.toLowerCase().includes(lower)
      ).slice(0, 5)
    );
  };

  const select = (id) => {
    setQuery("");
    setResults([]);
    navigate(`/match/${id}`);
  };

  return (
    <div className="navbar-search">
      <div className={`navbar-search-input-wrapper${focused ? " focused" : ""}`}>
        <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
          <circle cx="9" cy="9" r="7" stroke="var(--color-text-3)" strokeWidth="1.8"/>
          <path d="M14 14l4 4" stroke="var(--color-text-3)" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 180)}
          placeholder="Search teams, leagues..."
        />
        {query && (
          <button
            className="navbar-search-clear"
            onClick={() => { setQuery(""); setResults([]); inputRef.current?.focus(); }}
          >
            ✕
          </button>
        )}
      </div>

      {focused && results.length > 0 && (
        <ul className="navbar-search-results" role="listbox">
          {results.map((m) => (
            <li
              key={m.id}
              className="navbar-search-result-item"
              role="option"
              onClick={() => select(m.id)}
            >
              <span>
                <span className="teams-text">{m.homeTeam.shortName}</span>
                <span className="vs-text">vs</span>
                <span className="teams-text">{m.awayTeam.shortName}</span>
              </span>
              {m.status === "live" && <span className="live-badge">LIVE</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}