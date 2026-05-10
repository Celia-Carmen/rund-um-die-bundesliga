interface SeasonOption {
  value: string;
  label: string;
}

export function SeasonSelect({
  value,
  onChange,
  seasons,
}: {
  value: string;
  onChange: (v: string) => void;
  seasons: SeasonOption[];
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
      <span>Saison:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border-2 border-primary bg-background px-3 py-2 text-sm font-bold text-primary
  focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {seasons.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </label>
  );
}
