/* =============================================================
   CMST 387 Web Design Resource Hub — shared behaviour
   Hand-written, no dependencies. Loaded with `defer`.

   Everything here is an enhancement. With JavaScript switched off:
     - the full navigation list is shown (the .js class is never added,
       so the CSS rule that collapses it never applies)
     - the settings button and copy buttons stay hidden
     - the contact form falls back to the browser's own constraint
       validation
   No content is JavaScript-dependent.
   ============================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  var STORE_KEY = 'hubPrefs';

  var DEFAULTS = {
    theme: 'system',
    textsize: 'default',
    motion: 'system',
    underline: 'off'
  };

  /* ---------- preference storage ---------------------------- */

  function readPrefs() {
    try {
      var raw = window.localStorage.getItem(STORE_KEY);
      if (!raw) { return Object.assign({}, DEFAULTS); }
      return Object.assign({}, DEFAULTS, JSON.parse(raw));
    } catch (err) {
      // Private-browsing modes can throw on localStorage access.
      return Object.assign({}, DEFAULTS);
    }
  }

  function writePrefs(prefs) {
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(prefs));
    } catch (err) { /* preferences simply do not persist; nothing breaks */ }
  }

  function applyPrefs(prefs) {
    // "system" means: remove the override and let the media queries
    // in styles.css answer from the operating-system setting.
    if (prefs.theme && prefs.theme !== 'system') {
      root.setAttribute('data-theme', prefs.theme);
    } else {
      root.removeAttribute('data-theme');
    }

    if (prefs.textsize && prefs.textsize !== 'default') {
      root.setAttribute('data-textsize', prefs.textsize);
    } else {
      root.removeAttribute('data-textsize');
    }

    if (prefs.motion === 'reduced') {
      root.setAttribute('data-motion', 'reduced');
    } else {
      root.removeAttribute('data-motion');
    }

    if (prefs.underline === 'on') {
      root.setAttribute('data-underline', 'on');
    } else {
      root.removeAttribute('data-underline');
    }
  }

  var prefs = readPrefs();
  applyPrefs(prefs);

  /* ---------- collapsible primary navigation ----------------- */

  var navToggle = document.getElementById('nav-toggle');
  var header = document.querySelector('.site-header');

  if (navToggle && header) {
    navToggle.hidden = false;           // only appears when JS can drive it
    navToggle.addEventListener('click', function () {
      var open = header.getAttribute('data-nav-open') === 'true';
      header.setAttribute('data-nav-open', open ? 'false' : 'true');
      navToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });

    // Escape closes the menu and returns focus to the button that
    // opened it, so a keyboard user is never stranded inside it.
    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') { return; }
      if (header.getAttribute('data-nav-open') === 'true') {
        header.setAttribute('data-nav-open', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ---------- accessibility settings panel ------------------- */

  var panel = document.getElementById('a11y-panel');
  var a11yToggle = document.getElementById('a11y-toggle');

  var PANEL_HTML = [
    '<div class="wrap">',
    '<h2 id="a11y-panel-heading">Accessibility settings</h2>',
    '<p>These choices are saved in this browser and apply to every page of the hub. ',
    'They add to your operating-system settings; they do not replace them.</p>',
    '<div class="a11y-settings-grid">',

    '<fieldset><legend>Text size</legend><div class="opt-grid">',
    '<label><input type="radio" name="pref-textsize" value="default"> Default</label>',
    '<label><input type="radio" name="pref-textsize" value="large"> Large (112%)</label>',
    '<label><input type="radio" name="pref-textsize" value="larger"> Larger (125%)</label>',
    '</div></fieldset>',

    '<fieldset><legend>Contrast and theme</legend><div class="opt-grid">',
    '<label><input type="radio" name="pref-theme" value="system"> Use system setting</label>',
    '<label><input type="radio" name="pref-theme" value="light"> Light</label>',
    '<label><input type="radio" name="pref-theme" value="dark"> Dark</label>',
    '<label><input type="radio" name="pref-theme" value="contrast"> High contrast</label>',
    '</div></fieldset>',

    '<fieldset><legend>Motion and links</legend><div class="opt-grid">',
    '<label><input type="checkbox" name="pref-motion"> Reduce motion</label>',
    '<label><input type="checkbox" name="pref-underline"> Underline all links</label>',
    '</div></fieldset>',

    '</div>',
    '<p><button type="button" id="a11y-reset" class="btn-quiet">Reset to defaults</button> ',
    '<span role="status" id="a11y-status"></span></p>',
    '</div>'
  ].join('');

  if (panel && a11yToggle) {
    panel.innerHTML = PANEL_HTML;
    a11yToggle.hidden = false;

    var status = document.getElementById('a11y-status');

    function syncControls() {
      var sizeInput = panel.querySelector('input[name="pref-textsize"][value="' + prefs.textsize + '"]');
      if (sizeInput) { sizeInput.checked = true; }
      var themeInput = panel.querySelector('input[name="pref-theme"][value="' + prefs.theme + '"]');
      if (themeInput) { themeInput.checked = true; }
      panel.querySelector('input[name="pref-motion"]').checked = prefs.motion === 'reduced';
      panel.querySelector('input[name="pref-underline"]').checked = prefs.underline === 'on';
    }

    function announce(message) {
      if (!status) { return; }
      status.textContent = '';
      window.setTimeout(function () { status.textContent = message; }, 60);
    }

    syncControls();

    panel.addEventListener('change', function (event) {
      var target = event.target;
      if (!target.name) { return; }
      if (target.name === 'pref-textsize') { prefs.textsize = target.value; }
      if (target.name === 'pref-theme') { prefs.theme = target.value; }
      if (target.name === 'pref-motion') { prefs.motion = target.checked ? 'reduced' : 'system'; }
      if (target.name === 'pref-underline') { prefs.underline = target.checked ? 'on' : 'off'; }
      applyPrefs(prefs);
      writePrefs(prefs);
      announce('Setting saved.');
    });

    var resetBtn = document.getElementById('a11y-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        prefs = Object.assign({}, DEFAULTS);
        applyPrefs(prefs);
        writePrefs(prefs);
        syncControls();
        announce('Settings reset to defaults.');
      });
    }

    a11yToggle.addEventListener('click', function () {
      var open = a11yToggle.getAttribute('aria-expanded') === 'true';
      a11yToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
      panel.hidden = open;
      if (!open) {
        var first = panel.querySelector('input');
        if (first) { first.focus(); }
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') { return; }
      if (a11yToggle.getAttribute('aria-expanded') === 'true') {
        a11yToggle.setAttribute('aria-expanded', 'false');
        panel.hidden = true;
        a11yToggle.focus();
      }
    });
  }

  /* ---------- copy buttons for code samples ------------------ */
  /* A keyboard alternative to selecting many lines by hand. */

  Array.prototype.forEach.call(
    document.querySelectorAll('.code-sample'),
    function (sample) {
      var pre = sample.querySelector('pre');
      var head = sample.querySelector('.code-head');
      if (!pre || !head || !navigator.clipboard) { return; }

      var label = sample.querySelector('.code-lang');
      var name = label ? label.textContent.trim() : 'code';

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn-quiet';
      button.textContent = 'Copy code';
      button.setAttribute('aria-label', 'Copy the ' + name + ' sample to the clipboard');

      var live = document.createElement('span');
      live.setAttribute('role', 'status');
      live.className = 'visually-hidden';

      button.addEventListener('click', function () {
        navigator.clipboard.writeText(pre.innerText).then(function () {
          button.textContent = 'Copied';
          live.textContent = 'Code sample copied to the clipboard.';
          window.setTimeout(function () { button.textContent = 'Copy code'; }, 2500);
        }, function () {
          button.textContent = 'Copy failed';
          live.textContent = 'Copy failed. Select the code and copy it manually.';
        });
      });

      head.appendChild(button);
      head.appendChild(live);
    }
  );

  /* ---------- table of contents: open wide, collapsed narrow -- */

  var toc = document.querySelector('.toc');
  if (toc && window.matchMedia) {
    var wide = window.matchMedia('(min-width: 64em)');
    var setToc = function (query) { toc.open = query.matches; };
    setToc(wide);
    if (wide.addEventListener) { wide.addEventListener('change', setToc); }
  }

  /* ---------- "Was this page helpful?" ----------------------- */

  var helpful = document.querySelector('.helpful');
  if (helpful) {
    // Hidden in the markup: these buttons do nothing without script, so
    // they should not be offered when script is unavailable.
    helpful.hidden = false;
    var reply = helpful.querySelector('[role="status"]');
    Array.prototype.forEach.call(
      helpful.querySelectorAll('button[data-answer]'),
      function (btn) {
        btn.addEventListener('click', function () {
          var yes = btn.getAttribute('data-answer') === 'yes';
          reply.textContent = yes
            ? 'Thank you. Your answer was recorded for this page.'
            : 'Thank you. Please tell us what was missing using the contact form, and we will fix it.';
        });
      }
    );
  }

  /* ---------- contact form validation ------------------------ */
  /* Client-side only: this is a static site with no server. The
     submit handler therefore never posts anywhere. See the notice
     printed on contact.html. */

  var form = document.getElementById('contact-form');
  if (!form) { return; }

  var summary = document.getElementById('error-summary');
  var successBox = document.getElementById('form-success');

  var RULES = [
    {
      id: 'name',
      label: 'Your name',
      test: function (value) { return value.trim().length > 0; },
      message: 'Enter your name so we know who to reply to.'
    },
    {
      id: 'email',
      label: 'Email address',
      test: function (value) {
        // Deliberately permissive: international addresses are valid.
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
      },
      message: 'Enter an email address in the format name@example.com.'
    },
    {
      id: 'category',
      label: 'What is this about?',
      test: function (value) { return value !== ''; },
      message: 'Choose a category from the list so your message reaches the right person.'
    },
    {
      id: 'message',
      label: 'Your message',
      test: function (value) { return value.trim().length >= 10; },
      message: 'Enter your message. It needs to be at least 10 characters long.'
    }
  ];

  function clearError(field) {
    field.removeAttribute('aria-invalid');
    var box = document.getElementById(field.id + '-error');
    if (box) {
      box.textContent = '';
      box.hidden = true;
    }
  }

  function showError(field, message) {
    field.setAttribute('aria-invalid', 'true');
    var box = document.getElementById(field.id + '-error');
    if (box) {
      box.textContent = message;
      box.hidden = false;
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();   // no backend exists — never navigate away

    var problems = [];

    // Honeypot. A real visitor cannot see or focus this field, so a
    // value here means an automated submission. No CAPTCHA needed.
    var trap = form.querySelector('input[name="website"]');
    if (trap && trap.value !== '') {
      return;   // silently ignore
    }

    RULES.forEach(function (rule) {
      var field = document.getElementById(rule.id);
      if (!field) { return; }
      clearError(field);
      if (!rule.test(field.value)) {
        showError(field, rule.message);
        problems.push({ id: rule.id, message: rule.message });
      }
    });

    if (problems.length > 0) {
      if (successBox) { successBox.hidden = true; }

      var count = problems.length;
      var heading = count === 1
        ? 'There is 1 problem with this form'
        : 'There are ' + count + ' problems with this form';

      var items = problems.map(function (p) {
        return '<li><a href="#' + p.id + '">' + p.message + '</a></li>';
      }).join('');

      summary.innerHTML = '<h2 id="error-summary-heading" tabindex="-1">' + heading +
        '</h2><p>Fix the items below and send the form again. Nothing you typed has been lost.</p><ul>' +
        items + '</ul>';
      summary.hidden = false;

      // Move focus to the summary so the problem is announced and the
      // links to each bad field are the next thing in the tab order.
      document.getElementById('error-summary-heading').focus();
      return;
    }

    // Success path.
    summary.hidden = true;
    summary.innerHTML = '';
    if (successBox) {
      successBox.hidden = false;
      var ref = 'REF-' + String(Date.now()).slice(-6);
      var refSlot = document.getElementById('success-ref');
      if (refSlot) { refSlot.textContent = ref; }
      document.getElementById('form-success-heading').focus();
    }
    form.reset();
  });

  // Re-validate a field once the visitor has had a chance to fix it,
  // so the error clears as soon as the problem is gone.
  RULES.forEach(function (rule) {
    var field = document.getElementById(rule.id);
    if (!field) { return; }
    field.addEventListener('blur', function () {
      if (field.getAttribute('aria-invalid') !== 'true') { return; }
      if (rule.test(field.value)) { clearError(field); }
    });
  });
}());
