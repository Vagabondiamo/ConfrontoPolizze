import { toPng } from "html-to-image";
import { createRoot } from "react-dom/client";
import React from "react";
import { BrochurePrint } from "./BrochurePrint";

/**
 * Genera un'immagine PNG della brochure rendendo un componente dedicato
 * (BrochurePrint) off-screen con font-size fissi per A4, catturandolo
 * con html-to-image, e restituendo un Blob PNG.
 *
 * Preview e export sono completamente separati.
 *
 * @param {object} data  - i dati della brochure (stessi passati a <Preview>)
 * @returns {Promise<Blob>}
 */
export async function generateBrochureImage(data) {
  // 1. Crea container off-screen
  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed;
    left: -9999px;
    top: 0;
    width: 1122px;
    height: 794px;
    overflow: hidden;
    z-index: -1;
  `;
  document.body.appendChild(container);

  // 2. Monta il componente React nel container
  const root = createRoot(container);
  root.render(<BrochurePrint data={data} />);

  // 3. Attendi che il rendering sia completo
  await new Promise((r) => setTimeout(r, 200));

  try {
    // 4. Cattura con html-to-image (scale 2x per qualità alta)
    const dataUrl = await toPng(container, {
      width: 1122,
      height: 794,
      pixelRatio: 2,
      cacheBust: true,
      skipAutoScale: true,
    });

    // 5. Converti data URL in Blob
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return blob;
  } finally {
    // 6. Pulisci
    root.unmount();
    document.body.removeChild(container);
  }
}