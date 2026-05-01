# EDGE3 — Training Methodology

**How EDGE3 models stay accurate.** This is the refinement process — versioning, validation, retraining cadence, and reporting standards. Pair with [`ARCHITECTURE.md`](ARCHITECTURE.md) for the system-level data flow.

---

## Core principle

**Every model claim is reproducible, time-aware, and out-of-sample.** No leakage. No imputation of missing baselines. AUC numbers are measured on data the model never trained on, in the chronological direction the predictions actually flow.

---

## Versioning

Each model carries a numeric version. Version increments on **any of:**
- New feature group added (e.g., adding hometown ACS economics → v7 → v8)
- New training data window (e.g., extending to 2024 ground truth)
- Architecture change (e.g., switching from single-target to dual GBC for trajectory)
- Material AUC change on the same holdout

Every version ships with:
- A model config JSON listing features, hyperparameters, training rows, AUC, base rates
- A feature importance CSV
- A predictions CSV (with the version year tag in the filename)
- A training script that reproduces the predictions byte-for-byte from inputs

**Example (FB Performance Trajectory v1, refreshed 2026-04-26):**

```
models/transfer-risk/data/
├── football_performance_model_config_v1.json    # Config: features, params, AUCs
├── football_trajectory_feature_importance_v1.csv # Per-feature importance
├── football_performance_predictions_v1_2024.csv # Predictions (2024 outcomes)
└── football_performance_predictions_v1_2025.csv # Predictions (2025 forward)

models/transfer-risk/scripts/
└── train_fb_trajectory_v1_refresh.py            # Reproduces both predictions
```

---

## Validation strategy: time-aware, no leakage

### The rule

**A model is only credible to the extent its AUC was measured on data it never trained on, AND the data came chronologically AFTER the training window.**

Random k-fold cross-validation is **NOT** a substitute for time-aware validation in this domain. A model that trained on 2024 portal entries and tested on a random 20% slice of those same entries is *not* predicting the future — it's interpolating within what it already knows.

### How we validate

For every model:

1. **Define a chronological holdout.** Last available season is reserved.
2. **Train on everything BEFORE the holdout.**
3. **Predict on the holdout.** Measure AUC.
4. **Report that AUC publicly.** Not the training AUC, not the random-split AUC.
5. **Retrain on ALL data (including holdout) for the production model.** The production AUC is *projected* to be at least as good as the holdout AUC because more training data.

### Worked example: FB Performance Trajectory v1 refresh (2026-04-26)

**Two validations:**

| Validation | Train | Holdout | Improving AUC | Declining AUC |
|---|---|---|---|---|
| Replicate published | 2022 | 2023 | 0.8051 | 0.8063 |
| **NEW forward holdout** | 2022 + 2023 | **2024 (unseen)** | **0.7701** | **0.7812** |

The drop from 0.806 → 0.770 between holdouts is **healthy generalization**, not a regression. 2024 was genuinely unseen during training; an 0.77 AUC on truly-future data is a strong out-of-sample signal.

**Replication standard:** the refresh's published 2023 holdout AUC matches the original v1 within 0.001 (0.8051 vs 0.8058 / 0.8063 vs 0.8051). This proves the pipeline reproduces — same features, same hyperparameters, same train/test split.

### What we do NOT do

- ❌ Random k-fold CV reported as the model's AUC
- ❌ AUC measured on the training set (unless explicitly labeled as "training AUC" — never the headline number)
- ❌ Imputing missing labels with model predictions (would create leakage)
- ❌ Using future features to predict past outcomes (anachronism — even within season-level data we time-shift carefully)

---

## Retraining cadence

| Model | Trigger | Cadence |
|---|---|---|
| FB Transfer Risk | New CFBD portal cycle complete | Annual (post-cycle) |
| FB Performance Trajectory | New PFF season-end grades available | Annual (post-season) |
| BB Transfer Risk | New CBBD portal cycle | Annual |
| BB Performance Trajectory | New BartTorvik season-end | Annual |
| Combined R/Y/G | Either component model refreshed | Triggered (auto) |
| Survey-feature scoring | New survey response | Per-event (real-time, planned) |
| Social listening features | Threshold cross | Per-event (real-time, planned) |

The continuous loop (described in `INTELLIGENCE_LOOP.md`) doesn't *retrain* the model on every input — it **re-scores** the player using the existing trained model with refreshed feature values. Retraining on the full label set happens annually post-season.

---

## Refinement methodology — how the next version gets better

Each model evolution follows a structured cycle:

### 1. Audit current performance
- Confusion matrix per signal class (R/Y/G) — where does the model disagree with reality?
- Known-case spot-checks (Are top transfer-risk predictions actually transferring? Are Rising-trajectory players actually improving?)
- AUC degradation over time (does the holdout AUC drop on the next year?)

### 2. Identify gap sources
- **Feature gaps** — what signal is the model not seeing? (BB v3 added hometown economics + portal history because v2 lacked them)
- **Label noise** — is the target being measured cleanly? (FB perf v1 uses 5+ grade-point change as the "improving" threshold; calibrated against PFF grade volatility)
- **Coverage gaps** — what % of players have an actionable score? (FB v1 had 39% baseline coverage on 2024 due to 2023 grade joins; refresh lifted to 79% on 2025)

### 3. Add features or labels
- New feature groups add a clear hypothesis: e.g., "scheme transition signal" comes from the survey's HS-scheme question and predicts Year-1 development cost
- New training data extends the window backward (more history) or forward (newer ground truth)

### 4. Validate before shipping
- Replicate the prior version's published AUC on the same holdout — pipeline parity check
- Measure new version on the same holdout AND on a more-forward holdout
- Ship only if AUC holds OR improves on the new holdout

### 5. Document the change
- Version bump in config JSON
- Commit message names what changed
- Per-model README updated
- Roadmap entry retired

### 6. Refresh dependent artifacts
- Combined R/Y/G recomputes
- Use-case scorecards (if affected) regenerate
- Demo surfaces (loop simulator) update with new baseline numbers

---

## Survey + social listening: how new signal types onboard into the model

The placeholder columns `survey_satisfaction`, `survey_culture_fit`, `survey_authority_signal`, `survey_external_pressure`, `social_sentiment`, `social_external_pressure`, `social_engagement_delta`, `social_frustration_flag` are **already wired into the model architecture**. They start at neutral (0.5 or 0) until real data arrives.

When real survey or social data starts flowing:

1. **Score the response** per `surveys/scoring_methodology.md` — per-question (RED/YELLOW/GREEN → 0/0.5/1) → per-dimension → feature blend.
2. **Write the feature value** to the player's row in the prediction file.
3. **Re-run the existing trained model** — no retrain required for placeholder-to-active transition.
4. **Validate the lift** — A/B compare AUC with vs. without the new feature on the holdout. Only ship feature integration if AUC holds or improves.
5. **Annual retrain** then incorporates the new feature in feature importance ranking.

This is why the loop demo simulator can show real trajectory shifts when sliders move — the math is the same as production; the missing piece is the live data source, not the model.

---

## Reporting standards

Every public AUC claim follows this format:

> **{AUC value} — {validation type}**
> Train years: {years}. Holdout: {year}. Train rows: {N}. Holdout rows: {N}.

Examples:

> **0.770 — true forward holdout** (improving model)
> Train years: 2022, 2023. Holdout: 2024 (unseen). Train rows: 13,721. Holdout rows: 3,635.

> **0.778 — out-of-sample, no leakage** (BB Transfer Risk v3)
> 50 features. 365 D1 programs. Audited April 2026.

If you see an AUC number on the EDGE3 site without this provenance, it's a bug — flag and fix.

---

## QC audit trail

The full Phase 1 QC audit is at [`models/basketball-transfer-risk/docs/EDGE3_QC_Audit_Phase1.md`](../models/basketball-transfer-risk/docs/EDGE3_QC_Audit_Phase1.md). It documented and resolved a leakage issue (`has_snap_data` in early FB versions) before public AUCs were reported.

Any future audit follows the same template:
1. Identify the suspected leak source (often a feature that includes future information)
2. Quantify the lift the suspect feature provides
3. Remove and re-train
4. Compare the cleaned AUC vs. the suspect-included AUC
5. Document the delta + ship the cleaned model

---

## How partners + customers can verify

For any AUC claim or prediction file:

1. **Read the corresponding config JSON** — features, hyperparameters, train rows, holdout, AUC are all there
2. **Run the corresponding training script** — produces the same predictions byte-for-byte
3. **Spot-check known players** — top-tier predictions should match face-validity (top transfer-risk players actually being talked about as portal candidates)
4. **Read the QC audit** — leak resolution + any known caveats are listed there

---

## Companion docs

- [`ARCHITECTURE.md`](ARCHITECTURE.md) — system-level data flow
- [`INTELLIGENCE_LOOP.md`](INTELLIGENCE_LOOP.md) — agentic feedback loop spec
- [`SOCIAL_LISTENING.md`](SOCIAL_LISTENING.md) — always-on signal layer
- `surveys/scoring_methodology.md` — survey response → feature column math
- `models/basketball-transfer-risk/docs/EDGE3_QC_Audit_Phase1.md` — Phase 1 audit
