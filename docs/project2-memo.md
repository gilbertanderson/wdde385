# Project 2: Industry-Specific Web Application Security Analysis and Recommendations

Gilbert Anderson, WDDE 385, Principles of Web Design and Technology III

University of Maryland Global Campus

## Industry Selection and Rationale

For this analysis I am looking at the video game industry, and specifically at four
publicly-documented breaches at four different major studios over roughly a three-year span:
Epic Games in 2019, Electronic Arts in 2021, Rockstar Games in 2022, and 2K Games in 2022. I
chose to ground the analysis in real, already-disclosed incidents at real, named companies
rather than build a composite organization the way I did for an earlier assignment in this
course. The reason is that every claim below is about something that already happened and was
already reported by the company itself, an independent security research team, or established
security journalism, so I am not asserting anything about a company's current, unverified
security posture, only analyzing what is already public record. That distinction mattered to
me, since inventing a current vulnerability at a real, currently-operating company is not
something I can responsibly do without evidence, but citing a disclosed, already-patched
incident from a company's own history is a completely different thing, and it is also more
useful, since these four incidents are not four unrelated stories. Read together they cover
almost the entire attack surface a live-service game studio has to defend: a forgotten legacy
subdomain, a stolen browser session, a manipulated support vendor, and a targeted
prompt-bombing campaign against an employee's phone. I am using them as case studies for an
industry-wide analysis rather than a single-company memo, since the assignment explicitly
allows a chosen industry as the unit of analysis, and a pattern across four unrelated studios
is a stronger argument for what the industry as a whole needs than any single incident would
be on its own.

The industry's shape explains why it is targeted the way it is. A major studio operates
several things at once that are each independently valuable to an attacker: a very large base
of player accounts tied to stored payment methods and in-game purchase history, pre-release
game content and marketing plans worth protecting from leak, and proprietary source code and
game engines that represent years of engineering investment and real competitive advantage if
a rival or a pirate gets hold of them. Studios also depend on a wide web of third-party
services, help desks, chat platforms, payment processors, matchmaking and anti-cheat vendors,
each of which is a door into the studio that the studio itself does not fully control. That
combination, high-value data plus a large third-party attack surface plus a workforce spread
across game development, live operations, and outsourced support, is what makes this industry
worth analyzing as its own category rather than folding it into generic enterprise security
advice.

## Confidentiality

Confidentiality in this industry covers more than the player personal and payment data every
consumer web application has to protect, though that is real and Electronic Arts, Rockstar,
and 2K all had some flavor of player-facing or player-adjacent exposure in the incidents
below. The more distinctive confidentiality concern for a game studio is unreleased material:
source code, unannounced content, and pre-release footage that represents both competitive
advantage and, for a live-service title, months or years of marketing lead time. The 2021 EA
breach is the clearest example, since attackers who got into EA's internal network through a
stolen Slack session ultimately exfiltrated roughly 780 gigabytes of data, including the
source code for FIFA 21's matchmaking tools and the Frostbite engine that powers Battlefield
and several other EA titles (Cox, 2021). The 2022 Rockstar breach is the same category of
harm from a different angle: attackers leaked more than 90 clips of unreleased footage from
the still-unannounced Grand Theft Auto VI, alongside claims of access to the game's source
code, months before Rockstar had planned to reveal the project (Ray, 2022). Neither of those
incidents needed to touch a single player's password to do real financial and competitive
damage, which is the point: for this industry, confidentiality protects the studio's own
intellectual property at least as much as it protects the customer sitting on the other end of
the connection.

## Integrity

Integrity questions in this industry show up in two places that do not exist for most
consumer web applications: the game's own economy and the trustworthiness of the channels a
studio uses to communicate with millions of players at once. In-game currencies, item
drops, and matchmaking rankings are only meaningful if players can trust that they reflect
real, unmanipulated outcomes, so a duplication exploit or a compromised anti-cheat system is
an integrity failure with direct financial and reputational consequences, even though no
personal data changes hands at all. The 2022 2K Games incident is the sharper example of the
second kind: attackers compromised a third-party vendor's credentials for 2K's own help desk
platform, then used that access to open fraudulent support tickets in real players' names and
reply from what looked like a completely legitimate 2K support address (Toulas, 2022). Nothing
about that email was forged in the traditional sense; it came from 2K's own real support
system. What broke was the integrity of a channel players had every reason to trust, and that
is exactly what a studio's official communications, patch notes, launcher updates, and support
replies all depend on to function at all.

## Availability

Availability is existential for this industry in a way it usually is not for a static content
site, since a live-service game with the servers down has no product at all, only a client
application with nothing to connect to. The clearest historical example, though it predates
the four primary incidents above, is Sony's 2011 PlayStation Network outage: an external
intrusion compromised roughly 77 million accounts between April 17 and 19, 2011, and Sony took
the entire network offline for 23 days while it investigated and rebuilt, at an estimated cost
of around 171 million dollars (Huntress, n.d.). Three weeks with no PlayStation Network meant
every online-dependent game on the platform was effectively unusable for tens of millions of
people, regardless of whether their own individual account data was ever misused. Modern
live-service titles carry the same exposure through DDoS attacks against matchmaking and login
infrastructure, which do not need to breach anything at all to cause the same kind of harm a
23-day outage did, only enough sustained traffic to keep legitimate players from connecting.

## Introduction

The video game industry sits at an unusual intersection of consumer web application, digital
storefront, and creative studio, and the four incidents this memo draws on, Epic Games (2019),
Electronic Arts (2021), Rockstar Games (2022), and 2K Games (2022), were chosen because each
one illustrates a distinct, still-current category of risk rather than four variations on the
same mistake. What follows is a detailed look at five risks, drawn from the current OWASP Top
Ten (2025), with recommendations tailored to how a game studio's specific architecture,
players, source code, and third-party vendor relationships, makes each one concrete.

### 1. Authentication Failures: Stolen Sessions and Social-Engineered MFA Bypass

Authentication failures were the entry point for two of the four incidents, and they were not
the same failure. In the 2021 EA breach, attackers did not guess or crack a password at all;
they purchased a set of stolen browser cookies for roughly ten dollars on an underground
forum, cookies that happened to contain valid Slack session data for an EA employee (Cox,
2021). A session cookie is functionally a substitute for a password once it is issued, so
whoever holds it is authenticated as that employee without ever needing their credentials.
Once inside EA's Slack, the attackers social-engineered the company's own IT support desk,
claiming they had lost their phone at a party the night before and could not complete
multifactor authentication, and IT support accommodated the request (Cox, 2021). That second
step is the more instructive failure: the technical control worked exactly as designed, but
the human process built around it had no way to verify the claim it was being asked to accept.
The 2022 Rockstar breach shows a related pattern at the account-takeover stage rather than the
support-desk stage: the same actor and technique later confirmed in the closely-timed Uber
breach involved repeated MFA push notifications sent until an employee approved one out of
sheer fatigue, and reporting on the Rockstar incident describes the same aggressive
social-engineering and MFA-bypass pattern used to reach Rockstar's internal Slack (Ray, 2022).

My recommendations, in priority order: (1) move every account with access to source code,
internal chat, or production systems to phishing-resistant multifactor authentication,
specifically FIDO2/WebAuthn hardware keys or passkeys, which the Cybersecurity and
Infrastructure Security Agency names as the only widely available authentication method that
cannot be relayed through a phishing page or approved through fatigue, since a WebAuthn
ceremony cryptographically binds to the real origin domain and a stolen session cookie or a
spammed push prompt cannot substitute for it (Cybersecurity and Infrastructure Security
Agency, 2022; National Institute of Standards and Technology, 2025); (2) require a
verified callback or a manager confirmation, not just a plausible story, before any support
desk resets or bypasses MFA for an employee, since the EA breach shows the technical control
was never actually defeated, the process around it was; (3) set session and cookie lifetimes
short enough that a stolen session has a limited window of use, and bind sessions to device
fingerprints where the collaboration platform supports it; (4) if push-based MFA cannot be
retired immediately, switch to number-matching push approval rather than a simple approve/deny
prompt, since CISA specifically calls out number matching as a meaningful mitigation short of
full phishing resistance (Cybersecurity and Infrastructure Security Agency, 2022).

The honest tradeoff is that hardware keys and passkeys cost money to provision at scale and
create a real support burden the first time an employee loses one, and a stricter support-desk
verification process adds friction and hold time to what is usually a genuinely locked-out,
legitimate employee. Both are worth it against the alternative, which in EA's case was 780
gigabytes of source code walking out the door because a support agent believed a story.

### 2. Broken Access Control: Standing Access That Outran the Job

Getting past authentication is only half of both the EA and Rockstar incidents; what happened
after is a separate failure. Once inside EA's network, the attackers found and used a service
that was meant for developers to compile and build games, then created their own virtual
machines on it to reach the underlying source code repositories (Cox, 2021). Whatever account
or session they were riding on had standing access to build infrastructure and source
repositories that a support-adjacent or general employee credential should not routinely
reach without a separate authorization step. The same shape appears in the Rockstar incident:
the compromised access did not stop at reading messages in Slack, it reached far enough to
pull internal development footage and reportedly source code, well past what an ordinary
Slack session should be able to touch on its own (Ray, 2022). This is the distinction between
authentication and authorization that I keep coming back to across this course: proving who
you are is a different question from what you are then allowed to do, and both incidents show
an identity that was successfully (if fraudulently) authenticated, then granted far more reach
than that specific access path should have carried on its own.

My recommendations: (1) segment source code and build infrastructure behind a separate
authorization boundary from general chat and collaboration tools, so that compromising a
Slack session does not, by itself, grant any path to a code repository; (2) apply least
privilege to service accounts and internal tooling specifically, since the compromised path at
EA was a developer build service, not a database of player records, meaning the audit has to
cover internal engineering tools and not just customer-facing systems; (3) require step-up
authentication, a fresh, separate authentication challenge, before any access to source
repositories or production build systems, even from an already-authenticated internal session;
(4) log and alert on access-pattern anomalies specifically, such as a support-adjacent account
suddenly reaching a code-compilation service it has never touched before, since that access
itself is a stronger signal than any password strength metric could be.

The tradeoff here is organizational friction more than cost. Segmenting access this tightly
means legitimate employees sometimes have to request access they used to have by default, and
that generates support tickets and momentary slowdowns of its own. That friction is exactly
what stops a single stolen session from becoming a 780-gigabyte breach.

### 3. Software Supply Chain Failures: A Compromised Vendor as the Delivery Mechanism

The 2022 2K Games incident is a supply chain failure in the specific sense the current OWASP
Top Ten uses the term: the attacker never touched 2K's own network or code. They obtained
valid credentials for a third-party vendor 2K used to run its help desk platform, and from
inside that vendor's system they created fraudulent support tickets under real players'
names and replied from a genuine 2ksupport.zendesk.com address with a download link for a
file called "2K Launcher.zip," which actually contained RedLine Stealer, an
information-stealing malware that harvests browser-saved passwords, cookies, and stored
payment details (Toulas, 2022). Every technical signal a player could reasonably check, the
sending domain, the fact that it replied inside a real ticket thread, the branding, was
genuine, because the vendor's own legitimate infrastructure was the thing that had been
compromised. A studio can hardened its own perimeter as much as it wants and still inherit
this exact risk through any vendor whose platform its customers are trained to trust.

My recommendations: (1) require multifactor authentication on every vendor and third-party
account that has write access to a customer-facing platform, including help desk and support
tooling, as a contractual condition of the vendor relationship, not a request; (2) maintain a
software and vendor bill of materials specifically for customer-facing third-party platforms,
so that a compromise disclosed by any one vendor can be checked against exposure immediately
rather than discovered independently later; (3) use a tool like OWASP's Dependency-Check to
continuously audit first-party code dependencies for known-vulnerable components, since supply
chain risk is not limited to vendor platforms and also includes every library and package a
studio's own codebase pulls in (OWASP Foundation, n.d.-a); (4) pre-warn players, through an
official, clearly-labeled channel outside the vendor platform itself, that support
communications will never include an unexpected download link, so that even a fully
convincing fraudulent message from a compromised vendor has a chance of being recognized as
out of pattern.

The tradeoff is that a studio does not fully control a vendor's own security practices no
matter how strong its contract language is, so this category of risk can be reduced but never
fully eliminated by the studio acting alone, which is itself worth stating plainly rather than
implying a false sense of complete coverage.

### 4. Security Misconfiguration: A Legacy Subdomain Nobody Was Watching

The 2019 Epic Games incident, disclosed by Check Point Research through coordinated
disclosure before any public exploitation, started with a subdomain,
`ut2004stats.epicgames.com`, left over from a much older, unrelated title and never formally
decommissioned (Check Point Research, 2019). Because it was outside the maintenance scope of
any active team, it was still running old, unpatched code years after anyone had reason to
look at it, and it was exactly that abandonment, not any flaw in Epic's current, actively
maintained login system, that gave researchers their opening. A forgotten asset is
categorically harder to defend than an actively maintained one, since no team is watching its
logs, no one is applying patches to it, and it usually is not even on the list of systems a
security review considers, which is precisely the gap Check Point Research exploited.

My recommendations: (1) maintain a complete, current inventory of every subdomain and every
externally-reachable asset, including anything created for a specific past game or campaign,
with an explicit decommissioning step built into that game or campaign's own end-of-life
process, not left to be remembered later; (2) run continuous external attack-surface scanning
that flags any newly-discovered or newly-reachable subdomain automatically, rather than
relying on a periodic manual audit to catch what asset inventory alone missed; (3) default new
infrastructure to short, automatically-expiring DNS records and hosting allocations for
anything tied to a specific game or event, so an asset that outlives its purpose becomes
unreachable on its own rather than staying live indefinitely by default; (4) use a tool like
OWASP's Zed Attack Proxy to run authenticated scans against every discovered asset, including
legacy ones, rather than scoping automated scanning to only the current flagship product's
domains (OWASP Foundation, n.d.-b).

The tradeoff is mostly discipline and process cost rather than technology cost: decommissioning
takes real coordination across whichever team originally owned an asset, which may no longer
exist in its original form years later, and attack-surface monitoring generates findings that
someone has to actually triage rather than ignore.

### 5. Injection: SQL and Cross-Site Scripting Chained Into Account Takeover

The same abandoned Epic Games subdomain that illustrates misconfiguration is also a direct,
textbook example of injection, and it is worth treating as its own risk category because the
underlying flaw and its fix are different from simply decommissioning old infrastructure. The
subdomain's server-stats page accepted a server identifier through a URL parameter without
proper input validation, and Check Point Research found they could inject SQL system variables
into it to extract database information, bypassing the web application firewall's
blacklist-based filtering in the process, since a blacklist can only block patterns someone
already thought to list (Check Point Research, 2019). A separate page on the same subdomain, a
map search feature, reflected user-supplied search text back into the page without
sanitizing it, a classic cross-site scripting flaw. Researchers chained the two together with
a manipulated OAuth redirect parameter: a crafted login link routed a player through Epic's
real single sign-on flow, then silently redirected them through the vulnerable subdomain,
where the XSS payload executed and captured the player's authentication token as it passed
through, handing the attacker a fully logged-in session without ever touching a password
(Check Point Research, 2019). That is injection used not to steal a database table directly,
but to intercept the token that proves a login already happened, which is a more modern and
more dangerous outcome than the classic textbook example of dumping a users table.

My recommendations: (1) use parameterized queries or an object-relational mapper for every
database call across every property, including legacy and low-traffic ones, so raw string
concatenation is never a possible path regardless of how old or unmaintained a given service
is; (2) apply context-aware output encoding to any user-supplied value rendered back into a
page, following the OWASP Cheat Sheet Series' specific guidance for the context involved, since
HTML, URL, and JavaScript contexts each require different encoding to actually be safe; (3)
replace blacklist-based web application firewall rules with an allowlist approach wherever
possible, since the Fortnite bypass specifically exploited the gap between what a blacklist
author thought to block and what a database engine actually accepts as a valid system
variable; (4) validate and re-verify the destination of any OAuth or SSO redirect parameter
server-side against a strict allowlist of known-good domains, rather than trusting a
client-supplied redirect target at all, which is the specific step that let a login link sail
straight through Epic's own SSO flow into an attacker-controlled destination.

The tradeoff is primarily that fixing this class of bug requires touching old code few people
still know well, which is slower and riskier than writing the equivalent protection into a new
service from the start, and an allowlist-based WAF requires more upfront cataloging of
legitimate traffic patterns than a blacklist does, in exchange for being far harder to bypass
by simply finding a pattern nobody thought to blacklist.

## Conclusion

The four incidents this memo draws on did not happen because these studios were careless in
any obvious sense; Epic, EA, Rockstar, and 2K are large, resourced companies with real
security teams, and each incident still got through. What they share is that the actual
failure point was rarely the primary, actively-defended system: it was a forgotten subdomain,
a purchased browser cookie, a support agent following a plausible story, a compromised
vendor's own credentials. Addressing the five risks above, stronger and more phishing-resistant
authentication, access control that treats authorization as a separate question from identity,
tighter oversight of third-party vendors with write access to customer-facing systems,
disciplined asset inventory and decommissioning, and eliminating classic injection flaws even
in old and unmaintained code, would have interrupted every one of these four incidents at some
point in its chain. The benefit is not just avoiding a specific repeat of one of these four
stories; it is closing exactly the kind of overlooked, secondary path that all four incidents
actually used to get in, which matters more for a studio's real risk than hardening the
primary systems everyone already knows to defend.

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
