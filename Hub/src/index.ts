import { marked } from 'marked';
import { patterns, Pattern, Category } from './patterns';
import '../style.css';

// ── State ────────────────────────────────────────────────────────────────────

let activeFilter: Category | 'all' = 'all';
let searchQuery = '';
let activeTab: 'demo' | 'docs' = 'demo';

// ── DOM refs ─────────────────────────────────────────────────────────────────

const grid        = document.getElementById('grid')!;
const overlay     = document.getElementById('overlay')!;
const modalName   = document.getElementById('modal-name')!;
const modalBadge  = document.getElementById('modal-badge')!;
const modalBody   = document.getElementById('modal-body')!;
const modalClose  = document.getElementById('modal-close')!;
const searchInput = document.getElementById('search') as HTMLInputElement;
const noResults   = document.getElementById('no-results')!;
const filterBtns  = document.querySelectorAll<HTMLButtonElement>('.filter-btn');

const tabDemo     = document.getElementById('tab-demo') as HTMLButtonElement;
const tabDocs     = document.getElementById('tab-docs') as HTMLButtonElement;
const panelDemo   = document.getElementById('panel-demo')!;
const panelDocs   = document.getElementById('panel-docs')!;
const demoFrame   = document.getElementById('demo-frame') as HTMLIFrameElement;
const demoLoading = document.getElementById('demo-loading')!;

// ── Helpers ───────────────────────────────────────────────────────────────────

function categoryLabel(c: Category): string {
  return c.charAt(0).toUpperCase() + c.slice(1);
}

function visiblePatterns(): Pattern[] {
  return patterns.filter(p => {
    const matchesFilter = activeFilter === 'all' || p.category === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q
      || p.name.toLowerCase().includes(q)
      || p.demo.toLowerCase().includes(q)
      || p.coreIdea.toLowerCase().includes(q)
      || p.category.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });
}

// ── Grid rendering ───────────────────────────────────────────────────────────

function renderGrid(): void {
  const visible = visiblePatterns();
  noResults.classList.toggle('hidden', visible.length > 0);
  grid.innerHTML = '';

  visible.forEach(p => {
    const card = document.createElement('article');
    card.className = `pattern-card category-${p.category}`;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    card.innerHTML = `
      <div class="card-accent"></div>
      <div class="card-body">
        <div class="card-top">
          <span class="category-badge badge-${p.category}">${categoryLabel(p.category)}</span>
          ${!p.hasDemo ? '<span class="no-demo-badge">No demo</span>' : ''}
        </div>
        <h3 class="card-name">${p.name}</h3>
        <p class="card-demo"><em>${p.demo}</em></p>
        <p class="card-idea">${p.coreIdea}</p>
      </div>
      <div class="card-footer">
        <span class="view-details">${p.hasDemo ? 'Open demo →' : 'View docs →'}</span>
      </div>
    `;

    card.addEventListener('click', () => openModal(p));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openModal(p);
    });

    grid.appendChild(card);
  });
}

// ── Tab switching ─────────────────────────────────────────────────────────────

function switchTab(tab: 'demo' | 'docs'): void {
  activeTab = tab;

  tabDemo.classList.toggle('active', tab === 'demo');
  tabDocs.classList.toggle('active', tab === 'docs');
  panelDemo.classList.toggle('hidden', tab !== 'demo');
  panelDocs.classList.toggle('hidden', tab !== 'docs');
}

// ── Modal open / close ────────────────────────────────────────────────────────

function openModal(p: Pattern): void {
  // Header
  modalName.textContent = p.name;
  modalBadge.textContent = categoryLabel(p.category);
  modalBadge.className = `category-badge badge-${p.category}`;

  // Docs tab — always render markdown
  modalBody.innerHTML = marked(p.markdown) as string;

  // Demo tab — load iframe if demo exists, otherwise force to docs
  if (p.hasDemo) {
    tabDemo.style.display = '';
    tabDemo.disabled = false;
    demoLoading.style.display = 'flex';
    demoFrame.style.opacity = '0';
    // Use a relative path so it resolves correctly both on localhost
    // and on GitHub Pages (where the site lives at /repo-name/, not /)
    demoFrame.src = `./${p.path}/index.html`;
    switchTab('demo');
  } else {
    tabDemo.style.display = 'none';
    demoFrame.src = '';
    switchTab('docs');
  }

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeModal(): void {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // Clear iframe so its JS/timers stop running
  demoFrame.src = '';
}

// ── Iframe load handler ───────────────────────────────────────────────────────

demoFrame.addEventListener('load', () => {
  // Hide loading indicator once iframe content has loaded
  demoLoading.style.display = 'none';
  demoFrame.style.opacity = '1';
});

// ── Event listeners ───────────────────────────────────────────────────────────

tabDemo.addEventListener('click', () => switchTab('demo'));
tabDocs.addEventListener('click', () => switchTab('docs'));

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter as Category | 'all';
    renderGrid();
  });
});

searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value;
  renderGrid();
});

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Init ──────────────────────────────────────────────────────────────────────

renderGrid();
