# EDGE3 Brand Spec

**Apply to all enterprise + user-facing EDGE3 artifacts.** Athlete-facing Wallets are intentionally scoped to a different palette and are not covered by this spec.

---

## Logo

The wordmark is "EDGE3" — "EDGE" in white, "3" in brand green. Always rendered on a dark background.

Pure CSS, no asset required:

```html
<span class="edge3-logo">
  <span class="edge3-edge">EDGE</span><span class="edge3-three">3</span>
</span>
```

```css
.edge3-logo {
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
}
.edge3-edge { color: var(--brand-white); }
.edge3-three { color: var(--brand-green); }
```

For light-mode contexts, swap `.edge3-edge` to `var(--brand-dark)`.

---

## Color tokens

| Token | Hex | Use |
|---|---|---|
| `--brand-dark` | `#0A0F1C` | Primary dark surface (header, hero, dark panels) |
| `--brand-dark-2` | `#0E1320` | Mid-depth dark surface |
| `--brand-dark-3` | `#161D2D` | Card/panel surface in dark mode |
| `--brand-white` | `#FFFFFF` | Logo "EDGE", primary white text |
| `--brand-green` | `#1AB874` | Logo "3", primary CTAs, success/positive state |
| `--brand-green-soft` | `#14965F` | Hover state for green |
| `--brand-blue` | `#3B82F6` | Secondary accent, links, info state |
| `--brand-blue-soft` | `#DBEAFE` | Light-blue panel background |
| `--brand-text` | `#E8EDF5` | Primary text on dark |
| `--brand-text-light-bg` | `#1C232E` | Primary text on light |
| `--brand-muted` | `#8896AB` | Secondary / muted text |
| `--brand-line` | `#1F2738` | Dividers on dark |
| `--brand-line-light` | `#E4EAF2` | Dividers on light |
| `--brand-bg-light` | `#F7F9FC` | Light-mode body background |

**R/Y/G status colors** (distinct from brand):
- Red: `#D33F49`
- Amber: `#E8B339`
- Green-status: use `--brand-green` so brand and "Green = maintain plan" reinforce

---

## Typography

**All copy:** Inter via Google Fonts. Stack falls through to system fonts if Inter fails to load.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

```css
body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif; }
```

**Type scale**

| Use | Size | Weight | Letter-spacing |
|---|---|---|---|
| Display / H1 | 36–44px | 800 | -0.02em |
| H2 | 22–28px | 700 | -0.01em |
| H3 | 18px | 700 | 0 |
| Body | 14–15px | 400–500 | 0 |
| Meta / tag | 11–12px | 600–700 | 0.6–1.4px (uppercase) |
| Numbers | tabular | 700 | 0 |

---

## Design language

- **Modern dark-first** — headers, hero sections, and decision-grade panels (NFL validation, recommended action) use dark surface. Body content stays light for daytime readability.
- **High contrast** — pure white on `#0A0F1C`, dark text on `#F7F9FC`.
- **Subtle elevation** —
  - Light cards: `box-shadow: 0 1px 3px rgba(0,0,0,0.04)`
  - Dark elevated panels: `box-shadow: 0 4px 16px rgba(0,0,0,0.25)`
- **Border radius:** 10–14px for cards, 6–8px for buttons, 18–22px for pills/chips
- **Gradients** reserved for hero (`--brand-dark` → `--brand-dark-2`) and CTA bars
- **CTAs**
  - Primary: `--brand-green` background, white text
  - Secondary: transparent, green border + text
- **Tooltips / popovers:** always `--brand-dark-2` background, white text (consistent regardless of light/dark surface)

---

## Out of scope

- **Athlete-facing Wallet product** — separate palette to differentiate athlete experience from coach/AD experience
- **Use-case artifact school colors** — Wisconsin red on the Fickell scorecard, UNM crimson on the Olen comparison — stay because they ARE the school's identity, not EDGE3's

---

## Enforcement

Every enterprise EDGE3 surface references the `--brand-*` tokens above. Ad-hoc hex values that don't trace back to a token are a brand violation — flag and fix.

Currently applied to:
- `docs/index.html` (main landing)
- `docs/football/index.html`
- `docs/basketball/index.html`
- `docs/demo/loop/index.html`

Use-case artifacts at `docs/demo/fickell/` and `docs/demo/olen/` are exempt by design (school colors).
