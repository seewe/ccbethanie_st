import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { MongoClient } from "mongodb";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "..", "data_store.json");
const MONGO_DB_NAME = "bethanie_church";
const MONGO_COLLECTION = "store";
const DOC_ID = "main";

// Statically require the seed data so bundlers (esbuild, used by Netlify
// Functions) inline it as a JS object at build time. This is essential on
// Netlify: the deployed function bundle does NOT include data_store.json on
// disk, so fs.readFileSync(DATA_FILE) below fails there and would otherwise
// silently fall back to the near-empty INITIAL_DATA stub.
const require = createRequire(import.meta.url);
let bundledSeedData = null;
try {
  bundledSeedData = require("../data_store.json");
} catch {
  bundledSeedData = null;
}

// Initial seed data representing Communauté Chrétienne Béthanie.
// Used only if data_store.json is missing/unreadable and no Mongo document exists yet.
const INITIAL_DATA = {
  churchInfo: {
    name: "Communauté Chrétienne Béthanie",
    affiliation: "Église Presbytérienne au Canada",
    slogan: "Une communauté pour vivre et partager la foi en Jésus-Christ.",
    subSlogan: "Une église qui grandit dans la foi, l'amour et le service.",
    foundedYear: 1998,
    address: "2401 avenue de l'abbé Giguere, Québec, QC G1C 0H4",
    phone: "(514) 555-1234",
    email: "info@ccbethanie.ca",
    sundayServiceTime: "Dimanche 13h00",
    bibleStudyTime: "Mercredi 19h00",
    prayerTime: "Vendredi 19h30",
    livestreamUrl: "https://www.youtube.com",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    youtubeUrl: "https://youtube.com",
  },
  sermons: [],
  events: [],
  ministries: [],
  team: [],
  testimonials: [],
  prayers: [],
  visits: [],
  donations: [],
  contacts: [],
};

let mongoClient = null;
let mongoCollection = null;
let mongoInitAttempted = false;

// In-memory cache used when Mongo is unavailable. On serverless platforms
// (e.g. Netlify Functions) this cache is NOT guaranteed to persist between
// invocations — writes may be lost. Set MONGODB_URI for durable persistence.
let memoryDb = null;

function readSeedFromFile() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("Error reading local seed data file:", err.message);
  }
  // Serverless bundle path (e.g. Netlify Functions): data_store.json isn't
  // present on disk, so use the copy inlined at build time via require().
  if (bundledSeedData) {
    return JSON.parse(JSON.stringify(bundledSeedData));
  }
  return { ...INITIAL_DATA };
}

async function getMongoCollection() {
  if (mongoCollection) return mongoCollection;
  if (!process.env.MONGODB_URI) return null;
  if (mongoInitAttempted && !mongoCollection) return null;
  mongoInitAttempted = true;
  try {
    mongoClient = new MongoClient(process.env.MONGODB_URI);
    await mongoClient.connect();
    const dbInstance = mongoClient.db(MONGO_DB_NAME);
    mongoCollection = dbInstance.collection(MONGO_COLLECTION);
    console.log("Connected successfully to MongoDB server!");
    return mongoCollection;
  } catch (err) {
    console.warn(
      "MongoDB connection failed or not reachable, falling back to local/in-memory data store:",
      err.message,
    );
    return null;
  }
}

// Content collections that are seeded from data_store.json and edited via
// the admin UI. If any of these are missing/empty in an existing Mongo
// document (e.g. because it was seeded before a data fix was deployed, or
// before content was added), we backfill them from the bundled seed so a
// stale empty document doesn't permanently shadow real content.
const SEEDABLE_CONTENT_KEYS = [
  "sermons",
  "events",
  "ministries",
  "team",
  "testimonials",
  "prayers",
];

function getSeedFallback() {
  return readSeedFromFile();
}

// Loads the full application data document.
export async function loadDb() {
  const collection = await getMongoCollection();
  if (collection) {
    const doc = await collection.findOne({ _id: DOC_ID });
    if (doc) {
      const { _id, ...data } = doc;
      const seed = getSeedFallback();
      let needsBackfill = false;
      for (const key of SEEDABLE_CONTENT_KEYS) {
        const current = data[key];
        if (
          (!Array.isArray(current) || current.length === 0) &&
          Array.isArray(seed[key]) &&
          seed[key].length > 0
        ) {
          data[key] = seed[key];
          needsBackfill = true;
        }
      }
      if (needsBackfill) {
        await collection.replaceOne(
          { _id: DOC_ID },
          { _id: DOC_ID, ...data },
          { upsert: true },
        );
      }
      return data;
    }
    const seed = readSeedFromFile();
    await collection.insertOne({ _id: DOC_ID, ...seed });
    return seed;
  }

  if (!memoryDb) {
    memoryDb = readSeedFromFile();
  }
  return memoryDb;
}

// Persists the full application data document.
export async function saveDb(data) {
  const collection = await getMongoCollection();
  if (collection) {
    await collection.replaceOne(
      { _id: DOC_ID },
      { _id: DOC_ID, ...data },
      { upsert: true },
    );
    return;
  }

  memoryDb = data;
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    // Expected on read-only/ephemeral filesystems such as Netlify Functions.
    console.warn(
      "Could not persist to local data file (expected on serverless hosts without MONGODB_URI):",
      err.message,
    );
  }
}
