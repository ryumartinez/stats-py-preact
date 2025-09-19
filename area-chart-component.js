// @ts-check
import { h } from 'https://esm.sh/preact';
import { useEffect, useRef } from 'https://esm.sh/preact/hooks';
import ApexCharts from 'https://esm.sh/apexcharts';
import htm from 'https://esm.sh/htm';

const html = htm.bind(h);

/**
 * Displays an area chart.
 * @param {import('./types.js').AreaChartProps} props
 * @returns {import('preact').VNode}
 */
const AreaChart = ({ title, description, data, amount1Title = 'Series 1', amount2Title = 'Series 2' }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const chartSeries = [
            { name: amount1Title, data: data?.map(item => item.amount1) ?? [] },
            { name: amount2Title, data: data?.map(item => item.amount2 ?? null) ?? [] },
        ];
        const chartCategories = data?.map(item => item.date) ?? [];
        const options = {
            chart: { type: 'area', height: '100%', toolbar: { show: true }, foreColor: '#475569' },
            series: chartSeries,
            xaxis: { categories: chartCategories },
            stroke: { curve: 'straight', width: 2, },
            markers: { size: 5, },
            colors: ['#38bdf8', '#34d399'],
            legend: { position: 'top', horizontalAlign: 'right' },
            grid: { borderColor: '#e2e8f0' },
            fill: { opacity: 0.5 },
            dataLabels: { enabled: false }
        };
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.updateOptions(options);
            } else {
                chartInstance.current = new ApexCharts(chartRef.current, options);
                chartInstance.current.render();
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

export default AreaChart;