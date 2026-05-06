export const leagues = [
  {
    id: "premier-league",
    name: "Premier League",
    shortName: "EPL",
    country: "England",
    logo: "/assets/logos/leagues/epl.png",
    subleagues: [
      { id: "epl-matches",     name: "Matches" },
      { id: "epl-standings",   name: "Standings" },
      { id: "epl-top-scorers", name: "Top Scorers" },
    ],
  },
  {
    id: "la-liga",
    name: "La Liga",
    shortName: "LaLiga",
    country: "Spain",
    logo: "/assets/logos/leagues/laliga.png",
    subleagues: [
      { id: "laliga-matches",     name: "Matches" },
      { id: "laliga-standings",   name: "Standings" },
      { id: "laliga-top-scorers", name: "Top Scorers" },
    ],
  },
  {
    id: "champions-league",
    name: "UEFA Champions League",
    shortName: "UCL",
    country: "Europe",
    logo: "/assets/logos/leagues/ucl.png",
    subleagues: [
      { id: "ucl-matches",       name: "Matches" },
      { id: "ucl-semifinals",    name: "Semifinals" },
      { id: "ucl-final",         name: "Final" },
    ],
  },
  {
    id: "bundesliga",
    name: "Bundesliga",
    shortName: "BL",
    country: "Germany",
    logo: "/assets/logos/leagues/bundesliga.png",
    subleagues: [
      { id: "bl-matches",     name: "Matches" },
      { id: "bl-standings",   name: "Standings" },
      { id: "bl-top-scorers", name: "Top Scorers" },
    ],
  },
  {
    id: "serie-a",
    name: "Serie A",
    shortName: "SerieA",
    country: "Italy",
    logo: "/assets/logos/leagues/seriea.png",
    subleagues: [
      { id: "seriea-matches",     name: "Matches" },
      { id: "seriea-standings",   name: "Standings" },
      { id: "seriea-top-scorers", name: "Top Scorers" },
    ],
  },

  // ─── CUP COMPETITIONS ────────────────────────
  {
    id: "fa-cup",
    name: "FA Cup",
    shortName: "FA Cup",
    country: "England",
    logo: "/assets/logos/leagues/facup.png",
    subleagues: [
      { id: "facup-matches", name: "Matches" },
    ],
  },
  {
    id: "coppa-italia",
    name: "Coppa Italia",
    shortName: "Coppa",
    country: "Italy",
    logo: "/assets/logos/leagues/coppaitalia.png",
    subleagues: [
      { id: "coppa-matches", name: "Matches" },
    ],
  },
  {
    id: "dfb-pokal",
    name: "DFB-Pokal",
    shortName: "DFB",
    country: "Germany",
    logo: "/assets/logos/leagues/dfbpokal.png",
    subleagues: [
      { id: "dfb-matches", name: "Matches" },
    ],
  },

  // ─── OTHER ───────────────────────────────────
  {
    id: "nba",
    name: "NBA",
    shortName: "NBA",
    country: "USA",
    logo: "/assets/logos/leagues/nba.png",
    subleagues: [
      { id: "nba-eastern",  name: "Eastern Conference" },
      { id: "nba-western",  name: "Western Conference" },
      { id: "nba-playoffs", name: "Playoffs" },
    ],
  },
];

export const getLeagueById = (id) => leagues.find((l) => l.id === id) || null;