# EDGE3 Demo Scripts

**Five persona-specific demo scripts.** Each is runnable in 7–12 minutes against the live URLs at `glove2044.github.io/edge3-model/`. Each script names what to click, what to say, and the close.

## Pick the right script for the room

| Persona | Script | Time | Site to demo from |
|---|---|---|---|
| FB Head Coach / GM | [`fb_head_coach.md`](fb_head_coach.md) | 10 min | `/football/` + `/demo/fickell/` |
| BB Head Coach / GM | [`bb_head_coach.md`](bb_head_coach.md) | 10 min | `/basketball/` + `/demo/olen/` |
| Athletic Director (any sport) | [`athletic_director.md`](athletic_director.md) | 12 min | `/` + `/football/` or `/basketball/` |
| HS Athlete + Parent (recruiting) | [`athlete_parent_hs.md`](athlete_parent_hs.md) | 8 min | `/` (anchor on Recruiting Tape section) |
| AWS / Tech Partner | [`tech_partner_aws.md`](tech_partner_aws.md) | 12 min | `/` + `/demo/loop/` + GitHub repo |

## Universal opener (use across all scripts)

> "EDGE3 is decision intelligence for college athletics — built to surface what changed, what it means, and what to do, while invisibly handling the AI complexity. It pulls from four continuous input streams [survey, parent cross-reference, weekly stats/snaps, social listening] and turns them into a single Red/Yellow/Green signal per athlete that updates as the season unfolds. I'll show you the room view, the three-coach workflow, and the front-office validation — pick what matters most to you."

## Universal close (use across all scripts)

> "Two questions for you: (1) Which of these reads is closest to a problem you're spending hours on today? (2) If we cut that to a 30-second decision, what would you do with the time we give back?"

## Demo prep checklist

Before any demo:
- [ ] Open `https://glove2044.github.io/edge3-model/` in a fresh browser tab
- [ ] Confirm the persona-workflow demo's three tabs all click cleanly
- [ ] Confirm the loop simulator's sliders move the signal live
- [ ] If demoing to a school whose colors might appear, double-check that's intentional (Wisconsin red on `/demo/fickell/`, UNM crimson on `/demo/olen/` — fine)
- [ ] Have the GitHub URL ready: `github.com/glove2044/edge3-model` (for tech reviewers)

---

**Source data + methodology:**
- All AUC numbers cited in the scripts are from the model config JSONs in `models/*/data/*_config*.json`
- All player examples cited in the scripts are real players in the prediction CSVs (verified pre-demo)
- The Greenberg quotes come from the 2026 College Athletics Leadership Conference (documented attribution in the JSON sales validation file)
