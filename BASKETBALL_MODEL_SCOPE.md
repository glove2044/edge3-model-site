# EDGE3 Basketball Model - Positional Groups & Feature Architecture
# Vision Sports Portal, LLC / EDGE3 Athlete Intelligence
# Scoped: April 2026

---

## Overview

Basketball requires a fundamentally different positional model than football.
Football has rigid positional groups with clear physical profiles.
Basketball positions are fluid - a 6'6" player might be a wing, a point-forward, or a small-ball 4 depending on the system.

EDGE3 basketball models should classify by **role archetype**, not traditional positions.

---

## Positional Groups (5 Models)

### 1. CREATION (Primary Handlers)
**Traditional positions:** PG, Combo Guard
**Role:** Primary ball-handler, initiates offense, controls pace
**Key features:**
- Assist rate / AST%
- Turnover rate / TOV%
- Usage rate / USG%
- Pick-and-roll ball-handler frequency
- Transition possessions per game
- Assist-to-turnover ratio
- Free throw rate (indicates ability to get to the rim)

**Assessment drills (Noah's program):**
- Ball handling under pressure (cone drills + defender)
- Pull-up jump shot off dribble (mid-range, 3PT)
- Court vision passing (target accuracy test)
- Transition decision-making (2-on-1, 3-on-2 scenarios)
- Change of pace / direction speed test

### 2. SCORING (Shot Creators / Secondary Handlers)
**Traditional positions:** SG, Scoring PG, Wing
**Role:** Off-ball scoring, shot creation, secondary playmaking
**Key features:**
- Points per game / PPG
- True shooting percentage / TS%
- 3-point attempt rate and percentage
- Mid-range attempt rate and percentage
- Free throw rate and percentage
- Shot distribution (rim vs mid vs 3PT)
- Isolation frequency and efficiency

**Assessment drills (Noah's program):**
- Catch-and-shoot (spot-up from 5 locations)
- Off-screen shooting (curl, fade, flare)
- Pull-up shooting off screens
- Finishing at the rim (both hands, through contact)
- Step-back and side-step 3PT shooting

### 3. WING (Two-Way Impact Players)
**Traditional positions:** SF, Wing, Versatile Forward
**Role:** Defend multiple positions, switch everything, secondary scoring
**Key features:**
- Defensive rating / DRTG
- Steal rate / STL%
- Block rate / BLK%
- Rebound rate / REB% (both offensive and defensive)
- 3-point shooting percentage
- Transition scoring
- Defensive versatility (positions guarded)

**Assessment drills (Noah's program):**
- Defensive slides and closeouts (timed)
- 1-on-1 defense (guard and forward matchups)
- Spot-up 3PT shooting (catch and shoot)
- Transition finishing (fast break layups, dunks)
- Rebounding out of area (box-out + pursue)
- Wingspan and standing reach measurement

### 4. FRONTCOURT (Stretch Bigs / Modern 4s)
**Traditional positions:** PF, Stretch 4, Small-Ball 5
**Role:** Floor spacing, face-up game, defensive versatility, rebounding
**Key features:**
- Rebound rate / REB% (offensive and defensive)
- 3-point attempt rate (spacing indicator)
- Block rate / BLK%
- Post-up frequency and efficiency
- Pick-and-pop frequency
- Defensive rating when guarding perimeter vs interior
- Height + wingspan ratio

**Assessment drills (Noah's program):**
- Face-up game (triple threat to drive or shoot)
- Trail 3-point shooting (transition)
- Pick-and-pop shooting (short roll, elbow, 3PT)
- Drop-step and post footwork
- Closeout and recover drill
- Vertical jump (standing + max)
- Lane agility test

### 5. RIM PROTECTION (Traditional Bigs)
**Traditional positions:** C, Traditional 5, Shot-Blocker
**Role:** Rim protection, rebounding, interior scoring, screen setting
**Key features:**
- Block rate / BLK%
- Defensive rebound rate / DREB%
- Offensive rebound rate / OREB%
- Screen assists (if available)
- Rim finishing percentage (within 5 feet)
- Foul rate
- Pick-and-roll roll frequency and efficiency
- Standing reach and wingspan

**Assessment drills (Noah's program):**
- Shot blocking timing drill (reaction + vertical)
- Post scoring series (drop step, hook, up-and-under)
- Pick-and-roll finishing (lob, short roll, slip)
- Outlet passing (after defensive rebound)
- Free throw shooting
- Standing reach + wingspan + hand span measurement
- Max vertical and standing vertical

---

## Feature Set - Per Model

### Recruiting Features (available at HS level)
These mirror the football model's 6-feature approach:

| Feature | Source | Notes |
|---------|--------|-------|
| Height | Assessment / 247Sports | In inches |
| Weight | Assessment / 247Sports | In pounds |
| Wingspan | Assessment / Noah's program | Critical for basketball - not in football model |
| 247CompositeScore | 247Sports | If available (basketball has less coverage than football) |
| NatlRank | 247Sports / ESPN | National ranking |
| PositionRank | 247Sports | Position-specific ranking |
| Stars | 247Sports / Rivals / ESPN | Star rating (2-5) |

### Assessment Features (from Noah's program - unique to EDGE3)
These are the differentiator. No one else has standardized, longitudinal skill data.

| Feature | Age Groups | Measurement |
|---------|-----------|-------------|
| Ball Handling Score | 3rd-8th → HS | Timed cone drill with pressure |
| Shooting: Catch & Shoot % | 3rd-8th → HS | 5 spots, 5 shots each = 25 shots |
| Shooting: Off-Dribble % | 5th-8th → HS | Pull-up from 3 zones |
| Court Vision Score | 3rd-8th → HS | Target passing accuracy |
| Defensive Slide Time | 3rd-8th → HS | Lane agility / lateral quickness |
| Finishing Score | 3rd-8th → HS | Layups both hands, through contact |
| Vertical Jump | 5th-8th → HS | Standing + max |
| Sprint Time | 3rd-8th → HS | Court-length sprint (94 feet) |
| Wingspan | All ages | Measured quarterly |
| Standing Reach | All ages | Measured quarterly |

### Performance Features (college level - for transfer risk/RNR)
| Feature | Source | Notes |
|---------|--------|-------|
| Minutes per game | Sports Reference / ESPN | Usage indicator |
| PER (Player Efficiency Rating) | Sports Reference | Composite efficiency |
| Win Shares / WS | Sports Reference | Contribution to wins |
| Box Plus-Minus / BPM | Sports Reference | Overall impact |
| True Shooting % | Calculated | Scoring efficiency |
| Usage Rate | Calculated | Ball dominance |
| Assist Rate | Calculated | Playmaking |
| Turnover Rate | Calculated | Ball security |
| Rebound Rate | Calculated | Rebounding impact |
| Steal + Block Rate | Calculated | Defensive activity |

---

## RNR (Transfer Risk) Model - Basketball

Same concept as football: predict which athletes are likely to transfer.

**Key risk signals unique to basketball:**
- Minutes reduction (biggest single predictor - player losing playing time)
- Coaching change (same as football)
- New highly-ranked recruit at same position arriving
- Declining efficiency metrics (PER, TS%, BPM trending down)
- Academic eligibility concerns
- NIL dissatisfaction (harder to quantify but real)
- Hometown distance from school (homesick factor)
- Conference realignment impact on travel/schedule

**Training data sources:**
- Sports Reference (historical stats by player-season)
- 247Sports basketball recruiting database
- barttorvik.com (advanced college basketball analytics)
- Transfer portal historical data (who transferred, from where, to where)
- KenPom (team-level efficiency data to contextualize player stats)

---

## RYG (Performance Outcome) Model - Basketball

Predict performance trajectory: will this athlete produce at their next school?

**Green (outperform):** Player exceeds expectations at destination
**Yellow (meets expectations):** Player performs as projected
**Red (underperform):** Player declines or doesn't contribute meaningfully

---

## Noah's Assessment Pipeline → EDGE3 Wallet

The assessment data is the secret weapon. Here's the flow:

```
3rd Grade Assessment (quarterly)
    ↓
Youth Wallet Created (basic metrics + trajectory)
    ↓
Quarterly Reassessments (skill deltas tracked)
    ↓
6th-8th Grade (expanded drill set, positional grouping begins)
    ↓
HS Freshman Assessment (full battery - recruiting features populated)
    ↓
EDGE3 Recruiting Wallet (RNR + RYG classification eligible)
    ↓
AWS Camera Automation (standardized skill testing at scale)
```

**The 6-year longitudinal dataset is the moat.** By the time a kid hits a recruiting board, EDGE3 has 6+ years of verified, standardized assessment data. No one else has this.

---

## Data Sources to Pursue

| Source | Data | Access |
|--------|------|--------|
| Sports Reference / basketball-reference.com | Historical player stats, advanced metrics | Public (scraping OK for personal use) |
| barttorvik.com | Advanced college basketball analytics | Public API |
| 247Sports Basketball | Recruiting rankings, composite scores | Manual / partnership |
| KenPom | Team efficiency, tempo, strength of schedule | Subscription ($) |
| NCAA Statistics | Official game stats | ncaa.org |
| hoopmath.com | Shot location data | Public |
| Noah's Assessments | Quarterly skill data (youth → HS) | Internal - EDGE3 proprietary |

---

## Next Steps

1. Define standardized assessment battery by age group (Noah's team)
2. Build assessment intake app (AWS camera integration roadmap)
3. Collect first 2 quarters of assessment data (minimum viable training set)
4. Source historical college basketball transfer data for RNR training
5. Build RNR model on college stats (barttorvik + Sports Reference)
6. Layer assessment data as features once sufficient volume exists
