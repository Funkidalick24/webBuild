import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

function repoRoot() {
  // apps/api -> repo root
  return path.resolve(process.cwd(), '..', '..');
}

const DATA_DIR = path.join(repoRoot(), '.data');
const DB_PATH = path.join(DATA_DIR, 'db.json');

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readDb() {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(DB_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return {
      sites: parsed.sites ?? {},
      pages: parsed.pages ?? {},
      publishes: parsed.publishes ?? {},
    };
  } catch (err) {
    if (err && err.code === 'ENOENT') return { sites: {}, pages: {}, publishes: {} };
    throw err;
  }
}

async function writeDb(next) {
  await ensureDataDir();
  await fs.writeFile(DB_PATH, JSON.stringify(next, null, 2), 'utf8');
}

function newId(prefix) {
  const id = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : crypto.randomBytes(16).toString('hex');
  return `${prefix}_${id.replaceAll('-', '')}`;
}

export const store = {
  async createSite({ name, generation }) {
    const db = await readDb();
    const siteId = newId('site');
    db.sites[siteId] = { siteId, name, createdAt: new Date().toISOString(), generation };
    await writeDb(db);
    return db.sites[siteId];
  },

  async getSite(siteId) {
    const db = await readDb();
    return db.sites[siteId] ?? null;
  },

  async patchSite(siteId, patch) {
    const db = await readDb();
    const site = db.sites[siteId];
    if (!site) return null;
    db.sites[siteId] = { ...site, ...patch };
    await writeDb(db);
    return db.sites[siteId];
  },

  async saveLayout(tree) {
    const db = await readDb();
    db.pages[tree.pageId] = tree;
    await writeDb(db);
    return { ok: true };
  },

  async getLayout(pageId) {
    const db = await readDb();
    return db.pages[pageId] ?? null;
  },

  async publishSite(siteId) {
    const db = await readDb();
    const site = db.sites[siteId];
    if (!site) return null;
    const pageId = `${siteId}_home`;
    const tree = db.pages[pageId];
    if (!tree) return null;

    const versionId = newId('ver');
    const record = {
      versionId,
      siteId,
      pageId,
      createdAt: new Date().toISOString(),
      tree,
      generation: site.generation,
    };
    db.publishes[versionId] = record;
    await writeDb(db);
    return record;
  },

  async getPublished(versionId) {
    const db = await readDb();
    return db.publishes[versionId] ?? null;
  },
};

