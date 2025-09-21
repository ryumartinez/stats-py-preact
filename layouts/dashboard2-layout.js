// layouts/dashboard2-layout.js
// @ts-check
import { h, toChildArray } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';

const html = htm.bind(h);

/**
 * @typedef {object} Dashboard2LayoutProps
 * @property {import('preact').ComponentChildren} children
 * @property {string} [rowHeight]  // e.g. '180px'
 */
export default function Dashboard2Layout(
    /** @type {Dashboard2LayoutProps} */ { children, rowHeight = '180px' }
) {
    const kids = toChildArray(children);

    return html`
      <div>
        <style>
          .dashboard-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
          /* top row */
          .dashboard-grid > *:nth-child(1) { grid-row: 1 / 2; grid-column: 1 / 2; }
          .dashboard-grid > *:nth-child(2) { grid-row: 1 / 2; grid-column: 2 / 3; }
          .dashboard-grid > *:nth-child(3) { grid-row: 1 / 2; grid-column: 3 / 4; }
          /* left column under top row: three stacked rows */
          .dashboard-grid > *:nth-child(4) { grid-row: 2 / 3; grid-column: 1 / 3; }
          .dashboard-grid > *:nth-child(5) { grid-row: 3 / 4; grid-column: 1 / 3; }
          .dashboard-grid > *:nth-child(6) { grid-row: 4 / 5; grid-column: 1 / 3; }
          /* tall right block spanning rows 2–4 */
          .dashboard-grid > *:nth-child(7) { grid-row: 2 / 5; grid-column: 3 / 4; }
          /* bottom full-width block */
          .dashboard-grid > *:nth-child(8) { grid-row: 5 / 6; grid-column: 1 / 4; }
          /* prevent overflow */
          .grid-child { min-height: 0; overflow: hidden; }
        </style>

        <div
          class="w-full dashboard-grid gap-x-8"
          style=${{
            /* first 5 rows fixed, last row flexible */
            gridTemplateRows: `repeat(5, ${rowHeight}) minmax(0, 1fr)`,
            /* ensure there is height to fill */
            minHeight: '100vh',
            rowGap: '0px',
          }}
        >
          ${kids.map((child) => html`<div class="grid-child">${child}</div>`)}
        </div>
      </div>
    `;
}
