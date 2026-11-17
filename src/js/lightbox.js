let _items      = [];
let _index      = 0;
let _openerEl   = null;

function getImg()     { return document.getElementById('lightbox-img'); }
function getCaption() { return document.getElementById('lightbox-caption'); }
function getCounter() { return document.getElementById('lightbox-counter'); }
function getPrev()    { return document.getElementById('lightbox-prev'); }
function getNext()    { return document.getElementById('lightbox-next'); }
function getLB()      { return document.getElementById('lightbox'); }

function render() {
  const item = _items[_index];
  if (!item) return;

  const img = getImg();
  img.src = item.image ?? item.src ?? '';
  img.alt = item.alt ?? item.caption ?? item.title ?? '';

  getCaption().textContent = item.caption ?? item.title ?? '';
  getCounter().textContent = `${_index + 1} / ${_items.length}`;
  getPrev().disabled = _index === 0;
  getNext().disabled = _index === _items.length - 1;
}

function prev() {
  if (_index > 0) { _index--; render(); }
}

function next() {
  if (_index < _items.length - 1) { _index++; render(); }
}

function close() {
  const lb = getLB();
  lb.setAttribute('aria-hidden', 'true');
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

  render();

  const lb = getLB();
  lb.removeAttribute('aria-hidden');
  document.addEventListener('keydown', handleKey);
  document.getElementById('lightbox-close')?.focus();
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
