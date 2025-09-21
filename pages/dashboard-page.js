// @ts-check
import { h } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';
import BarChart from '../components/bar-chart-component.js';

const html = htm.bind(h);

/**
 * @typedef {object} DashboardPageProps
 * @property {import('../types.js').ProcessedChartDataItem[]} data
 * @property {import('../types.js').Summary} summary
 */

/**
 * Dashboard Page
 * @param {DashboardPageProps} props
 */
export default function DashboardPage({ data, summary }) {
    return html`
    <${BarChart}
      title="Performance Overview 📊"
      description="Revenue overview for the selected period."
      data=${data}
      summary=${summary}
    />
  `;
}
