import { content } from '../data/content.js';
import { openLightbox } from './lightbox.js';

function folderSVG() {
  return `<svg viewBox="0 0 80 64" width="72" height="58" class="drop-shadow-sm transition-transform duration-200 group-hover:scale-105" aria-hidden="true">
    <path d="M4 12C4 7.58 7.58 4 12 4H28L36 14H68C72.42 14 76 17.58 76 22V52C76 56.42 72.42 60 68 60H12C7.58 60 4 56.42 4 52V12Z" fill="#FFD54A"/>
    <path d="M4 22H76V52C76 56.42 72.42 60 68 60H12C7.58 60 4 56.42 4 52V22Z" fill="#FFE066" opacity="0.6"/>
    <path d="M12 28H68V48H12V28Z" fill="#FFF280" opacity="0.4"/>
  </svg>`;
}

let lastActiveOpener = null;

export function openFolderDialog(categoryId, openerEl = null) {
  const dialog = document.getElementById('folder-dialog');
  const titleEl = document.getElementById('folder-dialog-title');
  const bodyEl = document.getElementById('folder-dialog-body');
  if (!dialog || !bodyEl) return;

  lastActiveOpener = openerEl;

  const category = content.projectCategories.find((c) => c.id === categoryId);
  if (titleEl) {
    titleEl.textContent = category ? category.label : 'Folder Content';
  }

  const items = content.projects[categoryId] || [];

  if (categoryId === 'docs') {
    bodyEl.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        ${items
          .map(
            (item, idx) => `
          <button type="button" class="doc-card text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pink-hot)] rounded-xl" data-index="${idx}">
            <div class="overflow-hidden rounded-xl border-2 border-pink-100 bg-white shadow-sm transition-transform duration-200 group-hover:-translate-y-1">
              <img src="${item.image}" alt="${item.alt}" class="w-full h-44 object-cover" loading="lazy" width="300" height="176" />
              <div class="p-3">
                <p class="font-pixel text-xs text-[var(--color-magenta)] font-bold">${item.caption}</p>
              </div>
            </div>
          </button>`,
          )
          .join('')}
      </div>`;

    bodyEl.querySelectorAll('.doc-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        const idx = Number(card.getAttribute('data-index'));
        openLightbox(items, idx, card);
      });
    });
  } else if (categoryId === 'certs') {
    bodyEl.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        ${items
          .map(
            (item, idx) => `
          <button type="button" class="cert-card text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pink-hot)] rounded-xl" data-index="${idx}">
            <div class="overflow-hidden rounded-xl border-2 border-yellow-200 bg-white shadow-sm transition-transform duration-200 group-hover:-translate-y-1">
              <img src="${item.image}" alt="${item.alt}" class="w-full h-44 object-cover" loading="lazy" width="300" height="176" />
              <div class="p-3">
                <p class="font-pixel text-xs text-[var(--color-year-green)] font-bold truncate">${item.title}</p>
                <p class="text-[0.7rem] text-[var(--color-body-green)] mt-0.5">${item.issuer} &bull; ${item.year}</p>
              </div>
            </div>
          </button>`,
          )
          .join('')}
      </div>`;

    bodyEl.querySelectorAll('.cert-card').forEach((card) => {
      card.addEventListener('click', () => {
        const idx = Number(card.getAttribute('data-index'));
        openLightbox(items, idx, card);
      });
    });
  } else {
    // Project cards (sifest, pkkmb, rental)
    bodyEl.innerHTML = `
      <div class="grid grid-cols-1 ${items.length > 1 ? 'md:grid-cols-2' : 'max-w-lg mx-auto'} gap-6">
        ${items
          .map(
            (proj) => `
          <div class="rounded-2xl border-2 border-pink-100 bg-white p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div class="overflow-hidden rounded-xl border border-pink-50 mb-4 bg-gray-50">
                <img src="${proj.image}" alt="${proj.title}" class="w-full h-44 object-cover" loading="lazy" width="300" height="176" />
              </div>
              <h3 class="font-pixel text-base font-bold text-[var(--color-magenta)]">${proj.title}</h3>
              <p class="text-xs text-[var(--color-body-green)] leading-relaxed mt-2">${proj.description}</p>
              <div class="flex flex-wrap gap-1.5 mt-3">
                ${proj.tech.map((t) => `<span class="pill-yellow !text-[0.65rem] !px-2 !py-0.5">${t}</span>`).join('')}
              </div>
            </div>
            ${
              proj.demo || proj.repo
                ? `
              <div class="flex items-center gap-3 mt-4 pt-3 border-t border-pink-100">
                ${proj.demo ? `<a href="${proj.demo}" target="_blank" rel="noopener noreferrer" class="pill-pink !text-xs !px-3 !py-1">Live Demo</a>` : ''}
                ${proj.repo ? `<a href="${proj.repo}" target="_blank" rel="noopener noreferrer" class="pill-yellow !text-xs !px-3 !py-1">Repository</a>` : ''}
              </div>`
                : ''
            }
          </div>`,
          )
          .join('')}
      </div>`;
  }

  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', '');
  }
  document.getElementById('folder-dialog-close')?.focus();
}

function renderFolders() {
  const container = document.getElementById('folder-grid');
  if (!container) return;

  container.innerHTML = content.projectCategories
    .map(
      (cat) => `
      <button
        type="button"
        class="folder-btn group flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pink-hot)] transition-all"
        data-folder="${cat.id}"
        aria-haspopup="dialog"
      >
        ${folderSVG()}
        <span class="font-script text-xl md:text-2xl text-[var(--color-toc-text-purple)] italic leading-tight text-center max-w-[130px]">
          ${cat.label}
        </span>
      </button>`,
    )
    .join('');

  container.querySelectorAll('.folder-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-folder');
      openFolderDialog(id, btn);
    });
  });
}

function renderPreviews() {
  // Documentation preview section
  const docPreview = document.getElementById('docs-preview-grid');
  if (docPreview) {
    const docs = content.projects.docs.slice(0, 6);
    docPreview.innerHTML = docs
      .map(
        (item, idx) => `
        <button type="button" class="doc-preview-item group text-left rounded-xl overflow-hidden border-2 border-pink-100 bg-white shadow-sm hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pink-hot)]" data-index="${idx}">
          <img src="${item.image}" alt="${item.alt}" class="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" width="240" height="144" />
          <div class="p-2.5">
            <p class="font-pixel text-xs text-[var(--color-magenta)] font-bold truncate">${item.caption}</p>
          </div>
        </button>`,
      )
      .join('');

    docPreview.querySelectorAll('.doc-preview-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-index'));
        openLightbox(content.projects.docs, idx, btn);
      });
    });
  }

  // Certificates preview section
  const certPreview = document.getElementById('certs-preview-grid');
  if (certPreview) {
    const certs = content.projects.certs.slice(0, 6);
    certPreview.innerHTML = certs
      .map(
        (item, idx) => `
        <button type="button" class="cert-preview-item group text-left rounded-xl overflow-hidden border-2 border-yellow-200 bg-white shadow-sm hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pink-hot)]" data-index="${idx}">
          <img src="${item.image}" alt="${item.alt}" class="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" width="240" height="144" />
          <div class="p-2.5">
            <p class="font-pixel text-xs text-[var(--color-year-green)] font-bold truncate">${item.title}</p>
            <p class="text-[0.7rem] text-[var(--color-body-green)] mt-0.5">${item.issuer} &bull; ${item.year}</p>
          </div>
        </button>`,
      )
      .join('');

    certPreview.querySelectorAll('.cert-preview-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-index'));
        openLightbox(content.projects.certs, idx, btn);
      });
    });
  }

  // View All buttons
  document.getElementById('view-all-docs')?.addEventListener('click', (e) => {
    openFolderDialog('docs', e.currentTarget);
  });
  document.getElementById('view-all-certs')?.addEventListener('click', (e) => {
    openFolderDialog('certs', e.currentTarget);
  });
}

export function init() {
  renderFolders();
  renderPreviews();

  const dialog = document.getElementById('folder-dialog');
  const closeBtn = document.getElementById('folder-dialog-close');
  if (dialog && closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
      lastActiveOpener?.focus();
    });

    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        if (typeof dialog.close === 'function') {
          dialog.close();
        } else {
          dialog.removeAttribute('open');
        }
        lastActiveOpener?.focus();
      }
    });

    dialog.addEventListener('close', () => {
      lastActiveOpener?.focus();
    });
  }
}
