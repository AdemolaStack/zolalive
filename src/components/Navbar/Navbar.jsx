import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import DropdownMenu from "./DropdownMenu";
import AuthButtons from "./AuthButtons";
import logoImg from "../../assets/logos/zolalive.png";
import "./navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    const close = () => setMobileOpen(false);
    window.addEventListener("popstate", close);
    return () => window.removeEventListener("popstate", close);
  }, []);

  return (
    <header className={`navbar${scrolled ? " scrolled" : ""}${mobileOpen ? " mobile-open" : ""}`}>
      {/* Logo */}
      <button
        className="navbar-logo"
        onClick={() => { navigate("/"); setMobileOpen(false); }}
        aria-label="Go to homepage"
      >
        <img src={logoImg} alt="ZolaLive" className="navbar-logo-img" />
      </button>

      {/* Hamburger button — mobile only */}
      <button
        className="navbar-hamburger"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span className={`hamburger-line${mobileOpen ? " open" : ""}`} />
        <span className={`hamburger-line${mobileOpen ? " open" : ""}`} />
        <span className={`hamburger-line${mobileOpen ? " open" : ""}`} />
      </button>

      {/* Glass Pill — desktop: always visible, mobile: toggle */}
      <div className={`navbar-glass${mobileOpen ? " mobile-visible" : ""}`}>
        <div className="navbar-search-wrapper">
          <SearchBar />
        </div>

        <div className="navbar-actions">
          <DropdownMenu />
          <AuthButtons />
        </div>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="navbar-backdrop" onClick={() => setMobileOpen(false)} />
      )}
    </header>
  );
}