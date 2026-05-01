# EDGE3 Basketball — Door data

Model outputs that feed the Basketball door's demos and reports land here.

When a Basketball model is updated, drop the new outputs in this folder and the demos in `../demo/` will read from the door's data — no cross-door updates needed.

## Current data sources

| File | Used by | Source |
|---|---|---|
| `olen_unm_players_data.json` | `/basketball/demo/olen/` and `/basketball/demo/olen_unm_transfer_compare.html` | UNM 2026-27 portal candidate data + Olen thresholds |
| `(future)` | `/basketball/demo/bb_search/` | BB Combined R/Y/G v1 — 2026-27 forward predictions |
| `(future)` | `/basketball/demo/bb_loop/` | BB Continuous Intelligence Loop signal samples |

## Pattern

Demos reference data via relative paths inside the door:
- `./demo/X/index.html` reads `../../data/file.json` if the data is shared
- Or keeps its data co-located in `./demo/X/file.json` for demo-specific JSON

## Updating

1. Re-run the model from `/models/basketball-transfer-risk/` or `/models/{...}/`
2. Drop output CSV / JSON in this folder
3. Demos pick up the new file on next page load
