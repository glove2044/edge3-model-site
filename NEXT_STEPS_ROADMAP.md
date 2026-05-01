# EDGE3 — Next Steps Roadmap

**Last updated:** 2026-04-26
**Owner:** Kenyon Rasheed
**Status:** Phase 1 complete (FB v8 transfer + BB v3 transfer + perf trajectories + Combined R/Y/G + Wisconsin and UNM use-case artifacts shipped). Phase 2 priorities below.

---

## Where things stand today

### Models — current state

| Model | Version | AUC | Predicts | Status |
|---|---|---|---|---|
| FB Transfer Risk | v8 | 0.718 | 2026 portal cycle | Current |
| BB Transfer Risk | v3 | 0.778 | 2026 portal cycle | Current |
| FB Performance Trajectory | v1 (refreshed 2026-04-26) | 0.805 / 0.806 (2023 holdout) · **0.770 / 0.781 (NEW 2024 holdout)** | 2024 (refreshed) + **2025 (NEW forward-looking)** | Current |
| BB Performance Trajectory | v1 | 0.733 / 0.739 | 2026-27 (forward-looking from 2025-26 features) | Current |
| FB Combined Risk/Fit | v1 (refreshed 2026-04-26) | — | 2024 + **2025 (NEW)** | Current |
| BB Combined Risk/Fit | v1 | — | 2026-27 | Current |

### Use-case artifacts — current state

| Artifact | URL | Coverage | Status |
|---|---|---|---|
| Wisconsin FB Program Scorecard | `/demo/fickell/` | 39 players, 2024 roster vs program + staff-era baselines | Shipped 2026-04-22 |
| UNM BB Transfer Fit Review (Coach Olen) | `/demo/olen/` | 3 portal candidates vs stated thresholds, SR-verified rates, slot-fit | Shipped 2026-04-22 |
| Interactive 12K-player table | `/demo/` | All FBS FB + D1 BB players scored for 2025-26 | Static — needs R/Y/G overlay refresh |

---

## Phase 2 priorities — clean path forward

### 1. FB Performance Trajectory — close the data loop (highest priority)

**Status:** v1 just refreshed with extended trajectory file (2014→2025) and 2025 forward-looking predictions. Now shipping 7,486 player predictions for 2025 outcomes.

**Caveat in current 2025 predictions:** uses 2024 v7 features as proxy context (snap counts, room dynamics). The model's `prev_overall` is correctly set to 2024 grade, but the "current-season usage" features describe 2024, not 2025. This is directionally useful but not maximally accurate.

**Next step — build 2025 v7 features pipeline:**
- 2025 PFF snap counts (derive from the 5 split files: passing/rushing/receiving/blocking/defense — all now full season after the 2026-04-26 PFF re-pull)
- 2025 room dynamics (team-level position depth, snap shares)
- 2025 coaching change flags (have via `coaching_history_2011_2025.csv`)
- 2025 conference change flags (have via `conference_membership_2011_2025.csv`)
- Recruiting features (static — use existing CFBD)
- Hometown demographics (static)

**Output:** `transfer_risk_features_v7_2025.csv` (~7,500 rows expected). Then re-score FB Perf v1 with native 2025 features → produce true forward-looking 2025-season-OR-2026-portal-cycle predictions.

**Estimated effort:** 1 working session (3-5 hours).

---

### 2. FB Performance Trajectory v2 — feature parity with BB v3

The current FB Perf v1 has 21+9 = 30 features. The BB Transfer v3 model has 50 features and lifted AUC from 0.714 → 0.778. Bringing FB Perf to parity could lift its AUC similarly.

**New feature groups to add (sourced from BB v3 playbook):**
- Hometown ACS economics (county FIPS join — already shipped in FB v8 transfer risk, easy reuse)
- Portal history (whether the player has prior portal touches, # of moves)
- Geographic context (distance from home variants, region encoding)
- Season-over-season performance trends (multi-year delta features beyond just `prev_overall`)

**Estimated effort:** 1 session. Validate AUC against v1's 0.806 baseline; ship only if v2 holds or improves.

---

### 3. BB Performance Trajectory — feature additions

BB Perf v1 already has 40 features and includes most of what v3 transfer risk uses. But two adjacent improvements are open:

**a) CBBD `/recruiting/teams` integration** — program-level recruiting class quality. We have player-level recruiting from `cbbd_basketball_recruiting_2018_2026.csv` but not the team-level rollup. Adding `team_recruiting_class_rank` and `team_recruiting_class_quality_pct` as features may improve trajectory predictions (especially for second-year breakouts).

**b) Survey schema definition** — both perf models have placeholder columns (`survey_satisfaction`, `survey_culture_fit`, `social_sentiment`, `social_engagement_delta`). Defining the actual survey instrument is foundational work that unlocks Phase 3 model versions.

**Estimated effort:** 0.5 session for (a), 1 session for (b) including delivery cadence + scoring methodology.

---

### 4. FB Transfer Risk v9 — incorporate 2025 portal cycle

FB Transfer Risk v8 was trained through the 2024 portal cycle. The 2025 cycle is now complete (CFBD `transfer_portal_2025.csv` has 4,500 entries — already in `/Downloads/cfbd_data/2025/`). Re-training with 2025 labels gives:

- **Larger training set** (one more cycle of ground truth)
- **Updated coefficient signals** (NIL era patterns becoming more visible)
- **Forward predictions for 2026-27 cycle** rather than 2025-26

**Estimated effort:** 0.5 session — same pipeline as v8, just extending the label window.

---

### 5. Demo Site Upgrade

The current `/demo/index.html` (1.8MB static file) shows the v3 BB transfer risk + perf overlay but doesn't yet include the refreshed 2025 FB predictions. Two-track upgrade:

**a) Refresh the interactive table** with the new FB 2025 predictions (`football_combined_riskfit_2025.csv` — 7,358 rows). Rebuild the JSON payload, update the column legend to show the new 2024-holdout-validated AUC.

**b) Reframe the landing page around use cases:**
- Lead with Wisconsin Risk/Fit + UNM Transfer Comparison as named case studies
- Position both as concrete examples of what coaches/ADs see, not just demos
- Add a "How EDGE3 shows up in the room" framing
- Keep the interactive 12K-player table as a "go deeper" link, not the lead

**Estimated effort:** 0.5 session for (a), 0.5 session for (b).

---

### 6. Authenticated demo microsites (next architecture step)

The current GitHub Pages site (`edge3.net` redirect target + `glove2044.github.io/edge3-model`) is **public-facing**. It surfaces just enough to communicate what EDGE3 is and the named use cases. **Authenticated demos** for prospective school customers, coaches, athletes, and parents are the next architecture step.

**Public layer (today, what visitors see):**
- Main `/` — sport selector + Wallets path
- `/football/` — FBS coach landing
- `/basketball/` — D1 coach landing
- Use-case artifacts at `/demo/fickell/`, `/demo/olen/`, `/demo/loop/` (currently public for prospective customer demos)

**Authenticated layer (next):**
- `demo.edge3.net/[program-slug]/` — per-school authenticated microsite with the program's actual roster + actual signal flow
- Coach login (program-issued) for the dashboard view
- Athlete login (player-issued) for the Wallet view
- Parent login for cross-reference and progress visibility
- AD login for the program-wide rollup

**Build path:**
- Auth via SSO (school-issued credentials) or magic-link email
- Backend API to proxy the static signal artifacts behind the auth boundary
- Per-school config (HC name, logo, position-coach map) so the personalized survey delivery is automatic
- Audit trail (which staff viewed which player's signal, when)

This is real backend work — not a static site lift. Surface in pricing as the EDGE3 Coach Suite tier.

**Estimated effort:** 2-3 weeks of focused build for the MVP authenticated microsite, assuming SSO infrastructure decisions are made up front.

---

### 7. Tech-audience navigability + commercial readiness (NEW 2026-04-26)

Identified during pre-demo audit. These close the gaps between "live-ready demo" and "scaled commercial deploy."

**Already shipped (this session):**
- ✅ `docs/ARCHITECTURE.md` — system data flow, model layer, integration points, AWS reference architecture
- ✅ `docs/TRAINING_METHODOLOGY.md` — versioning, time-aware validation, retraining cadence, AUC reporting standards
- ✅ `docs/BRAND.md` — visual identity for any new artifact built on the stack
- ✅ `docs/demo_scripts/` — five persona-specific demo scripts (FB HC, BB HC, AD, athlete+parent, AWS/tech partner)
- ✅ Pre-demo hallucination cleanup — synthetic player names in persona-workflow demos replaced with real model output; illustrative-example banners added

**Still needed for commercial readiness:**
- **API spec for institutional buyers** — survey ingestion endpoint, predictions read endpoint, audit log endpoint
- **Security + compliance posture** — SOC2 audit (Phase 2 dependency), data processing agreement template, FERPA stance documented for athletic department review
- **Privacy policy + ToS** — athlete/parent-facing language for the Wallet product
- **NIL compliance review** — confirm survey questions on NIL realism don't create regulatory exposure for school customers; legal review of data handling
- **Integration with athletic department systems** — Teamworks, Front Rush, Slate (recruiting CRM), Synergy (BB film) — at minimum a documented integration path
- **Data deal documentation** — public summary of commercial-use rights for PFF, 247, CFBD per the LICENSED_DATA_ASK doc
- **BB-specific Continuous Intelligence Loop demo** — currently FB-flavored (Mettauer/Wisconsin). Mirror version with a real D1 BB player for BB sales conversations
- **Athlete-facing Wallet brand spec** — separate palette per Kenyon's instruction, but currently undefined. Build before any athlete-side surface ships

**Estimated effort:** 1-2 sessions per item; most are documentation work, the auth-tier MVP is the heavy lift (covered in Section 6).

---

### 8. New use-case artifacts to build (request-driven)

Both shipped use cases follow the same pattern: take a real coach + their team + their stated needs, run them through EDGE3, output a coach-room-ready artifact. Pipeline candidates:

- **CSUN BB — Killin/Newman Transfer Fit Review** (live conversation already in flight per memory `project_jael_martin_csun.md`)
- **A 2nd Big-Ten FB scorecard** (Wisconsin + Maryland would let us show two regimes side-by-side)
- **A G5 case study** (e.g., a MWC or AAC program — different tier of recruiting/retention dynamics)

**Estimated effort:** 0.5-1 session per artifact, depending on data freshness needs.

---

## Sequencing recommendation

**This week (high leverage, no new data dependencies):**
1. Demo site upgrade (5a + 5b above)
2. FB Transfer Risk v9 retrain with 2025 portal labels
3. CSUN BB scorecard (if Killin/Newman conversation advances)

**Next week (data engineering):**
4. Build 2025 v7 features → native FB Perf 2025 predictions (#1)
5. Refresh FB Combined R/Y/G with native 2025 features

**After that (modeling depth):**
6. FB Perf v2 with new feature groups (#2)
7. BB Perf updates (#3a)
8. Survey schema definition (#3b)

---

## Caveats + assumptions

- All AUCs reported are out-of-sample, time-aware (no leakage).
- Players without a prior-year grade are flagged `No Baseline` rather than imputed.
- The 2024 PFF defense data was incomplete in the consolidated repo files until 2026-04-26 (only 173 of ~5,300 player-seasons). Full season has been spliced in. 2025 same — full coverage now in place.
- 2024 PFF blocking was full season already. 2025 blocking was 229 rows (all-star showcase) until 2026-04-26 — now full at 5,990.
- Forward-looking 2025 FB predictions use 2024 v7 features as proxy context until 2025 v7 features are built (priority #1 above).
