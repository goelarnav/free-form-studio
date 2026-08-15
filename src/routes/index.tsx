import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site/page-shell";
import { projects } from "@/lib/projects";
import hero from "@/assets/hero.jpg";
import materials from "@/assets/materials.jpg";
import project1 from "@/assets/project-1.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luxury Decora — Miami Interior Design Studio" },
      {
        name: "description",
        content:
          "Luxury Decora is a Miami interior design practice creating refined, warm and enduring residential and commercial interiors.",
      },
      { property: "og:title", content: "Luxury Decora — Miami Interior Design Studio" },
      {
        property: "og:description",
        content: "Refined residential and commercial interiors, designed in Miami.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [activeSlug, setActiveSlug] = useState(projects[0]!.slug);
  const active = projects.find((p) => p.slug === activeSlug) ?? projects[0]!;

  return (
    <PageShell>
      {/* Hero — full bleed, text floating off-grid */}
      <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
        <img
          src={hero}
          alt="Warm minimal Miami living room designed by Luxury Decora"
          width={1600}
          height={1104}
          className="veil-in h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/5" />
        <div className="absolute bottom-10 left-6 right-6 md:bottom-16 md:left-10 md:right-10">
          <div className="grid items-end gap-8 md:grid-cols-12">
            <h1 className="fade-up font-display text-[13vw] leading-[0.86] tracking-tight text-ivory md:col-span-8 md:text-[7.5vw]">
              Interiors
              <br />
              <em className="italic">for the way</em>
              <br />
              you live
            </h1>
            <p className="fade-up max-w-xs text-sm font-light leading-relaxed text-ivory/90 md:col-span-3 md:col-start-10">
              A Miami practice shaping warm, restrained spaces — considered from the first plan
              study to the last placed object.
            </p>
          </div>
        </div>
      </section>

      {/* Statement — asymmetric */}
      <section className="px-6 py-28 md:px-10 md:py-44">
        <div className="grid gap-14 md:grid-cols-12">
          <p className="eyebrow md:col-span-2">(Practice)</p>
          <p className="font-display text-2xl leading-[1.35] text-ink md:col-span-7 md:col-start-4 md:text-4xl">
            We design interiors that hold their composure — clarity of form, disciplined
            detailing, and a warmth that only reveals itself slowly, in daylight and in use.
          </p>
        </div>

        <div className="mt-24 grid gap-14 md:mt-40 md:grid-cols-12 md:items-end">
          <figure className="md:col-span-5 md:col-start-2">
            <img
              src={project1}
              alt="Plaster arch and warm hallway"
              width={912}
              height={1200}
              loading="lazy"
              className="w-full object-cover"
            />
            <figcaption className="eyebrow mt-4">North Bay — Threshold study</figcaption>
          </figure>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-sm font-light leading-loose text-stone">
              Placeholder text. Each project is approached as a design inquiry: spatial
              performance, material integrity and long-term adaptability considered alongside
              visual coherence.
            </p>
            <Link to="/about" className="eyebrow link-underline mt-10 inline-block text-ink">
              About the studio
            </Link>
          </div>
        </div>
      </section>

      {/* Selected work — hovering index with preview */}
      <section className="bg-sand px-6 py-24 md:px-10 md:py-36">
        <div className="flex items-baseline justify-between">
          <p className="eyebrow">Selected work</p>
          <Link to="/projects" className="eyebrow link-underline text-ink">
            All projects
          </Link>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <ul className="md:col-span-7">
            {projects.map((p) => (
              <li key={p.slug} onMouseEnter={() => setActiveSlug(p.slug)}>
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="group flex items-baseline gap-6 border-b border-ink/10 py-6 transition-opacity md:py-8"
                >
                  <span className="eyebrow w-8 shrink-0">{p.index}</span>
                  <span
                    className={`font-display text-3xl leading-none transition-all duration-500 md:text-6xl ${
                      active.slug === p.slug ? "text-ink md:translate-x-3" : "text-ink/45"
                    }`}
                  >
                    {p.title}
                  </span>
                  <span className="eyebrow ml-auto hidden md:block">{p.category}</span>
                </Link>
              </li>
            ))}
          </ul>

          <figure className="md:col-span-4 md:col-start-9 md:sticky md:top-32 md:self-start">
            <img
              key={active.slug}
              src={active.cover}
              alt={active.title}
              loading="lazy"
              className="fade-up aspect-[3/4] w-full object-cover"
            />
            <figcaption className="eyebrow mt-4">
              {active.location} — {active.year}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Material band */}
      <section className="grid md:grid-cols-2">
        <img
          src={materials}
          alt="Limestone, oak, linen and brass material samples"
          width={1200}
          height={912}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="flex flex-col justify-center gap-8 px-6 py-24 md:px-16">
          <p className="eyebrow">Material</p>
          <p className="font-display text-3xl leading-tight text-ink md:text-5xl">
            Chosen for how it <em className="italic">ages</em>, not how it photographs.
          </p>
          <p className="max-w-md text-sm font-light leading-loose text-stone">
            Limestone, pale oak, chalk plaster, linen and unlacquered brass — a narrow palette,
            used consistently, so rooms feel continuous rather than composed.
          </p>
          <Link to="/services" className="eyebrow link-underline self-start text-ink">
            Our services
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
