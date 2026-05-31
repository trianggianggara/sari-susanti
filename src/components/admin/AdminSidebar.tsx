import { h } from 'preact';

interface AdminSidebarProps {
  currentPath: string;
}

export default function AdminSidebar({ currentPath }: AdminSidebarProps) {
  const menuItems = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Kategori', path: '/admin/categories' },
    { label: 'Produk', path: '/admin/products' },
    { label: 'Banner', path: '/admin/banners' },
    { label: 'Testimoni', path: '/admin/testimonials' },
    { label: 'FAQ', path: '/admin/faqs' },
  ];

  return (
    <aside class="w-[260px] bg-emerald-dark text-white flex flex-col shadow-brand-md z-10">
      <div class="px-6 py-6 border-b border-emerald-muted">
        <h1 class="m-0 text-xl font-display tracking-wide">
          Sari Susanti <br/>
          <span class="text-gold text-sm font-body tracking-widest uppercase">Admin Portal</span>
        </h1>
      </div>
      <nav class="flex-1 py-6">
        <ul class="list-none p-0 m-0">
          {menuItems.map((item) => {
            const isActive = currentPath === item.path || (item.path !== '/admin' && currentPath.startsWith(item.path));
            return (
              <li key={item.path}>
                <a
                  href={item.path}
                  class={`block px-6 py-3 no-underline transition-all duration-150 ease-out border-l-4 text-base ${
                    isActive 
                      ? 'text-gold-light bg-emerald-glass2 border-gold font-semibold' 
                      : 'text-sand bg-transparent border-transparent font-normal hover:bg-emerald-glass hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div class="p-6 text-xs text-stone-light border-t border-emerald-muted">
        &copy; {new Date().getFullYear()} Sari Susanti
      </div>
    </aside>
  );
}
