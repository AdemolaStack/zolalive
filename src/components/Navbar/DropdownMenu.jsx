import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { leagues } from "../../data/leagues";

export default function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(leagues[0].id);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
  const btnRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        btnRef.current && !btnRef.current.contains(e.target) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Position dropdown below button
  const updatePosition = useCallback(() => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + 12,
      right: Math.max(16, window.innerWidth - rect.right),
    });
  }, []);

  useEffect(() => {
    if (open) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);
      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition, true);
      };
    }
  }, [open, updatePosition]);

  const active = leagues.find((l) => l.id === hovered) || leagues[0];

  return (
    <>
      <button
        ref={btnRef}
        className={`navbar-leagues-btn${open ? " active" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        Leagues
        <svg className="chevron" width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </button>

      {open && createPortal(
        <div
          ref={dropdownRef}
          className="leagues-dropdown"
          role="menu"
          style={{
            position: "fixed",
            top: dropdownPos.top,
            right: dropdownPos.right,
          }}
        >
          {/* League list */}
          <nav className="leagues-dropdown-list">
            {leagues.map((league) => (
              <button
                key={league.id}
                className={`leagues-dropdown-item${hovered === league.id ? " active" : ""}`}
                role="menuitem"
                onMouseEnter={() => setHovered(league.id)}
                onClick={() => { navigate(`/league/${league.id}`); setOpen(false); }}
              >
                <span className="league-name">{league.shortName}</span>
                <span className="league-country">{league.country}</span>
              </button>
            ))}
          </nav>

          {/* Subleagues detail */}
          <div className="leagues-dropdown-detail">
            <p className="leagues-dropdown-detail-title">
              {active.name}
            </p>
            {active.subleagues.map((sub) => (
              <button
                key={sub.id}
                className="leagues-subleague-btn"
                role="menuitem"
                onClick={() => { navigate(`/league/${active.id}#${sub.id}`); setOpen(false); }}
              >
                <span className="dot" />
                <span className="name">{sub.name}</span>
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}