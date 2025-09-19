import { h } from 'https://esm.sh/preact';
import { useEffect, useRef } from 'https://esm.sh/preact/hooks';
import ApexCharts from 'https://esm.sh/apexcharts';
import htm from 'https://esm.sh/htm';

const html = htm.bind(h);

const BarChart = ({ title, description, data, summary }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const chartSeries = [{ name: 'Revenue', data: data?.map(item => item.amount1) ?? [] }];
        const chartCategories = data?.map(item => item.date) ?? [];
        const options = {
            chart: { type: 'bar', height: '100%', toolbar: { show: false }, foreColor: '#475569' },
            plotOptions: { bar: { dataLabels: { position: 'top' } } },
            dataLabels: { enabled: true, offsetY: -20, style: { fontSize: '12px', colors: ["#304758"] } },
            series: chartSeries,
            xaxis: { categories: chartCategories },
            yaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
            fill: { colors: ['#38bdf8'] },
            grid: { show: false },
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
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [data]);

    return html`
      <div class="flex flex-col lg:flex-row gap-8 items-stretch">

        ${summary && html`
          <div class="w-full lg:w-64 flex-shrink-0 bg-white rounded-xl shadow-lg p-6 text-center flex flex-col justify-center">
            <h3 class="text-lg font-semibold text-slate-500 mb-2">${summary.title}</h3>
            <p class="text-5xl font-bold text-sky-500">
              ${summary.summaryAmount.toLocaleString()}
            </p>
          </div>
        `}

        <div class="w-full flex-grow bg-white rounded-xl shadow-lg p-6 sm:p-8 flex flex-col">
          <div class="text-center">
            <h2 class="text-xl font-bold text-slate-800 mb-1">${title}</h2>
            <p class="text-slate-500 mb-6">${description}</p>
          </div>
          <div class="flex-grow min-h-[350px]" ref=${chartRef}></div>
        </div>

      </div>
    `;
};

export default BarChart;