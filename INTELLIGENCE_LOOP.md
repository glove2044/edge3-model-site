# EDGE3 — Continuous Intelligence Loop

**The agentic feedback loop that makes EDGE3 different from every other transfer-portal tool.**

---

## The one-paragraph version

Every other transfer-portal product tells coaches what's already happened — who entered the portal yesterday. EDGE3 runs a **continuous loop** of four input streams (survey, parent survey, weekly snaps, social listening) that update every player's risk and trajectory scores **as the season unfolds, week by week**. The result: coaches see drift before it becomes a problem, while there's still time to intervene.

---

## The four input streams

| Stream | Cadence | What it captures | What it feeds |
|---|---|---|---|
| **Athlete survey** (HC-personalized) | Once at intake + quarterly pulse | Behavioral dimensions, NIL realism, scheme experience, injury history, social listening hooks | `survey_satisfaction`, `survey_culture_fit`, `survey_authority_signal`, `survey_external_pressure`, `scheme_transition_signal` |
| **Parent survey** | Once at intake + annual | Cross-reference points (athlete↔parent divergence) on key questions | `external_influence` (validated/contested) |
| **PFF weekly snaps** | Every Tuesday during season | Snap counts, pos rank, room dynamics, grade changes | All Performance Trajectory features |
| **Social listening** | Continuous (every 6h sweep) | Public sentiment trajectory, influence chain, brand-deal velocity, frustration markers | `social_sentiment`, `social_external_pressure`, `social_engagement_delta`, `social_frustration_flag` |

Each stream is independent. The loop doesn't break if one slows down.

---

## How the loop works

```
                    ┌──────────────────────────┐
                    │   Coach dashboard view   │  ← What the staff sees
                    │   (R/Y/G per player)     │
                    └────────────▲─────────────┘
                                 │
                                 │ updated every time any input
                                 │ crosses a threshold
                                 │
                    ┌────────────┴─────────────┐
                    │  EDGE3 Models (re-score) │
                    │  • Transfer Risk v8/v3   │
                    │  • Performance Traj v1   │
                    │  • Combined Risk/Fit     │
                    └────────────▲─────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
   ┌────┴────┐              ┌────┴────┐              ┌────┴─────┐
   │ Survey  │              │  PFF    │              │  Social  │
   │ inputs  │              │ snaps   │              │ listening│
   │(monthly)│              │(weekly) │              │ (always) │
   └─────────┘              └─────────┘              └──────────┘
        ▲                        ▲                        ▲
        │                        │                        │
   Athlete fills out        Auto-pulled              Auto-monitored
   personalized survey      from PFF feed            from self-reported
   (HC-framed)                                       handles
```

The model **re-scores the player every time any signal crosses a threshold**. R/Y/G shifts can happen daily, not just at intake.

---

## What the coach actually sees

The dashboard surfaces three things:

### 1. The current signal
- Player name → R/Y/G dot
- Trajectory tier (Rising / Steady / Declining / No Baseline)
- Top three drivers behind the current signal

### 2. The story behind the signal
- Verbatim quotes from the survey (with HC name preserved — "When Coach Olen asked you about playing time, you said...")
- The drift event that pushed it (e.g., "Sentiment dropped 28% over last 14 days; 3 frustration markers logged")
- Cross-references (e.g., parent says distance worry; athlete said comfortable — divergence flag)

### 3. The recommended action
- Specific, time-bounded ("Schedule a check-in this week")
- Tied to the most recent input ("Reference the role conversation from the player's October survey")
- Framed for the staff member who owns the relationship (HC vs position coach vs. director of player development)

This is what makes the loop **agentic** — it's not just a static score, it's a recommendation an assistant could action without escalating to the HC.

---

## Why the personalization matters

Focus groups with student-athletes and parents confirmed: athletes reveal more when they believe the head coach is asking. The platform isn't asking generic survey questions — every question is wrapped:

> "Coach Olen would like to know — when you think about your athletic career, what's the biggest financial goal you're working toward?"

This unlocks a layer of honesty that a third-party survey can't reach. The data quality from a personalized survey is materially higher than from an anonymous one. **That's also where the QwikU partnership amplifies the loop** — synthetic media avatars of the head coach can deliver a 5-8 second video intro per section, which lifts engagement and completion rates.

---

## Why the loop is defensible

Three properties make this hard to copy:

### 1. The cross-reference architecture
Athlete answers vs. parent answers vs. social posts vs. snap-data reality. Any one source can be gamed (or manipulated by an outside influence). All four cannot be gamed at the same time. EDGE3 is the only platform that joins them.

### 2. The threshold-driven re-scoring
Most products refresh on a schedule (daily, weekly, monthly batch). EDGE3 re-scores on **anomaly detection** — the moment a signal crosses a threshold. Coaches see the drift faster.

### 3. The personalization stack
HC-framed surveys + (eventually) synthetic-avatar delivery = behavioral data the athlete wouldn't disclose to a generic platform. This is data competitors can't pull from public sources, and it's the input that most heavily weights the survey-driven model features.

---

## What's live today vs. what's next

### Today (shipped)
- Survey instrument v2.1 with personalization templating, scheme questions for every position, NIL realism, injury adversity, S&C / weight context, social listening hooks (`surveys/survey_config.yaml`)
- Scoring math: per-question → per-dimension → model feature columns (`scoring_logic` block in YAML)
- Models with placeholder columns wired for survey + social listening data (`bball_performance_model_config_v1.json`, etc.)
- Combined Risk/Fit Red/Yellow/Green signal (`football_combined_riskfit_2025.csv`, `bball_combined_riskfit_2026.csv`)

### Next (in flight)
- Interactive Continuous Intelligence Loop demo (`docs/demo/loop/` — pick a player, sim a survey, watch the trajectory shift live)
- FB Performance Trajectory v2 (adds hometown ACS economics + portal history features at parity with BB v3)
- Native 2025 v7 features pipeline (next session — already-sourced PFF data, just needs the build)

### Coming soon
- QwikU synthetic-avatar integration (HC video intros per survey section)
- Annual parent re-survey cadence trigger
- Coach-facing weekly digest email ("Three players whose signal moved this week")

---

**Companion docs:**
- `docs/SOCIAL_LISTENING.md` — deep dive on the always-on layer
- `surveys/scoring_methodology.md` — the math from response → model feature
- `surveys/survey_config.yaml` — the full survey instrument
- `docs/NEXT_STEPS_ROADMAP.md` — Phase 2 priorities including this work
