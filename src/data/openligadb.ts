// OpenLigaDB API Client
// Docs: https://www.openligadb.de/

const BASE_URL = "https://api.openligadb.de";

export type OpenLigaTeam = {
  teamId: number;
  teamName: string;
  shortName?: string;
  teamIconUrl?: string;
};

export type OpenLigaMatchResult = {
  resultID: number;
  pointsTeam1: number;
  pointsTeam2: number;
  resultName: string;
  resultOrderID: number;
  resultTypeID: number;
  resultDescription?: string;
};

export type OpenLigaMatch = {
  matchID: number;
  matchDateTime: string;
  timeZoneID: string;
  leagueId: number;
  leagueName: string;
  leagueSeason: number;
  leagueShortcut: string;
  matchDateTimeUTC: string;
  group: {
    groupName: string;
    groupOrderID: number;
    groupID: number;
  };
  team1: OpenLigaTeam;
  team2: OpenLigaTeam;
  lastUpdateDateTime: string;
  matchIsFinished: boolean;
  matchResults: OpenLigaMatchResult[];
  location?: {
    locationCity?: string;
    locationStadium?: string;
  } | null;
  numberOfViewers?: number | null;
};

export type OpenLigaStandingRow = {
  teamInfoId: number;
  teamName: string;
  shortName?: string;
  teamIconUrl?: string;
  points: number;
  opponentGoals: number;
  goals: number;
  matches: number;
  won: number;
  lost: number;
  draw: number;
  goalDiff: number;
};

// League shortcuts used by OpenLigaDB
export const LEAGUE_SHORTCUTS = {
  bl1: "bl1", // 1. Bundesliga
  bl2: "bl2", // 2. Bundesliga
  bl3: "bl3", // 3. Liga
} as const;

export type LeagueShortcut = (typeof LEAGUE_SHORTCUTS)[keyof typeof LEAGUE_SHORTCUTS];

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`OpenLigaDB request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

/** All matches for a league + season (e.g. "bl1", 2024). */
export function getMatchdata(league: LeagueShortcut, season: number) {
  return fetchJson<OpenLigaMatch[]>(`/getmatchdata/${league}/${season}`);
}

/** All matches for a specific matchday. */
export function getMatchdataByGroup(
  league: LeagueShortcut,
  season: number,
  groupOrderId: number,
) {
  return fetchJson<OpenLigaMatch[]>(
    `/getmatchdata/${league}/${season}/${groupOrderId}`,
  );
}

/** Current matchday's matches. */
export function getCurrentMatchday(league: LeagueShortcut) {
  return fetchJson<OpenLigaMatch[]>(`/getmatchdata/${league}`);
}

/** Standings table for a league + season. */
export function getStandings(league: LeagueShortcut, season: number) {
  return fetchJson<OpenLigaStandingRow[]>(`/getbltable/${league}/${season}`);
}

/** All teams competing in a league + season. */
export function getAvailableTeams(league: LeagueShortcut, season: number) {
  return fetchJson<OpenLigaTeam[]>(`/getavailableteams/${league}/${season}`);
}

/** Next match for a given league. */
export function getNextMatch(league: LeagueShortcut) {
  return fetchJson<OpenLigaMatch>(`/getnextmatch/${league}`);
}

/** Last change timestamp — useful for caching. */
export function getLastChangeDate(league: LeagueShortcut, season: number) {
  return fetchJson<string>(`/getlastchangedate/${league}/${season}`);
}
