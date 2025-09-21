// @ts-check
import { h } from 'https://esm.sh/preact';
import { memo } from 'https://esm.sh/preact/compat';
import { useEffect, useRef } from 'https://esm.sh/preact/hooks';
import ApexCharts from 'https://esm.sh/apexcharts';
import htm from 'https://esm.sh/htm';

const html = htm.bind(h);

/**
 * Displays a bar chart with an optional summary.
 * @param {import('./../types.js').BarChartProps & {
 *   seriesName?: string,
 *   color?: string,
 *   valueFormatter?: (n: number) => string,
 *   onBarClick?: (payload: { category: string, value: number, index: number }) => void,
 *   bare?: boolean,
 *   className?: string,
 *   hideYAxis?: boolean,
 *   chartMaxHeight?: number,
 * }} props
 * @returns {import('preact').VNode}
 */
const BarChart = ({
                      title,
                      description,
                      data,
                      summary,
                      seriesName = 'Series',
                      color = '#38bdf8',
                      valueFormatter,
                      onBarClick,
                      bare = false,
                      className = '',
                      hideYAxis = false,
                      chartMaxHeight = 260,
                  }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const fmt = valueFormatter ?? ((n) => Number.isFinite(n) ? n.toLocaleString() : '—');

    useEffect(() => {
        const categories = data?.map(d => d.date) ?? [];
        const values     = data?.map(d => (typeof d.amount1 === 'number' ? d.amount1 : 0)) ?? [];

        /** @type {import('apexcharts').ApexOptions} */
        const options = {
            chart: {
                type: 'bar',
                height: '100%',
                foreColor: '#475569',
                toolbar: { show: false },
                animations: { enabled: true },
                events: {
                    dataPointSelection: (_e, _ctx, cfg) => {
                        if (!onBarClick) return;
                        const i = cfg?.dataPointIndex ?? -1;
                        if (i < 0) return;
                        onBarClick({ category: categories[i], value: values[i], index: i });
                    }
                }
            },
            series: [{ name: seriesName, data: values }],
            xaxis: {
                categories,
                axisTicks: { show: false },
                tooltip: { enabled: false },
                labels: { rotate: categories.length > 8 ? -25 : 0, trim: true, hideOverlappingLabels: true }
            },
            yaxis: {
                labels: {
                    show: !hideYAxis,
                    formatter: (v) => fmt(typeof v === 'number' ? v : Number(v)),
                },
                axisBorder: { show: !hideYAxis },
                axisTicks:  { show: !hideYAxis },
            },
            plotOptions: {
                bar: {
                    borderRadius: 6,
                    dataLabels: { position: 'top' },
                    columnWidth: categories.length > 12 ? '55%' : '65%',
                }
            },
            dataLabels: {
                enabled: true,
                offsetY: -18,
                style: { fontSize: '12px', colors: ['#334155'] },
                formatter: (val) => fmt(typeof val === 'number' ? val : Number(val)),
                background: { enabled: false }
            },
            tooltip: { y: { formatter: (val) => fmt(typeof val === 'number' ? val : Number(val)) } },
            fill: { colors: [color] },
            grid: { borderColor: '#e2e8f0', strokeDashArray: 4 },
            legend: { show: false },
            noData: { text: 'No data available' },
        };

        if (!chartRef.current) return;

        if (!chartInstance.current) {
            chartInstance.current = new ApexCharts(chartRef.current, options);
            chartInstance.current.render();
        } else {
            chartInstance.current.updateOptions(options, false, true);
            chartInstance.current.updateSeries(options.series, true);
        }

        return () => {
            chartInstance.current?.destroy();
            chartInstance.current = null;
        };
    }, [data, seriesName, color, valueFormatter, onBarClick, hideYAxis]);

    // tighter gaps in bare mode so summary sits closer
    const wrapper = bare
        ? `flex flex-col lg:flex-row gap-1 items-stretch ${className}`
        : `flex flex-col lg:flex-row gap-8 items-stretch ${className}`;

    const summaryBoxBare = 'w-full lg:w-56 flex-shrink-0 pr-1 text-center flex flex-col justify-center';
    const summaryBoxCard = 'w-full lg:w-64 flex-shrink-0 bg-white rounded-xl shadow-lg p-6 text-center flex flex-col justify-center';

    const chartBoxBase = bare
        ? 'w-full'
        : 'w-full bg-white rounded-xl shadow-lg p-6 sm:p-8';

    return html`
      <div class="${wrapper}">
        ${summary && (bare
            ? html`
          <div class="${summaryBoxBare}">
            ${summary.title && html`<h3 class="text-[10px] uppercase tracking-wide text-slate-500 mb-0.5">${summary.title}</h3>`}
            <p class="text-lg font-semibold text-slate-800">${fmt(summary.summaryAmount)}</p>
          </div>
        `
            : html`
          <div class="${summaryBoxCard}">
            <h3 class="text-lg font-semibold text-slate-500 mb-2">${summary.title}</h3>
            <p class="text-5xl font-bold text-sky-500">${fmt(summary.summaryAmount)}</p>
          </div>
        `
        )}

        <div class="${chartBoxBase} flex flex-col h-full" style=${{ maxHeight: `${chartMaxHeight}px` }}>
          <div class="${'text-center'}">
            <h2 class="${bare ? 'text-sm font-semibold text-slate-700' : 'text-xl font-bold text-slate-800 mb-1'}">
              ${title}
            </h2>
            ${!bare && html`<p class="text-slate-500 mb-2">${description}</p>`}
            ${bare && description && html`<p class="text-slate-500 text-xs mb-1">${description}</p>`}
          </div>
          <div class="flex-1 min-h-0" ref=${chartRef}></div>
        </div>
      </div>
    `;
};

// custom shallow comparator to avoid re-render if props didn't change
const areEqual = (a, b) => {
    if (a.bare !== b.bare || a.hideYAxis !== b.hideYAxis) return false;
    if (a.title !== b.title || a.description !== b.description) return false;
    if (a.seriesName !== b.seriesName || a.color !== b.color) return false;
    if (a.chartMaxHeight !== b.chartMaxHeight) return false;
    if (a.data !== b.data) return false; // rely on referential equality for processed arrays
    const aSum = a.summary?.summaryAmount, bSum = b.summary?.summaryAmount;
    const aSumTitle = a.summary?.title,    bSumTitle = b.summary?.title;
    if (aSum !== bSum || aSumTitle !== bSumTitle) return false;
    if (a.valueFormatter !== b.valueFormatter) return false; // keep formatters stable
    // ignore onBarClick identity (only present on interactive annual charts)
    return true;
};

export default memo(BarChart, areEqual);
