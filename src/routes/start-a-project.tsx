import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageShell, PageOpener } from "@/components/site/page-shell";

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
      { property: "og:description", content: "Begin an interior design enquiry with our Miami studio." },
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
      <PageOpener
        eyebrow="(Start a project)"
        title={
          <>
            Begin the
            <br />
            <em className="italic">conversation</em>
          </>
        }
        lede="A few details are enough to start. We reply to every enquiry personally, usually within two working days."
      />

      <section className="px-6 pb-32 md:px-10">
        {sent ? (
          <div className="border-t border-ink/10 py-24 text-center">
            <p className="eyebrow">Received</p>
            <p className="mx-auto mt-6 max-w-xl font-display text-3xl leading-snug text-ink md:text-5xl">
              Thank you — we have your enquiry and will be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-x-12 gap-y-12 md:grid-cols-12">
            <div className="grid gap-10 md:col-span-7">
              <label className="block">
                <span className="eyebrow">01 — Full name</span>
                <input required name="name" placeholder="Your name" className={`${field} mt-3`} />
              </label>
              <label className="block">
                <span className="eyebrow">02 — Email</span>
                <input required type="email" name="email" placeholder="you@email.com" className={`${field} mt-3`} />
              </label>
              <label className="block">
                <span className="eyebrow">03 — Telephone</span>
                <input name="phone" placeholder="+1" className={`${field} mt-3`} />
              </label>
              <label className="block">
                <span className="eyebrow">04 — Project location</span>
                <input name="location" placeholder="City, neighbourhood" className={`${field} mt-3`} />
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
                <select name="service" className={`${field} mt-3`} defaultValue="Full house design">
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
                <input name="scope" placeholder="e.g. 3,200 sq ft, starting spring" className={`${field} mt-3`} />
              </label>
              <label className="block">
                <span className="eyebrow">08 — Investment range</span>
                <select name="budget" className={`${field} mt-3`} defaultValue="To be discussed">
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
                Placeholder note. Fields here are a first proposal — add, remove or reword any of
                them and we will adjust the form.
              </p>
              <p className="mt-8 text-sm font-light leading-loose text-stone">
                Prefer to speak first?
                <br />
                <a href="tel:+13053322202" className="link-underline inline-block text-ink">
                  +1 305 332 2202
                </a>
              </p>
            </aside>
          </form>
        )}
      </section>
    </PageShell>
  );
}