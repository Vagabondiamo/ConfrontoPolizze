# PRD — Futuria Brochure Generator

## Problem Statement
Strumento interno per i consulenti di Futuria Assicurazioni (Reggio Emilia): app React che genera una brochure PDF pieghevole (trifold A4 orizzontale) per confrontare due polizze assicurative. Editor a sinistra, anteprima visiva a destra. Deve sembrare professionale da mostrare stampato ai clienti.

## Architecture
- **Frontend-only** React app (nessun backend / MongoDB usati). PDF generato client-side con **jsPDF**.
- `src/brochure/themes.js` — 3 palette colori (Futuria, Ardesia & Rame, Bordeaux & Oro).
- `src/brochure/defaults.js` — dati di esempio (placeholder) + resolveData (fallback) + stato EMPTY.
- `src/brochure/Editor.jsx` — 3 tab (Polizza A / Centro / Polizza B) con tutti i campi + list editor + upload logo.
- `src/brochure/Preview.jsx` — anteprima HTML/CSS fedele (aspect 297:210), pannello B speculare.
- `src/brochure/generateBrochurePdf.js` — jsPDF landscape A4, 3 pannelli, icone geometriche, linee di piega.
- `src/App.js` — layout editor+preview, selettore tema, pulsante Scarica PDF.

## User Persona
Consulente assicurativo Futuria che compila i dati di due polizze e stampa/consegna la brochure al cliente.

## Core Requirements (static)
- Trifold A4 orizzontale, 3 pannelli (A colorato / Centro Futuria scuro / B speculare colore diverso).
- Editor a tab con campi per nome, compagnia, coperture, vantaggi, esclusioni, contatti, consulente, slogan.
- Placeholder di esempio sui campi vuoti; anteprima mai vuota.
- Selettore tema (≥3 palette). Upload logo → base64 → jsPDF.
- Colori Futuria: navy #0E2D50, oro #C2942E, verde scuro #164430. Italiano.
- Design pulito, moderno, tagli geometrici netti, colori piatti.

## Implemented (2026-06)
- [x] Tutti i requisiti sopra. Verificato dal testing agent (frontend 100%, 0 errori, download PDF OK).

## Backlog / Next
- P1: Anteprima real-time del PDF renderizzato (embed) accanto all'anteprima HTML.
- P2: Salvataggio/caricamento brochure (persistenza) — attualmente solo generate & download.
- P2: Esportazione anche in formato "fronte/retro" con ordine pannelli per piegatura reale.
- P2: Libreria prodotti predefiniti (TCM, Infortuni, Malattia) come dropdown.
