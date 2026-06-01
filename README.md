Einseitige Homepage mit Gästebuch

Kurzbeschreibung

Dieses Projekt enthält eine einfache einseitige Homepage (index.html) mit einem Gästebuch und einem minimalen Node.js-Backend (server.js). Gästebucheinträge werden in einer lokalen JSON-Datei gespeichert (data/entries.json).

Voraussetzungen

- Node.js (LTS empfohlen)
- npm

Installation und Start

1. Öffne ein Terminal im Projektordner (z. B. C:\Users\Pixxel\source\repos\NewRepo)
2. Abhängigkeiten installieren:

   npm install

3. Server starten:

   npm start

4. Öffne im Browser:

   http://localhost:3000

API (Endpunkte)

- GET /api/entries
  - Gibt eine Liste aller Einträge (JSON) zurück.
- POST /api/entries
  - Erwartet JSON-Body: {"name":"Dein Name","message":"Deine Nachricht"}
  - Name ist erforderlich.
  - Beispiel (curl):
	curl -X POST http://localhost:3000/api/entries -H "Content-Type: application/json" -d "{\"name\":\"Max\",\"message\":\"Hallo!\"}"
- DELETE /api/entries
  - Löscht alle Einträge.
  - Beispiel (curl):
	curl -X DELETE http://localhost:3000/api/entries

Datenablage

- Pfad: ./data/entries.json
- Die Datei wird beim ersten Start automatisch angelegt.

Konfiguration

- PORT: Optionaler Umgebungswert zum Überschreiben des Standardports (3000). z. B. PORT=4000 npm start

Datenschutzhinweis

Gästebucheinträge werden auf dem Serverprojekt im Ordner data gespeichert und nicht an Dritte weitergegeben. Für Löschwünsche oder Fragen: info@example.com

Weiteres

- index.html wurde so angepasst, dass es die oben genannten API-Endpunkte verwendet.
- Anpassungen am Layout oder am Backend können direkt in index.html bzw. server.js vorgenommen werden.

Bei Bedarf kann ich noch eine Anleitung für Deployment, HTTPS oder User-Validierung ergänzen.

Tests
-----

Automatisierte Tests mit Jest und Supertest sind enthalten.

1. Dev-Abhängigkeiten installieren:

```bash
npm install
```

2. Tests ausführen:

```bash
npm test
```

Hinweis: Die Tests verwenden für jede Testausführung eine temporäre JSON-Datei (über `process.env.DATA_FILE`), daher werden keine Produktionsdaten im `data/`-Ordner überschrieben.