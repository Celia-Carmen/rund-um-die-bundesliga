import { useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, ListChecks, BarChart3, History, Users } from "lucide-react";
import {
  getLeague, getUpcomingMatches, getResults, getStandings,
  SEASONS, LEAGUES, type LeagueId,
} from "@/data/leagues";
import { MatchCard, ResultCard } from "@/components/MatchCard";
import { StandingsTable } from "@/components/StandingsTable";
import { SeasonSelect } from "@/components/SeasonSelect";
import { TeamPicker } from "@/components/TeamPicker";

export const Route = createFileRoute("/liga/$ligaId")({
  parseParams: (params) => {
    const ids = LEAGUES.map((l) => l.id);
    if (!ids.includes(params.ligaId as LeagueId)) throw notFound();
    return { ligaId: params.ligaId as LeagueId };
  },
  head: ({ params }) => {
    const l = getLeague(params.ligaId as LeagueId);
    return {
      meta: [
        { title: `${l?.name} – Spielplan, Ergebnisse & Tabelle` },
        { name: "description", content: `${l?.name}: aktuelle Spiele, Ergebnisse, Tabelle und Historie der letzten 10 Jahre.` },
      ],
    };
  },
  component: LigaPage,
  notFoundComponent: () => (
    <div className="p-8 text-center">
      <p>Liga nicht gefunden.</p>
      <Link to="/" className="text-primary underline">Zur Startseite</Link>
    </div>
  ),
});

type Tab = "spiele" | "ergebnisse" | "tabelle" | "historie" | "teams";

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "spiele", label: "Spiele", icon: CalendarDays },
  { id: "ergebnisse", label: "Ergebnisse", icon: ListChecks },
  { id: "tabelle", label: "Tabelle", icon: BarChart3 },
  { id: "historie", label: "Historie", icon: History },
  { id: "teams", label: "Teams", icon: Users },
];

function LigaPage() {
  const { ligaId } = Route.useParams();
  const league = getLeague(ligaId)!;
  const [tab, setTab] = useState<Tab>("spiele");
  const [season, setSeason] = useState<string>(SEASONS[0]);

  const upcoming = getUpcomingMatches(ligaId);
  const results = getResults(ligaId);
  const standings = getStandings(ligaId, SEASONS[0]);
  const historyStandings = getStandings(ligaId, season);

  return (
    <main className="mx-auto max-w-6xl px-4 pb-12">
      <Link to="/" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" /> Alle Ligen
      </Link>

      <header className="mt-2 rounded-2xl bg-hero p-6 text-primary-foreground shadow-elevated">
        <h1 className="font-display text-3xl font-extrabold md:text-4xl">{league.name}</h1>
        <p className="mt-1 text-sm text-white/90">{league.tagline}</p>
      </header>

      <div className="sticky top-[60px] z-30 -mx-4 mt-4 overflow-x-auto bg-background/95 px-4 py-2 backdrop-blur">
        <div className="flex gap-1.5">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground shadow-card"
                    : "bg-secondary text-foreground/70 hover:bg-accent hover:text-primary"
                }`}
              >
                <Icon className="h-4 w-4" /> {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <section className="mt-5">
        {tab === "spiele" && (
          <>
            <h2 className="mb-3 font-display text-xl font-bold text-foreground">Aktuelle Spiele</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {upcoming.slice(0, 12).map((m) => <MatchCard key={m.id} match={m} />)}
            </div>
          </>
        )}

        {tab === "ergebnisse" && (
          <>
            <h2 className="mb-3 font-display text-xl font-bold text-foreground">Ergebnisse</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {results.slice(0, 12).map((m) => <ResultCard key={m.id} match={m} />)}
            </div>
          </>
        )}

        {tab === "tabelle" && (
          <>
            <h2 className="mb-3 font-display text-xl font-bold text-foreground">Aktuelle Tabelle · {SEASONS[0]}</h2>
            <StandingsTable rows={standings} />
          </>
        )}

        {tab === "historie" && (
          <>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-xl font-bold text-foreground">Tabellenhistorie</h2>
              <SeasonSelect value={season} onChange={setSeason} />
            </div>
            <StandingsTable rows={historyStandings} />
          </>
        )}

        {tab === "teams" && (
          <>
            <h2 className="mb-3 font-display text-xl font-bold text-foreground">Mannschaft & Spielplan</h2>
            <TeamPicker leagueId={ligaId} />
          </>
        )}
      </section>
    </main>
  );
}
