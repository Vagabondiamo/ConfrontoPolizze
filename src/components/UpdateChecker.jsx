import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Download, RefreshCw, X } from "lucide-react";

/**
 * Componente che controlla aggiornamenti e mostra un popup vicino al pulsante "Scarica PDF".
 * Funziona solo quando l'app è in esecuzione come app desktop Tauri.
 */
export function UpdateChecker() {
  const [update, setUpdate]       = useState(null);   // oggetto update disponibile
  const [progress, setProgress]   = useState(null);   // { downloaded, total } byte
  const [installing, setInstalling] = useState(false);
  const [done, setDone]           = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Controlla aggiornamenti all'avvio (solo in Tauri)
  useEffect(() => {
    if (!window.__TAURI_INTERNALS__) return;

    const check = async () => {
      try {
        const { check } = await import("@tauri-apps/plugin-updater");
        const upd = await check();
        if (upd?.available) {
          setUpdate(upd);
        }
      } catch (e) {
        // aggiornamento non disponibile o errore di rete: silenzioso
        console.warn("Update check failed:", e);
      }
    };

    // Prima esecuzione dopo 3 secondi dall'avvio
    const t = setTimeout(check, 3000);
    return () => clearTimeout(t);
  }, []);

  const handleInstall = useCallback(async () => {
    if (!update) return;
    setInstalling(true);
    setProgress({ downloaded: 0, total: 0 });

    try {
      await update.downloadAndInstall((event) => {
        if (event.event === "Started") {
          setProgress({ downloaded: 0, total: event.data.contentLength ?? 0 });
        } else if (event.event === "Progress") {
          setProgress((p) => ({
            downloaded: (p?.downloaded ?? 0) + event.data.chunkLength,
            total: p?.total ?? 0,
          }));
        }
      });
      setDone(true);
    } catch (e) {
      console.error("Update failed:", e);
      setDone(false);
      setInstalling(false);
      setProgress(null);
      toast.error("Errore durante l'installazione", {
        description: "Impossibile completare l'installazione automatica. Scarica l'ultima versione dal sito web.",
      });
    }
  }, [update]);

  const handleRestart = useCallback(async () => {
    try {
      const { relaunch } = await import("@tauri-apps/plugin-process");
      await relaunch();
    } catch {
      toast.info("Riavvia l'applicazione per completare l'aggiornamento.");
    }
  }, []);

  // Se non c'è aggiornamento, o è stata chiusa la notifica, non mostrare nulla
  if (!update || dismissed) return null;

  const formatBytes = (b) => {
    if (!b) return "0 B";
    if (b < 1024) return `${b} B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
    return `${(b / (1024 * 1024)).toFixed(1)} MB`;
  };

  const pct = progress?.total > 0
    ? Math.round((progress.downloaded / progress.total) * 100)
    : null;

  return (
    <div
      className="relative flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm shadow-sm dark:border-blue-800 dark:bg-blue-950/60"
      role="alert"
    >
      {/* Badge versione */}
      {!installing && !done && (
        <>
          <span className="flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
          </span>
          <span className="font-medium text-blue-800 dark:text-blue-200">
            Aggiornamento disponibile {update.version}
          </span>
          <button
            onClick={handleInstall}
            className="ml-1 flex items-center gap-1 rounded-md bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            <Download className="h-3 w-3" />
            Installa
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="ml-1 rounded p-0.5 text-blue-400 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-300 transition-colors"
            title="Ignora"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </>
      )}

      {/* In download */}
      {installing && !done && (
        <>
          <RefreshCw className="h-3.5 w-3.5 shrink-0 animate-spin text-blue-600" />
          <span className="text-blue-800 dark:text-blue-200">
            Download{pct !== null ? ` ${pct}%` : "…"}
            {progress?.total > 0 && (
              <span className="ml-1 text-blue-500 dark:text-blue-400">
                ({formatBytes(progress.downloaded)} / {formatBytes(progress.total)})
              </span>
            )}
          </span>
          {/* barra progresso */}
          {pct !== null && (
            <div className="ml-2 h-1.5 w-20 overflow-hidden rounded-full bg-blue-200 dark:bg-blue-800">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          )}
        </>
      )}

      {/* Completato — chiedi riavvio */}
      {done && (
        <>
          <span className="font-medium text-green-700 dark:text-green-400">
            Aggiornamento installato!
          </span>
          <button
            onClick={handleRestart}
            className="ml-1 flex items-center gap-1 rounded-md bg-green-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-green-700 transition-colors"
          >
            <RefreshCw className="h-3 w-3" />
            Riavvia ora
          </button>
        </>
      )}
    </div>
  );
}
