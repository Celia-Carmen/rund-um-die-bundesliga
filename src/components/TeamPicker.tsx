import { useState } from "react";
import { Users, ChevronDown, Shield, Calendar, Clock, Tv, Home, Plane } from "lucide-react";
import type { Team, Match } from "@/data/leagues";
import { formatDate, formatTime, formatWeekday } from "@/lib/format";

interface TeamPickerProps {
  teams: Team[];
  upcoming: Match[];
}

export function TeamPicker({ teams, upcoming }: TeamPickerProps) {
  const [teamId, setTeamId] = useState<string>("");
  const [open, setOpen] = useState(false);

  const team = teams.find((t) => t.id === teamId);
  const matches = teamId ? upcoming.filter((m) => m.homeTeamId === teamId || m.awayTeamId === teamId) : [];

  return (
    <div className="space-y-4">
      <div className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-xl bg-primary px-5 py-4 text-base font-bold
  text-primary-foreground shadow-card hover:bg-primary-glow transition-colors"
        >
          <span className="inline-flex items-center gap-2">
            <Users className="h-5 w-5" /> Mannschaft auswählen
          </span>
          <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div
            className="absolute z-20 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-border
  bg-popover p-1 shadow-elevated"
          >
            {teams.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTeamId(t.id);
                  setOpen(false);
                }}
                className="block w-full rounded-md px-3 py-2.5 text-left text-sm font-medium text-foreground
  hover:bg-accent hover:text-primary"
              >
                {t.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {team && (
        <section className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="mb-4 flex items-center gap-3">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full bg-primary
  text-primary-foreground"
            >
              <Shield className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-foreground">{team.name}</h3>
              <p className="text-xs text-muted-foreground">Nächste Spiele</p>
            </div>
          </div>
          {matches.length === 0 ? (
            <p className="text-sm text-muted-foreground">Keine kommenden Spiele gefunden.</p>
          ) : (
            <ul className="space-y-2">
              {matches.slice(0, 8).map((m) => {
                const isHome = m.homeTeamId === team.id;
                const opp = teams.find((t) => t.id === (isHome ? m.awayTeamId : m.homeTeamId));
                return (
                  <li key={m.id} className="rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs
  font-bold ${isHome ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"}`}
                        >
                          {isHome ? <Home className="h-3.5 w-3.5" /> : <Plane className="h-3.5 w-3.5" />}
                        </span>
                        <span className="font-semibold text-foreground">{opp?.shortName ?? opp?.name ?? "–"}</span>
                      </div>
                      <span className="text-xs font-semibold text-primary">{formatWeekday(m.date)}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-primary" />
                        {formatDate(m.date)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3 text-primary" />
                        {formatTime(m.date)}
                      </span>
                      {m.broadcaster && (
                        <span className="inline-flex items-center gap-1">
                          <Tv
                            className="h-3 w-3
  text-primary"
                          />
                          {m.broadcaster}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
