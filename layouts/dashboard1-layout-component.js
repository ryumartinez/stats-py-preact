// layouts/dashboard1-layout-component.js
// @ts-check
import { h, toChildArray } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';
const html = htm.bind(h);

/**
 * @typedef {object} Dashboard1LayoutProps
 * @property {import('preact').ComponentChildren} children
 * @property {string} [rowHeight]  // e.g. '200px' (default)
 */

/**
 * 3 cols × 4 rows:
 *  1) Left top      -> cols 1–2, row 1
 *  2) Left middle   -> cols 1–2, row 2
 *  3) Left bottom   -> cols 1–2, row 3
 *  4) Tall right    -> col 3,   rows 1–3
 *  5) Bottom full   -> cols 1–3, row 4
 */
export default function Dashboard1LayoutComponent(
    /** @type {Dashboard1LayoutProps} */ { children, rowHeight = '200px' }
) {
    const kids = toChildArray(children);

    return html`
    <div>
      <style>
        .dashboard1-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
        /* left stack (columns 1–2) */
        .dashboard1-grid > *:nth-child(1) { grid-row: 1 / 2; grid-column: 1 / 3; }
        .dashboard1-grid > *:nth-child(2) { grid-row: 2 / 3; grid-column: 1 / 3; }
        .dashboard1-grid > *:nth-child(3) { grid-row: 3 / 4; grid-column: 1 / 3; }
        /* tall right (column 3 across rows 1–3) */
        .dashboard1-grid > *:nth-child(4) { grid-row: 1 / 4; grid-column: 3 / 4; }
        /* bottom full width (row 4 across columns 1–3) */
        .dashboard1-grid > *:nth-child(5) { grid-row: 4 / 5; grid-column: 1 / 4; }

        /* keep children from overflowing */
        .grid-child { min-height: 0; overflow: hidden; }
      </style>

      <div
        class="w-full dashboard1-grid gap-x-8"
        style=${{
        gridTemplateRows: `repeat(4, ${rowHeight})`,
        rowGap: '0px'
    }}
      >
        ${kids.map((child) => html`<div class="grid-child">${child}</div>`)}
      </div>
    </div>
  `;
}
