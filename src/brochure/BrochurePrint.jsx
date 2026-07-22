import React from "react";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { getTheme } from "./themes";
import { resolveData } from "./defaults";

/**
 * Componente separato per l'esportazione. Ha font-size fissi in px
 * ottimizzati per un canvas di 1122×794 px (A4 landscape a 96 DPI).
 * Non condivide nessun vw/clamp con il Preview a schermo.
 */

/* ──── Pannello polizza (sinistra / destra) ──── */
const PrintPolicyPanel = ({ p, colors, panel, mirror, tag }) => {
  const align = mirror ? "text-right" : "text-left";
  const flexDir = mirror ? "flex-row-reverse" : "flex-row";
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: colors.panelBg, color: colors.bodyText }}>
      {/* Header */}
      <div style={{ position: "relative", padding: "22px 22px 18px", background: panel.header }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: panel.accent, textAlign: mirror ? "right" : "left" }}>
          {tag}
        </div>
        <div style={{ marginTop: 3, fontWeight: 800, fontSize: 22, lineHeight: 1.15, color: panel.headerText, textAlign: mirror ? "right" : "left" }}>
          {p.name}
        </div>
        <div style={{ marginTop: 3, fontSize: 12, color: panel.headerText, opacity: 0.85, textAlign: mirror ? "right" : "left" }}>
          {p.company}
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 3, background: panel.accent }} />
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: "14px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
        {/* COPERTURE */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: panel.header, borderBottom: `1px solid ${panel.accent}`, paddingBottom: 3, textAlign: mirror ? "right" : "left" }}>
            COPERTURE
          </div>
          <ul style={{ marginTop: 8, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 5 }}>
            {p.coverages.map((c, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 12, flexDirection: mirror ? "row-reverse" : "row" }}>
                <span style={{ display: "inline-block", flexShrink: 0, width: 6, height: 6, background: panel.accent, marginTop: "0.35em" }} />
                <span style={{ textAlign: mirror ? "right" : "left" }}>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DETTAGLI */}
        <div style={{ borderRadius: 3, padding: 12, background: colors.boxBg, border: `1px solid ${colors.boxBorder}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: panel.header, textAlign: mirror ? "right" : "left" }}>DETTAGLI</div>
          <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 5, fontSize: 11 }}>
            {p.capitaleDesc && (
              <div style={{ display: "flex", justifyContent: "space-between", flexDirection: mirror ? "row-reverse" : "row" }}>
                <span style={{ fontWeight: 600 }}>Capitale:</span>
                <span>{p.capitaleDesc} {p.capitaleMin ? `(min: ${p.capitaleMin}€)` : ""}</span>
              </div>
            )}
            {p.durataDesc && (
              <div style={{ display: "flex", justifyContent: "space-between", flexDirection: mirror ? "row-reverse" : "row" }}>
                <span style={{ fontWeight: 600 }}>Durata:</span>
                <span>{p.durataDesc} {p.durataMax ? `(max: ${p.durataMax}a)` : ""}</span>
              </div>
            )}
            {p.fiscalita && (
              <div style={{ display: "flex", justifyContent: "space-between", flexDirection: mirror ? "row-reverse" : "row" }}>
                <span style={{ fontWeight: 600 }}>Fiscalità:</span>
                <span>{p.fiscalita}</span>
              </div>
            )}
            {p.recesso && (
              <div style={{ display: "flex", justifyContent: "space-between", flexDirection: mirror ? "row-reverse" : "row" }}>
                <span style={{ fontWeight: 600 }}>Recesso:</span>
                <span>{p.recesso}</span>
              </div>
            )}
            {p.riscatto && (
              <div style={{ display: "flex", justifyContent: "space-between", flexDirection: mirror ? "row-reverse" : "row" }}>
                <span style={{ fontWeight: 600 }}>Riscatto:</span>
                <span>{p.riscatto}</span>
              </div>
            )}
          </div>
        </div>

        {/* ESCLUSIONI */}
        <div style={{ borderRadius: 3, padding: 12, background: colors.boxBg, border: `1px solid ${colors.boxBorder}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: panel.header, textAlign: mirror ? "right" : "left" }}>ESCLUSIONI</div>
          <ul style={{ marginTop: 6, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
            {p.exclusions.map((x, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 11, flexDirection: mirror ? "row-reverse" : "row" }}>
                <span style={{ display: "inline-block", flexShrink: 0, width: 6, height: 6, borderRadius: "50%", background: colors.dot, marginTop: "0.35em" }} />
                <span style={{ textAlign: mirror ? "right" : "left" }}>{x}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DATI MANCANTI */}
        {p.datiMancanti && p.datiMancanti.filter(x => x && x.trim()).length > 0 && (
          <div style={{ borderRadius: 3, padding: 12, borderLeft: "3px solid #EF4444", background: "rgba(254,242,242,0.5)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#B91C1C", textAlign: mirror ? "right" : "left" }}>DA VERIFICARE</div>
            <ul style={{ marginTop: 6, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
              {p.datiMancanti.map((d, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 11, color: "#991B1B", flexDirection: mirror ? "row-reverse" : "row" }}>
                  <span style={{ display: "inline-block", flexShrink: 0, width: 6, height: 6, borderRadius: "50%", background: "#DC2626", marginTop: "0.35em" }} />
                  <span style={{ textAlign: mirror ? "right" : "left" }}>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 22px", background: panel.header, flexDirection: mirror ? "row-reverse" : "row" }}>
        <span style={{ fontWeight: 700, fontSize: 11, color: panel.headerText }}>{p.name}</span>
        <span style={{ fontSize: 10, color: colors.panelBg, opacity: 0.8 }}>{p.docType}</span>
      </div>
    </div>
  );
};

/* ──── Pannello centrale ──── */
const PrintCenterPanel = ({ c, colors }) => {
  const cc = colors.center;
  const contacts = [
    { icon: MapPin, v: c.contacts.address },
    { icon: Phone, v: c.contacts.phone },
    { icon: Mail, v: c.contacts.email },
    { icon: Globe, v: c.contacts.website },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "24px 26px", background: cc.bg, color: cc.text }}>
      {/* Logo */}
      <div style={{ textAlign: "center" }}>
        {c.logo ? (
          <img src={c.logo} alt="logo" style={{ maxHeight: 60, objectFit: "contain", margin: "0 auto", display: "block" }} />
        ) : (
          <div>
            <div style={{ fontWeight: 800, letterSpacing: "0.14em", fontSize: 30, color: cc.text }}>FUTURIA</div>
            <div style={{ letterSpacing: "0.28em", fontSize: 10, color: cc.accent }}>ASSICURAZIONI</div>
          </div>
        )}
      </div>
      <div style={{ margin: "14px auto", height: 1, width: "70%", background: cc.line }} />

      {/* Tipo prodotto */}
      <div style={{ textAlign: "center", fontWeight: 700, fontSize: 18, color: cc.accent }}>
        {c.productType}
      </div>

      {/* Descrizione */}
      <p style={{ marginTop: 14, fontSize: 12, lineHeight: 1.6, textAlign: "center", color: cc.text }}>
        {c.description}
      </p>

      {/* Contatti */}
      <div style={{ marginTop: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: cc.accent, borderBottom: `1px solid ${cc.line}`, paddingBottom: 4 }}>
          CONTATTI
        </div>
        <ul style={{ marginTop: 10, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {contacts.map(({ icon: Icon, v }, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
              <span style={{ display: "flex", flexShrink: 0, alignItems: "center", justifyContent: "center", borderRadius: 3, width: 22, height: 22, background: cc.accent }}>
                <Icon style={{ width: 12, height: 12, color: cc.bg }} strokeWidth={2.4} />
              </span>
              <span style={{ fontSize: 12 }}>{v}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Consulente */}
      <div style={{ marginTop: 18, borderRadius: 3, padding: 14, border: `1px solid ${cc.accent}` }}>
        <div style={{ letterSpacing: "0.14em", fontSize: 9, color: cc.muted }}>IL TUO CONSULENTE</div>
        <div style={{ marginTop: 3, fontWeight: 700, fontSize: 16, color: cc.text }}>{c.consultant.name}</div>
        <div style={{ fontSize: 11, color: cc.accent }}>{c.consultant.role}</div>
      </div>

      {/* Slogan */}
      <div style={{ marginTop: "auto", paddingTop: 14, textAlign: "center", fontStyle: "italic", fontSize: 13, color: cc.accent }}>
        "{c.slogan}"
      </div>
    </div>
  );
};

/* ──── Layout completo A4 landscape ──── */
export const BrochurePrint = ({ data }) => {
  const d = resolveData(data);
  const colors = getTheme(d.themeId);
  return (
    <div
      style={{
        width: 1122,
        height: 794,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        fontFamily: "'Public Sans', 'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      <PrintPolicyPanel p={d.policyA} colors={colors} panel={colors.panelA} mirror={false} tag="POLIZZA A" />
      <PrintCenterPanel c={d.center} colors={colors} />
      <PrintPolicyPanel p={d.policyB} colors={colors} panel={colors.panelB} mirror={true} tag="POLIZZA B" />
    </div>
  );
};
