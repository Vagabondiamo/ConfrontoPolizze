import React from "react";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { getTheme } from "./themes";
import { resolveData } from "./defaults";

const PolicyPanel = ({ p, colors, panel, mirror, tag }) => {
  const align = mirror ? "text-right" : "text-left";
  const flexDir = mirror ? "flex-row-reverse" : "flex-row";
  return (
    <div className="flex h-full flex-col shadow-inner" style={{ background: colors.panelBg, color: colors.bodyText }}>
      <div className="relative px-[6%] pt-[6%] pb-[5%]" style={{ background: panel.header }}>
        <div className={`text-[6px] font-bold tracking-[0.15em] ${align}`} style={{ color: panel.accent }}>
          {tag}
        </div>
        <div className={`mt-0.5 font-extrabold leading-tight ${align}`} style={{ color: panel.headerText, fontSize: "clamp(9px,1.4vw,15px)" }}>
          {p.name}
        </div>
        <div className={`mt-0.5 ${align}`} style={{ color: panel.headerText, opacity: 0.85, fontSize: "clamp(5.5px,0.8vw,8px)" }}>
          {p.company}
        </div>
        <div className="absolute bottom-0 left-0 h-[3px] w-full" style={{ background: panel.accent }} />
      </div>

      <div className="flex-1 space-y-[2.5%] px-[5%] py-[4%] overflow-y-auto scrollbar-thin" style={{ scrollbarWidth: "none" }}>
        {/* COPERTURE */}
        <div>
          <div className="text-[6.5px] font-bold tracking-[0.12em] text-left" style={{ color: panel.header, borderBottom: `1px solid ${panel.accent}`, paddingBottom: 2 }}>
            COPERTURE
          </div>
          <ul className="mt-[3%] space-y-[2%]">
            {p.coverages.map((c, i) => (
              <li key={i} className="flex items-start gap-1.5 flex-row" style={{ fontSize: "clamp(4.5px,0.72vw,7.8px)" }}>
                <span className="inline-block shrink-0" style={{ width: 4.5, height: 4.5, background: panel.accent, marginTop: "0.35em" }} />
                <span className="text-left">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DETTAGLI */}
        <div className="rounded-sm p-[3.5%]" style={{ background: colors.boxBg, border: `1px solid ${colors.boxBorder}` }}>
          <div className="text-[6.5px] font-bold text-left" style={{ color: panel.header }}>DETTAGLI</div>
          <div className="mt-[2%] space-y-[2.5%] text-left" style={{ fontSize: "clamp(4.5px,0.7vw,7.5px)" }}>
            {p.capitaleDesc && (
              <div className="flex justify-between flex-row">
                <span className="font-semibold">Capitale:</span>
                <span>{p.capitaleDesc} {p.capitaleMin ? `(min: ${p.capitaleMin}€)` : ""}</span>
              </div>
            )}
            {p.durataDesc && (
              <div className="flex justify-between flex-row">
                <span className="font-semibold">Durata:</span>
                <span>{p.durataDesc} {p.durataMax ? `(max: ${p.durataMax}a)` : ""}</span>
              </div>
            )}
            {p.fiscalita && (
              <div className="flex justify-between flex-row">
                <span className="font-semibold">Fiscalità:</span>
                <span>{p.fiscalita}</span>
              </div>
            )}
            {p.recesso && (
              <div className="flex justify-between flex-row">
                <span className="font-semibold">Recesso:</span>
                <span>{p.recesso}</span>
              </div>
            )}
            {p.riscatto && (
              <div className="flex justify-between flex-row">
                <span className="font-semibold">Riscatto:</span>
                <span>{p.riscatto}</span>
              </div>
            )}
          </div>
        </div>

        {/* ESCLUSIONI */}
        <div className="rounded-sm p-[3.5%]" style={{ background: colors.boxBg, border: `1px solid ${colors.boxBorder}` }}>
          <div className="text-[6.5px] font-bold text-left" style={{ color: panel.header }}>ESCLUSIONI</div>
          <ul className="mt-[2%] space-y-[2%]">
            {p.exclusions.map((x, i) => (
              <li key={i} className="flex items-start gap-1.5 flex-row" style={{ fontSize: "clamp(4.5px,0.7vw,7.5px)" }}>
                <span className="inline-block shrink-0 rounded-full" style={{ width: 4.5, height: 4.5, background: colors.dot, marginTop: "0.35em" }} />
                <span className="text-left">{x}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DATI MANCANTI / DA VERIFICARE */}
        {p.note && p.note.filter(x => x && x.trim()).length > 0 && (
          <div className="rounded-sm p-[3.5%] border-l-2 border-blue-400 bg-blue-50/50">
            <div className="text-[6.5px] font-bold text-blue-700 text-left">NOTE</div>
            <ul className="mt-[2%] space-y-[2%]">
              {p.note.map((d, i) => (
                <li key={i} className="flex items-start gap-1.5 flex-row" style={{ fontSize: "clamp(4.5px,0.7vw,7.5px)", color: "#1e40af" }}>
                  <span className="inline-block shrink-0 rounded-full bg-blue-500" style={{ width: 4.5, height: 4.5, marginTop: "0.35em" }} />
                  <span className="text-left">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-[6%] py-[2.5%]" style={{ background: panel.header }}>
        <span className="font-bold" style={{ color: panel.headerText, fontSize: "clamp(4.5px,0.68vw,7.5px)", order: mirror ? 2 : 1 }}>{p.name}</span>
        <span style={{ color: colors.panelBg, opacity: 0.8, fontSize: "clamp(4px,0.58vw,6.8px)", order: mirror ? 1 : 2 }}>{p.docType}</span>
      </div>
    </div>
  );
};

const CenterPanel = ({ c, colors }) => {
  const cc = colors.center;
  const contacts = [
    { icon: MapPin, v: c.contacts.address },
    { icon: Phone, v: c.contacts.phone },
    { icon: Mail, v: c.contacts.email },
    { icon: Globe, v: c.contacts.website },
  ];
  return (
    <div className="flex h-full flex-col px-[7%] py-[6%]" style={{ background: cc.bg, color: cc.text }}>
      <div className="absolute left-0 top-0 h-[3px] w-full" />
      <div className="text-center">
        {c.logo ? (
          <img src={c.logo} alt="logo" className="mx-auto max-h-[42px] object-contain" />
        ) : (
          <div>
            <div className="font-extrabold tracking-[0.14em]" style={{ fontSize: "clamp(13px,2vw,22px)", color: cc.text }}>FUTURIA</div>
            <div className="tracking-[0.28em]" style={{ fontSize: "clamp(4px,0.6vw,7px)", color: cc.accent }}>ASSICURAZIONI</div>
          </div>
        )}
      </div>
      <div className="mx-auto my-[5%] h-px w-[70%]" style={{ background: cc.line }} />

      <div className="text-center font-bold" style={{ color: cc.accent, fontSize: "clamp(9px,1.3vw,14px)" }}>
        {c.productType}
      </div>

      <p className="mt-[5%] leading-relaxed text-center" style={{ fontSize: "clamp(5px,0.82vw,8.6px)", color: cc.text }}>
        {c.description}
      </p>

      <div className="mt-[6%]">
        <div className="text-[7px] font-bold tracking-[0.12em]" style={{ color: cc.accent, borderBottom: `1px solid ${cc.line}`, paddingBottom: 3 }}>
          CONTATTI
        </div>
        <ul className="mt-[4%] space-y-[3.5%]">
          {contacts.map(({ icon: Icon, v }, i) => (
            <li key={i} className="flex items-center gap-2" style={{ fontSize: "clamp(5px,0.8vw,8.4px)" }}>
              <span className="flex shrink-0 items-center justify-center rounded-sm" style={{ width: 15, height: 15, background: cc.accent }}>
                <Icon style={{ width: 8, height: 8, color: cc.bg }} strokeWidth={2.4} />
              </span>
              <span className="translate-y-[0.5px]" style={{ fontSize: "clamp(5px,0.78vw,8.2px)" }}>{v}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[6%] rounded-sm p-[4%]" style={{ border: `1px solid ${cc.accent}` }}>
        <div className="tracking-[0.14em]" style={{ fontSize: "clamp(4px,0.58vw,6.8px)", color: cc.muted }}>IL TUO CONSULENTE</div>
        <div className="mt-0.5 font-bold" style={{ fontSize: "clamp(8px,1.1vw,11px)", color: cc.text }}>{c.consultant.name}</div>
        <div style={{ fontSize: "clamp(5px,0.78vw,8px)", color: cc.accent }}>{c.consultant.role}</div>
      </div>

      <div className="mt-auto pt-[5%] text-center italic" style={{ fontSize: "clamp(6px,0.95vw,9.5px)", color: cc.accent }}>
        "{c.slogan}"
      </div>
    </div>
  );
};

export const Preview = ({ data, face = "front" }) => {
  const d = resolveData(data);
  const colors = getTheme(d.themeId);
  
  if (face === "back") {
    return (
      <div
        className="mx-auto w-full overflow-hidden shadow-2xl ring-1 ring-black/10 flex flex-col items-center justify-center relative"
        style={{ aspectRatio: "297 / 210", background: colors.center.bg, color: colors.center.text }}
      >
        <div className="text-center w-full px-[10%]">
          {d.center.logo ? (
            <img src={d.center.logo} alt="logo" className="mx-auto max-h-[160px] object-contain" />
          ) : (
            <div>
              <div className="font-extrabold tracking-[0.14em]" style={{ fontSize: "clamp(30px,5vw,70px)", color: colors.center.text }}>FUTURIA</div>
              <div className="tracking-[0.28em]" style={{ fontSize: "clamp(10px,1.5vw,20px)", color: colors.center.accent }}>ASSICURAZIONI</div>
            </div>
          )}
          {d.center.slogan && (
            <div className="mt-[8%] text-center italic" style={{ fontSize: "clamp(14px,2.5vw,28px)", color: colors.center.accent }}>
              "{d.center.slogan}"
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="brochure-preview"
      className="mx-auto w-full overflow-hidden shadow-2xl ring-1 ring-black/10"
      style={{ aspectRatio: "297 / 210" }}
    >
      <div className="relative grid h-full grid-cols-3">
        <PolicyPanel p={d.policyA} colors={colors} panel={colors.panelA} mirror={false} tag="POLIZZA A" />
        <CenterPanel c={d.center} colors={colors} />
        <PolicyPanel p={d.policyB} colors={colors} panel={colors.panelB} mirror={true} tag="POLIZZA B" />
        <div className="pointer-events-none absolute inset-y-0 left-1/3 w-px border-l border-dashed border-black/15" />
        <div className="pointer-events-none absolute inset-y-0 left-2/3 w-px border-l border-dashed border-black/15" />
      </div>
    </div>
  );
};