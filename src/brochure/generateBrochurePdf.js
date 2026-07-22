import { jsPDF } from "jspdf";

/**
 * Cattura il nodo DOM del preview tramite html2canvas e lo salva come PDF A4
 * landscape identico a quello mostrato nell'anteprima.
 *
 * @param {HTMLElement} previewNode  - il div con data-testid="brochure-preview"
 * @param {{ savePath?: string }} opts
 * @returns {Promise<{ blob: Blob, path: string|null }>}
 */
export async function generateBrochurePdfFromPreview(previewNode, opts = {}) {
  // 1. Importa html2canvas dinamicamente (già in bundle separate chunk)
  const html2canvas = (await import("html2canvas")).default;

  // 2. Cattura il nodo preview ad alta risoluzione
  const scale = 3; // 3× per qualità stampa
  const canvas = await html2canvas(previewNode, {
    scale,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
    imageTimeout: 15000,
  });

  // 3. Costruisci il PDF A4 landscape
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();   // 297mm
  const pageH = doc.internal.pageSize.getHeight();  // 210mm

  const imgData = canvas.toDataURL("image/png");
  doc.addImage(imgData, "PNG", 0, 0, pageW, pageH, undefined, "FAST");

  // 4. Restituisce il blob pronto per il salvataggio
  const blob = doc.output("blob");
  return blob;
}