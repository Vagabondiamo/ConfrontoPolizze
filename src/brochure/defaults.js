// Dati di esempio usati come placeholder nell'editor e come fallback nel PDF/anteprima.

export const EXAMPLE = {
  themeId: "futuria",
  policyA: {
    name: "Vita Protetta Plus",
    company: "Alpha Assicurazioni",
    docType: "DIP Vita",
    capitaleDesc: "Minimo 250.000 €",
    capitaleMin: "250000",
    durataDesc: "Da 1 a 25 anni",
    durataMax: "25",
    fiscalita: "Detraibile al 19%",
    recesso: "Entro 30 giorni",
    riscatto: "Non consentito nei primi 3 anni",
    coverages: [
      "Capitale caso morte fino a 300.000 €",
      "Copertura infortuni h24",
      "Invalidità permanente da malattia",
      "Rendita ai beneficiari",
    ],
    exclusions: [
      "Sport estremi non dichiarati",
      "Dolo dell'assicurato",
    ],
    datiMancanti: [
      "Questionario anamnestico da firmare",
    ],
  },
  center: {
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAB4CAMAAADsSh/cAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAJSUExURQAAAAA0nwAyoAAynwAyoAAyoQAznwAzoAAtoAA1ngAyoAAzoAAxoQAyoAAyoQAznwAA/wAzowAyoQAwnwBVqgAyoAAxoQAyoAAyoQAxnwAzoQAyogA0nwAzmQBAnwAvnAAyoAAwogAxoQAyoAA1lQAzoAAxoQAxoAAyoAAzoAAxnwAxpAAxoAAznwAynwAyoAAyoAAzoQAyoQAyoAAyngAyoAAwnwAxogAxoAAyoAAvngAyoAAyoAAkkgAzoAAxoAAxoAAzoQAwngA0nwAxogAzoAAzoQAxoQAxnwAwoAAznwAzoAAzoAAzoAAyoQAxoAArpABAvwAuogAyoAA6nAAyogAxoAAzmQAxoAAwngAzoQAyoAAxoAA1nwAxoQAynwA0ogAzngAyoAArqgAxoAAyoQAyoAAzoAA6mQAssQAyoQA3nwAyoAAynwAznwAzoQAyoAAxoQAxoQAyoQAxogAzowAxnwA5qgAznwAyoAAzogAxoAAxoAAzoAAznwAxnAAuogAynwAxoAAzoAA1oAAxoAAxoQA0oAAxoQAzoAAyoQAzoAAyoAAwngAxoAAzoAAvngAznQAyoAAyoAAAgAAxoAAxoAAyoQA0nwAyoAAzoAA0nwAzoAA3oQAyoAAxngAzoQA1nAAznwAyoQAxnwAxnwAyoAAxoQAyogAynwAznwAxoAA0nwAxoAAxnwAynwAyoQAypAAzoAAxnwAxnwAvnQA5qgAyoAAvoAAyoQAxoAAznwAyoAAyoQAynwAznwAxoQAzoQA2qAAyoAAyn////zK+xZYAAADDdFJOUwCt1q/r7L2+Mz+ex7H4yOACUFxVBo+2p/vQanZwFBAx94bL+h37/v7z3aBD82ii4fn7qvWOa0Vuwf5n5P0OlvTGiF+UjHmbVJKEnPzy3O6DNQgh9CxluwqrT/zlwjDj1XFk8Az9rqPZIxf+JbT6WtnStX36XUv9Gyj2gbyT7e0fFlLHw2HUsFn5uXro8Trv51dz6tEE38qdf4u/Spcu2nyzSIfQxZjsbaTcuO6A6sBNqDi6z+g8EuJGzul3qebYzMlBJmGgjPYAAAABYktHRMVjCyt3AAAAB3RJTUUH6gcGCTQykGyIcAAABbxJREFUeNrtnf1fFEUcxwezAh9PuwiiTk4SNEkPofRMfEjD55KHVEyLRBGfUiQlH1IEy1JIMhTSSo3suays7Plp7w8L777f2aeZ2bk7Xi5H3/cv3HxmZnfey97t7O4tMEYQBJE+WaNS5i6/x54mo42UudvvsZM6qZM6qZM6qZM6qZP6/1j9ntTV7/V77OmSnZMi2X6PnCAIgiAIgmBjxmoyzu+RDjnapy/j/R4pqZM6qZM6qZM6qZM6qZO6hQm66hP9HumQE5g0WYv7gn6PlCAIgiAIgnBzf66LB/we0x1CcPqS5/eYSJ3USZ3USZ3USZ3USZ3UPcl3q4/2e0x3iOCDBQ4eetjvMREEQRAEQRAEMUwJwWnDFFWjmJzCeIMwnHY5n7HFZ1anxktFMRWJ2y54AveIfUGTIJ6GQbHzjK+kaPqMR2c61l8Ky35MZDULes5Wqcu/2WREklAvM1TMSU89QXlFwNqtHOLHRVaF2En1fGzmqBtG6ROa6nN5l3kjRN2IztdTf5L3WFA5QtSN4hwd9WxLj4UjRd1YFNBQX2zpMH3EqBtLvNUrF1g7POWpvnSZi6eTUK/K4kSgYpQZLU9JfQUcnFeuyl/NTdZ4q6+ybau1nurSS4Z66haegYpnZavSVV9ntqnO5So1nuq19v2kLoPUS9zqjHH3sJf6c1BRBD/XZ7r6BnwDb/RSn53IY/XQYNOGDFdnz0O62UN9C+QvsLXwqiLT1V+EdKyH+jzIG9hL8GprpqvjDC1Xrd64LRFHAmaTyZmt3ojvdZyeSdQXQrx98HUTvN6hVt+02gF+nAwT9fXYG09eJeqliTTWPPh65y4o7Faqu8BjwrBQD+7BznsDSvWXId0XL+2HUkumqR+AB4PmVixu5cPiFmL1GZC+Ei8dhFKe8NGiYaiumsMfalOqvwrhYShvhXKYCRiG6iWGnCO8m1D9KIRjoHwMyq+lpX58yNRPiNVbNdSzzG4i9Wo4zYm2Q4CHOuNkKuoFUHae+HZA3qmtHoWKdfb4FMT8AU+pemyppZtIvQKykuMIHhJfV6i/MccBzgNOQ4M3HR1xdvWWtnqr+DdwBuJaL/WzOdZuIvUu+f5Sw1xglXRK042bvN2evw15lbZ6LVQcs8dZEJ9Tqxcvt3cTqPfIzQ3BH173VG/HFu/Y4kaMG7TVz4t3PjjTMt51que13gbfJkaTp/o+hXpRb/Lq/NrTBVuKE0ajWVv9IlTwD6E4zbigPqd6d7x0kI/efhPCrV5jqOhPQX0iNumxhKHxELqfPpeqv4cLumRNp2J6WaxuTmG7bBMTt3quocL9pT1v9fexSeQDngU/xHCCvnob9oldMcMlGO7lkUO9uhabXFWqB6cp1Y1ryau38dlV2RmIZprfAq3XV7fcGcgNJZL2Szw6KlO37PLWY4NL/SMIapvs4Md+fvLqbMDccoc/vn5lxZ7zMR584m4uV//UXNC2HbNWhj/73HLZ2Lx66FRnX/DVNyrUv4RgmWOtX0Fe3Oao0FCvixpSTiejzr6WL+gbs5VLPbgIW1luoTnVb+BGdV6K68U3wrfJq7M+6YA7Ba0V6t9JN6L19+lSZ5dxN4udkqrjFGuza63fQ83tCzfJqrObkgH/UJ2cOmuQLOjQj5ZGbnXWgg0jP0nUTxjuXkAdVhWkoN47IBzwrZCosUqdv/HsFP1sbSNQ7+VT1F8k6uOgeFaw0ltQd84ea6kPHuEEu+rGgLCpUp3dKHcv6IJ9gi1QZ9f4J2uDUD2At7v6Bevk+5rtJEBXnTV32KfWu25ukbRUq7PeqkK7+K/zHS1E6uwqNi9rE6kfgZL4egzOvy7a0gFAdovCJPRbZ1diVCVrOvrlm+p3WGK9tEXP9j8SJ9bRyJ/X3V/5+Av+1ZPtYmLwb/wPUAcSQcv+BP/ES31QKb7dEIbaDk9JBYHdOf8G0lkAZ2f3lMr0l0IQBEEQFv4DrozG/AzjYuEAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjYtMDctMDZUMDk6NTI6NTArMDA6MDDdFaYuAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI2LTA3LTA2VDA5OjUyOjUwKzAwOjAwrEgekgAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNi0wNy0wNlQwOTo1Mjo1MCswMDowMPtdP00AAAAASUVORK5CYII=",
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
    slogan: "Protegere | Crescere | Investire",
  },
  policyB: {
    name: "Sicura Vita Premium",
    company: "Beta Insurance Group",
    docType: "Scheda Prodotto",
    capitaleDesc: "Massimo 250.000 €",
    capitaleMin: "200000",
    durataDesc: "Da 1 a 20 anni",
    durataMax: "20",
    fiscalita: "Esenzione tasse di successione",
    recesso: "Entro 30 giorni",
    riscatto: "Consentito dopo 1 anno",
    coverages: [
      "Capitale caso morte fino a 250.000 €",
      "Anticipo in caso di malattia grave",
      "Copertura mutuo residuo",
      "Assistenza familiare inclusa",
    ],
    exclusions: [
      "Patologie preesistenti non dichiarate",
      "Eventi bellici e nucleari",
    ],
    datiMancanti: [
      "Copia documento d'identità",
      "Codice fiscale",
    ],
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
      docType: strOr(data.policyA.docType, e.policyA.docType),
      capitaleDesc: strOr(data.policyA.capitaleDesc, e.policyA.capitaleDesc),
      capitaleMin: strOr(data.policyA.capitaleMin, e.policyA.capitaleMin),
      durataDesc: strOr(data.policyA.durataDesc, e.policyA.durataDesc),
      durataMax: strOr(data.policyA.durataMax, e.policyA.durataMax),
      fiscalita: strOr(data.policyA.fiscalita, e.policyA.fiscalita),
      recesso: strOr(data.policyA.recesso, e.policyA.recesso),
      riscatto: strOr(data.policyA.riscatto, e.policyA.riscatto),
      coverages: listOr(data.policyA.coverages, e.policyA.coverages),
      exclusions: listOr(data.policyA.exclusions, e.policyA.exclusions),
      datiMancanti: listOr(data.policyA.datiMancanti, e.policyA.datiMancanti),
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
      docType: strOr(data.policyB.docType, e.policyB.docType),
      capitaleDesc: strOr(data.policyB.capitaleDesc, e.policyB.capitaleDesc),
      capitaleMin: strOr(data.policyB.capitaleMin, e.policyB.capitaleMin),
      durataDesc: strOr(data.policyB.durataDesc, e.policyB.durataDesc),
      durataMax: strOr(data.policyB.durataMax, e.policyB.durataMax),
      fiscalita: strOr(data.policyB.fiscalita, e.policyB.fiscalita),
      recesso: strOr(data.policyB.recesso, e.policyB.recesso),
      riscatto: strOr(data.policyB.riscatto, e.policyB.riscatto),
      coverages: listOr(data.policyB.coverages, e.policyB.coverages),
      exclusions: listOr(data.policyB.exclusions, e.policyB.exclusions),
      datiMancanti: listOr(data.policyB.datiMancanti, e.policyB.datiMancanti),
    },
  };
}

// Stato iniziale vuoto dell'editor.
export const EMPTY = {
  themeId: "futuria",
  policyA: {
    name: "",
    company: "",
    docType: "",
    capitaleDesc: "",
    capitaleMin: "",
    durataDesc: "",
    durataMax: "",
    fiscalita: "",
    recesso: "",
    riscatto: "",
    coverages: [""],
    exclusions: [""],
    datiMancanti: [""],
  },
  center: {
    logo: "data:image/png;base64,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",
    productType: "",
    description: "",
    contacts: { address: "", phone: "", email: "", website: "" },
    consultant: { name: "", role: "" },
    slogan: "",
  },
  policyB: {
    name: "",
    company: "",
    docType: "",
    capitaleDesc: "",
    capitaleMin: "",
    durataDesc: "",
    durataMax: "",
    fiscalita: "",
    recesso: "",
    riscatto: "",
    coverages: [""],
    exclusions: [""],
    datiMancanti: [""],
  },
};