// @ts-check
import DashboardPage from './dashboard-page.js';
import ComparisonPage from './comparison-page.js';
import GrowthPage from './growth-page.js';

/**
 * Central registry of pages.
 * Each entry has an id (used by routing/state) and a Component to render.
 * Extend this list to add new pages easily.
 */
export const PAGES = [
    { id: 'dashboard', Component: DashboardPage, label: 'Dashboard' },
    { id: 'comparison', Component: ComparisonPage, label: 'Comparison' },
    { id: 'growth', Component: GrowthPage, label: 'Growth' },
];

/** @typedef {PAGES[number]['id']} PageId */
