import { About } from "@/components/about/About";
import { Collaborations } from "@/components/Collaborations";
import { ClientNotes } from "@/components/testimonials/ClientNotes";
import { Creators } from "@/components/creators/Creators";
import { CurrentManagement } from "@/components/management/CurrentManagement";
import { Difference } from "@/components/difference/Difference";
import { Hero } from "@/components/Hero";
import { ProjectInquiry } from "@/components/inquiry/ProjectInquiry";
import { QuickProof } from "@/components/proof/QuickProof";
import { WorkProcess } from "@/components/process/WorkProcess";
import { Recognition } from "@/components/recognition/Recognition";
import { SelectedWork } from "@/components/work/SelectedWork";
import { WhatWeDo } from "@/components/whatwedo/WhatWeDo";
import { getApprovedTestimonials } from "@/lib/testimonials";

/**
 * THE HOMEPAGE IS STATIC AND RE-RENDERS ITSELF ONCE AN HOUR (Revision 43).
 *
 * Everything on it is still prerendered — the only data it reads is the list
 * of approved testimonials, on the server, while this page renders. With
 * `revalidate` the build's HTML is served as before and refreshed in the
 * background at most hourly, so a row set `approved` in the Table Editor is on
 * the site within the hour and nobody redeploys anything. **No client fetch,
 * no subscription, no polling, no database key anywhere near a browser.**
 */
export const revalidate = 3600;

export default async function Home() {
  const testimonials = await getApprovedTestimonials();

  return (
    <>
      <Hero />
      <Collaborations />
      {/*
        The page's strongest single relationship claim, and it sits second on
        purpose. The brand rail above says which brands the work has run
        alongside; this says the agency manages a creator, today. Those are the
        two things an outreach recipient is scanning for, so they arrive back
        to back before the site starts explaining itself. Unnumbered, like the
        other interludes, so §02, §03 and ABOUT_CHAPTER keep their numbering.
      */}
      <CurrentManagement />
      {/*
        THE QUICK-SCAN PROOF BAND, and its position is the decision.
        Recognition (the rail) → relationship (management) → **scale** →
        capability (§02). A visitor who reads nothing but the first three
        screens now knows which brands, which relationship and how much work.
        It sits *after* Current Management on purpose: a real managed creator
        outranks a number, and leading with figures would have made the
        figures the argument. Unnumbered, like the other interludes.
      */}
      <QuickProof />
      <WhatWeDo />
      {/*
        An unnumbered interlude, not a chapter: §02 has just said what Mishram
        does, and this answers why it comes from one partner. It carries no
        index, so 03 / Creators and everything after it keep their numbering.
      */}
      <Difference />
      <Creators />
      <WorkProcess />
      <SelectedWork />
      {/*
        Client Notes renders nothing while there is no approved testimonial —
        the state the site ships in. The items come from public.testimonials
        (approved rows only, read on the server above); a person sets a
        submission from the private /feedback page to `approved` in the Table
        Editor and the section appears here, composed, with no code change.
        It is an unnumbered interlude, so Recognition keeps its own 06 and
        About's adaptive number (config/sections.ts) is unaffected.
      */}
      <ClientNotes items={testimonials} />
      {/*
        06 / Recognition renders nothing while RECOGNITION_ITEMS is empty. About
        picks up the next visible chapter number automatically
        (config/sections.ts), so populating that array needs no change here.
      */}
      <Recognition />
      <About />
      {/*
        The page's final conversion moment. About's closing action anchors to it,
        so the narrative hands straight into the form rather than repeating the
        Hero's booking ask. Unnumbered, like the other interludes.
      */}
      <ProjectInquiry />
      {/*
        The Footer closes the page from `app/layout.tsx`, outside <main>.
      */}
    </>
  );
}
