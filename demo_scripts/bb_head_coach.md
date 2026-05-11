# BB Head Coach / GM Demo Script

**Audience:** D1 HC, assistants with portal authority, GM, AD with deep BB involvement
**Time:** 10 minutes (8 min walk + 2 min Q&A)
**Open:** `https://glove2044.github.io/edge3-model/basketball/`
**Backup tab:** `https://glove2044.github.io/edge3-model/demo/olen/`

---

## 0:00 — Hook (30 sec)

> "Coach, before I show you anything — when your staff sat down for last spring's portal-list meeting, what were the first three questions someone asked? Hold those in mind."

*(Common: 'Who's our top need? Can he play? Is he a flight risk?' — call back to those answers.)*

---

## 0:30 — The problem (1 min)

> "College basketball is annual free agency. There's no locker-room hierarchy anymore. Your staff's expected to scout at NBA depth, across multiple pipelines — current roster, portal, HS, JUCO — with weeks instead of months. Your time is the bottleneck.
>
> EDGE3 reads every player on every list continuously and gives you the read every staff meeting opens with. The questions don't change. The time we give you back is what changes."

---

## 1:30 — Hero metrics (45 sec)

*Hover the (i) icons.*

- **0.778 BB Transfer Risk v3 AUC** — *"50 features. 365 D1 programs. Out-of-sample. The number coaches care about: who's likely to leave."*
- **0.739 Trajectory declining AUC** — *"Predicting whether a player's production rises or falls next season. 0.74 is strong out-of-sample."*
- **4,979 D1 players scored** — every D1 player for 2026-27 cycle
- **365 programs covered** — full D1 footprint

---

## 2:15 — The three-view workflow (4 min — centerpiece)

*Scroll to "One workflow. Three views." Click through each tab.*

**Tab 1 — Analyst view** (90 sec)

> "Your portal-board builder's view. Real point guards - Gavin Paull at Tennessee, Quan Lax at Austin Peay, Sencire Harris at Cincinnati. Risk and trajectory columns are real model output from our 2026-27 predictions.
>
> Watch the bottom row — Trevon Payton, risk 0.67 + frustration markers. Filtered off the board. The other three move to the guards coach."

**Tab 2 — Guards Coach view** (90 sec)

> "Same three players, scheme + behavioral lens. Gavin Paull — Combo G at Tennessee, three years of eligibility, lowest combined risk on the board. Strong-fit pick. Quan Lax — same Rising trajectory but only one year of eligibility — that's a 1-year impact pick, different roster role.
>
> Sencire Harris is the interesting one. Rising trajectory but high transfer risk. The model says: talent is real, environment is unstable. Survey + social listening would tell us what's driving it."

**Tab 3 — Head Coach view** (60 sec)

> "Your seat. Paull is Rank 1 — best floor, best development window. Lax is Rank 2 — IF your roster needs a Senior impact piece. Confidence scored by source. PROCEED. WATCH. PASS. You override anything."

---

## 6:15 — The use case (UNM Olen comparison) (2 min)

*Click "Generate your own report" → Transfer Comparison Report.*

> "This is what a finished EDGE3 report looks like for portal evaluation. Three real candidates graded against Coach Olen's stated thresholds — the rebound rates, the steal rate, the height profile he wants. Plus 2026-27 roster churn so the slot-fit is concrete: who's leaving, who's returning, who's incoming, where the open slots are.
>
> Petraitis grades C+ conditional on medical. Butka B+. Anya A-. Same engine, your data, your thresholds."

*(Scroll through the report, click a candidate's per-layer breakdown.)*

---

## 8:15 — NFL validation (45 sec)

*Scroll back to BB site, scroll to dark "Validated" panel.*

> "Mike Greenberg — Tampa Bay GM — at the 2026 College Athletics Leadership conference: 'It's very position-specific. We definitely do the risk assessment.' That's the NFL discipline. EDGE3 brings the same per-position behavioral architecture to D1 basketball.
>
> Greenberg also said: 'The hardest thing to do is walk away from deals.' That's the structured frame the R/Y/G signal gives your staff."

---

## 9:00 — Close (1 min)

> "Three questions, Coach:
>
> 1. **Of the questions you held at the start, which one costs your staff the most time today?**
> 2. **If you knew Day 1 of the portal opening that a rival was already DM'ing your starting point guard, would that change a conversation you'd have with that player this week?**
> 3. **Useful next step — audit your current roster, evaluate against your spring portal board, or both?**"

---

## Common objections + responses

**"How do I trust the AUC?"**
> "Read `docs/TRAINING_METHODOLOGY.md` on GitHub. Every AUC has a config showing train years, holdout, row counts. Reproducible from the training script. The Phase 1 QC audit caught and fixed a leak in early FB versions before any number got reported. Same standards apply to BB."

**"My staff already uses Synergy / Verbal Commits / KenPom. Why this?"**
> "We're not replacing those. Synergy gives you film, Verbal gives you portal news, KenPom gives you team metrics. EDGE3 is the layer between those and the action — what changed, what it means, what to do, on a continuous loop. The fragmented stack collapses; you keep the inputs."

**"What about coaching turnover risk on my roster?"**
> "Already in the model. `coaching_change` is a feature in BB v3, weighted into transfer risk. We have coaching system fingerprints across 365 programs — when a coach changes, the model recomputes the player's environment-fit signal."

**"What if I want to bring in athletes from outside our usual recruiting region?"**
> "The `out_of_region` feature is already there. Hometown economics + distance from home weight into transfer risk. Players outside your usual catchment carry slightly higher distance-tolerance risk; we surface that explicitly so you can plan support."
