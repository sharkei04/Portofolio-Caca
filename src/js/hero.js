import { content } from '../data/content.js';

export function init() {
  const { profile } = content;

  const nameEl = document.getElementById('hero-name');
  if (nameEl) nameEl.textContent = profile.name;

  const yearEl = document.getElementById('hero-year');
  if (yearEl) yearEl.textContent = profile.year;

  const roleEl = document.getElementById('hero-role');
  if (roleEl) roleEl.textContent = profile.tagline;
}
