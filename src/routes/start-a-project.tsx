import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageShell } from "@/components/site/page-shell";

const nextSteps = [
  ["01", "We read every enquiry personally and reply within two working days."],
  ["02", "A short call or studio visit to understand the space and the brief."],
  ["03", "A tailored proposal — scope, timeline and investment range."],
] as const;

export const Route = createFileRoute("/start-a-project")({
  head: () => ({
    meta: [
      { title: "Start a Project — Luxury Decora, Miami" },
      {
        name: "description",
        content:
          "Begin an enquiry with Luxury Decora. Tell us about your space, scope, timeline and budget.",
      },
      { property: "og:title", content: "Start a Project — Luxury Decora" },
      {
        property: "og:description",
        content: "Begin an interior design enquiry with our Miami studio.",
      },
    ],
  }),
  component: StartProject,
});

const field =
  "w-full border-0 border-b border-ink/20 bg-transparent px-0 py-3 font-display text-xl text-ink placeholder:text-stone/50 focus:border-ink focus:outline-none";

function StartProject() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <PageShell>
      <section className="grid gap-12 px-6 pb-16 pt-28 md:grid-cols-12 md:gap-8 md:px-10 md:pb-24 md:pt-40">
        <div className="md:col-span-7">
          <p className="eyebrow fade-up">(Start a project)</p>
          <h1 className="fade-up mt-8 font-display text-5xl leading-[1.02] tracking-tight text-ink md:text-7xl">
            Begin the
            <br />
            <em className="italic">conversation</em>
          </h1>
          <p className="fade-up mt-8 max-w-md text-sm font-light leading-relaxed text-stone md:text-base">
            A few details are enough to start. We reply to every enquiry personally, usually within
            two working days.
          </p>
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <p className="eyebrow">What happens next</p>
          <ol className="mt-6">
            {nextSteps.map(([n, copy]) => (
              <li key={n} className="flex gap-4 border-t border-ink/10 py-5 first:pt-0">
                <span className="eyebrow shrink-0 pt-0.5">{n}</span>
                <p className="text-sm font-light leading-relaxed text-stone">{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 pb-32 md:px-10">
        {sent ? (
          <div className="border-t border-ink/10 py-24 text-center">
            <p className="eyebrow">Received</p>
            <p className="mx-auto mt-6 max-w-xl font-display text-3xl leading-snug text-ink md:text-5xl">
              Thank you — we have your enquiry and will be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-x-12 gap-y-16 md:grid-cols-12">
            <div className="grid gap-y-10 md:col-span-7">
              <div>
                <p className="eyebrow border-t border-ink/10 pt-6">You</p>
                <div className="mt-8 grid gap-10">
                  <label className="block">
                    <span className="eyebrow">01 — Full name</span>
                    <input
                      required
                      name="name"
                      placeholder="Your name"
                      className={`${field} mt-3`}
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow">02 — Email</span>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="you@email.com"
                      className={`${field} mt-3`}
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow">03 — Telephone</span>
                    <input name="phone" placeholder="+1" className={`${field} mt-3`} />
                  </label>
                </div>
              </div>

              <div>
                <p className="eyebrow border-t border-ink/10 pt-6">The project</p>
                <div className="mt-8 grid gap-10">
                  <label className="block">
                    <span className="eyebrow">04 — Project location</span>
                    <input
                      name="location"
                      placeholder="City, neighbourhood"
                      className={`${field} mt-3`}
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow">05 — Project type</span>
                    <select name="type" className={`${field} mt-3`} defaultValue="Residential">
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>New construction</option>
                      <option>Renovation</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="eyebrow">06 — Services of interest</span>
                    <select
                      name="service"
                      className={`${field} mt-3`}
                      defaultValue="Full house design"
                    >
                      <option>Space planning</option>
                      <option>Consultation</option>
                      <option>Interior design</option>
                      <option>Full house design</option>
                      <option>Turnkey interior service</option>
                      <option>Custom kitchen & bathroom</option>
                      <option>Furniture shopping</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="eyebrow">07 — Approximate size & timeline</span>
                    <input
                      name="scope"
                      placeholder="e.g. 3,200 sq ft, starting spring"
                      className={`${field} mt-3`}
                    />
                  </label>
                </div>
              </div>

              <div>
                <p className="eyebrow border-t border-ink/10 pt-6">Budget & vision</p>
                <div className="mt-8 grid gap-10">
                  <label className="block">
                    <span className="eyebrow">08 — Investment range</span>
                    <select
                      name="budget"
                      className={`${field} mt-3`}
                      defaultValue="To be discussed"
                    >
                      <option>Under $100k</option>
                      <option>$100k – $250k</option>
                      <option>$250k – $500k</option>
                      <option>$500k +</option>
                      <option>To be discussed</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="eyebrow">09 — Tell us about the space</span>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="How you intend to live in it, what is working, what isn't."
                      className={`${field} mt-3 resize-none`}
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="eyebrow justify-self-start border border-ink px-10 py-5 text-ink transition-colors hover:bg-ink hover:text-ivory"
              >
                Send enquiry
              </button>
            </div>

            <aside className="md:col-span-4 md:col-start-9 md:sticky md:top-32 md:self-start">
              <div className="rule-line" />
              <p className="mt-6 text-sm font-light leading-loose text-stone">
                No portfolio or floor plans required to start — a clear picture of the space and
                what isn't working yet is enough.
              </p>
              <p className="mt-8 text-sm font-light leading-loose text-stone">
                Prefer to speak first?
                <br />
                <a href="tel:+13053322202" className="link-underline inline-block text-ink">
                  +1 305 332 2202
                </a>
                <br />
                <a
                  href="mailto:info@luxurydecora.com"
                  className="link-underline inline-block text-ink"
                >
                  info@luxurydecora.com
                </a>
              </p>
            </aside>
          </form>
        )}
      </section>
    </PageShell>
  );
}
