import { Link } from "@tanstack/react-router";
import { Terminal } from "lucide-react";
import { CATEGORIES, TOOLS } from "@/lib/tools";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Terminal className="size-4" aria-hidden />
            </span>
            DevToolkit
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Free Developer Tools — fast, private and browser-based utilities for everyday
            development work.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold">Site</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {[
              { to: "/", label: "Home" },
              { to: "/tools", label: "Tools" },
              { to: "/categories", label: "Categories" },
              { to: "/about", label: "About" },
              { to: "/privacy", label: "Privacy" },
              { to: "/terms", label: "Terms" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Categories">
          <h2 className="text-sm font-semibold">Categories</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link
                  to="/tools"
                  search={{ category: c }}
                  className="transition-colors hover:text-foreground"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Popular tools">
          <h2 className="text-sm font-semibold">Popular tools</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {TOOLS.filter((t) => t.popular).map((t) => (
              <li key={t.slug}>
                <Link
                  to="/tools/$slug"
                  params={{ slug: t.slug }}
                  className="transition-colors hover:text-foreground"
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground">
          © 2026 DevToolkit
        </p>
      </div>
    </footer>
  );
}
