// Conscious-Healing LLC — shop behavior
// Cart, checkout, and customer accounts (login, order history, saved
// addresses) are handled by Snipcart via data-attributes in shop.html and
// product.html — see the snipcart script embed near the end of <body>.
// Favorites are a lightweight client-side feature stored in localStorage,
// since Snipcart does not provide a wishlist API.

const FAVORITES_KEY = 'ch_favorites';

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveFavorites(ids) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

function toggleFavorite(productId, button) {
  const favorites = getFavorites();
  const index = favorites.indexOf(productId);

  if (index === -1) {
    favorites.push(productId);
    button.classList.add('active');
  } else {
    favorites.splice(index, 1);
    button.classList.remove('active');
  }

  saveFavorites(favorites);
}

function initQuantitySelectors() {
  document.querySelectorAll('[data-quantity-select]').forEach((select) => {
    const container = select.closest('.product-detail-info') || select.parentElement;
    const addButton = container ? container.querySelector('.snipcart-add-item') : null;
    const priceDisplay = container ? container.querySelector('.bundle-price-display') : null;
    if (!addButton) return;

    function applyOption(optionEl) {
      addButton.dataset.itemId = optionEl.dataset.id;
      addButton.dataset.itemPrice = optionEl.dataset.price;
      addButton.dataset.itemName = optionEl.dataset.name;
      addButton.dataset.itemDescription = optionEl.dataset.description || '';
      if (priceDisplay) priceDisplay.textContent = '$' + optionEl.dataset.price;
    }

    select.addEventListener('change', () => {
      applyOption(select.options[select.selectedIndex]);
    });
  });
}

// "Back to Your Results" — shown alongside (not instead of) the regular
// "Back to Shop" link when a herb page is reached from the Gnōthi Seautón
// quiz results (via ?from=gnothi) or when a saved reading already exists in
// localStorage, so it also shows up for a direct/bookmarked visit. This
// reads the same 'ch_gnothi_results' key gnothi.js writes to, duplicated
// here in minimal form since gnothi.js itself isn't loaded on product pages.
const GNOTHI_RESULTS_KEY = 'ch_gnothi_results';

function cameFromGnothiQuiz() {
  const fromParam = new URLSearchParams(window.location.search).get('from') === 'gnothi';
  if (fromParam) return true;

  try {
    const raw = localStorage.getItem(GNOTHI_RESULTS_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.answers) && parsed.answers.length > 0;
  } catch (e) {
    return false;
  }
}

function initBackToResultsLink() {
  const backToShopLink = document.getElementById('back-to-shop-link');
  if (!backToShopLink || !cameFromGnothiQuiz()) return;

  const backToResultsLink = document.createElement('a');
  backToResultsLink.href = 'gnothi-seauton.html';
  backToResultsLink.style.cssText = 'font-size: 0.85rem; color: var(--ink-soft); margin-left: 16px;';
  backToResultsLink.textContent = '← Back to Your Results';

  backToShopLink.insertAdjacentElement('afterend', backToResultsLink);
}

document.addEventListener('DOMContentLoaded', () => {
  const favorites = getFavorites();

  document.querySelectorAll('.fav-btn').forEach((button) => {
    const productId = button.dataset.productId;
    if (favorites.includes(productId)) button.classList.add('active');

    button.addEventListener('click', () => toggleFavorite(productId, button));
  });

  initQuantitySelectors();
  initBackToResultsLink();
});
