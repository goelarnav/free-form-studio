import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageOpener } from "@/components/site/page-shell";
import project3 from "@/assets/project-3.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Luxury Decora, Miami" },
      {
        name: "description",
        content:
          "Contact Luxury Decora — 601 Gate Ln, Miami, FL 33137. Call +1 305 332 2202 or email info@luxurydecora.com.",
      },
      { property: "og:title", content: "Contact — Luxury Decora" },
      { property: "og:description", content: "Studio details for Luxury Decora, Miami." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell>
      <PageOpener
        eyebrow="(Contact)"
        title={
          <>
            Come and
            <br />
            <em className="italic">say hello</em>
          </>
        }
      />

      <section className="grid gap-12 px-6 md:grid-cols-12 md:px-10">
        <div className="pb-24 md:col-span-6">
          <dl className="border-t border-ink/10">
            {[
              ["Studio", "601 Gate Ln\nMiami, FL 33137"],
              ["Telephone", "+1 305 332 2202"],
              ["Email", "info@luxurydecora.com"],
              ["Hours", "Monday – Friday\n9:00 – 18:00 EST"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-12 gap-4 border-b border-ink/10 py-7">
                <dt className="eyebrow col-span-4">{k}</dt>
                <dd className="col-span-8 whitespace-pre-line font-display text-xl leading-snug text-ink md:text-2xl">
                  {k === "Telephone" ? (
                    <a href="tel:+13053322202" className="link-underline inline-block">
                      {v}
                    </a>
                  ) : k === "Email" ? (
                    <a href="mailto:info@luxurydecora.com" className="link-underline inline-block">
                      {v}
                    </a>
                  ) : (
                    v
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <Link to="/start-a-project" className="eyebrow link-underline mt-12 inline-block text-ink">
            Or begin an enquiry
          </Link>
        </div>

        <figure className="md:col-span-5 md:col-start-8 md:pb-24">
          <img
            src={project3}
            alt="Quiet bedroom interior in warm ivory tones"
            width={912}
            height={1200}
            loading="lazy"
            className="w-full object-cover"
          />
          <figcaption className="eyebrow mt-4">Studio archive — Miami</figcaption>
        </figure>
      </section>
    </PageShell>
  );
}