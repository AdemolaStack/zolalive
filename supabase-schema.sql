-- ═══════════════════════════════════════════════
-- ZOLA LIVE — Supabase Table Schema
-- Run this SQL in your Supabase SQL Editor
-- Dashboard > SQL Editor > New Query > Paste & Run
-- ═══════════════════════════════════════════════

-- Clean up old tables/policies first
DROP TABLE IF EXISTS standings CASCADE;
DROP TABLE IF EXISTS top_scorers CASCADE;

-- ─── STANDINGS TABLE ────────────────────────────
CREATE TABLE standings (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  league_id TEXT NOT NULL,
  team_name TEXT NOT NULL,
  short_name TEXT,
  position INT NOT NULL,
  played INT DEFAULT 0,
  won INT DEFAULT 0,
  drawn INT DEFAULT 0,
  lost INT DEFAULT 0,
  gf INT DEFAULT 0,
  ga INT DEFAULT 0,
  gd INT DEFAULT 0,
  points INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE standings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on standings"
  ON standings FOR SELECT USING (true);

-- ─── TOP SCORERS TABLE ─────────────────────────
CREATE TABLE IF NOT EXISTS top_scorers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  league_id TEXT NOT NULL,
  player_name TEXT NOT NULL,
  team_name TEXT NOT NULL,
  position INT NOT NULL,
  goals INT DEFAULT 0,
  assists INT DEFAULT 0,
  matches_played INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE top_scorers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on top_scorers"
  ON top_scorers FOR SELECT USING (true);


-- ═══════════════════════════════════════════════════════
--  PREMIER LEAGUE 2025-26 (as of May 5, 2026)
-- ═══════════════════════════════════════════════════════

INSERT INTO standings (league_id, team_name, short_name, position, played, won, drawn, lost, gf, ga, gd, points) VALUES
  ('premier-league', 'Arsenal',          'ARS', 1,  35, 23, 7,  5,  72, 31, 41,  76),
  ('premier-league', 'Manchester City',  'MCI', 2,  33, 21, 8,  5,  68, 31, 37,  71),
  ('premier-league', 'Manchester United', 'MUN', 3, 35, 18, 10, 7,  55, 40, 15,  64),
  ('premier-league', 'Liverpool',        'LIV', 4,  35, 17, 7,  11, 56, 44, 12,  58),
  ('premier-league', 'Aston Villa',      'AVL', 5,  35, 17, 7,  11, 50, 46, 4,   58),
  ('premier-league', 'Bournemouth',      'BOU', 6,  35, 12, 16, 7,  47, 44, 3,   52),
  ('premier-league', 'Brentford',        'BRE', 7,  35, 14, 9,  12, 52, 46, 6,   51),
  ('premier-league', 'Brighton',         'BHA', 8,  35, 13, 11, 11, 49, 42, 7,   50),
  ('premier-league', 'Everton',          'EVE', 9,  35, 13, 9,  13, 40, 40, 0,   48),
  ('premier-league', 'Chelsea',          'CHE', 10, 35, 13, 9,  13, 48, 42, 6,   48),
  ('premier-league', 'Fulham',           'FUL', 11, 35, 14, 6,  15, 42, 47, -5,  48),
  ('premier-league', 'Sunderland',       'SUN', 12, 35, 12, 11, 12, 38, 47, -9,  47),
  ('premier-league', 'Newcastle',        'NEW', 13, 35, 12, 9,  14, 44, 48, -4,  45),
  ('premier-league', 'Crystal Palace',   'CRY', 14, 35, 11, 10, 14, 40, 50, -10, 43),
  ('premier-league', 'West Ham',         'WHU', 15, 35, 11, 9,  15, 39, 48, -9,  42),
  ('premier-league', 'Nott Forest',      'NFO', 16, 35, 10, 10, 15, 38, 50, -12, 40),
  ('premier-league', 'Tottenham',        'TOT', 17, 35, 10, 8,  17, 42, 55, -13, 38),
  ('premier-league', 'Leicester',        'LEI', 18, 35, 8,  9,  18, 34, 55, -21, 33),
  ('premier-league', 'Burnley',          'BUR', 19, 35, 6,  7,  22, 28, 62, -34, 25),
  ('premier-league', 'Wolves',           'WOL', 20, 35, 5,  6,  24, 25, 68, -43, 21);

INSERT INTO top_scorers (league_id, player_name, team_name, position, goals, assists, matches_played) VALUES
  ('premier-league', 'Erling Haaland',       'Manchester City',  1, 25, 5,  31),
  ('premier-league', 'Igor Thiago',          'Brentford',        2, 22, 4,  34),
  ('premier-league', 'Antoine Semenyo',      'Bournemouth',      3, 15, 6,  33),
  ('premier-league', 'Joao Pedro',           'Chelsea',          4, 15, 5,  32),
  ('premier-league', 'Viktor Gyokeres',      'Arsenal',          5, 14, 8,  30),
  ('premier-league', 'Danny Welbeck',        'Brighton',         6, 13, 3,  34),
  ('premier-league', 'Morgan Gibbs-White',   'Nott Forest',      7, 13, 7,  33),
  ('premier-league', 'Dominic Calvert-Lewin','Leeds United',     8, 12, 4,  35),
  ('premier-league', 'Eli Junior Kroupi',    'Bournemouth',      9, 12, 5,  30),
  ('premier-league', 'Bruno Fernandes',      'Manchester United',10, 11, 10, 34);


-- ═══════════════════════════════════════════════════════
--  LA LIGA 2025-26 (as of May 5, 2026)
-- ═══════════════════════════════════════════════════════

INSERT INTO standings (league_id, team_name, short_name, position, played, won, drawn, lost, gf, ga, gd, points) VALUES
  ('la-liga', 'Barcelona',       'BAR', 1,  34, 29, 1,  4,  88, 28, 60, 88),
  ('la-liga', 'Real Madrid',     'RMA', 2,  34, 24, 5,  5,  78, 32, 46, 77),
  ('la-liga', 'Villarreal',      'VIL', 3,  34, 20, 8,  6,  62, 38, 24, 68),
  ('la-liga', 'Athletic Bilbao', 'ATH', 4,  34, 19, 8,  7,  55, 35, 20, 65),
  ('la-liga', 'Real Sociedad',   'RSO', 5,  34, 17, 9,  8,  52, 38, 14, 60),
  ('la-liga', 'Atletico Madrid', 'ATM', 6,  34, 16, 10, 8,  50, 35, 15, 58),
  ('la-liga', 'Real Betis',      'BET', 7,  34, 15, 9,  10, 48, 42, 6,  54),
  ('la-liga', 'Sevilla',         'SEV', 8,  34, 14, 8,  12, 45, 44, 1,  50),
  ('la-liga', 'Girona',          'GIR', 9,  34, 13, 8,  13, 44, 45, -1, 47),
  ('la-liga', 'Valencia',        'VAL', 10, 34, 12, 9,  13, 40, 42, -2, 45),
  ('la-liga', 'Osasuna',         'OSA', 11, 34, 12, 8,  14, 38, 45, -7, 44),
  ('la-liga', 'Alaves',          'ALA', 12, 34, 11, 8,  15, 35, 48, -13, 41),
  ('la-liga', 'Celta Vigo',      'CEL', 13, 34, 10, 9,  15, 38, 50, -12, 39),
  ('la-liga', 'Getafe',          'GET', 14, 34, 9,  11, 14, 30, 42, -12, 38),
  ('la-liga', 'Rayo Vallecano',  'RAY', 15, 34, 9,  10, 15, 35, 48, -13, 37),
  ('la-liga', 'Mallorca',        'MAL', 16, 34, 9,  9,  16, 32, 48, -16, 36),
  ('la-liga', 'Espanyol',        'ESP', 17, 34, 8,  8,  18, 30, 52, -22, 32),
  ('la-liga', 'Levante',         'LEV', 18, 34, 7,  7,  20, 28, 55, -27, 28),
  ('la-liga', 'Elche',           'ELC', 19, 34, 5,  8,  21, 24, 58, -34, 23),
  ('la-liga', 'Oviedo',          'OVI', 20, 34, 4,  6,  24, 20, 62, -42, 18);

INSERT INTO top_scorers (league_id, player_name, team_name, position, goals, assists, matches_played) VALUES
  ('la-liga', 'Kylian Mbappe',       'Real Madrid',     1, 24, 8,  33),
  ('la-liga', 'Vedat Muriqi',        'Mallorca',        2, 21, 3,  34),
  ('la-liga', 'Robert Lewandowski',  'Barcelona',       3, 18, 6,  30),
  ('la-liga', 'Raphinha',            'Barcelona',       4, 16, 10, 32),
  ('la-liga', 'Alexander Sorloth',   'Atletico Madrid', 5, 14, 5,  33),
  ('la-liga', 'Lamine Yamal',        'Barcelona',       6, 13, 12, 31),
  ('la-liga', 'Vinicius Jr',         'Real Madrid',     7, 12, 9,  28),
  ('la-liga', 'Ayoze Perez',         'Villarreal',      8, 12, 6,  34),
  ('la-liga', 'Iago Aspas',          'Celta Vigo',      9, 11, 5,  32),
  ('la-liga', 'Jude Bellingham',     'Real Madrid',     10, 10, 7,  30);


-- ═══════════════════════════════════════════════════════
--  BUNDESLIGA 2025-26 (as of May 5, 2026)
-- ═══════════════════════════════════════════════════════

INSERT INTO standings (league_id, team_name, short_name, position, played, won, drawn, lost, gf, ga, gd, points) VALUES
  ('bundesliga', 'Bayern Munich',   'BAY', 1,  32, 26, 5,  1,  92, 21, 71, 83),
  ('bundesliga', 'Borussia Dortmund','BVB', 2, 32, 20, 7,  5,  65, 32, 33, 67),
  ('bundesliga', 'RB Leipzig',      'RBL', 3,  32, 19, 5,  8,  58, 37, 21, 62),
  ('bundesliga', 'Bayer Leverkusen','LEV', 4,  32, 17, 7,  8,  55, 32, 23, 58),
  ('bundesliga', 'VfB Stuttgart',   'STU', 5,  32, 17, 7,  8,  54, 34, 20, 58),
  ('bundesliga', 'Hoffenheim',      'HOF', 6,  32, 17, 7,  8,  50, 34, 16, 58),
  ('bundesliga', 'Freiburg',        'FRE', 7,  32, 12, 8,  12, 38, 46, -8, 44),
  ('bundesliga', 'Eintracht Frankfurt','SGE',8, 32, 11, 10, 11, 42, 45, -3, 43),
  ('bundesliga', 'Augsburg',        'AUG', 9,  32, 11, 7,  14, 38, 52, -14, 40),
  ('bundesliga', 'Mainz',           'MAI', 10, 32, 9,  10, 13, 36, 45, -9, 37),
  ('bundesliga', 'Monchengladbach', 'BMG', 11, 32, 8,  11, 13, 35, 48, -13, 35),
  ('bundesliga', 'Hamburg',          'HSV', 12, 32, 8,  10, 14, 32, 47, -15, 34),
  ('bundesliga', 'Union Berlin',    'UNI', 13, 32, 8,  9,  15, 30, 50, -20, 33),
  ('bundesliga', 'Cologne',         'KOL', 14, 32, 7,  11, 14, 35, 43, -8, 32),
  ('bundesliga', 'Werder Bremen',   'BRE', 15, 32, 8,  8,  16, 32, 52, -20, 32),
  ('bundesliga', 'Wolfsburg',       'WOB', 16, 32, 6,  8,  18, 28, 53, -25, 26),
  ('bundesliga', 'St. Pauli',       'STP', 17, 32, 6,  8,  18, 25, 53, -28, 26),
  ('bundesliga', 'Heidenheim',      'HDH', 18, 32, 5,  8,  19, 22, 53, -31, 23);

INSERT INTO top_scorers (league_id, player_name, team_name, position, goals, assists, matches_played) VALUES
  ('bundesliga', 'Harry Kane',            'Bayern Munich',     1, 33, 8,  31),
  ('bundesliga', 'Deniz Undav',           'VfB Stuttgart',     2, 18, 5,  30),
  ('bundesliga', 'Patrik Schick',         'Bayer Leverkusen',  3, 16, 4,  31),
  ('bundesliga', 'Luis Diaz',             'Bayern Munich',     4, 15, 7,  29),
  ('bundesliga', 'Serhou Guirassy',       'Borussia Dortmund', 5, 15, 4,  30),
  ('bundesliga', 'Michael Olise',         'Bayern Munich',     6, 13, 12, 30),
  ('bundesliga', 'Andrej Kramaric',       'Hoffenheim',        7, 12, 6,  31),
  ('bundesliga', 'Christoph Baumgartner', 'RB Leipzig',        8, 12, 5,  30),
  ('bundesliga', 'Yan Diomande',          'RB Leipzig',        9, 12, 3,  28),
  ('bundesliga', 'Florian Wirtz',         'Bayer Leverkusen',  10, 11, 10, 29);


-- ═══════════════════════════════════════════════════════
--  SERIE A 2025-26 (as of May 4, 2026)
-- ═══════════════════════════════════════════════════════

INSERT INTO standings (league_id, team_name, short_name, position, played, won, drawn, lost, gf, ga, gd, points) VALUES
  ('serie-a', 'Inter Milan',   'INT', 1,  35, 25, 7,  3,  72, 24, 48, 82),
  ('serie-a', 'Napoli',        'NAP', 2,  35, 21, 7,  7,  58, 32, 26, 70),
  ('serie-a', 'AC Milan',      'MIL', 3,  35, 20, 7,  8,  60, 35, 25, 67),
  ('serie-a', 'Juventus',      'JUV', 4,  35, 19, 8,  8,  55, 30, 25, 65),
  ('serie-a', 'Roma',          'ROM', 5,  35, 18, 8,  9,  56, 36, 20, 62),
  ('serie-a', 'Como',          'COM', 6,  35, 18, 7,  10, 55, 38, 17, 61),
  ('serie-a', 'Atalanta',      'ATA', 7,  35, 16, 7,  12, 50, 40, 10, 55),
  ('serie-a', 'Lazio',         'LAZ', 8,  35, 13, 10, 12, 45, 42, 3,  49),
  ('serie-a', 'Bologna',       'BOL', 9,  35, 13, 10, 12, 42, 40, 2,  49),
  ('serie-a', 'Sassuolo',      'SAS', 10, 35, 13, 9,  13, 44, 44, 0,  48),
  ('serie-a', 'Udinese',       'UDI', 11, 35, 13, 8,  14, 45, 48, -3, 47),
  ('serie-a', 'Parma',         'PAR', 12, 35, 11, 9,  15, 38, 48, -10, 42),
  ('serie-a', 'Torino',        'TOR', 13, 35, 11, 8,  16, 36, 48, -12, 41),
  ('serie-a', 'Genoa',         'GEN', 14, 35, 10, 10, 15, 35, 46, -11, 40),
  ('serie-a', 'Cagliari',      'CAG', 15, 35, 9,  10, 16, 34, 50, -16, 37),
  ('serie-a', 'Fiorentina',    'FIO', 16, 35, 9,  10, 16, 32, 48, -16, 37),
  ('serie-a', 'Lecce',         'LEC', 17, 35, 8,  8,  19, 30, 55, -25, 32),
  ('serie-a', 'Cremonese',     'CRE', 18, 35, 6,  10, 19, 28, 56, -28, 28),
  ('serie-a', 'Pisa',          'PIS', 19, 35, 4,  8,  23, 22, 62, -40, 20),
  ('serie-a', 'Hellas Verona', 'VER', 20, 35, 3,  9,  23, 20, 60, -40, 18);

INSERT INTO top_scorers (league_id, player_name, team_name, position, goals, assists, matches_played) VALUES
  ('serie-a', 'Lautaro Martinez', 'Inter Milan', 1, 16, 6,  33),
  ('serie-a', 'Nico Paz',         'Como',        2, 12, 8,  34),
  ('serie-a', 'Marcus Thuram',    'Inter Milan', 3, 11, 7,  32),
  ('serie-a', 'Anastasios Douvikas','Como',      4, 11, 3,  33),
  ('serie-a', 'Nikola Krstovic',  'Atalanta',    5, 10, 4,  30),
  ('serie-a', 'Kenan Yildiz',     'Juventus',    6, 10, 6,  31),
  ('serie-a', 'Rasmus Hojlund',   'Napoli',      7, 10, 3,  28),
  ('serie-a', 'Keinan Davis',     'Udinese',     8, 10, 2,  34),
  ('serie-a', 'Donyell Malen',    'Roma',        9, 10, 5,  30),
  ('serie-a', 'Paulo Dybala',     'Roma',        10, 9, 8,  29);
