# Project 1: Project Reflection

**Course:** CMST 387 6300 — Principles of Web Design and Technology III
**Student:** Gilbert Anderson
**Project:** Web Project Proposal — CMST 387 Web Design Resource Hub

---

## 1. What issues or challenges did you face completing this project?

**Defining the site's scope and audience before anything else could be answered.**

The largest challenge came before any writing. The proposal asks twelve questions about
navigation, accessibility features, cultural considerations, and information architecture —
and I found that none of them could be answered honestly without first deciding what the
site actually was and who would use it. My first attempt produced answers that were
technically correct but generic: statements about contrast ratios and semantic HTML that
would apply equally to any website, which is another way of saying they applied to none.

Settling on a specific subject — a resource hub covering the five CMST 387 topic areas,
aimed at students and early-career developers — changed the quality of every answer that
followed. Once the audience was concrete, the cultural and language question (Section 6)
stopped being an abstract nod to translation and became a specific observation: technical
documentation is read worldwide by non-native English speakers, so idioms and US-centric
example data in code samples are real barriers. Once I knew the site would be dense with
code blocks, the responsive question gained a genuine problem to solve, because code cannot
reflow arbitrarily the way prose can.

This connects directly to the Unit 1 material on the UX process. The unit's emphasis on
research preceding design decisions is easy to accept in the abstract and easy to skip in
practice. I skipped it, produced weak answers, and had to go back — which turned out to be
the most useful thing that happened during the project. Defining users first is not a
preliminary step before the real design work; it is what makes the design work possible.

**The scope and internal overlap of the twelve questions.**

The second challenge was structural. Twelve questions covering related territory produce
substantial overlap, and the risk is either repeating the same points twelve times or
splitting an idea so thinly that no answer is complete. Customization (Q10), personalized
experiences (Q8), and features supporting impairments (Q4) all touch the same ground.
Readability (Q12) overlaps information architecture (Q11) and cultural considerations (Q6).

I resolved this by assigning each question a distinct angle on the shared material rather
than a distinct set of facts. Q4 covers features organized by the impairment they serve; Q8
covers the *methodology* that produces those features; Q10 covers the *controls* that expose
them to users. The same underlying commitment appears in three places, examined three ways.
Deciding this explicitly — rather than discovering the repetition after drafting — would
have saved considerable rework, and it is the approach I would start with next time.

A related difficulty was calibrating depth. Each question could support a paper on its own.
I set a working rule that every answer had to name specific standards, tools, or methods
rather than gesture at principles, and had to connect back to the proposed site rather than
float free of it. Where I could not make a point specific to this site, that was usually a
sign the point was filler.

---

## 2. What additional resources did you need to use to support your proposal and address the usability, accessibility, and inclusive design questions?

**W3C WCAG 2.2 documentation.**

The primary resource was the W3C's own Web Content Accessibility Guidelines 2.2, along with
the *How to Meet WCAG* quick reference and the accompanying *Understanding* documents. The
course material in Unit 2 introduced WCAG's structure and the POUR principles, but writing
specific design commitments required going to the source for the success criteria
themselves.

Two things became clear only from the primary documentation. First, the distinction between
conformance levels is a design decision rather than a technicality — deciding to target
Level AA and then deliberately exceeding it on readability (3.1.5, a AAA criterion) was a
choice I could only make once I understood what each level actually required. Second, the
*Understanding* documents explain the reasoning behind each criterion, and that reasoning
is what makes the criteria applicable to a design that the specification never anticipated.
Knowing that Reflow (1.4.10) exists to serve users who zoom is what let me recognize it as
the same problem as mobile layout, rather than treating them as two separate requirements.

I also used WCAG 2.2 specifically rather than the more commonly cited 2.1, which added
criteria directly relevant to this proposal — Target Size (2.5.8), Dragging Movements
(2.5.7), and Focus Not Obscured (2.4.11).

**Nielsen Norman Group — Rohr (2022) on research method selection.**

For the usability, feedback, and information architecture questions, I drew on Nielsen
Norman Group's material, particularly Rohr's (2022) framework organizing twenty UX research
methods along three dimensions: attitudinal versus behavioral, qualitative versus
quantitative, and context of use.

This resource changed Section 7 substantially. My first draft simply listed feedback
mechanisms — a form, a survey, analytics — as though more channels were straightforwardly
better. The three-dimensional framework showed that those mechanisms are not
interchangeable and that a list can have real gaps. Analytics are behavioral and
quantitative and tell me *what* happened at scale but never *why*. A survey is attitudinal
and captures what users *say*, which is not always what they do. Only qualitative behavioral
methods explain causes. Recognizing that a feedback program can be extensive and still be
blind in one dimension was the single most useful correction I made to the proposal.

NN/g's usability heuristics also gave the navigation principles in Section 1 an established
framework rather than a list of personal preferences, and its information architecture
material supplied the card sorting and tree testing methods in Section 11. The most useful
idea there was organizing a site around user tasks rather than internal structure: my first
instinct was to group content by format — articles, tutorials, references — which requires
the reader to already know what form their answer takes, precisely the knowledge a learner
lacks.

**Gilbert (2019), *Inclusive Design for a Digital World*.**

The Unit 2 text supplied what the WCAG specification deliberately does not: the reasoning
behind the requirements, and an account of how assistive technologies actually work. Reading
about screen readers, switch devices, and screen magnification as real tools with real
behaviors changed how I wrote Section 3. I had initially written "test with a screen reader"
as though that were one activity. Understanding that NVDA, JAWS, VoiceOver, and TalkBack
differ meaningfully in ARIA support is why the proposal now names specific screen reader and
browser pairings.

The book's treatment of compliance and legislation also reframed how I understood WCAG's
conformance levels. Compliance is a legal floor, not a design target — which is what made me
comfortable committing to AA overall while deliberately exceeding it on readability, rather
than treating the standard as a finish line.

**How these resources shaped the outcome.**

The three sources served distinct functions, and I needed all of them. WCAG defined what
conformance requires — the verifiable floor. Gilbert explained why those requirements exist
and how the technologies they serve behave. NN/g addressed what usability requires, which
WCAG does not attempt to specify. A site can satisfy every Level AA criterion and still be
difficult to use, and the gap between conformance and usability is where most of the design
decisions in this proposal actually live. Unit 2's framing of accessibility as a compliance
obligation and Unit 1's framing of UX as a research-driven process proved to be two halves
of one problem rather than separate topics.

---

## References

Carnaghan, I. (2024). *Unit 1 lesson*. University of Maryland Global Campus.

Carnaghan, I. (2024). *Unit 2 lesson*. University of Maryland Global Campus.

DeNardis, N. (2021). *Introduction to user experience design* [Video course]. Pearson
Publishing. https://learning.oreilly.com/course/introduction-to-user/

Gilbert, R. M. (2019). *Inclusive design for a digital world: Designing with accessibility
in mind*. Apress. https://doi.org/10.1007/978-1-4842-5016-7

Rohr, C. (2022, July 17). *When to use which user-experience research methods*. Nielsen
Norman Group. https://www.nngroup.com/articles/which-ux-research-methods/

World Wide Web Consortium. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*.
https://www.w3.org/TR/WCAG22/
