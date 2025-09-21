// @ts-check
import { h } from 'https://esm.sh/preact';
import { useEffect, useRef } from 'https://esm.sh/preact/hooks';
import htm from 'https://esm.sh/htm';
import { Grid, html as gridHtml } from 'https://unpkg.com/gridjs?module';

const jsx = htm.bind(h);

/**
 * @typedef {object} GridCol
 * @property {string} key
 * @property {string} header
 * @property {boolean} [sortable]
 * @property {(value:any, row:any)=>any} [format]
 * @property {'left'|'center'|'right'} [align]
 */

/**
 * @typedef {object} GridTableProps
 * @property {any[]} [rows]
 * @property {GridCol[]} [columns]
 * @property {string} [title]
 * @property {string} [description]
 * @property {number} [pageSize]
 * @property {boolean} [search]
 * @property {boolean} [sort]
 */

export default function GridTable({
                                      rows = [],
                                      columns = [],
                                      title,
                                      description,
                                      pageSize = 10,
                                      search = true,
                                      sort = true,
                                  }) {
    const mountRef = useRef(/** @type {HTMLDivElement|null} */(null));
    const gridRef  = useRef(/** @type {Grid|null} */(null));

    const hasColumns = Array.isArray(columns) && columns.length > 0;
    const safeRows   = Array.isArray(rows) ? rows : [];

    useEffect(() => {
        // If we don't have a mount node or valid columns, don't initialize Grid.js
        if (!mountRef.current || !hasColumns) {
            // If a grid exists and columns disappeared, tear it down
            if (gridRef.current) {
                gridRef.current.destroy();
                gridRef.current = null;
            }
            return;
        }

        // Build columns for Grid.js
        const gridColumns = columns.map(col => ({
            id: col.key,
            name: col.header,
            sort: col.sortable !== false,
            attributes: () => {
                const align =
                    col.align === 'right' ? 'text-right' :
                        col.align === 'center' ? 'text-center' : 'text-left';
                return { class: `px-3 ${align}` };
            },
            formatter: col.format ? (cell, row) => col.format(cell, row) : undefined
        }));

        // 2D array for Grid.js data
        const gridData = safeRows.map(r => columns.map(c => r?.[c.key]));

        // Create or update
        if (!gridRef.current) {
            gridRef.current = new Grid({
                columns: gridColumns,
                data: gridData,
                sort: hasColumns && sort,               // only enable when valid
                search: hasColumns && search,           // only enable when valid
                pagination: { enabled: true, limit: pageSize },
                className: {
                    table: 'w-full',
                    th: 'text-slate-600 font-semibold',
                    td: 'text-slate-800',
                    pagination: 'mt-4',
                },
            });
            gridRef.current.render(mountRef.current);
        } else {
            gridRef.current
                .updateConfig({
                    columns: gridColumns,
                    data: gridData,
                    sort: hasColumns && sort,
                    search: hasColumns && search,
                    pagination: { enabled: true, limit: pageSize },
                })
                .forceRender();
        }

        return () => {
            // (Optional) don’t destroy on every prop change; Grid.js handles updates.
            // We destroy on unmount.
        };
    }, [hasColumns, safeRows, columns, pageSize, search, sort]);

    return jsx`
    <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8">
      ${(title || description) && jsx`
        <header class="mb-4">
          ${title && jsx`<h2 class="text-xl font-bold text-slate-800">${title}</h2>`}
          ${description && jsx`<p class="text-slate-500">${description}</p>`}
        </header>
      `}
      <div class="overflow-x-auto">
        ${hasColumns
        ? jsx`<div ref=${mountRef}></div>`
        : jsx`<div class="text-slate-500 text-sm">No columns to display.</div>`}
      </div>
    </section>
  `;
}

// Helpers
export const gridHtmlCell = gridHtml;
export const fmtInt = (n) => Number(n).toLocaleString('en-US');
export const fmtFloat = (n, d=2) =>
    Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
