# Futuria Brochure — Confronto Polizze

Applicazione web per generare brochure trifold A4 di confronto tra polizze assicurative. Permette di compilare i dati delle due polizze e del pannello centrale, scegliere un tema grafico e scaricare il documento in PDF.

## Funzionalità

- Editor a schede separato per Polizza A, Centro e Polizza B
- Anteprima in tempo reale della brochure in formato A4 orizzontale (297 x 210 mm)
- 11 temi grafici selezionabili (Futuria, Ardesia, Bordeaux, Foresta, Cielo, Abete, Tramonto, Ambra, Viola, Carbonio, Rosa)
- Caricamento del logo aziendale (PNG/JPG)
- Esportazione in PDF con jsPDF

## Stack tecnologico

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [jsPDF](https://github.com/parallax/jsPDF) — generazione PDF lato client
- [Lucide React](https://lucide.dev/) — icone
- [Sonner](https://sonner.emilkowal.ski/) — notifiche toast

## Avvio in locale

Requisiti: Node.js 18 o superiore.

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:5173`.

## Build di produzione

```bash
npm run build
```

I file compilati verranno generati nella cartella `dist/`.

## Struttura del progetto

```
src/
├── brochure/
│   ├── defaults.js          # Dati di esempio e stato iniziale
│   ├── Editor.jsx           # Pannello editor a schede
│   ├── generateBrochurePdf.js  # Logica di generazione PDF
│   ├── Preview.jsx          # Anteprima live della brochure
│   └── themes.js            # Definizione dei temi grafici
├── components/
│   └── ui/                  # Componenti UI (Button, Input, Tabs, ecc.)
├── lib/
│   └── utils.js             # Utility condivise
├── App.jsx                  # Componente principale
└── main.jsx                 # Entry point
```

## Aggiungere un tema

Per aggiungere un nuovo tema grafico, aprire `src/brochure/themes.js` e aggiungere un oggetto all'array `THEMES` seguendo la struttura degli altri temi:

```js
{
  id: "nome-id",
  name: "Nome Visualizzato",
  swatch: ["#colore1", "#colore2", "#colore3"],
  center: { bg: "#...", text: "#...", accent: "#...", muted: "#...", line: "#..." },
  panelBg: "#FFFFFF",
  bodyText: "#...",
  boxBg: "#...",
  boxBorder: "#...",
  check: "#...",
  dot: "#...",
  panelA: { header: "#...", headerText: "#FFFFFF", accent: "#..." },
  panelB: { header: "#...", headerText: "#FFFFFF", accent: "#..." },
}
```

## Licenza

MIT
