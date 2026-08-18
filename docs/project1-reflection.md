# Project 1 Reflection

Gilbert Anderson, CMST 387 6300, Principles of Web Design and Technology III

Proposed site: CMST 387 Web Design Resource Hub

Live site: https://cmst387-umgc-ganderson58.azurewebsites.net

## What issues or challenges did you face completing this project?

The biggest challenge on this project came before I wrote a single answer, and it was working
out what the site actually was and who it was for, since the proposal asks twelve questions
about navigation, accessibility features, cultural considerations, and information
architecture, and I found that none of them could be answered honestly until that was settled.
My first pass produced answers that were technically correct but generic, the kind of
statements about contrast ratios and semantic HTML that would apply equally well to any
website on the internet, which is really another way of saying they applied to none of them.

Once I settled on a specific subject, a resource hub covering the five topic areas from this
course aimed at students and early-career developers, the quality of every answer after that
changed. The cultural and language question in Section 6 stopped being a vague nod toward
translation and turned into something specific I could actually defend, since technical
documentation gets read worldwide by people whose first language is not English, which means
idioms and US-centric sample data in code examples are real barriers rather than hypothetical
ones. The same thing happened with the responsive question in Section 2, because once I knew
the site would be full of code blocks I had a genuine problem to solve, since code cannot
rewrap the way a paragraph can without changing what it means.

That connects directly back to the Unit 1 material on the UX process, where the emphasis is on
research coming before design decisions. That is easy to agree with in the abstract and easy
to skip when you are actually trying to get something written, and I skipped it, produced weak
answers, and had to go back and start over. In hindsight that was the most useful thing that
happened during the project, since defining the users first is not a preliminary step you get
through before the real design work starts, it is the thing that makes the real design work
possible at all.

The second challenge was structural, and it came from the shape of the assignment itself.
Twelve questions covering closely related territory produce a lot of overlap, so the risk is
either repeating the same three points twelve times or splitting one idea so thinly across
several answers that none of them is complete. Customization in Question 10, personalized
experiences in Question 8, and features supporting impairments in Question 4 all touch the
same ground, and readability in Question 12 overlaps both information architecture in Question
11 and cultural considerations in Question 6.

I resolved that by deciding that each question would take a distinct angle on shared material
rather than trying to find twelve completely separate sets of facts, so Question 4 covers the
features organized by which impairment they serve, Question 8 covers the methodology that
produces those features, and Question 10 covers the controls that expose them to the user. The
same underlying commitment shows up in three places, examined three different ways. Deciding
that explicitly at the start, instead of discovering the repetition after I had already
drafted several answers, would have saved me a fair amount of rework, and it is how I would
approach a multi-part assignment like this next time.

A related difficulty was judging how deep to go, since each of the twelve questions could
support a paper on its own. I ended up setting myself a working rule that every answer had to
name specific standards, tools, or methods instead of gesturing at principles, and had to
connect back to the proposed site instead of floating free of it, so that I was not just
padding the word count and calling it thorough. Where I could not make a point specific to
this particular site, that was usually a sign the point was filler and belonged out.

## What additional resources did you need to use to support your proposal and address the usability, accessibility, and inclusive design questions?

The main resource was the W3C's own Web Content Accessibility Guidelines 2.2, along with the
How to Meet WCAG quick reference and the Understanding documents that go with each success
criterion. Unit 2 introduced the structure of WCAG and the POUR principles, but writing
specific design commitments meant going to the source for the criteria themselves rather than
working from a summary.

Two things only became clear from the primary documentation. The first is that the difference
between conformance levels is a design decision and not a technicality, so deciding to target
Level AA and then deliberately exceed it on readability, which is a AAA criterion at 3.1.5,
was a choice I could only make once I understood what each level actually required. The second
is that the Understanding documents explain the reasoning behind each criterion, and that
reasoning is what lets you apply a criterion to a design the specification never anticipated.
Knowing that Reflow at 1.4.10 exists to serve people who zoom is what let me recognize it as
the same underlying problem as mobile layout instead of treating them as two separate
requirements with two separate solutions. I also worked from WCAG 2.2 specifically rather than
the more commonly cited 2.1, since 2.2 added criteria that matter directly to this proposal,
including Target Size at 2.5.8, Dragging Movements at 2.5.7, and Focus Not Obscured at 2.4.11.

For the usability and information architecture questions I used Nielsen Norman Group's
material, and the one that changed the proposal most was Rohr's framework organizing twenty UX
research methods along three dimensions, attitudinal versus behavioral, qualitative versus
quantitative, and context of use. My first draft of Section 7 just listed feedback mechanisms,
a form, a survey, some analytics, as though having more channels was straightforwardly better.
The three-dimensional framework showed me that those mechanisms are not interchangeable and
that a list can look thorough while still having a gap in it, since analytics are behavioral
and quantitative and tell me what happened at scale but never why, a survey is attitudinal and
captures what people say rather than what they do, and only qualitative behavioral methods
explain causes. Recognizing that a feedback program can be extensive and still be blind in one
whole dimension was the single most useful correction I made to the proposal.

Nielsen Norman Group also gave me the usability heuristics behind the navigation principles in
Section 1, which meant those principles rest on an established framework instead of my
personal preferences, and their information architecture material is where the card sorting
and tree testing methods in Section 11 came from. The most useful idea I took from it was
organizing a site around user tasks instead of internal structure, since my first instinct was
to group content by format into articles, tutorials, and references, which forces the reader
to already know what form their answer takes, and that is exactly the knowledge a learner does
not have yet.

The Unit 2 text, Gilbert's Inclusive Design for a Digital World, gave me what the WCAG
specification deliberately does not, which is the reasoning behind the requirements and an
account of how assistive technologies actually work. Reading about screen readers, switch
devices, and screen magnification as real tools with real behaviors changed how I wrote
Section 3, because I had originally written "test with a screen reader" as though that were
one single activity, and understanding that NVDA, JAWS, VoiceOver, and TalkBack differ
meaningfully in their ARIA support is why the proposal now names specific screen reader and
browser pairings instead. That book's treatment of compliance and legislation also reframed
how I understood the conformance levels, since compliance is a legal floor rather than a
design target, and that is what made me comfortable committing to AA overall while
deliberately exceeding it on readability rather than treating the standard as a finish line.

Overall I needed all three sources because they answer different questions. WCAG defines what
conformance requires and gives me something verifiable, Gilbert explains why those
requirements exist and how the technologies they serve behave, and Nielsen Norman Group
addresses what usability requires, which WCAG does not attempt to specify at all. A site can
satisfy every Level AA criterion and still be miserable to use, and the gap between those two
things is where most of the design decisions in this proposal actually live. Unit 2 framing
accessibility as a compliance obligation and Unit 1 framing UX as a research-driven process
turned out to be two halves of the same problem rather than two separate topics.

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
