import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Trophy, Calendar, BarChart3 } from "lucide-react";
import { LEAGUES } from "@/data/leagues";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BundesligaLive – Spielplan & Ergebnisse" },
      { name: "description", content: "Alle Spiele, Ergebnisse und Tabellen der 1., 2. und 3. Bundesliga auf einen Blick." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-12">
      <section className="mt-6 overflow-hidden rounded-2xl bg-hero p-6 text-primary-foreground shadow-elevated md:p-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
          <Trophy className="h-3.5 w-3.5" /> Saison 2025/26
        </div>
        <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight md:text-5xl">
          Bundesliga Spielplan & Ergebnisse
        </h1>
        <p className="mt-3 max-w-xl text-sm text-white/90 md:text-base">
          Alle Spiele, Ergebnisse und Tabellen der 1. Bundesliga, 2. Bundesliga und 3. Liga auf einen Blick.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5"><Calendar className="h-3.5 w-3.5" /> Spielpläne</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5"><BarChart3 className="h-3.5 w-3.5" /> Live-Tabellen</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5"><Trophy className="h-3.5 w-3.5" /> 10 Saisons Historie</span>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 font-display text-xl font-bold text-foreground">Liga auswählen</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {LEAGUES.map((l, idx) => (
            <Link
              key={l.id}
              to="/liga/$ligaId"
              params={{ ligaId: l.id }}
              className="group block rounded-2xl border-2 border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary hover:shadow-elevated"
            >
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-display text-xl font-extrabold">
                {idx + 1}
              </div>
              <h3 className="font-display text-2xl font-extrabold text-foreground">{l.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{l.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                Zur Liga <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
