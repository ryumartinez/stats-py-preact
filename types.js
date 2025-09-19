// This file is for JSDoc type definitions only.
// It is not meant to be executed.

/**
 * @typedef {object} ChartDataItem
 * @property {Date} date - The original date object for the data point.
 * @property {number} amount1 - The primary value.
 * @property {number} [amount2] - The optional secondary value.
 */

/**
 * @typedef {object} ProcessedChartDataItem
 * @property {string} date - The formatted date string for chart labels.
 * @property {number} amount1 - The primary value.
 * @property {number} [amount2] - The optional secondary value.
 */

/**
 * @typedef {object} Summary
 * @property {string} title - The title for the summary card.
 * @property {number} summaryAmount - The calculated total for the summary card.
 */

/**
 * @typedef {object} ChartProps
 * @property {string} title
 * @property {string} description
 * @property {ProcessedChartDataItem[]} data
 */

/**
 * @typedef {ChartProps & { summary?: Summary }} BarChartProps
 */

/**
 * @typedef {ChartProps} AreaChartProps
 * @property {string} amount1Title
 * @property {string} amount2Title
 */

/**
 * @typedef {AreaChartProps} LineChartProps
 */

/**
 * @typedef {object} SidebarLayoutProps
 * @property {import('preact').ComponentChildren} children
 * @property {string} activeView
 * @property {(viewId: string) => void} onNavigate
 */

// We export nothing, this file is only for JSDoc.
export {};