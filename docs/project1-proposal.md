# Project 1: Web Project Proposal

**Course:** CMST 387 6300 — Principles of Web Design and Technology III
**Student:** Gilbert Anderson
**Proposed site:** CMST 387 Web Design Resource Hub
**Deployment target:** https://cmst387-umgc-ganderson58.azurewebsites.net

---

## Project Overview

This proposal describes a **Web Design Resource Hub**: an educational site that collects
practical guidance across the five core areas of this course — **User Experience Design,
Accessibility and Inclusive Design, Web Application Security, Website Optimization, and
Responsive Web Design** — into a single, well-organized reference for students and
early-career web developers.

The site has an unusual obligation. A resource hub that teaches accessibility must itself be
accessible; a hub that teaches responsive design must itself be responsive; a hub that
teaches optimization cannot ship a bloated page. The site is therefore its own primary
demonstration, and every claim it makes is verifiable by inspecting the site that makes it.
Failing any of these standards would undermine the content directly.

**Intended audience.** Students in web development programs, career-changers learning
front-end development, and working developers needing a quick reference. This audience is
global and linguistically diverse — web development draws heavily from non-native English
speakers reading English-language documentation. It includes developers with disabilities,
who are underserved by technical documentation that is itself inaccessible. It spans a wide
device and bandwidth range: developers read documentation on desktop workstations while
coding, and on phones while commuting or away from a desk.

**Site scope.** A homepage introducing the hub, five topic sections corresponding to the
course areas above, and a responsive contact form. Full page inventory appears in the Site
Structure section, with wireframes and a site map in Sections 13 and 14.

Accessibility targets throughout are stated against **WCAG 2.2 Level AA**, the current W3C
Recommendation and the standard aligned with Section 508 expectations for educational
content.

---

## Proposed Site Structure

| Page | Purpose |
|---|---|
| **Home** | Introduces the hub, states its purpose, and provides entry points to all five topic areas |
| **UX Design** | Design principles, usability heuristics, user research methods, UX artifacts |
| **Accessibility & Inclusive Design** | WCAG conformance, assistive technology, inclusive design methodology |
| **Web Application Security** | HTTPS/TLS, input validation, XSS and CSRF defense, secure headers, authentication |
| **Website Optimization** | Performance budgets, image optimization, caching, Core Web Vitals |
| **Responsive Web Design** | Mobile-first method, fluid grids, breakpoints, responsive media |
| **Contact** | Responsive, accessible contact form with validation and confirmation |
| **About** | Scope of the hub, author, accessibility statement |

---

## 1. Design Principles for Navigability

Navigation will be grounded in established principles rather than ad-hoc decisions.

**Consistency and predictability.** The primary navigation will appear in the same location
with the same ordering on every page, satisfying WCAG 2.4.5 (Multiple Ways) and 3.2.3
(Consistent Navigation). Users build a mental model of a site within the first few pages;
relocating or reordering navigation destroys that model and disproportionately harms users
with cognitive disabilities and screen reader users who navigate by landmark.

**Recognition over recall.** Nielsen's heuristic applies directly to reference material.
Persistent breadcrumbs, a visible "you are here" state in the navigation, and descriptive
link text ("Read the guide to responsive images" rather than "Click here") let users orient
themselves without holding site structure in working memory. A reader who arrives from a
search engine on an interior page must be able to tell immediately where they are.

**Visibility of system status.** Loading states, form validation, and confirmation messages
will be announced both visually and programmatically through ARIA live regions, so sighted
and non-sighted users receive the same feedback at the same time.

**Clear information scent.** Section labels will use terms the audience actually searches
for. "Website Optimization" is more findable than "Performance Engineering"; "Web
Application Security" is more findable than "Hardening." Labels are a navigation decision:
a link is findable only when its wording matches the reader's vocabulary.

**Progressive disclosure.** Each topic section opens with a plain-language overview before
descending into technical specifics, so a beginner is not confronted with the same density
as a practitioner looking up a detail.

**Forgiveness.** No page will be a dead end; every page offers onward routes to related
topics. Form errors will be recoverable without loss of entered data.

---

## 2. Optimizing Layout for Desktop and Mobile

The site will use a **mobile-first responsive** approach, building the single-column
small-screen layout first and progressively enhancing to multi-column arrangements at larger
viewports. Mobile-first enforces content prioritization: if a module cannot justify its place
in a 375px column, it rarely deserves prominence at 1440px.

Implementation will use **CSS Grid and Flexbox with fluid units** (`rem`, `%`, `fr`,
`clamp()`) rather than fixed pixel widths, so layout responds to both viewport size and
user-set text size. Breakpoints will be placed where the *content* breaks rather than at
named device widths, which age poorly as devices change.

The layout must satisfy **WCAG 1.4.10 (Reflow)**: content remains usable at 320 CSS pixels
wide without two-dimensional scrolling. This is the same requirement as supporting 400% zoom
on a 1280px desktop display — a single technical solution serving both low-vision desktop
users and mobile users, a clear instance of the curb-cut effect.

**Desktop-specific optimizations.** Wider viewports gain a persistent sidebar table of
contents for long technical articles, and a constrained reading measure of 60–75 characters
rather than full-width text, which becomes difficult to track across a wide monitor.

**Mobile-specific optimizations.** Navigation collapses to a labeled menu button — labeled
"Menu" rather than relying on an unlabeled hamburger icon. Touch targets meet **WCAG 2.5.8
(Target Size, Minimum)** at 24×24 CSS pixels, with 44×44 for primary actions and adequate
spacing to prevent mis-taps. Hover-dependent interactions are avoided entirely, since hover
does not exist on touch; anything revealed on hover is also reachable by focus and tap.

**Code samples**, which this site will contain heavily, present a specific responsive
challenge: they cannot reflow arbitrarily without changing meaning. They will scroll
horizontally within their own container rather than forcing the whole page to scroll
sideways, with a visible scroll affordance.

Performance is treated as an accessibility concern: responsive images via `srcset`,
compressed assets, and core content that functions without JavaScript.

---

## 3. Accessibility Testing Methods

The following methods **could be employed** to verify the design. No user testing will be
conducted as part of this project; this section identifies appropriate methods and the
distinct defect classes each surfaces.

**Automated scanning** would run continuously against every build (see Section 5). Automated
tools reliably catch missing alternative text, insufficient contrast, missing form labels,
and invalid ARIA. They are fast and repeatable, but industry estimates consistently place
automated detection at roughly 30–40% of WCAG issues. A tool can confirm alt text exists; it
cannot judge whether the text is *meaningful*, or whether a heading structure is *logical*.

**Manual keyboard-only testing** would verify that every interactive element is reachable and
operable via Tab, Shift+Tab, Enter, Space, and arrow keys; that focus order follows visual
order; that focus indicators remain visible and unobscured (2.4.11); and that no keyboard
trap exists. This is the highest-yield manual test relative to time invested.

**Screen reader testing** across **NVDA with Firefox, JAWS with Chrome, and VoiceOver with
Safari**, plus **TalkBack** on Android, would confirm content is announced in sensible order
with correct roles, states, and names. Multiple pairings matter because screen reader and
browser combinations differ meaningfully in ARIA support. For this site, screen reader
testing of **code blocks** deserves specific attention, since punctuation-dense samples are
announced poorly by default.

**Expert heuristic evaluation** against WCAG 2.2 AA success criteria and Nielsen's ten
heuristics provides structured expert review at low cost.

**Cognitive walkthrough** would step through core tasks — "find guidance on preventing XSS,"
"submit a question through the contact form" — asking at each step whether a first-time user
would know what to do and would recognize progress toward the goal.

**Usability testing with participants with disabilities** most directly validates real-world
usability and would be the recommended next step beyond this proposal. Automated and expert
methods find violations; only testing with actual assistive technology users reveals whether
the site is genuinely *usable* rather than merely conformant.

**Zoom, reflow, and simulation testing** would complete coverage: 400% browser zoom,
text-only zoom, Windows High Contrast Mode, and color-blindness simulators.

---

## 4. Features Supporting Specific Impairments

**Visual impairments.** Semantic HTML with correct heading hierarchy and ARIA landmarks
provides screen reader structure. Meaningful images — including diagrams explaining
responsive breakpoints or request flows — receive descriptive alternative text, with complex
diagrams additionally described in adjacent body text, since a one-line `alt` cannot carry a
full architectural diagram. Decorative images receive `alt=""`. Text contrast meets 4.5:1,
and 3:1 for large text and UI components (1.4.11). Syntax highlighting in code samples will
be contrast-checked, as popular highlighting themes routinely fail against their backgrounds.
Color never carries meaning alone. The site supports 400% zoom and honors user text spacing
(1.4.12). A "skip to main content" link opens the tab order.

**Auditory impairments.** Any video tutorial carries accurate synchronized captions (1.2.2)
and a full transcript (1.2.1), with audio description of essential visual information where
a demonstration shows code on screen (1.2.5). Text remains the primary format for technical
content rather than video-only explanation, which serves deaf users, non-native speakers, and
anyone who prefers to scan rather than watch. No information is conveyed by sound alone.

**Motor impairments.** Full keyboard operability with no keyboard traps (2.1.1, 2.1.2) is
baseline. Targets meet 2.5.8 with generous spacing. Any drag-based interaction provides a
single-pointer alternative (2.5.7, Dragging Movements). The contact form imposes no time
limit (2.2.1) and preserves entered data on validation failure, so a slow typist is never
forced to re-enter a long question. "Copy code" buttons give keyboard users an alternative to
manually selecting text across a multi-line block.

**Cognitive impairments.** Plain language, short paragraphs, and generous white space reduce
load. Consistent navigation prevents disorientation. Multi-step technical processes are
broken into numbered steps with visible progress. Technical jargon is defined on first use
and collected in a glossary — significant on a site whose subject matter is dense with
acronyms (CSRF, TLS, LCP, ARIA). Error messages identify the problem *and* state the fix
(3.3.3). Autoplay, unexpected motion, and flashing are avoided (2.3.1), and
`prefers-reduced-motion` is honored. Icons pair with text labels rather than standing alone.

Organizing by impairment category is a useful device, but the intent is universal: captions
serve someone in a quiet library, plain language serves a tired reader at midnight, and large
targets serve anyone using a phone one-handed.

---

## 5. Automated Compliance Tools

Automated checking would operate at three layers so defects are caught as early as possible.

**During development,** the **axe DevTools** browser extension and **WAVE** (WebAIM) give
immediate in-browser feedback while a page is being built. **Lighthouse**, built into Chrome
DevTools, contributes an accessibility score alongside the performance metrics this site also
cares about.

**In continuous integration,** **Pa11y CI** or **axe-core** would run against every push to
the project's GitHub repository, wired into the existing GitHub Actions workflow that deploys
this site to Azure App Service. Configuring the build to fail on new violations prevents
regressions from reaching production — the decisive advantage of automation over periodic
manual audits. This also demonstrates the site's own subject matter, since the same pipeline
can run **Lighthouse CI** for optimization budgets.

**For ongoing monitoring,** the **IBM Equal Access Accessibility Checker** and **ARC Toolkit**
add rule coverage beyond axe, and crawlers such as **Siteimprove** or **Tenon.io** can scan
the full site on a schedule and trend results over time.

Supporting checks include the **W3C Markup Validation Service** (valid HTML underpins
assistive technology support), the **WebAIM Contrast Checker** during design, and readability
scoring through the **Hemingway Editor** or Flesch-Kincaid analysis.

Two caveats must accompany any automated program. First, these tools verify roughly a third
of WCAG criteria; a clean scan is a floor, not a certificate of conformance. Second, rule
sets must be kept current as standards evolve — a stale scanner silently stops testing
against the standard it claims to enforce.

---

## 6. Cultural Differences and Language Needs

The site declares its language with the `lang` attribute (3.1.1) and marks inline-language
passages with `lang` on the containing element (3.1.2), so screen readers switch
pronunciation rather than reading foreign text with English phonetics.

Content will be written in **plain, idiom-free English**. This matters acutely for a technical
audience: web development documentation is read worldwide by non-native English speakers, and
idioms, sports metaphors, and cultural shorthand ("out of the box," "silver bullet," "down to
the wire") are exactly the constructions that fail those readers and defeat translation tools.
Technical acronyms will be expanded on first use.

**Formats will not assume a single locale.** Dates appear unambiguously ("March 4, 2026"
rather than 3/4/26, which reads as April 3 in much of the world). Times state their zone.
The contact form accepts international name, address, and phone formats rather than enforcing
US-only patterns — and notably will not require a "first name / last name" split, which
misrepresents naming conventions in much of the world.

**Examples and imagery** will represent a range of ages, ethnicities, abilities, and
backgrounds rather than defaulting to a narrow stereotype of who writes code. Sample data in
code examples will use varied, non-US-centric names and addresses, since example code is
itself a quiet signal about who the material is written for. Icons will be checked for
culturally specific meanings.

**Structurally,** the design accommodates text expansion — translated German or Spanish text
can run 30% longer than English — by avoiding fixed-width containers that would clip or
overflow. Where translation is offered, professionally translated key pages are preferable to
machine translation for security guidance, where a mistranslation could produce an insecure
implementation. Right-to-left support via CSS logical properties is a reasonable enhancement.

---

## 7. Collecting User Feedback for Inclusivity

Feedback mechanisms must themselves be accessible, or they systematically exclude the users
whose input matters most.

An **accessibility feedback link** will appear in the site footer on every page, offering
multiple channels — form, email, and an alternative contact method — since a user blocked by
an inaccessible form needs a different route to report exactly that problem.

The **contact form** itself doubles as a general feedback channel, with an optional category
selector so accessibility reports can be triaged distinctly from content questions.

A **short, optional on-page prompt** ("Was this page helpful?") would gather lightweight
per-page signal without a modal interruption, and would remain fully keyboard- and
screen-reader-operable.

**Analytics** identify friction indirectly: high-exit pages, failed internal searches (a
direct signal of vocabulary mismatch between the site's terms and the reader's), and
rage-clicks. Analytics reveal *where* users struggle but never *why*, so they generate
questions rather than answers.

**Selecting methods deliberately rather than by convenience.** Rohr (2022) frames UX research
methods along three dimensions — *attitudinal vs. behavioral*, *qualitative vs.
quantitative*, and *context of use* — and that framework explains why no single mechanism
above is sufficient. Analytics are behavioral and quantitative: they record what users did,
at scale, but cannot explain intent. Surveys and the "was this helpful?" prompt are
attitudinal: they capture what users *say*, which may diverge from what they do. Usability
testing is behavioral and qualitative: small samples, but it reveals causes. An inclusive
feedback program needs coverage across all three dimensions, because a program built only
from analytics will systematically miss the users whose difficulties cause them to leave
before generating any signal at all — exactly the users this site most needs to hear from.

**Community channels** — a public issue tracker on the project's GitHub repository — suit this
audience specifically, since developers are already comfortable filing issues and will often
supply precise reproduction steps and environment details.

**Recruited usability sessions and an advisory panel** of compensated participants including
assistive technology users, ESL developers, and beginners would provide structured
qualitative input on a recurring basis.

Feedback must close the loop. Reports that vanish without acknowledgment train users to stop
reporting. A published response commitment and a visible changelog of accessibility fixes
demonstrate that input produces change.

---

## 8. Inclusive Design Methodologies

Gilbert (2019) frames inclusive design as a practice spanning compliance, assistive
technology, and design strategy rather than a checklist applied at the end — the position
this proposal adopts throughout. Two of that work's arguments shape the sections above
directly: that understanding *how assistive technologies actually operate* is a prerequisite
for designing for them (which is why Section 3 specifies screen reader and browser pairings
rather than treating "screen reader testing" as a single undifferentiated activity), and
that legal compliance is a floor rather than a goal (which is why this proposal targets AA
and deliberately exceeds it where the audience benefits).

The project further draws on the **Microsoft Inclusive Design** framework and its three
principles:
*recognize exclusion*, *solve for one, extend to many*, and *learn from diversity*. Its most
useful instrument here is the **persona spectrum**, which reframes disability as a spectrum of
permanent, temporary, and situational constraints. One-handed use covers a developer with a
permanent limb difference, a developer with a broken wrist, and a developer holding a coffee
on a train. Designing for the permanent case serves all three and sharply increases the
population served by any accommodation.

**Universal Design's seven principles** — equitable use, flexibility in use, simple and
intuitive use, perceptible information, tolerance for error, low physical effort, and
appropriate size and space — provide a design-stage checklist complementing WCAG's
verification-stage criteria.

**POUR** (Perceivable, Operable, Understandable, Robust) organizes the work around WCAG's own
conceptual structure.

**Personalization philosophy: respect existing system preferences rather than requiring
reconfiguration.** Honoring `prefers-reduced-motion`, `prefers-color-scheme`, and
`prefers-contrast` means a user who has already configured their operating system gets an
appropriate experience immediately, with no per-site setup. Site-level controls (Section 10)
supplement these defaults rather than replacing them.

**Personalization specific to this hub's purpose:** content is layered so a beginner and a
practitioner can use the same page differently — a plain-language summary and a
"why this matters" framing above, with implementation detail, specification references, and
edge cases disclosed progressively below. This is personalization through content structure
rather than through user profiling, which avoids collecting personal data the site has no
need to hold — itself a security and privacy decision consistent with the hub's own material.

Two further commitments: **inclusive research recruitment**, ensuring participants include
disabled users, ESL speakers, and beginners rather than treating a convenience sample as
representative; and **progressive enhancement**, so the site delivers a functional experience
on older browsers and constrained connections rather than failing entirely.

---

## 9. Accessible Interactive Elements

Every interactive element will be **built on native HTML controls wherever possible**. A
`<button>` is focusable, keyboard-operable, and correctly announced with no additional work;
a `<div>` styled to look like a button is none of those things until substantial ARIA and
JavaScript recreate what the browser already provided. Native-first is the single most
effective decision in this section.

Each control exposes an **accessible name, role, and state**. Icon-only controls receive
`aria-label` or visually hidden text. Toggles expose `aria-pressed` or `aria-expanded` so
state is announced, not merely displayed visually.

**Focus management** will be explicit. Focus indicators remain clearly visible and never
obscured by sticky headers (2.4.11). Opening a modal moves focus into the dialog and traps it
there until dismissal; closing returns focus to the triggering element. Without this,
keyboard users are silently stranded behind an invisible overlay.

**Custom widgets** — the accordions and tabbed code samples this site will use for
progressive disclosure — follow **WAI-ARIA Authoring Practices Guide** patterns for expected
keyboard behavior: arrow keys within a tab list, Escape to close, Home/End for first and last.

**The contact form**, as the site's primary interactive element, receives particular
attention: programmatically associated `<label>` elements, related inputs grouped in
`<fieldset>` with `<legend>`, `aria-describedby` conveying format requirements *before*
submission rather than only after failure, `aria-invalid` marking errors, an error summary at
the top of the form linking to each problem field, and messages that name the field and
explain the fix. Autocomplete attributes (1.3.5) let browsers fill known values, reducing
effort for users with motor and cognitive disabilities.

**Dynamic content** announces itself through appropriately scoped ARIA live regions —
`polite` for status updates, `assertive` reserved for genuine urgency, since overuse produces
an interruption stream users learn to tune out.

**CAPTCHAs will be avoided** in favor of honeypot fields and server-side validation. This is
both an accessibility decision — CAPTCHAs are broadly hostile to users with visual and
cognitive disabilities — and a worked example of the security/accessibility tradeoff the
hub's own security section discusses.

---

## 10. User Customization Mechanisms

The baseline commitment is that the site **works with browser and OS settings out of the
box**. Sizing text in `rem` rather than `px` means browser text-size preferences take effect
immediately. Honoring `prefers-color-scheme`, `prefers-contrast`, and `prefers-reduced-motion`
means system-level choices are respected without configuration. The site remains fully usable
at 200% and 400% zoom and does not defeat browser reader modes or user stylesheets.

On top of that baseline, an **accessibility settings panel** — reachable from every page and
itself fully keyboard-accessible — would offer:

- **Text size** controls stepping through defined scales, with layout that reflows rather than
  clipping.
- **Contrast and theme** options including light, dark, and high-contrast, all meeting or
  exceeding 4.5:1. Dark mode has practical appeal for this audience, who often work in dark
  editors, but it will be implemented as a genuine contrast-checked palette rather than an
  inverted filter.
- **Reduced motion**, disabling animations, transitions, and parallax.
- **Line spacing and reading width**, constraining measure to 60–75 characters — a meaningful
  aid for dyslexic readers working through long technical prose.
- **Dyslexia-friendly typeface** as an opt-in alternative.
- **Underlined links** for users who cannot distinguish links by color alone.
- **Code sample font size**, adjustable independently of body text, since monospace faces
  render smaller at equivalent point sizes and code density is a known readability barrier.

Preferences persist across sessions via `localStorage` and apply site-wide, so settings are
configured once rather than re-selected each visit. Controls use clear text labels rather than
icons alone, and a visible "reset to defaults" option lets users recover from a configuration
that made things worse.

The guiding constraint: **customization supplements good defaults, it does not excuse them.**
A site that is inaccessible until reconfigured has shifted its own obligation onto the user.

---

## 11. Information Architecture

The IA is **organized by learning topic rather than by content type**. Grouping everything
into "Articles," "Tutorials," and "References" would force users to already know what format
their answer lives in — the precise knowledge a learner lacks. The five course areas provide
a natural, mutually comprehensible top level.

Structure would be validated through **card sorting** (open sorting to learn users' own mental
groupings, closed sorting to test the proposed structure) and **tree testing**, which measures
whether users can locate items in a proposed hierarchy independent of visual design. Tree
testing is especially valuable here because topic boundaries genuinely blur — image
optimization is arguably Optimization, Responsive Design, *and* Accessibility — and testing
reveals where users actually expect to find such material.

**Depth will be constrained** to roughly three clicks to any resource, with a broad, shallow
hierarchy preferred over a deep one. Categories will be mutually exclusive where possible,
with deliberate cross-linking for genuinely cross-cutting topics rather than arbitrary
assignment to one section.

**Multiple navigation paths** (2.4.5) accommodate different strategies: browsers use the
topic navigation; searchers use site search with synonym mapping so "a11y," "accessibility,"
and "WCAG" all resolve, and "speed," "performance," and "optimization" converge; returning
users use breadcrumbs and a quick-links block.

**To cater to varying comprehension levels,** every topic page is layered: a plain-language
summary and a "why this matters" framing first, then core guidance, then advanced detail and
specification references. This serves a beginner and a practitioner without forcing either to
read the other's version — the single most important IA decision for an audience whose
expertise ranges from first-semester student to working professional.

Page titles and headings will be descriptive and unique (2.4.2, 2.4.6), forming a navigable
outline for screen reader users, who commonly move through a page by heading rather than
reading linearly.

---

## 12. Readability Guidelines

Content will target approximately an **8th-grade reading level** for overview and introductory
material, measured with Flesch-Kincaid or the Hemingway Editor. WCAG 3.1.5 (Reading Level)
sets lower secondary education as a AAA criterion; while this proposal targets AA overall,
readability is a reasonable place to exceed baseline, because it is where technical
documentation most reliably fails its readers.

A necessary qualification: technical accuracy sometimes requires technical vocabulary. The
standard applied is not "eliminate all difficult words" but "**never make a reader look up a
term the page could have defined**." Where precision demands a term like "cross-site request
forgery," the page defines it in plain language on first use rather than assuming it.

Specific guidelines to be followed:

- **Plain language principles** per plainlanguage.gov: active voice, common words over formal
  alternatives ("use" over "utilize"), concrete rather than abstract phrasing.
- **Short sentences and paragraphs** — roughly 15–20 words per sentence, 3–4 sentences per
  paragraph — with one idea per paragraph.
- **Front-loaded content**, stating the conclusion first and supporting detail after. Readers
  scan; burying the actual recommendation in the fourth paragraph guarantees it is missed.
- **Descriptive headings and subheadings** breaking text into scannable sections.
- **Bulleted lists and tables** for parallel or comparative information rather than dense prose.
- **Defined jargon and a glossary** for recurring terminology, with acronyms expanded on first
  use per page rather than only once site-wide, since search traffic lands readers mid-site.
- **Meaningful link text** describing its destination out of context, since screen reader users
  often navigate by pulling up a list of links alone.
- **Commented, explained code samples**, since a code block is content a reader must parse:
  each is preceded by a plain-language statement of what it does and why.
- **Typographic support**: minimum 16px body text, line height near 1.5, measure constrained to
  60–75 characters, left-aligned rather than justified text (justification creates uneven
  "rivers" of white space that impede dyslexic readers), and mixed case rather than all-caps.

Content would be validated by readability scoring on every substantive page and, ideally, by
comprehension testing in which readers explain a concept in their own words — the only
reliable test of whether writing was understood rather than merely scored.

---

## Conclusion

The decisions in this proposal share a premise: accessibility and inclusive design are
structural properties established during architecture and content design, not a remediation
pass applied before launch. Retrofitting accessibility costs more and produces worse results
than designing for it from the start.

The proposed Web Design Resource Hub targets WCAG 2.2 Level AA conformance, verified through
automated scanning in the deployment pipeline, structured manual testing, and — as a
recommended extension beyond this project — usability testing with developers who use
assistive technology daily. The site's distinguishing constraint is that it must embody every
practice it documents. The measure of success is not a passing automated score but whether a
reader can find and understand what they need on the first attempt, using whatever device,
connection, and assistive technology they have.

---

## References

Carnaghan, I. (2024). *Unit 1 lesson*. University of Maryland Global Campus.

Carnaghan, I. (2024). *Unit 2 lesson*. University of Maryland Global Campus.

DeNardis, N. (2021). *Introduction to user experience design* [Video course]. Pearson
Publishing. https://learning.oreilly.com/course/introduction-to-user/

Gilbert, R. M. (2019). *Inclusive design for a digital world: Designing with accessibility
in mind*. Apress. https://doi.org/10.1007/978-1-4842-5016-7

Nielsen, J. (1994). *10 usability heuristics for user interface design*. Nielsen Norman
Group. https://www.nngroup.com/articles/ten-usability-heuristics/

Rohr, C. (2022, July 17). *When to use which user-experience research methods*. Nielsen
Norman Group. https://www.nngroup.com/articles/which-ux-research-methods/

WebAIM. (n.d.). *Web accessibility in mind*. Utah State University. https://webaim.org/

World Wide Web Consortium. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*.
https://www.w3.org/TR/WCAG22/

World Wide Web Consortium. (n.d.). *ARIA authoring practices guide*.
https://www.w3.org/WAI/ARIA/apg/
