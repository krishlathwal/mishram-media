import { About } from "@/components/about/About";
import { Collaborations } from "@/components/Collaborations";
import { ClientNotes } from "@/components/testimonials/ClientNotes";
import { Creators } from "@/components/creators/Creators";
import { Difference } from "@/components/difference/Difference";
import { Hero } from "@/components/Hero";
import { ProjectInquiry } from "@/components/inquiry/ProjectInquiry";
import { WorkProcess } from "@/components/process/WorkProcess";
import { Recognition } from "@/components/recognition/Recognition";
import { SelectedWork } from "@/components/work/SelectedWork";
import { WhatWeDo } from "@/components/whatwedo/WhatWeDo";

export default function Home() {
  return (
    <>
      <Hero />
      <Collaborations />
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
        Client Notes renders nothing while TESTIMONIALS is empty, which it
        currently is — not one testimonial in the old Mishram Media site
        survives verification. See the audit in config/testimonials.ts. It is
        an unnumbered interlude, so Recognition keeps its own 06 and About's
        adaptive number (config/sections.ts) is unaffected.
      */}
      <ClientNotes />
      {/*
        06 / Recognition renders nothing while RECOGNITION_ITEMS is empty, which
        it currently is — there is no verified Mishram Media recognition
        material. See the audit in config/recognition.ts. About picks up the next
        visible chapter number automatically (config/sections.ts), so populating
        that array needs no change here.
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
