# EDGE3 — Social Listening Layer

**Continuous, decision-grade signal from public social activity. Built for coaches, not data analysts.**

---

## What it is

Social listening is the **continuous monitoring of an athlete's public social activity** for signals that predict transfer risk and performance trajectory. It's not surveillance and it's not scraping private content. EDGE3 monitors only what the athlete chose to make public, on accounts they self-reported during the intake survey.

It runs **continuously in the background** — not a one-time pull. Signals update the athlete's risk and trajectory scores between survey cycles, between snap-data refreshes, and between coach check-ins.

---

## What it captures

EDGE3 social listening watches four signal types. Each is named in plain language. The model handles the math; coaches see the read.

### 1. Follower-graph drift

Who is following the athlete, and who the athlete is following back.

- **A coach at another school starts following one of your players.** That's a recruiting probe — the model flags it the moment it's detected.
- **Your player follows a rival program's official account.** Soft signal of curiosity; flagged but not alerted.
- **Your player unfollows your program or the head coach.** Hard signal of distance. Immediate alert.
- **A teammate unfollows the player.** Locker-room friction signal — flagged for staff awareness.

This is the most predictive signal in the layer. Recruiting interest from rival staff shows up here weeks before any public commitment language.

### 2. Engagement pattern

What the athlete is engaging with publicly — likes, replies, shares.

- **The player starts liking posts from someone who consistently criticizes your program** (media, fan account, rival staff). The model tracks the cumulative pattern, not the single like.
- **The player replies positively to a transfer-portal account or a "best landing spots" post.** Flagged.
- **The player engages with NIL collective accounts from a different school.** Flagged.

The pattern matters more than any single event. The model only alerts when a 14-day pattern crosses threshold.

### 3. Search-trend velocity

Public search interest in the player's name.

- **A spike in Google searches for the player's name** — typically a leading indicator that other programs are doing their homework. Other coaching staffs search players before they reach out.
- **Cross-correlated with: media articles published about the player, rival-staff follower events, and known recruiting cycles** to filter noise from real signal.

This signal is *about* the player, not from the player's own activity. It tells coaches when the recruiting market around their player is heating up — usually before the player knows.

### 4. Frustration markers

The cryptic post layer. Plain-language patterns that indicate disengagement.

- Cryptic posts about playing time, role, or staff decisions
- Direct or implied transfer-portal language
- "Subtweet" patterns toward teammates or staff
- Tone shift from team-positive to team-neutral or team-negative over a 14-day window

The model only flags this when 3+ markers land within 30 days — single posts don't trigger alerts.

---

## What it does NOT capture

To answer the obvious AD/coach questions before they're asked:

- **No DMs or private messages.** Public posts only.
- **No posting on the athlete's behalf.** Read-only.
- **No facial recognition, no audio analysis, no image classification.** Text and metadata only.
- **No browsing history.** Only what the athlete posts and engages with publicly.
- **No data shared outside the athlete's coaching staff.** Outputs flow into the EDGE3 dashboard.
- **No NIL brand-deal velocity tracking.** Brand activity is athlete-controlled and doesn't predict transfer behavior. We don't measure it.

---

## How it shows up for the coach

The coach never logs into a social platform. They see plain-English insights in the EDGE3 dashboard:

> **What changed (last 7 days):** A coach at TCU started following Brandon. Brandon liked three posts from a fan account that's been calling out your offensive scheme. Cryptic post on Sunday about "playing time."
>
> **What it means:** Recruiting interest from outside is heating up while Brandon is showing public frustration with the offense. Combined risk score moved from 0.42 to 0.61 — Yellow.
>
> **What to do:** 15-minute check-in with Brandon this week. Anchor on the route-tree conversation from the October survey response — Brandon told you the system fit was the reason for choosing the program. Reaffirm the development plan.

That's the output. No AI metrics. No threshold scores. No technical jargon. Just **what changed → what it means → what to do**.

---

## How it feeds the models

Each signal maps to a feature column already wired into the model architecture. Coaches don't see this — it's the math under the hood.

| Signal type | Model feature | Models affected |
|---|---|---|
| Rival coach follows player | `social_external_pressure` (heavy weight) | Transfer Risk |
| Player unfollows program / HC | `social_sentiment` + `social_external_pressure` | Transfer Risk + Performance Trajectory |
| Player engaging with critic accounts | `social_sentiment` (negative) | Performance Trajectory |
| Search-trend spike on player name | `social_external_pressure` | Transfer Risk |
| Frustration markers (3+/30d) | `social_frustration_flag` | Transfer Risk (immediate Yellow trigger) |
| New agent / NIL collective in influence chain | `social_external_pressure` | Transfer Risk |

The model **re-scores the athlete every time a signal threshold is crossed**. R/Y/G can shift in either direction — a player who started Yellow can drop to Green if the pattern improves week over week.

---

## Cadence

| Layer | Frequency | What it does |
|---|---|---|
| Public post + follower sweep | Every 6 hours | Pull new posts, engagement events, follower-graph deltas from self-reported accounts |
| Search-trend pull | Daily | Cross-program search interest velocity |
| Pattern scoring | Daily | Compute the four signal types vs. rolling baseline |
| Threshold check | Daily | Trigger model re-score if any signal crosses threshold |
| Coach dashboard refresh | Continuous | Updated R/Y/G + flagged events surface in real time |
| Coach push notification | On detection | Coach notified within hours of a hard signal (rival coach follow, unfollow event, agent contact) |

---

## Why it matters

The other input streams in the EDGE3 Continuous Intelligence Loop — survey, parent survey, weekly snaps — are **scheduled inputs**. Social listening is the only **always-on input**. It's what catches drift between survey cycles, before a coach even knows there's a problem.

It's also the layer that **personalizes** the loop most heavily. Two players with identical trajectory grades and identical roster context can diverge sharply on social signal — one is venting privately and processing healthily, the other is publicly aligning with rival programs. The model and the coach see that difference.

---

## What we promise the coach

> EDGE3 doesn't show coaches more data. It shows coaches **what changed, what it means, and what to do** — and only when there's something worth knowing.

Social listening is the layer that makes that possible without the staff opening a single social media app.

---

## What it requires from the athlete

One survey question at intake:

> "Where do you post about your sport most — Instagram, X, TikTok, somewhere else? How often during a typical week?"

That self-reporting gives the platform a known set of accounts to monitor. It also gives the athlete agency — they're telling the staff where they're publicly active, which is consistent with the relationship-first framing that powers the rest of the survey.

---

## Compliance + privacy posture

- All monitored accounts are athlete-self-reported and public
- Output is shared only with the athlete's current coaching staff
- The athlete can request to remove an account from monitoring at any time
- Stored signals are aggregated; raw post text is not retained beyond the rolling 90-day window
- No facial recognition, no image analysis, no audio analysis

---

**Defined in:** `surveys/survey_config.yaml` → `workflow_architecture.cadence.social_listening`
**Feature columns:** `social_sentiment`, `social_external_pressure`, `social_frustration_flag`
**Models affected:** Performance Trajectory v1, Transfer Risk v8 (FB) / v3 (BB), Combined Risk/Fit
