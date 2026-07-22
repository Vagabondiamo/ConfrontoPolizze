import { useState, useRef, useEffect } from "react";
import "@/App.css";
import { Editor } from "@/brochure/Editor";
import { Preview } from "@/brochure/Preview";
import { THEMES } from "@/brochure/themes";
import { EMPTY } from "@/brochure/defaults";
import { Button } from "@/components/ui/button";
import { UpdateChecker } from "@/components/UpdateChecker";
import { Download, FileText, Palette, ChevronDown, Moon, Sun } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import windowsIcon from "@/assets/windows-10.svg";
import appleLightIcon from "@/assets/apple-light.svg";
import appleDarkIcon from "@/assets/apple-dark.svg";
import tuxIcon from "@/assets/tux.svg";

const DEFAULT_IMG_PATH_KEY = "futuria-img-default-path";


function App() {
  const previewRef = useRef(null);
  const [data, setData] = useState(EMPTY);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("futuria-dark") === "true");
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [latestVersion, setLatestVersion] = useState("v0.2.0");
  const [winDownloadUrl, setWinDownloadUrl] = useState("https://github.com/Vagabondiamo/ConfrontoPolizze/releases/download/v0.2.0/confronto-polizze_0.2.0_x64-setup.exe");
  const [macDownloadUrl, setMacDownloadUrl] = useState("https://github.com/Vagabondiamo/ConfrontoPolizze/releases/download/v0.2.0/confronto-polizze_0.2.0_aarch64.dmg");
  const [linuxDebUrl, setLinuxDebUrl] = useState("https://github.com/Vagabondiamo/ConfrontoPolizze/releases/download/v0.2.0/confronto-polizze_0.2.0_amd64.deb");
  const [linuxRpmUrl, setLinuxRpmUrl] = useState("https://github.com/Vagabondiamo/ConfrontoPolizze/releases/download/v0.2.0/confronto-polizze-0.2.0-1.x86_64.rpm");
  const [linuxAppImageUrl, setLinuxAppImageUrl] = useState("https://github.com/Vagabondiamo/ConfrontoPolizze/releases/download/v0.2.0/confronto-polizze_0.2.0_amd64.AppImage");

  const isDebian = navigator.userAgent.toLowerCase().includes("debian") || navigator.userAgent.toLowerCase().includes("ubuntu");
  const isTauri = !!window.__TAURI_INTERNALS__;

  useEffect(() => {
    fetch("https://api.github.com/repos/Vagabondiamo/ConfrontoPolizze/releases/latest")
      .then(res => res.json())
      .then(data => {
        if (data && data.tag_name) {
          const version = data.tag_name;
          const cleanVersion = version.replace("v", "");
          setLatestVersion(version);
          const winAsset = data.assets?.find(a => a.name.endsWith("x64-setup.exe"))?.browser_download_url;
          const macAsset = data.assets?.find(a => a.name.endsWith("aarch64.dmg"))?.browser_download_url;
          const debAsset = data.assets?.find(a => a.name.endsWith(".deb"))?.browser_download_url;
          const rpmAsset = data.assets?.find(a => a.name.endsWith(".rpm"))?.browser_download_url;
          const appImageAsset = data.assets?.find(a => a.name.endsWith(".AppImage"))?.browser_download_url;
          
          if (winAsset) setWinDownloadUrl(winAsset);
          else setWinDownloadUrl(`https://github.com/Vagabondiamo/ConfrontoPolizze/releases/download/${version}/confronto-polizze_${cleanVersion}_x64-setup.exe`);
          if (macAsset) setMacDownloadUrl(macAsset);
          else setMacDownloadUrl(`https://github.com/Vagabondiamo/ConfrontoPolizze/releases/download/${version}/confronto-polizze_${cleanVersion}_aarch64.dmg`);
          if (debAsset) setLinuxDebUrl(debAsset);
          else setLinuxDebUrl(`https://github.com/Vagabondiamo/ConfrontoPolizze/releases/download/${version}/confronto-polizze_${cleanVersion}_amd64.deb`);
          if (rpmAsset) setLinuxRpmUrl(rpmAsset);
          else setLinuxRpmUrl(`https://github.com/Vagabondiamo/ConfrontoPolizze/releases/download/${version}/confronto-polizze-${cleanVersion}-1.x86_64.rpm`);
          if (appImageAsset) setLinuxAppImageUrl(appImageAsset);
          else setLinuxAppImageUrl(`https://github.com/Vagabondiamo/ConfrontoPolizze/releases/download/${version}/confronto-polizze_${cleanVersion}_amd64.AppImage`);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("futuria-dark", darkMode);
  }, [darkMode]);
  const downloadMenuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(e.target)) {
        setShowDownloadMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleDownload = async () => {
    const toastId = toast.loading("Generazione Immagine in corso...", { duration: Infinity });

    try {
      const { generateBrochureImage } = await import("@/brochure/generateBrochureImage.jsx");
      const blob = await generateBrochureImage(data);

      if (isTauri) {
        // === App desktop: mostra dialog di salvataggio ===
        const { save } = await import("@tauri-apps/plugin-dialog");
        const { writeFile } = await import("@tauri-apps/plugin-fs");

        const savedDefault = localStorage.getItem(DEFAULT_IMG_PATH_KEY);

        const filePath = await save({
          title: "Salva brochure Immagine",
          defaultPath: savedDefault
            ? savedDefault.replace(/[^\/]+$/, "brochure-futuria.png")
            : "brochure-futuria.png",
          filters: [{ name: "Immagine PNG", extensions: ["png"] }],
        });

        if (!filePath) {
          // Utente ha annullato
          toast.dismiss(toastId);
          return;
        }

        // Salva il file
        const buffer = await blob.arrayBuffer();
        await writeFile(filePath, new Uint8Array(buffer));

        // Ricorda la cartella come predefinita
        localStorage.setItem(DEFAULT_IMG_PATH_KEY, filePath);

        toast.dismiss(toastId);
        toast.success("Immagine salvata", {
          description: `Salvato in: ${filePath}`,
          duration: 6000,
          action: {
            label: "Imposta cartella predefinita",
            onClick: () => {
              localStorage.setItem(DEFAULT_IMG_PATH_KEY, filePath);
              toast.info("Cartella predefinita impostata", { description: filePath });
            },
          },
        });
      } else {
        // === Sito web: download diretto nel browser ===
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "brochure-futuria.png";
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 5000);

        toast.dismiss(toastId);
        toast.success("Immagine scaricata", { description: "Il download è iniziato." });
      }
    } catch (e) {
      console.error(e);
      toast.dismiss(toastId);
      toast.error("Errore nella generazione dell'immagine", { description: String(e) });
    }
  };

  const selectTheme = (id) => setData((d) => ({ ...d, themeId: id }));

  return (
    <div className={`min-h-screen text-neutral-900 ${darkMode ? "bg-neutral-900 text-neutral-100" : "bg-neutral-100 text-neutral-900"}`} style={{ fontFamily: "'Public Sans', sans-serif" }}>
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
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setDarkMode((v) => !v)}
              className={`flex items-center justify-center h-9 w-9 rounded-md border transition-colors ${darkMode ? "border-neutral-600 bg-neutral-800 text-yellow-400 hover:bg-neutral-700" : "border-neutral-300 bg-white text-neutral-600 hover:bg-neutral-50"}`}
              title={darkMode ? "Modalità chiara" : "Modalità scura"}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Update checker + Scarica Immagine */}
            <div className="flex items-center gap-3">
              <UpdateChecker isTauri={isTauri} />
              <button
                data-testid="download-pdf-btn"
                onClick={handleDownload}
                className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors"
                style={{ background: "#C2942E" }}
              >
                <Download className="h-4 w-4" /> Scarica Immagine
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-5 py-6 lg:grid-cols-[minmax(420px,520px)_1fr]">
        {/* Editor */}
        <section className={`rounded-xl border p-5 shadow-sm ${darkMode ? "border-neutral-700 bg-neutral-800" : "border-neutral-200 bg-white"}`}>
          <Editor data={data} setData={setData} />
        </section>

        {/* Preview + theme */}
        <section className="space-y-4">
          <div className={`flex flex-wrap items-center gap-3 rounded-xl border p-4 shadow-sm ${darkMode ? "border-neutral-700 bg-neutral-800" : "border-neutral-200 bg-white"}`}>
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

          <div className={`rounded-xl border p-4 shadow-sm sm:p-8 ${darkMode ? "border-neutral-700 bg-neutral-800/60" : "border-neutral-200 bg-neutral-200/60"}`}>
            <div className="mb-3 flex items-center justify-between text-xs font-medium text-neutral-500">
              <span>Anteprima · A4 orizzontale (297 × 210 mm)</span>
              <span className="hidden sm:inline">Pannelli: A · Futuria · B</span>
            </div>
            <div ref={previewRef} id="brochure-preview">
              <Preview data={data} />
            </div>
          </div>
        </section>
      </main>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;