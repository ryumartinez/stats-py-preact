// pages/dashboard3-page.js
// @ts-check
import { h } from 'https://esm.sh/preact';
import { useMemo } from 'https://esm.sh/preact/hooks';
import htm from 'https://esm.sh/htm';

import Dashboard3Layout from './../layouts/dashboard3-layout-component.js';
import LineChart from './../components/line-chart-component.js';

const html = htm.bind(h);

/* ---- Data imports (ensure each file exports the named const exactly) ---- */
// Pasaje
import { pasajeConvencional } from '../data/dashboard3/pasaje-convencional.js';
import { pasajeDiferencial }  from '../data/dashboard3/pasaje-diferencial.js';

// Subsidio
import { subsidioConvencional } from '../data/dashboard3/subsidio-convencional.js';
import { subsidioDiferencial }  from '../data/dashboard3/subsidio-diferencial.js';

// Tarifa técnica
import { tarifaTecnicaConvencional } from '../data/dashboard3/tarifa-tecnica-convencional.js';
import { tarifaTecnicaDiferencial }  from '../data/dashboard3/tarifa-tecnica-diferencial.js';

export default function Dashboard3Page() {
    // Format datasets for charts (string x-axis labels)
    const toProcessed = (arr) =>
        arr.map(d => ({
            ...d,
            date: d.date.toLocaleString('es-ES', { month: 'short', year: 'numeric' })
        }));

    const pasajeConvProc   = useMemo(() => toProcessed(pasajeConvencional), [pasajeConvencional]);
    const pasajeDifProc    = useMemo(() => toProcessed(pasajeDiferencial),  [pasajeDiferencial]);

    const subsConvProc     = useMemo(() => toProcessed(subsidioConvencional), [subsidioConvencional]);
    const subsDifProc      = useMemo(() => toProcessed(subsidioDiferencial),  [subsidioDiferencial]);

    const tarifaConvProc   = useMemo(() => toProcessed(tarifaTecnicaConvencional), [tarifaTecnicaConvencional]);
    const tarifaDifProc    = useMemo(() => toProcessed(tarifaTecnicaDiferencial),  [tarifaTecnicaDiferencial]);

    return html`
    <${Dashboard3Layout} rowHeight="220px">
      <${LineChart}
        bare=${true}
        hideYAxis=${true}
        chartMaxHeight=${200}
        title="Pasaje Convencional"
        description=""
        data=${pasajeConvProc}
        amount1Title="Vigente"
        amount2Title="Referencia"
      />
      <${LineChart}
        bare=${true}
        hideYAxis=${true}
        chartMaxHeight=${200}
        title="Pasaje Diferencial"
        description=""
        data=${pasajeDifProc}
        amount1Title="Vigente"
        amount2Title="Referencia"
      />
      <${LineChart}
        bare=${true}
        hideYAxis=${true}
        chartMaxHeight=${200}
        title="Subsidio Convencional"
        description=""
        data=${subsConvProc}
        amount1Title="Monto"
        amount2Title="Meta"
      />
      <${LineChart}
        bare=${true}
        hideYAxis=${true}
        chartMaxHeight=${200}
        title="Subsidio Diferencial"
        description=""
        data=${subsDifProc}
        amount1Title="Monto"
        amount2Title="Meta"
      />
      <${LineChart}
        bare=${true}
        hideYAxis=${true}
        chartMaxHeight=${200}
        title="Tarifa Técnica Convencional"
        description=""
        data=${tarifaConvProc}
        amount1Title="Calculada"
        amount2Title="Vigente"
      />
      <${LineChart}
        bare=${true}
        hideYAxis=${true}
        chartMaxHeight=${200}
        title="Tarifa Técnica Diferencial"
        description=""
        data=${tarifaDifProc}
        amount1Title="Calculada"
        amount2Title="Vigente"
      />
    <//>
  `;
}
