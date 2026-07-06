import React, { useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { EXAMPLE } from "./defaults";
import { NewProductModal } from "./NewProductModal";

const DEFAULT_PRODUCTS = [
  {
    name: "TCM Futuria Protezione",
    company: "Futuria Assicurazioni",
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
    ],
    exclusions: [
      "Sport estremi non dichiarati",
      "Dolo dell'assicurato",
    ],
    datiMancanti: [
      "Questionario anamnestico da firmare",
    ],
  },
  {
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
];

const Field = ({ label, children }) => (
  <div className="space-y-1.5">
    <Label className="text-[10px] font-bold uppercase tracking-wide text-neutral-500">{label}</Label>
    {children}
  </div>
);

const ListEditor = ({ label, items, ph, onChange, testid }) => {
  const set = (i, v) => onChange(items.map((it, idx) => (idx === i ? v : it)));
  const add = () => onChange([...items, ""]);
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i).length ? items.filter((_, idx) => idx !== i) : [""]);
  return (
    <Field label={label}>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              data-testid={`${testid}-${i}`}
              value={it}
              placeholder={ph[i % ph.length] || ""}
              onChange={(e) => set(i, e.target.value)}
              className="h-9"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0 text-neutral-400 hover:text-red-500"
              data-testid={`${testid}-remove-${i}`}
              onClick={() => remove(i)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" className="h-8 gap-1.5 text-xs" data-testid={`${testid}-add`} onClick={add}>
          <Plus className="h-3.5 w-3.5" /> Aggiungi
        </Button>
      </div>
    </Field>
  );
};

const PolicyForm = ({ side, data, patch, ex, products, onNewProductClick }) => (
  <div className="space-y-5">
    {/* Product selection and modal trigger */}
    <div className="flex items-center gap-3 p-3 bg-[#FAF8F5] rounded-lg border border-[#E9E4D9]">
      <div className="flex-1 space-y-1">
        <Label className="text-[10px] font-bold text-neutral-500 uppercase">Libreria Prodotti</Label>
        <select
          className="w-full bg-white border border-[#E9E4D9] rounded-md p-1.5 text-xs text-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-400"
          onChange={(e) => {
            const prod = products.find((p) => p.name === e.target.value);
            if (prod) {
              patch({
                name: prod.name,
                company: prod.company,
                docType: prod.docType || "",
                capitaleDesc: prod.capitaleDesc || "",
                capitaleMin: prod.capitaleMin || "",
                durataDesc: prod.durataDesc || "",
                durataMax: prod.durataMax || "",
                fiscalita: prod.fiscalita || "",
                recesso: prod.recesso || "",
                riscatto: prod.riscatto || "",
                coverages: prod.coverages || [""],
                exclusions: prod.exclusions || [""],
                datiMancanti: prod.datiMancanti || [""],
              });
            }
          }}
          value=""
        >
          <option value="" disabled>Carica un prodotto...</option>
          {products.map((p, i) => (
            <option key={i} value={p.name}>{p.name} ({p.company})</option>
          ))}
        </select>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-8 text-xs mt-4 gap-1"
        onClick={onNewProductClick}
      >
        + Nuovo
      </Button>
    </div>

    {/* Form Fields */}
    <div className="grid grid-cols-2 gap-3">
      <Field label="Nome polizza *">
        <Input data-testid={`${side}-name`} value={data.name} placeholder={ex.name} onChange={(e) => patch({ name: e.target.value })} />
      </Field>
      <Field label="Compagnia *">
        <Input data-testid={`${side}-company`} value={data.company} placeholder={ex.company} onChange={(e) => patch({ company: e.target.value })} />
      </Field>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <Field label="Tipo documento">
        <Input data-testid={`${side}-doctype`} value={data.docType} placeholder={ex.docType} onChange={(e) => patch({ docType: e.target.value })} />
      </Field>
      <Field label="Capitale (descrizione)">
        <Input value={data.capitaleDesc} placeholder={ex.capitaleDesc} onChange={(e) => patch({ capitaleDesc: e.target.value })} />
      </Field>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <Field label="Capitale minimo (€)">
        <Input type="number" value={data.capitaleMin} placeholder={ex.capitaleMin} onChange={(e) => patch({ capitaleMin: e.target.value })} />
      </Field>
      <Field label="Durata (descrizione)">
        <Input value={data.durataDesc} placeholder={ex.durataDesc} onChange={(e) => patch({ durataDesc: e.target.value })} />
      </Field>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <Field label="Durata massima (anni)">
        <Input type="number" value={data.durataMax} placeholder={ex.durataMax} onChange={(e) => patch({ durataMax: e.target.value })} />
      </Field>
      <Field label="Fiscalità">
        <Input value={data.fiscalita} placeholder={ex.fiscalita} onChange={(e) => patch({ fiscalita: e.target.value })} />
      </Field>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <Field label="Recesso">
        <Input value={data.recesso} placeholder={ex.recesso} onChange={(e) => patch({ recesso: e.target.value })} />
      </Field>
      <Field label="Riscatto / Riduzione">
        <Input value={data.riscatto} placeholder={ex.riscatto} onChange={(e) => patch({ riscatto: e.target.value })} />
      </Field>
    </div>

    <ListEditor label="Coperture" items={data.coverages} ph={ex.coverages} testid={`${side}-cov`} onChange={(v) => patch({ coverages: v })} />
    <ListEditor label="Esclusioni" items={data.exclusions} ph={ex.exclusions} testid={`${side}-exc`} onChange={(v) => patch({ exclusions: v })} />
    <ListEditor label="Dati mancanti / da verificare" items={data.datiMancanti} ph={ex.datiMancanti} testid={`${side}-datimancanti`} onChange={(v) => patch({ datiMancanti: v })} />
  </div>
);

export const Editor = ({ data, setData }) => {
  const fileRef = useRef(null);
  const ex = EXAMPLE;

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    if (saved) return JSON.parse(saved);
    localStorage.setItem("products", JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveProduct = (newProduct) => {
    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  const patchA = (p) => setData((d) => ({ ...d, policyA: { ...d.policyA, ...p } }));
  const patchB = (p) => setData((d) => ({ ...d, policyB: { ...d.policyB, ...p } }));
  const patchC = (p) => setData((d) => ({ ...d, center: { ...d.center, ...p } }));
  const patchContacts = (p) => setData((d) => ({ ...d, center: { ...d.center, contacts: { ...d.center.contacts, ...p } } }));
  const patchConsultant = (p) => setData((d) => ({ ...d, center: { ...d.center, consultant: { ...d.center.consultant, ...p } } }));

  const onLogo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => patchC({ logo: reader.result });
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="A" className="w-full">
        <TabsList className="grid w-full grid-cols-3" data-testid="editor-tabs">
          <TabsTrigger value="A" data-testid="tab-a">Polizza A</TabsTrigger>
          <TabsTrigger value="C" data-testid="tab-center">Centro</TabsTrigger>
          <TabsTrigger value="B" data-testid="tab-b">Polizza B</TabsTrigger>
        </TabsList>

        <TabsContent value="A" className="mt-5">
          <PolicyForm
            side="a"
            data={data.policyA}
            patch={patchA}
            ex={ex.policyA}
            products={products}
            onNewProductClick={() => setIsModalOpen(true)}
          />
        </TabsContent>

        <TabsContent value="C" className="mt-5">
          <div className="space-y-5">
            <Field label="Logo aziendale">
              {data.center.logo ? (
                <div className="flex items-center gap-3 rounded-md border border-neutral-200 bg-neutral-50 p-2">
                  <img src={data.center.logo} alt="logo" className="h-10 max-w-[140px] object-contain" />
                  <Button type="button" variant="ghost" size="sm" className="ml-auto gap-1.5 text-xs text-red-500" data-testid="logo-remove" onClick={() => patchC({ logo: null })}>
                    <X className="h-3.5 w-3.5" /> Rimuovi
                  </Button>
                </div>
              ) : (
                <Button type="button" variant="outline" className="w-full gap-2" data-testid="logo-upload-btn" onClick={() => fileRef.current?.click()}>
                  <Upload className="h-4 w-4" /> Carica logo (PNG/JPG)
                </Button>
              )}
              <input ref={fileRef} type="file" accept="image/png,image/jpeg" className="hidden" data-testid="logo-input" onChange={onLogo} />
            </Field>
            <Field label="Tipo prodotto">
              <Input data-testid="center-product" value={data.center.productType} placeholder={ex.center.productType} onChange={(e) => patchC({ productType: e.target.value })} />
            </Field>
            <Field label="Descrizione prodotto">
              <Input data-testid="center-description" value={data.center.description} placeholder={ex.center.description} onChange={(e) => patchC({ description: e.target.value })} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Indirizzo">
                <Input data-testid="center-address" value={data.center.contacts.address} placeholder={ex.center.contacts.address} onChange={(e) => patchContacts({ address: e.target.value })} />
              </Field>
              <Field label="Telefono">
                <Input data-testid="center-phone" value={data.center.contacts.phone} placeholder={ex.center.contacts.phone} onChange={(e) => patchContacts({ phone: e.target.value })} />
              </Field>
              <Field label="Email">
                <Input data-testid="center-email" value={data.center.contacts.email} placeholder={ex.center.contacts.email} onChange={(e) => patchContacts({ email: e.target.value })} />
              </Field>
              <Field label="Sito web">
                <Input data-testid="center-website" value={data.center.contacts.website} placeholder={ex.center.contacts.website} onChange={(e) => patchContacts({ website: e.target.value })} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Nome consulente">
                <Input data-testid="center-consultant-name" value={data.center.consultant.name} placeholder={ex.center.consultant.name} onChange={(e) => patchConsultant({ name: e.target.value })} />
              </Field>
              <Field label="Ruolo consulente">
                <Input data-testid="center-consultant-role" value={data.center.consultant.role} placeholder={ex.center.consultant.role} onChange={(e) => patchConsultant({ role: e.target.value })} />
              </Field>
            </div>
            <Field label="Slogan (in corsivo)">
              <Input data-testid="center-slogan" value={data.center.slogan} placeholder={ex.center.slogan} onChange={(e) => patchC({ slogan: e.target.value })} />
            </Field>
          </div>
        </TabsContent>

        <TabsContent value="B" className="mt-5">
          <PolicyForm
            side="b"
            data={data.policyB}
            patch={patchB}
            ex={ex.policyB}
            products={products}
            onNewProductClick={() => setIsModalOpen(true)}
          />
        </TabsContent>
      </Tabs>

      <NewProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
};