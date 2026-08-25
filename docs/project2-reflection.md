# Project 2 Reflection

Gilbert Anderson, WDDE 385, Principles of Web Design and Technology III

University of Maryland Global Campus

## What issues or challenges did you face completing this project?

The memo went through a real pivot partway through. My first draft analyzed a composite
healthcare organization rather than a named company, and I ended up scrapping that direction
in favor of an industry-wide analysis of the video game industry, grounded in four real,
already-disclosed breaches at four real companies, Epic Games, Electronic Arts, Rockstar
Games, and 2K Games. The composite approach was not wrong on its own terms, it existed
specifically because asserting a current, unverified vulnerability about a real, named
organization is not something I can responsibly do without evidence I actually have. What
changed my mind was realizing that the concern behind that rule does not apply the same way to
an incident that already happened and was already disclosed by the company itself or by an
independent research team. Citing that Epic Games had a specific, now-patched vulnerability in
2019 is not an unfounded claim about Epic's current security posture, it is a fact already on
the public record, and four such facts across four different studios make a much stronger
argument for what the industry as a whole needs than one invented company ever could. Weaving
those four unrelated incidents, at four companies with nothing to do with each other beyond
being in the same industry, into one coherent analysis rather than four disconnected anecdotes
was real work. I ended up organizing the whole memo around the idea that each incident
illustrates a different, still-current risk category rather than trying to force all four into
the same narrative, which is what let the pattern across them actually mean something instead
of feeling like four separate case studies stapled together.

The second challenge was in the research itself, and it is a good example of why I go back to
a primary source instead of trusting my own earlier summary of one. I had already written
about the 2019 Epic Games incident once before, for a discussion post in an earlier unit of
this course, and I described it there as a cross-site scripting vulnerability on an abandoned
subdomain. When I went back to Check Point Research's original disclosure to build this memo's
injection section, the actual vulnerability chain was more specific than that: the subdomain
had a genuine SQL injection flaw, exploitable by injecting a system variable to bypass the web
application firewall's blacklist filtering, chained together with a separate cross-site
scripting flaw on a different page of the same subdomain, and a manipulated OAuth redirect
parameter that routed a real login attempt through both of them to steal the resulting session
token. My own earlier summary was not wrong exactly, the XSS piece was real, but it was
incomplete in a way that would have led me to write a narrower, less accurate set of
recommendations if I had worked from memory instead of going back to the source. It also
changed which section of this memo the incident belonged in. I ended up using it twice, once
for misconfiguration, since a forgotten, unpatched legacy asset is the actual root cause, and
once for injection, since the SQL injection and XSS flaws on that asset are a distinct,
separately fixable problem from the decommissioning failure that let them stay reachable in
the first place.

## What additional security resources did you leverage in addition to OWASP top ten?

OWASP set the frame for which five risk categories to cover, but almost every specific claim
in the memo about what actually happened, and to whom, came from outside OWASP entirely, since
OWASP describes categories of risk in the abstract and does not document individual incidents.

For the four core incidents I went to the outlet or organization that originally reported or
disclosed each one rather than a secondhand summary: Check Point Research's own writeup for
the 2019 Epic Games chain, Joseph Cox's reporting at Vice for the 2021 EA breach, Siladitya
Ray's reporting at Forbes for the 2022 Rockstar breach, and Bill Toulas's reporting at
BleepingComputer for the 2022 2K Games incident. I also went outside those four for the
availability section specifically, since none of the four primary incidents is really about
downtime, and used a retrospective on Sony's 2011 PlayStation Network outage to make the point
that a live-service game with its servers down has no product at all, not just a degraded one.

For the authentication recommendations I went to two sources that are more current and more
specific than OWASP's own material on the topic: NIST Special Publication 800-63B, Revision 4,
for the technical requirements behind phishing-resistant authentication, and CISA's own fact
sheet on implementing phishing-resistant MFA, since CISA is the source that actually names
which authentication methods qualify as phishing-resistant and which common methods, including
ordinary approve or deny push notifications, explicitly do not, which is exactly the
distinction the Rockstar and EA incidents turn on.

Finally, for the practical tooling recommendations I used OWASP's own Dependency-Check and
Zed Attack Proxy projects directly, and the OWASP Cheat Sheet Series for the specific,
context-by-context guidance on output encoding that a general injection discussion does not
cover on its own.

## References

Check Point Research. (2019). *Hacking Fortnite accounts.*
https://research.checkpoint.com/2019/hacking-fortnite/

Cox, J. (2021, June 11). *How hackers used Slack to break into EA Games.* Vice.
https://www.vice.com/en/article/how-ea-games-was-hacked-slack/

Cybersecurity and Infrastructure Security Agency. (2022). *Implementing phishing-resistant
MFA* [Fact sheet].
https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf

Huntress. (n.d.). *Sony PlayStation data breach: What happened, impact, and lessons.*
https://www.huntress.com/threat-library/data-breach/sony-playstation-data-breach

National Institute of Standards and Technology. (2025). *Digital identity guidelines:
Authentication and authenticator management* (SP 800-63B, Rev. 4).
https://pages.nist.gov/800-63-4/sp800-63b.html

OWASP Foundation. (2025). *OWASP Top Ten Project.* https://owasp.org/www-project-top-ten/

OWASP Foundation. (n.d.-a). *OWASP Dependency-Check project.*
https://owasp.org/www-project-dependency-check/

OWASP Foundation. (n.d.-b). *OWASP Zed Attack Proxy (ZAP) project.* https://www.zaproxy.org/

Ray, S. (2022, September 20). *Social engineering: How a teen hacker allegedly managed to
breach both Uber and Rockstar Games.* Forbes.
https://www.forbes.com/sites/siladityaray/2022/09/20/social-engineering-how-a-teen-hacker-allegedly-managed-to-breach-both-uber-and-rockstar-games/

Toulas, B. (2022, September). *2K Games says hacked help desk targeted players with malware.*
BleepingComputer.
https://www.bleepingcomputer.com/news/security/2k-games-says-hacked-help-desk-targeted-players-with-malware/
