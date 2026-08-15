import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/site/page-shell";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Project"} — Luxury Decora` },
      { name: "description", content: loaderData?.intro ?? "A project by Luxury Decora." },
      { property: "og:title", content: `${loaderData?.title ?? "Project"} — Luxury Decora` },
      { property: "og:description", content: loaderData?.intro ?? "" },
    ],
  }),
  component: ProjectDetail,
});

function ProjectDetail() {
  const p = Route.useLoaderData();
  const next = projects[(projects.findIndex((x) => x.slug === p.slug) + 1) % projects.length]!;

  return (
    <PageShell>
      <section className="px-6 pb-12 pt-36 md:px-10 md:pt-52">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">
              {p.index} — {p.category}
            </p>
            <h1 className="fade-up mt-6 font-display text-5xl leading-[1.02] text-ink md:text-8xl">
              {p.title}
            </h1>
          </div>
          <p className="text-sm font-light leading-relaxed text-stone md:col-span-3 md:col-start-10">
            {p.intro}
          </p>
        </div>
      </section>

      <img
        src={p.cover}
        alt={p.title}
        className="h-[70vh] w-full object-cover md:h-[88vh]"
      />

      <section className="px-6 py-20 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <dl className="space-y-6 md:col-span-3">
            {[
              ["Location", p.location],
              ["Year", p.year],
              ["Scope", p.scope],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-ink/10 pt-3">
                <dt className="eyebrow">{k}</dt>
                <dd className="mt-2 text-sm font-light text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="space-y-6 text-sm font-light leading-loose text-stone md:col-span-6 md:col-start-6 md:text-base">
            {p.body.map((t) => (
              <p key={t.slice(0, 24)}>{t}</p>
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-x-10 gap-y-16 md:grid-cols-12">
          {p.gallery.map((g, i) => (
            <figure
              key={i}
              className={
                g.tall
                  ? "md:col-span-5 md:col-start-8 md:-mt-24"
                  : i === 0
                    ? "md:col-span-6"
                    : "md:col-span-7 md:col-start-2"
              }
            >
              <img src={g.src} alt={g.caption} loading="lazy" className="w-full object-cover" />
              <figcaption className="eyebrow mt-4">{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-t border-ink/10 px-6 py-14 md:px-10">
        <div className="flex items-baseline justify-between gap-6">
          <Link to="/projects" className="eyebrow link-underline text-ink">
            All projects
          </Link>
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="group text-right"
          >
            <span className="eyebrow">Next</span>
            <span className="mt-2 block font-display text-2xl text-ink transition-opacity group-hover:opacity-60 md:text-4xl">
              {next.title}
            </span>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}