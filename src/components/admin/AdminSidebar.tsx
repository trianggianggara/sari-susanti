import { h } from 'preact';

interface AdminSidebarProps {
  currentPath: string;
}

interface MenuItem {
  label: string;
  path:  string;
  icon:  h.JSX.Element;
}

const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const LayersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);

const ShoppingBagIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const ImageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const HelpCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

export default function AdminSidebar({ currentPath }: AdminSidebarProps) {
  const menuItems: MenuItem[] = [
    { label: 'Dashboard',  path: '/admin',                icon: <DashboardIcon /> },
    { label: 'Kategori',   path: '/admin/categories',     icon: <LayersIcon /> },
    { label: 'Produk',     path: '/admin/products',       icon: <ShoppingBagIcon /> },
    { label: 'Banner',     path: '/admin/banners',        icon: <ImageIcon /> },
    { label: 'Testimoni',  path: '/admin/testimonials',   icon: <StarIcon /> },
    { label: 'FAQ',        path: '/admin/faqs',           icon: <HelpCircleIcon /> },
  ];

  return (
    <aside class="admin-sidebar" role="navigation" aria-label="Menu admin">
      {/* Brand */}
      <div class="admin-sidebar__brand">
        <img src="/logo.png" alt="Sari Susanti Logo" class="admin-sidebar__logo-mark" />
        <div class="admin-sidebar__brand-text">
          <span class="admin-sidebar__brand-name">Sari Susanti</span>
          <span class="admin-sidebar__brand-sub">Admin Portal</span>
        </div>
      </div>

      {/* Navigation */}
      <nav class="admin-sidebar__nav" aria-label="Menu utama">
        <ul class="admin-sidebar__list" role="list">
          {menuItems.map((item) => {
            const isActive =
              item.path === '/admin'
                ? currentPath === '/admin'
                : currentPath.startsWith(item.path);

            return (
              <li key={item.path} class="admin-sidebar__item">
                <a
                  href={item.path}
                  class={`admin-sidebar__link ${isActive ? 'admin-sidebar__link--active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <span class="admin-sidebar__indicator" aria-hidden="true" />
                  )}
                  <span class="admin-sidebar__link-icon">{item.icon}</span>
                  <span class="admin-sidebar__link-label">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div class="admin-sidebar__footer">
        <div class="admin-sidebar__footer-info">
          <span class="admin-sidebar__footer-copy">
            &copy; {new Date().getFullYear()} Sari Susanti
          </span>
          <span class="admin-sidebar__footer-version">v1.0</span>
        </div>
      </div>
    </aside>
  );
}
