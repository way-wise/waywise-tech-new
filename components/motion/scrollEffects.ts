/**
 * Site-wide switch for the main website's scroll effects (owner, 2026-11-25: every page scrolls
 * normally, like the Blog Details page).
 *
 * Off (false) turns off:
 *   - PinnedSection pinning and its holds (pinned-section.css), so every section sits in normal flow;
 *   - the Our Process scroll journey (ProcessJourney.tsx): the rope is shown fully drawn, the steps
 *     rest, no phone pill, no extended pin;
 *   - the FAQ page timeline (FaqQuestions.tsx): static track with inactive points, the card no
 *     longer sticks;
 *   - the About "Our Global Presence" scroll-linked card convergence (about-presence.css): the cards
 *     use their one-time Reveal rise instead;
 *   - the Insights photo drift (insights-articles.css).
 *
 * These "off" states are the designs' own reduced-motion states, so no layout or content changes.
 *
 * Not affected (kept on purpose): the CardStack stacks (Homepage Our Work, Industries Industry
 * Solutions, including its depth layering), the Navbar's hide-on-scroll, and the one-time entrance
 * animations (Reveal, MaskLine, RollingNumber, the Hero load animation).
 *
 * CSS reads it through `data-scroll-effects` on <html>, set by app/layout.tsx from this value.
 * Set it to true to bring every effect back exactly as it was.
 */
export const SCROLL_EFFECTS = false;
