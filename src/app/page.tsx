import { GroupWinnerScreen } from "@/features/worldcup";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-linear-to-r from-foreground via-accent to-sky-400 bg-clip-text text-transparent">
            ⚽ 2026世界杯
          </span>
        </h1>
        <p className="mt-2 text-muted">
          小组赛
        </p>
      </header>
      <section className="rounded-2xl border border-border-strong/60 bg-surface/90 p-6 shadow-[0_0_40px_-12px_var(--accent-glow)] backdrop-blur-md md:p-8">
        <GroupWinnerScreen />
      </section>
    </main>
  );
}
