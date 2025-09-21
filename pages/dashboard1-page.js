// pages/dashboard1-page.js
// @ts-check
import { h } from 'https://esm.sh/preact';
import { useMemo, useState, useCallback } from 'https://esm.sh/preact/hooks';
import htm from 'https://esm.sh/htm';

import Dashboard1Layout from './../layouts/dashboard1-layout-component.js';
import BarChart from './../components/bar-chart-component.js';
import AreaChart from './../components/area-chart-component.js';
import GridTable from './../components/grid-table-component.js';

// ---- Subsidio Gs ----
import {
    subsidioGuaraniesAnual,
    totalSubsidioGuaraniesAnual2021, subsidioGuaraniesMensual2021,
    totalSubsidioGuaraniesAnual2022, subsidioGuaraniesMensual2022,
    totalSubsidioGuaraniesAnual2023, subsidioGuaraniesMensual2023,
    totalSubsidioGuaraniesAnual2024, subsidioGuaraniesMensual2024,
    totalSubsidioGuaraniesAnual2025, subsidioGuaraniesMensual2025,
} from '../data/dashboard1/subsidioGuaranies.js';

// ---- Subsidio USD ----
import {
    subsidioDolaresAnual,
    totalSubsidioDolaresAnual2021, subsidioDolaresMensual2021,
    totalSubsidioDolaresAnual2022, subsidioDolaresMensual2022,
    totalSubsidioDolaresAnual2023, subsidioDolaresMensual2023,
    totalSubsidioDolaresAnual2024, subsidioDolaresMensual2024,
    totalSubsidioDolaresAnual2025, subsidioDolaresMensual2025,
} from '../data/dashboard1/subsidioDolares.js';

// ---- Table data (tall right block) ----
import { subsidioEmpresas } from '../data/dashboard1/subsidioEmpresas.js';

// ---- Bottom area chart data ----
import { totalSubsidioHistorico } from '../data/dashboard1/totalSubsidioHistorico.js';

const html = htm.bind(h);

export default function Dashboard1Page() {
    // ===== number formatters =====
    const fmt1    = useMemo(() => (n) => Number(n).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }), []);
    const fmtGsM  = useMemo(() => (n) => `Gs ${fmt1(n)}M`, [fmt1]);
    const fmtUsdM = useMemo(() => (n) => `$${fmt1(n)}M`, [fmt1]);

    // ===== processed annual series =====
    const gsAnualProcessed = useMemo(
        () => subsidioGuaraniesAnual.map(d => ({ ...d, date: String(d.date.getFullYear()) })),
        []
    );
    const usdAnualProcessed = useMemo(
        () => subsidioDolaresAnual.map(d => ({ ...d, date: String(d.date.getFullYear()) })),
        []
    );

    // ===== drilldown state =====
    const [gsYear,  setGsYear]  = useState(2021);
    const [usdYear, setUsdYear] = useState(2021);

    // ===== maps =====
    const gsMonthlyByYear = {
        2021: subsidioGuaraniesMensual2021,
        2022: subsidioGuaraniesMensual2022,
        2023: subsidioGuaraniesMensual2023,
        2024: subsidioGuaraniesMensual2024,
        2025: subsidioGuaraniesMensual2025,
    };
    const gsTotalsByYear = {
        2021: totalSubsidioGuaraniesAnual2021,
        2022: totalSubsidioGuaraniesAnual2022,
        2023: totalSubsidioGuaraniesAnual2023,
        2024: totalSubsidioGuaraniesAnual2024,
        2025: totalSubsidioGuaraniesAnual2025,
    };

    const usdMonthlyByYear = {
        2021: subsidioDolaresMensual2021,
        2022: subsidioDolaresMensual2022,
        2023: subsidioDolaresMensual2023,
        2024: subsidioDolaresMensual2024,
        2025: subsidioDolaresMensual2025,
    };
    const usdTotalsByYear = {
        2021: totalSubsidioDolaresAnual2021,
        2022: totalSubsidioDolaresAnual2022,
        2023: totalSubsidioDolaresAnual2023,
        2024: totalSubsidioDolaresAnual2024,
        2025: totalSubsidioDolaresAnual2025,
    };

    // ===== derived monthly data & summaries =====
    const gsMonthlyProcessed = useMemo(() => {
        const raw = gsMonthlyByYear[gsYear] ?? subsidioGuaraniesMensual2021;
        return raw.map(d => ({ ...d, date: d.date.toLocaleString('es-ES', { month: 'short' }) }));
    }, [gsYear]);

    const gsMonthlySummary = useMemo(() => ({
        title: `Monto subsidio (Gs) ${gsYear}`,
        summaryAmount: gsTotalsByYear[gsYear],
    }), [gsYear]);

    const usdMonthlyProcessed = useMemo(() => {
        const raw = usdMonthlyByYear[usdYear] ?? subsidioDolaresMensual2021;
        return raw.map(d => ({ ...d, date: d.date.toLocaleString('es-ES', { month: 'short' }) }));
    }, [usdYear]);

    const usdMonthlySummary = useMemo(() => ({
        title: `Monto subsidio (USD) ${usdYear}`,
        summaryAmount: usdTotalsByYear[usdYear],
    }), [usdYear]);

    // ===== annual click handlers =====
    const onGsYearClick = useCallback(({ category }) => {
        const y = parseInt(String(category), 10);
        if (!Number.isNaN(y) && gsMonthlyByYear[y]) setGsYear(y);
    }, []);

    const onUsdYearClick = useCallback(({ category }) => {
        const y = parseInt(String(category), 10);
        if (!Number.isNaN(y) && usdMonthlyByYear[y]) setUsdYear(y);
    }, []);

    // ===== bottom area chart: process labels =====
    const totalSubsidioProcessed = useMemo(() =>
        totalSubsidioHistorico.map(d => ({
            ...d,
            // "ene 2021", "feb 2021", ...
            date: d.date.toLocaleString('es-ES', { month: 'short', year: 'numeric' })
        })), []
    );

    // ===== table columns =====
    const fmtGsCurrency  = (n) => `Gs ${Number(n).toLocaleString('en-US')}`;
    const fmtUsdCurrency = (n) => `$${Number(n).toLocaleString('en-US')}`;
    const tableColumns = useMemo(() => ([
        { key: 'Empresa',         header: 'Empresa' },
        { key: 'MontoGuaranies',  header: 'Monto (Gs)',  align: 'right', format: fmtGsCurrency },
        { key: 'MontoDolares',    header: 'Monto (USD)', align: 'right', format: fmtUsdCurrency },
    ]), []);

    return html`
    <${Dashboard1Layout} rowHeight="200px">
      <!-- Left TOP: two annual charts side-by-side -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <${BarChart}
          bare=${true}
          hideYAxis=${true}
          chartMaxHeight=${190}
          title="Monto anual pago de subsidio (Gs)"
          data=${gsAnualProcessed}
          seriesName="Gs"
          valueFormatter=${fmtGsM}
          color="#38bdf8"
          onBarClick=${onGsYearClick}
        />
        <${BarChart}
          bare=${true}
          hideYAxis=${true}
          chartMaxHeight=${190}
          title="Monto anual pago de subsidio (USD)"
          data=${usdAnualProcessed}
          seriesName="USD"
          valueFormatter=${fmtUsdM}
          color="#2563eb"
          onBarClick=${onUsdYearClick}
        />
      </div>

      <!-- Left MIDDLE: monthly Gs -->
      <${BarChart}
        bare=${true}
        hideYAxis=${true}
        chartMaxHeight=${200}
        title="Monto subsidio por mes (Gs)"
        data=${gsMonthlyProcessed}
        summary=${gsMonthlySummary}
        seriesName="Gs"
        valueFormatter=${fmtGsM}
        color="#38bdf8"
      />

      <!-- Left BOTTOM: monthly USD -->
      <${BarChart}
        bare=${true}
        hideYAxis=${true}
        chartMaxHeight=${200}
        title="Monto subsidio por mes (USD)"
        data=${usdMonthlyProcessed}
        summary=${usdMonthlySummary}
        seriesName="USD"
        valueFormatter=${fmtUsdM}
        color="#2563eb"
      />

      <!-- Tall RIGHT (col 3, rows 1–3): Subsidio por empresa -->
      <div class="h-full">
        <${GridTable}
          title="Subsidio por empresa"
          rows=${subsidioEmpresas}
          columns=${tableColumns}
          pageSize=${10}
          search=${true}
          sort=${true}
        />
      </div>

      <!-- Bottom FULL WIDTH (row 4): Area chart -->
      <${AreaChart}
        bare=${true}
        hideYAxis=${true}
        chartMaxHeight=${200}
        title="Total subsidio histórico"
        description=""
        data=${totalSubsidioProcessed}
        amount1Title="Total"
      />
    <//>
  `;
}
