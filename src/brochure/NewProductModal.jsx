import React, { useState } from "react";
import { X } from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

export const NewProductModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
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
    coverages: "",
    exclusions: "",
    datiMancanti: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.company.trim()) {
      alert("Nome prodotto e Compagnia sono obbligatori.");
      return;
    }

    // Convert comma/newline separated textareas to array
    const splitLines = (str) =>
      str
        ? str
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line !== "")
        : [""];

    const finalProduct = {
      ...formData,
      coverages: splitLines(formData.coverages),
      exclusions: splitLines(formData.exclusions),
      datiMancanti: splitLines(formData.datiMancanti),
    };

    onSave(finalProduct);
    onClose();
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[800px] rounded-xl border border-[#E9E4D9] bg-[#FAF8F5] p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E9E4D9] pb-4 mb-4">
          <h2 className="text-sm font-extrabold tracking-wider text-[#A38655] uppercase" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Nuovo Prodotto
          </h2>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-neutral-200 text-neutral-500 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-neutral-500 uppercase">Nome prodotto *</Label>
              <Input
                required
                value={formData.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                placeholder="es. Vita Protetta Plus"
                className="bg-white"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-neutral-500 uppercase">Compagnia *</Label>
              <Input
                required
                value={formData.company}
                onChange={(e) => handleFieldChange("company", e.target.value)}
                placeholder="es. Alpha Assicurazioni"
                className="bg-white"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-neutral-500 uppercase">Tipo documento</Label>
              <Input
                value={formData.docType}
                onChange={(e) => handleFieldChange("docType", e.target.value)}
                placeholder="es. DIP Vita, brochure..."
                className="bg-white"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-neutral-500 uppercase">Capitale (descrizione)</Label>
              <Input
                value={formData.capitaleDesc}
                onChange={(e) => handleFieldChange("capitaleDesc", e.target.value)}
                placeholder="es. Libero / Minimo 250.000 €"
                className="bg-white"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-neutral-500 uppercase">Capitale minimo (€)</Label>
              <Input
                type="number"
                value={formData.capitaleMin}
                onChange={(e) => handleFieldChange("capitaleMin", e.target.value)}
                placeholder="es. 250000"
                className="bg-white"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-neutral-500 uppercase">Durata (descrizione)</Label>
              <Input
                value={formData.durataDesc}
                onChange={(e) => handleFieldChange("durataDesc", e.target.value)}
                placeholder="es. Da 1 a 25 anni"
                className="bg-white"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-neutral-500 uppercase">Durata massima (anni)</Label>
              <Input
                type="number"
                value={formData.durataMax}
                onChange={(e) => handleFieldChange("durataMax", e.target.value)}
                placeholder="es. 25"
                className="bg-white"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-neutral-500 uppercase">Fiscalità</Label>
              <Input
                value={formData.fiscalita}
                onChange={(e) => handleFieldChange("fiscalita", e.target.value)}
                placeholder="es. Detraibile al 19%"
                className="bg-white"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-neutral-500 uppercase">Recesso</Label>
              <Input
                value={formData.recesso}
                onChange={(e) => handleFieldChange("recesso", e.target.value)}
                placeholder="es. Entro 30 giorni"
                className="bg-white"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-neutral-500 uppercase">Riscatto / Riduzione</Label>
              <Input
                value={formData.riscatto}
                onChange={(e) => handleFieldChange("riscatto", e.target.value)}
                placeholder="es. Consentito dopo 1 anno"
                className="bg-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-semibold text-neutral-500 uppercase">Coperture (una per riga)</Label>
            <Textarea
              rows={3}
              value={formData.coverages}
              onChange={(e) => handleFieldChange("coverages", e.target.value)}
              placeholder="Inserisci una copertura per riga..."
              className="bg-white"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-semibold text-neutral-500 uppercase">Esclusioni (una per riga)</Label>
            <Textarea
              rows={3}
              value={formData.exclusions}
              onChange={(e) => handleFieldChange("exclusions", e.target.value)}
              placeholder="Inserisci un'esclusione per riga..."
              className="bg-white"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-semibold text-neutral-500 uppercase">Dati mancanti / da verificare (uno per riga)</Label>
            <Textarea
              rows={3}
              value={formData.datiMancanti}
              onChange={(e) => handleFieldChange("datiMancanti", e.target.value)}
              placeholder="Inserisci un dato mancante per riga..."
              className="bg-white"
            />
          </div>

          {/* Footer actions */}
          <div className="border-t border-[#E9E4D9] pt-4 mt-6 flex items-center justify-between">
            <Button
              type="submit"
              className="bg-[#1E4638] text-white hover:bg-[#153328] font-bold px-6"
            >
              Salva prodotto
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-neutral-300 text-neutral-700"
            >
              Annulla
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
