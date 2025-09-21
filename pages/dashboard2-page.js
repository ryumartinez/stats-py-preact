// @ts-check
import { h } from 'https://esm.sh/preact';
import { useMemo, useState, useCallback } from 'https://esm.sh/preact/hooks';
import htm from 'https://esm.sh/htm';

import Dashboard2Layout from './../layouts/dashboard2-layout.js';
import BarChart from './../components/bar-chart-component.js';
import AreaChart from './../components/area-chart-component.js';
import GridTable, { fmtInt, fmtFloat } from './../components/grid-table-component.js';

// IPK
import {
    ipkAnual,
    ipkAnual2021, ipkAnual2022, ipkAnual2023, ipkAnual2024, ipkAnual2025,
    ipkMensual2021, ipkMensual2022, ipkMensual2023, ipkMensual2024, ipkMensual2025,
} from '../data/dashboard2/ipk.js';

// Km
import {
    kilometrosAnual,
    totalKilometrosAnual2021, kilometrosMensual2021,
    totalKilometrosAnual2022, kilometrosMensual2022,
    totalKilometrosAnual2023, kilometrosMensual2023,
    totalKilometrosAnual2024, kilometrosMensual2024,
    totalKilometrosAnual2025, kilometrosMensual2025,
} from '../data/dashboard2/kilometros.js';

// Validaciones
import {
    validacionesAnual,
    totalValidacionesAnual,
    totalValidacionesAnual2022,
    totalValidacionesAnual2023,
    totalValidacionesAnual2024,
    totalValidacionesAnual2025,
    validacionesMensual2021,
    validacionesMensual2022,
    validacionesMensual2023,
    validacionesMensual2024,
    validacionesMensual2025,
} from '../data/dashboard2/validaciones.js';

import { datosPorEmpresa } from '../data/dashboard2/empresas.js';
import { busesItvHistorico } from '../data/dashboard2/itv.js';

const html = htm.bind(h);

export default function Dashboard2Page() {
    // ===== stable number formatters =====
    const fmtIPK = useMemo(() => (n) =>
        Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), []);
    const fmtKM  = useMemo(() => (n) =>
        Number(n).toLocaleString('en-US', { maximumFractionDigits: 1 }), []);
    const fmtVal = useMemo(() => (n) =>
        Number(n).toLocaleString('en-US', { maximumFractionDigits: 1 }), []);
    const fmtValM = useMemo(() => (n) => `${fmtVal(n)}M`, [fmtVal]);
    const fmtKMM  = useMemo(() => (n) => `${fmtKM(n)}M`, [fmtKM]);

    // ===== processed annual (stable) =====
    const validacionesAnualProcessed = useMemo(
        () => validacionesAnual.map(d => ({ ...d, date: String(d.date.getFullYear()) })), []);
    const kilometrosAnualProcessed = useMemo(
        () => kilometrosAnual.map(d => ({ ...d, date: String(d.date.getFullYear()) })), []);
    const ipkAnualProcessed = useMemo(
        () => ipkAnual.map(d => ({ ...d, date: String(d.date.getFullYear()) })), []);

    // ===== area chart data (stable) =====
    const itvHistoricoProcessed = useMemo(
        () => busesItvHistorico.map(d => ({ ...d, date: d.date.toLocaleString('es-ES', { month: 'short', year: '2-digit' }) })), []);

    // ===== DRILLDOWN STATES =====
    const [kmYear,  setKmYear]  = useState(2021);
    const [valYear, setValYear] = useState(2021);
    const [ipkYear, setIpkYear] = useState(2021);

    // ---- maps (stable identities via useMemo) ----
    const kmMonthlyByYear = useMemo(() => ({
        2021: kilometrosMensual2021,
        2022: kilometrosMensual2022,
        2023: kilometrosMensual2023,
        2024: kilometrosMensual2024,
        2025: kilometrosMensual2025,
    }), []);
    const kmTotalsByYear = useMemo(() => ({
        2021: totalKilometrosAnual2021,
        2022: totalKilometrosAnual2022,
        2023: totalKilometrosAnual2023,
        2024: totalKilometrosAnual2024,
        2025: totalKilometrosAnual2025,
    }), []);

    const valMonthlyByYear = useMemo(() => ({
        2021: validacionesMensual2021,
        2022: validacionesMensual2022,
        2023: validacionesMensual2023,
        2024: validacionesMensual2024,
        2025: validacionesMensual2025,
    }), []);
    const valTotalsByYear = useMemo(() => ({
        2021: totalValidacionesAnual,
        2022: totalValidacionesAnual2022,
        2023: totalValidacionesAnual2023,
        2024: totalValidacionesAnual2024,
        2025: totalValidacionesAnual2025,
    }), []);

    const ipkMonthlyByYear = useMemo(() => ({
        2021: ipkMensual2021,
        2022: ipkMensual2022,
        2023: ipkMensual2023,
        2024: ipkMensual2024,
        2025: ipkMensual2025,
    }), []);
    const ipkAvgByYear = useMemo(() => ({
        2021: ipkAnual2021,
        2022: ipkAnual2022,
        2023: ipkAnual2023,
        2024: ipkAnual2024,
        2025: ipkAnual2025,
    }), []);

    // ---- processed monthly (recompute only when year changes) ----
    const kmMonthlyProcessed = useMemo(() => {
        const raw = kmMonthlyByYear[kmYear] ?? kilometrosMensual2021;
        return raw.map(d => ({ ...d, date: d.date.toLocaleString('es-ES', { month: 'short' }) }));
    }, [kmYear, kmMonthlyByYear]);

    const kmMonthlySummary = useMemo(() => ({
        title: `Total Kilómetros ${kmYear}`,
        summaryAmount: kmTotalsByYear[kmYear] ?? totalKilometrosAnual2021,
    }), [kmYear, kmTotalsByYear]);

    const valMonthlyProcessed = useMemo(() => {
        const raw = valMonthlyByYear[valYear] ?? validacionesMensual2021;
        return raw.map(d => ({ ...d, date: d.date.toLocaleString('es-ES', { month: 'short' }) }));
    }, [valYear, valMonthlyByYear]);

    const valMonthlySummary = useMemo(() => ({
        title: `Total Validaciones ${valYear}`,
        summaryAmount: valTotalsByYear[valYear] ?? totalValidacionesAnual,
    }), [valYear, valTotalsByYear]);

    const ipkMonthlyProcessed = useMemo(() => {
        const raw = ipkMonthlyByYear[ipkYear] ?? ipkMensual2021;
        return raw.map(d => ({ ...d, date: d.date.toLocaleString('es-ES', { month: 'short' }) }));
    }, [ipkYear, ipkMonthlyByYear]);

    const ipkMonthlySummary = useMemo(() => ({
        title: `IPK promedio ${ipkYear}`,
        summaryAmount: ipkAvgByYear[ipkYear] ?? ipkAnual2021,
    }), [ipkYear, ipkAvgByYear]);

    // ===== stable click handlers (only the target chart re-renders) =====
    const onKmYearClick = useCallback(({ category }) => {
        const y = parseInt(String(category), 10);
        if (!Number.isNaN(y) && kmMonthlyByYear[y]) setKmYear(y);
    }, [kmMonthlyByYear]);

    const onValYearClick = useCallback(({ category }) => {
        const y = parseInt(String(category), 10);
        if (!Number.isNaN(y) && valMonthlyByYear[y]) setValYear(y);
    }, [valMonthlyByYear]);

    const onIpkYearClick = useCallback(({ category }) => {
        const y = parseInt(String(category), 10);
        if (!Number.isNaN(y) && ipkMonthlyByYear[y]) setIpkYear(y);
    }, [ipkMonthlyByYear]);

    // ===== table (static) =====
    const cols = useMemo(() => ([
        { key: 'EmpresaLimpia', header: 'Empresa' },
        { key: 'Ipk', header: 'IPK', align: 'right', format: (v) => fmtFloat(v, 2) },
        { key: 'Validaciones', header: 'Validaciones', align: 'right', format: (v) => fmtInt(v) },
        { key: 'Kilometros', header: 'Kilómetros', align: 'right', format: (v) => fmtInt(v) },
        { key: 'BusesConItv', header: 'Buses c/ ITV', align: 'right', format: (v) => fmtInt(v) },
    ]), []);

    return html`
      <${Dashboard2Layout} rowHeight="260px">
        <!-- 1: Validaciones anual (click to drill) -->
        <${BarChart}
          bare=${true}
          hideYAxis=${true}
          chartMaxHeight=${260}
          title="Validaciones"
          description="Equivalente a cantidad de pasajes"
          data=${validacionesAnualProcessed}
          seriesName="Validaciones"
          valueFormatter=${fmtVal}
          color="#3b82f6"
          onBarClick=${onValYearClick}
        />

        <!-- 2: Kilómetros anual (click to drill) -->
        <${BarChart}
          bare=${true}
          hideYAxis=${true}
          chartMaxHeight=${260}
          title="Kilómetros"
          description="Distancia recorrida por los buses"
          data=${kilometrosAnualProcessed}
          seriesName="Km"
          valueFormatter=${fmtKM}
          color="#1e3a8a"
          onBarClick=${onKmYearClick}
        />

        <!-- 3: IPK anual (click to drill) -->
        <${BarChart}
          bare=${true}
          hideYAxis=${true}
          chartMaxHeight=${260}
          title="IPK - Índice Pasajero por Kilómetro"
          description="Validaciones por kilómetro"
          data=${ipkAnualProcessed}
          seriesName="IPK"
          valueFormatter=${fmtIPK}
          color="#6b7280"
          onBarClick=${onIpkYearClick}
        />

        <!-- 4: Validaciones mensual (driven by selected year) -->
        <${BarChart}
          bare=${true}
          hideYAxis=${true}
          chartMaxHeight=${260}
          title=${`Validaciones ${valYear}`}
          description=""
          data=${valMonthlyProcessed}
          summary=${valMonthlySummary}
          seriesName="Validaciones"
          valueFormatter=${fmtValM}
          color="#3b82f6"
        />

        <!-- 5: Kilómetros mensual (driven by selected year) -->
        <${BarChart}
          bare=${true}
          hideYAxis=${true}
          chartMaxHeight=${260}
          title=${`Kilómetros ${kmYear}`}
          description=""
          data=${kmMonthlyProcessed}
          summary=${kmMonthlySummary}
          seriesName="Km"
          valueFormatter=${fmtKMM}
          color="#64748b"
        />

        <!-- 6: IPK mensual (driven by selected year) -->
        <${BarChart}
          bare=${true}
          hideYAxis=${true}
          chartMaxHeight=${260}
          title=${`IPK ${ipkYear}`}
          description=""
          data=${ipkMonthlyProcessed}
          summary=${ipkMonthlySummary}
          seriesName="IPK"
          valueFormatter=${fmtIPK}
          color="#1d4ed8"
        />

        <!-- 7 (tall right): Tabla -->
        <div class="h-full">
          <${GridTable}
            title="IPK, validaciones y kilómetros por empresa"
            rows=${datosPorEmpresa}
            columns=${cols}
            pageSize=${10}
            search=${true}
            sort=${true}
          />
        </div>

        <!-- 8 (full width bottom): ITV area -->
        <${AreaChart}
          bare=${true}
          hideYAxis=${true}
          chartMaxHeight=${260}
          title="Buses con ITV"
          description="Evolución histórica"
          data=${itvHistoricoProcessed}
          amount1Title="Buses con ITV"
        />
      <//>
    `;
}
