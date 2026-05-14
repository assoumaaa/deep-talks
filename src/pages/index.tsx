import Button from "~/components/Button";

export default function Home() {
  return (
    <main className="relative flex h-screenWithNav w-screen items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-x-0 top-1/2 -z-10 mx-auto h-[60vh] w-[80vw] -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

      <div className="flex w-full max-w-3xl flex-col items-center gap-10 text-center animate-floatIn">
        <span className="rounded-full border border-line bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted">
          Conversations, deepened
        </span>

        <h1 className="font-display text-[2.5rem] leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-7xl lg:text-8xl">
          Talk <span className="italic text-primary">together</span>,
          <br />
          bond <span className="italic text-secondary">together</span>,
          <br />
          thrive <span className="italic text-primary">forever</span>.
        </h1>

        <p className="max-w-lg text-sm leading-relaxed text-muted md:text-lg">
          Curated prompts that turn small talk into the kind of conversation
          you&apos;ll remember tomorrow.
        </p>

        <Button href="/players" title="Get started" fontSize="text-base" />
      </div>
    </main>
  );
}
