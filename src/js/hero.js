import { content } from '../data/content.js';

export function init() {
  const { profile } = content;

  const nameEl = document.getElementById('hero-name');
  if (nameEl) nameEl.textContent = profile.heroGreeting;

  const yearEl = document.getElementById('hero-year');
  if (yearEl) yearEl.textContent = profile.year;

  const roleEl = document.getElementById('hero-role');
  if (roleEl) roleEl.textContent = profile.role;

  const tagEl = document.getElementById('hero-tagline');
  if (tagEl) tagEl.textContent = profile.tagline;
}
