# Athletic Director Demo Script

**Audience:** AD, deputy AD, Senior Associate AD (Compliance / Operations / GM oversight)
**Time:** 12 minutes (10 min walk + 2 min Q&A)
**Open:** `https://glove2044.github.io/edge3-model/`
**Use sport-specific path tab depending on AD's primary sport**

---

## 0:00 — Hook (45 sec)

> "Three questions before we start:
> 1. How many recruiting-board meetings per week happen across your football and basketball programs?
> 2. How many of those meetings make a decision that costs $50K+ in NIL or a roster spot?
> 3. How much of your staff's time is spent rebuilding context for those meetings?
>
> Those three numbers are the math we're aiming at. EDGE3 collapses recruiting workflow redundancy into one decision intelligence layer."

---

## 1:00 — The institutional problem (1.5 min)

> "Your programs are running parallel scouting tracks for different time horizons:
> - HS recruits — 18-month evaluation cycle
> - Portal evaluation — 2-week decision window
> - Current roster monitoring — week-to-week during season
>
> Each of those tracks has a different staff workflow today. EDGE3 unifies them into one continuous read on every player on every list.
>
> The result: your GM and your HCs spend less time rebuilding context for meetings, more time on actual decisions."

---

## 2:30 — The three-site framing (1 min)

*Show the path-card section on the main landing.*

> "Three EDGE3 surfaces, all unified brand:
> - **EDGE3 Football** — built for FBS staffs
> - **EDGE3 Basketball** — built for D1 staffs
> - **Athlete Recruiting Wallet** — what your incoming athletes use
>
> Same engine. Same continuous loop. Different screens for different audiences. Your AD office sees the rollup; coaches see the room view; athletes see their own profile."

*(Click into the sport that matches the AD's primary focus.)*

---

## 3:30 — Workflow demo (4 min — same as HC script, faster)

*Persona-workflow tabs.*

> "This is the workflow inside your staff room. Three views: analyst → position coach → head coach. Same data, progressively synthesized. The reason this matters at the AD level: **disagreement between coaches gets surfaced explicitly instead of buried in the meeting.** Each role's confidence is scored. When the analyst's read disagrees with the position coach's read, you see it as a number, not a hallway conversation."

*(Click through quickly — focus on the structural elegance, not the detail.)*

---

## 7:30 — The use case (2 min)

*Open Wisconsin Fickell scorecard OR UNM Olen comparison depending on AD's primary sport.*

> "This is the deliverable. The Wisconsin scorecard is what your HC sees on every roster, refreshed quarterly. The UNM transfer comparison is what your GM gets pre-portal-visit. Both came from the same engine. Both are the kind of artifact that today takes a staff three days to build manually — they took our model thirty minutes."

---

## 9:30 — Risk + governance (1 min)

> "Two things every AD needs me to address:
>
> **1. What we DON'T do.** No facial recognition. No private DM scraping. No autonomous action on athlete behavior. Athletes opt into social listening at intake by self-reporting their public handles. Athletes can withdraw at any time.
>
> **2. Compliance posture.** All survey data is FERPA-compatible (student records). NIL realism questions surface market context for your office, not regulatory exposure. Audit trail planned for the authenticated Coach Suite tier.
>
> The full architecture is in `docs/ARCHITECTURE.md`. The training methodology — including the QC audit that found and resolved a leakage issue before any AUC was reported — is in `docs/TRAINING_METHODOLOGY.md`. Both are on GitHub."

---

## 10:30 — NFL validation (45 sec)

*Scroll to dark "Validated" panel on the sport site.*

> "The 2026 College Athletics Leadership Conference put the question on the table: how does college catch up to NFL roster discipline? Mike Greenberg laid out the framework — disciplined allocation, walk-away discipline, position-specific risk, strategic identity. EDGE3 is built on that exact architecture, adapted for the college time-pressure problem."

---

## 11:15 — Close (45 sec)

> "Three things I'd want to know if I were sitting in your seat:
>
> 1. **What's a 30-day pilot scope look like for one of our two programs?**
> 2. **What does the Coach Suite tier cost when it ships?**
> 3. **Who at our institution would I bring into the next conversation — the GM, the FB HC, the BB HC, or compliance?**
>
> I'd suggest a 30-min discovery to scope a pilot. Want me to set that up?"

---

## Common AD objections + responses

**"What's the price?"**
> "Coach Suite (authenticated per-school) is on the Phase 2 roadmap with a 2-3 week MVP build for first customers. Pricing structure happens during scoping — different programs need different tiers (single-sport vs multi-sport, AD-rollup access, etc.)."

**"How do I justify this to our board?"**
> "Two angles. (a) Time-recovery: hours of staff scouting per week × hourly cost. (b) Decision quality: $50K+ NIL miss × probability the model would have flagged it. We can run those numbers against your specific program in a discovery."

**"What's the data security posture?"**
> "Per-school authenticated microsite tier (Phase 2) includes SSO, audit trail, encryption-in-transit, role-based access control. SOC2 audit on the roadmap. Today's static demo site is read-only — no athlete-identifiable data on the public surface."

**"How does this fit with our Teamworks / Front Rush / Slate stack?"**
> "EDGE3 is the *layer above* — we ingest from those systems, surface the decision, push back the action. Integration is on the Phase 2 roadmap. We won't replace your operational stack; we'll make it actionable."

**"What about coaches who don't want another tool?"**
> "We made it the opposite of another tool. The coach never opens a dashboard with 40 metrics. They get a two-sentence read: what changed, what it means, what to do. The AI complexity is invisible. If a coach has to learn anything technical, we built it wrong."
