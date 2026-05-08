# Olen demo - EDGE3 brand kit rebuild

Status: rebuilt 2026-05-08 (Sonnet, autonomous while Kenyon stepped away).
File: `docs/basketball/demo/olen/index.html` (1,843 lines, +53 net from chrome additions).

## What changed

### Chrome (EDGE3 brand kit applied)
- Added Inter font import (preconnect + Google Fonts CSS).
- Added EDGE3 brand tokens to `:root` alongside UNM tokens (`--brand-dark`, `--brand-green`, `--brand-blue`, `--brand-line`, etc.).
- Surface tokens (`--bg`, `--bg-elev`, `--border`, `--text`) now alias to EDGE3 tokens. UNM cherry kept for content emphasis only (hero accent word, threshold callouts, slot headers).
- Added EDGE3 brandbar at top with EDGE3 logo (white EDGE + green 3) + Basketball Risk/Fit Report sport tag.
- Added breadcrumb: `EDGE3 > Programs > Basketball > Coach Olen . UNM`.
- Replaced custom `<footer>` with EDGE3-branded `.edge3-footer` (logo, home/basketball/programs links, right-aligned context).
- Hero gradient swapped from cherry-saturated to EDGE3-dark with cherry + blue radial accents (more brand-consistent, less heavy).
- Primary `.btn` now uses brand-green (was cherry red). Cherry red preserved for content highlights only.
- Section eyebrows now use brand-blue (was cherry); chrome consistent across pages.
- Border radii bumped from 4-6px to 6-10px to match EDGE3 brand kit.
- Hero title now uses `clamp()` for responsive sizing.

### Customer-facing polish
- Em-dash sweep complete: 0 literal em-dashes, 0 `&mdash;` entities, 0 `&#x2014;` (was 75 + 5 = 80 hits).
- Buyer-language audit: 0 hits on `cohort`, `holdout`, `drift`, `hyperparameter`, `categorical`, `imputation`, `stratified`, `gradient boosting`.
- Title updated to "New Mexico Basketball . EDGE3 Risk/Fit Report for Coach Olen" (was generic).
- Hero-bar simplified: removed redundant "EDGE3 .  Risk/Fit Report" (already shown in brandbar above).

### Preserved
- All player/JSON data unchanged (Petraitis, Butka, Anya).
- All gate.css/gate.js inclusion paths.
- All print styles.
- All mobile breakpoints (1040, 760, 640, 420).
- Coach's Private Read panel + JSON export functionality.
- Full UNM 2025-26 baseline, 2026-27 roster churn, slot-fit grades.

## QC results

```
PARSE OK
title: New Mexico Basketball . EDGE3 Risk/Fit Report for Coach Olen
viewport: width=device-width, initial-scale=1.0
literal em-dashes in user-visible text: 0
edge3-brandbar: true
edge3-breadcrumb: true
edge3-footer: true
Inter font import: true
style braces open/close: 277 / 277
div open/close: 114 / 114
JSON parses: OK
player count: 3
JARGON HITS: none
```

## Next steps (when Kenyon returns)

1. Open `docs/basketball/demo/olen/index.html` locally to eyeball the brand kit and sales structure.
2. Compare against Wisconsin/Fickell for consistency. Flag gaps before propagating template to other demos (task #61).
3. If sign-off, run:
   ```
   ~/bin/edge3-publish
   cd ../edge3-model-site && git add -A && git commit -m "Olen demo: rebuild on EDGE3 brand kit" && git push
   ```

## What was NOT touched

- Player JSON + threshold logic (data layer untouched).
- Per-section structure / sales flow (chrome only - if you want skim-first reorder, that's a content pass, not a brand-kit pass).
- Print styles (already fine).
- The `.cmp-table`, `.gap-card`, `.churn-col`, `.slots-box` interior styling beyond border-radius. If those need EDGE3 polish too, flag and I'll do a second pass.
