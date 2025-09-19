import { h, render } from 'https://esm.sh/preact';
import { useState } from 'https://esm.sh/preact/hooks';
import htm from 'https://esm.sh/htm';

import AreaChart from './area-chart-component.js';
import BarChart from './bar-chart-component.js';
import LineChart from './line-chart-component.js';
import SidebarLayout from './sidebar-layout-component.js';

const html = htm.bind(h);

const salesData = [
    { date: new Date('2024-01-15'), amount1: 31, amount2: 11 }, { date: new Date('2024-02-15'), amount1: 40, amount2: 32 }, { date: new Date('2024-03-15'), amount1: 28, amount2: 45 }, { date: new Date('2024-04-15'), amount1: 51, amount2: 32 }, { date: new Date('2024-05-15'), amount1: 42, amount2: 34 }, { date: new Date('2024-06-15'), amount1: 109, amount2: 52 },
    { date: new Date('2025-01-15'), amount1: 55, amount2: 25 }, { date: new Date('2025-02-15'), amount1: 62, amount2: 40 }, { date: new Date('2025-03-15'), amount1: 78 }, { date: new Date('2025-04-15'), amount1: 91, amount2: 64 }, { date: new Date('2025-05-15'), amount1: 82, amount2: 55 }, { date: new Date('2025-06-15'), amount1: 120, amount2: 90 },
];

const App = () => {
    const [timeScale, setTimeScale] = useState('month');
    const [activeView, setActiveView] = useState('dashboard');

    let processedData;
    if (timeScale === 'year') {
        const yearlyTotals = {};
        salesData.forEach(item => {
            const year = item.date.getFullYear();
            if (!yearlyTotals[year]) {
                yearlyTotals[year] = { date: year.toString(), amount1: 0, amount2: 0 };
            }
            yearlyTotals[year].amount1 += item.amount1;
            yearlyTotals[year].amount2 += (item.amount2 ?? 0);
        });
        processedData = Object.values(yearlyTotals);
    } else {
        processedData = salesData.map(item => ({
            ...item,
            date: item.date.toLocaleString('en-US', { month: 'short', year: 'numeric' })
        }));
    }

    const barChartSummary = {
        title: 'Total Revenue',
        summaryAmount: processedData.reduce((sum, item) => sum + item.amount1, 0)
    };

    const buttonClass = (scale) => timeScale === scale ? 'bg-sky-500 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300';

    return html`
      <${SidebarLayout} activeView=${activeView} onNavigate=${setActiveView}>

        <div class="flex items-center justify-end mb-4 gap-2">
          <button onClick=${() => setTimeScale('month')} class="px-4 py-2 text-sm font-semibold rounded-md transition ${buttonClass('month')}">
            Month
          </button>
          <button onClick=${() => setTimeScale('year')} class="px-4 py-2 text-sm font-semibold rounded-md transition ${buttonClass('year')}">
            Year
          </button>
        </div>

        ${activeView === 'dashboard' && html`
          <${BarChart}
            title="Performance Overview 📊"
            description="Revenue overview for the selected period."
            data=${processedData}
            summary=${barChartSummary}
          />
        `}

        ${activeView === 'comparison' && html`
          <${LineChart}
            title="Sales Comparison 📈"
            description="Comparing sales of Product A vs. Product B."
            data=${processedData}
            amount1Title="Product A"
            amount2Title="Product B"
          />
        `}

        ${activeView === 'growth' && html`
        <${AreaChart}
          title="Growth Overview 🌱"
          description="Visualizing the growth of Product A and B over time."
          data=${processedData}
          amount1Title="Product A"
          amount2Title="Product B"
        />
      `}

      <//>
    `;
};

render(html`<${App} />`, document.getElementById('app'));