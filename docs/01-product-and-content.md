# Product Requirements and Content Source

## Product summary

Create a personal portfolio for **Md. Maruf Rayhan**, a Software Engineering undergraduate at Daffodil International University, positioning him across Android development and AI/Data Science. The site should communicate technical range through a small set of clear project stories, academic and competition highlights, and direct links to professional profiles.

**Primary audience:** recruiters, engineering leads, collaborators, and technical peers.  
**Primary job:** help a visitor understand what Maruf builds, see evidence in projects and achievements, and find a way to contact or follow him.  
**Portfolio personality:** precise, curious, modern, technically grounded, and confident without inflated claims.

## Product goals

1. Establish a memorable identity that combines mobile engineering and applied AI/data work.
2. Make the best work scannable, then provide deeper project details on demand.
3. Present education, results, and competition participation accurately.
4. Work beautifully on phones and desktops, load quickly, and remain usable without animation or 3D.
5. Make content, links, and metrics simple for Maruf or a coding agent to update.

## Non-goals

- Do not fabricate a company, employment history, client work, testimonials, user counts, awards, or project outcomes.
- Do not make a backend, CMS, contact database, login, or analytics dashboard part of the initial build.
- Do not make 3D effects necessary to understand the portfolio or navigate it.
- Do not publish a personal email, phone, home address, or portrait without Maruf supplying and approving it.

## Visitor journeys

### Recruiter or hiring manager

Arrives → understands Android + AI/Data Science focus → scans selected projects → checks skills and education → opens GitHub/LinkedIn or uses the approved contact route.

### Technical collaborator

Arrives → explores the featured product and project details → checks source/demo links where available → sees competition participation and technical focus → reaches out.

### Mobile visitor

Uses compact navigation → reads the hero and selected projects without horizontal overflow → opens links with clear targets → can navigate and understand the site if motion is reduced or 3D fails.

## Information architecture

Initial recommendation: **single-page portfolio** with anchored sections and optional project detail routes only if there is enough content to justify them.

1. **Header/navigation** — wordmark or name, Work, About, Achievements, Contact, theme optional only if a real light theme is implemented.
2. **Hero** — name, concise positioning, portrait if supplied, primary project cue, links to work and contact/profile.
3. **Selected work** — DIU Campus Schedule, Sentinel, AETHER MARSIS; other projects available in a secondary grid/list.
4. **About** — short profile grounded in the supplied education and interests.
5. **Skills** — grouped by discipline, avoid implying equal depth across every tool.
6. **Education** — DIU degree information and semester results, with correct labels.
7. **Achievements and events** — placements and participation with event/year.
8. **Contact/footer** — only approved contact channels and profile links.

Navigation labels should match the content. Do not force sections or controls that have no content.

## Profile content source

Everything below is supplied by Maruf through the conversation, including details collected in his Gemini account. It is suitable as drafting input but should be confirmed before publication. The external links at the bottom provide limited corroboration for profile identity and DIU Campus Schedule.

### Identity and positioning

- Name: **Md. Maruf Rayhan**.
- Headline supplied: **Software Engineer | Specializing in Android Development & Data Science**.
- Location supplied: **Dhaka, Bangladesh**.
- Hometown supplied: **Shariatpur**.
- Education supplied: **Final-year undergraduate pursuing a B.Sc. in Software Engineering, major in Data Science, at Daffodil International University (DIU)**.
- About direction supplied: passionate about building scalable Android applications, robust backend systems, and integrating machine-learning models into practical software solutions.
- Confirm current student status and wording before launch because “final-year” changes over time.

Suggested editable draft (not a claim of verified employment):

> I’m Md. Maruf Rayhan, a Software Engineering student at Daffodil International University focused on Android development and Data Science. I enjoy building useful mobile products and exploring how machine learning can solve practical problems.

Use only after Maruf approves the voice and degree phrasing.

### Education and semester results

**Daffodil International University (DIU)**  
B.Sc. in Software Engineering, major in Data Science (as supplied).

| Semester | Result supplied |
| --- | ---: |
| Fall 2023 | 3.91 |
| Spring 2024 | 3.88 |
| Fall 2024 | 3.96 |
| Spring 2025 | 3.89 |
| Summer 2025 | 3.94 |
| Fall 2025 | 3.95 |
| Spring 2026 | 3.94 |
| Summer 2026 | 3.93 |

The eight-value arithmetic mean is 3.925. Do not call this cumulative CGPA unless Maruf confirms the calculation and official label. Prefer showing the semester values as a compact academic record and never imply an official transcript verification.

### Skills supplied

Group skills so visitors can scan them. Confirm proficiency and current relevance before publication; avoid progress bars or star ratings.

- **Languages:** C, C++, Java, Python, SQL, Kotlin.
- **Android:** Jetpack Compose, MVVM, Clean Architecture, Hilt, Room, Retrofit, Ktor, Koin.
- **Backend and web:** FastAPI, Spring Boot, Node.js, SQLAlchemy, MySQL, MongoDB.
- **Data Science and AI/ML:** NumPy, Pandas, Matplotlib, scikit-learn, PyTorch, local Small Language Models (SLMs), Model Context Protocol (MCP), agentic AI workflows.

### Projects supplied

Project names and descriptions below were supplied by Maruf. Individual authorship, role, shipped status, stack, and project URLs remain to be confirmed unless explicitly stated.

#### DIU Campus Schedule

A mobile application for DIU academic life, with class routines, examination schedules, announcements, and faculty information. The project’s public website identifies Md. Maruf Rayhan as an SWE-41 Android Developer. Its website uses “6,000+ DIU Students”; do not rewrite that as “6,000 active users.”

Potential card copy:

> An academic companion for DIU students, bringing class and exam schedules, announcements, and campus information into one mobile experience.

Add verified personal contribution, technologies, screenshots, Play Store link, and source/demo links when supplied.

#### Sentinel

Android application focused on on-device scam and spam protection using machine learning. Confirm project status, personal contribution, model approach, platform constraints, and public links before making technical claims.

#### AETHER MARSIS

Interactive Mars exploration and mission-support platform developed for the NASA Space Apps Challenge. Confirm event year, team name, personal contribution, and demo/repository link. Do not imply NASA employment, endorsement, or an award.

#### AuraScribe

AI-assisted text-processing software system written in Python. Confirm what it does, the AI methods used, authorship, status, and links.

#### SyncUp

Group-management and announcements application designed for class representatives and students. Confirm role, implementation details, status, and links.

#### DIU Result

Application built to access university examination results from the student portal. Confirm public availability, access method, personal role, and links.

#### OneSpender

Expense-tracking utility app. Add a concise feature description and links only after confirmation.

#### NapTrap

Personal utility app. Add a concise explanation of what it does and links only after confirmation.

Recommended initial featured set: **DIU Campus Schedule**, **Sentinel**, and **AETHER MARSIS**, once the project roles and links are confirmed. Keep remaining projects in a secondary section or omit until they have enough evidence and detail.

### Events, competitions, and achievements supplied

- **DIU CodeTrap Programming Contest 2024** — 8th position.
- **4th National Data Science Summit 2024** — poster presentation on “AI in Education”; 2nd runner-up.
- **5th National Data Science Summit 2026** — Data Hackathon; 6th place.
- **DIU CodeTrap Programming Contest 2025** — participant.
- **ICPC** — participant; year/round/team result not supplied.

Display placements separately from participation. Confirm event naming, category, team attribution, and whether “2nd runner-up” is the organizers’ exact title. Do not imply an ICPC rank or advancement.

### Contact and social links supplied

- GitHub: https://github.com/marufrayhan606
- LinkedIn: https://www.linkedin.com/in/marufrayhan606
- Facebook: https://www.facebook.com/marufrayhan606/
- Public contact email: not provided.
- Professional portrait: desired, image not yet supplied.

GitHub public profile previously showed the name Md. Maruf Rayhan, Bangladesh, five public repositories, and pinned repositories Beecrowd-Solves and Competitive-Programming at time of lookup. Profile data may change. LinkedIn and Facebook pages were not accessible in the prior check. Include Facebook only if Maruf says it adds professional value.

## Functional requirements

- Responsive layout from narrow phone widths through wide desktop.
- Semantic landmarks, heading hierarchy, meaningful link names, keyboard operation, and visible focus.
- Reduced-motion support. All important content and actions remain available without motion.
- Project cards use clear actions: “View project,” “Source code,” or “Live demo” only when a real destination exists.
- External links are visibly identifiable and open safely.
- No fake download CV, email, social, or project controls. Hide a control until its destination exists.
- The hero’s main action scrolls to selected work; a secondary action goes to contact/profile only if usable.
- 3D and animated visuals have a static fallback and never block page content.
- Use image alternative text; decorative visuals should be ignored by screen readers.
- Metadata, social preview image, favicon, and page title use approved identity and copy.

## Content integrity requirements

- Store editable content in typed data modules, not scattered through JSX.
- Distinguish user-supplied facts from externally checked facts in content notes.
- Do not invent metrics, project ownership, employment, dates, testimonials, awards, download counts, or live capabilities.
- Do not expose private information in metadata, source maps, or visible copy.
- The 6,000+ claim must retain its original scope and attribution or be omitted.
- Never use fake logo marks for companies, universities, NASA, contests, or technologies. Use plain text marks where official assets are unavailable.

## Success criteria

- A first-time visitor can identify Maruf’s focus and best project within one screenful.
- Selected projects show problem/context, Maruf’s confirmed contribution, stack, and real links where available.
- The achievements section clearly distinguishes placements from participation.
- Academic entries use accurate semester labels and do not imply a verified cumulative CGPA.
- The site is navigable by keyboard and usable with reduced motion, small screens, and 3D disabled.
- No unapproved contact details or empty/fake links appear.
