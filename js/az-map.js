// Conscious-Healing LLC — A-Z region map filtering
// Loads js/BlankMap-World.svg (Wikimedia Commons "BlankMap-World", per-country
// paths/groups keyed by lowercase ISO 3166-1 alpha-2 id) and wires per-country
// click/hover to filter the A-Z herb library by region tag.

document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('az-world-map');
  const resultsPanel = document.getElementById('az-map-results');
  const resultsTitle = document.getElementById('az-map-results-title');
  const resultsList = document.getElementById('az-map-results-list');
  const clearBtn = document.getElementById('az-map-clear-filter');
  if (!mapContainer || !resultsPanel) return;

  // Europe (excluding transcontinental Russia, Turkey, Georgia, Armenia) + US/Canada.
  const WESTERN_EUROPEAN_CODES = [
    'ad', 'al', 'at', 'ba', 'be', 'bg', 'by', 'ch', 'cy', 'cz', 'de', 'dk', 'ee',
    'es', 'fi', 'fo', 'fr', 'gb', 'gg', 'gi', 'gr', 'hr', 'hu', 'ie', 'im', 'is',
    'it', 'je', 'li', 'lt', 'lu', 'lv', 'mc', 'md', 'me', 'mk', 'mt', 'nl', 'no',
    'pl', 'pt', 'ro', 'rs', 'se', 'si', 'sk', 'sm', 'ua', 'va', 'xk',
    'us', 'ca'
  ];

  const AFRICA_CODES = [
    'ao', 'bf', 'bi', 'bj', 'bw', 'cd', 'cf', 'cg', 'ci', 'cm', 'cv', 'dj', 'dz',
    'eg', 'eh', 'er', 'et', 'ga', 'gh', 'gm', 'gn', 'gq', 'gw', 'ke', 'km', 'lr',
    'ls', 'ly', 'ma', 'mg', 'ml', 'mr', 'mu', 'mw', 'mz', 'na', 'ne', 'ng', 'rw',
    'sc', 'sd', 'sl', 'sn', 'so', 'ss', 'st', 'sz', 'td', 'tg', 'tn', 'tz', 'ug',
    'za', 'zm', 'zw'
  ];

  const REGION_COUNTRIES = {
    'western-european': WESTERN_EUROPEAN_CODES,
    china: ['cn'],
    india: ['in'],
    africa: AFRICA_CODES,
    'russia-siberia': ['ru']
  };

  const regionLabels = {
    'western-european': 'Western/European',
    china: 'China',
    india: 'India (Ayurveda)',
    africa: 'Africa',
    'russia-siberia': 'Russia/Siberia'
  };

  const regionTagPrefixes = {
    'western-european': 'Western/European',
    china: 'China',
    india: 'India',
    africa: 'Africa',
    'russia-siberia': 'Russia/Siberia'
  };

  const countryToRegion = {};
  Object.keys(REGION_COUNTRIES).forEach((region) => {
    REGION_COUNTRIES[region].forEach((code) => {
      countryToRegion[code] = region;
    });
  });

  function getNativeNameForRegion(item, region) {
    const prefix = regionTagPrefixes[region];
    if (!prefix) return null;
    const tags = item.querySelectorAll('.az-region-tag');
    for (const tag of tags) {
      const text = tag.textContent.trim();
      if (text.indexOf(prefix) === 0) {
        const match = text.match(/\(([^)]+)\)/);
        return match ? match[1] : null;
      }
    }
    return null;
  }

  // A country is either a single <path id="xx" class="landxx xx"> or a
  // <g id="xx"> wrapping several <path class="landxx xx"> sub-shapes (islands,
  // exclaves). Each sub-shape carries its own "landxx" class directly, so a
  // fill set only on the wrapping <g> would be overridden by its children's
  // own class rule. Mark every "landxx" descendant (plus the element itself)
  // active so multi-part countries highlight as a whole.
  function setActiveCountry(countryEl) {
    mapContainer.querySelectorAll('.az-country-active').forEach((el) => el.classList.remove('az-country-active'));
    if (!countryEl) return;
    if (countryEl.classList.contains('landxx')) countryEl.classList.add('az-country-active');
    countryEl.querySelectorAll('.landxx').forEach((el) => el.classList.add('az-country-active'));
  }

  function clearFilter() {
    setActiveCountry(null);
    document.querySelectorAll('.framework-accordion-item[data-regions]').forEach((item) => {
      item.hidden = false;
    });
    document.querySelectorAll('.az-letter-group').forEach((group) => {
      group.hidden = false;
    });
    resultsPanel.hidden = true;
  }

  function applyFilter(region, activeEl) {
    setActiveCountry(activeEl);

    const matches = [];
    document.querySelectorAll('.framework-accordion-item[data-regions]').forEach((item) => {
      const itemRegions = (item.dataset.regions || '').split(/\s+/);
      const isMatch = itemRegions.indexOf(region) !== -1;
      item.hidden = !isMatch;

      if (isMatch) {
        const toggle = item.querySelector('.framework-accordion-toggle');
        const panel = item.querySelector('.framework-accordion-panel');
        if (panel && panel.hidden) {
          panel.hidden = false;
          toggle.setAttribute('aria-expanded', 'true');
          item.classList.add('open');
        }
        const herbName = item.querySelector('.framework-accordion-toggle span').textContent.trim();
        const letterGroup = item.closest('.az-letter-group');
        matches.push({
          name: herbName,
          nativeName: getNativeNameForRegion(item, region),
          anchor: letterGroup ? '#' + letterGroup.id : '#'
        });
      }
    });

    document.querySelectorAll('.az-letter-group').forEach((group) => {
      const visibleItems = group.querySelectorAll('.framework-accordion-item[data-regions]:not([hidden])');
      group.hidden = visibleItems.length === 0;
    });

    resultsTitle.textContent = 'Showing: ' + (regionLabels[region] || region);

    let emptyNote = resultsPanel.querySelector('.az-map-results-empty');
    if (matches.length) {
      resultsList.hidden = false;
      resultsList.innerHTML = matches
        .map((m) => {
          const label = m.nativeName ? m.name + ' — ' + m.nativeName : m.name;
          return '<li><a href="' + m.anchor + '">' + label + '</a></li>';
        })
        .join('');
      if (emptyNote) emptyNote.remove();
    } else {
      resultsList.hidden = true;
      resultsList.innerHTML = '';
      if (!emptyNote) {
        emptyNote = document.createElement('p');
        emptyNote.className = 'az-map-results-empty';
        resultsPanel.insertBefore(emptyNote, clearBtn);
      }
      emptyNote.textContent = 'No herbs tagged in this region yet — check back as the library grows.';
    }

    resultsPanel.hidden = false;
    resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Walk up from the clicked element to find the nearest ancestor (or self)
  // whose id is a bare two-letter ISO code (countries with multiple parts —
  // islands, exclaves — are grouped under a <g id="xx"> whose children are
  // individual <path> elements with their own, unrelated ids).
  function findCountryElement(el) {
    let node = el;
    while (node && node !== mapContainer) {
      if (node.id && /^[a-z]{2}$/.test(node.id)) return node;
      node = node.parentElement;
    }
    return null;
  }

  function onMapClick(e) {
    const countryEl = findCountryElement(e.target);
    if (!countryEl) return;
    const region = countryToRegion[countryEl.id];
    if (region) {
      applyFilter(region, countryEl);
    } else {
      // Recognized country, but not yet part of any tagged region bucket.
      setActiveCountry(countryEl);
      document.querySelectorAll('.framework-accordion-item[data-regions]').forEach((item) => {
        item.hidden = true;
      });
      document.querySelectorAll('.az-letter-group').forEach((group) => {
        group.hidden = true;
      });
      resultsTitle.textContent = 'Showing: this region';
      resultsList.hidden = true;
      resultsList.innerHTML = '';
      let emptyNote = resultsPanel.querySelector('.az-map-results-empty');
      if (!emptyNote) {
        emptyNote = document.createElement('p');
        emptyNote.className = 'az-map-results-empty';
        resultsPanel.insertBefore(emptyNote, clearBtn);
      }
      emptyNote.textContent = 'No herbs tagged in this region yet — check back as the library grows.';
      resultsPanel.hidden = false;
      resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  fetch('js/BlankMap-World.svg')
    .then((res) => res.text())
    .then((svgText) => {
      mapContainer.innerHTML = svgText;
      const svg = mapContainer.querySelector('svg');
      if (!svg) return;
      if (!svg.getAttribute('viewBox')) {
        const w = svg.getAttribute('width') || '2754';
        const h = svg.getAttribute('height') || '1398';
        svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      }
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.setAttribute('aria-hidden', 'true');

      mapContainer.addEventListener('click', onMapClick);
    })
    .catch(() => {
      mapContainer.innerHTML = '<p class="az-map-loading">The map couldn&rsquo;t be loaded.</p>';
    });

  if (clearBtn) clearBtn.addEventListener('click', clearFilter);
});
