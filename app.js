// @ts-check
import { h, render } from 'https://esm.sh/preact';
import { useState } from 'https://esm.sh/preact/hooks';
import htm from 'https://esm.sh/htm';

import SidebarLayout from './components/sidebar-layout-component.js';
import { PAGES } from './pages';

const html = htm.bind(h);

const App = () => {
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

render(html`<${App} />`, document.getElementById('app'));
