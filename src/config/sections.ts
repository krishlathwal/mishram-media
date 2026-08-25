import { RECOGNITION_ITEMS } from "./recognition";

/**
 * Visible chapter numbering.
 *
 * Chapters 01–05 always render. §06 Recognition self-suppresses while it has no
 * verified items (see `config/recognition.ts`), so the chapter after it cannot
 * hardcode its own number — the page would jump from `05` to `07` with nothing
 * in between, which reads as a bug rather than as an editorial decision.
 *
 * About therefore takes whichever number is genuinely next in the sequence the
 * visitor sees: **06 today, 07 the moment Recognition is populated**, with no
 * code change. Recognition keeps its own fixed `06` because it only ever
 * appears in that slot.
 *
 * Deliberately a derived constant rather than a section registry — the existing
 * sections each own their index in their own config, and rewriting that system
 * to solve one adaptive label would be the wrong trade.
 */

/** 01 Collaborations · 02 What We Do · 03 Creators · 04 Work Process · 05 Selected Work. */
const ALWAYS_VISIBLE_CHAPTERS = 5;

/** Chapters between 05 and About that can suppress themselves. */
const CONDITIONAL_CHAPTERS = [RECOGNITION_ITEMS.length > 0];

const aboutNumber =
  ALWAYS_VISIBLE_CHAPTERS + CONDITIONAL_CHAPTERS.filter(Boolean).length + 1;

export const ABOUT_CHAPTER = String(aboutNumber).padStart(2, "0");
