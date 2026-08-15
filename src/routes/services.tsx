import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageOpener } from "@/components/site/page-shell";
import { services } from "@/lib/projects";
import project2 from "@/assets/project-2.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Luxury Decora, Miami Interior Design" },
      {
        name: "description",
        content:
          "Space planning, consultation, interior design, full house design, turnkey service, custom kitchens and baths, new construction and furniture sourcing.",
      },
      { property: "og:title", content: "Services — Luxury Decora" },
      {
        property: "og:description",
        content: "How the studio works, from consultation to turnkey delivery.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <PageShell>
      <PageOpener
        eyebrow="(Services)"
        title={
          <>
            What we
            <br />
            <em className="italic">take on</em>
          </>
        }
        lede="Engagements range from a single focused consultation to a fully delivered turnkey residence."
      />

      <section className="px-6 md:px-10">
        <ul>
          {services.map((s) => (
            <li
              key={s.n}
              className="group grid grid-cols-12 items-baseline gap-4 border-t border-ink/10 py-8 transition-colors hover:bg-linen/60 md:py-10"
            >
              <span className="eyebrow col-span-2 md:col-span-1">{s.n}</span>
              <h2 className="col-span-10 font-display text-3xl leading-none text-ink transition-transform duration-500 group-hover:translate-x-2 md:col-span-5 md:text-5xl">
                {s.name}
              </h2>
              <p className="col-span-10 col-start-3 text-sm font-light leading-loose text-stone md:col-span-5 md:col-start-8">
                {s.note}
              </p>
            </li>
          ))}
        </ul>
        <div className="rule-line" />
      </section>

      <section className="mt-24 grid md:mt-36 md:grid-cols-2">
        <div className="order-2 flex flex-col justify-center gap-8 px-6 py-24 md:order-1 md:px-16">
          <p className="eyebrow">Engagement</p>
          <p className="font-display text-3xl leading-tight text-ink md:text-5xl">
            Tell us about the <em className="italic">space</em>.
          </p>
          <p className="max-w-md text-sm font-light leading-loose text-stone">
            Share the site, the timeline and how you intend to live in it. We reply to every
            enquiry personally.
          </p>
          <Link to="/start-a-project" className="eyebrow link-underline self-start text-ink">
            Start a project
          </Link>
        </div>
        <img
          src={project2}
          alt="Custom kitchen in pale oak and stone"
          width={1200}
          height={912}
          loading="lazy"
          className="order-1 h-full w-full object-cover md:order-2"
        />
      </section>
    </PageShell>
  );
}