(function () {
  'use strict';

  const app = document.getElementById('app');

  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    let content;
    try {
      const res = await fetch('content.json', { cache: 'no-cache' });
      content = await res.json();
    } catch (err) {
      console.error('Could not load content.json', err);
      content = null;
    }

    if (content) {
      renderWelcome(content);
      renderBirthdayNote(content);
      renderOpenWhen(content);
      renderMemories(content.memories || []);
      renderFooter(content);
    }

    setupComeInButton();
    setupOverlays();

    requestAnimationFrame(() => {
      app.classList.add('is-visible');
      app.classList.remove('is-loading');
    });
  }

  function renderWelcome(content) {
    const titleEl = document.getElementById('site-title');
    const messageEl = document.getElementById('welcome-message');
    if (content.siteTitle) {
      titleEl.textContent = content.siteTitle;
      document.title = content.siteTitle;
    }
    if (content.welcomeMessage) {
      messageEl.textContent = content.welcomeMessage;
    }
  }

  function setupComeInButton() {
    const btn = document.getElementById('come-in-btn');
    btn.addEventListener('click', () => {
      const target = document.getElementById('open-when');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // ---------- Open When cards ----------

  function renderOpenWhen(content) {
    const introEl = document.getElementById('open-when-intro');
    introEl.textContent = content.openWhenIntro || '';

    const grid = document.getElementById('open-when-grid');
    grid.innerHTML = '';

    const cards = content.openWhen || [];
    cards.forEach((card) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'open-when-card';
      btn.textContent = card.label || '';
      btn.addEventListener('click', () => openNote(card));
      grid.appendChild(btn);
    });
  }

  function openNote(card) {
    const overlay = document.getElementById('note-overlay');
    const titleEl = document.getElementById('note-card-title');
    const messageEl = document.getElementById('note-card-message');
    const imageEl = document.getElementById('note-card-image');

    titleEl.textContent = card.label || '';
    messageEl.textContent = card.message || '';

    if (card.image) {
      imageEl.src = card.image;
      imageEl.alt = card.label || '';
      imageEl.hidden = false;
    } else {
      imageEl.hidden = true;
      imageEl.removeAttribute('src');
    }

    showOverlay(overlay);
  }

  // ---------- Memory Lane ----------

  function renderMemories(memories) {
    const grid = document.getElementById('memory-grid');
    grid.innerHTML = '';

    memories.forEach((image, index) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'memory-card';

      const imageWrap = document.createElement('div');
      imageWrap.className = 'memory-card__image-wrap';

      const img = document.createElement('img');
      img.src = image;
      img.alt = `Memory photo ${index + 1}`;
      img.loading = 'lazy';
      imageWrap.appendChild(img);

      card.appendChild(imageWrap);

      card.addEventListener('click', () => openLightbox(image));

      grid.appendChild(card);
    });
  }

  function openLightbox(image) {
    const overlay = document.getElementById('lightbox-overlay');
    const imageEl = document.getElementById('lightbox-image');

    imageEl.src = image;
    imageEl.alt = '';

    showOverlay(overlay);
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  // ---------- Happy Birthday Note ----------

  function renderBirthdayNote(content) {
    const titleEl = document.getElementById('birthday-note-title');
    const messageEl = document.getElementById('birthday-note-message');
    if (content.birthdayHeading) {
      titleEl.textContent = content.birthdayHeading;
    }
    messageEl.textContent = content.birthdayNote || '';
  }

  // ---------- Footer ----------

  function renderFooter(content) {
    const updatedEl = document.getElementById('footer-updated');
    if (content.lastUpdated) {
      updatedEl.textContent = 'last updated ' + formatDate(content.lastUpdated);
    }
  }

  // ---------- Overlays ----------

  function setupOverlays() {
    const noteOverlay = document.getElementById('note-overlay');
    const lightboxOverlay = document.getElementById('lightbox-overlay');

    document.querySelectorAll('[data-close-overlay]').forEach((el) => {
      el.addEventListener('click', () => hideOverlay(noteOverlay));
    });

    document.querySelectorAll('[data-close-lightbox]').forEach((el) => {
      el.addEventListener('click', () => hideOverlay(lightboxOverlay));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (!noteOverlay.hidden) hideOverlay(noteOverlay);
      if (!lightboxOverlay.hidden) hideOverlay(lightboxOverlay);
    });
  }

  function showOverlay(overlay) {
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function hideOverlay(overlay) {
    overlay.hidden = true;
    document.body.style.overflow = '';
  }
})();
