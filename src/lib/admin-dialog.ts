/**
 * Admin Confirm Dialog
 * Native <dialog> with showModal(), light-dismiss fallback for Safari.
 * Returns a Promise<boolean> — true = confirmed, false = cancelled.
 */

export interface ConfirmDialogOptions {
  /** Dialog heading. Default: 'Konfirmasi' */
  title?: string;
  /** Label for the destructive button. Default: 'Ya, Hapus' */
  confirmLabel?: string;
}

let dialogEl: HTMLDialogElement | null = null;

function buildDialog(): HTMLDialogElement {
  const el = document.createElement('dialog');
  el.id = 'admin-confirm-dialog';
  el.setAttribute('aria-labelledby', 'confirm-dialog-title');
  el.innerHTML = `
    <div class="confirm-dialog__content">
      <div class="confirm-dialog__icon" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>
      <h3 id="confirm-dialog-title" class="confirm-dialog__title">Konfirmasi</h3>
      <p class="confirm-dialog__message"></p>
      <div class="confirm-dialog__actions">
        <button class="confirm-dialog__cancel" id="confirm-cancel-btn" type="button">Batal</button>
        <button class="confirm-dialog__confirm" id="confirm-ok-btn" type="button">Hapus</button>
      </div>
    </div>
  `;
  document.body.appendChild(el);

  // Light-dismiss fallback for Safari (closedby="any" not yet supported)
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    el.addEventListener('click', (e: MouseEvent) => {
      if (e.target !== el) return;
      const rect = el.getBoundingClientRect();
      const inside =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;
      if (!inside) el.close('cancel');
    });
  }

  return el;
}

function getDialog(): HTMLDialogElement {
  if (!dialogEl) dialogEl = buildDialog();
  return dialogEl;
}

export function showConfirmDialog(
  message: string,
  {
    title = 'Konfirmasi',
    confirmLabel = 'Ya, Hapus',
  }: ConfirmDialogOptions = {},
): Promise<boolean> {
  return new Promise((resolve) => {
    const dialog = getDialog();

    // Update content
    const titleEl = dialog.querySelector<HTMLElement>('.confirm-dialog__title')!;
    const msgEl   = dialog.querySelector<HTMLElement>('.confirm-dialog__message')!;
    const okBtn   = dialog.querySelector<HTMLButtonElement>('#confirm-ok-btn')!;
    const cancelBtn = dialog.querySelector<HTMLButtonElement>('#confirm-cancel-btn')!;

    titleEl.textContent  = title;
    msgEl.textContent    = message;
    okBtn.textContent    = confirmLabel;

    function cleanup(): void {
      okBtn.removeEventListener('click', onOk);
      cancelBtn.removeEventListener('click', onCancel);
    }

    function onOk(): void {
      cleanup();
      dialog.close('confirm');
      resolve(true);
    }

    function onCancel(): void {
      cleanup();
      dialog.close('cancel');
      resolve(false);
    }

    okBtn.addEventListener('click', onOk);
    cancelBtn.addEventListener('click', onCancel);

    // 'cancel' event fires on Esc key or closedby="any"
    dialog.addEventListener('cancel', () => { cleanup(); resolve(false); }, { once: true });

    // Enable light-dismiss for browsers that support it
    try { dialog.setAttribute('closedby', 'any'); } catch { /* ignore */ }

    dialog.showModal();
  });
}
