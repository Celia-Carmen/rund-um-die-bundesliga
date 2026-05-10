import { Calendar, Clock, MapPin, Tv } from "lucide-react";
import type { Match, Team } from "@/data/leagues";
import { formatDate, formatTime, formatWeekday } from "@/lib/format";

export function MatchCard({ match, teams }: { match: Match; teams: Team[] }) {
  const home = teams.find((t) => t.id === match.homeTeamId);
  const away = teams.find((t) => t.id === match.awayTeamId);
  return (
    <article
      className="rounded-xl border border-border bg-card p-4 shadow-card transition-shadow
  hover:shadow-elevated"
    >
      <div
        className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wider
  text-muted-foreground"
      >
        <span>Spieltag {match.matchday}</span>
        <span className="text-primary">{formatWeekday(match.date)}</span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 text-right">
          <div className="text-base font-bold text-foreground">{home?.shortName ?? home?.name ?? "–"}</div>
        </div>
        <div
          className="flex h-10 min-w-14 items-center justify-center rounded-md bg-primary px-3 text-sm font-bold
  text-primary-foreground"
        >
          vs
        </div>
        <div className="flex-1">
          <div className="text-base font-bold text-foreground">{away?.shortName ?? away?.name ?? "–"}</div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-primary" />
          {formatDate(match.date)}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-primary" />
          {formatTime(match.date)}
        </div>
        {match.stadium && (
          <div className="flex items-center gap-1.5 col-span-2">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {match.stadium}
          </div>
        )}
        {match.broadcaster && (
          <div className="flex items-center gap-1.5 col-span-2">
            <Tv className="h-3.5 w-3.5 text-primary" />
            {match.broadcaster}
          </div>
        )}
      </div>
    </article>
  );
}

export function ResultCard({ match, teams }: { match: Match; teams: Team[] }) {
  const home = teams.find((t) => t.id === match.homeTeamId);
  const away = teams.find((t) => t.id === match.awayTeamId);
  return (
    <article className="rounded-xl border border-border bg-card p-4 shadow-card">
      <div
        className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider
  text-muted-foreground"
      >
        <span>Spieltag {match.matchday}</span>
        <span>{formatDate(match.date)}</span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 text-right text-base font-bold text-foreground">
          {home?.shortName ?? home?.name ?? "–"}
        </div>
        <div
          className="flex h-11 min-w-20 items-center justify-center rounded-md bg-primary px-3 text-base
  font-extrabold text-primary-foreground tabular-nums"
        >
          {match.homeScore} : {match.awayScore}
        </div>
        <div className="flex-1 text-base font-bold text-foreground">{away?.shortName ?? away?.name ?? "–"}</div>
      </div>
    </article>
  );
}
