// @ts-check
import { h } from 'https://esm.sh/preact';
import { useEffect, useRef } from 'https://esm.sh/preact/hooks';
import ApexCharts from 'https://esm.sh/apexcharts';
import htm from 'https://esm.sh/htm';

const html = htm.bind(h);

/**
 * @param {import('./../types.js').LineChartProps & {
 *   bare?: boolean,
 *   className?: string,
 *   hideYAxis?: boolean,
 *   chartMaxHeight?: number,   // <= NEW
 * }} props
 */
const LineChart = ({
                       title,
                       description,
                       data,
                       amount1Title = 'Series 1',
                       amount2Title = 'Series 2',
                       bare = false,
                       className = '',
                       hideYAxis = false,
                       chartMaxHeight = 260,
                   }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const categories = data?.map(d => d.date) ?? [];
        const a1 = data?.map(d => d.amount1 ?? 0) ?? [];
        const a2raw = data?.map(d => (typeof d.amount2 === 'number' ? d.amount2 : null)) ?? [];
        const hasAnyA2 = a2raw.some(v => v !== null);

        /** @type {import('apexcharts').ApexOptions} */
        const options = {
            chart: { type: 'line', height: '100%', toolbar: { show: true }, foreColor: '#475569' },
            series: [{ name: amount1Title, data: a1 }, ...(hasAnyA2 ? [{ name: amount2Title, data: a2raw }] : [])],
            xaxis: { categories },
            yaxis: {
                labels: { show: !hideYAxis },
                axisBorder: { show: !hideYAxis },
                axisTicks:  { show: !hideYAxis },
            },
            stroke: { curve: 'straight', width: 3 },
            markers: { size: 5 },
            colors: ['#38bdf8', '#34d399'],
            legend: { position: 'top', horizontalAlign: 'right' },
            grid: { borderColor: '#e2e8f0' },
            tooltip: { y: { formatter: (v) => (v == null ? '—' : String(v)) } },
            noData: { text: 'No data available' }
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
    }, [data, amount1Title, amount2Title, hideYAxis]);

    const wrapperBase = bare
        ? `w-full ${className}`
        : `w-full bg-white rounded-xl shadow-lg p-6 sm:p-8 ${className}`;

    return html`
      <div class="${wrapperBase} flex flex-col h-full" style=${{ maxHeight: `${chartMaxHeight}px` }}>
        <div class="${bare ? 'mb-2' : 'text-center'}">
          <h2 class="${bare ? 'text-sm font-semibold text-slate-700' : 'text-xl font-bold text-slate-800 mb-1'}">${title}</h2>
          ${!bare && html`<p class="text-slate-500 mb-2">${description}</p>`}
          ${bare && description && html`<p class="text-slate-500 text-xs">${description}</p>`}
        </div>
        <div class="flex-1 min-h-0" ref=${chartRef}></div>
      </div>
    `;
};

export default LineChart;
