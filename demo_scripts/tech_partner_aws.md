# AWS / Tech Partner Demo Script

**Audience:** AWS Sports / Education team, technology partner solution architects, data engineers, AI/ML reviewers, CTOs of related platforms
**Time:** 12 minutes (10 min walk + 2 min Q&A)
**Open:** `https://glove2044.github.io/edge3-model/`
**Backup tabs:** `https://github.com/glove2044/edge3-model` + `https://glove2044.github.io/edge3-model/demo/loop/`

---

## 0:00 — Hook (45 sec)

> "Three minutes of context, then I'll show the architecture. EDGE3 is decision intelligence for college athletics — built on a continuous-loop data model with two model families and four input streams. Phase 1 is shipped: 12,500+ players scored across FB and BB, AUCs in the 0.72–0.78 range out-of-sample, no leakage, full audit trail.
>
> What I want to walk you through is (1) how the data flows, (2) what's static today vs. what needs infrastructure, and (3) where AWS specifically fits in the Phase 2 build."

---

## 0:45 — The platform overview (1.5 min)

*Show the main landing page.*

> "Three public surfaces, all unified brand. EDGE3 Football for FBS staffs. EDGE3 Basketball for D1 staffs. Athlete Wallet for HS recruits and portal sellers — separately scoped on a different palette.
>
> The technical reviewer's path is `docs/ARCHITECTURE.md` and `docs/TRAINING_METHODOLOGY.md` — both on GitHub, both walk through the data flow and the model refinement process. Let's open those."

*(Open `https://github.com/glove2044/edge3-model` in a tab, then `docs/ARCHITECTURE.md`.)*

---

## 2:15 — Architecture walkthrough (3 min)

*Walk through the ASCII data flow diagram in ARCHITECTURE.md.*

> "Four input streams. PFF snaps weekly. 247 + CFBD recruiting annually. Continuous social listening — once that infrastructure is built. HC-personalized survey at intake + quarterly pulse.
>
> All four feed a unified feature engineering layer. Entity resolution v2 unifies PFF, CFBD, and 247 IDs at ~95% match rate. The features land in the v7/v8 feature matrix — 40,473 player-seasons covering 2021–2024 in current FB build.
>
> Two model families:
> - **Transfer Risk** — single GradientBoostingClassifier per sport
> - **Performance Trajectory** — dual GBC (P[improving] and P[declining]); trajectory score is the difference
>
> Both feed the **Combined Risk/Fit** signal, which is what coaches actually see — Red, Yellow, or Green per athlete."

---

## 5:15 — The continuous loop (1.5 min)

*Switch to the loop demo at `/demo/loop/`.*

> "This is the agentic intelligence loop simulator. Featured player Mabrey Mettauer — real Wisconsin QB, real model values from our latest predictions. Move any of the ten dimension sliders, toggle social listening signals — the model recomputes live and the recommended action narrative regenerates.
>
> The math is documented in `surveys/scoring_methodology.md` — per-question scoring (RED=0, YELLOW=0.5, GREEN=1) → per-dimension averaging → weighted feature blending into the four `survey_*` columns the model already has placeholders for.
>
> The placeholder columns are wired in the model architecture today. When the survey ingestion API ships, the placeholders get real values and the model re-scores per player without retraining. Annual retraining incorporates the new feature in importance ranking."

*(Demo: drag a few sliders, toggle a social signal, show the R/Y/G shift live.)*

---

## 6:45 — What's static vs. what needs infrastructure (2 min)

*Back to ARCHITECTURE.md, scroll to the integration section.*

> "Today:
> - Model training is local Python; reproducible from `models/*/scripts/train_*.py`
> - Predictions live in static CSVs in the repo
> - Demo surfaces are GitHub Pages — pure HTML + vanilla JS for the simulator
>
> What needs infrastructure for Phase 2:
> - **Authenticated Coach Suite microsites** — per-school dashboards behind SSO; audit trail; per-school config (HC name, logo, position-coach map)
> - **Survey ingestion API** — write athlete responses → feature columns → trigger model re-score
> - **Social listening pipeline** — public-account monitoring service; sentiment scoring; threshold detection; event emission
> - **Model serving layer** — currently batch CSV; Phase 2 needs real-time inference endpoints
> - **Audit + compliance layer** — who saw what, when, on which player

The reference architecture in `docs/ARCHITECTURE.md` shows the AWS shape:
- API Gateway + Lambda for ingestion
- S3 for raw + curated feature lake + model artifacts
- SageMaker for training (cron) + inference endpoints
- RDS or DynamoDB for per-school view + audit
- CloudFront + Cognito for the auth-fronted UI"

---

## 8:45 — Training methodology — the AUC integrity story (1.5 min)

*Open `docs/TRAINING_METHODOLOGY.md`.*

> "Three things every technical reviewer asks. Let me address them up front.
>
> **(1) Are the AUCs real?** Every AUC has a config JSON listing train years, holdout, row counts, hyperparameters. The training script reproduces predictions byte-for-byte. The 2024 forward holdout for FB Performance Trajectory v1 was 0.770 / 0.781 — the model never saw 2024 data during training. That's true forward-looking validation, not random k-fold.
>
> **(2) Is there leakage?** The Phase 1 QC audit caught a leaky feature (`has_snap_data`) in early FB versions, removed it, retrained. Audit doc lives at `models/basketball-transfer-risk/docs/EDGE3_QC_Audit_Phase1.md`. Same standards apply on every refresh.
>
> **(3) How does it stay accurate?** Time-aware retrain post-season annually. New feature groups onboarded with explicit hypothesis + holdout AUC validation. Model only ships if AUC holds or improves. Methodology section walks through the cycle."

---

## 10:15 — Where AWS fits — partnership ask (1 min)

> "Three concrete partnership tracks I want to be specific about:
>
> 1. **Reference architecture co-build.** EDGE3 architecture diagram in `ARCHITECTURE.md` is AWS-aligned. We'd want to validate the build against AWS Sports + Education team's reference patterns and use their solution architects on first-customer deployment.
>
> 2. **Marketplace + co-sell.** Coach Suite as a SaaS offering on AWS Marketplace, with EDGE3 + AWS joint go-to-market into athletic departments and conferences.
>
> 3. **Bedrock + SageMaker integration.** Survey response → feature value scoring is a clear SageMaker batch job. Real-time R/Y/G recompute is a SageMaker endpoint. Coach-readable narrative generation (the 'what changed, what it means, what to do' panel) is a Bedrock candidate.
>
> Phase 2 build is a 2-3 week MVP for first customer. AWS partnership accelerates."

---

## 11:15 — Close (45 sec)

> "Three asks:
>
> 1. **Architecture review.** Read `ARCHITECTURE.md` and `TRAINING_METHODOLOGY.md` on GitHub. Tell me where the design is wrong, weak, or where AWS does it better.
> 2. **First-customer scope.** Help us scope the Phase 2 MVP for the first authenticated Coach Suite tenant.
> 3. **Marketplace conversation.** What's the path to AWS Marketplace listing for a SaaS like ours?
>
> Repo is `github.com/glove2044/edge3-model`. Live site is `glove2044.github.io/edge3-model`. I'm sending a tech-deck follow-up after this call."

---

## Common technical objections + responses

**"sklearn GradientBoostingClassifier is dated. Why not XGBoost / LightGBM / a transformer?"**
> "GBC was the right call for Phase 1 — interpretable, fast, no GPU dependency, audit-trail-friendly. Feature importances are first-class. Model accuracy is in the band where deeper architectures buy you single-digit AUC points at the cost of interpretability. Phase 2 we'll A/B against XGBoost and ship if the lift is material AND we can preserve feature attribution for coach explanations. Transformer architecture is right for sequence-modeling problems we don't have today (game-by-game stat sequences could justify it later)."

**"How are you handling concept drift?"**
> "Annual retrain is the primary mechanism. The 0.806 → 0.770 drop on the 2024 forward holdout (FB Perf v1) shows mild generalization decay — typical for college sports where program churn changes the underlying distribution year over year. Training methodology doc covers our cycle: audit → identify gap source → add features or extend window → validate before shipping."

**"What's your imputation strategy for missing labels?"**
> "We don't impute. Players without a prior-year baseline grade are flagged 'No Baseline' and excluded from R/Y/G scoring rather than scored on guesses. Imputation creates leakage — we won't trade integrity for coverage. The Coach Suite presents 'No Baseline' as a known caveat, not a hidden problem."

**"How do you ensure the survey scores aren't just self-report bias?"**
> "Cross-reference architecture. Athlete answers cross-reference parent answers on the same questions; divergence flags into `external_influence`. Survey responses cross-reference social listening behavior; mismatch flags. Production response cross-references actual snap data over the season. Any single source can be gamed; all four cannot be gamed simultaneously."

**"What's the privacy posture?"**
> "FERPA-compatible (student records). Athlete opts into social listening at intake by self-reporting public handles — read-only, no DM access, no facial recognition, no audio. Athletes can withdraw at any time. Audit trail planned for the authenticated Coach Suite tier. SOC2 audit is on the Phase 2 roadmap."

**"What does the data deal look like for PFF / 247 / CFBD?"**
> "PFF and 247 commercial-use rights are confirmed for productized deliverables. CFBD is API-licensed for our use case. BartTorvik is free public data. We won't expose source-licensed data publicly — the prediction CSVs are derived outputs (model probabilities), not redistributable raw data."
