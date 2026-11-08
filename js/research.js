// Conscious-Healing LLC — Research Register page
//
// Draws one collapsible row per year (START_YEAR through END_YEAR), grouped by
// decade, and fills each row with that year's findings from window.CH_RESEARCH
// (js/research-data.js). A row's findings are only built the first time it is
// opened, so the page stays light however many findings the register grows to.
//
// Only findings whose websiteReadiness starts with "Ready" are shown publicly.

document.addEventListener('DOMContentLoaded', function () {
  var START_YEAR = 1900;
  var END_YEAR = 2026;

  var root = document.getElementById('research-years');
  if (!root) return;
  var summary = document.getElementById('research-summary');
  var raw = Array.isArray(window.CH_RESEARCH) ? window.CH_RESEARCH : [];

  // ---- Group the publicly listable findings by year ----------------------

  function isListed(entry) {
    return !!entry && typeof entry.websiteReadiness === 'string' &&
      /^ready\b/i.test(entry.websiteReadiness.trim());
  }

  function yearOf(entry) {
    if (Number.isInteger(entry.year)) return entry.year;
    var m = /^(\d{4})/.exec(String(entry.publicationDate || '').trim());
    return m ? parseInt(m[1], 10) : null;
  }

  var byYear = {};
  var listedCount = 0;
  raw.forEach(function (entry) {
    if (!isListed(entry)) return;
    var y = yearOf(entry);
    if (y === null || y < START_YEAR || y > END_YEAR) {
      console.warn('Research Register: finding not shown, its publication year is missing or outside ' +
        START_YEAR + '-' + END_YEAR + ':', entry.id || entry);
      return;
    }
    (byYear[y] = byYear[y] || []).push(entry);
    listedCount++;
  });
  Object.keys(byYear).forEach(function (y) {
    byYear[y].sort(function (a, b) {
      return String(a.publicationDate || '').localeCompare(String(b.publicationDate || '')) ||
        String(a.id || '').localeCompare(String(b.id || ''));
    });
  });

  // ---- Small DOM helpers (text is always set via textContent) -----------

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function hasText(v) {
    return v !== undefined && v !== null && String(v).trim() !== '';
  }

  function missing(dd) {
    dd.className = 'research-missing';
    dd.textContent = 'Not recorded';
    return dd;
  }

  function safeHref(url) {
    try {
      var u = new URL(String(url), window.location.href);
      return (u.protocol === 'https:' || u.protocol === 'http:') ? u.href : null;
    } catch (e) {
      return null;
    }
  }

  function sourceNode(src) {
    var url = typeof src === 'string' ? src : (src && src.url);
    var label = (src && typeof src === 'object' && hasText(src.label)) ? String(src.label).trim() : null;
    var href = safeHref(url);
    if (!href) return el('span', 'research-missing', label || 'Link unavailable');
    var a = el('a', null, (label || href) + ' ↗');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    return a;
  }

  // ---- One finding: ID + title header, then the remaining fields --------

  var FIELDS = [
    ['Institution', 'institution', 'text'],
    ['Country', 'country', 'text'],
    ['Publication date', 'publicationDate', 'text'],
    ['Research subject', 'subject', 'text'],
    ['Findings', 'findings', 'text'],
    ['Limitations', 'limitations', 'text'],
    ['Evidence classification', 'evidenceClassification', 'text'],
    ['Original source', 'originalSource', 'source'],
    ['Additional sources', 'additionalSources', 'sources'],
    ['Review status', 'reviewStatus', 'text'],
    ['Website readiness', 'websiteReadiness', 'text']
  ];

  function fieldValue(entry, key, kind) {
    var dd = el('dd');
    var v = entry[key];

    if (kind === 'source') {
      if (!v) return missing(dd);
      dd.appendChild(el('p')).appendChild(sourceNode(v));
      return dd;
    }

    if (kind === 'sources') {
      var list = Array.isArray(v) ? v.filter(Boolean) : [];
      if (!list.length) {
        dd.className = 'research-missing';
        dd.textContent = 'None listed';
        return dd;
      }
      var ul = el('ul', 'research-sources');
      list.forEach(function (src) {
        ul.appendChild(el('li')).appendChild(sourceNode(src));
      });
      dd.appendChild(ul);
      return dd;
    }

    var parts = (Array.isArray(v) ? v : [v]).filter(hasText);
    if (!parts.length) return missing(dd);
    parts.forEach(function (p) { dd.appendChild(el('p', null, String(p).trim())); });
    return dd;
  }

  function buildFinding(entry) {
    var card = el('article', 'research-finding');

    var head = el('header', 'research-finding-head');
    head.appendChild(el('span', 'research-finding-id', 'Research ID · ' + (hasText(entry.id) ? String(entry.id).trim() : 'Not recorded')));
    head.appendChild(el('h3', 'research-finding-title', hasText(entry.title) ? String(entry.title).trim() : 'Title not recorded'));
    card.appendChild(head);

    var dl = el('dl', 'research-fields');
    FIELDS.forEach(function (f) {
      dl.appendChild(el('dt', null, f[0]));
      dl.appendChild(fieldValue(entry, f[1], f[2]));
    });
    card.appendChild(dl);
    return card;
  }

  // ---- One year row ------------------------------------------------------

  function fillPanel(panel, year) {
    var entries = byYear[year] || [];
    if (!entries.length) {
      panel.appendChild(el('p', 'research-year-empty', 'No findings have been registered for ' + year + ' yet.'));
    } else {
      entries.forEach(function (entry) { panel.appendChild(buildFinding(entry)); });
    }
    panel.setAttribute('data-filled', 'true');
  }

  function setOpen(item, open) {
    var btn = item.querySelector('.research-year-toggle');
    var panel = item.querySelector('.research-year-panel');
    if (open && !panel.hasAttribute('data-filled')) fillPanel(panel, parseInt(item.id.slice(5), 10));
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    item.classList.toggle('open', open);
  }

  function buildYear(year) {
    var count = (byYear[year] || []).length;
    var item = el('div', 'research-year');
    item.id = 'year-' + year;

    var btn = el('button', 'research-year-toggle');
    btn.type = 'button';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'year-panel-' + year);
    btn.appendChild(el('span', 'research-year-label', String(year)));
    btn.appendChild(el('span', 'research-year-count' + (count ? ' has-entries' : ''),
      count ? count + (count === 1 ? ' finding' : ' findings') : 'No entries'));
    var caret = el('span', 'research-year-caret', '▾');
    caret.setAttribute('aria-hidden', 'true');
    btn.appendChild(caret);

    var panel = el('div', 'research-year-panel');
    panel.id = 'year-panel-' + year;
    panel.hidden = true;

    item.appendChild(btn);
    item.appendChild(panel);
    return item;
  }

  // ---- Build the page ----------------------------------------------------

  for (var decade = Math.floor(START_YEAR / 10) * 10; decade <= END_YEAR; decade += 10) {
    var block = el('div', 'research-decade');
    var heading = el('h2', 'research-decade-heading', decade + 's');
    heading.id = 'decade-' + decade + 's';
    block.appendChild(heading);
    for (var y = Math.max(decade, START_YEAR); y <= Math.min(decade + 9, END_YEAR); y++) {
      block.appendChild(buildYear(y));
    }
    root.appendChild(block);
  }

  if (summary) {
    summary.textContent = (END_YEAR - START_YEAR + 1) + ' years, ' + START_YEAR + '–' + END_YEAR +
      ' · ' + listedCount + (listedCount === 1 ? ' finding' : ' findings') + ' registered so far';
  }

  root.addEventListener('click', function (e) {
    var btn = e.target.closest('.research-year-toggle');
    if (!btn) return;
    setOpen(btn.closest('.research-year'), btn.getAttribute('aria-expanded') !== 'true');
  });

  // A link like research.html#year-1987 opens and scrolls to that year.
  function openFromHash() {
    var m = /^#year-(\d{4})$/.exec(window.location.hash);
    if (!m) return;
    var item = document.getElementById('year-' + m[1]);
    if (!item) return;
    setOpen(item, true);
    item.scrollIntoView();
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);
});
