import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageOpener } from "@/components/site/page-shell";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Luxury Decora Interiors, Miami" },
      {
        name: "description",
        content:
          "Residential and commercial interiors by Luxury Decora — warm, restrained spaces across Miami and South Florida.",
      },
      { property: "og:title", content: "Projects — Luxury Decora" },
      { property: "og:description", content: "Selected residential and commercial interiors." },
    ],
  }),
  component: Projects,
});

const filters = ["All", "Residential", "Commercial"] as const;

function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shown = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <PageShell>
      <PageOpener
        eyebrow="(Projects)"
        title={
          <>
            Rooms that
            <br />
            <em className="italic">stay with you</em>
          </>
        }
      />

      <section className="px-6 md:px-10">
        <div className="flex gap-8 border-t border-ink/10 py-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`eyebrow transition-opacity ${
                filter === f ? "text-ink" : "text-stone/60 hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
          <span className="eyebrow ml-auto">
            {String(shown.length).padStart(2, "0")} projects
          </span>
        </div>

        <div className="grid gap-x-10 gap-y-24 pb-24 pt-14 md:grid-cols-12 md:pb-40">
          {shown.map((p, i) => {
            const layouts = [
              "md:col-span-7",
              "md:col-span-4 md:col-start-9 md:mt-40",
              "md:col-span-5 md:col-start-2",
              "md:col-span-6 md:col-start-7 md:mt-24",
              "md:col-span-8 md:col-start-3",
            ];
            return (
              <article key={p.slug} className={layouts[i % layouts.length]}>
                <Link to="/projects/$slug" params={{ slug: p.slug }} className="group block">
                  <div className="overflow-hidden">
                    <img
                      src={p.cover}
                      alt={p.title}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h2 className="font-display text-2xl leading-none text-ink md:text-3xl">
                      <span className="eyebrow mr-3">{p.index}</span>
                      {p.title}
                    </h2>
                    <span className="eyebrow shrink-0">{p.year}</span>
                  </div>
                  <p className="eyebrow mt-3">
                    {p.category} — {p.location}
                  </p>
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}