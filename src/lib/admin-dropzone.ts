/**
 * Admin File Drop Zone
 * Handles drag-and-drop + click-to-browse file selection.
 * Pairs with openImageCropper to show the cropper on file pick.
 */

export interface DropzoneOptions {
  /** The visual zone container element */
  zoneEl: HTMLElement;
  /** Hidden <input type="file"> inside or near the zone */
  inputEl: HTMLInputElement;
  /** Called when a valid image file is selected */
  onFileSelected: (file: File) => void;
}

export function initDropzone({ zoneEl, inputEl, onFileSelected }: DropzoneOptions): void {
  // Click on the zone triggers the file picker (unless clicking a child button)
  zoneEl.addEventListener('click', (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    inputEl.click();
  });

  zoneEl.addEventListener('dragover', (e: DragEvent) => {
    e.preventDefault();
    zoneEl.classList.add('is-dragging');
  });

  zoneEl.addEventListener('dragleave', (e: DragEvent) => {
    if (!zoneEl.contains(e.relatedTarget as Node | null)) {
      zoneEl.classList.remove('is-dragging');
    }
  });

  zoneEl.addEventListener('drop', (e: DragEvent) => {
    e.preventDefault();
    zoneEl.classList.remove('is-dragging');
    const file = e.dataTransfer?.files[0];
    if (file?.type.startsWith('image/')) {
      onFileSelected(file);
    }
  });

  inputEl.addEventListener('change', () => {
    const file = inputEl.files?.[0];
    if (file) {
      // Clear input so the same file can be re-selected if cancelled
      inputEl.value = '';
      onFileSelected(file);
    }
  });
}

/**
 * Updates the drop zone's visual preview after a successful crop.
 * @param zoneEl  The drop zone container
 * @param dataUrl The cropped image data URL
 */
export function showDropzonePreview(zoneEl: HTMLElement, dataUrl: string): void {
  // Update or create preview image
  let preview = zoneEl.querySelector<HTMLElement>('.file-drop-zone__preview');
  if (!preview) {
    preview = document.createElement('div');
    preview.className = 'file-drop-zone__preview';
    zoneEl.appendChild(preview);
  }
  preview.innerHTML = `<img src="${dataUrl}" alt="Preview gambar yang dipilih" />`;

  // Update zone text to reflect selection
  const textEl = zoneEl.querySelector('.file-drop-zone__text');
  if (textEl) {
    textEl.innerHTML = `
      <strong>Gambar berhasil dipangkas</strong>
      Klik atau seret gambar baru untuk mengganti
    `;
  }

  // Hide the icon since we now have a preview
  const iconEl = zoneEl.querySelector<HTMLElement>('.file-drop-zone__icon');
  if (iconEl) iconEl.style.display = 'none';
}
