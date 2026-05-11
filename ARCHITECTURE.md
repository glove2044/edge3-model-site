# EDGE3 - System Architecture

**For data engineers, AI/ML folks, AWS partners, and any technical reviewer.** This is the data-flow + model + integration map. Pair with [`TRAINING_METHODOLOGY.md`](TRAINING_METHODOLOGY.md) for the model refinement process.

---

## TL;DR

EDGE3 is a continuous-loop intelligence platform for college athletics decision-making. Four input streams feed two model families. The output is a Combined Risk/Fit signal (Red/Yellow/Green) per athlete, refreshed continuously, served to coaches as decision intelligence.

```
INPUT STREAMS                    MODEL LAYER                    OUTPUT
                                                                
PFF snaps (weekly)        ──┐                                   
247 + CFBD recruiting     ──┤                                   
Coaching history          ──┤                                   
Conference / hometown     ──┤                                   
Census economics (ACS)    ──┼──►  Feature Engineering  ──►  Transfer Risk Model
Social listening (cont.)  ──┤     (v7/v8 features)              ↓
HC-personalized survey    ──┤                                   
Parent cross-reference    ──┘     ─────────────────       Performance Trajectory Model
                                                                ↓
                                                          Combined Risk/Fit (R/Y/G)
                                                                ↓
                                                          Coach dashboard
                                                          (decision intelligence)
```

---

## Repository layout

```
edge3-model/
├── models/
│   ├── transfer-risk/                   # Football models
│   │   ├── data/                        # Predictions, configs, feature importances
│   │   │   ├── football_predictions_v8_2024.csv          # Transfer Risk v8 predictions
│   │   │   ├── football_performance_predictions_v1_2024.csv  # Perf v1 (refreshed)
│   │   │   ├── football_performance_predictions_v1_2025.csv  # Perf v1 forward 2025
│   │   │   ├── football_combined_riskfit_2024.csv            # Combined R/Y/G 2024
│   │   │   ├── football_combined_riskfit_2025.csv            # Combined R/Y/G 2025 (NEW)
│   │   │   ├── pff_overall_grades_2024.csv                   # Aggregated overall grades
│   │   │   ├── pff_overall_grades_2025.csv                   # Aggregated overall grades
│   │   │   ├── transfer_risk_model_config_v8.json            # FB Transfer v8 config
│   │   │   ├── football_performance_model_config_v1.json     # FB Perf v1 config (refresh)
│   │   │   └── football_combined_riskfit_config_v1.json      # Combined R/Y/G config
│   │   ├── scripts/                     # Build + training scripts
│   │   │   ├── build_fb_player_scorecard_v1.py
│   │   │   ├── build_fb_positional_baselines.py
│   │   │   ├── train_fb_trajectory_v1_refresh.py             # 2026-04-26 refresh script
│   │   │   └── entity_resolution_v2.py
│   │   ├── docs/                        # Per-model documentation
│   │   └── dashboard/                   # Interactive HTML dashboards
│   │
│   └── basketball-transfer-risk/        # Basketball models
│       ├── data/                        # Predictions + configs
│       │   ├── bball_transfer_predictions_v3_2026.csv
│       │   ├── bball_performance_predictions_v1_2026.csv
│       │   ├── bball_combined_riskfit_2026.csv
│       │   ├── bball_transfer_risk_model_config_v3.json
│       │   ├── bball_performance_model_config_v1.json
│       │   └── bball_combined_riskfit_config_v1.json
│       ├── coaching/                    # 365-program coaching system fingerprints
│       │   ├── coaching_systems_v1.csv  # System type per program
│       │   ├── hc_playing_positions.csv # HC position-as-player history
│       │   └── coaching_trees.csv       # Lineage / mentor relationships
│       └── docs/                        # QC audit, methodology
│
├── surveys/                             # Smart Survey v2.2 (HC-personalized)
│   ├── survey_config.yaml               # 1,200+ line canonical instrument
│   ├── scoring_methodology.md           # Per-question → per-dimension → feature
│   └── README.md
│
├── edge3-pff-integration/               # PFF data layer (159k+ rows, 2014-2025)
│   ├── data/pff/ncaa/                   # 5 category files (passing/rushing/
│   │   ├── pff_passing_2014_2025.csv    #   receiving/blocking/defense)
│   │   ├── pff_rushing_2014_2025.csv
│   │   ├── pff_receiving_2014_2025.csv
│   │   ├── pff_blocking_2014_2025.csv
│   │   └── pff_defense_2014_2025.csv
│   └── scripts/                         # Integration + standardization
│
├── docs/                                # Public-facing site + reference docs
│   ├── BRAND.md                         # EDGE3 brand spec (canonical)
│   ├── ARCHITECTURE.md                  # This doc
│   ├── TRAINING_METHODOLOGY.md          # Refinement methodology
│   ├── INTELLIGENCE_LOOP.md             # The agentic feedback loop
│   ├── SOCIAL_LISTENING.md              # Always-on signal layer
│   ├── NEXT_STEPS_ROADMAP.md            # Phase 2 priorities
│   ├── index.html                       # edge3.net main landing
│   ├── football/                        # FB enterprise site
│   ├── basketball/                      # BB enterprise site
│   ├── demo/loop/                       # Continuous Intelligence Loop simulator
│   ├── demo/fickell/                    # Wisconsin Risk/Fit Scorecard (use case)
│   └── demo/olen/                       # UNM Transfer Comparison (use case)
│
├── data/                                # Shared raw inputs
├── scripts/                             # Cross-cutting utilities
└── README.md                            # Top-level repo map
```

---

## Data sources + integration points

| Source | Sport | Refresh cadence | What it provides | Integration |
|---|---|---|---|---|
| **PFF NCAA** | FB | Annual season-end | Per-player grades (passing/rushing/receiving/blocking/defense), snap counts | Direct CSV; consolidated to `edge3-pff-integration/data/pff/ncaa/pff_*_2014_2025.csv` |
| **CFBD** (College Football Data API) | FB | Annual + portal cycles | Recruiting class, transfer portal entries, conference + coaching history | API pulls staged in `data/cfbd_data/` and `edge3_model_data/` |
| **247Sports** | FB | Annual | Recruit composite scores, stars, national rank | Stored in `2014-2025-HighSchoolData.csv` (38K rows); commercial license confirmed |
| **BartTorvik** | BB | In-season weekly + season-end | Per-player advanced rates (BPM, USG, ORtg, EFG, ORB%, DRB%, AST%, TO%, BLK%, STL%, FT%, 3P%) | `barttorvik_players_2018_2026.csv` (44K rows); free public source |
| **CBBD** (College Basketball Data API) | BB | Annual + portal | Recruiting + portal entries | `cbbd_basketball_*` files |
| **Census ACS** | Both | Annual | County FIPS-level economics (income, population tier) for hometown context | Joined via county FIPS in feature engineering |
| **Survey responses** | Both | Athlete intake + quarterly pulse | 10 behavioral dimensions, scheme experience, NIL realism, social platforms | Future: API or staged YAML; placeholder columns active in models |
| **Social listening** | Both | Continuous (6h sweep) | Sentiment trajectory, follower-graph, engagement patterns, search velocity | Future: scoring service writing to `social_*` feature columns |

---

## Model layer

### Football

#### FB Transfer Risk v8
- **Type:** GradientBoostingClassifier
- **AUC:** 0.718 (out-of-sample, time-aware)
- **Training:** 2021–2024 player-seasons
- **Features (~28):** `prev_overall`, recruiting (stars, composite, natl_rank), room dynamics (room_size, pos_share, room_vs_national, snap rank), opportunity (games_played_pct, snaps), program (win_pct, xfer_rate, coaching_change, coach_tenure, conference_change), demographics (distance_from_home, hometown income/population)
- **Predictions:** `football_predictions_v8_2024.csv` - 7,329 rows, 2026 portal cycle outlook
- **Config:** `models/transfer-risk/data/transfer_risk_model_config_v8.json`

#### FB Performance Trajectory v1 (refreshed 2026-04-26)
- **Type:** Dual GradientBoostingClassifier (improving + declining)
- **Architecture:** Predicts P(grade improves ≥ 5 points next season) + P(grade declines ≥ 5 points next season). Trajectory score = P(improving) − P(declining) ∈ [-1, +1]
- **AUC:**
  - Replicated 2023 holdout: **0.805 / 0.806** (improving / declining)
  - **NEW 2024 forward holdout: 0.770 / 0.781** - true forward-looking validation (2024 was unseen during training)
- **Training:** Now includes 2022, 2023, 2024 (17,356 rows; was 13,721)
- **Predictions:**
  - `football_performance_predictions_v1_2024.csv` - refreshed 7,485 rows
  - `football_performance_predictions_v1_2025.csv` - **NEW** 7,486 rows forward-looking
- **Script:** `models/transfer-risk/scripts/train_fb_trajectory_v1_refresh.py`

#### FB Combined Risk/Fit
- **Logic:** `combined = 0.55 * transfer_risk + 0.45 * (1 − normalized_trajectory)`
- **Signals:** Red ≥ 0.65 OR (risk ≥ 0.75 AND trajectory Declining); Yellow ≥ 0.45 OR risk ≥ 0.55; Green otherwise
- **Output:** `football_combined_riskfit_2024.csv` (7,357 rows) + `football_combined_riskfit_2025.csv` (7,358 rows NEW)

### Basketball

#### BB Transfer Risk v3
- **Type:** GradientBoostingClassifier
- **AUC:** 0.778
- **Features (50):** Recruiting layer, hometown economics (county FIPS), portal history (#1 feature at 17.8% importance), geographic context, season-over-season performance, coaching system fingerprints
- **Predictions:** `bball_transfer_predictions_v3_2026.csv`
- **Config:** `models/basketball-transfer-risk/data/bball_transfer_risk_model_config_v3.json`

#### BB Performance Trajectory v1
- **Type:** Dual GradientBoostingClassifier (improving + declining)
- **Target:** `0.6 * BPM_delta + 0.4 * PRPG_delta`; improving ≥ +0.5, declining ≤ −0.5
- **AUC:** 0.733 / 0.739 (improving / declining)
- **Features (40):** current performance (BPM, PRPG, USG, EFG, etc.), player context (class, position, height, intl, conf tier), coaching system, recruiting profile, performance trend
- **Predictions:** `bball_performance_predictions_v1_2026.csv` - 4,979 rows, predicts 2026-27

#### BB Combined Risk/Fit
- Same logic shape as FB; thresholds tuned tighter (0.55/0.35) because BB rosters are smaller per program
- Output: `bball_combined_riskfit_2026.csv`

---

## Feature engineering pipeline

**v7 / v8 features** are the canonical FB feature set (40,473 player-seasons, 2021–2024 in current build):

```
PFF snap counts (per category)          ──┐
                                          │
CFBD recruiting (247 composite, stars)    ──┤
                                          │
Coaching history (start year, change)    ──┤
                                          │
Conference membership history            ──┤── feature_engineering.py
                                          │   (entity resolution v2 unifies
Census ACS hometown economics            ──┤    PFF ↔ CFBD ↔ 247 IDs)
                                          │
Position-room dynamics (per team-pos-yr) ──┤
                                          │
Snap-share / opportunity metrics         ──┘
                                                ↓
                                          transfer_risk_features_v7.csv
                                          (canonical feature matrix)
```

Entity resolution handles name variations across PFF, CFBD, 247 (~95% match rate). Unmatched players flagged for manual review.

---

## Output layer (what the coach sees)

The coach never sees raw model probabilities. The dashboard surfaces:

1. **Combined R/Y/G** per player - Red/Yellow/Green dot
2. **Trajectory tier** - Rising / Steady / Declining / No Baseline
3. **Top three drivers** - what's pushing the signal
4. **Verbatim quotes** from survey responses (with HC name preserved)
5. **Recommended action** - coach-readable: *what changed, what it means, what to do*

This is delivered through:
- **Static use-case artifacts** (Wisconsin Fickell scorecard, UNM Olen comparison) - examples
- **Interactive Continuous Intelligence Loop demo** (`/demo/loop/`) - simulates live updates
- **Future: authenticated Coach Suite microsites** - per-school dashboards (on roadmap)

---

## Continuous loop architecture

The agentic loop spec is documented in `INTELLIGENCE_LOOP.md`. Briefly:

| Trigger | Frequency | Recompute |
|---|---|---|
| New survey response | Once at intake; quarterly pulses | All survey_* features |
| Parent survey | Annual | external_influence (cross-reference) |
| Weekly PFF snaps | Weekly during season | Performance Trajectory features |
| Social listening anomaly | Continuous | social_* features |

Threshold-driven re-scoring: model output updates only when an input crosses a threshold. R/Y/G shifts within hours of a hard event (e.g., rival coach follows player on social).

---

## Integration considerations (for AWS / partner conversations)

### What runs where today
- **Model training:** local Python (sklearn GradientBoostingClassifier). Reproducible from train scripts in `models/*/scripts/`.
- **Prediction storage:** static CSVs in repo. Suitable for read-only delivery.
- **Demo surface:** GitHub Pages (static HTML + vanilla JS for the loop simulator). No backend.

### What needs infrastructure (Phase 2)
- **Authenticated Coach Suite microsites** (`demo.edge3.net/[program-slug]/`) - needs SSO + per-school config + audit trail
- **Survey ingestion API** - to write athlete responses → feature columns → model re-score
- **Social listening pipeline** - public-account monitoring service; sentiment scoring; threshold detection
- **Model serving layer** - for real-time re-scoring on new inputs (currently batch CSV)
- **Coach dashboard backend** - to surface what-changed / what-it-means / what-to-do continuously

### AWS-aligned reference architecture

```
                        ┌────────────────────┐
  Survey responses ───►│  API Gateway       │
  Social signals   ───►│  + Lambda          │
  Snap data CSV    ───►│  (ingestion)       │
                       └─────────┬──────────┘
                                 │
                                 ▼
                       ┌────────────────────┐
                       │  S3 (raw + curated)│
                       │  - feature lake    │
                       │  - model artifacts │
                       └─────────┬──────────┘
                                 │
                                 ▼
                       ┌────────────────────┐
                       │  SageMaker         │
                       │  - training (cron) │
                       │  - inference       │
                       │    endpoints       │
                       └─────────┬──────────┘
                                 │
                                 ▼
                       ┌────────────────────┐
                       │  RDS / DynamoDB    │
                       │  - per-school view │
                       │  - audit trail     │
                       └─────────┬──────────┘
                                 │
                                 ▼
                       ┌────────────────────┐
                       │  CloudFront +      │
                       │  Cognito-auth UI   │
                       │  (Coach Suite)     │
                       └────────────────────┘
```

---

## Reproducibility

Every model can be rebuilt from data + scripts:

```bash
# FB Performance Trajectory v1 refresh (2026-04-26)
python3 models/transfer-risk/scripts/train_fb_trajectory_v1_refresh.py
```

Outputs:
- Refreshed predictions for 2024 + NEW 2025 forward predictions
- Updated config with AUCs, feature importances, training row counts
- Reproducibility verified: replicating the published 2023 AUC matches within 0.001 (0.8051 vs published 0.8058 / 0.8063 vs published 0.8051)

---

## What we DON'T do (transparency)

- **No facial recognition.** Anywhere.
- **No private DM scraping.** Social listening is public-only.
- **No autonomous action.** Models surface decisions; coaches make them.
- **No imputation of missing baselines.** Players without a prior-year grade are flagged "No Baseline" rather than scored on guesses.
- **No proprietary feature obfuscation.** Every feature is documented in the per-model config JSON and feature_importance CSV.

---

## Companion docs

- [`TRAINING_METHODOLOGY.md`](TRAINING_METHODOLOGY.md) - refinement process, validation standards, AUC reporting
- [`INTELLIGENCE_LOOP.md`](INTELLIGENCE_LOOP.md) - agentic feedback loop architecture
- [`SOCIAL_LISTENING.md`](SOCIAL_LISTENING.md) - always-on signal layer
- [`NEXT_STEPS_ROADMAP.md`](NEXT_STEPS_ROADMAP.md) - what's next
- [`BRAND.md`](BRAND.md) - visual identity for any new artifact built on this stack
- `surveys/scoring_methodology.md` - survey response → feature column math
