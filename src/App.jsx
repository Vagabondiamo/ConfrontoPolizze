import { useState } from "react";
import "@/App.css";
import { Editor } from "@/brochure/Editor";
import { Preview } from "@/brochure/Preview";
import { THEMES } from "@/brochure/themes";
import { EMPTY } from "@/brochure/defaults";
import { generateBrochurePdf } from "@/brochure/generateBrochurePdf";
import { Button } from "@/components/ui/button";
import { Download, FileText, Palette } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

function App() {
  const [data, setData] = useState(EMPTY);

  const handleDownload = () => {
    try {
      generateBrochurePdf(data, { download: true });
      toast.success("Brochure PDF generata", { description: "Il download è iniziato." });
    } catch (e) {
      console.error(e);
      toast.error("Errore nella generazione del PDF");
    }
  };

  const selectTheme = (id) => setData((d) => ({ ...d, themeId: id }));

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900" style={{ fontFamily: "'Public Sans', sans-serif" }}>
      {/* Topbar */}
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-5 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md" style={{ background: "#0E2D50" }}>
            <FileText className="h-5 w-5" style={{ color: "#C2942E" }} />
          </div>
          <div>
            <h1 className="text-lg font-extrabold leading-none tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Futuria <span style={{ color: "#C2942E" }}>Brochure</span>
            </h1>
            <p className="text-xs text-neutral-500">Confronto polizze</p>
          </div>
          <Button data-testid="download-pdf-btn" onClick={handleDownload} className="ml-auto gap-2" style={{ background: "#ffffff" }}>
            <Download className="h-4 w-4" /> Scarica PDF
          </Button>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-5 py-6 lg:grid-cols-[minmax(420px,520px)_1fr]">
        {/* Editor */}
        <section className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <Editor data={data} setData={setData} />
        </section>

        {/* Preview + theme */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-600">
              <Palette className="h-4 w-4" /> Tema
            </div>
            <div className="flex flex-wrap gap-2" data-testid="theme-selector">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  data-testid={`theme-${t.id}`}
                  onClick={() => selectTheme(t.id)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                    data.themeId === t.id ? "border-neutral-900 ring-2 ring-neutral-900/10" : "border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <span className="flex gap-0.5">
                    {t.swatch.map((c, i) => (
                      <span key={i} className="h-3.5 w-3.5 rounded-full" style={{ background: c }} />
                    ))}
                  </span>
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-neutral-200/60 p-4 shadow-sm sm:p-8">
            <div className="mb-3 flex items-center justify-between text-xs font-medium text-neutral-500">
              <span>Anteprima · A4 orizzontale (297 × 210 mm)</span>
              <span className="hidden sm:inline">Pannelli: A · Futuria · B</span>
            </div>
            <Preview data={data} />
          </div>
        </section>
      </main>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;