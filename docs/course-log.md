# WDDE 385 Running Course Log

Working notes I am keeping across the course so that the material for later project
reflections is already written down instead of being reconstructed from memory weeks after the
fact. This is not a submission. The Project 1 reflection is frozen at the scope of that
project, since it is graded as a standalone document answering two specific questions, and
everything after it accumulates here instead. Entries are dated, newest last.

## 2026-08-16: You cannot demonstrate a broken thing without shipping a broken thing

I wanted an interactive demo on the accessibility page, something a reader could switch on and
off to see a real accessibility failure instead of just reading a description of one, and my
first instinct was to render genuinely broken markup, an image with no alternative text and
some low-contrast text, and let people toggle it.

That turned out not to work, and the reason it does not work is the part worth writing down.
The site runs an automated WCAG scan against every page on every push, so shipping a real
violation in order to demonstrate violations would fail that check, and more to the point it
would mean a page that teaches accessibility was itself inaccessible, which is the exact
failure this whole site is built to avoid.

So the demo ended up built around three failures that a scanner cannot detect at all, which
are a removed focus indicator, a div styled to look like a button, and vague "click here" link
text. All three are genuinely broken and none of them registers as an error in an automated
scan, and working within that constraint produced a better demo than the one I originally
wanted, since the page can now make a specific claim a reader can verify, which is that every
failure in the demo passes a clean automated scan.

The lesson I take from it is that accessibility needs the human check, because a scan can tell
you whether an element has a name but not whether the name is useful, and whether a control
exists but not whether anyone can reach it. The three failures in that demo are ordinary ones
that ship constantly, and the tooling is simply blind to them, so automated checks are worth
running on every commit but treating a green check as evidence of accessibility is a mistake.
The findings that matter come from a person operating the page, and ultimately from people who
depend on assistive technology every day.

This feeds Reflection Question 1 on challenges, and anything asking about testing methods or
the limits of automated compliance tooling.

## 2026-08-16: The environment cost more time than the actual work

A meaningful share of the effort on this project went into fighting the development
environment rather than building anything, starting with the PDF tooling needed to read the
assignment rubric, which was not installed and took several attempts and a fallback library
before I could get the text out of it. Converting the wireframe SVGs into images for the Word
document failed through three separate tools, cairosvg because there was no system graphics
library, rsvg-convert because it was not installed at all, and the macOS qlmanage tool because
it cropped and clipped the diagrams, and it eventually worked through headless Chrome, which
is not remotely what that tool is for. The bundled browser that the accessibility scanner
downloads was broken on this machine, so the scan had to be pointed at the system browser
instead, and the local preview could not load a page's JavaScript at all while a local web
server was blocked, which meant verifying that the interactive demo actually worked required a
completely different approach.

What that changed, practically, is what I now think "done" means. Every one of those problems
is invisible in the final result, since the documents, the site, and the scan all work, but
none of them was predictable from the task itself, so the time spent was not proportional to
the difficulty of the thing being built.

It also changed how I think about reproducibility, because the first version of the Word
document build existed only as a temporary script that would have vanished when the session
ended, which meant nothing in the project itself could have rebuilt those files. That is now a
committed script in the repository with its dependencies documented and its fallbacks
explained, specifically so that the next person, including me in three weeks, does not have to
rediscover that headless Chrome is the thing that works.

This feeds Reflection Question 1, and anything about development workflow, build tooling, or
why projects take longer than the estimate.

## 2026-08-16: Reviewing output is a different job from producing it

A large amount of material got produced quickly on this project, a twelve-section proposal,
four diagrams, a reflection, a site with real content on five technical topics, a deployment
pipeline, and an automated accessibility check, and going through all of it carefully instead
of just accepting that it looked finished is genuinely its own task and a different kind of
work from writing it in the first place.

What made that concrete was the difference between reading output and verifying it, since
several things looked completely done and were not. The build reported success while the
deployment was actually failing, because there was no content to deploy. A contrast failure of
1.66 to 1 existed in the high-contrast theme while the automated scan was reporting zero
errors across every page. Links that were supposed to go into the page footer landed in the
header navigation instead, on every page. Each of those was caught by checking rather than by
reading, and none of them was visible from a summary saying the work was complete.

What I want to carry forward is that volume is not the same as progress and a confident
summary is not evidence, so the check that counts is the one performed against the actual
artifact, which means opening the file, loading the page, or running the command, instead of
against a description of it. That applies to my own work as much as it does to anything
generated for me.

This feeds Reflection Question 1, and anything about process, quality assurance, or working
with tools that produce output faster than it can be reviewed.

## 2026-08-16: The site outgrew its proposal, which turned out to be the useful part

The proposal describes eight pages and the site now has nine, since a self-audit page
publishing this site's own accessibility scan results, and more importantly the gaps in them,
got added after the proposal was written and after the site was already deployed.

The interesting question is why it was not in the plan, and the answer is that it could not
have been, because that page exists to publish real scan results and name real gaps honestly,
and before the site existed there were no results to publish and no gaps to name, so there was
nothing for the page to be yet. It only became an obvious need once there was something to
audit.

That is the clearest thing this project has taught me so far about the limits of planning up
front, since a proposal gets written at the point of least information, before any code,
before any testing, and before anything has pushed back. It is still worth writing, because it
forces the decisions about audience and scope that everything else depends on, but treating it
as a fixed specification would mean ignoring what the building itself reveals, and the
building is where most of the actual learning happened. Iteration is not a concession to bad
planning, it is the method working the way it is supposed to, and since the point of this
project is to learn how the process works, a plan that survived contact with implementation
completely unchanged would have taught me less than one that did not.

There is a documentation consequence too, which is that the site map diagram silently became
wrong the moment the ninth page shipped and nothing flagged it. A diagram is a claim about a
system and it decays the instant the system moves, so it needs the same upkeep the code does,
and I updated it and labelled the new page as added after the proposal instead of quietly
folding it in, since when that decision got made is part of what the diagram now records.

This feeds Reflection Question 1, and anything about the design process, iteration, or keeping
documentation aligned with what actually got built.

## 2026-08-16: One wrong sentence, three published copies

The proposal claimed that the wireframes and site map appeared in Sections 13 and 14, and
there are no Sections 13 or 14, since the proposal runs 1 through 12 and then goes to a
conclusion and the figures. Those numbers are the rubric's criteria numbers for the storyboard
and the reflection, and I had confused two different numbering systems for each other.

The error itself was small but its reach was not, because by the time it was caught that
sentence existed in the Markdown source, in the Word document, and in the Google Doc, which is
three published artifacts and two of them are what an instructor would actually open.

That is the argument for a single source of truth made concretely instead of in the abstract,
since the Markdown is canonical here and everything else gets generated from it, so the fix
was one line and a rebuild. If I had edited the Word file directly, or fixed the Google Doc by
hand, the copies would have quietly drifted apart and I would have had three documents to keep
straight instead of one.

The other half of it is that nothing in the process would ever have surfaced this on its own,
since it was found by deliberately going back and auditing the document. Spell-check does not
catch a factually wrong cross-reference and neither does a passing build, because an internal
reference is a claim about the document itself, and the only thing that verifies it is
somebody checking whether the thing being pointed at actually exists.

This feeds Reflection Question 1, and anything about documentation practice, version control,
or quality assurance.

## 2026-08-24: Two tools, two different answers on the same link

Running the site through WAVE and Lighthouse for Project 4 turned up a real disagreement
between the tools rather than a clean pass or fail, and I want to record how I resolved it
because the resolution came down to my own judgment call, not a tool's verdict.

WAVE reported zero errors and zero contrast errors on every page, with an AIM score of 10 out
of 10 across the board. Lighthouse's accessibility audit, which runs axe under the hood, was
stricter: it flagged in-text links as relying on colour alone to be distinguishable from the
surrounding paragraph, since the site's default styling underlined links only on hover, the
same way the primary navigation already behaved. That single finding was enough to drop the
Lighthouse accessibility score from 100 to 95 on pages with prose links in them.

My first fix was to make every link underlined by default site-wide, which cleared the finding
and brought every page back to 100. I did not sit with that decision, and once I looked at a
real page with it applied, I did not like it. This site's whole design is dense with in-text
links, since every topic page cross-links related concepts constantly, and a paragraph with
five or six underlined phrases in it is genuinely harder to read than one where the links are
distinguished by colour and by a hover state, the same convention the navigation already used
successfully.

So I reverted the default back to colour-plus-hover-underline, the same pattern the nav uses,
and accepted the Lighthouse finding as a known, deliberate tradeoff rather than an unaddressed
defect. The settings panel still offers underlined links as an opt-in for anyone who wants or
needs that stronger cue, which is the same principle Section 10 of the proposal describes:
customization supplements the default instead of the default being weakened to avoid ever
needing customization. I am comfortable defending this specific choice because WAVE, the tool
the assignment specifically names, did not flag it at all, and Lighthouse's own rule is
phrased as identifying links that rely on colour ALONE, which is not quite true here once
hover and focus states are counted.

This feeds the Project 4 reflection, specifically the question about issues the tools
identified and how I addressed them, since "addressed" here means "evaluated and made a
deliberate call," not only "silenced the finding."
