# Technical Architecture and Build Plan

## Recommended baseline

Use the latest stable Next.js App Router supported by the project’s installed environment, React, and TypeScript. Pin versions in the package manager lockfile and verify current official documentation during implementation. Use CSS Modules or a small, clearly structured global CSS system; avoid adding a component library unless it improves delivery without flattening the visual direction.

Recommended optional packages, to adopt only when justified:

- **Motion:** Framer Motion for a small set of entrances and interactive transitions; CSS transitions for simple hover/focus.
- **3D:** `three` + `@react-three/fiber` + `@react-three/drei` only for the isolated hero visualization. Prefer CSS/SVG if the existing app does not need WebGL.
- **Icons:** inline SVG or a small icon library; no emoji used as interface icons.
- **Content:** typed local TypeScript data for the initial static portfolio. No CMS required.

Check installed dependencies and existing conventions before changing the stack. Do not upgrade or replace working project configuration without a reason.

## Architecture principles

- Server-render content and layout by default; isolate client components to interactive controls, motion, and the 3D canvas.
- Keep the primary page fast and readable before any client JavaScript enhancement loads.
- Keep content in typed data objects and presentation in components.
- Dynamically import the 3D visual with SSR disabled only for the canvas component; display the SVG/CSS fallback during loading and on failure.
- Avoid a large global state store. Local React state is sufficient for navigation/menu interactions.
- Use semantic HTML and native browser navigation wherever possible.
- Keep route structure simple; avoid premature abstractions.

## Suggested structure

Adapt this to the repository’s existing structure instead of forcing a rewrite:

```text
app/
  layout.tsx                 # root metadata, fonts, global shell
  page.tsx                   # single-page portfolio composition
  globals.css                # resets, tokens, base styles
  projects/[slug]/page.tsx   # optional, only if detailed case studies exist
components/
  site-header.tsx
  mobile-navigation.tsx
  hero-section.tsx
  orbital-visual.tsx         # client-only, lazy; fallback sibling
  orbital-visual-fallback.tsx
  section-heading.tsx
  project-card.tsx
  project-grid.tsx
  skills-groups.tsx
  education-record.tsx
  achievements-list.tsx
  site-footer.tsx
content/
  profile.ts                 # name, headline, bio, location, social links
  projects.ts                # project copy, status, technologies, links
  education.ts               # degree and semester records
  achievements.ts            # contest/presentation entries
public/
  images/                     # approved portrait and project media
  social-preview.png          # approved Open Graph image
```

For a very small implementation, place data in `src/data` and components in `src/components`; preserve one clear source of truth.

## Content types

Use explicit, editable types rather than informal string arrays. Example shape:

```ts
export type Link = { label: string; href: string; external?: boolean };
export type Project = {
  slug: string;
  name: string;
  summary: string;
  status?: "shipped" | "prototype" | "in-progress" | "unknown";
  role?: string;
  contribution?: string;
  technologies: string[];
  links: Link[];
  featured: boolean;
  image?: { src: string; alt: string };
};
```

Unknown values should be omitted, not rendered as empty strings or fake actions. Keep factual notes in source comments or a content verification file, not public UI.

## Page and component responsibilities

- `app/page.tsx`: compose sections and provide stable IDs for anchor navigation.
- `SiteHeader`: desktop links and accessible mobile menu. Support Escape, focus order, and menu close on navigation.
- `HeroSection`: positioning, approved introduction, actual actions, portrait if supplied, and visualization wrapper.
- `OrbitalVisual`: isolated client-only enhancement; no essential content or navigation inside its canvas.
- `ProjectCard`: accepts project data and renders only real links and known facts.
- `SkillsGroups`: groups exact supplied technologies; no self-rated proficiency bars.
- `EducationRecord`: semester label + result; do not calculate or display CGPA by default.
- `AchievementsList`: sort by year while separating placements from participation.
- `SiteFooter`: approved profile/contact links only.

## Styling approach

- Define design tokens as CSS custom properties at `:root` and color-scheme declarations.
- Use a small spacing/type scale and responsive grid breakpoints tied to actual layout changes.
- Use CSS Grid for editorial composition and Flexbox for small alignment tasks.
- Prefer component-scoped class names and avoid broad element selectors that create specificity conflicts.
- Use fluid type (`clamp`) for display headings; set safe min/max sizes.
- Use `next/font` or equivalent local font optimization where the selected fonts are available.
- Ensure focus, disabled, hover, and active states are intentionally designed.
- Avoid fixed heights for sections that contain variable content.

## Performance and resilience

- Keep the hero text and primary CTA in server-rendered HTML.
- Lazy-load the canvas and below-the-fold imagery; set image dimensions/aspect ratios to prevent layout shift.
- Use optimized local images and modern formats; do not load huge source screenshots as full-resolution backgrounds.
- Avoid expensive scroll listeners. Use Intersection Observer or library primitives for section visibility.
- Pause render loops when not visible and cap device pixel ratio for 3D.
- Detect reduced motion and WebGL availability; render the static fallback.
- Avoid autoplay media and third-party embeds that delay first paint.
- Maintain a working layout if JavaScript, WebGL, or remote fonts fail.

## Accessibility implementation checklist

- One descriptive `h1`, logical heading order, landmarks, and skip link.
- All navigation, menu, and project actions operable by keyboard.
- Strong visible focus state; no focus hidden behind sticky header.
- Mobile menu has a button name, `aria-expanded`, relationship to its panel, Escape behavior, and focus management.
- All meaningful images have useful alt text; decorative illustrations use empty alt or `aria-hidden`.
- Canvas is decorative if redundant; otherwise provide a concise accessible description outside canvas.
- Respect `prefers-reduced-motion` in both CSS and JS.
- Contrast-check body, muted, and accent text.
- Do not use color alone to distinguish achievements or interaction states.

## Metadata and search previews

- Set a concise, accurate page title and description from approved identity and positioning.
- Set Open Graph and Twitter/social metadata with a supplied/approved image.
- Add canonical URL only after a real domain is chosen.
- Add favicon/app icon from approved identity artwork.
- Avoid unsupported structured data such as job title, employer, or awards unless confirmed.

## Content verification before launch

Confirm or obtain links for:

- Current student status, official degree wording, and expected graduation date.
- Semester-result label and whether results may be public.
- Project links, current status, role, personal contribution, and technologies.
- DIU Campus Schedule link and the exact scope/date of any usage metric.
- Sentinel and AETHER MARSIS demos/repositories and personal contribution.
- Event naming, result categories, team attribution, and ICPC event/year.
- LinkedIn ownership and portfolio-appropriate contact destination.
- Portrait rights and alt text.

## Implementation phases

### Phase 1 — Inspect and scaffold

Inspect the existing repository, package manager, installed Next.js version, scripts, and design conventions. Preserve existing working setup. Implement the content data model and semantic page skeleton first.

### Phase 2 — Visual foundation

Add tokens, font setup, responsive container/grid, header, hero, and static orbital fallback. Check the page at phone, tablet, and desktop sizes.

### Phase 3 — Portfolio content

Build project cards, skills, education/results, achievements, about, and footer from typed content. Keep unknown links and fields hidden.

### Phase 4 — Interaction and motion

Add accessible mobile navigation, subtle section/card motion, and reduced-motion behavior. Ensure content works when animation is disabled.

### Phase 5 — Optional 3D enhancement

Only after the static design is complete, add a lazy-loaded, low-cost orbital canvas if it improves the experience. Keep fallback and static rendering robust.

### Phase 6 — Content and quality review

Review every public claim against the supplied brief and available sources. Check keyboard use, reduced motion, responsive overflow, image behavior, metadata, console/runtime errors, and load performance. Do not claim completion of checks that were not run.

## Definition of done

- The site builds with the repository’s documented package manager and commands.
- Core content renders server-side and works without 3D.
- All project and social links have real destinations.
- No unconfirmed metric, role, award, skill level, or employment claim is added.
- Mobile menu and all controls work with keyboard.
- Reduced-motion mode removes nonessential movement.
- Responsive layouts have no horizontal overflow at supported widths.
- Images have dimensions and appropriate alt text.
- Page metadata is accurate and no fake contact/resume actions remain.
- Any checks run are reported accurately with their results.
