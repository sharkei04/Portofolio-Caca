import { content } from '../data/content.js';
import { Icons } from './icons.js';

export function init() {
  const container = document.getElementById('contact-links-section');
  if (!container) return;

  container.innerHTML = content.socialLinks
    .filter((link) => link.url)
    .map(
      (link) => `
      <a
        href="${link.url}"
        target="_blank"
        rel="noopener noreferrer"
        class="contact-link-btn"
        aria-label="${link.label}"
      >
        ${Icons[link.icon]('w-5 h-5')}
        <span>${link.label}</span>
      </a>`,
    )
    .join('');
}
