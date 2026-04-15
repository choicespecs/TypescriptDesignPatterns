/**
 * Shared DOM utility functions used across multiple design pattern demos.
 *
 * Import path from any pattern's src/index.ts:
 *   import { appendListItem, setupModal } from "../../../shared/dom-utils";
 */

/**
 * Creates an <li> element with the given text and appends it to container.
 * No-op if container is null or undefined.
 */
export function appendListItem(
  container: Element | null | undefined,
  text: string
): void {
  if (!container) return;
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(text));
  container.appendChild(li);
}

/**
 * Wires three close events for a modal overlay:
 *   - close button click
 *   - click outside (on overlay itself)
 *   - Escape key
 */
export function setupModal(
  overlay: HTMLElement,
  closeBtn: HTMLElement,
  onClose: () => void
): void {
  closeBtn.addEventListener("click", onClose);
  overlay.addEventListener("click", e => { if (e.target === overlay) onClose(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") onClose(); });
}
