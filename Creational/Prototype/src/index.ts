// Prototype Pattern — Entry point / client

import { MenuItem } from "./models/MenuItem";
import { setupModal } from "../../../shared/dom-utils";

// ── Objects ────────────────────────────────────────────────────────────────────

const proto = new MenuItem("Home", "🏠", "#", true);

const item1 = proto.clone();
item1.label = "About";
item1.icon  = "👤";
item1.link  = "about.html";

const item2 = proto.clone();
item2.label = "Services";
item2.icon  = "⚙️";
item2.link  = "services.html";

// ── Card renderer ──────────────────────────────────────────────────────────────

type PropDef = { key: string; value: string; overridden: boolean };

function propsOf(item: MenuItem, overrides: (keyof MenuItem)[]): PropDef[] {
  return [
    { key: "label",     value: `"${item.label}"`,      overridden: overrides.includes("label") },
    { key: "icon",      value: `"${item.icon}"`,       overridden: overrides.includes("icon") },
    { key: "link",      value: `"${item.link}"`,       overridden: overrides.includes("link") },
    { key: "isVisible", value: String(item.isVisible),  overridden: overrides.includes("isVisible") },
  ];
}

function propRowHtml(prop: PropDef, isProto: boolean): string {
  const rowCls  = !isProto && prop.overridden ? "overridden" : "inherited";
  const tagCls  = isProto ? "base-tag" : prop.overridden ? "override-tag" : "inherit-tag";
  const tagText = isProto ? "base"     : prop.overridden ? "override"     : "inherited";
  return `<div class="prop-row ${rowCls}">
    <span class="prop-key">${prop.key}</span>
    <span class="prop-value">${prop.value}</span>
    <span class="prop-tag ${tagCls}">${tagText}</span>
  </div>`;
}

function renderCard(
  id: string, varName: string, item: MenuItem,
  overrides: (keyof MenuItem)[], isProto: boolean
): void {
  const el = document.getElementById(id);
  if (!el) return;
  const badge = isProto
    ? `<span class="card-badge proto-badge">new MenuItem(…)</span>`
    : `<span class="card-badge clone-badge">.clone()</span>`;
  const rows = propsOf(item, overrides).map(p => propRowHtml(p, isProto)).join("");
  el.innerHTML = `
    <div class="card-header">
      <span class="card-var">${varName}</span>
      ${badge}
    </div>
    <div class="prop-list">${rows}</div>`;
}

renderCard("prototype-card", "baseMenuItemPrototype", proto, [], true);
renderCard("clone1-card",    "menuItem1",             item1, ["label", "icon", "link"], false);
renderCard("clone2-card",    "menuItem2",             item2, ["label", "icon", "link"], false);

// ── Mini browser modal ─────────────────────────────────────────────────────────

const pageOverlay  = document.getElementById("page-overlay")!;
const modalFrame   = document.getElementById("modal-frame") as HTMLIFrameElement;
const modalUrl     = document.getElementById("modal-url")!;
const modalCloseBtn = document.getElementById("modal-close-btn")!;

function openPageModal(href: string): void {
  modalUrl.textContent = href;
  modalFrame.src = href;
  pageOverlay.classList.remove("hidden");
}

function closePageModal(): void {
  pageOverlay.classList.add("hidden");
  modalFrame.src = "";
}

setupModal(pageOverlay, modalCloseBtn, closePageModal);

// ── Menu ───────────────────────────────────────────────────────────────────────

const container = document.getElementById("menu-container");
if (container) {
  [item1, item2].filter(i => i.isVisible).forEach(item => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `<a href="${item.link}">
      <span class="menu-icon">${item.icon}</span>
      <span>${item.label}</span>
      <span class="external-indicator">↗</span>
    </a>`;
    div.querySelector("a")!.addEventListener("click", e => {
      e.preventDefault();
      openPageModal(item.link);
    });
    container.appendChild(div);
  });
}
