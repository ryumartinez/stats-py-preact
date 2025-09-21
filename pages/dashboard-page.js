// @ts-check
import { h } from 'https://esm.sh/preact';
import { useState, useMemo } from 'https://esm.sh/preact/hooks';
import htm from 'https://esm.sh/htm';
import BarChart from '../components/bar-chart-component.js';

const html = htm.bind(h);

export default function DashboardPage() {
    /** Raw data lives here (duplicate per page by design) */
    /** @type {import('../types.js').ChartDataItem[]} */
    const rawData = [
        { date: new Date('2024-01-15'), amount1: 31, amount2: 11 },
        { date: new Date('2024-02-15'), amount1: 40, amount2: 32 },
        { date: new Date('2024-03-15'), amount1: 28, amount2: 45 },
        { date: new Date('2024-04-15'), amount1: 51, amount2: 32 },
        { date: new Date('2024-05-15'), amount1: 42, amount2: 34 },
        { date: new Date('2024-06-15'), amount1: 109, amount2: 52 },
        { date: new Date('2025-01-15'), amount1: 55, amount2: 25 },
        { date: new Date('2025-02-15'), amount1: 62, amount2: 40 },
        { date: new Date('2025-03-15'), amount1: 78 },
        { date: new Date('2025-04-15'), amount1: 91, amount2: 64 },
        { date: new Date('2025-05-15'), amount1: 82, amount2: 55 },
        { date: new Date('2025-06-15'), amount1: 120, amount2: 90 },
    ];

    /** @type {['month' | 'year', import('preact/hooks').StateUpdater<'month' | 'year'>]} */
    const [timeScale, setTimeScale] = useState('month');

    /** @type {import('../types.js').ProcessedChartDataItem[]} */
    const processedData = useMemo(() => {
        if (timeScale === 'year') {
            /** @type {Record<string, import('../types.js').ProcessedChartDataItem>} */
            const yearly = {};
            for (const item of rawData) {
                const y = String(item.date.getFullYear());
                if (!yearly[y]) yearly[y] = { date: y, amount1: 0, amount2: 0 };
                yearly[y].amount1 += item.amount1;
                yearly[y].amount2 += (item.amount2 ?? 0);
            }
            return Object.values(yearly);
        }
        return rawData.map(i => ({
            ...i,
            date: i.date.toLocaleString('en-US', { month: 'short', year: 'numeric' })
        }));
    }, [timeScale]);

    /** @type {import('../types.js').Summary} */
    const summary = useMemo(() => ({
        title: 'Total Revenue',
        summaryAmount: processedData.reduce((sum, i) => sum + i.amount1, 0)
    }), [processedData]);

    const btn = (scale) =>
        `px-4 py-2 text-sm font-semibold rounded-md transition ${
            timeScale === scale
                ? 'bg-sky-500 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
        }`;

    return html`
      <div class="flex items-center justify-end mb-4 gap-2">
        <button onClick=${() => setTimeScale('month')} class=${btn('month')}>Month</button>
        <button onClick=${() => setTimeScale('year')} class=${btn('year')}>Year</button>
      </div>

      <${BarChart}
        title="Performance Overview 📊"
        description="Revenue overview for the selected period."
        data=${processedData}
        summary=${summary}
      />
    `;
}
