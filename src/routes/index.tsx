import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/page-shell";
import { HeroPicker, HorizontalProjects } from "@/components/site/motion-sections";
import { IntroSplash } from "@/components/site/intro-splash";
import { projects } from "@/lib/projects";

// Temporary — cycles every candidate photo from main_image/ so a final hero
// image can be picked. Swap back to <Hero src={...} /> once one is chosen.
const heroCandidates = Object.entries(
  import.meta.glob("../assets/main-image/*.jpg", { eager: true, import: "default" }) as Record<
    string,
    string
  >,
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => ({ src, alt: "Candidate interior for the homepage hero" }));

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
  return (
    <PageShell>
      <IntroSplash />
      <HeroPicker slides={heroCandidates} />

      {/* Statement — off-grid */}
      <section className="px-6 py-24 md:px-10 md:py-40">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="eyebrow md:col-span-2">(Practice)</p>
          <p className="font-display text-2xl leading-[1.3] text-ink md:col-span-8 md:col-start-4 md:text-[3.2vw]">
            We design interiors that hold their composure — clarity of form, disciplined detailing,
            and a warmth that only reveals itself slowly, in daylight and in use.
          </p>
        </div>
      </section>

      <HorizontalProjects items={projects} />
    </PageShell>
  );
}
