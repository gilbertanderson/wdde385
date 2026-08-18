# Project 1: Web Project Proposal

WDDE 385 Web Design Resource Hub

Gilbert Anderson

WDDE 385: Principles of Web Design and Technology III

University of Maryland Global Campus

Deployment target: https://cmst387-umgc-ganderson58.azurewebsites.net

## Project Overview

This proposal is for a Web Design Resource Hub, which is an educational site collecting
practical guidance across the five core areas of this course, those being user experience
design, accessibility and inclusive design, web application security, website optimization,
and responsive web design, pulled together into a single organized reference for students and
early-career web developers.

I want to be upfront that this site carries an unusual obligation compared to most class
projects, since a resource hub that teaches accessibility has to be accessible itself, one
that teaches responsive design has to be responsive itself, and one that teaches optimization
cannot ship a bloated page without undercutting its own content. That means the site is its
own primary demonstration and every claim it makes can be checked by inspecting the site
making the claim, which in my opinion raises the stakes on the decisions below considerably.

The audience I am building for is students in web development programmes, people changing
career into front-end development, and working developers who need a quick reference, and that
group is global and linguistically diverse since web development draws heavily on people
reading English-language documentation as a second language. It also includes developers with
disabilities, who are badly served by technical documentation that is itself inaccessible, and
it spans a wide range of devices and connections, since developers read documentation on
desktop workstations while they are coding and on phones while they are commuting or away from
a desk.

The scope is a homepage introducing the hub, five topic sections matching the course areas
above, and a responsive contact form, with the full page inventory in the Site Structure
section below and the wireframes and site map in the Wireframes and Site Map section. Every
accessibility target throughout this proposal is stated against WCAG 2.2 Level AA, which is
the current W3C Recommendation and the standard aligned with Section 508 expectations for
educational content.

## Proposed Site Structure

| Page | Purpose |
|---|---|
| Home | Introduces the hub, states its purpose, and provides entry points to all five topic areas |
| UX Design | Design principles, usability heuristics, user research methods, UX artifacts |
| Accessibility & Inclusive Design | WCAG conformance, assistive technology, inclusive design methodology |
| Web Application Security | HTTPS/TLS, input validation, XSS and CSRF defense, secure headers, authentication |
| Website Optimization | Performance budgets, image optimization, caching, Core Web Vitals |
| Responsive Web Design | Mobile-first method, fluid grids, breakpoints, responsive media |
| Contact | Responsive, accessible contact form with validation and confirmation |
| About | Scope of the hub, author, accessibility statement |

## 1. Design Principles for Navigability

I want the navigation on this site to come out of established principles instead of whatever
felt reasonable while I was building each page, so the first one I am committing to is
consistency, which means the primary navigation appears in the same location with the same
ordering on every single page, satisfying WCAG 2.4.5 on Multiple Ways and 3.2.3 on Consistent
Navigation. Users build a mental model of a site within the first few pages they visit, so
moving or reordering the navigation destroys that model, and it does the most damage to people
with cognitive disabilities and to screen reader users who navigate by landmark.

The second principle is recognition over recall, which is one of Nielsen's heuristics and
applies directly to reference material, so I am planning on persistent breadcrumbs, a visible
indication of which section you are currently in, and link text that describes where the link
goes, meaning something like "read the guide to responsive images" instead of "click here."
That matters more here than it would on most sites because a reader arriving from a search
engine lands on an interior page instead of the homepage, and they need to be able to tell
where they are immediately without reconstructing the site structure in their head.

I also want the site to make its own state visible, so loading states, form validation, and
confirmation messages are announced both visually and programmatically through ARIA live
regions, which means sighted and non-sighted users get the same feedback at the same moment
instead of one group getting it late or not at all.

Section labels will use the words the audience actually searches for, since "Website
Optimization" is far more findable than "Performance Engineering" would be, and "Web
Application Security" is more findable than "Hardening," and I think labelling is genuinely a
navigation decision rather than a copywriting one, because a link is only findable when its
wording matches the vocabulary in the reader's head.

Each topic section opens with a plain-language overview before it descends into technical
specifics, so that somebody new to the topic is not hit with the same density as a
practitioner looking up one detail. Finally, no page on this site will be a dead end, since
every page offers onward routes into related topics, and form errors will always be
recoverable without losing what the user already typed.

## 2. Optimizing Layout for Desktop and Mobile

I am building this mobile-first, which means writing the single-column small-screen layout
first and then progressively enhancing it into multi-column arrangements at larger viewports,
and I am doing it that way because mobile-first forces content prioritization on you, since if
a module cannot justify its place in a 375 pixel column it rarely deserves prominence at 1440
pixels either.

The implementation will use CSS Grid and Flexbox with fluid units, meaning rem, percentages,
fr, and clamp(), instead of fixed pixel widths, so that the layout responds to both the
viewport size and whatever text size the user has set in their browser. I am planning to place
breakpoints wherever the content actually breaks instead of at named device widths, since
device-width breakpoints age badly as new devices come out.

The layout has to satisfy WCAG 1.4.10 on Reflow, which requires that content remain usable at
320 CSS pixels wide without two-dimensional scrolling, and what makes that criterion worth
understanding instead of just complying with is that it is the same requirement as supporting
400 percent zoom on a 1280 pixel desktop display, so one technical solution serves both
low-vision desktop users and mobile users at the same time, which is a clear instance of the
curb-cut effect.

On desktop specifically, wider viewports get a persistent sidebar table of contents for the
longer technical articles, along with a reading measure constrained to 60 to 75 characters
instead of full-width text, since a line of text running the full width of a large monitor
becomes genuinely difficult to track from one line to the next. On mobile, the navigation
collapses into a menu button labelled with the word "Menu" rather than an unlabelled hamburger
icon, touch targets meet WCAG 2.5.8 on Target Size at 24 by 24 CSS pixels with 44 by 44 for
primary actions and enough spacing to prevent mis-taps, and hover-dependent interactions are
avoided completely since hover does not exist on touch devices, which means anything revealed
on hover also has to be reachable by focus and by tap.

Code samples are the one piece of content on this site that presents a specific responsive
problem, since this hub will contain a lot of them and they cannot rewrap arbitrarily without
changing what they mean, so they will scroll horizontally inside their own container with a
visible scroll affordance instead of forcing the whole page to scroll sideways.

I am also treating performance as an accessibility concern instead of a separate topic, so
that means responsive images through srcset, compressed assets, and core content that still
functions without JavaScript.

## 3. Accessibility Testing Methods

The methods below are ones that could be employed to verify this design, and I want to be
clear that no user testing is being conducted as part of this project, so this section
identifies which methods would be appropriate and what class of defect each one actually
catches.

Automated scanning would run continuously against every build, as described in Section 5, and
it reliably catches missing alternative text, insufficient contrast, missing form labels, and
invalid ARIA, which makes it fast and repeatable. Industry estimates consistently put
automated detection at roughly 30 to 40 percent of WCAG issues though, since a tool can
confirm that alt text exists but cannot judge whether that text is meaningful, and it can
confirm a heading structure exists but not whether the structure is logical.

Manual keyboard-only testing would verify that every interactive element is reachable and
operable using Tab, Shift+Tab, Enter, Space, and the arrow keys, that focus order follows
visual order, that focus indicators stay visible and unobscured per 2.4.11, and that no
keyboard trap exists anywhere, and in my opinion this is the highest-yield manual test
relative to the time it takes.

Screen reader testing would run across NVDA with Firefox, JAWS with Chrome, and VoiceOver with
Safari, plus TalkBack on Android, to confirm that content is announced in a sensible order
with correct roles, states, and names. Testing multiple pairings matters because screen reader
and browser combinations differ meaningfully in how well they support ARIA, and for this site
specifically the code blocks deserve their own attention during that testing, since
punctuation-dense samples get announced poorly by default.

Expert heuristic evaluation against the WCAG 2.2 AA success criteria and Nielsen's ten
heuristics gives structured expert review at fairly low cost, and a cognitive walkthrough
would step through the core tasks a reader actually comes here for, meaning things like
finding guidance on preventing cross-site scripting or submitting a question through the
contact form, asking at each step whether a first-time user would know what to do next and
would recognize that they were making progress.

Usability testing with participants who have disabilities is the method that most directly
validates real-world usability, and it would be the recommended next step beyond this project,
since automated and expert methods find violations while only testing with actual assistive
technology users reveals whether the site is genuinely usable rather than merely conformant.
Rounding that out, zoom and reflow testing at 400 percent browser zoom, text-only zoom,
Windows High Contrast Mode, and colour-blindness simulators would complete the coverage.

## 4. Features Supporting Specific Impairments

For visual impairments, I am starting from semantic HTML with a correct heading hierarchy and
ARIA landmarks, since that is what gives a screen reader structure to work with in the first
place.
Meaningful images, including diagrams explaining responsive breakpoints or request flows, get
descriptive alternative text, and complex diagrams also get described in the adjacent body
text, since a one-line alt attribute cannot realistically carry a full architectural diagram.
Decorative images get an empty alt attribute so they are skipped entirely. Text contrast meets
4.5 to 1, with 3 to 1 for large text and user interface components under 1.4.11, and I plan to
contrast-check the syntax highlighting in code samples specifically, since popular highlighting
themes routinely fail against their own backgrounds. Colour never carries meaning on its own,
the site supports 400 percent zoom, it honours user text spacing under 1.4.12, and a skip to
main content link opens the tab order on every page.

For auditory impairments, any video tutorial carries accurate synchronized captions under
1.2.2 and a full transcript under 1.2.1, along with audio description of essential visual
information wherever a demonstration is showing code on screen, per 1.2.5. Text stays the
primary format for technical content here instead of video-only explanation, which serves
deaf users, people reading in a second language, and anyone who would simply rather scan than
watch, and no information on the site is conveyed by sound alone.

For motor impairments, full keyboard operability with no keyboard traps under 2.1.1 and 2.1.2
is the baseline, targets meet 2.5.8 with generous spacing, and any drag-based interaction
provides a single-pointer alternative under 2.5.7 on Dragging Movements. The contact form
imposes no time limit under 2.2.1 and preserves what has been entered when validation fails,
so that somebody who types slowly is never forced to re-enter a long question, and the copy
code buttons on code samples give keyboard users an alternative to manually selecting text
across a multi-line block.

For cognitive impairments, plain language, short paragraphs, and generous white space all
reduce load, while consistent navigation prevents disorientation and multi-step technical
processes get broken into numbered steps with visible progress. Technical jargon is defined on
first use and collected into a glossary, which matters more here than it would on most sites
since the subject matter is dense with acronyms like CSRF, TLS, LCP, and ARIA. Error messages
identify the problem and also state how to fix it under 3.3.3, autoplay and unexpected motion
and flashing content are avoided under 2.3.1, the prefers-reduced-motion setting is honoured,
and icons are always paired with text labels instead of standing on their own.

Organizing these by impairment category is a useful way to make sure nothing gets missed, but
the intent behind all of them is universal, since captions serve somebody sitting in a quiet
library, plain language serves a tired reader at midnight, and large targets serve anybody
using a phone one-handed.

## 5. Automated Compliance Tools

I want automated checking operating at three layers so that defects get caught as early as
possible rather than all at once at the end.

During development, the axe DevTools browser extension and WAVE from WebAIM give immediate
in-browser feedback while a page is being built, and Lighthouse, which is built into Chrome
DevTools, contributes an accessibility score alongside the performance metrics this site cares
about anyway.

In continuous integration, Pa11y CI or axe-core would run against every push to the project's
GitHub repository, wired into the same GitHub Actions workflow that already deploys this site
to Azure App Service. Configuring the build to fail on new violations is what prevents
regressions from reaching production, and in my opinion that is the decisive advantage
automation has over periodic manual audits, since a manual audit only catches what broke
between audits while a build check catches it the moment it happens. It also demonstrates the
site's own subject matter, since the same pipeline can run Lighthouse CI for optimization
budgets.

For ongoing monitoring, the IBM Equal Access Accessibility Checker and ARC Toolkit add rule
coverage beyond what axe catches, and crawlers like Siteimprove or Tenon.io can scan the full
site on a schedule and trend the results over time. Supporting those, the W3C Markup
Validation Service matters because valid HTML underpins assistive technology support in the
first place, the WebAIM Contrast Checker gets used during design instead of after it, and
readability scoring runs through the Hemingway Editor or Flesch-Kincaid analysis.

Two caveats have to accompany any automated program though. The first is that these tools
verify roughly a third of the WCAG criteria, so a clean scan is a floor instead of a
certificate of conformance. The second is that rule sets have to be kept current as the
standards evolve, since a stale scanner quietly stops testing against the standard it still
claims to enforce, and nothing about the passing result tells you that has happened.

## 6. Cultural Differences and Language Needs

I am declaring the site's language with the lang attribute under 3.1.1 and marking any
inline-language passages with lang on the containing element under 3.1.2, so that screen
readers switch pronunciation instead of reading foreign text with English phonetics.

I am writing the content in plain, idiom-free English, and in my opinion that matters acutely
for a technical audience specifically, since web development documentation is read worldwide by people whose
first language is not English, and idioms, sports metaphors, and cultural shorthand like "out
of the box" or "silver bullet" or "down to the wire" are exactly the constructions that fail
those readers and defeat translation tools at the same time. Technical acronyms get expanded
on first use.

Formats will not assume a single locale either, so dates appear unambiguously as something
like "March 4, 2026" rather than 3/4/26, which reads as April 3 across much of the world, and
times state their zone explicitly. The contact form accepts international name, address, and
phone formats instead of enforcing US-only patterns, and notably it will not require a first
name and last name split, since that misrepresents naming conventions in much of the world.

Examples and imagery will represent a range of ages, ethnicities, abilities, and backgrounds
instead of defaulting to a narrow stereotype of who writes code, and the sample data inside
code examples will use varied, non-US-centric names and addresses, since in my opinion example
code is itself a quiet signal about who the material was written for. Icons get checked for
culturally specific meanings before they go in.

Structurally, the design has to accommodate text expansion, since translated German or Spanish
text can run 30 percent longer than the English original, which means avoiding fixed-width
containers that would clip or overflow once the text grows. Where translation gets offered,
professionally translated key pages are preferable to machine translation for the security
guidance in particular, because a mistranslation there could produce an insecure
implementation instead of just an awkward sentence, and right-to-left support through CSS
logical properties is a reasonable enhancement to plan for.

## 7. Collecting User Feedback for Inclusivity

I want the feedback mechanisms themselves to be accessible, since otherwise they
systematically exclude the exact users whose input matters most, and that would defeat the
purpose of collecting feedback at all.

An accessibility feedback link appears in the site footer on every page and offers multiple
channels, meaning a form, an email address, and an alternative contact method, and the reason
for offering more than one is that somebody blocked by an inaccessible form needs a different
route available to report that specific problem. The contact form doubles as a general
feedback channel with an optional category selector, so that accessibility reports can be
triaged separately from ordinary content questions, and a short optional on-page prompt asking
whether the page was helpful would gather lightweight per-page signal without interrupting
anybody with a modal, while staying fully keyboard and screen-reader operable.

I would use analytics to identify friction indirectly through things like high-exit pages, failed
internal searches, which are a direct signal that the site's vocabulary does not match the
reader's, and rage-clicks, but analytics only ever reveal where users struggle and never why,
so they generate questions instead of answers.

That distinction is worth being deliberate about rather than just collecting whatever is easy,
and Rohr's framework organizing UX research methods along three dimensions, attitudinal versus
behavioral, qualitative versus quantitative, and context of use, is what explains why no
single mechanism above is sufficient on its own. Analytics are behavioral and quantitative, so
they record what users did at scale but cannot explain intent, while surveys and the "was this
helpful" prompt are attitudinal and capture what users say, which may not match what they
actually do, and usability testing is behavioral and qualitative, which gives small samples
but reveals causes. An inclusive feedback program needs coverage across all three dimensions,
because a program built only from analytics will systematically miss the users whose
difficulties make them leave before they ever generate a signal, and those are exactly the
users this site most needs to hear from.

A public issue tracker on the project's GitHub repository suits this audience specifically,
since developers are already comfortable filing issues and tend to supply precise reproduction
steps and environment details without being asked, and beyond that, recruited usability
sessions and an advisory panel of compensated participants including assistive technology
users, developers reading in a second language, and beginners would provide structured
qualitative input on a recurring basis.

Whatever gets collected, the loop has to close, since reports that vanish without
acknowledgment train people to stop reporting, so a published response commitment and a
visible changelog of accessibility fixes are what actually demonstrate that the input produces
change.

## 8. Inclusive Design Methodologies

Gilbert frames inclusive design as a practice spanning compliance, assistive technology, and
design strategy instead of a checklist applied at the end, and that is the position I am
adopting throughout this proposal. Two of that book's arguments shape the sections above
directly, the first being that understanding how assistive technologies actually operate is a
prerequisite for designing for them, which is why Section 3 names specific screen reader and
browser pairings instead of treating screen reader testing as one undifferentiated activity,
and the second being that legal compliance is a floor instead of a goal, which is why I am
targeting AA and then deliberately exceeding it where the audience benefits.

Beyond that, I am drawing on the Microsoft Inclusive Design framework and its three
principles, which are recognize exclusion, solve for one and extend to many, and learn from
diversity. The most useful instrument in it for this project is the persona spectrum, which
reframes disability as a spectrum of permanent, temporary, and situational constraints, so
that one-handed use covers a developer with a permanent limb difference, a developer with a
broken wrist, and a developer holding a coffee on a train all at once. Designing for the
permanent case serves all three of them, which sharply increases the population served by any
given accommodation.

Universal Design's seven principles, meaning equitable use, flexibility in use, simple and
intuitive use, perceptible information, tolerance for error, low physical effort, and
appropriate size and space, give me a design-stage checklist that complements WCAG's
verification-stage criteria, and POUR, meaning perceivable, operable, understandable, and
robust, organizes the work around WCAG's own conceptual structure.

The personalization philosophy I am committing to is respecting the preferences a user has
already set rather than making them reconfigure everything again, so honouring
prefers-reduced-motion, prefers-color-scheme, and prefers-contrast means somebody who has
already configured their operating system gets an appropriate experience immediately with no
per-site setup, and the site-level controls described in Section 10 supplement those defaults
instead of replacing them.

The personalization that is specific to this hub's purpose is layered content, so that a
beginner and a practitioner can use the same page differently, with a plain-language summary
and a "why this matters" framing up top and the implementation detail, specification
references, and edge cases disclosed progressively below. That is personalization through
content structure instead of through user profiling, which also means the site avoids
collecting personal data it has no need to hold, and in my opinion that is a security and
privacy decision consistent with the hub's own material rather than a separate concern.

Two further commitments round this out. The first is inclusive research recruitment, meaning
participants have to include disabled users, people reading in a second language, and
beginners, instead of treating a convenience sample as representative. The second is
progressive enhancement, so that the site delivers a functional experience on older browsers
and constrained connections instead of failing outright.

## 9. Accessible Interactive Elements

I am building every interactive element on this site on native HTML controls wherever that is
possible, because a button element is focusable, keyboard-operable, and correctly announced
with no additional work at all, whereas a div styled to look like a button is none of those
things until a substantial amount of ARIA and JavaScript rebuilds what the browser already
gave you for free, and that rebuild is where the bugs live. Native-first is in my opinion the
single most effective decision in this whole section.

Each control has to expose an accessible name, role, and state, so icon-only controls get an
aria-label or visually hidden text, and toggles expose aria-pressed or aria-expanded so that
their state is announced instead of only displayed visually.

Focus management gets handled explicitly rather than left to the browser, so focus indicators
stay clearly visible and never get obscured by sticky headers under 2.4.11, opening a modal
moves focus into the dialog and traps it there until dismissal, and closing it returns focus
to whatever triggered it, since without that last part keyboard users end up silently stranded
behind an overlay they cannot see.

Custom widgets, meaning the accordions and tabbed code samples this site uses for progressive
disclosure, follow the WAI-ARIA Authoring Practices Guide patterns for expected keyboard
behavior, so arrow keys move within a tab list, Escape closes, and Home and End jump to first
and last.

The contact form is the site's primary interactive element so it gets particular attention,
which means programmatically associated label elements, related inputs grouped in a fieldset
with a legend, aria-describedby conveying format requirements before submission instead of
only after a failure, aria-invalid marking the fields that are wrong, an error summary at the
top of the form linking to each problem field, and messages that name the field and explain
how to fix it. Autocomplete attributes under 1.3.5 let browsers fill in known values, which
reduces effort for users with motor and cognitive disabilities.

Dynamic content announces itself through appropriately scoped ARIA live regions, with polite
for status updates and assertive reserved for genuine urgency, since overusing assertive
produces a stream of interruptions that users quickly learn to tune out entirely.

I am also avoiding CAPTCHAs completely in favour of honeypot fields and server-side
validation, and that is both an accessibility decision, since CAPTCHAs are broadly hostile to
users with visual and cognitive disabilities, and a worked example of the security and
accessibility tradeoff that the hub's own security section discusses.

## 10. User Customization Mechanisms

The baseline commitment is that the site works with browser and operating system settings out
of the box, so sizing text in rem instead of px means browser text-size preferences take
effect immediately, and honouring prefers-color-scheme, prefers-contrast, and
prefers-reduced-motion means system-level choices are respected without anybody configuring
anything. The site stays fully usable at 200 and 400 percent zoom and does not defeat browser
reader modes or user stylesheets.

On top of that baseline I am planning an accessibility settings panel, reachable from every
page and itself fully keyboard-accessible, offering text size controls that step through
defined scales with layout that reflows instead of clipping, contrast and theme options
including light, dark, and high-contrast that all meet or exceed 4.5 to 1, a reduced motion
setting that disables animations and transitions and parallax, line spacing and reading width
controls that constrain the measure to 60 to 75 characters, which is a meaningful aid for
dyslexic readers working through long technical prose, a dyslexia-friendly typeface as an
opt-in alternative, underlined links for users who cannot distinguish links by colour alone,
and a code sample font size adjustable independently of the body text, since monospace faces
render smaller at equivalent point sizes and code density is a known readability barrier. Dark
mode has obvious practical appeal for this audience since a lot of them work in dark editors,
but I want it built as a genuine contrast-checked palette rather than an inverted filter.

Preferences persist across sessions through localStorage and apply site-wide, so they get
configured once instead of being re-selected on every visit, the controls use clear text
labels instead of icons on their own, and a visible reset to defaults option lets somebody
recover from a configuration that made things worse for them.

The constraint guiding all of this is that customization supplements good defaults instead of
excusing them, since a site that is inaccessible until it gets reconfigured has just shifted
its own obligation onto the user.

## 11. Information Architecture

I am organizing the information architecture by learning topic rather than by content type,
since grouping everything into articles, tutorials, and references would force a reader to
already know what format their answer lives in, and that is exactly the knowledge a learner
does not have yet. The five course areas give a natural top level that everybody can follow.

I would validate that structure through card sorting, using open sorting to learn the
groupings readers come up with on their own and closed sorting to test the structure I
proposed, and through tree testing, which measures whether users can locate items in a
proposed hierarchy independently of the visual design. Tree testing is especially worth doing
here because the topic boundaries genuinely blur, since image optimization is arguably
Optimization, Responsive Design, and Accessibility all at once, and testing is what reveals
where users actually expect to find that material instead of where I assumed they would.

Depth stays constrained to roughly three clicks to any resource, with a broad shallow
hierarchy preferred over a deep one, and categories stay mutually exclusive where that is
possible, with deliberate cross-linking for the genuinely cross-cutting topics instead of
arbitrarily assigning them to one section and hoping nobody looks in the other.

Multiple navigation paths under 2.4.5 accommodate the different strategies readers actually
use, so browsers use the topic navigation, searchers use site search with synonym mapping that
resolves a11y, accessibility, and WCAG to the same place and converges speed, performance, and
optimization, and returning users use breadcrumbs and a quick-links block.

To cater to varying comprehension levels, every topic page is layered, opening with a
plain-language summary and a "why this matters" framing, then core guidance, then advanced
detail and specification references. That way a beginner and a practitioner can both use the
page without either of them being forced to read through the other's version first, and in my
opinion that is the single most important IA decision on a site whose audience ranges from
first-semester student to working professional. Page titles and headings stay descriptive and
unique under 2.4.2 and 2.4.6, which forms a navigable outline for screen reader users, since
they commonly move through a page by heading instead of reading it linearly.

## 12. Readability Guidelines

I am targeting roughly an 8th-grade reading level for the overview and introductory material,
measured with Flesch-Kincaid or the Hemingway Editor. WCAG 3.1.5 on Reading Level sets lower
secondary education as a AAA criterion, and while this proposal targets AA overall, readability
is a reasonable place to exceed the baseline, because in my opinion it is where technical
documentation most reliably fails the people reading it.

One qualification is necessary though, which is that technical accuracy sometimes genuinely
requires technical vocabulary, so the standard I am applying is not to eliminate every
difficult word but to never make a reader look up a term the page could have defined for them.
Where precision demands a term like cross-site request forgery, the page defines it in plain
language on first use instead of assuming it.

The specific guidelines are plain language principles from plainlanguage.gov, meaning active
voice, common words over formal alternatives like using "use" instead of "utilize," and
concrete rather than abstract phrasing. Sentences run roughly 15 to 20 words and paragraphs
run 3 to 4 sentences with one idea each. Content gets front-loaded so the conclusion comes
first and the supporting detail after it, since readers scan and burying the actual
recommendation in the fourth paragraph guarantees it gets missed. Headings and subheadings
stay descriptive and break the text into scannable sections, and bulleted lists and tables
carry parallel or comparative information instead of forcing it into dense prose.

Jargon gets defined and collected into a glossary, with acronyms expanded on first use on
every page instead of only once site-wide, since search traffic lands readers in the middle
of the site instead of at the beginning. Link text describes its destination out of context,
because screen reader users often navigate by pulling up a list of links on its own. Code
samples get commented and explained, since a code block is content the reader has to parse,
so each one is preceded by a plain-language statement of what it does and why. Typographic
support means a minimum of 16px body text, line height near 1.5, measure constrained to 60 to
75 characters, left-aligned rather than justified text, since justification creates uneven
rivers of white space that impede dyslexic readers, and mixed case instead of all-caps.

I would validate all of that through readability scoring on every substantive page and,
ideally, through comprehension testing where readers explain a concept back in their own
words, since that is the only reliable test of whether the writing was actually understood
instead of just scoring well.

## Conclusion

The decisions I have made throughout this proposal share one premise, which is that
accessibility and inclusive design are structural properties established during architecture and content design
rather than a remediation pass applied right before launch, since retrofitting accessibility
costs more and produces worse results than designing for it from the start does.

The Web Design Resource Hub targets WCAG 2.2 Level AA conformance, verified through automated
scanning in the deployment pipeline, structured manual testing, and, as a recommended
extension beyond this project, usability testing with developers who use assistive technology
daily. What distinguishes this site from most class projects is that it has to embody every
practice it documents, so the measure of success is not a passing automated score but whether
a reader can find and understand what they need on the first attempt, using whatever device,
connection, and assistive technology they happen to have.

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
