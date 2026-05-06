import Container from "../components/Layout/Container";
import MatchCard from "../components/Match/MatchCard";
import FeaturedMatch from "../components/Match/FeaturedMatch";
import { matches, getFeaturedMatch } from "../data/matches";
import "./home.css";

export default function Home() {
  const featured = getFeaturedMatch();
  const gridMatches = matches.filter((m) => m.id !== featured?.id).slice(0, 6);

  return (
    <main className="page-content" style={{ paddingBottom: 80 }}>
      <Container>
        {/* Featured Match Hero */}
        <section className="home-section" style={{ paddingTop: 40 }}>
          <div className="home-section-header">
            <p className="section-label">Most Popular</p>
            <h2 className="section-title">Featured Match</h2>
          </div>
          <FeaturedMatch match={featured} />
        </section>

        <div className="divider" />

        {/* Upcoming Matches Grid */}
        <section className="home-section" style={{ paddingBottom: 60 }}>
          <div className="home-section-header">
            <p className="section-label">Now &amp; Next</p>
            <h2 className="section-title">Upcoming Matches</h2>
          </div>
          <div className="home-match-grid">
            {gridMatches.map((match, i) => (
              <div
                key={match.id}
                className="fade-up"
                style={{ animationDelay: i * 70 + "ms", animationFillMode: "both", opacity: 0 }}
              >
                <MatchCard match={match} />
              </div>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}