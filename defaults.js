// Dati di esempio usati come placeholder nell'editor e come fallback nel PDF/anteprima.

export const EXAMPLE = {
  themeId: "futuria",
  policyA: {
    name: "Vita Protetta Plus",
    company: "Alpha Assicurazioni",
    coverages: [
      "Capitale caso morte fino a 300.000 €",
      "Copertura infortuni h24",
      "Invalidità permanente da malattia",
      "Rendita ai beneficiari",
    ],
    advantages: [
      "Premio bloccato per tutta la durata",
      "Nessuna visita medica fino a 100.000 €",
      "Detraibilità fiscale del premio",
    ],
    exclusions: [
      "Sport estremi non dichiarati",
      "Dolo dell'assicurato",
    ],
    docType: "Scheda Prodotto",
  },
  center: {
    logo: null,
    productType: "TCM — Temporanea Caso Morte",
    description:
      "La Temporanea Caso Morte garantisce ai tuoi cari un capitale in caso di premorienza dell'assicurato durante il periodo di copertura. Uno strumento semplice ed efficace per proteggere il tenore di vita della famiglia, coprire un mutuo o tutelare un'attività.",
    contacts: {
      address: "Via Emilia 12, Reggio Emilia",
      phone: "+39 0522 000 000",
      email: "consulenti@futuria.it",
      website: "www.futuria.it",
    },
    consultant: {
      name: "Marco Bianchi",
      role: "Consulente Assicurativo",
    },
    slogan: "Il tuo futuro, assicurato con cura.",
  },
  policyB: {
    name: "Sicura Vita Premium",
    company: "Beta Insurance Group",
    coverages: [
      "Capitale caso morte fino a 250.000 €",
      "Anticipo in caso di malattia grave",
      "Copertura mutuo residuo",
      "Assistenza familiare inclusa",
    ],
    advantages: [
      "Attivazione 100% digitale",
      "Premio mensile flessibile",
      "Beneficiari modificabili in ogni momento",
    ],
    exclusions: [
      "Patologie preesistenti non dichiarate",
      "Eventi bellici e nucleari",
    ],
    docType: "Scheda Prodotto",
  },
};

const listOr = (arr, ex) => (arr && arr.filter((x) => x && x.trim()).length ? arr.filter((x) => x && x.trim()) : ex);
const strOr = (v, ex) => (v && v.trim() ? v : ex);

// Unisce i dati inseriti con gli esempi, così anteprima e PDF non risultano mai vuoti.
export function resolveData(data) {
  const e = EXAMPLE;
  return {
    themeId: data.themeId || e.themeId,
    policyA: {
      name: strOr(data.policyA.name, e.policyA.name),
      company: strOr(data.policyA.company, e.policyA.company),
      coverages: listOr(data.policyA.coverages, e.policyA.coverages),
      advantages: listOr(data.policyA.advantages, e.policyA.advantages),
      exclusions: listOr(data.policyA.exclusions, e.policyA.exclusions),
      docType: strOr(data.policyA.docType, e.policyA.docType),
    },
    center: {
      logo: data.center.logo || null,
      productType: strOr(data.center.productType, e.center.productType),
      description: strOr(data.center.description, e.center.description),
      contacts: {
        address: strOr(data.center.contacts.address, e.center.contacts.address),
        phone: strOr(data.center.contacts.phone, e.center.contacts.phone),
        email: strOr(data.center.contacts.email, e.center.contacts.email),
        website: strOr(data.center.contacts.website, e.center.contacts.website),
      },
      consultant: {
        name: strOr(data.center.consultant.name, e.center.consultant.name),
        role: strOr(data.center.consultant.role, e.center.consultant.role),
      },
      slogan: strOr(data.center.slogan, e.center.slogan),
    },
    policyB: {
      name: strOr(data.policyB.name, e.policyB.name),
      company: strOr(data.policyB.company, e.policyB.company),
      coverages: listOr(data.policyB.coverages, e.policyB.coverages),
      advantages: listOr(data.policyB.advantages, e.policyB.advantages),
      exclusions: listOr(data.policyB.exclusions, e.policyB.exclusions),
      docType: strOr(data.policyB.docType, e.policyB.docType),
    },
  };
}

// Stato iniziale vuoto dell'editor.
export const EMPTY = {
  themeId: "futuria",
  policyA: { name: "", company: "", coverages: [""], advantages: [""], exclusions: [""], docType: "" },
  center: {
    logo: null,
    productType: "",
    description: "",
    contacts: { address: "", phone: "", email: "", website: "" },
    consultant: { name: "", role: "" },
    slogan: "",
  },
  policyB: { name: "", company: "", coverages: [""], advantages: [""], exclusions: [""], docType: "" },
};
