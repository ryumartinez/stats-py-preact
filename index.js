// @ts-check
import { h, render } from 'https://esm.sh/preact';
import { useState } from 'https://esm.sh/preact/hooks';
import htm from 'https://esm.sh/htm';

import SidebarLayout from './layouts/sidebar-layout-component.js';
import { PAGES } from './pages/index.js';

const html = htm.bind(h);

const Index = () => {
    /** @type {[('dashboard'|'comparison'|'growth'), import('preact/hooks').StateUpdater<('dashboard'|'comparison'|'growth')>]} */
    const [activeView, setActiveView] = useState('dashboard');

    const current = PAGES.find(p => p.id === activeView) ?? PAGES[0];
    const PageComponent = current.Component;

    return html`
    <${SidebarLayout} activeView=${activeView} onNavigate=${setActiveView}>
      <${PageComponent} />
    <//>
  `;
};

render(html`<${Index} />`, document.getElementById('app'));
