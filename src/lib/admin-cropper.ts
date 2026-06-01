/**
 * Admin Image Cropper
 * Canvas-based cropper inside a native <dialog>.
 * Features: drag-to-pan, scroll-to-zoom, ratio presets (Free / 4:3 / 1:1).
 * Outputs a Blob + data URL via callback.
 */

type RatioKey = 'free' | '4:3' | '1:1';
export type CropCallback = (blob: Blob, dataUrl: string) => void;

interface CropperState {
  img:       HTMLImageElement | null;
  scale:     number;
  offsetX:   number;
  offsetY:   number;
  ratioKey:  RatioKey;
  frameW:    number;
  frameH:    number;
  callback:  CropCallback | null;
  isDragging: boolean;
  lastX:     number;
  lastY:     number;
}

const state: CropperState = {
  img: null, scale: 1, offsetX: 0, offsetY: 0,
  ratioKey: 'free', frameW: 0, frameH: 0, callback: null,
  isDragging: false, lastX: 0, lastY: 0,
};

let dialogEl:  HTMLDialogElement | null  = null;
let canvasEl:  HTMLCanvasElement | null  = null;
let frameEl:   HTMLElement | null        = null;

/* ── Dialog Construction ────────────────────────────────────── */

function buildCropperDialog(): HTMLDialogElement {
  const el = document.createElement('dialog');
  el.id = 'admin-cropper-dialog';
  el.setAttribute('aria-labelledby', 'cropper-dialog-title');
  el.innerHTML = `
    <div class="cropper-dialog__inner">
      <div class="cropper-dialog__header">
        <h3 id="cropper-dialog-title" class="cropper-dialog__title">Pangkas Gambar</h3>
        <button id="cropper-close-btn" class="cropper-dialog__close" type="button" aria-label="Tutup">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="cropper-dialog__ratio-bar">
        <span class="cropper-ratio-label">Rasio:</span>
        <button class="cropper-ratio-btn is-active" data-ratio="free"  type="button">Bebas</button>
        <button class="cropper-ratio-btn"            data-ratio="4:3"  type="button">4 : 3</button>
        <button class="cropper-ratio-btn"            data-ratio="1:1"  type="button">1 : 1</button>
      </div>

      <div class="cropper-dialog__canvas-wrap" id="cropper-canvas-wrap">
        <canvas id="cropper-canvas"></canvas>
        <div class="cropper-overlay" aria-hidden="true">
          <div class="cropper-frame" id="cropper-frame">
            <div class="cropper-frame__corner cropper-frame__corner--tl"></div>
            <div class="cropper-frame__corner cropper-frame__corner--tr"></div>
            <div class="cropper-frame__corner cropper-frame__corner--bl"></div>
            <div class="cropper-frame__corner cropper-frame__corner--br"></div>
            <div class="cropper-frame__grid"></div>
          </div>
        </div>
      </div>

      <p class="cropper-dialog__hint">Geser gambar · Scroll / pinch untuk zoom</p>

      <div class="cropper-dialog__actions">
        <button id="cropper-cancel-btn" class="cropper-btn-cancel" type="button">Batal</button>
        <button id="cropper-apply-btn"  class="cropper-btn-apply"  type="button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          Crop &amp; Terapkan
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(el);

  // Bind references
  canvasEl = el.querySelector<HTMLCanvasElement>('#cropper-canvas')!;
  frameEl  = el.querySelector<HTMLElement>('#cropper-frame')!;

  // Close buttons
  el.querySelector('#cropper-close-btn')?.addEventListener('click', () => el.close('cancel'));
  el.querySelector('#cropper-cancel-btn')?.addEventListener('click', () => el.close('cancel'));
  el.querySelector('#cropper-apply-btn')?.addEventListener('click', applyCrop);

  // Ratio buttons
  el.querySelectorAll<HTMLButtonElement>('.cropper-ratio-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('.cropper-ratio-btn').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state.ratioKey = btn.dataset.ratio as RatioKey;
      recalcFrame();
    });
  });

  // Backdrop light-dismiss
  el.addEventListener('click', (e: MouseEvent) => {
    if (e.target !== el) return;
    el.close('cancel');
  });

  // Canvas interactions
  initCanvasInteractions(canvasEl);

  return el;
}

function getDialog(): HTMLDialogElement {
  if (!dialogEl) dialogEl = buildCropperDialog();
  return dialogEl;
}

/* ── Canvas Interactions ────────────────────────────────────── */

function initCanvasInteractions(canvas: HTMLCanvasElement): void {
  // Mouse drag
  canvas.addEventListener('mousedown', (e: MouseEvent) => {
    state.isDragging = true;
    state.lastX = e.clientX;
    state.lastY = e.clientY;
    canvas.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e: MouseEvent) => {
    if (!state.isDragging) return;
    state.offsetX += e.clientX - state.lastX;
    state.offsetY += e.clientY - state.lastY;
    state.lastX = e.clientX;
    state.lastY = e.clientY;
    drawCanvas();
  });

  window.addEventListener('mouseup', () => {
    state.isDragging = false;
    canvas.style.cursor = 'grab';
  });

  // Touch drag
  canvas.addEventListener('touchstart', (e: TouchEvent) => {
    if (e.touches.length === 1) {
      state.isDragging = true;
      state.lastX = e.touches[0].clientX;
      state.lastY = e.touches[0].clientY;
    }
  }, { passive: true });

  canvas.addEventListener('touchmove', (e: TouchEvent) => {
    if (!state.isDragging || e.touches.length !== 1) return;
    state.offsetX += e.touches[0].clientX - state.lastX;
    state.offsetY += e.touches[0].clientY - state.lastY;
    state.lastX = e.touches[0].clientX;
    state.lastY = e.touches[0].clientY;
    drawCanvas();
  }, { passive: true });

  canvas.addEventListener('touchend', () => { state.isDragging = false; });

  // Scroll-to-zoom
  canvas.addEventListener('wheel', (e: WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 0.92 : 1.08;
    state.scale = Math.min(8, Math.max(0.1, state.scale * factor));
    drawCanvas();
  }, { passive: false });
}

/* ── Frame Calculation ──────────────────────────────────────── */

function recalcFrame(): void {
  if (!canvasEl || !frameEl) return;
  const cw = canvasEl.offsetWidth;
  const ch = canvasEl.offsetHeight;
  const pad = 0.82;

  let fw: number, fh: number;

  if (state.ratioKey === '4:3') {
    fw = Math.min(cw * pad, (ch * pad * 4) / 3);
    fh = (fw * 3) / 4;
  } else if (state.ratioKey === '1:1') {
    fw = fh = Math.min(cw * pad, ch * pad);
  } else {
    // free — generous crop area
    fw = cw * pad;
    fh = ch * pad;
  }

  state.frameW = fw;
  state.frameH = fh;

  frameEl.style.width  = `${fw}px`;
  frameEl.style.height = `${fh}px`;
  frameEl.style.left   = `${(cw - fw) / 2}px`;
  frameEl.style.top    = `${(ch - fh) / 2}px`;
}

/* ── Canvas Drawing ─────────────────────────────────────────── */

function drawCanvas(): void {
  if (!canvasEl || !state.img) return;
  const ctx = canvasEl.getContext('2d')!;
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

  const dw = state.img.naturalWidth  * state.scale;
  const dh = state.img.naturalHeight * state.scale;
  const cx = canvasEl.width  / 2 + state.offsetX - dw / 2;
  const cy = canvasEl.height / 2 + state.offsetY - dh / 2;

  ctx.drawImage(state.img, cx, cy, dw, dh);
}

/* ── Crop Application ───────────────────────────────────────── */

function applyCrop(): void {
  if (!canvasEl || !state.img || !state.callback) return;

  const dpr = window.devicePixelRatio || 1;
  const out  = document.createElement('canvas');
  out.width  = state.frameW * dpr;
  out.height = state.frameH * dpr;

  const ctx = out.getContext('2d')!;
  ctx.scale(dpr, dpr);

  const dw = state.img.naturalWidth  * state.scale;
  const dh = state.img.naturalHeight * state.scale;
  const cx = canvasEl.offsetWidth  / 2 + state.offsetX;
  const cy = canvasEl.offsetHeight / 2 + state.offsetY;

  const frameLeft = (canvasEl.offsetWidth  - state.frameW) / 2;
  const frameTop  = (canvasEl.offsetHeight - state.frameH) / 2;

  const srcX = (frameLeft - cx + dw / 2) / state.scale;
  const srcY = (frameTop  - cy + dh / 2) / state.scale;
  const srcW = state.frameW / state.scale;
  const srcH = state.frameH / state.scale;

  ctx.drawImage(state.img, srcX, srcY, srcW, srcH, 0, 0, state.frameW, state.frameH);

  const dataUrl = out.toDataURL('image/jpeg', 0.92);

  out.toBlob(
    (blob) => {
      if (!blob) return;
      dialogEl?.close('apply');
      state.callback!(blob, dataUrl);
    },
    'image/jpeg',
    0.92,
  );
}

/* ── Public API ─────────────────────────────────────────────── */

/**
 * Opens the image cropper dialog for a given File.
 * @param file     The image file to crop
 * @param callback Called with (blob, dataUrl) after the user applies the crop
 */
export function openImageCropper(file: File, callback: CropCallback): void {
  const dialog = getDialog();

  // Reset state
  state.scale    = 1;
  state.offsetX  = 0;
  state.offsetY  = 0;
  state.ratioKey = 'free';
  state.callback = callback;

  // Reset ratio buttons to 'free'
  dialog.querySelectorAll('.cropper-ratio-btn').forEach((b) => b.classList.remove('is-active'));
  dialog.querySelector('[data-ratio="free"]')?.classList.add('is-active');

  // Load image
  const img = new Image();
  const url = URL.createObjectURL(file);

  img.onload = () => {
    state.img = img;
    URL.revokeObjectURL(url);

    // Size canvas to fit the wrap
    const wrap = dialog.querySelector<HTMLElement>('#cropper-canvas-wrap')!;
    const W = Math.min(wrap.clientWidth  || 640, 640);
    const H = Math.round(W * 0.58);

    canvasEl!.width         = W;
    canvasEl!.height        = H;
    canvasEl!.style.width   = `${W}px`;
    canvasEl!.style.height  = `${H}px`;

    // Fit image inside canvas at 85%
    state.scale = Math.min(
      (W * 0.85) / img.naturalWidth,
      (H * 0.85) / img.naturalHeight,
    );

    recalcFrame();
    drawCanvas();
  };

  img.src = url;
  dialog.showModal();
}
