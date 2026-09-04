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
  /*sermons: [],
  events: [],
  ministries: [],
  team: [],
  testimonials: [],
  prayers: [],
  visits: [],
  donations: [],
  contacts: [],*/
  sermons: [
    {
      id: "sermon-1",
      title: "Marcher par la foi et non par la vue",
      speaker: "PasteurNarcisse F. T",
      role: "Pasteur principal",
      date: "2025-05-18",
      series: "Enracinés dans la Grâce",
      scripture: "2 Corinthiens 5:7 & Hébreux 11:1-6",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      audioUrl:
        "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3",
      duration: "42 min",
      description:
        "Comment vivre une foi inébranlable au milieu des tempêtes et défis du quotidien en nous appuyant sur les promesses éternelles de Dieu.",
      keyPoints: [
        "La foi ne nie pas la réalité, elle regarde au Dieu souverain",
        "Passer de l'anxiété à l'abandon confiant",
        "Des pas concrets d'obéissance chaque jour",
      ],
      thumbnail:
        "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      id: "sermon-2",
      title: "La puissance de la prière persévérante",
      speaker: "Pasteure Françoise Martin",
      role: "Pasteure associée",
      date: "2025-05-11",
      series: "Vie de Prière",
      scripture: "Jacques 5:13-18",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      audioUrl:
        "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3",
      duration: "38 min",
      description:
        "Découvrez comment la prière fervente du juste transforme les cœurs, les familles et notre communauté.",
      keyPoints: [
        "Prier avec foi et humilité",
        "L'intercession comme acte d'amour fraternel",
        "Persévérer quand la réponse tarde",
      ],
      thumbnail:
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
    {
      id: "sermon-3",
      title: "L'amour en action : Servir notre prochain",
      speaker: "Michel Kabasele",
      role: "Responsable Jeunesse & Mission",
      date: "2025-05-04",
      series: "L'Évangile au quotidien",
      scripture: "1 Jean 3:16-18",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      audioUrl:
        "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3",
      duration: "35 min",
      description:
        "N'aimons pas seulement en paroles mais en actions concrètes dans notre ville de Québec.",
      keyPoints: [
        "Le sacrifice de Christ comme modèle d'amour",
        "Détecter les besoins autour de soi",
        "Être les mains et les pieds de Jésus",
      ],
      thumbnail:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
  ],
  events: [
    {
      id: "event-1",
      title: "Culte dominical de célébration",
      day: "25",
      month: "MAI",
      date: "Dimanche 25 mai 2025 à 10h00",
      time: "10h00 - 12h00",
      category: "Culte",
      location: "Sanctuaire principal & En direct",
      description:
        "Louange contemporaine, prédication vivante de la Parole, et programme Béthanie Kids pour les enfants de 0 à 12 ans.",
      speaker: "PasteurNarcisse F. T",
      image:
        "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      id: "event-2",
      title: "Étude biblique : Les Paraboles du Royaume",
      day: "28",
      month: "MAI",
      date: "Mercredi 28 mai 2025 à 19h00",
      time: "19h00 - 20h30",
      category: "Enseignement",
      location: "Salle polyvalente & Zoom",
      description:
        "Étude interactive verset par verset sur les enseignements profonds de Jésus et leur application concrète.",
      speaker: "Pasteure Françoise Martin",
      image:
        "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      id: "event-3",
      title: "Soirée de prière & d'intercession",
      day: "31",
      month: "MAI",
      date: "Samedi 31 mai 2025 à 19h30",
      time: "19h30 - 21h00",
      category: "Prière",
      location: "Chapelle de prière",
      description:
        "Un temps privilégié pour chercher la face de Dieu, intercéder pour nos familles, les malades et notre métropole.",
      speaker: "Équipe d'intercession",
      image:
        "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5b?auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      id: "event-4",
      title: "Soirée Jeunesse Béthanie Connect",
      day: "07",
      month: "JUIN",
      date: "Vendredi 7 juin 2025 à 19h00",
      time: "19h00 - 22h00",
      category: "Jeunesse",
      location: "Espace Jeunes",
      description:
        "Jeux, louange acoustique, partage inspirant et pizza pour les 13 à 25 ans. Viens avec tes amis !",
      speaker: "Michel Kabasele",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
    {
      id: "event-5",
      title: "Brunch communautaire & Accueil des nouveaux",
      day: "16",
      month: "JUIN",
      date: "Dimanche 16 juin 2025 à 12h30",
      time: "12h30 - 14h30",
      category: "Communautaire",
      location: "Grand Hall Béthanie",
      description:
        "Repas fraternel convivial après le culte pour faire connaissance et souhaiter la bienvenue à tous les nouveaux arrivants.",
      speaker: "Comité d'accueil",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
  ],
  ministries: [
    {
      id: "min-culte",
      name: "Chorale",
      shortDesc:
        "Rejoignez notre chorale pour élever la voix de l'assemblée dans la louange et l'adoration chaque dimanche.",
      icon: "Church",
      slug: "culte-louange",
      schedule: "Dimanche à 13h00",
      target: "Toute la famille",
      image: "/ci12.jpg",
      description:
        "Notre chorale accompagne l'assemblée dans des moments d'adoration chaleureux mêlant cantiques bibliques et chants contemporains, répétant chaque semaine pour offrir une louange vivante et priante.",
    },
    {
      id: "min-enfants",
      name: "Béthanie Kids (Culte d'enfants)",
      shortDesc:
        "Un enseignement biblique adapté pour nos enfants dans un cadre sécurisé et joyeux.",
      icon: "Baby",
      slug: "enfants-bethanie-kids",
      schedule: "Pendant le culte du dimanche (13h00)",
      target: "0 à 12 ans (Pépinière, Éveil, Juniors)",
      image: "/ci13.jpg",
      description:
        "Une équipe d'éducateurs passionnés propose des leçons bibliques créatives, des bricolages, du chant et des jeux pour bâtir des fondations solides.",
    },
    {
      id: "min-jeunesse",
      name: "Ado & Jeunesse Connectée",
      shortDesc:
        "Des activités et des rencontres dynamiques pour grandir dans sa foi et s'épanouir.",
      icon: "Users",
      slug: "jeunesse-connect",
      schedule: "1er et 3e vendredi à 19h00",
      target: "13 à 25 ans",
      image: "/ci9.jpg",
      description:
        "Un espace ouvert pour les ados et jeunes adultes pour aborder les vrais défis de la vie étudiante et professionnelle sous le prisme de l'Évangile.",
    },
    {
      id: "min-priere",
      name: "Mamans",
      shortDesc:
        "Un espace d'entraide, d'écoute et de prière pour les mamans de notre communauté.",
      icon: "HandHelping",
      slug: "priere-intercession",
      schedule: "Vendredi 19h30 & Lundi 6h30 (Prière matinale)",
      target: "Toutes les mamans",
      image: "/ci11.jpg",
      description:
        "Un groupe de mamans qui se soutiennent mutuellement dans la prière, partagent leurs expériences de la maternité et portent ensemble les besoins de leurs familles et de l'église.",
    },
  ],
  team: [
    {
      id: "team-1",
      name: "Pasteur Narcisse F. T",
      role: "Pasteur principal",
      bio: "Au service de la Communauté Chrétienne Béthanie depuis plus de 15 ans avec une passion pour l'enseignement biblique et l'accompagnement pastoral.",
      photo: "/past-narcisse.jpg",
      email: "narcisse.ft@ccbethanie.ca",
    },
    {
      id: "team-2",
      name: "Françoise Martin",
      role: "Pasteure associée & Enseignement",
      bio: "Docteure en théologie, elle coordonne les groupes de maison, la formation des disciples et le ministère pastoral auprès des familles.",
      photo:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      email: "francoise.martin@ccbethanie.ca",
    },
    {
      id: "team-3",
      name: "Michel Kabasele",
      role: "Responsable Jeunesse & Louange",
      bio: "Musicien et mentor engagé auprès de la nouvelle génération pour les encourager à briller dans leur foi et leurs études.",
      photo:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      email: "michel.kabasele@ccbethanie.ca",
    },
    {
      id: "team-4",
      name: "Sarah N'Guessan",
      role: "Responsable Béthanie Kids",
      bio: "Éducatrice d'expérience, Sarah veille avec amour sur le développement spirituel et le bien-être de nos plus jeunes enfants.",
      photo:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      email: "sarah.nguessan@ccbethanie.ca",
    },
  ],
  testimonials: [
    {
      id: "test-1",
      author: "Carole M.",
      role: "Membre depuis 10 ans",
      role_en: "Member for 10 years",
      quote:
        "Béthanie est devenue pour moi et ma famille une vraie maison. J'y ai trouvé l'amour authentique de Dieu, des enseignements profonds et des amis précieux sur qui je peux toujours compter.",
      quote_en:
        "Bethany has become a true home for me and my family. I found God's authentic love, deep teachings, and precious friends I can always count on.",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "test-2",
      author: "Line N.",
      role: "Famille avec 4 enfants",
      role_en: "Family with 4 children",
      quote:
        "Le programme des enfants est exceptionnel. Nos enfants ont hâte de venir chaque dimanche et nous nous sentons grandir spirituellement à chaque culte.",
      quote_en:
        "The children's program is outstanding. Our kids look forward to coming every Sunday, and we feel ourselves growing spiritually with every service.",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "test-3",
      author: "Laurette H.",
      role: "Membre active du conseil d'ancien",
      role_en: "Active member of the elders' council",
      quote:
        "Quand je suis arrivé à Québec, je cherchais une communauté chrétienne chaleureuse. À Béthanie, j'ai été accueilli à bras ouverts dès le premier jour !",
      quote_en:
        "When I arrived in Montreal, I was looking for a warm Christian community. At Bethany, I was welcomed with open arms from day one!",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
    },
  ],
  prayers: [
    {
      id: "pray-1788497929677",
      authorName: "Testor",
      isAnonymous: false,
      category: "Santé & Guérison",
      requestText: "Merci",
      prayerCount: 1,
      createdAt: "2026-09-04T04:58:49.677Z",
      isPublic: false,
      status: "approved",
    },
    {
      id: "pray-1788497880405",
      authorName: "test",
      isAnonymous: false,
      category: "Santé & Guérison",
      requestText: "test",
      prayerCount: 1,
      createdAt: "2026-09-04T04:58:00.405Z",
      isPublic: false,
      status: "approved",
    },
    {
      id: "pray-1788139021200",
      authorName: "Anonyme",
      isAnonymous: true,
      category: "Famille & Foyer",
      requestText: "test de prière",
      prayerCount: 2,
      createdAt: "2026-08-31T01:17:01.200Z",
      isPublic: true,
      status: "approved",
    },
    {
      id: "pray-1",
      authorName: "Esther M.",
      isAnonymous: false,
      category: "Santé",
      requestText:
        "Prière pour la guérison complète de ma maman hospitalisée cette semaine. Que la paix de Dieu l'inonde.",
      prayerCount: 27,
      createdAt: "2025-05-18T14:20:00.000Z",
      isPublic: true,
      status: "approved",
    },
    {
      id: "pray-2",
      authorName: "Anonyme",
      isAnonymous: true,
      category: "Famille",
      requestText:
        "Pour la réconciliation au sein de mon foyer et la bénédiction de nos enfants dans leurs examens.",
      prayerCount: 21,
      createdAt: "2025-05-17T09:10:00.000Z",
      isPublic: true,
      status: "approved",
    },
    {
      id: "pray-3",
      authorName: "Samuel T.",
      isAnonymous: false,
      category: "Travail & Projet",
      requestText:
        "Action de grâce pour un nouvel emploi obtenu après plusieurs mois de recherche ! Dieu est fidèle.",
      prayerCount: 39,
      createdAt: "2025-05-15T18:45:00.000Z",
      isPublic: true,
      status: "approved",
    },
  ],
  visits: [],
  donations: [
    {
      id: "don-1",
      donorName: "Anonyme",
      amount: 150,
      fund: "Dîmes & Offrandes",
      createdAt: "2025-05-18T11:30:00.000Z",
    },
    {
      id: "don-2",
      donorName: "Famille B.",
      amount: 200,
      fund: "Fonds de Mission",
      createdAt: "2025-05-17T16:00:00.000Z",
    },
  ],
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
