# Preact Chart Dashboard

A simple, responsive dashboard application built with Preact and ApexCharts. It visualizes sales data using interactive bar, line, and area charts. The application is built entirely with CDN-hosted libraries and requires no build step, making it lightweight and easy to run.

## 🛠️ Tech Stack

* **[Preact](https://preactjs.com/):** A fast 3kB alternative to React with the same modern API, used for the component-based UI.
* **[HTM (Hyperscript Tagged Markup)](https://github.com/developit/htm):** A JSX-like syntax that works in standard JavaScript, removing the need for a build step.
* **[ApexCharts.js](https://apexcharts.com/):** A modern and interactive charting library used to render all visualizations.
* **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapid UI development, loaded via CDN.

---
## 🚀 Getting Started

This project uses native JavaScript Modules (`import`/`export`). For security reasons, browsers do not allow these modules to be loaded directly from the local file system (`file:///...`). Therefore, you need to run a simple local server.

## 📂 File Structure

The project is organized into modular components, making it easy to understand and maintain.

```
.
├── 📄 index.html                  # Main HTML entry point, loads scripts.
├── 📄 app.js                      # Main app component, manages all state.
└── 📂 components                  # UI components
    ├── 📄 sidebar-layout-component.js # The main layout with navigation.
    ├── 📄 bar-chart-component.js      # Renders the bar chart and its summary.
    ├── 📄 line-chart-component.js     # Renders the line chart.
    └── 📄 area-chart-component.js     # Renders the area chart.
```