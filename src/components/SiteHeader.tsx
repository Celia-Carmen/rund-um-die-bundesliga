import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Trophy } from "lucide-react";

const NAV = [
  { to: "/", label: "Start" },
  { to: "/liga/bl1", label: "1. Bundesliga" },
  { to: "/liga/bl2", label: "2. Bundesliga" },
  { to: "/liga/bl3", label: "3. Liga" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-primary">
          <Trophy className="h-6 w-6" />
          <span>BundesligaLive</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-primary"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold bg-accent text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-primary hover:bg-accent"
          aria-label="Menü öffnen"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/80 hover:bg-accent hover:text-primary"
                activeProps={{ className: "rounded-md px-3 py-3 text-base font-semibold bg-accent text-primary" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
