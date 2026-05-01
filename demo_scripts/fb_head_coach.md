# FB Head Coach / GM Demo Script

**Audience:** FBS HC, OC/DC with portal-decision authority, GM, AD with deep football involvement
**Time:** 10 minutes (8 min walk + 2 min Q&A)
**Open:** `https://glove2044.github.io/edge3-model/football/`
**Backup tab:** `https://glove2044.github.io/edge3-model/demo/fickell/`

---

## 0:00 — Hook (30 sec)

> "Coach, before I show you anything — one question. When your staff sits down for the next portal recruiting meeting, what are the first three questions someone in the room asks? Hold those questions in mind for the next 8 minutes."

*(Wait for response. Common answers: 'Who does he remind us of? How does he fit our scheme? What's his risk?' — use those answers in real-time as you walk through the demo.)*

---

## 0:30 — The problem we built for (1 min)

> "Look at where college football is. You're scouting FBS, FCS, HS, AND your own roster — at the same time. NFL teams scout at this depth with months of runway. You have weeks. Your staff time is the bottleneck.
>
> EDGE3 is decision intelligence for that exact problem. Continuous read on every player on every list. Updates between meetings. Designed to give you back staff hours."

---

## 1:30 — Hero metrics (30 sec)

*Hover the (i) icons in the hero metrics. Show:*

- **0.718 Transfer Risk AUC** — the FB v8 model. *"AUC is just our accuracy. 0.5 is random guessing, 1.0 is perfect. 0.72 means our model significantly out-predicts chance on who's going to enter the portal."*
- **0.770 Trajectory forward holdout** — *"Most important number on this page. 2024 was a holdout — the model never saw it during training. We tested it like you would test next year's class. 77% accuracy on truly unseen data. That's not training math. That's projection math."*
- **7,486 forward 2025 predictions** — every FB player at 134 FBS programs

---

## 2:00 — The three-view workflow (4 min — the centerpiece)

*Scroll to "One workflow. Three views." section. Click through each tab.*

**Tab 1 — Analyst view** (90 sec)

> "This is what your staffer building portal boards sees. Wide table, every metric. Real player data — AJ Swann at LSU, Jacob Knuth at Kansas State, DJ Lagway at Florida. The Risk and Trajectory columns are real model output from our latest predictions. Filters at the top. Caden Veltkamp drops off the board — risk is 1.00, trajectory negative. Rest go to the position coach."

**Tab 2 — Position Coach view** (90 sec)

> "Same three players, different lens. Your QB coach doesn't want raw probabilities — wants scheme fit, behavioral signal, what the player said in the survey. The 'Illustrative position-coach narrative' label is honest — the model values are real, but the survey-driven commentary populates from our intake survey when programs onboard. The structure is the deliverable."

**Tab 3 — Head Coach view** (60 sec)

> "Your view. Two finalists. Confidence scored by source — analyst, position coach, social listening. PROCEED on Swann. WATCH on Knuth. The verdict isn't a black box — every input is traceable. You override anything you want."

> **Close this section:** "This is the workflow. Same data, three views. Each role sees exactly what they need."

---

## 6:00 — The use case (Wisconsin Fickell scorecard) (2 min)

*Click the "Generate your own report" → Program Risk/Fit Scorecard.*

> "This is what a finished EDGE3 report looks like in the staff room. Coach Fickell's 39-player Wisconsin 2024 roster, every player graded against the program baseline and his staff-era baseline. Read against the 2025 season outcome — 4-8, 135th in offense.
>
> The OL room was the floor — two Elite graders. The WR room was the leak — 4 of 9 graded below baseline. That gap shows up in 2025's numbers.
>
> This isn't a one-off. The Coach Suite generates a report like this on your roster, refreshed continuously."

*(Scroll the scorecard, click on a player to show the per-player layers.)*

---

## 8:00 — NFL front-office validation (1 min)

*Scroll back to FB site, scroll to the dark "Validated · 2026 College Athletics Leadership Conference" panel.*

> "Mike Greenberg — Tampa Bay Bucs GM — ran a panel at the 2026 College Athletics Leadership conference. His exact words: 'The hardest thing to do is walk away from deals.' That's the discipline NFL front offices have. EDGE3 brings that structured frame to college recruiting.
>
> The college GMs on the same panel: 'I have Excel open, scouting database open, analytics database open.' That's the workflow we're collapsing."

---

## 9:00 — Close + ask (1 min)

> "Three questions for you, Coach:
>
> 1. **Of the questions you held in mind at the start — Who does he remind us of? Scheme fit? Risk? — which one costs your staff the most time today?**
> 2. **If you saw a rival coach starting to follow your starting QB on Instagram, would you want to know in hours, days, or weeks?**
> 3. **What's a useful next step? An audit of your 2024 roster, a portal evaluation against your spring board, or both?**

---

## Common objections + responses

**"How do I know your AUC numbers are real?"**
> "Read `docs/TRAINING_METHODOLOGY.md` in the GitHub repo. Every AUC has a config JSON listing train years, holdout, row counts. The training scripts reproduce predictions byte-for-byte. We document the QC audit. Nothing about the AUCs is opaque."

**"What about NIL? Aren't you missing the money piece?"**
> "Our NIL-realism survey questions capture current NIL revenue, expectation, and external-pressure context. The Coach Suite roadmap includes valuation transparency. Today we model the behavior — money is one driver among many."

**"What if my staff disagrees with the model?"**
> "Three-persona view is built for that. Each role's confidence shows up explicitly. Disagreements get surfaced, not buried. You override anything. We're decision support, not decision replacement."

**"What's the price?"**
> "Coach Suite (per-school authenticated tier) is on the Phase 2 roadmap. Today we've shipped the engine + use-case proof. Pricing conversation happens when we scope your specific program — let's set up a 30-min discovery on that."
