// Palette tema per la brochure. Ogni tema definisce il pannello centrale scuro,
// i due pannelli polizza (colori diversi) e i colori funzionali (check/pallino).

export const THEMES = [
  {
    id: "futuria",
    name: "Futuria",
    swatch: ["#0E2D50", "#C2942E", "#164430"],
    center: { bg: "#0E2D50", text: "#F4EFE3", accent: "#C2942E", muted: "#9DB0C7", line: "#2A4568" },
    panelBg: "#FFFFFF",
    bodyText: "#1F2A37",
    boxBg: "#F5F1E8",
    boxBorder: "#E4DCC7",
    check: "#1E8E4E",
    dot: "#D0342C",
    panelA: { header: "#0E2D50", headerText: "#FFFFFF", accent: "#C2942E" },
    panelB: { header: "#164430", headerText: "#FFFFFF", accent: "#C2942E" },
  },
  {
    id: "ardesia",
    name: "Ardesia & Rame",
    swatch: ["#1F2A37", "#D97706", "#0F766E"],
    center: { bg: "#1F2A37", text: "#EEF2F6", accent: "#E7A33E", muted: "#93A3B5", line: "#334154" },
    panelBg: "#FFFFFF",
    bodyText: "#1B2530",
    boxBg: "#F1F5F9",
    boxBorder: "#DDE5EC",
    check: "#16A34A",
    dot: "#DC2626",
    panelA: { header: "#26445F", headerText: "#FFFFFF", accent: "#E7A33E" },
    panelB: { header: "#8A4B12", headerText: "#FFFFFF", accent: "#E7A33E" },
  },
  {
    id: "bordeaux",
    name: "Bordeaux & Oro",
    swatch: ["#3F0F14", "#C99A3B", "#1E3A5F"],
    center: { bg: "#3F0F14", text: "#F6ECE1", accent: "#D3A64A", muted: "#C7A2A2", line: "#5C2429" },
    panelBg: "#FFFFFF",
    bodyText: "#2A1E1E",
    boxBg: "#FAF3EC",
    boxBorder: "#EADCCD",
    check: "#15803D",
    dot: "#C0392B",
    panelA: { header: "#5B1A1A", headerText: "#FFFFFF", accent: "#D3A64A" },
    panelB: { header: "#1E3A5F", headerText: "#FFFFFF", accent: "#D3A64A" },
  },
];

export const getTheme = (id) => THEMES.find((t) => t.id === id) || THEMES[0];
