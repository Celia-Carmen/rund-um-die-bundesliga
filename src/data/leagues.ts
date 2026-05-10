// Mock data for Bundesliga leagues. Designed to be replaceable by a real API later.

export type LeagueId = "bl1" | "bl2" | "bl3";

export interface League {
  id: LeagueId;
  name: string;
  shortName: string;
  tagline: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  leagueId: LeagueId;
}

export interface Match {
  id: string;
  leagueId: LeagueId;
  matchday: number;
  homeTeamId: string;
  awayTeamId: string;
  date: string; // ISO
  stadium?: string;
  broadcaster?: string;
  homeScore?: number;
  awayScore?: number;
  status: "scheduled" | "finished";
}

export interface StandingRow {
  position: number;
  teamId: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface SeasonStandings {
  season: string; // "2024/25"
  leagueId: LeagueId;
  rows: StandingRow[];
}

export const LEAGUES: League[] = [
  { id: "bl1", name: "1. Bundesliga", shortName: "Bundesliga", tagline: "Deutschlands höchste Spielklasse" },
  { id: "bl2", name: "2. Bundesliga", shortName: "2. Liga", tagline: "Spannung & Aufstiegskampf" },
  { id: "bl3", name: "3. Liga", shortName: "3. Liga", tagline: "Tradition & Leidenschaft" },
];

export const TEAMS: Team[] = [
  // 1. Bundesliga
  { id: "bay", name: "FC Bayern München", shortName: "Bayern", leagueId: "bl1" },
  { id: "bvb", name: "Borussia Dortmund", shortName: "BVB", leagueId: "bl1" },
  { id: "rbl", name: "RB Leipzig", shortName: "Leipzig", leagueId: "bl1" },
  { id: "b04", name: "Bayer 04 Leverkusen", shortName: "Leverkusen", leagueId: "bl1" },
  { id: "sge", name: "Eintracht Frankfurt", shortName: "Frankfurt", leagueId: "bl1" },
  { id: "vfb", name: "VfB Stuttgart", shortName: "Stuttgart", leagueId: "bl1" },
  { id: "bmg", name: "Borussia Mönchengladbach", shortName: "Gladbach", leagueId: "bl1" },
  { id: "wob", name: "VfL Wolfsburg", shortName: "Wolfsburg", leagueId: "bl1" },
  { id: "fcu", name: "Union Berlin", shortName: "Union", leagueId: "bl1" },
  { id: "svw", name: "Werder Bremen", shortName: "Bremen", leagueId: "bl1" },
  { id: "fcs", name: "FC St. Pauli", shortName: "St. Pauli", leagueId: "bl1" },
  { id: "hsv", name: "Hamburger SV", shortName: "HSV", leagueId: "bl1" },
  { id: "tsg", name: "TSG Hoffenheim", shortName: "Hoffenheim", leagueId: "bl1" },
  { id: "fcA", name: "FC Augsburg", shortName: "Augsburg", leagueId: "bl1" },
  { id: "scf", name: "SC Freiburg", shortName: "Freiburg", leagueId: "bl1" },
  { id: "m05", name: "1. FSV Mainz 05", shortName: "Mainz", leagueId: "bl1" },
  { id: "koe", name: "1. FC Köln", shortName: "Köln", leagueId: "bl1" },
  { id: "hdh", name: "1. FC Heidenheim", shortName: "Heidenheim", leagueId: "bl1" },

  // 2. Bundesliga
  { id: "s04", name: "FC Schalke 04", shortName: "Schalke", leagueId: "bl2" },
  { id: "h96", name: "Hannover 96", shortName: "Hannover", leagueId: "bl2" },
  { id: "f95", name: "Fortuna Düsseldorf", shortName: "Düsseldorf", leagueId: "bl2" },
  { id: "kar", name: "Karlsruher SC", shortName: "KSC", leagueId: "bl2" },
  { id: "n90", name: "1. FC Nürnberg", shortName: "Nürnberg", leagueId: "bl2" },
  { id: "kai", name: "1. FC Kaiserslautern", shortName: "Lautern", leagueId: "bl2" },
  { id: "her", name: "Hertha BSC", shortName: "Hertha", leagueId: "bl2" },
  { id: "pad", name: "SC Paderborn", shortName: "Paderborn", leagueId: "bl2" },
  { id: "mag", name: "1. FC Magdeburg", shortName: "Magdeburg", leagueId: "bl2" },
  { id: "bra", name: "Eintracht Braunschweig", shortName: "Braunschweig", leagueId: "bl2" },
  { id: "elv", name: "SV Elversberg", shortName: "Elversberg", leagueId: "bl2" },
  { id: "dar", name: "SV Darmstadt 98", shortName: "Darmstadt", leagueId: "bl2" },
  { id: "pre", name: "Preußen Münster", shortName: "Münster", leagueId: "bl2" },
  { id: "ula", name: "SSV Ulm 1846", shortName: "Ulm", leagueId: "bl2" },
  { id: "gre", name: "SV Greuther Fürth", shortName: "Fürth", leagueId: "bl2" },
  { id: "hro", name: "Hansa Rostock", shortName: "Rostock", leagueId: "bl2" },
  { id: "reg", name: "Jahn Regensburg", shortName: "Regensburg", leagueId: "bl2" },
  { id: "sgd", name: "Dynamo Dresden", shortName: "Dynamo", leagueId: "bl2" },

  // 3. Liga
  { id: "ssv", name: "SSV Jahn Regensburg", shortName: "Jahn", leagueId: "bl3" },
  { id: "vea", name: "Viktoria Aschaffenburg", shortName: "Aschaffenburg", leagueId: "bl3" },
  { id: "sat", name: "SV Sandhausen", shortName: "Sandhausen", leagueId: "bl3" },
  { id: "tsv", name: "TSV 1860 München", shortName: "1860", leagueId: "bl3" },
  { id: "wal", name: "SV Waldhof Mannheim", shortName: "Waldhof", leagueId: "bl3" },
  { id: "sve", name: "SC Verl", shortName: "Verl", leagueId: "bl3" },
  { id: "bie", name: "Arminia Bielefeld", shortName: "Bielefeld", leagueId: "bl3" },
  { id: "vfl", name: "VfL Osnabrück", shortName: "Osnabrück", leagueId: "bl3" },
  { id: "ess", name: "Rot-Weiss Essen", shortName: "Essen", leagueId: "bl3" },
  { id: "aal", name: "VfR Aalen", shortName: "Aalen", leagueId: "bl3" },
  { id: "ing", name: "FC Ingolstadt 04", shortName: "Ingolstadt", leagueId: "bl3" },
  { id: "ulu", name: "FC Energie Cottbus", shortName: "Cottbus", leagueId: "bl3" },
  { id: "saa", name: "1. FC Saarbrücken", shortName: "Saarbrücken", leagueId: "bl3" },
  { id: "vik", name: "FC Viktoria Köln", shortName: "Viktoria Köln", leagueId: "bl3" },
  { id: "haf", name: "Hallescher FC", shortName: "Halle", leagueId: "bl3" },
  { id: "stu", name: "Stuttgarter Kickers", shortName: "Kickers", leagueId: "bl3" },
  { id: "wie", name: "SV Wehen Wiesbaden", shortName: "Wiesbaden", leagueId: "bl3" },
  { id: "mep", name: "SV Meppen", shortName: "Meppen", leagueId: "bl3" },
];

const BROADCASTERS = ["Sky", "DAZN", "Sport1", "MagentaSport", "ARD", "ZDF"];
const STADIUMS: Record<string, string> = {
  bay: "Allianz Arena", bvb: "Signal Iduna Park", rbl: "Red Bull Arena",
  b04: "BayArena", sge: "Deutsche Bank Park", vfb: "MHPArena",
  s04: "Veltins-Arena", h96: "Heinz-von-Heiden-Arena", hsv: "Volksparkstadion",
};

function teamsByLeague(leagueId: LeagueId): Team[] {
  return TEAMS.filter((t) => t.leagueId === leagueId);
}

function generateMatches(leagueId: LeagueId): Match[] {
  const teams = teamsByLeague(leagueId);
  const matches: Match[] = [];
  const today = new Date();
  let id = 0;

  // Past results — last 6 matchdays
  for (let md = 1; md <= 6; md++) {
    const dayOffset = -((7 - md) * 7);
    for (let i = 0; i < Math.floor(teams.length / 2); i++) {
      const home = teams[(i + md) % teams.length];
      const away = teams[(teams.length - 1 - i + md) % teams.length];
      if (home.id === away.id) continue;
      const date = new Date(today);
      date.setDate(today.getDate() + dayOffset + (i % 2));
      date.setHours(15 + (i % 4), 30, 0, 0);
      matches.push({
        id: `${leagueId}-m-${id++}`,
        leagueId,
        matchday: md,
        homeTeamId: home.id,
        awayTeamId: away.id,
        date: date.toISOString(),
        stadium: STADIUMS[home.id],
        broadcaster: BROADCASTERS[id % BROADCASTERS.length],
        homeScore: Math.floor(Math.random() * 4),
        awayScore: Math.floor(Math.random() * 4),
        status: "finished",
      });
    }
  }

  // Upcoming — next 4 matchdays
  for (let md = 7; md <= 10; md++) {
    const dayOffset = (md - 6) * 7;
    for (let i = 0; i < Math.floor(teams.length / 2); i++) {
      const home = teams[(i + md) % teams.length];
      const away = teams[(teams.length - 1 - i + md) % teams.length];
      if (home.id === away.id) continue;
      const date = new Date(today);
      date.setDate(today.getDate() + dayOffset + (i % 3));
      date.setHours(15 + (i % 4), 30, 0, 0);
      matches.push({
        id: `${leagueId}-m-${id++}`,
        leagueId,
        matchday: md,
        homeTeamId: home.id,
        awayTeamId: away.id,
        date: date.toISOString(),
        stadium: STADIUMS[home.id],
        broadcaster: BROADCASTERS[id % BROADCASTERS.length],
        status: "scheduled",
      });
    }
  }

  return matches;
}

export const MATCHES: Match[] = [
  ...generateMatches("bl1"),
  ...generateMatches("bl2"),
  ...generateMatches("bl3"),
];

function generateStandings(leagueId: LeagueId, seed: number): StandingRow[] {
  const teams = teamsByLeague(leagueId);
  const rows = teams.map((t, i) => {
    const wins = Math.max(2, 18 - i - (seed % 3));
    const draws = 4 + ((i + seed) % 5);
    const losses = Math.max(0, 30 - wins - draws);
    const gf = 30 + wins * 2 - i;
    const ga = 15 + losses * 2;
    return {
      position: 0,
      teamId: t.id,
      played: wins + draws + losses,
      wins, draws, losses,
      goalsFor: gf,
      goalsAgainst: ga,
      points: wins * 3 + draws,
    };
  });
  rows.sort((a, b) => b.points - a.points || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst));
  rows.forEach((r, i) => (r.position = i + 1));
  return rows;
}

function buildSeasons(): string[] {
  const current = new Date().getFullYear();
  const list: string[] = [`${current}/${String(current + 1).slice(2)}`];
  for (let i = 1; i <= 10; i++) {
    list.push(`${current - i}/${String(current - i + 1).slice(2)}`);
  }
  return list;
}

export const SEASONS: string[] = buildSeasons();

export const STANDINGS: SeasonStandings[] = SEASONS.flatMap((season, seedIdx) =>
  (["bl1", "bl2", "bl3"] as LeagueId[]).map((lid) => ({
    season,
    leagueId: lid,
    rows: generateStandings(lid, seedIdx),
  }))
);

// ---- Selectors (API-shaped) ----
export function getLeague(id: LeagueId): League | undefined {
  return LEAGUES.find((l) => l.id === id);
}
export function getTeam(id: string): Team | undefined {
  return TEAMS.find((t) => t.id === id);
}
export function getTeamsByLeague(leagueId: LeagueId): Team[] {
  return teamsByLeague(leagueId);
}
export function getUpcomingMatches(leagueId: LeagueId): Match[] {
  return MATCHES.filter((m) => m.leagueId === leagueId && m.status === "scheduled")
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));
}
export function getResults(leagueId: LeagueId): Match[] {
  return MATCHES.filter((m) => m.leagueId === leagueId && m.status === "finished")
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
export function getStandings(leagueId: LeagueId, season: string): StandingRow[] {
  return STANDINGS.find((s) => s.leagueId === leagueId && s.season === season)?.rows ?? [];
}
export function getTeamUpcoming(teamId: string): Match[] {
  return MATCHES.filter(
    (m) => m.status === "scheduled" && (m.homeTeamId === teamId || m.awayTeamId === teamId)
  ).sort((a, b) => +new Date(a.date) - +new Date(b.date));
}
