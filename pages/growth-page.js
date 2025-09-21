// @ts-check
import { h } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';
import AreaChart from '../components/area-chart-component.js';

const html = htm.bind(h);

/**
 * @typedef {object} GrowthPageProps
 * @property {import('../types.js').ProcessedChartDataItem[]} data
 */

export default function GrowthPage({ data }) {
    return html`
    <${AreaChart}
      title="Growth Overview 🌱"
      description="Visualizing the growth of Product A and B over time."
      data=${data}
      amount1Title="Product A"
      amount2Title="Product B"
    />
  `;
}
