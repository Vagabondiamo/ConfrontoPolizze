import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export async function generateBrochurePdf(data) {
  // A4 landscape: 297mm × 210mm = 1122px × 794px at 96 DPI
  const previewElement = document.getElementById("brochure-preview");
  if (!previewElement) {
    throw new Error("Preview element not found");
  }

  // Cattura l'elemento come canvas ad alta risoluzione (dpi=300)
  const canvas = await html2canvas(previewElement, {
    scale: 3, // 3x per qualità alta
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#ffffff",
  });

  // A4 landscape in mm
  const pdfWidth = 297;
  const pdfHeight = 210;

  // Calcola proporzioni immagine
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const canvasRatio = canvasWidth / canvasHeight;
  const pdfRatio = pdfWidth / pdfHeight;

  let imgWidth = pdfWidth;
  let imgHeight = pdfWidth / canvasRatio;

  // Se l'immagine è più alta della pagina, ridimensiona
  if (imgHeight > pdfHeight) {
    imgHeight = pdfHeight;
    imgWidth = pdfHeight * canvasRatio;
  }

  // Centra orizzontalmente se necessario
  const xOffset = (pdfWidth - imgWidth) / 2;
  const yOffset = (pdfHeight - imgHeight) / 2;

  // Crea PDF A4 landscape
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  // Converti canvas a immagine e aggiungi al PDF
  const imgData = canvas.toDataURL("image/png");
  doc.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);

  // Esporta come Blob
  return doc.output("blob");
}
