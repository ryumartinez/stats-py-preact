// @ts-check
import { h } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';
import LineChart from '../components/line-chart-component.js';

const html = htm.bind(h);

/**
 * @typedef {object} ComparisonPageProps
 * @property {import('../types.js').ProcessedChartDataItem[]} data
 */

export default function ComparisonPage({ data }) {
    return html`
    <${LineChart}
      title="Sales Comparison 📈"
      description="Comparing sales of Product A vs. Product B."
      data=${data}
      amount1Title="Product A"
      amount2Title="Product B"
    />
  `;
}
