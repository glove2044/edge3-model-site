# EDGE3 Football — Door data

Model outputs that feed the Football door's demos and reports land here.

When a Football model is updated, drop the new outputs in this folder and the demos in `../demo/` will read from the door's data — no cross-door updates needed.

## Current data sources

| File | Used by | Source |
|---|---|---|
| `(future)` | `/football/demo/fb_search/` | FB Combined R/Y/G v1 — 2025 forward predictions |
| `(future)` | `/football/demo/fickell/` | Wisconsin program scorecard |
| `(future)` | `/football/demo/loop/` | FB Continuous Intelligence Loop signal samples |

## Pattern

Demos reference data via relative paths inside the door:
- `./demo/X/index.html` reads `../../data/file.json` if the data is shared
- Or keeps its data co-located in `./demo/X/file.json` for demo-specific JSON

## Updating

1. Re-run the model from `/models/transfer-risk/` or `/models/{...}/`
2. Drop output CSV / JSON in this folder
3. Demos pick up the new file on next page load
