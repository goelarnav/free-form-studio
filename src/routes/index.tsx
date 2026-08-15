import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/page-shell";
import { HeroStack, ImageBand, HorizontalProjects } from "@/components/site/motion-sections";
import { useReveal } from "@/hooks/use-reveal";
import { projects } from "@/lib/projects";
import hero from "@/assets/hero.jpg";
import materials from "@/assets/materials.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

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
  const statement = useReveal<HTMLElement>();
  const spread = useReveal<HTMLElement>();
  const material = useReveal<HTMLElement>();

  return (
    <PageShell>
      <HeroStack
        slides={[
          { src: hero, alt: "Warm minimal Miami living room", label: "Bayfront Residence" },
          { src: project2, alt: "Kitchen in pale oak and limestone", label: "Coral Way House" },
          { src: project3, alt: "Principal bedroom in linen tones", label: "North Bay" },
        ]}
      />

      {/* Statement — off-grid, revealed on scroll */}
      <section ref={statement} className="px-6 py-24 md:px-10 md:py-40">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="eyebrow reveal md:col-span-2" data-reveal>
            (Practice)
          </p>
          <p
            className="reveal font-display text-2xl leading-[1.3] text-ink md:col-span-8 md:col-start-4 md:text-[3.2vw]"
            data-reveal
            data-reveal-delay="120"
          >
            We design interiors that hold their composure — clarity of form, disciplined
            detailing, and a warmth that only reveals itself slowly, in daylight and in use.
          </p>
        </div>
      </section>

      <ImageBand
        images={[
          { src: project1, caption: "Threshold study — North Bay" },
          { src: materials, caption: "Limestone, oak, linen" },
          { src: project4, caption: "Brickell Loft — Lounge" },
          { src: project3, caption: "Principal bedroom" },
          { src: project2, caption: "Coral Way — Kitchen" },
        ]}
      />

      <HorizontalProjects items={projects} />

      {/* Editorial spread — staggered horizontal offsets */}
      <section ref={spread} className="relative overflow-hidden px-6 py-28 md:px-10 md:py-40">
        <div className="grid gap-y-16 md:grid-cols-12 md:items-center">
          <figure
            className="reveal-clip md:col-span-5 md:col-start-1 md:-ml-10"
            data-reveal
          >
            <img
              src={project1}
              alt="Plaster arch and warm hallway"
              loading="lazy"
              className="h-[60vh] w-full object-cover"
            />
            <figcaption className="eyebrow mt-4">01 — Threshold</figcaption>
          </figure>

          <div className="reveal md:col-span-4 md:col-start-8" data-reveal data-reveal-delay="180">
            <p className="font-display text-3xl leading-tight text-ink md:text-5xl">
              Each room is drawn <em className="italic">twice</em> — once in plan, once in light.
            </p>
            <p className="mt-8 text-sm font-light leading-loose text-stone">
              Placeholder text. Spatial performance, material integrity and long-term
              adaptability are considered alongside visual coherence.
            </p>
            <Link to="/about" className="eyebrow link-underline mt-10 inline-block text-ink">
              About the studio
            </Link>
          </div>

          <figure
            className="reveal-clip md:col-span-4 md:col-start-4 md:-mt-24"
            data-reveal
            data-reveal-delay="240"
          >
            <img
              src={project4}
              alt="Lounge with layered textiles"
              loading="lazy"
              className="h-[42vh] w-full object-cover"
            />
            <figcaption className="eyebrow mt-4">02 — Lounge</figcaption>
          </figure>
        </div>
      </section>

      {/* Material band */}
      <section ref={material} className="grid md:grid-cols-2">
        <div className="reveal-clip overflow-hidden" data-reveal>
          <img
            src={materials}
            alt="Limestone, oak, linen and brass material samples"
            loading="lazy"
            className="h-full min-h-[50vh] w-full object-cover"
          />
        </div>
        <div className="reveal flex flex-col justify-center gap-8 px-6 py-24 md:px-16" data-reveal data-reveal-delay="150">
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
