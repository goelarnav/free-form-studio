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
        lede="A Miami-based practice recognised for refined, high-caliber interiors shaped by rigour, precision and contextual sensitivity."
      />

      <section className="px-6 md:px-10">
        <div className="rule-line" />
        <div className="grid gap-6 py-10 md:grid-cols-12 md:py-14">
          <p className="eyebrow md:col-span-2">The studio</p>
          <p className="text-sm font-light leading-loose text-stone md:col-span-7 md:col-start-4 md:text-base">
            An integrated framework bridging concept and execution — design consultation, spatial
            planning, construction coordination, material specification and project management,
            carried through as one continuous line from first sketch to final placed object.
          </p>
        </div>
      </section>

      {/* Founder & team — each person given the same full treatment */}
      <section className="bg-linen px-6 py-20 md:px-10 md:py-32">
        <div className="grid gap-y-12 md:gap-y-16">
          {[
            {
              eyebrow: "Founder",
              name: "Evelyn Lara",
              alt: "Evelyn Lara, Founder and Principal Designer",
              bio: "Founder and Principal Designer, Evelyn brings over three decades of experience across interior design and construction — a practice synthesising minimalism with contemporary spatial thinking, and an emphasis on clarity, proportion, light and material restraint.",
            },
            {
              eyebrow: "Team",
              name: "Jaya Nila",
              alt: "Jaya Nila, Lead Designer",
              role: "Lead Designer",
              bio: "Placeholder biography, to follow in the same format as Evelyn's — background, training and design philosophy, carried in the same tone across every member of the studio.",
            },
            {
              eyebrow: "Team",
              name: "Catherine",
              alt: "Catherine, Marketing Manager",
              role: "Marketing Manager",
              bio: "Placeholder biography, to follow in the same format as Evelyn's — background, training and design philosophy, carried in the same tone across every member of the studio.",
            },
          ].map((p, i) => (
            <div
              key={p.name}
              className={`grid gap-10 border-ink/10 md:grid-cols-12 md:items-center md:gap-8 ${i > 0 ? "border-t pt-12 md:pt-16" : ""}`}
            >
              <figure
                className={`md:col-span-3 ${i % 2 === 1 ? "md:order-2 md:col-start-10" : "md:col-start-1"}`}
              >
                <img
                  src={founder}
                  alt={p.alt}
                  width={480}
                  height={600}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                <figcaption className="eyebrow mt-4">
                  {p.name}
                  {p.role ? ` — ${p.role}` : " — Founder & Principal Designer"}
                </figcaption>
              </figure>
              <div
                className={`md:col-span-7 ${i % 2 === 1 ? "md:order-1 md:col-start-2" : "md:col-start-5"}`}
              >
                <p className="eyebrow">{p.eyebrow}</p>
                <h2 className="mt-6 font-display text-4xl leading-tight text-ink md:text-5xl">
                  {p.name}
                </h2>
                <p className="mt-8 max-w-lg text-sm font-light leading-loose text-stone md:text-base">
                  {p.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process — five equal modules side by side, divided by rule rather than stacked */}
      <section className="px-6 py-24 md:px-10 md:py-36">
        <div className="max-w-xl">
          <p className="eyebrow">Process</p>
          <h2 className="mt-6 font-display text-4xl leading-tight text-ink md:text-5xl">
            Five movements,
            <br />
            <em className="italic">one continuity</em>
          </h2>
        </div>

        <ol className="mt-14 grid gap-x-8 gap-y-12 border-t border-ink/10 pt-12 md:mt-20 md:grid-cols-5 md:gap-y-0 md:border-t-0 md:pt-0">
          {processSteps.map((s, i) => (
            <li key={s.n} className={`md:border-ink/10 md:pl-8 ${i > 0 ? "md:border-l" : ""}`}>
              <span className="font-display text-3xl leading-none text-ink/25">{s.n}</span>
              <p className="mt-5 font-display text-xl leading-snug text-ink">{s.title}</p>
              <p className="mt-3 text-sm font-light leading-relaxed text-stone">{s.copy}</p>
            </li>
          ))}
        </ol>
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
