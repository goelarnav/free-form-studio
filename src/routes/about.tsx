import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageOpener } from "@/components/site/page-shell";
import { processSteps } from "@/lib/projects";
import founder from "@/assets/founder.jpg";
import project4 from "@/assets/project-4.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Luxury Decora Interior Design, Miami" },
      {
        name: "description",
        content:
          "Luxury Decora is led by founder Evelyn Lara — a Miami practice built on rigour, precision and contextual sensitivity.",
      },
      { property: "og:title", content: "About — Luxury Decora" },
      {
        property: "og:description",
        content: "The studio, its founder Evelyn Lara, and how we work.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <PageOpener
        eyebrow="(About)"
        title={
          <>
            A practice of
            <br />
            <em className="italic">restraint</em>
          </>
        }
        lede="Luxury Decora is a Miami-based interior design practice recognised for refined, high-caliber environments shaped by rigour, precision and contextual sensitivity."
      />

      <section className="px-6 md:px-10">
        <div className="rule-line" />
        <div className="grid gap-12 py-16 md:grid-cols-12 md:py-24">
          <p className="eyebrow md:col-span-3">The studio</p>
          <div className="space-y-6 text-sm font-light leading-loose text-stone md:col-span-6 md:col-start-5 md:text-base">
            <p>
              The studio operates through an integrated design framework that bridges conceptual
              development and technical execution, ensuring continuity from initial ideation
              through construction and final spatial realisation.
            </p>
            <p>
              Its scope encompasses design consultation, spatial planning, construction
              coordination, furniture and material specification, three-dimensional
              visualisation, and comprehensive project management.
            </p>
            <p>
              At its core, Luxury Decora is guided by a commitment to interiors that are both
              intellectually grounded and experientially rich — clarity of form, disciplined
              detailing, contextual relevance.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-linen px-6 py-24 md:px-10 md:py-36">
        <div className="grid gap-14 md:grid-cols-12 md:items-start">
          <figure className="md:col-span-5">
            <img
              src={founder}
              alt="Evelyn Lara, Founder and Principal Designer"
              width={912}
              height={1152}
              loading="lazy"
              className="w-full object-cover"
            />
            <figcaption className="eyebrow mt-4">Evelyn Lara — Founder & Principal Designer</figcaption>
          </figure>
          <div className="md:col-span-6 md:col-start-7">
            <p className="eyebrow">Founder</p>
            <h2 className="mt-6 font-display text-4xl leading-tight text-ink md:text-6xl">
              Evelyn Lara
            </h2>
            <div className="mt-10 space-y-6 text-sm font-light leading-loose text-stone md:text-base">
              <p>
                Founder and Principal Designer of Luxury Decora, Evelyn brings over three decades
                of experience across interior design and construction. A graduate of the
                University of Miami, her training established a foundation in design theory,
                spatial analysis and disciplinary methodology.
              </p>
              <p>
                Her work reflects a deep engagement with both the technical and conceptual
                dimensions of the field — spatial systems, material behaviour, and human
                interaction with the built environment.
              </p>
              <p>
                Her philosophy synthesises minimalism with contemporary spatial thinking,
                emphasising clarity, proportion, light and material restraint.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-8 md:grid-cols-12">
          <p className="eyebrow md:col-span-3">Team</p>
          <div className="grid gap-10 md:col-span-8 md:col-start-5 md:grid-cols-2">
            {[
              { name: "Jaya Nila", role: "Lead Designer" },
              { name: "Catherine", role: "Marketing Manager" },
            ].map((m) => (
              <div key={m.name} className="border-t border-ink/10 pt-5">
                <p className="font-display text-2xl text-ink">{m.name}</p>
                <p className="eyebrow mt-2">{m.role}</p>
                <p className="mt-4 text-sm font-light leading-loose text-stone">
                  Placeholder biography, to follow in the same format as Evelyn's.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 py-24 md:px-10 md:py-36">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">Process</p>
            <h2 className="mt-6 font-display text-4xl leading-tight text-ink md:text-5xl">
              Five movements,
              <br />
              <em className="italic">one continuity</em>
            </h2>
          </div>
          <ol className="md:col-span-7 md:col-start-6">
            {processSteps.map((s) => (
              <li key={s.n} className="grid grid-cols-12 gap-4 border-t border-ink/10 py-7">
                <span className="eyebrow col-span-2">{s.n}</span>
                <span className="col-span-10 md:col-span-4 font-display text-2xl leading-none text-ink">
                  {s.title}
                </span>
                <p className="col-span-10 col-start-3 text-sm font-light leading-loose text-stone md:col-span-6 md:col-start-7">
                  {s.copy}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative">
        <img
          src={project4}
          alt="Curved banquette in a warm hospitality interior"
          width={1200}
          height={912}
          loading="lazy"
          className="h-[60vh] w-full object-cover"
        />
        <div className="absolute inset-0 flex items-end p-6 md:p-16">
          <Link to="/projects" className="eyebrow link-underline text-ivory">
            View the portfolio
          </Link>
        </div>
      </section>
    </PageShell>
  );
}