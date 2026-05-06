export const matches = [
  // ═══════════════════════════════════════════════
  //  LEAGUE MATCHES
  // ═══════════════════════════════════════════════
  {
    id: "match-001",
    leagueId: "premier-league",
    status: "upcoming",
    kickoff: "2026-05-08T19:45:00Z",
    featured: false,
    homeTeam: { name: "Arsenal",        shortName: "ARS", logo: "/assets/logos/teams/arsenal.png" },
    awayTeam: { name: "Chelsea",        shortName: "CHE", logo: "/assets/logos/teams/chelsea.png" },
    venue: "Emirates Stadium",
    streamUrl: "",
  },
  {
    id: "match-002",
    leagueId: "champions-league",
    status: "live",
    kickoff: "2026-05-06T19:00:00Z",
    featured: false,
    homeTeam: { name: "Real Madrid",   shortName: "RMA", logo: "/assets/logos/teams/real-madrid.png" },
    awayTeam: { name: "Bayern Munich", shortName: "BAY", logo: "/assets/logos/teams/bayern.png" },
    venue: "Santiago Bernabeu",
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "match-003",
    leagueId: "la-liga",
    status: "upcoming",
    kickoff: "2026-05-09T21:00:00Z",
    featured: false,
    homeTeam: { name: "Barcelona",       shortName: "BAR", logo: "/assets/logos/teams/barcelona.png" },
    awayTeam: { name: "Atletico Madrid", shortName: "ATM", logo: "/assets/logos/teams/atletico.png" },
    venue: "Camp Nou",
    streamUrl: "",
  },
  {
    id: "match-004",
    leagueId: "bundesliga",
    status: "upcoming",
    kickoff: "2026-05-10T17:30:00Z",
    featured: false,
    homeTeam: { name: "Borussia Dortmund", shortName: "BVB", logo: "/assets/logos/teams/dortmund.png" },
    awayTeam: { name: "RB Leipzig",        shortName: "RBL", logo: "/assets/logos/teams/leipzig.png" },
    venue: "Signal Iduna Park",
    streamUrl: "",
  },
  {
    id: "match-005",
    leagueId: "serie-a",
    status: "upcoming",
    kickoff: "2026-05-11T19:45:00Z",
    featured: false,
    homeTeam: { name: "Inter Milan", shortName: "INT", logo: "/assets/logos/teams/inter.png" },
    awayTeam: { name: "Juventus",    shortName: "JUV", logo: "/assets/logos/teams/juventus.png" },
    venue: "San Siro",
    streamUrl: "",
  },
  {
    id: "match-006",
    leagueId: "nba",
    status: "upcoming",
    kickoff: "2026-05-08T23:30:00Z",
    featured: false,
    homeTeam: { name: "Boston Celtics", shortName: "BOS", logo: "/assets/logos/teams/celtics.png" },
    awayTeam: { name: "Golden State",   shortName: "GSW", logo: "/assets/logos/teams/warriors.png" },
    venue: "TD Garden",
    streamUrl: "",
  },
  {
    id: "match-007",
    leagueId: "premier-league",
    status: "upcoming",
    kickoff: "2026-05-15T20:00:00Z",
    featured: false,
    homeTeam: { name: "Liverpool", shortName: "LIV", logo: "/assets/logos/teams/liverpool.png" },
    awayTeam: { name: "Chelsea",   shortName: "CHE", logo: "/assets/logos/teams/chelsea.png" },
    venue: "Anfield",
    streamUrl: "",
  },

  // ═══════════════════════════════════════════════
  //  CUP MATCHES — Finals & Semi-Finals
  // ═══════════════════════════════════════════════

  // ── Champions League Semi-Finals (2nd Legs) ──
  {
    id: "match-ucl-sf1",
    leagueId: "champions-league",
    status: "upcoming",
    kickoff: "2026-05-06T20:00:00Z",
    featured: false,
    homeTeam: { name: "Bayern Munich",  shortName: "BAY", logo: "/assets/logos/teams/bayern.png" },
    awayTeam: { name: "PSG",            shortName: "PSG", logo: "/assets/logos/teams/psg.png" },
    venue: "Allianz Arena",
    round: "Semi-Final 2nd Leg (PSG lead 5-4 agg)",
    streamUrl: "",
  },
  {
    id: "match-ucl-sf2",
    leagueId: "champions-league",
    status: "live",
    kickoff: "2026-05-06T19:00:00Z",
    featured: true,
    homeTeam: { name: "Arsenal",         shortName: "ARS", logo: "/assets/logos/teams/arsenal.png" },
    awayTeam: { name: "Atletico Madrid", shortName: "ATM", logo: "/assets/logos/teams/atletico.png" },
    venue: "Emirates Stadium",
    round: "Semi-Final 2nd Leg (1-1 agg)",
    streamUrl: "https://pooembed.eu/embed/ucl/2026-05-05/ars-atm",
  },

  // ── Champions League Final ────────────────────
  {
    id: "match-ucl-final",
    leagueId: "champions-league",
    status: "upcoming",
    kickoff: "2026-05-30T20:00:00Z",
    featured: false,
    homeTeam: { name: "TBD",  shortName: "TBD", logo: "" },
    awayTeam: { name: "TBD",  shortName: "TBD", logo: "" },
    venue: "Puskás Aréna, Budapest",
    round: "Final",
    streamUrl: "",
  },

  // ── Coppa Italia Final ────────────────────────
  {
    id: "match-coppa-final",
    leagueId: "coppa-italia",
    status: "upcoming",
    kickoff: "2026-05-13T20:45:00Z",
    featured: false,
    homeTeam: { name: "Inter Milan", shortName: "INT", logo: "/assets/logos/teams/inter.png" },
    awayTeam: { name: "Lazio",       shortName: "LAZ", logo: "/assets/logos/teams/lazio.png" },
    venue: "Stadio Olimpico, Rome",
    round: "Final",
    streamUrl: "",
  },

  // ── FA Cup Final ──────────────────────────────
  {
    id: "match-facup-final",
    leagueId: "fa-cup",
    status: "upcoming",
    kickoff: "2026-05-16T15:00:00Z",
    featured: false,
    homeTeam: { name: "Chelsea",         shortName: "CHE", logo: "/assets/logos/teams/chelsea.png" },
    awayTeam: { name: "Manchester City", shortName: "MCI", logo: "/assets/logos/teams/mancity.png" },
    venue: "Wembley Stadium",
    round: "Final",
    streamUrl: "",
  },

  // ── DFB-Pokal Final ───────────────────────────
  {
    id: "match-dfb-final",
    leagueId: "dfb-pokal",
    status: "upcoming",
    kickoff: "2026-05-23T20:00:00Z",
    featured: false,
    homeTeam: { name: "Bayern Munich",  shortName: "BAY", logo: "/assets/logos/teams/bayern.png" },
    awayTeam: { name: "VfB Stuttgart",  shortName: "STU", logo: "/assets/logos/teams/stuttgart.png" },
    venue: "Olympiastadion, Berlin",
    round: "Final",
    streamUrl: "",
  },
];

export const getFeaturedMatch   = () => matches.find((m) => m.featured) || matches[0];
export const getMatchById       = (id) => matches.find((m) => m.id === id) || null;
export const getMatchesByLeague = (leagueId) => matches.filter((m) => m.leagueId === leagueId);