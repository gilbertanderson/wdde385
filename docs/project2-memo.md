# Project 2: Industry-Specific Web Application Security Analysis and Recommendations

Gilbert Anderson, WDDE 385, Principles of Web Design and Technology III

University of Maryland Global Campus

## Business Selection and Rationale

For this analysis I am using Northgate Regional Health, a representative composite organisation
rather than a real, named health system. I want to be upfront about that choice and explain why
I made it. Northgate is modeled as a mid-sized regional multi-specialty system with roughly four
hospitals, thirty outpatient clinics, about 6,000 employees, and roughly 400,000 patients served,
operating a patient-facing web portal called MyNorthgate for appointment scheduling, lab and
imaging results, secure messaging with providers, prescription refill requests, and online bill
pay. The portal sits on top of an EHR backend, integrates with a third-party payment processor,
exchanges data with a lab results interface built on HL7/FHIR, and connects to an e-prescribing
gateway, with federated login for staff and self-registration plus identity proofing for
patients.

I chose to build a composite instead of naming a real hospital system because I cannot
responsibly assert that a specific real organisation has particular unpatched vulnerabilities or
specific architectural weaknesses without evidence I do not actually have, and without doing that
organisation an injustice in the process. A named hospital's actual patch levels, actual vendor
contracts, and actual security posture are not public information I can verify, so any concrete
finding I invented about a real system would be an unfounded claim dressed up as analysis.
Building Northgate as a clearly labelled composite lets me keep every recommendation concrete and
specific to a realistic portal architecture, since I am still naming exact standards, exact
controls, and exact prior incidents, without asserting anything false about a real employer, a
real vendor, or a real patient population.

I chose healthcare as the sector because the evidence base makes it the sector where a portal
like MyNorthgate is both uniquely targeted and uniquely expensive to get wrong. The 2026 Verizon
DBIR recorded 1,492 healthcare security incidents with 1,438 confirmed data disclosures, and on
that same dataset external actors were behind 81 percent of healthcare breaches, with financial
motive present in 99 percent of them (Verizon, 2026). That is not an industry suffering
occasional accidents, it is an industry that criminal actors have decided is worth attacking on
purpose. IBM's Cost of a Data Breach Report 2026 puts the average healthcare breach at 6.64
million dollars, the highest of any industry measured and well above the 4.99 million dollar
global average (eSecurity Planet, 2026), and multiple outlets reporting on that 2026 IBM report
describe healthcare as having now held the most expensive spot for thirteen consecutive years
(Paubox, 2026). That combination of highest targeting and highest cost is why I am analysing this
sector, and why a mid-sized regional system with a public-facing portal like MyNorthgate is a
realistic and instructive subject.

## Confidentiality

The confidentiality question for MyNorthgate is not abstract. The portal holds lab results,
imaging reports, medication histories, secure messages between patients and providers, and
enough demographic and billing detail to support identity theft on its own. What makes this
different from a typical consumer data breach is that protected health information cannot be
reissued the way a password or a credit card number can. A patient can get a new card number in
a week, but a patient cannot get a new diagnosis history or a new record of a mental health
visit. Once that information is exposed it stays exposed for that person's whole life, which is
why HIPAA's technical safeguards under 45 CFR 164.312 make unique user identification and person
or entity authentication required standards rather than addressable ones, since the regulation
is built around the assumption that this category of data cannot be made whole again after the
fact (U.S. Department of Health and Human Services, 2024c).

The scale of the exposure is not hypothetical either. The HHS Office for Civil Rights breach
portal has recorded more than one billion individuals affected by reportable healthcare breaches
since 2009, more than the population of the United States several times over (HIPAA Journal,
2026a), and in calendar year 2025 network servers, the exact category MyNorthgate's EHR
interface and portal database sit in, were the location of the breached PHI in 61.5 percent of
reported healthcare incidents (HIPAA Journal, 2026b). The largest healthcare breach in US
history, the Change Healthcare attack, started because attackers used stolen credentials to reach
a remote access portal that had no multifactor authentication, despite company policy requiring
it (Cybersecurity Dive, 2024), and a patient-portal-specific breach at ManageMyHealth in New
Zealand, described by its own vendor as an intrusion using "valid credentials," exposed over
400,000 medical documents belonging to roughly 120,000 to 127,000 patients (Wikipedia, 2026). Both
are the same failure mode a portal like MyNorthgate would have if authentication is not treated
as the primary confidentiality control, since once the front door fails, everything behind it is
exposed at once.

## Integrity

Integrity in a patient portal is not a data quality concern, it is a patient safety concern, and
I want to be precise about why those are different. If a retailer's catalogue has a wrong price,
someone loses money. If MyNorthgate's medication list, allergy list, or a lab value is silently
altered, whether by a software bug, a failed sync between the EHR and the portal, or an attacker
with write access, a clinician making a prescribing decision is working from false information
without knowing it. A silent integrity failure in an allergy field could mean a patient is
prescribed a drug they are allergic to. A silent integrity failure in a lab value, a potassium
level or an INR for instance, could mean a dosing decision gets made against a number that is not
real. Nobody gets an alert when this happens, which is what makes it dangerous, because an
availability failure is loud and an integrity failure is quiet.

This is why HIPAA's technical safeguards include an Integrity standard at 164.312(c), requiring
mechanisms to detect improper alteration of ePHI, even though the standard is formally
addressable rather than required, meaning Northgate has to implement it or document in writing
why an equivalent alternative was chosen (U.S. Department of Health and Human Services, 2024c).
On the API side, the risk is concrete and specific to how MyNorthgate is built. The OWASP API
Security Top 10's object-level and object-property-level authorization categories describe
exactly the failure where an API accepts a read or a write to a field the caller was never
authorized to reach, which for a FHIR-based lab and results interface could mean a client that
should only read a lab value is instead able to alter one (OWASP Foundation, 2023). The
mitigation HL7 provides is not generic, it is the AuditEvent and Provenance resources built into
FHIR itself, which record who changed what and why, paired with mandatory justification capture
for any break-glass emergency access override (HL7 International, n.d.-b). I will be honest that
the research base I have does not include a documented public case of a silent clinical data
corruption incident at a named health system, and I think that absence is itself telling, since
these are by definition the failures that do not get noticed and therefore do not get reported.

## Availability

Downtime at a hospital is not the same category of problem as downtime at a retailer, and the
evidence here is unusually well documented because two of the largest healthcare ransomware
incidents in US history happened in the same year. When Change Healthcare was taken offline in
February 2024, an American Hospital Association survey of nearly 1,000 hospitals found that 74
percent reported a direct impact on patient care, 94 percent reported a financial impact, and 83
percent reported an impact on cash flow, with the disruption reaching e-prescribing and pharmacy
claims processing nationwide (American Hospital Association, 2024). When Ascension, a system
roughly thirty times Northgate's size, was hit by ransomware in May 2024, its patient portal and
EHR access went down, ambulances were diverted, and staff worked from paper for approximately six
weeks, even though only seven of Ascension's roughly 25,000 servers were directly compromised,
which tells me the operational blast radius of an outage is nearly always larger than the
technical compromise that caused it (HIPAA Journal, 2024).

The clinical consequences of this kind of downtime are not speculation, they have been measured.
A peer-reviewed study in JAMA Network Open of the 2021 Scripps Health ransomware attack found
that at two neighboring hospitals that were never themselves breached, median emergency
department wait times rose 47.6 percent and confirmed stroke diagnoses rose 113.6 percent during
the attack period (Dameff et al., 2023). A University of Minnesota working paper analysing 374
ransomware attacks on US healthcare organisations between 2016 and 2021 estimated that in-hospital
Medicare mortality rose during attack periods, and attributed an estimated 42 to 67 excess
Medicare patient deaths to the attacks studied, while flagging that the true toll across all
patients is likely larger and that the finding was, as of reporting, still a working paper rather
than a peer-reviewed publication (STAT News, 2023). That is why I am treating MyNorthgate's uptime
as a clinical control rather than an IT metric, and why HIPAA's administrative safeguards make
the three elements of a Contingency Plan, backup, disaster recovery, and emergency mode
operation, required rather than addressable (U.S. Department of Health and Human Services,
2024a).

## Introduction

I am writing this memo to lay out the five security risks I am recommending Northgate Regional
Health leadership treat as priorities for the MyNorthgate patient portal, and before I get into
the specifics I want to explain why I think a health system's patient-facing web portal deserves
a different kind of scrutiny than a typical customer-facing web application.

The first reason is who is attacking it. As the Business Selection section above detailed, the
2026 Verizon DBIR data alone makes healthcare a uniquely targeted sector: 81 percent of breaches
involved external actors and 99 percent were financially motivated (Verizon, 2026). That is not
an industry being hit by accidents or curious researchers, it is an industry being worked by
criminals who expect to be paid, which is why I am treating MyNorthgate as a revenue target
rather than an occasional liability.

The second reason is structural, and it is specific to healthcare in a way that a retail or media
website is not. A hospital cannot simply take its scheduling and results system offline for a
weekend patch window the way a SaaS company might, because clinical uptime is a patient safety
requirement, not a service-level agreement. The Change Healthcare ransomware attack in February
2024 is the clearest evidence of what that dependency actually costs: a single compromised Citrix
remote-access portal with no multifactor authentication led to an outage that, according to a
survey of nearly 1,000 hospitals conducted by the American Hospital Association, produced direct
patient care impact at 74 percent of respondents and significant financial impact at over half
(American Hospital Association, 2024). The Ascension Health ransomware incident a few months
later forced ambulance diversions and weeks of paper charting even though only 7 of roughly
25,000 servers were directly compromised (HIPAA Journal, 2024), which tells me that blast radius
and technical compromise are two very different measurements for a system like ours.

The third reason is that the data itself cannot be reissued. If a payment card number leaks, the
bank cancels it and issues a new one. A patient's diagnosis history, medication list, and lab
results cannot be reset, which is why I am framing confidentiality failures in this memo as
permanent rather than recoverable.

With that context in mind, the five risks that follow move from how someone gets into
MyNorthgate, to what they can reach once they are in, to how failures in Northgate's vendor
relationships and infrastructure make both of those easier than they should be.

### 1. Authentication Failures: Credential-Based Compromise of Patient and Staff Access

I am starting with authentication because it is the front door, and for a portal like MyNorthgate
there are really two front doors that need separate treatment. The first is patient
self-registration and login, where identity proofing happens once at account creation and then
every subsequent visit relies on a password (and, ideally, a second factor) to prove the same
person is coming back. The second is federated staff login into systems that sit next to or
inside the EHR, which is a different threat model entirely because staff and vendor accounts
often carry standing administrative or remote-access privileges. Mechanically, the patient side
breaks through credential stuffing: an attacker takes username and password pairs leaked from an
unrelated breach (a retailer, a streaming service, anything) and replays them against
MyNorthgate's login endpoint at scale, betting that some fraction of patients reused a password.
No vulnerability in Northgate's code is required, since the attack is just automated login
attempts using credentials patients themselves exposed elsewhere. The staff side breaks through a
different mechanism, which is a single compromised or purchased credential used to authenticate
into a remote-access portal that either has no second factor or allows a fallback path around it,
after which the attacker is inside the network perimeter with a legitimate session and can move
laterally toward the EHR-adjacent systems the portal depends on.

Both of these are not hypothetical for a health system with Northgate's architecture.
UnitedHealthcare's own mobile app was hit by exactly the patient-side pattern in February 2023,
when attackers used credentials stolen from unrelated prior breaches to log into member accounts
and pull names, birthdates, addresses, member IDs, and claim details, with no evidence that
UnitedHealthcare's own systems were ever technically breached (HIPAA Journal, 2023a). The
staff-side pattern is even better documented: Change Healthcare's CEO testified to Congress that
the 2024 breach, which OCR's own portal lists at 100 million affected individuals and which
UnitedHealth Group itself has put as high as 190 million or more, began when attackers used
compromised credentials to log into a Citrix remote-access portal that did not have multifactor
authentication enabled, despite company policy requiring it (Cybersecurity Dive, 2024). That is a
textbook authentication failure at the exact kind of integration point MyNorthgate has, namely
remote and vendor access into EHR-adjacent infrastructure. At the industry level, Verizon's 2026
healthcare data shows credential abuse present in the initial access mix and the human element
involved in 54 percent of healthcare breaches, and their 2025 healthcare data found that 88
percent of breaches in the "get in, get the data, get out" web application attack pattern
involved stolen credentials (Verizon, 2025, 2026). Credential abuse also still shows up somewhere
in 39 percent of all breaches even where it is not the initial entry point, which argues for
controls after login and not just at it (Descope, 2026).

My mitigation recommendations, in priority order: (1) require phishing-resistant multifactor
authentication, specifically WebAuthn/FIDO2 passkeys, as an option for every patient account and
as the mandatory method for every staff and administrative account, consistent with NIST SP
800-63B Rev. 4's requirement that AAL2 offer a phishing-resistant option and AAL3 require a
non-exportable cryptographic key (National Institute of Standards and Technology, 2025); (2) put
rate limiting and bot/anomaly detection in front of the login endpoint specifically to blunt
credential-stuffing attempts against patient accounts; (3) eliminate every remaining
password-only or SMS-only remote-access path into EHR-adjacent systems, since that is precisely
the gap that Change Healthcare's Citrix portal had; (4) treat MFA on internet-accessible accounts
as a baseline the way HHS's Cybersecurity Performance Goals define it, not an optional hardening
step (U.S. Department of Health and Human Services, 2024b); and (5) force password resets and
session invalidation automatically whenever a patient's credentials appear in a known breach
corpus, since that is the exact condition that made the UnitedHealthcare app vulnerable.

The honest tradeoff here is friction and cost. WebAuthn for patients means asking a population
that skews older and less technical to enroll a passkey or security key, which will generate
support calls and some enrollment drop-off, and rate limiting on login has to be tuned carefully
or it locks out legitimate patients trying to see a lab result. None of that is a reason to skip
it, but it is real ongoing operational cost, not a one-time engineering fix.

### 2. Broken Access Control: Object-Level Authorization Failures on the Patient-Facing FHIR API

This risk is about what happens after a MyNorthgate session is already authenticated, when the
portal calls out to the EHR over HL7/FHIR to pull a lab result, an imaging report, a secure
message thread, or a refill status. FHIR represents every one of those things as a resource with
an identifier in the URL path, so a lab result is something like `Observation/5678` and a patient
record is `Patient/1234`. The API is only as safe as the check that runs on the server before it
returns that resource. If the backend verifies that the caller holds a valid OAuth token and
stops there, without also confirming that the specific `Observation` or `DocumentReference` or
`Communication` ID being requested actually belongs to the patient named in that token's context,
then any authenticated user, patient or staff, can change the number in the request and read
someone else's chart. This is Broken Object Level Authorization, and it does not require breaking
encryption or guessing a password. It requires nothing more than a legitimate login and a
browser's developer tools, or a script that walks sequential IDs and harvests whatever comes
back. Because MyNorthgate's refill requests, imaging results, and secure messaging are all
described as running over this exact interface, this is not a hypothetical edge case, it is the
primary data-return path for the entire portal.

I am not treating this as a theoretical risk. A patient portal of comparable scale to
MyNorthgate, ManageMyHealth in New Zealand with roughly 1.8 million registered users, had its
document storage module compromised in a way that exposed over 400,000 medical documents,
referrals, discharge summaries, lab results, and imaging reports, belonging to somewhere around
120,000 to 127,000 patients, and the vendor's own account attributed the access to "valid
credentials," which is precisely the pattern of an authenticated session reaching data it should
never have been authorized to reach (Wikipedia, 2026). OWASP's own API-specific guidance puts
Broken Object Level Authorization at the top of its API Security Top 10 for exactly this reason,
since APIs that expose per-resource identifiers are structurally the easiest place for this class
of bug to hide (OWASP Foundation, 2023), and the current OWASP Top 10 for web applications
elevated Broken Access Control to the number one overall category, now also absorbing
server-side request forgery (OWASP Foundation, 2025a). Separately, current DBIR analysis notes
that credential abuse now shows up somewhere in 39 percent of breaches even though it is the
initial entry point in only 13 percent, which is the data-backed argument for why post-login
authorization deserves its own line item in Northgate's risk register rather than being folded
into login security (Descope, 2026).

My recommendations, in order of what I would actually build first:

1. Enforce record-level authorization on every FHIR call, server-side, by checking that the
   resource's subject reference matches the authenticated user's own patient context before
   returning data, not just checking that the OAuth token is valid.
2. Adopt SMART App Launch v2 granular scopes, for example `patient/Observation.rs` instead of a
   broad `patient/*.read`, so the token itself is bound to a single patient at the authorization
   layer as well as the application layer (HL7 International, n.d.-a).
3. Replace any sequential or otherwise guessable resource identifiers exposed to the portal with
   non-enumerable UUIDs, since ID enumeration is the cheapest version of this attack.
4. Run authenticated OWASP ZAP scans against a staging copy of the FHIR endpoints in CI,
   configured to fail the build on access-control findings, rather than relying only on static
   analysis that cannot see cross-tenant data leakage (OWASP Foundation, n.d.-b). This is the
   single ZAP CI gate this memo recommends; Risks 3 and 5 below extend the same scan profile to
   cover dependency and misconfiguration rule sets rather than standing up separate scans.
5. Adopt the Access Control chapter of OWASP's Application Security Verification Standard 5.0 at
   Level 2 as the actual checklist for code review sign-off on every endpoint that touches PHI
   (OWASP Foundation, 2025b).
6. Log every resource access, not just every login, so a pattern of one account pulling records
   for many different patient IDs in a short window is something the SOC can actually see and
   alert on.

The honest tradeoff here is that object-level authorization checks have to be written and
reviewed endpoint by endpoint. There is no scanner that reliably finds every missing check across
a large API surface, which means this is a code-review and manual pen-testing cost, not a tool
you buy once. It also adds a database lookup to every single API call to confirm ownership, which
is a real latency cost at scale, and it means the EHR integration team cannot simply trust the
token and move on, they have to re-verify context on the resource itself every time. That is more
engineering discipline than most teams want to sustain, but for a portal returning lab results
and imaging reports, I do not see a cheaper way to close this gap.

### 3. Software Supply Chain Failures in the EHR, Payment, and E-Prescribing Integrations

MyNorthgate is not a self-contained application. It is a thin client stitched to four separate
backends, each maintained by a different vendor on its own release cadence: the EHR system, a
payment processor, an HL7/FHIR lab interface, and an e-prescribing gateway. A supply chain
failure here is not Northgate's own developers introducing a bug, it is a vulnerability, a
malicious package, or an unpatched component sitting in code Northgate imports, links against, or
calls over a network boundary it does not control. Mechanically this shows up in a few realistic
ways for a portal like this one: a JavaScript library pulled into the payment widget from a CDN
gets tampered with and starts skimming card data directly out of patient browsers, a file-transfer
or messaging middleware product used to move HL7 traffic between the portal and the lab interface
has an unauthenticated deserialization flaw that lets an attacker drop a webshell, or the
e-prescribing SDK ships with a known-vulnerable dependency nobody at Northgate ever audited
because it arrived pre-bundled. The defining feature of this risk is that the vulnerable code was
never written or reviewed internally, so Northgate's own code review and SAST gates never touch
it.

The MOVEit campaign is the clean illustration of exactly this pattern. Progress Software's
file-transfer product had an exploitable flaw used by the Clop group, and the downstream damage
landed on organizations that had never written a line of the vulnerable code themselves. Maximus,
a Medicare contractor, had roughly 612,000 beneficiaries' names, Social Security numbers, and
diagnosis histories exposed through it (Cybersecurity Dive, 2023), and Welltok and Delta Dental
of California, both healthcare vendors rather than providers, lost approximately 8.5 million and
7 million patient records respectively through the same unpatched product (HIPAA Journal, 2023b).
That is structurally identical to what Northgate's four named integrations look like from the
outside: shared components moving regulated data between organizations that trust each other's
patch discipline rather than verifying it. This is not a fading threat either. Verizon's 2026
DBIR found breaches with third-party involvement rose 60 percent year over year to 48 percent of
all breaches, and that only 23 percent of third-party organizations had fully remediated missing
or improperly secured MFA on their own cloud accounts (Verizon, 2026). The same report found
exploitation of vulnerabilities is now the top initial access vector across all breaches at 31
percent, with only 26 percent of known-exploited vulnerabilities fully remediated in 2025 and a
median time to full resolution of 43 days (Verizon, 2026). For MyNorthgate, that 43-day median is
the honest way to size the exposure: every day a vendor sits on a patched CVE in its EHR module
or payment SDK is a day Northgate is carrying that vendor's unpatched risk against its own patient
population, usually without visibility into the vendor's remediation timeline unless it is
contractually required.

I am recommending five concrete steps:

1. Require every vendor supplying code into the MyNorthgate stack (EHR modules, the payment SDK,
   the e-prescribing client library) to deliver a machine-readable SBOM in CycloneDX or SPDX
   format as a contract term, aligned to CISA's minimum-elements guidance so it captures
   component hashes and license data rather than a bare package list.
2. Feed vendor SBOMs into OWASP Dependency-Track for continuous monitoring, so a CVE disclosed
   after a vendor's last build still raises an alert, and run OWASP Dependency-Check at every
   internal build of the portal's own middleware (OWASP Foundation, n.d.-a).
3. Extend the same ZAP CI gate described in Risk 2 to run authenticated scans against staging,
   including the exposed FHIR endpoints, as a pre-release gate configured to fail the build on
   high-severity findings (OWASP Foundation, n.d.-b).
4. Require Subresource Integrity hashes on any externally hosted script tag from the payment
   processor or analytics vendors, paired with a strict Content Security Policy, so a compromised
   CDN script cannot execute unmodified in a patient's browser.
5. Write a patch SLA into each Business Associate Agreement tied to CVSS severity, with proof of
   remediation required rather than an annual attestation on file.

I want to be honest that none of this prevents a genuine zero-day the way MOVEit was a zero-day.
SBOM monitoring and contractual SLAs shorten dwell time and give Northgate leverage after the
fact, they do not stop day-one exploitation. It is also a real operational cost across four
separate vendor relationships, since Dependency-Track alerts need someone actually triaging them,
and a patch SLA is only as strong as Northgate's willingness to enforce it against an EHR vendor
or payment processor it cannot easily replace.

### 4. Insecure Design: An Architecture Not Built to Limit Ransomware's Blast Radius

I want to be clear that this risk is not about a missing patch or a flawed line of authentication
code, since that is Risk 3. This is about whether Northgate's own architecture, the wiring
between MyNorthgate and the four systems it depends on (the EHR backend, the third-party payment
processor, the HL7/FHIR lab interface, and the e-prescribing gateway), was designed with the
assumption that any one of those systems can and will fail or be taken hostage. Mechanically, a
ransomware actor does not need to compromise the portal itself. An attacker who lands anywhere on
Northgate's network, in the EHR's remote-access gateway, on a clinic endpoint, or inside the
payment processor's environment, can move laterally if the network is flat and the portal's
dependencies aren't segmented from clinical systems. Once ransomware deploys, the portal doesn't
fail gracefully. Because there's no circuit breaker on calls to the EHR or e-prescribing gateway,
no cached read-only fallback for already-retrieved lab results, and no downtime runbook sized
specifically to MyNorthgate's four integrations, one compromised system takes the whole portal
down: scheduling, results, secure messaging, and bill pay all fail simultaneously, and staff
revert to paper with no rehearsed process for doing so.

I am recommending Northgate treat this as a governance-level gap because the two most instructive
healthcare precedents are both design failures, not code bugs. Change Healthcare's attack began
because attackers used compromised credentials against a Citrix remote-access portal that lacked
MFA (Cybersecurity Dive, 2024), and because that clearinghouse function was a single point of
failure with no segmented fallback, the resulting outage left 94 percent of surveyed hospitals
reporting financial impact and 74 percent reporting direct patient care impact (American Hospital
Association, 2024), while UnitedHealth's remediation costs reached at least 2.87 billion dollars
for 2024 alone (Healthcare Dive, 2024), and paying the 22 million dollar ransom didn't even
guarantee the data was destroyed (The Register, 2024). Ascension's May 2024 attack is closer still
to Northgate's shape: only seven of roughly 25,000 servers were directly compromised, yet the
whole health system's EHR and patient portal were knocked offline for around six weeks because
nothing isolated the portal from the rest of clinical operations (HIPAA Journal, 2024). The
clinical stakes are not theoretical either. A JAMA Network Open study of the 2021 Scripps Health
ransomware attack found that neighbouring, unaffected hospitals absorbing the diverted patient
load saw ED wait times rise 47.6 percent and confirmed stroke diagnoses more than double during
the attack period (Dameff et al., 2023), and a University of Minnesota working paper covering 374
hospital ransomware attacks estimated 42 to 67 excess Medicare patient deaths tied to attack
periods, though I want to flag that this remains a working paper the authors themselves call a
likely undercount (STAT News, 2023). With ransomware present in 48 percent of all breaches in the
most recent Verizon data (Verizon, 2026), the question for a four-hospital system like Northgate
is not whether one of its four portal integrations gets hit eventually, but whether the
architecture confines the damage or lets it cascade into every clinical workflow at once.

Concrete steps I would execute:

1. Segment the network so MyNorthgate's application tier sits in its own zone, enforced with a
   Zero Trust Network Access platform or next-generation firewall (categories such as Zscaler
   Private Access or Palo Alto Networks NGFW rather than VLAN-only separation), with
   least-privilege, explicitly allow-listed service accounts and firewall rules governing traffic
   to the EHR interface engine, payment processor, and e-prescribing gateway, instead of a flat
   network where lateral movement from any one compromised system reaches the rest.
2. Build a documented, tested contingency plan for the portal specifically, covering backup,
   disaster recovery, and emergency mode operation, since 164.308(a)(7) already makes this a
   required administrative safeguard, not an optional one (U.S. Department of Health and Human
   Services, 2024a).
3. Design circuit breakers and graceful degradation into the portal's integration layer, using a
   resilience library pattern (such as Resilience4j on the Java side of an EHR integration
   gateway) so that if the e-prescribing gateway or payment processor is unreachable, scheduling
   and results viewing keep working from cached, read-only data instead of the whole application
   failing.
4. Run a tabletop exercise that simulates one integration going dark for 72 hours and rehearses
   the manual/paper workflow, since the AHA survey found most hospitals rated their actual
   workaround processes only "somewhat successful" once tested for real (American Hospital
   Association, 2024).
5. Maintain immutable, offline backups of EHR and portal configuration with a tested restore
   process, since Change Healthcare's experience shows paying a ransom doesn't guarantee the
   attacker deletes the data or stays bought off (The Register, 2024).
6. Treat HHS's Enhanced Cybersecurity Performance Goals for network segmentation and centralised
   log collection as the practical target for a system Northgate's size, rather than the
   smaller-organisation Essential tier alone (U.S. Department of Health and Human Services,
   2024b).

None of this is cheap or quick. Segmenting the network across four hospitals and 30 clinics means
real re-architecture work and probably new firewall or software-defined networking rules that
will break existing integrations the first time they're enforced properly. Circuit breakers and
cached fallback views add engineering complexity that has to be maintained and tested in its own
right, and tabletop exercises pull clinical and IT staff away from other priorities. In my opinion
it is worth the cost anyway, because the alternative, judging by Change Healthcare and Ascension,
is a six-week outage across an entire health system rather than a contained failure of one
integration.

### 5. Security Misconfiguration: Exposed Data Stores and Unhardened Portal Infrastructure

Security misconfiguration is not a flaw in application logic, it is an insecure state that a
properly built system was left in, or an over-permissive default that nobody tightened before the
system went live. On a project the size of MyNorthgate, this shows up in predictable places. A
cloud storage bucket holding batch exports of lab results for the HL7/FHIR interface gets created
with public or organization-wide read access during testing and the access control is never
tightened before the bucket starts receiving production data. A staging or QA copy of the portal,
spun up so a vendor can test the e-prescribing gateway integration, gets deployed with the same
database seeded from a production snapshot, default admin credentials still active, and no WAF or
IP restriction in front of it because "it's just staging." A directory listing is left enabled on
a file server behind the payment processor integration. An error page in the appointment
scheduling module returns a full stack trace with connection strings when the backend times out.
None of these require an attacker to break anything. They require only that the attacker, or more
often a security researcher, a bot doing internet-wide scanning, or a journalist, finds the thing
already sitting open. That is the mechanical difference from the other four risks in this memo:
this one is discovered, not defeated.

For Northgate Regional Health this matters because of how consistently this exact pattern shows
up in the sector's own breach data, not because it is a generic best practice. Verizon's DBIR has
placed Miscellaneous Errors, the pattern that includes misconfiguration, among healthcare's top
three breach patterns in every edition from 2014 through 2026, and the 2026 dataset's leading
error varieties were misdelivery, loss, and misconfiguration, described specifically as exposing
a data store to the internet without appropriate controls (Verizon, 2026). That is a twelve year
run, which is a materially longer evidentiary base than any single incident I cite elsewhere in
this memo, and it is part of why OWASP moved this category from fifth to second in the current
Top 10, covering sixteen CWEs (OWASP Foundation, 2025a). The 2025 HHS OCR data reinforces the
same point from a different angle: network servers were the location of breached PHI in 61.5
percent of reported healthcare breaches that year, meaning the dominant loss channel in the
sector is server-side exposure of data at rest, exactly the asset class a portal's staging
environments and interface data stores belong to (HIPAA Journal, 2026b). Verizon also notes that
misconfiguration findings of this kind are frequently surfaced by researchers who notify rather
than exploit, which changes the operational posture Northgate needs: the first sign of trouble is
often a disclosure email, not an intrusion alert, and the organization needs a process to receive
and act on that email fast.

My recommended mitigations, in the order I would execute them:

1. Inventory every cloud storage bucket, object store, and file share touching MyNorthgate or its
   EHR, payment, lab, or e-prescribing interfaces, and set default-deny access with explicit
   allowlists, verified against AWS S3 Block Public Access or the Azure/GCS equivalent, not just
   IAM policy review.
2. Require that every staging and QA environment either uses synthetic data or is provisioned
   under the same access controls, network segmentation, and MFA requirements as production,
   since a staging system holding a production PHI snapshot is production for compliance
   purposes.
3. Extend the ZAP CI gate from Risk 2 to run baseline scans against staging on every release,
   configured to fail the build on high severity alerts, catching directory listing, verbose
   error pages, and default credentials before deployment (OWASP Foundation, n.d.-b).
4. Disable detailed error output and stack traces in any environment reachable from the internet,
   replacing them with generic error responses per OWASP's Mishandling of Exceptional Conditions
   guidance, and route the detail to internal logs only.
5. Stand up a documented vulnerability disclosure channel (a security.txt file and a monitored
   inbox) so that a researcher who finds an exposed asset has an obvious, fast path to tell
   Northgate before going public.
6. Conduct the HIPAA-required risk analysis under 45 CFR 164.308(a)(1) explicitly covering the
   portal's cloud storage and staging footprint, since OCR's April 2026 enforcement actions cited
   an incomplete risk analysis in all four ransomware-related settlements, independent of whether
   the underlying attack succeeded (U.S. Department of Health and Human Services, 2026).

The honest tradeoff here is that this is unglamorous, high volume work. Unlike a single
authentication control, misconfiguration risk is distributed across every bucket, every staging
box, and every interface endpoint that project teams spin up over the life of a multi-year portal
program, so the fix is process and inventory discipline sustained over years, not a product
Northgate buys once. Scanning and access review add real time to release cycles, and teams will
push back when a deploy is blocked by a ZAP finding on a system they consider "not production." I
think that friction is worth keeping given the twelve year pattern in the data, but I want to be
clear it is friction, not a free control.

## Conclusion

I want to be honest about what implementing these five recommendations actually buys Northgate
Regional Health, because a memo that promises risk elimination is not a memo I would trust
either.

Tied to the confidentiality leg of the CIA triad, phishing-resistant authentication (WebAuthn
passkeys for patients at AAL2, FIDO2 or PIV hardware keys for staff and administrative access at
AAL3, per NIST SP 800-63B Revision 4) and record-level FHIR authorization scoping close the two
access paths that the research record shows are actually being used against systems like ours:
the UnitedHealthcare mobile app credential-stuffing incident and the Change Healthcare Citrix
portal that had no MFA at all. Neither of those precedents required a sophisticated exploit, which
is also why I am confident this is where the fastest and cheapest improvement is available.
Integrity benefits mainly from the FHIR authorization and audit control work, since a system that
logs who touched which patient record, and cannot have that log quietly edited, is a system where
a broken-object-level-authorization failure like the one at the ManageMyHealth portal gets caught
in hours instead of months. Availability is the hardest of the three to improve cheaply, because
segmentation and failover architecture sized to the portal's actual blast radius is a design-level
project, not a configuration change, and the peer-reviewed evidence on ransomware's effect on
neighboring, unaffected hospitals' emergency department wait times and mortality tells me this is
worth doing even though it is slow.

If I had to rank these by benefit per unit of effort for a leadership team deciding where to
start, I would put mandatory MFA and phishing-resistant login first, since it is the single
control most directly implicated in the largest documented healthcare breach in US history and it
is deployable in weeks, not quarters. Closing exposed data stores and hardening staging
environments is a close second, since misconfiguration of exactly this kind has been one of the
top three healthcare breach patterns for twelve consecutive years and mostly requires inventory
and discipline rather than new architecture. Supply chain monitoring and the resilience
architecture work are real and necessary, but they are multi-quarter programmes, and I would
rather leadership know that going in than discover it after the first status update.

None of this makes MyNorthgate unbreachable. A realistic improved posture looks like fewer
plausible entry points, faster detection when something does get through, and an outage that
degrades gracefully instead of taking four hospitals and thirty clinics down at once. That is a
meaningfully different position than where the portal sits today, and it is the position I am
recommending we work toward.

## References

American Hospital Association. (2024, March 15). *AHA survey: Change Healthcare cyberattack
significantly disrupts patient care, hospitals' finances.*
https://www.aha.org/2024-03-15-aha-survey-change-healthcare-cyberattack-significantly-disrupts-patient-care-hospitals-finances

Cybersecurity Dive. (2023, July). *MOVEit data breach affects Medicare beneficiaries.*
https://www.cybersecuritydive.com/news/MoveIt-data-breach-medicare-beneficiaries/689362/

Cybersecurity Dive. (2024, April 30). *Change Healthcare attack traced to compromised
credentials, no MFA.*
https://www.cybersecuritydive.com/news/change-healthcare-compromised-credentials-no-mfa/714792/

Dameff, C., Tully, J., Chan, T. C., et al. (2023, May 8). Ransomware attack associated with
disruptions at adjacent emergency departments in the US. *JAMA Network Open.*
https://jamanetwork.com/journals/jamanetworkopen/article-abstract/2804585

Descope. (2026). *Verizon DBIR 2026: Credential abuse is down, but not out.*
https://www.descope.com/blog/post/verizon-dbir-2026

eSecurity Planet. (2026). *IBM 2026 Cost of a Data Breach Report: Key findings.*
https://www.esecurityplanet.com/cybersecurity/ibm-2026-cost-of-a-data-breach-report-key-findings/

HIPAA Journal. (2023a). *Credential stuffing attack exposed United Healthcare member data.*
https://www.hipaajournal.com/credential-stuffing-attack-exposed-united-healthcare-member-data/

HIPAA Journal. (2023b). *Welltok data breach victim count rises to 14.76 million.*
https://www.hipaajournal.com/welltok-data-breach/

HIPAA Journal. (2024). *Ascension cyberattack 2024.*
https://www.hipaajournal.com/ascension-cyberattack-2024/

HIPAA Journal. (2026a). *Healthcare data breach statistics: Updated for 2026.*
https://www.hipaajournal.com/healthcare-data-breach-statistics/

HIPAA Journal. (2026b). *2025 healthcare data breach report.*
https://www.hipaajournal.com/2025-healthcare-data-breach-report/

HL7 International. (n.d.-a). *SMART App Launch Framework: Scopes and launch context.*
https://hl7.org/fhir/smart-app-launch/scopes-and-launch-context.html

HL7 International. (n.d.-b). *FHIR AuditEvent and Provenance resources.*
https://www.hl7.org/fhir/auditevent.html

Healthcare Dive. (2024, October). *UnitedHealth Q3 2024 earnings: Change Healthcare cyberattack
costs.* https://www.healthcaredive.com/news/unitedhealth-q3-2024-earnings-change-cyberattack/729874/

National Institute of Standards and Technology. (2025). *Digital identity guidelines:
Authentication and authenticator management* (SP 800-63B, Rev. 4).
https://pages.nist.gov/800-63-4/sp800-63b.html

OWASP Foundation. (2023). *OWASP API Security Top 10.*
https://owasp.org/www-project-api-security/

OWASP Foundation. (2025a). *OWASP Top Ten Project.* https://owasp.org/www-project-top-ten/

OWASP Foundation. (2025b). *Application Security Verification Standard (ASVS) 5.0.*
https://github.com/OWASP/ASVS

OWASP Foundation. (n.d.-a). *OWASP Dependency-Check project.*
https://owasp.org/www-project-dependency-check/

OWASP Foundation. (n.d.-b). *OWASP Zed Attack Proxy (ZAP) project.* https://www.zaproxy.org/

Paubox. (2026). *Healthcare tops breach costs for 13th consecutive year.*
https://www.paubox.com/blog/healthcare-tops-breach-costs-for-13th-consecutive-year

STAT News. (2023, November 17). *Ransomware attacks tied to increased patient deaths, new study
finds* (reporting on Neprash, McGlave, & Nikpay working paper).
https://www.statnews.com/2023/11/17/hospital-ransomware-attack-patient-deaths-study/

The Register. (2024, March 4). *UnitedHealth paid a $22 million ransom to the ALPHV/BlackCat
group, which then performed an exit scam.* https://www.theregister.com/2024/03/04/alphv_ransom_payment/

U.S. Department of Health and Human Services. (2024a). *45 CFR § 164.308: Administrative
safeguards.* https://www.law.cornell.edu/cfr/text/45/164.308

U.S. Department of Health and Human Services. (2024b). *Healthcare and Public Health
Cybersecurity Performance Goals.* https://hhscyber.hhs.gov/cybersecurity-performance-goals.html

U.S. Department of Health and Human Services. (2024c). *45 CFR § 164.312: Technical safeguards.*
https://www.law.cornell.edu/cfr/text/45/164.312

U.S. Department of Health and Human Services. (2026, April). *OCR fines four regulated entities
for HIPAA violations that led to ransomware attacks.*
https://www.hipaajournal.com/ocr-fines-four-regulated-entities-hipaa-violations-ansomware-attacks/

Verizon. (2025). *2025 Data Breach Investigations Report: Healthcare snapshot.*
https://www.verizon.com/business/resources/infographics/2025-dbir-healthcare-snapshot.pdf

Verizon. (2026). *2026 Data Breach Investigations Report: Healthcare snapshot.*
https://www.verizon.com/business/resources/reports/2026-dbir-healthcare-snapshot.pdf

Wikipedia contributors. (2026). *ManageMyHealth data breach.* Wikipedia.
https://en.wikipedia.org/wiki/ManageMyHealth_data_breach
