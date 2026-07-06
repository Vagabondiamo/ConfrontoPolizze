import { jsPDF } from "jspdf";
import { getTheme } from "./brochure/themes";
import { resolveData } from "./brochure/defaults";

// ---- helpers ----
const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
};
const fill = (doc, hex) => doc.setFillColor(...hexToRgb(hex));
const stroke = (doc, hex) => doc.setDrawColor(...hexToRgb(hex));
const text = (doc, hex) => doc.setTextColor(...hexToRgb(hex));

// Icone minimali disegnate a linee bianche dentro un quadrato accento.
function iconBox(doc, cx, cy, s, accent, kind) {
  fill(doc, accent);
  doc.roundedRect(cx, cy, s, s, 1, 1, "F");
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.35);
  const p = s * 0.24; // padding interno
  const x = cx + p, y = cy + p, w = s - 2 * p, h = s - 2 * p;
  if (kind === "email") {
    doc.rect(x, y, w, h, "S");
    doc.line(x, y, x + w / 2, y + h * 0.55);
    doc.line(x + w, y, x + w / 2, y + h * 0.55);
  } else if (kind === "phone") {
    doc.roundedRect(x + w * 0.22, y, w * 0.56, h, 0.6, 0.6, "S");
    doc.line(x + w * 0.36, y + h - 0.6, x + w * 0.64, y + h - 0.6);
  } else if (kind === "pin") {
    doc.circle(cx + s / 2, y + h * 0.34, w * 0.28, "S");
    doc.line(cx + s / 2 - w * 0.28, y + h * 0.4, cx + s / 2, y + h);
    doc.line(cx + s / 2 + w * 0.28, y + h * 0.4, cx + s / 2, y + h);
  } else if (kind === "web") {
    const r = w * 0.42;
    doc.circle(cx + s / 2, cy + s / 2, r, "S");
    doc.line(cx + s / 2 - r, cy + s / 2, cx + s / 2 + r, cy + s / 2);
    doc.ellipse(cx + s / 2, cy + s / 2, r * 0.42, r, "S");
  }
  doc.setLineWidth(0.2);
}

function drawPolicyPanel(doc, x0, w, p, colors, opts) {
  const { mirror } = opts;
  const pad = 8;
  const innerX = x0 + pad;
  const innerW = w - pad * 2;
  const alignX = mirror ? x0 + w - pad : innerX;
  const align = mirror ? "right" : "left";

  // Header
  fill(doc, p.header);
  doc.rect(x0, 0, w, 46, "F");
  // taglio geometrico netto (barra accento)
  fill(doc, p.accent);
  doc.rect(x0, 46, w, 2.4, "F");
  // tag "POLIZZA"
  text(doc, p.accent);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text(mirror ? "POLIZZA B" : "POLIZZA A", alignX, 15, { align, charSpace: 1.2 });
  // nome polizza
  text(doc, p.headerText);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  const nameLines = doc.splitTextToSize(p.name, innerW);
  doc.text(nameLines, alignX, 24, { align });
  // compagnia
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(p.company, alignX, 24 + nameLines.length * 5.6 + 2, { align });

  let y = 58;

  // sezione titolo helper
  const sectionTitle = (label) => {
    text(doc, p.header);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(label, alignX, y, { align, charSpace: 1 });
    stroke(doc, p.accent);
    doc.setLineWidth(0.4);
    doc.line(innerX, y + 2, innerX + innerW, y + 2);
    doc.setLineWidth(0.2);
    y += 7;
  };

  // COPERTURE
  sectionTitle("COPERTURE");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  text(doc, colors.bodyText);
  p.coverages.forEach((c) => {
    const tw = innerW - 6;
    const lines = doc.splitTextToSize(c, tw);
    const bx = mirror ? x0 + w - pad - 4 : innerX;
    fill(doc, p.accent);
    doc.rect(bx, y - 3, 3, 3, "F");
    const txX = mirror ? bx - 2 : bx + 5;
    doc.text(lines, txX, y, { align, maxWidth: tw });
    y += lines.length * 3.8 + 2;
  });

  y += 2;

  // DETTAGLI
  const drawDetails = () => {
    const startY = y;
    let h = 8;
    const details = [];
    if (p.capitaleDesc) details.push({ l: "Capitale:", v: p.capitaleDesc + (p.capitaleMin ? ` (min: ${p.capitaleMin}€)` : "") });
    if (p.durataDesc) details.push({ l: "Durata:", v: p.durataDesc + (p.durataMax ? ` (max: ${p.durataMax}a)` : "") });
    if (p.fiscalita) details.push({ l: "Fiscalità:", v: p.fiscalita });
    if (p.recesso) details.push({ l: "Recesso:", v: p.recesso });
    if (p.riscatto) details.push({ l: "Riscatto:", v: p.riscatto });

    h += details.length * 5;

    fill(doc, colors.boxBg);
    stroke(doc, colors.boxBorder);
    doc.setLineWidth(0.25);
    doc.roundedRect(innerX, startY, innerW, h, 1.2, 1.2, "FD");
    doc.setLineWidth(0.2);

    text(doc, p.header);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("DETTAGLI", mirror ? innerX + innerW - 4 : innerX + 4, startY + 5.5, { align });

    let yy = startY + 11;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    details.forEach((d) => {
      text(doc, p.header);
      doc.setFont("helvetica", "bold");
      const labelX = mirror ? innerX + innerW - 4 : innerX + 4;
      doc.text(d.l, labelX, yy, { align });
      
      text(doc, colors.bodyText);
      doc.setFont("helvetica", "normal");
      const valX = mirror ? innerX + 4 : innerX + innerW - 4;
      doc.text(d.v, valX, yy, { align: mirror ? "left" : "right" });
      yy += 5;
    });
    y = startY + h + 4;
  };
  drawDetails();

  // ESCLUSIONI
  const drawExclusions = () => {
    const startY = y;
    let h = 8;
    const wrapped = p.exclusions.map((it) => doc.splitTextToSize(it, innerW - 12));
    wrapped.forEach((ln) => (h += ln.length * 3.8 + 1.8));
    
    fill(doc, colors.boxBg);
    stroke(doc, colors.boxBorder);
    doc.setLineWidth(0.25);
    doc.roundedRect(innerX, startY, innerW, h, 1.2, 1.2, "FD");
    doc.setLineWidth(0.2);

    text(doc, p.header);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("ESCLUSIONI", mirror ? innerX + innerW - 4 : innerX + 4, startY + 5.5, { align });

    let yy = startY + 10.5;
    wrapped.forEach((ln) => {
      const mx = mirror ? innerX + innerW - 4 : innerX + 4;
      fill(doc, colors.dot);
      doc.circle(mirror ? mx - 1.5 : mx + 1, yy - 1.2, 1.1, "F");
      const txX = mirror ? mx - 5 : mx + 5;
      text(doc, colors.bodyText);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.text(ln, txX, yy, { align });
      yy += ln.length * 3.8 + 1.8;
    });
    y = startY + h + 4;
  };
  drawExclusions();

  // DATI MANCANTI
  if (p.datiMancanti && p.datiMancanti.filter(x => x && x.trim()).length > 0) {
    const startY = y;
    let h = 8;
    const wrapped = p.datiMancanti.map((it) => doc.splitTextToSize(it, innerW - 12));
    wrapped.forEach((ln) => (h += ln.length * 3.8 + 1.8));
    
    doc.setFillColor(254, 242, 242); // light red background
    doc.setDrawColor(239, 68, 68); // red border
    doc.setLineWidth(0.3);
    doc.roundedRect(innerX, startY, innerW, h, 1.2, 1.2, "FD");
    doc.setLineWidth(0.2);

    doc.setTextColor(185, 28, 28); // red text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("DA VERIFICARE", mirror ? innerX + innerW - 4 : innerX + 4, startY + 5.5, { align });

    let yy = startY + 10.5;
    wrapped.forEach((ln) => {
      const mx = mirror ? innerX + innerW - 4 : innerX + 4;
      doc.setFillColor(220, 38, 38); // dark red dot
      doc.circle(mirror ? mx - 1.5 : mx + 1, yy - 1.2, 1.1, "F");
      const txX = mirror ? mx - 5 : mx + 5;
      doc.setTextColor(153, 27, 27);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.text(ln, txX, yy, { align });
      yy += ln.length * 3.8 + 1.8;
    });
    y = startY + h + 4;
  }

  // Footer
  fill(doc, p.header);
  doc.rect(x0, 200, w, 10, "F");
  fill(doc, p.accent);
  doc.rect(x0, 200, w, 1.2, "F");
  text(doc, p.headerText);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text(p.name, mirror ? x0 + w - pad : innerX, 206, { align });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  text(doc, colors.panelBg);
  doc.text(p.docType, mirror ? innerX : x0 + w - pad, 206, { align: mirror ? "left" : "right" });
}

function drawCenterPanel(doc, x0, w, c, colors) {
  const cc = colors.center;
  const pad = 9;
  const innerX = x0 + pad;
  const innerW = w - pad * 2;
  const cx = x0 + w / 2;

  fill(doc, cc.bg);
  doc.rect(x0, 0, w, 210, "F");

  let y = 20;
  // Logo
  if (c.logo) {
    try {
      const fmt = c.logo.includes("image/png") ? "PNG" : "JPEG";
      const lw = 46, lh = 20;
      doc.addImage(c.logo, fmt, cx - lw / 2, y, lw, lh, undefined, "FAST");
      y += lh + 6;
    } catch (e) {
      y += 4;
    }
  } else {
    text(doc, cc.text);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("FUTURIA", cx, y + 10, { align: "center", charSpace: 2 });
    text(doc, cc.accent);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text("ASSICURAZIONI", cx, y + 15, { align: "center", charSpace: 3 });
    y += 24;
  }

  // linea sotto logo
  stroke(doc, cc.line);
  doc.setLineWidth(0.4);
  doc.line(innerX + 12, y, innerX + innerW - 12, y);
  doc.setLineWidth(0.2);
  y += 9;

  // Tipo prodotto
  text(doc, cc.accent);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const pt = doc.splitTextToSize(c.productType, innerW);
  doc.text(pt, cx, y, { align: "center" });
  y += pt.length * 6 + 5;

  // Descrizione
  text(doc, cc.text);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.6);
  const desc = doc.splitTextToSize(c.description, innerW);
  doc.text(desc, innerX, y, { align: "left", lineHeightFactor: 1.5 });
  y += desc.length * 4.6 + 8;

  // Contatti
  text(doc, cc.accent);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("CONTATTI", innerX, y, { charSpace: 1 });
  stroke(doc, cc.line);
  doc.setLineWidth(0.4);
  doc.line(innerX, y + 2.4, innerX + innerW, y + 2.4);
  doc.setLineWidth(0.2);
  y += 8;

  const contactRow = (kind, value) => {
    iconBox(doc, innerX, y - 4, 6, cc.accent, kind);
    text(doc, cc.text);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.4);
    const ln = doc.splitTextToSize(value, innerW - 10);
    doc.text(ln, innerX + 9, y, {});
    y += Math.max(7, ln.length * 4.2 + 2.5);
  };
  contactRow("pin", c.contacts.address);
  contactRow("phone", c.contacts.phone);
  contactRow("email", c.contacts.email);
  contactRow("web", c.contacts.website);

  y += 4;
  // Box consulente
  const boxH = 18;
  stroke(doc, cc.accent);
  doc.setLineWidth(0.5);
  doc.setFillColor(255, 255, 255, 0);
  doc.roundedRect(innerX, y, innerW, boxH, 1.5, 1.5, "S");
  doc.setLineWidth(0.2);
  text(doc, cc.muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.8);
  doc.text("IL TUO CONSULENTE", innerX + 5, y + 6, { charSpace: 1 });
  text(doc, cc.text);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(c.consultant.name, innerX + 5, y + 12, {});
  text(doc, cc.accent);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(c.consultant.role, innerX + 5, y + 16.4, {});

  // Slogan in fondo
  text(doc, cc.accent);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9.5);
  const sl = doc.splitTextToSize('"' + c.slogan + '"', innerW);
  doc.text(sl, cx, 198, { align: "center" });
}

export function generateBrochurePdf(rawData, { download = true } = {}) {
  const data = resolveData(rawData);
  const colors = getTheme(data.themeId);
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const panelW = 99;

  drawPolicyPanel(doc, 0, panelW, { ...data.policyA, header: colors.panelA.header, headerText: colors.panelA.headerText, accent: colors.panelA.accent }, colors, { mirror: false });
  drawCenterPanel(doc, panelW, panelW, data.center, colors);
  drawPolicyPanel(doc, panelW * 2, panelW, { ...data.policyB, header: colors.panelB.header, headerText: colors.panelB.headerText, accent: colors.panelB.accent }, colors, { mirror: true });

  // linee di piega sottili
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.15);
  doc.setLineDashPattern([1, 1], 0);
  doc.line(panelW, 0, panelW, 210);
  doc.line(panelW * 2, 0, panelW * 2, 210);
  doc.setLineDashPattern([], 0);

  if (download) {
    doc.save("brochure-futuria.pdf");
    return null;
  }
  return doc.output("datauristring");
}