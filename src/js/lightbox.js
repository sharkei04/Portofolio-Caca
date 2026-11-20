import { animateLightboxOpen, animateLightboxChange } from './animations/lightbox.js';

let _items      = [];
let _index      = 0;
let _openerEl   = null;

function getImg()     { return document.getElementById('lightbox-img'); }
function getCaption() { return document.getElementById('lightbox-caption'); }
function getCounter() { return document.getElementById('lightbox-counter'); }
function getPrev()    { return document.getElementById('lightbox-prev'); }
function getNext()    { return document.getElementById('lightbox-next'); }
function getLB()      { return document.getElementById('lightbox'); }

function render(animate = false, direction = 1) {
  const item = _items[_index];
  if (!item) return;

  const updateDom = () => {
    const img = getImg();
    if (img) {
      img.src = item.image ?? item.src ?? '';
      img.alt = item.alt ?? item.caption ?? item.title ?? '';
    }

    const caption = getCaption();
    if (caption) caption.textContent = item.caption ?? item.title ?? '';

    const counter = getCounter();
    if (counter) counter.textContent = `${_index + 1} / ${_items.length}`;

    const prevBtn = getPrev();
    if (prevBtn) prevBtn.disabled = _index === 0;

    const nextBtn = getNext();
    if (nextBtn) nextBtn.disabled = _index === _items.length - 1;
  };

  if (animate) {
    animateLightboxChange(getImg(), updateDom, direction);
  } else {
    updateDom();
  }
}

function prev() {
  if (_index > 0) {
    _index--;
    render(true, -1);
  }
}

function next() {
  if (_index < _items.length - 1) {
    _index++;
    render(true, 1);
  }
}

function close() {
  const lb = getLB();
  if (lb) lb.setAttribute('aria-hidden', 'true');
  document.removeEventListener('keydown', handleKey);
  _openerEl?.focus();
}

function handleKey(e) {
  if (e.key === 'Escape')     close();
  if (e.key === 'ArrowLeft')  prev();
  if (e.key === 'ArrowRight') next();
}

export function openLightbox(items, startIndex, openerEl) {
  _items    = items;
  _index    = startIndex;
  _openerEl = openerEl ?? null;

  render(false);

  const lb = getLB();
  if (lb) lb.removeAttribute('aria-hidden');
  document.addEventListener('keydown', handleKey);
  document.getElementById('lightbox-close')?.focus();

  animateLightboxOpen(getImg());
}

export function init() {
  const lb = getLB();
  if (!lb) return;

  document.getElementById('lightbox-close')?.addEventListener('click', close);
  document.getElementById('lightbox-prev')?.addEventListener('click', prev);
  document.getElementById('lightbox-next')?.addEventListener('click', next);

  lb.addEventListener('click', (e) => {
    if (e.target === lb) close();
  });
}
