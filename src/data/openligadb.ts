import type { LeagueId, Team, Match, StandingRow } from "./leagues";

const BASE = "https://api.openligadb.de";

export const CURRENT_SEASON = "2025";

export const OL_SEASONS = ["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"];

export function seasonLabel(year: string): string {
  const y = parseInt(year, 10);
  return `${y}/${String(y + 1).slice(2)}`;
}

interface OLTeam {
  TeamId: number;
  TeamName: string;
  ShortName: string;
}

interface OLTableRow {
  Goals: number;
  OpponentGoals: number;
  Points: number;
  Matches: number;
  Won: number;
  Lost: number;
  Draw: number;
  TeamInfoId: number;
  ShortName: string;
  TeamName: string;
}

interface OLResult {
  PointsTeam1: number;
  PointsTeam2: number;
  ResultOrderID: number;
  ResultTypeID: number;
}

interface OLMatch {
  MatchID: number;
  MatchDateTimeUTC: string;
  Group: { GroupOrderID: number };
  Team1: OLTeam;
  Team2: OLTeam;
  MatchIsFinished: boolean;
  MatchResults: OLResult[];
}

export async function fetchTeams(leagueId: LeagueId, season: string): Promise<Team[]> {
  const res = await fetch(`${BASE}/getavailableteams/${leagueId}/${season}`);
  if (!res.ok) return [];
  const data: OLTeam[] = await res.json();
  return data.map((t) => ({
    id: String(t.TeamId),
    name: t.TeamName,
    shortName: t.ShortName || t.TeamName,
    leagueId,
  }));
}

export async function fetchMatches(
  leagueId: LeagueId,
  season: string,
): Promise<{ upcoming: Match[]; results: Match[] }> {
  const res = await fetch(`${BASE}/getmatchdata/${leagueId}/${season}`);
  if (!res.ok) return { upcoming: [], results: [] };
  const data: OLMatch[] = await res.json();

  const matches: Match[] = data.map((m) => {
    const finalResult =
      m.MatchResults?.find((r) => r.ResultTypeID === 2) ??
      m.MatchResults?.sort((a, b) => b.ResultOrderID - a.ResultOrderID)[0];
    return {
      id: String(m.MatchID),
      leagueId,
      matchday: m.Group.GroupOrderID,
      homeTeamId: String(m.Team1.TeamId),
      awayTeamId: String(m.Team2.TeamId),
      date: m.MatchDateTimeUTC,
      status: m.MatchIsFinished ? "finished" : "scheduled",
      homeScore: finalResult?.PointsTeam1,
      awayScore: finalResult?.PointsTeam2,
    };
  });

  const upcoming = matches
    .filter((m) => m.status === "scheduled")
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));

  const results = matches.filter((m) => m.status === "finished").sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return { upcoming, results };
}

export async function fetchStandings(leagueId: LeagueId, season: string): Promise<StandingRow[]> {
  const res = await fetch(`${BASE}/getbltable/${leagueId}/${season}`);
  if (!res.ok) return [];
  const data: OLTableRow[] = await res.json();
  return data.map((row, i) => ({
    position: i + 1,
    teamId: String(row.TeamInfoId),
    played: row.Matches,
    wins: row.Won,
    draws: row.Draw,
    losses: row.Lost,
    goalsFor: row.Goals,
    goalsAgainst: row.OpponentGoals,
    points: row.Points,
  }));
}
