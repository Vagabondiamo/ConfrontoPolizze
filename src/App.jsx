import { useState, useRef, useEffect } from "react";
import "@/App.css";
import { Editor } from "@/brochure/Editor";
import { Preview } from "@/brochure/Preview";
import { THEMES } from "@/brochure/themes";
import { EMPTY } from "@/brochure/defaults";
import { generateBrochurePdf } from "@/brochure/generateBrochurePdf";
import { Button } from "@/components/ui/button";
import { UpdateChecker } from "@/components/UpdateChecker";
import { Download, FileText, Palette, ChevronDown, Moon, Sun } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import windowsIcon from "@/assets/windows-10.svg";
import appleLightIcon from "@/assets/apple-light.svg";
import appleDarkIcon from "@/assets/apple-dark.svg";
import tuxIcon from "@/assets/tux.svg";

function App() {
  const [data, setData] = useState(EMPTY);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("futuria-dark") === "true");
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [latestVersion, setLatestVersion] = useState("v0.1.6");
  const [winDownloadUrl, setWinDownloadUrl] = useState("https://github.com/Vagabondiamo/ConfrontoPolizze/releases/download/v0.1.6/confronto-polizze_0.1.6_x64-setup.exe");
  const [macDownloadUrl, setMacDownloadUrl] = useState("https://github.com/Vagabondiamo/ConfrontoPolizze/releases/download/v0.1.6/confronto-polizze_0.1.6_aarch64.dmg");
  const [linuxDebUrl, setLinuxDebUrl] = useState("https://github.com/Vagabondiamo/ConfrontoPolizze/releases/download/v0.1.6/confronto-polizze_0.1.6_amd64.deb");
  const [linuxRpmUrl, setLinuxRpmUrl] = useState("https://github.com/Vagabondiamo/ConfrontoPolizze/releases/download/v0.1.6/confronto-polizze-0.1.6-1.x86_64.rpm");
  const [linuxAppImageUrl, setLinuxAppImageUrl] = useState("https://github.com/Vagabondiamo/ConfrontoPolizze/releases/download/v0.1.6/confronto-polizze_0.1.6_amd64.AppImage");

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
            {/* Download app dropdown (nascosto su Tauri) */}
            {!isTauri && (
              <div className="relative" ref={downloadMenuRef}>
              <Button
                variant="outline"
                onClick={() => setShowDownloadMenu((v) => !v)}
                className="gap-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50"
              >
                <Download className="h-4 w-4" /> Scarica app <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
              {showDownloadMenu && (
                <div className="absolute right-0 top-full mt-1 z-50 min-w-[220px] rounded-lg border border-neutral-200 bg-white shadow-lg py-1">
                  <a
                    href={winDownloadUrl}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                    onClick={() => setShowDownloadMenu(false)}
                  >
                    <img src={windowsIcon} alt="Windows" className="h-4 w-4 object-contain" />
                    <div>
                      <div className="font-medium">Windows</div>
                      <div className="text-xs text-neutral-400">{latestVersion} · x64 Setup (.exe)</div>
                    </div>
                  </a>
                  <div className="h-px bg-neutral-100 mx-3" />
                  <a
                    href={macDownloadUrl}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                    onClick={() => setShowDownloadMenu(false)}
                  >
                    <img src={darkMode ? appleLightIcon : appleDarkIcon} alt="Apple" className="h-4 w-4 object-contain" />
                    <div>
                      <div className="font-medium">macOS</div>
                      <div className="text-xs text-neutral-400">{latestVersion} · Apple Silicon (.dmg)</div>
                    </div>
                  </a>
                  <div className="h-px bg-neutral-100 mx-3" />
                  <div className="flex items-stretch hover:bg-neutral-50 transition-colors">
                    <a
                      href={isDebian ? linuxDebUrl : linuxAppImageUrl}
                      className="flex flex-1 items-center gap-3 px-4 py-2.5 text-sm text-neutral-700"
                      onClick={() => setShowDownloadMenu(false)}
                    >
                      <img src={tuxIcon} alt="Linux" className="h-4 w-4 object-contain" />
                      <div>
                        <div className="font-medium">Linux</div>
                        <div className="text-xs text-neutral-400">{latestVersion} · {isDebian ? "Debian/Ubuntu (.deb)" : "Universal (.AppImage)"}</div>
                      </div>
                    </a>
                    <div className="relative group flex items-center pr-2">
                      <button className="flex h-6 w-6 items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700 transition-colors" title="Altre versioni Linux">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      <div className="absolute right-0 top-full mt-1 hidden group-hover:block z-50 min-w-[180px] rounded-lg border border-neutral-200 bg-white shadow-lg py-1">
                        <a href={linuxDebUrl} className="block px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 font-medium whitespace-nowrap">.deb <span className="font-normal text-neutral-400">(Debian/Ubuntu)</span></a>
                        <a href={linuxRpmUrl} className="block px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 font-medium whitespace-nowrap">.rpm <span className="font-normal text-neutral-400">(Fedora/RHEL)</span></a>
                        <a href={linuxAppImageUrl} className="block px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 font-medium whitespace-nowrap">.AppImage <span className="font-normal text-neutral-400">(Universal)</span></a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            )}

            {/* Update checker + Scarica PDF */}
            <UpdateChecker />
            <Button
              data-testid="download-pdf-btn"
              onClick={handleDownload}
              variant="outline"
              className="gap-2 border-neutral-300 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              <Download className="h-4 w-4" /> Scarica PDF
            </Button>
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
            <Preview data={data} />
          </div>
        </section>
      </main>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;