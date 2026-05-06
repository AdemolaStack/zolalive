import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.css";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LeaguePage from "./pages/league/LeaguePage";

// Lazy load MatchPage — hls.js (300KB+) only downloads when user visits a match
const MatchPage = lazy(() => import("./pages/match/MatchPage"));

const PageLoader = () => (
  <main className="page-content" style={{ display: "flex", justifyContent: "center", paddingTop: 120 }}>
    <div style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid var(--color-surface-4)", borderTopColor: "var(--color-accent)", animation: "spin 0.8s linear infinite" }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </main>
);

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/league/:league" element={<LeaguePage />} />
          <Route path="/match/:id" element={<MatchPage />} />
          <Route path="*" element={
            <main className="page-content" style={{ textAlign: "center", paddingTop: 100 }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 72, fontWeight: 900, color: "var(--color-surface-3)" }}>404</p>
              <p style={{ color: "var(--color-text-2)", marginTop: 8 }}>Page not found.</p>
            </main>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}