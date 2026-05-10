import type { StandingRow, Team } from "@/data/leagues";

export function StandingsTable({ rows, teams }: { rows: StandingRow[]; teams: Team[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-primary text-primary-foreground">
            <th className="px-2 py-2 text-left font-semibold">#</th>
            <th className="px-2 py-2 text-left font-semibold">Verein</th>
            <th className="px-2 py-2 text-center font-semibold">Sp</th>
            <th className="px-2 py-2 text-center font-semibold">S</th>
            <th className="px-2 py-2 text-center font-semibold">U</th>
            <th className="px-2 py-2 text-center font-semibold">N</th>
            <th className="px-2 py-2 text-center font-semibold">Tore</th>
            <th className="px-2 py-2 text-center font-semibold">Diff</th>
            <th className="px-2 py-2 text-center font-semibold">Pkt</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const t = teams.find((team) => team.id === r.teamId);
            const diff = r.goalsFor - r.goalsAgainst;
            return (
              <tr key={r.teamId} className="border-t border-border even:bg-secondary/40">
                <td className="px-2 py-2 font-bold text-primary">{r.position}</td>
                <td className="px-2 py-2 font-medium text-foreground whitespace-nowrap">
                  {t?.shortName ?? t?.name ?? "–"}
                </td>
                <td className="px-2 py-2 text-center tabular-nums">{r.played}</td>
                <td className="px-2 py-2 text-center tabular-nums">{r.wins}</td>
                <td className="px-2 py-2 text-center tabular-nums">{r.draws}</td>
                <td className="px-2 py-2 text-center tabular-nums">{r.losses}</td>
                <td
                  className="px-2 py-2 text-center tabular-nums
  whitespace-nowrap"
                >
                  {r.goalsFor}:{r.goalsAgainst}
                </td>
                <td className="px-2 py-2 text-center tabular-nums">{diff > 0 ? `+${diff}` : diff}</td>
                <td className="px-2 py-2 text-center font-extrabold text-primary tabular-nums">{r.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
