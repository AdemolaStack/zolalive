export const matches = [
  // ═══════════════════════════════════════════════
  //  LEAGUE MATCHES
  // ═══════════════════════════════════════════════


  {
    id: "match-003",
    leagueId: "la-liga",
    status: "upcoming",
    kickoff: "2026-05-09T21:00:00Z",
    featured: false,
    homeTeam: { name: "Barcelona", shortName: "BAR", logo: "/assets/logos/teams/barcelona.png" },
    awayTeam: { name: "Atletico Madrid", shortName: "ATM", logo: "/assets/logos/teams/atletico.png" },
    venue: "Camp Nou",
    streamUrl: "",
  },
  {
    id: "match-004",
    leagueId: "bundesliga",
    status: "upcoming",
    kickoff: "2026-05-09T17:30:00Z",
    featured: false,
    homeTeam: { name: "Borussia Dortmund", shortName: "BVB", logo: "/assets/logos/teams/dortmund.png" },
    awayTeam: { name: "RB Leipzig", shortName: "RBL", logo: "/assets/logos/teams/leipzig.png" },
    venue: "Signal Iduna Park",
    streamUrl: "",
  },
  {
    id: "match-005",
    leagueId: "serie-a",
    status: "upcoming",
    kickoff: "2026-05-09T19:45:00Z",
    featured: false,
    homeTeam: { name: "Inter Milan", shortName: "INT", logo: "/assets/logos/teams/inter.png" },
    awayTeam: { name: "Juventus", shortName: "JUV", logo: "/assets/logos/teams/juventus.png" },
    venue: "San Siro",
    streamUrl: "",
  },

  {
    id: "match-007",
    leagueId: "premier-league",
    status: "live",
    kickoff: "2026-05-09T20:00:00Z",
    featured: true,
    homeTeam: { name: "Liverpool", shortName: "LIV", logo: "/assets/logos/teams/liverpool.png" },
    awayTeam: { name: "Chelsea", shortName: "CHE", logo: "/assets/logos/teams/chelsea.png" },
    venue: "Anfield",
    streamUrl: "https://pooembed.eu/embed/pl/2026-05-09/liv-che",
  },

  // ═══════════════════════════════════════════════
  //  CUP MATCHES — Finals & Semi-Finals
  // ═══════════════════════════════════════════════

  // ── Champions League Final ────────────────────
  {
    id: "match-ucl-final",
    leagueId: "champions-league",
    status: "upcoming",
    kickoff: "2026-05-30T20:00:00Z",
    featured: false,
    homeTeam: { name: "Arsenal", shortName: "ARS", logo: "/assets/logos/teams/arsenal.png" },
    awayTeam: { name: "PSG", shortName: "PSG", logo: "/assets/logos/teams/psg.png" },
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
    awayTeam: { name: "Lazio", shortName: "LAZ", logo: "/assets/logos/teams/lazio.png" },
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
    homeTeam: { name: "Chelsea", shortName: "CHE", logo: "/assets/logos/teams/chelsea.png" },
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
    homeTeam: { name: "Bayern Munich", shortName: "BAY", logo: "/assets/logos/teams/bayern.png" },
    awayTeam: { name: "VfB Stuttgart", shortName: "STU", logo: "/assets/logos/teams/stuttgart.png" },
    venue: "Olympiastadion, Berlin",
    round: "Final",
    streamUrl: "",
  },
];

export const getFeaturedMatch = () => matches.find((m) => m.featured) || matches[0];
export const getMatchById = (id) => matches.find((m) => m.id === id) || null;
export const getMatchesByLeague = (leagueId) => matches.filter((m) => m.leagueId === leagueId);