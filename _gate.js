/* EDGE3 demo access gate.
   Each gated demo includes this script. Visitors without a valid key
   see an overlay with a Request Access form (mailto:). Kenyon replies
   with a URL containing ?access=KEY which unlocks the page and stores
   the key in localStorage so it persists across navigation.

   To grant access: share a URL with ?access=KEY where KEY is in VALID_KEYS.
   To revoke: edit VALID_KEYS below and redeploy.
*/

(function() {
  'use strict';

  // ========== CONFIG — edit these to grant/revoke access ==========
  var VALID_KEYS = [
    'preview-2026',     // generic preview key — share with prospects
    'unm-2026',         // UNM (Olen) walk-through
    'wisc-2026',        // Wisconsin (Fickell) walk-through
    'csun-2026',        // CSUN (Killin / Newman) walk-through
    'partner-2026',     // tech partner / AWS demo
    'edge3-owner'       // owner bypass — Kenyon. Permanent. Bookmark URL with ?access=edge3-owner
  ];
  // Path substrings that auto-bypass the gate (publicly accessible demos).
  // Add a path here to make a demo public; remove to re-gate it.
  var OPEN_PATHS = [
    '/basketball/demo/olen/',     // Olen UNM transfer comparison — polished public walkthrough
    '/football/demo/fickell/'     // Fickell Wisconsin scorecard — polished public walkthrough
  ];
  var CONTACT_EMAIL = 'glove2044@gmail.com';
  // ================================================================

  var STORAGE_KEY = 'edge3_demo_access';

  function getQueryParam(name) {
    var match = (window.location.search || '').match(new RegExp('[?&]' + name + '=([^&]+)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  function isOpenPath() {
    var path = (window.location.pathname || '').toLowerCase();
    for (var i = 0; i < OPEN_PATHS.length; i++) {
      if (path.indexOf(OPEN_PATHS[i].toLowerCase()) !== -1) return true;
    }
    return false;
  }

  function isAuthorized() {
    // Open demos always pass
    if (isOpenPath()) return true;
    // URL key wins; if valid, persist in localStorage
    var urlKey = getQueryParam('access');
    if (urlKey && VALID_KEYS.indexOf(urlKey) !== -1) {
      try { localStorage.setItem(STORAGE_KEY, urlKey); } catch (e) {}
      return true;
    }
    // Fall back to stored key
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && VALID_KEYS.indexOf(stored) !== -1) return true;
    } catch (e) {}
    return false;
  }

  function getTease() {
    // Path-aware tease — tells the visitor exactly what they'll see in the live demo.
    var path = (window.location.pathname || '').toLowerCase();
    if (path.indexOf('/football/') !== -1) {
      return {
        eyebrow: 'NCAA Football · Live walk-through',
        headline: 'See your roster scored at NFL-front-office depth.',
        bullets: [
          'Your <strong>NCAA Football roster</strong> graded against program + scheme baselines &mdash; position by position.',
          '<strong>Side-by-side prospect comparison</strong> &mdash; HS recruit, portal transfer, current roster player at the same position.',
          '<strong>The workflow your staff already runs</strong> (Analyst &rarr; Position Coach &rarr; Head Coach) condensed into one screen.'
        ],
        time: '~10 minutes &middot; live, with your data',
        company_placeholder: 'University of Example Athletics',
        name_placeholder: 'Coach Last Name',
        email_placeholder: 'coach@example.edu'
      };
    }
    if (path.indexOf('/basketball/') !== -1) {
      return {
        eyebrow: 'NCAA Basketball · Live walk-through',
        headline: 'See your portal candidates scored at NBA-front-office depth.',
        bullets: [
          'Your <strong>portal candidates</strong> scored against your stated thresholds (DReb%, OReb%, Stl%, Blk%, height, scheme fit).',
          '<strong>The Olen UNM transfer comparison report</strong> as a worked example &mdash; three real prospects, slot-fit grades, roster churn picture.',
          '<strong>Roster Retention Risk + Performance Trajectory</strong> on every D1 player &mdash; refreshed monthly.'
        ],
        time: '~10 minutes &middot; live, with your data',
        company_placeholder: 'University of Example Athletics',
        name_placeholder: 'Coach Last Name',
        email_placeholder: 'coach@example.edu'
      };
    }
    if (path.indexOf('/athletes/') !== -1 || path.indexOf('/family/') !== -1) {
      return {
        eyebrow: 'Athlete + Family Recruiting OS · Live walk-through',
        headline: 'See how coaches actually evaluate your son.',
        bullets: [
          '<strong>The difference</strong> between your highlight reel and the scouting tape coaches actually use to evaluate.',
          '<strong>Three program-fit comparisons</strong> &mdash; coaching staff, system, depth chart at your son&rsquo;s position.',
          '<strong>Agent-side intelligence</strong> the family controls &mdash; the questions that turn the deal in your favor.'
        ],
        time: '~10 minutes &middot; with your highlights',
        company_placeholder: 'High school / club program',
        name_placeholder: 'Parent or athlete name',
        email_placeholder: 'family@example.com'
      };
    }
    // Fallback (root or other gated demos)
    return {
      eyebrow: 'EDGE3 demo · Live walk-through',
      headline: 'See the platform in action.',
      bullets: [
        '<strong>Personalized AI recruiting agents</strong> tuned to your program or family.',
        '<strong>Structured + unstructured data</strong> layered into one read both sides can act on.',
        '<strong>Live with your data</strong> &mdash; not a static deck.'
      ],
      time: '~10 minutes &middot; scheduled with you',
      company_placeholder: 'Your organization',
      name_placeholder: 'Your name',
      email_placeholder: 'you@example.com'
    };
  }

  function buildOverlay() {
    var tease = getTease();
    var bulletHtml = tease.bullets.map(function(b) {
      return '<li>' + b + '</li>';
    }).join('');
    var overlay = document.createElement('div');
    overlay.className = 'edge3-gate';
    overlay.innerHTML =
      '<div class="eg-card">' +
        '<div class="eg-logo"><span class="e">EDGE</span><span class="three">3</span></div>' +
        '<div class="eg-eyebrow">' + tease.eyebrow + '</div>' +
        '<h2>' + tease.headline + '</h2>' +
        '<div class="eg-tease">' +
          '<div class="eg-tease-label">What you&rsquo;ll see</div>' +
          '<ul class="eg-tease-list">' + bulletHtml + '</ul>' +
          '<div class="eg-tease-time">' + tease.time + '</div>' +
        '</div>' +
        '<form id="edge3-gate-form">' +
          '<div>' +
            '<label for="eg-company">Company / program</label>' +
            '<input type="text" id="eg-company" name="company" placeholder="' + tease.company_placeholder + '" required>' +
          '</div>' +
          '<div>' +
            '<label for="eg-name">Your name</label>' +
            '<input type="text" id="eg-name" name="name" placeholder="' + tease.name_placeholder + '" required>' +
          '</div>' +
          '<div>' +
            '<label for="eg-email">Email</label>' +
            '<input type="email" id="eg-email" name="email" placeholder="' + tease.email_placeholder + '" required>' +
          '</div>' +
          '<button type="submit" class="eg-submit">Request live walk-through</button>' +
        '</form>' +
        '<div class="eg-foot">' +
          'On submit, your default mail client opens with the request pre-filled. ' +
          'Or write us directly at <a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a>.' +
        '</div>' +
      '</div>';
    return overlay;
  }

  function wireForm(overlay) {
    var form = overlay.querySelector('#edge3-gate-form');
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var company = (overlay.querySelector('#eg-company').value || '').trim();
      var name = (overlay.querySelector('#eg-name').value || '').trim();
      var email = (overlay.querySelector('#eg-email').value || '').trim();
      var requested = window.location.pathname;
      var subject = 'EDGE3 demo access request — ' + (company || 'unspecified program');
      var body =
        'Demo requested: ' + window.location.href + '\n\n' +
        'Name:    ' + name + '\n' +
        'Company: ' + company + '\n' +
        'Email:   ' + email + '\n\n' +
        'Sent from the EDGE3 demo gate on ' + new Date().toISOString();
      var mailto = 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      window.location.href = mailto;
    });
  }

  function mount() {
    if (isAuthorized()) return;
    document.body.classList.add('edge3-gated');
    var overlay = buildOverlay();
    document.body.appendChild(overlay);
    wireForm(overlay);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
