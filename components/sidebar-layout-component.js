// @ts-check
import { h } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';

const html = htm.bind(h);

/**
 * Creates the main layout with an interactive sidebar.
 * @param {import('../types.js').SidebarLayoutProps} props
 * @returns {import('preact').VNode}
 */
const SidebarLayout = ({ children, activeView, onNavigate }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'comparison', label: 'Sales Comparison' },
        { id: 'growth', label: 'Growth Chart' },
    ];

    const linkClass = (id) => {
        const base = 'block w-full text-left py-2 px-4 rounded-md transition';
        return activeView === id
            ? `${base} bg-sky-500 text-white`
            : `${base} hover:bg-slate-700`;
    };

    return html`
      <div class="flex min-h-screen bg-slate-100 font-sans">
        <aside class="w-64 flex-shrink-0 bg-slate-800 p-6 text-slate-100">
          <h2 class="text-2xl font-bold mb-8">My App</h2>

          <nav>
            <ul class="space-y-2">
              ${navItems.map(item => html`
                <li>
                  <button onClick=${() => onNavigate(item.id)} class=${linkClass(item.id)}>
                    ${item.label}
                  </button>
                </li>
              `)}
            </ul>
          </nav>
        </aside>

        <main class="flex-grow p-8">
          ${children}
        </main>
      </div>
    `;
};

export default SidebarLayout;