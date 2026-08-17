# CMST 387: Running Course Log

Working notes kept across the course, for use in later project reflections.

**This is not a submission.** The Project 1 reflection
([project1-reflection.md](project1-reflection.md)) is frozen at the scope of the proposal and
should stay that way; it is graded as a standalone document answering two specific questions
about that project. This file is where everything after it accumulates, so that when a later
reflection is due the material is already here rather than being reconstructed from memory.

Entries are dated, newest last. Each notes what happened, what it changed, and which
reflection question it would serve.

---

## 2026-08-16: You cannot demonstrate a failure without committing it

**What happened.** I wanted an interactive demo on the accessibility page: something a reader
could toggle to see a real accessibility failure rather than just read about one. The obvious
approach was to render genuinely broken markup (an image with no alternative text, text at
low contrast) and let people switch it on.

That does not work, and the reason it does not work is the interesting part. The site runs an
automated WCAG scan against every page on every push. Shipping a real violation to demonstrate
violations would fail that check. More to the point, it would mean a page that teaches
accessibility was itself inaccessible, which is exactly the failure mode the whole site is
built to avoid.

**What it changed.** The demo ended up built around three failures a scanner *cannot* detect:
a removed focus indicator, a `<div>` styled to look like a button, and vague "click here" link
text. All three are genuinely broken. None of them registers as an error in an automated scan.

That constraint produced a better demo than the one I originally wanted. The page can now say
something specific and verifiable: every failure in this demo passes a clean automated scan.
Working around the limitation forced a sharper point than the straightforward version would
have made.

**The lesson I take from it.** Accessibility needs the human check. A scan tells you whether an
element has a name, not whether the name is useful; whether a control exists, not whether
anyone can reach it. The three failures in that demo are ordinary: they are the kind of thing
that ships constantly, and the tooling is simply blind to them. Automated checks are worth
running on every commit, but treating a green check as evidence of accessibility is a mistake.
The findings that matter come from a person operating the page, and ultimately from people who
depend on assistive technology.

**Feeds:** Reflection Q1 (challenges) and any question about testing methods or the limits of
automated compliance tooling.

---

## 2026-08-16: Environment problems cost more time than the actual work

**What happened.** A meaningful share of the effort on this project went into fighting the
development environment rather than building anything:

- The PDF tooling needed to read the assignment rubric was not installed; extracting the text
  took several attempts and a fallback library.
- Converting the wireframe SVGs to images for the Word document failed through three separate
  tools: `cairosvg` (no system graphics library), `rsvg-convert` (not installed), and macOS
  `qlmanage` (cropped and clipped the diagrams). It eventually worked through headless Chrome,
  which is not what that tool is for.
- The bundled browser that the accessibility scanner downloads was broken on this machine, so
  the scan had to be pointed at the system browser instead.
- The local preview could not load a page's JavaScript at all, and a local web server was
  blocked, so verifying that the interactive demo actually worked required a different approach
  entirely.

**What it changed.** Practically, it changed what "done" means. Every one of those problems was
invisible in the final result (the documents, the site, and the scan all work) but none of
them was predictable from the task itself. Time spent was not proportional to the difficulty of
the thing being built.

It also changed how I think about reproducibility. The first version of the Word document build
existed only as a temporary script that would have vanished with the session, meaning nothing in
the project could have rebuilt those files. That is now a committed script in the repository
with its dependencies documented and its fallbacks explained, specifically so the next person, including me in three weeks, does not have to rediscover that headless Chrome is the thing that
works.

**Feeds:** Reflection Q1 (challenges). Also relevant to anything about development workflow,
build tooling, or why projects take longer than estimated.

---

## 2026-08-16: Keeping up with the volume of output

**What happened.** A large amount of material was produced quickly: a twelve-section proposal,
four diagrams, a reflection, an eight-page site with real content on five technical topics, a
deployment pipeline, and an automated accessibility check. Reviewing all of it carefully (not
just accepting that it looked right) is a genuine task in itself, and a different kind of work
from writing it.

**What it changed.** It made the difference between *reading* output and *verifying* it
concrete. Several things looked completely finished and were not:

- The site build reported success while the deployment was failing, because there was no content
  to deploy.
- A contrast failure existed in one theme while the automated scan reported zero errors across
  every page.
- Links added to what was supposed to be the page footer landed in the header navigation
  instead, across every page.

Each of those was caught by checking rather than by reading. None was visible from a summary
saying the work was complete.

**What I want to carry forward.** Volume is not the same as progress, and a confident summary is
not evidence. The check that matters is the one performed against the actual artifact (opening
the file, loading the page, running the command) rather than against a description of it. That
applies to my own work as much as to anything generated for me.

**Feeds:** Reflection Q1 (challenges), and any question about process, quality assurance, or
working with tools that produce output faster than it can be reviewed.

---

## 2026-08-16: The site outgrew its proposal, which turned out to be the useful part

**What happened.** The proposal describes eight pages. The site now has nine. A self-audit
page, publishing this site's own accessibility scan results and, more importantly, what has
*not* been tested, was added after the proposal was written and after the site was already
deployed.

The interesting question is why it was not in the plan. The answer is that it could not have
been. The page exists to publish real scan results and to name the gaps in them honestly.
Before the site existed there were no results to publish and no gaps to name, so there was
nothing for that page to be. It only became an obvious need once there was something to
audit.

**What it changed.** This is the clearest thing the project has taught me so far about the
limits of up-front planning. A proposal is written at the point of least information: before
any code, before any testing, before anything has pushed back. It is still worth writing,
because it forces the decisions about audience and scope that everything else depends on. But
treating it as a fixed specification would mean ignoring what the building itself reveals,
and the building is where the actual learning happened.

Design methods account for this. Iteration is not a concession to bad planning; it is the
method working as intended. The proposal was a hypothesis about what the site needed. Testing
that hypothesis by constructing the thing produced a better answer than the hypothesis did.
Given that the purpose of this project is to learn how the process works, a plan that
survived contact with implementation completely unchanged would have taught me less.

There is a documentation consequence too. The site map diagram silently became wrong the
moment the ninth page shipped, and nothing flagged it. A diagram is a claim about a system and
it decays the instant the system moves, so it needs the same upkeep as the code. I updated it
and labelled the new page "added post-proposal" rather than quietly folding it in, because the
timing is part of what the diagram now records.

**Feeds:** Reflection Q1 (challenges), and any question about the design process, iteration,
or keeping documentation aligned with what was actually built.

---

## 2026-08-16: One wrong sentence, three published copies

**What happened.** The proposal claimed that the wireframes and site map appeared "in Sections
13 and 14." There are no Sections 13 or 14: the proposal runs 1 through 12, then a conclusion,
then the figures. 13 and 14 are the *rubric's* criteria numbers, for the storyboard and the
reflection. Two different numbering systems, confused for each other.

The error was small. Its reach was not. By the time it was caught, that sentence existed in the
Markdown source, in the Word document, and in the Google Doc, three published artifacts, two
of which are what an instructor would actually open.

**What it changed.** This is the argument for a single source of truth, made concretely rather
than in the abstract. Because the Markdown is canonical and everything else is generated from
it, the fix was one line and a rebuild. Had I edited the Word file directly, or fixed the
Google Doc by hand, the copies would have silently diverged and I would have had three
documents to keep straight instead of one.

The other half of the lesson is that nothing in the process would ever have surfaced this. It
was found by deliberately going back and auditing. Spell-check does not catch a factually
wrong cross-reference; neither does a passing build. An internal reference is a *claim about
the document itself*, and the only thing that verifies it is someone checking whether the thing
being pointed at actually exists.

**Feeds:** Reflection Q1 (challenges), and any question about documentation practice, version
control, or quality assurance.

---

<!-- Template for new entries:

## YYYY-MM-DD: Short title

**What happened.**

**What it changed.**

**Feeds:** Reflection Q_ (…)

-->
