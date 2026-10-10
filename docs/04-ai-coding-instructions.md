# Instructions for an AI Coding Agent

You are implementing the personal portfolio of **Md. Maruf Rayhan**. Read `01-product-and-content.md`, `02-design-and-motion.md`, and `03-architecture-and-build-plan.md` before changing code.

## Working rules

1. Inspect the existing repository, its instructions, package manager, framework version, and current files before editing. Preserve working conventions and user changes.
2. Build with React, Next.js App Router, and TypeScript if that matches the existing project. Do not replace the project setup without a concrete technical reason.
3. Follow the design thesis: editorial engineer’s field console, warm dark mineral palette, considered typography, one restrained orbital visualization. Avoid generic neon dashboards and decorative sci-fi HUD clutter.
4. Treat all portfolio details as user-supplied unless the brief explicitly notes external corroboration. Never invent roles, project links, metrics, dates, awards, employers, testimonials, stack, or contact details.
5. Keep the site useful without animation, JavaScript enhancements, WebGL, remote assets, or a portrait. Never generate or substitute a face.
6. Make the page responsive, semantic, keyboard accessible, and respectful of `prefers-reduced-motion`.
7. Store content in typed data modules. Hide fields and actions whose values are unknown; do not display `TBD`, dummy URLs, fake download buttons, or dead anchors.
8. Keep 3D optional and isolated. First implement a static SVG/CSS fallback. Lazy-load the client-only canvas, pause it when not visible, cap rendering cost, and retain the fallback on unsupported devices or errors.
9. Keep copy plain, specific, and concise. Avoid claims such as “6,000 active users”; the supplied public site wording is “6,000+ DIU Students.” Omit the figure unless its scope and date can be represented accurately.
10. Follow the repository’s own instructions. Do not add dependencies, tests, or scripts unless needed for the requested implementation and compatible with project conventions.

## Build sequence

- Inspect repository and identify existing app entry points.
- Create the page shell and typed content model.
- Implement responsive visual tokens, navigation, hero, and static orbital visual.
- Add projects, about, skills, education/results, achievements, and contact/footer sections.
- Implement accessible interactions and restrained motion.
- Add the optional 3D enhancement only if it adds value after the static experience is complete.
- Review every public factual claim against the source brief.
- Run only relevant checks according to the project instructions or explicit user request; report precisely what was run.

## Before finalizing

- Confirm all unknown values are omitted from visible UI.
- Confirm participant events are not presented as placements.
- Confirm semester results are not labeled as cumulative CGPA without user confirmation.
- Confirm no false institutional endorsement is suggested by the Mars project visuals or copy.
- Confirm mobile navigation, focus styles, reduced motion, image fallbacks, metadata, and no horizontal overflow.
- Summarize files changed and any remaining content needed from Maruf.
