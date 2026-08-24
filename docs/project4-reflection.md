# Project 4 Reflection

Gilbert Anderson, WDDE 385, Principles of Web Design and Technology III

Live site: https://cmst387-umgc-ganderson58.azurewebsites.net

## Challenges, how I overcame them, and what I learned

The biggest challenge on this project was not any single bug, it was that the two required
tools, WAVE and PageSpeed Insights, did not always agree with each other about the same page,
and I had to decide what to do when a tool said something was fine and a different tool said it
was not. WAVE reported zero errors and zero contrast errors on every page of the site, with an
AIM score of 10 out of 10 across the board. Lighthouse, which runs the same auditing engine
PageSpeed Insights uses, was stricter in one specific place: it flagged in-text links as
distinguishable from the surrounding paragraph by colour alone, since the site's original
styling underlined a link only on hover rather than by default. That single finding was enough
to drop the Lighthouse accessibility score from 100 to 95 on every page with prose links in it,
which is most of them.

My first move was to just fix the finding, so I made every link underlined by default site-wide
and every page went back to a perfect 100. I did not stay satisfied with that once I actually
looked at a real page with it applied, because this hub is genuinely dense with in-text links,
since every topic page cross-links related concepts constantly, and a paragraph with five or six
underlined phrases scattered through it is harder to read than one where links are distinguished
by colour and by a hover state, which is the same convention the primary navigation already used
successfully before I touched anything. So I reverted the default back to colour plus
hover-underline and accepted the Lighthouse finding as a known, deliberate tradeoff instead of an
unaddressed defect, since WAVE, which is the tool the assignment names specifically, never
flagged the pattern at all, and Lighthouse's own rule is phrased as identifying links that rely
on colour alone, which is not quite true here once a hover and a focus state are counted as part
of what a reader can perceive. The settings panel still offers underlined links as an opt-in for
anyone who wants that stronger cue regardless of my default, which is the same principle the
Project 1 proposal already committed to under user customization, namely that customization
should supplement good defaults instead of a default being weakened so that customization is
never needed.

The second challenge came directly out of applying that same reasoning to the rest of the site,
and it is a smaller story but the kind of thing worth writing down because it is about process
rather than about accessibility specifically. Once I decided the navigation's background-on-hover
was sufficient without an underline, I went to remove the underline from the site's logo link the
same way, and the fix I wrote looked correct in the stylesheet, it changed the logo text's colour
on hover the way I wanted. It did not actually remove the underline, because the underline was
being applied by a more general rule that matches every link on hover, and changing a colour on a
child element does not override a text-decoration rule that is still winning on the parent
element under CSS's own specificity rules. I only found out it had not worked because I checked
the live rendered page again after deploying instead of trusting that the diff looked right, and
the actual fix needed a second, more specific rule targeting the link itself, not just the text
inside it.

What I am taking from all of this into future projects is that tools are just that, tools to
reach your goal or desired outcome, and not the goal itself. WAVE passing does not mean
Lighthouse will pass, Lighthouse passing does not mean the page actually reads well, and neither
one of them knows what I am actually trying to build here, which is a hub that is genuinely easy
to read given how link-dense it is by design. Both tools are useful precisely because they catch
different things, but neither one is the final authority on whether a page serves the person
reading it, and when they disagree the decision about which one to listen to is still mine to
make and mine to defend afterward, not something I can outsource to whichever tool happens to be
stricter. The CSS specificity issue taught me something narrower but just as practical alongside
that, which is that a change that reads correctly in the source is not verified until I have
actually looked at the thing it was supposed to change, live, in the state a reader would
encounter it in. I plan to check the rendered result of a fix before considering it finished on
every project after this one, not just when something looks suspicious, and to keep treating
every tool on this list, WAVE, Lighthouse, PageSpeed Insights, or anything else, as a means of
checking my own judgment rather than a replacement for having any.
