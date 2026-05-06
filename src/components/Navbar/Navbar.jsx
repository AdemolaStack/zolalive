import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import DropdownMenu from "./DropdownMenu";
import AuthButtons from "./AuthButtons";
import logoImg from "../../assets/logos/zolalive.png";
import "./navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar${scrolled ? " scrolled" : ""}`}>
      {/* Logo — OUTSIDE the glass pill */}
      <button
        className="navbar-logo"
        onClick={() => navigate("/")}
        aria-label="Go to homepage"
      >
        <img
          src={logoImg}
          alt="ZolaLive"
          className="navbar-logo-img"
        />
      </button>

      {/* Glass Pill — contains search, leagues btn, auth */}
      <div className="navbar-glass">
        <div className="navbar-search-wrapper">
          <SearchBar />
        </div>

        <div className="navbar-actions">
          <DropdownMenu />
          <AuthButtons />
        </div>
      </div>
    </header>
  );
}