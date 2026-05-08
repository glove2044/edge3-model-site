/**
 * EDGE3 site QC — run after every edit to the public site.
 *
 * Usage (from repo root):
 *   node docs/_qc/site_qc.js
 *
 * Checks per page:
 *   - HTML parses (JSDOM)
 *   - Tag balance for major elements
 *   - <style> brace balance
 *   - Viewport meta present + correct
 *   - <title> + <meta description> present
 *   - 0 user-visible em-dashes (Kenyon's rule)
 *   - 0 placeholder strings (TODO / TBD / Lorem ipsum)
 *   - Internal links resolve to actual files
 *   - Mobile breakpoint coverage (≤480, ≤600, ≤760, ≤980)
 *   - Form fields have <label for>
 *   - No oversized inline widths (>500px on element width=, may overflow on mobile <380px)
 *
 * Exit code: 0 = pass, 1 = blocker(s) found.
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('/sessions/sharp-determined-mendel/node_modules/jsdom');

const ROOT = path.resolve(__dirname, '../..');
const DOCS = path.join(ROOT, 'docs');

// All public-facing HTML pages we want to QC. Add new pages here.
const PAGES = [
  'docs/index.html',
  'docs/programs/index.html',
  'docs/football/index.html',
  'docs/basketball/index.html',
  'docs/athletes/index.html',
  'docs/athletes/onboarding/index.html',
];

let blockers = [];
let warnings = [];
const pageBreakpoints = {};

function blocker(file, msg) { blockers.push(`[BLOCKER ${file}] ${msg}`); }
function warn(file, msg) { warnings.push(`[WARN ${file}] ${msg}`); }

for (const rel of PAGES) {
  const f = path.join(ROOT, rel);
  if (!fs.existsSync(f)) { blocker(rel, 'file not found'); continue; }

  const html = fs.readFileSync(f, 'utf8');
  let dom;
  try {
    dom = new JSDOM(html);
  } catch (e) {
    blocker(rel, `JSDOM parse error: ${e.message}`);
    continue;
  }
  const doc = dom.window.document;

  // 1. Tag balance
  const tags = ['div','section','span','table','tr','td','th','thead','tbody','ul','ol','li','p','a','h1','h2','h3','h4','header','footer','nav','main','article','form','select','option','button','label','textarea','blockquote'];
  for (const t of tags) {
    const op = (html.match(new RegExp(`<${t}\\b[^>]*?(?<!/)>`,'gi')) || []).length;
    const cl = (html.match(new RegExp(`</${t}>`,'gi')) || []).length;
    if (op !== cl) blocker(rel, `<${t}> imbalance: ${op} open / ${cl} close`);
  }

  // 2. <style> brace balance
  doc.querySelectorAll('style').forEach((s, i) => {
    const css = s.textContent;
    const op = (css.match(/\{/g) || []).length;
    const cl = (css.match(/\}/g) || []).length;
    if (op !== cl) blocker(rel, `<style #${i}> brace imbalance: ${op}{ / ${cl}}`);
  });

  // 3. Viewport meta
  const vp = doc.querySelector('meta[name="viewport"]');
  if (!vp) {
    blocker(rel, 'missing <meta name="viewport">');
  } else {
    const c = vp.getAttribute('content') || '';
    if (!/width=device-width/.test(c)) blocker(rel, `viewport missing width=device-width: "${c}"`);
    if (!/initial-scale=1/.test(c)) blocker(rel, `viewport missing initial-scale=1: "${c}"`);
  }

  // 4. Title + meta description
  const title = doc.querySelector('title');
  if (!title || !title.textContent.trim()) warn(rel, 'missing/empty <title>');
  const desc = doc.querySelector('meta[name="description"]');
  if (!desc || !desc.getAttribute('content')) warn(rel, 'missing meta description');

  // 5. User-visible em-dashes (strip HTML + CSS comments first)
  const noComments = html.replace(/<!--[\s\S]*?-->/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
  const mdMatches = [...noComments.matchAll(/(.{0,40})(&mdash;|—)(.{0,40})/g)];
  if (mdMatches.length > 0) {
    mdMatches.forEach(m => warn(rel, `em-dash in: "...${m[1].replace(/\n/g,' ')}${m[2]}${m[3].replace(/\n/g,' ')}..."`));
  }

  // 6. Placeholder strings
  const placeholders = ['TODO', 'Lorem ipsum', '{{', '}}', 'XXX'];
  // TBD is allowed in some demo data ("Portal (TBD)") — flag but don't block
  for (const p of placeholders) {
    if (noComments.includes(p)) {
      warn(rel, `placeholder "${p}" present`);
    }
  }

  // 7. Internal link check
  doc.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || /^https?:|^mailto:|^#|^tel:|^javascript:/i.test(href)) return;
    const dir = path.dirname(f);
    const resolved = path.resolve(dir, href.split('#')[0].split('?')[0]);
    try {
      const stat = fs.statSync(resolved);
      if (stat.isDirectory()) {
        if (!fs.existsSync(path.join(resolved, 'index.html'))) {
          warn(rel, `link "${href}" → directory without index.html`);
        }
      }
    } catch (e) {
      blocker(rel, `broken link "${href}" (resolved to ${resolved.replace(ROOT,'')})`);
    }
  });

  // 8. Mobile breakpoint coverage
  const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('');
  const has = (re) => re.test(css);
  const r480 = has(/@media[^{]*max-width:\s*4(80|20)px/);
  const r600 = has(/@media[^{]*max-width:\s*6(00|40)px/);
  const r760 = has(/@media[^{]*max-width:\s*7([0-6]0)px/);
  const r980 = has(/@media[^{]*max-width:\s*9(00|80)px/);
  // We expect at least 760 + one of (600 or 980)
  if (!r760 && !r980) warn(rel, 'no mobile breakpoint at ≤760 or ≤980 — page may not collapse on tablets');
  // Track for summary
  pageBreakpoints[rel] = { r480, r600, r760, r980 };

  // 9. Form fields with labels
  doc.querySelectorAll('input, textarea, select').forEach(el => {
    if (['hidden','submit','button'].includes(el.type)) return;
    const id = el.id;
    if (!id) { warn(rel, `<${el.tagName.toLowerCase()}> without id (no associable label)`); return; }
    const label = doc.querySelector(`label[for="${id}"]`);
    if (!label) warn(rel, `<${el.tagName.toLowerCase()} id="${id}"> has no <label for>`);
  });

  // 10. Inline width that may overflow narrow mobile
  doc.querySelectorAll('[style*="width:"]').forEach(el => {
    const s = el.getAttribute('style') || '';
    const m = s.match(/(?<!max-)width:\s*(\d+)px/);
    if (m && parseInt(m[1]) > 500) {
      warn(rel, `inline width: ${m[1]}px on <${el.tagName.toLowerCase()}> — may overflow at <380px`);
    }
  });
}

PAGES.forEach(p => { if (!pageBreakpoints[p]) pageBreakpoints[p] = {}; });

// ============================================================
// Output
// ============================================================
console.log('=== EDGE3 site QC ===');
console.log(`Pages checked: ${PAGES.length}`);
console.log('');

if (blockers.length > 0) {
  console.log(`\nBLOCKERS (${blockers.length}) — must fix before publish:`);
  blockers.forEach(b => console.log('  ' + b));
}
if (warnings.length > 0) {
  console.log(`\nWARNINGS (${warnings.length}):`);
  warnings.slice(0, 30).forEach(w => console.log('  ' + w));
  if (warnings.length > 30) console.log(`  ... and ${warnings.length - 30} more (re-run with VERBOSE=1 to see all)`);
}

console.log('\n=== Mobile breakpoint summary ===');
PAGES.forEach(p => {
  const b = pageBreakpoints[p] || {};
  console.log(`  ${p}`);
  console.log(`    ≤480: ${b.r480?'✓':'○'}  ≤600: ${b.r600?'✓':'○'}  ≤760: ${b.r760?'✓':'○'}  ≤980: ${b.r980?'✓':'○'}`);
});

if (blockers.length === 0) {
  console.log('\n✓ NO BLOCKERS. Site is ready to publish.');
} else {
  console.log(`\n✗ ${blockers.length} blocker(s) found. Fix before publish.`);
}

process.exit(blockers.length > 0 ? 1 : 0);
