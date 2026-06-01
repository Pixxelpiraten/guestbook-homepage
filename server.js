const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

function createApp(fsPromises = fs) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const DATA_DIR = path.join(__dirname, 'data');
  const DATA_FILE = process.env.DATA_FILE || path.join(DATA_DIR, 'entries.json');

  async function ensureDataDir() {
    try {
      await fsPromises.mkdir(DATA_DIR, { recursive: true });
      // ensure file exists
      try {
        await fsPromises.access(DATA_FILE);
      } catch (e) {
        await fsPromises.writeFile(DATA_FILE, '[]', 'utf8');
      }
    } catch (e) {
      console.error('Fehler beim Erstellen des Datenverzeichnisses:', e);
    }
  }

  async function readEntries() {
    try {
      const raw = await fsPromises.readFile(DATA_FILE, 'utf8');
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  async function writeEntries(entries) {
    await fsPromises.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), 'utf8');
  }

  app.get('/api/entries', async (req, res) => {
    const entries = await readEntries();
    res.json(entries);
  });

  app.post('/api/entries', async (req, res) => {
    const { name, message } = req.body || {};
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Name ist erforderlich.' });
    }
    const entries = await readEntries();
    const entry = { name: name.trim(), message: (message || '').toString(), time: Date.now() };
    entries.unshift(entry);
    await writeEntries(entries);
    res.status(201).json(entry);
  });

  app.delete('/api/entries', async (req, res) => {
    await writeEntries([]);
    res.json({ ok: true });
  });

  // statische Dateien aus dem Projektverzeichnis
  app.use(express.static(path.join(__dirname)));

  app._ensureDataDir = ensureDataDir;

  return app;
}

if (require.main === module) {
  const app = createApp();
  const port = process.env.PORT || 3000;

  app._ensureDataDir().then(() => {
    app.listen(port, () => {
      console.log(`Server läuft: http://localhost:${port}`);
    });
  });
}

module.exports = createApp;
