// components/line-chart-component.js
// @ts-check
import { h } from 'https://esm.sh/preact';
import { useEffect, useRef } from 'https://esm.sh/preact/hooks';
import ApexCharts from 'https://esm.sh/apexcharts';
import htm from 'https://esm.sh/htm';
const html = htm.bind(h);

/**
 * Displays a line chart.
 * @param {import('../types.js').LineChartProps} props
 * @returns {import('preact').VNode}
 */
const LineChart = ({ title, description, data, amount1Title = 'Series 1', amount2Title = 'Series 2' }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const categories = data?.map(d => d.date) ?? [];
        const a1 = data?.map(d => d.amount1 ?? 0) ?? [];
        const a2raw = data?.map(d => (typeof d.amount2 === 'number' ? d.amount2 : null)) ?? [];
        const hasAnyA2 = a2raw.some(v => v !== null);

        /** @type {import('apexcharts').ApexOptions} */
        const baseOptions = {
            chart: { type: 'line', height: '100%', toolbar: { show: true }, foreColor: '#475569' },
            xaxis: { categories: categories },
            stroke: { curve: 'straight', width: 3 },
            markers: { size: 5 },
            colors: ['#38bdf8', '#34d399'],
            legend: { position: 'top', horizontalAlign: 'right' },
            grid: { borderColor: '#e2e8f0' },
            tooltip: {
                y: { formatter: (v) => (v == null ? '—' : String(v)) }
            },
            noData: { text: 'No data available' }
        };

        const nextSeries = [
            { name: amount1Title, data: a1 },
            ...(hasAnyA2 ? [{ name: amount2Title, data: a2raw }] : [])
        ];

        if (chartRef.current) {
            const existing = chartInstance.current;
            const existingSeriesCount = existing?.w?.config?.series?.length ?? 0;
            const nextSeriesCount = nextSeries.length;

            if (!existing) {
                chartInstance.current = new ApexCharts(chartRef.current, { ...baseOptions, series: nextSeries });
                chartInstance.current.render();
            } else if (existingSeriesCount !== nextSeriesCount) {
                // Re-create when the number of series changes
                existing.destroy();
                chartInstance.current = new ApexCharts(chartRef.current, { ...baseOptions, series: nextSeries });
                chartInstance.current.render();
            } else {
                // Fast path: update series + categories
                existing.updateOptions({ ...baseOptions, xaxis: { categories } }, false, true);
                existing.updateSeries(nextSeries, true);
            }
        }

        return () => {
            chartInstance.current?.destroy();
            chartInstance.current = null;
        };
    }, [data, amount1Title, amount2Title]);

    return html`
      <div class="w-full bg-white rounded-xl shadow-lg p-6 sm:p-8 flex flex-col">
        <div class="text-center">
          <h2 class="text-xl font-bold text-slate-800 mb-1">${title}</h2>
          <p class="text-slate-500 mb-6">${description}</p>
        </div>
        <div class="flex-grow min-h-[350px]" ref=${chartRef}></div>
      </div>
    `;
};

export default LineChart;
