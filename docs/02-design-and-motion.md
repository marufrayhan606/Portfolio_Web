# Visual Design and Interaction System

## Design thesis

**Subject:** an engineer building Android products and exploring applied AI/data systems for a technical, early-career audience.  
**Page job:** show the person, their strongest work, and the evidence behind their skills.  
**Visual thesis:** “A field console for software in orbit”—the precision of Android interface surfaces paired with the quiet scale of planetary navigation. Keep the portfolio editorial and human; use one orbital visualization as the distinctive signature, not a layer of sci-fi decoration everywhere.

## Design plan and critique

### Compact token system

**Color palette (named values):**

- **Abyss Ink — `#0A0D12`:** main page background, deep blue-black rather than pure black.
- **Slate Panel — `#121923`:** raised project surfaces and navigation.
- **Atmosphere — `#293849`:** secondary borders and quiet technical structure.
- **Lunar Chalk — `#E9E4D9`:** primary text, slightly warm for a more human reading surface.
- **Ion Blue — `#83B9FF`:** primary interactive accent and focus indicator.
- **Martian Copper — `#D58B66`:** restrained project/achievement accent, referencing Mars and warm hardware materials.

Use color contrast deliberately. Do not make small body copy low contrast. Copper and blue are accents, not text colors on dark panels unless contrast is checked.

**Typography:**

- **Display:** Space Grotesk, restrained use for hero and major section titles; the geometric shape nods to engineered interfaces without becoming a game HUD.
- **Body:** Inter, for readable paragraphs and controls.
- **Utility/data:** IBM Plex Mono, for semester labels, category tags, coordinates, and small metadata.

Use local/self-hosted font files if available through the framework’s font tooling; otherwise use robust system fallbacks. Avoid loading unnecessary weights.

**Layout:** wide, editorial grid with generous margins; a narrow reading measure; project cards composed like annotated case files. A thin orbital path can connect the project centerpiece to its detail markers, encoding navigation between work rather than acting as random decoration.

**Signature:** a slow, interactive “project orbit” in the hero: a compact, abstract planetary instrument that represents the portfolio’s anchor project and the connection between mobile software and exploration. It must remain abstract and original—no NASA insignia, DIU marks, copied product artwork, or implication of institutional endorsement. Clicking/tapping orbit nodes should not be required to navigate; provide clear text links alongside.

### Layout sketches

Desktop concept:

```text
┌────────────────────────────────────────────────────────────────────┐
│ MARUF RAYHAN                   Work  About  Achievements  Contact   │
├────────────────────────────────────────────────────────────────────┤
│ SOFTWARE ENGINEERING / ANDROID + DATA                               │
│ I build useful software                                             │
│ across mobile and applied intelligence.      [quiet orbit graphic] │
│ [Explore work] [GitHub ↗]                                           │
├────────────────────────────────────────────────────────────────────┤
│ SELECTED WORK                                                       │
│ ┌──────────── featured project / visual ───────────┐ ┌── two cards ┐│
│ │ DIU Campus Schedule                              │ │ Sentinel   ││
│ │ contribution • stack • links (confirmed only)    │ │ AETHER ... ││
│ └──────────────────────────────────────────────────┘ └────────────┘│
│ About / Skills             Education / Results     Achievements     │
└────────────────────────────────────────────────────────────────────┘
```

Mobile concept:

```text
┌──────────────────────────┐
│ MARUF RAYHAN       Menu  │
│ ANDROID / DATA           │
│ I build useful software  │
│ across mobile and        │
│ applied intelligence.   │
│ [Explore work]           │
│    compact orbit         │
├──────────────────────────┤
│ SELECTED WORK            │
│ DIU Campus Schedule      │
│ concise copy / links     │
│ Sentinel                 │
│ AETHER MARSIS            │
├──────────────────────────┤
│ ABOUT / SKILLS           │
│ EDUCATION / ACHIEVEMENTS │
└──────────────────────────┘
```

### Critique and refinement

A generic dark portfolio with neon green and a spinning 3D sphere would not reflect the actual mix of Android, student projects, and Mars exploration. This direction instead uses warm mineral details, typeset metadata, and a single orbital instrument tied to the project story. Remove any HUD labels that don’t communicate real information, and keep project writing more prominent than the effect.

## Visual hierarchy

1. Name and clear positioning.
2. Selected project story and meaningful project visuals.
3. Confirmed contribution and tools for each project.
4. Education and awards/participation.
5. Full skill inventory and secondary projects.

Use hierarchy, image crop, spacing, and type before glow or gradient. Gradients may appear in the orbital visualization but should not be the main background treatment.

## Motion language

Motion should make the page feel considered and provide orientation, not continuously demand attention.

- **Entrance:** one coordinated, short reveal of hero copy and the orbital graphic; use opacity and small translation only.
- **Scroll reveal:** sections can fade/translate subtly once when entering view. Keep the duration short and avoid hiding content before JavaScript loads.
- **Hover/focus:** project cards lift by at most a few pixels; links underline or shift accent; focus ring remains obvious.
- **Orbit:** low-speed rotation or parallax only while visible; pause when offscreen, unfocused where appropriate, or when reduced motion is requested.
- **No:** cursor trails, constant blinking, aggressive scroll hijacking, long pinned storytelling, autoplay video, or large elastic effects.
- **Reduced motion:** disable rotation, parallax, smooth scroll, and reveal transforms; show the static composition immediately.

Use a consistent easing curve and duration scale. Avoid animating layout dimensions. Test with keyboard focus and screen readers so animation never obscures focus or content.

## 3D and rendering guidance

Use Three.js through React Three Fiber only if the project is already configured for a client-side canvas and the interaction adds a clear visual benefit. Keep the scene intentionally small: one abstract orbiting form, a few labeled nodes, soft light, limited geometry, and no full-screen real-time scene.

Fallback plan:

1. Render a CSS/SVG static illustration by default or while WebGL is unavailable.
2. Load the 3D scene lazily after the first viewport has rendered.
3. Use a poster image/static SVG for low-powered devices, reduced-motion users, and failures.
4. Do not block the hero, navigation, or project text on WebGL initialization.
5. Avoid external texture downloads where possible; do not use assets without usage rights.
6. Give the canvas an accessible label or mark it decorative if adjacent text communicates its meaning.

If 3D creates noticeable jank, poor mobile performance, or visual clutter, ship the SVG/CSS version. Visual quality and usable content outrank 3D complexity.

## Component visual behavior

- **Navigation:** quiet, compact, sticky only if useful; clear current/hover/focus states; mobile menu has correct focus handling and Escape support.
- **Project cards:** different imagery or compositional emphasis per project; meaningful copy first, tags second; no fake click-through cards.
- **Achievements:** a timeline/list ordered by event year, with placement typography clearly distinct from participation. Do not use rank badges for participant-only events.
- **Academic results:** compact grid/list with semester and score labels; no chart implying a cumulative trend unless it is clear what the numbers represent.
- **Skills:** grouped typographic list or simple chips; no meters, stars, or unsupported proficiency percentages.
- **Portrait:** only after supplied; use a considered crop and text alternative. Do not generate a synthetic face.

## Responsive and accessible design

- Start with a single-column mobile layout; expand into a deliberate asymmetrical grid at tablet/desktop widths.
- Ensure no horizontal scrolling at 320px and that touch targets are comfortably sized.
- Keep line length around 55–75 characters for body text on wide screens.
- Provide visible `:focus-visible` styles for every interactive control.
- Preserve contrast, semantic structure, labels, and meaningful alt text.
- Don’t communicate status through color alone.
- Respect `prefers-reduced-motion` and browser zoom.
- Keep all essential information outside canvas rendering.

## Asset direction

Prefer real project screenshots, app icons, diagrams, and a supplied portrait. Ask for or source them from links Maruf provides. Use abstract original diagrams as a fallback. Do not fake screenshots, logos, awards, team imagery, or endorsement marks.
