/**
 * Admin Toast Notification System
 * Uses a lazy singleton container appended to <body>.
 * Animations are driven by CSS keyframes in global.css.
 */

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  /** Auto-dismiss delay in ms. Default: 3500 */
  duration?: number;
}

const ICONS: Record<ToastType, string> = {
  success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
  error:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  info:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
};

let container: HTMLDivElement | null = null;

function getContainer(): HTMLDivElement {
  if (!container) {
    container = document.createElement('div');
    container.id = 'admin-toast-container';
    document.body.appendChild(container);
  }
  return container;
}

function dismiss(toast: HTMLElement): void {
  clearTimeout((toast as HTMLElement & { _timer?: ReturnType<typeof setTimeout> })._timer);
  toast.classList.remove('admin-toast--visible');
  toast.classList.add('admin-toast--leaving');
  setTimeout(() => toast.remove(), 400);
}

export function showToast(
  message: string,
  type: ToastType = 'success',
  { duration = 3500 }: ToastOptions = {},
): void {
  const c = getContainer();
  const toast = document.createElement('div');
  toast.className = `admin-toast admin-toast--${type}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `
    <span class="admin-toast__icon" aria-hidden="true">${ICONS[type]}</span>
    <span class="admin-toast__message">${message}</span>
    <button class="admin-toast__close" aria-label="Tutup notifikasi">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  `;

  toast.querySelector('.admin-toast__close')?.addEventListener('click', () => dismiss(toast));
  c.appendChild(toast);

  // Double rAF to ensure transition from initial state triggers
  requestAnimationFrame(() =>
    requestAnimationFrame(() => toast.classList.add('admin-toast--visible')),
  );

  (toast as HTMLElement & { _timer?: ReturnType<typeof setTimeout> })._timer = setTimeout(
    () => dismiss(toast),
    duration,
  );
}

/**
 * Call this in the AdminLayout script to show success/error toasts
 * from server-side redirects that append ?success=... or ?error=...
 */
export function checkUrlParams(): void {
  const params = new URLSearchParams(window.location.search);
  const success = params.get('success');
  const error   = params.get('error');

  if (success) {
    showToast(decodeURIComponent(success), 'success');
    window.history.replaceState({}, '', window.location.pathname);
  }
  if (error) {
    showToast(decodeURIComponent(error), 'error');
    window.history.replaceState({}, '', window.location.pathname);
  }
}
