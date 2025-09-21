// layouts/dashboard3-layout-component.js
// @ts-check
import { h, toChildArray } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';
const html = htm.bind(h);

/**
 * @typedef {object} Dashboard3LayoutProps
 * @property {import('preact').ComponentChildren} children
 * @property {string} [rowHeight]  // e.g. '200px' (default)
 */

/**
 * Simple 2 columns × 3 rows grid.
 * - Children auto-flow left→right, top→bottom.
 * - Zero vertical gap; horizontal gap for breathing room.
 * - Each child is wrapped to prevent overflow inside its cell.
 */
export default function Dashboard3LayoutComponent(
    /** @type {Dashboard3LayoutProps} */ { children, rowHeight = '200px' }
) {
    const kids = toChildArray(children);

    return html`
    <div>
      <style>
        .dashboard3-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
        .grid-child {
          min-height: 0;
          overflow: hidden;
        }
      </style>

      <div
        class="w-full dashboard3-grid gap-x-8"
        style=${{
        gridTemplateRows: `repeat(3, ${rowHeight})`,
        rowGap: '0px'
    }}
      >
        ${kids.map(child => html`<div class="grid-child">${child}</div>`)}
      </div>
    </div>
  `;
}
