import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));

// Persistent Local Database file for instant reliability and standalone demo
const DATA_FILE = path.join(__dirname, 'data_store.json');

// Initial seed data representing Communauté Chrétienne Béthanie
const INITIAL_DATA = {
  churchInfo: {
    name: "Communauté Chrétienne Béthanie",
    affiliation: "Église Presbytérienne au Canada",
    slogan: "Une communauté pour vivre et partager la foi en Jésus-Christ.",
    subSlogan: "Une église qui grandit dans la foi, l'amour et le service.",
    foundedYear: 1998,
    address: "1234 Rue de la Foi, Montréal, QC H1A 1A1",
    phone: "(514) 555-1234",
    email: "info@ccbethanie.ca",
    sundayServiceTime: "Dimanche 10h30",
    bibleStudyTime: "Mercredi 19h00",
    prayerTime: "Vendredi 19h30",
    livestreamUrl: "https://www.youtube.com",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    youtubeUrl: "https://youtube.com"
  },
  sermons: [
    {
      id: "sermon-1",
      title: "Marcher par la foi et non par la vue",
      speaker: "Pasteur Jean Dupont",
      role: "Pasteur principal",
      date: "2025-05-18",
      series: "Enracinés dans la Grâce",
      scripture: "2 Corinthiens 5:7 & Hébreux 11:1-6",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      audioUrl: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3",
      duration: "42 min",
      description: "Comment vivre une foi inébranlable au milieu des tempêtes et défis du quotidien en nous appuyant sur les promesses éternelles de Dieu.",
      keyPoints: [
        "La foi ne nie pas la réalité, elle regarde au Dieu souverain",
        "Passer de l'anxiété à l'abandon confiant",
        "Des pas concrets d'obéissance chaque jour"
      ],
      thumbnail: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=800&q=80",
      featured: true
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
      audioUrl: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3",
      duration: "38 min",
      description: "Découvrez comment la prière fervente du juste transforme les cœurs, les familles et notre communauté.",
      keyPoints: [
        "Prier avec foi et humilité",
        "L'intercession comme acte d'amour fraternel",
        "Persévérer quand la réponse tarde"
      ],
      thumbnail: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80",
      featured: false
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
      audioUrl: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3",
      duration: "35 min",
      description: "N'aimons pas seulement en paroles mais en actions concrètes dans notre ville de Montréal.",
      keyPoints: [
        "Le sacrifice de Christ comme modèle d'amour",
        "Détecter les besoins autour de soi",
        "Être les mains et les pieds de Jésus"
      ],
      thumbnail: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
      featured: false
    }
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
      description: "Louange contemporaine, prédication vivante de la Parole, et programme Béthanie Kids pour les enfants de 0 à 12 ans.",
      speaker: "Pasteur Jean Dupont",
      image: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=800&q=80",
      featured: true
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
      description: "Étude interactive verset par verset sur les enseignements profonds de Jésus et leur application concrète.",
      speaker: "Pasteure Françoise Martin",
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80",
      featured: true
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
      description: "Un temps privilégié pour chercher la face de Dieu, intercéder pour nos familles, les malades et notre métropole.",
      speaker: "Équipe d'intercession",
      image: "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5b?auto=format&fit=crop&w=800&q=80",
      featured: true
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
      description: "Jeux, louange acoustique, partage inspirant et pizza pour les 13 à 25 ans. Viens avec tes amis !",
      speaker: "Michel Kabasele",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      featured: false
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
      description: "Repas fraternel convivial après le culte pour faire connaissance et souhaiter la bienvenue à tous les nouveaux arrivants.",
      speaker: "Comité d'accueil",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      featured: false
    }
  ],
  ministries: [
    {
      id: "min-culte",
      name: "Culte & Louange",
      shortDesc: "Rejoignez-nous chaque dimanche pour vivre la présence de Dieu dans la louange et la Parole.",
      icon: "Church",
      slug: "culte-louange",
      schedule: "Dimanche à 10h30",
      target: "Toute la famille",
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80",
      description: "Notre équipe de louange conduit l'assemblée dans des moments d'adoration chaleureux mêlant cantiques bibliques et chants contemporains."
    },
    {
      id: "min-enfants",
      name: "Béthanie Kids (Enfants)",
      shortDesc: "Un enseignement biblique adapté pour nos enfants dans un cadre sécurisé et joyeux.",
      icon: "Baby",
      slug: "enfants-bethanie-kids",
      schedule: "Pendant le culte du dimanche (10h30)",
      target: "0 à 12 ans (Pépinière, Éveil, Juniors)",
      image: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80",
      description: "Une équipe d'éducateurs passionnés propose des leçons bibliques créatives, des bricolages, du chant et des jeux pour bâtir des fondations solides."
    },
    {
      id: "min-jeunesse",
      name: "Ado & Jeunesse Connect",
      shortDesc: "Des activités et des rencontres dynamiques pour grandir dans sa foi et s'épanouir.",
      icon: "Users",
      slug: "jeunesse-connect",
      schedule: "1er et 3e vendredi à 19h00",
      target: "13 à 25 ans",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      description: "Un espace ouvert pour les ados et jeunes adultes pour aborder les vrais défis de la vie étudiante et professionnelle sous le prisme de l'Évangile."
    },
    {
      id: "min-priere",
      name: "Prière & Intercession",
      shortDesc: "Nous croyons à la puissance agissante de la prière fervente et fraternelle.",
      icon: "HandHelping",
      slug: "priere-intercession",
      schedule: "Vendredi 19h30 & Lundi 6h30 (Prière matinale)",
      target: "Tous les croyants",
      image: "https://images.unsplash.com/photo-1445445290350-18a3b86e0b5b?auto=format&fit=crop&w=800&q=80",
      description: "Un réseau d'intercesseurs dévoués qui portent les fardeaux de l'église, des requêtes personnelles et de la ville de Montréal."
    },
    {
      id: "min-servir",
      name: "Servir & Bénévolat",
      shortDesc: "De nombreuses façons de mettre vos dons spirituels et talents au service des autres.",
      icon: "HeartHandshake",
      slug: "servir-benevolat",
      schedule: "Selon les équipes (Accueil, Médias, Musique, Diaconat)",
      target: "Tous les membres",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80",
      description: "Chacun a reçu un talent pour l'édification commune. Découvrez votre ministère et rejoignez une équipe épanouissante."
    },
    {
      id: "min-evangelisation",
      name: "Évangélisation & Action Sociale",
      shortDesc: "Partager l'Évangile d'amour et impacter positivement notre quartier et le monde.",
      icon: "Globe",
      slug: "evangelisation-action-sociale",
      schedule: "Samedi matin & Projets spéciaux",
      target: "Communauté & Missionnaires",
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
      description: "Distribution alimentaire, soutien aux nouveaux arrivants et proclamation bienveillante de la Bonne Nouvelle de Jésus-Christ."
    }
  ],
  team: [
    {
      id: "team-1",
      name: "Pasteur Jean Dupont",
      role: "Pasteur principal",
      bio: "Au service de la Communauté Chrétienne Béthanie depuis plus de 15 ans avec une passion pour l'enseignement biblique et l'accompagnement pastoral.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      email: "jean.dupont@ccbethanie.ca"
    },
    {
      id: "team-2",
      name: "Françoise Martin",
      role: "Pasteure associée & Enseignement",
      bio: "Docteure en théologie, elle coordonne les groupes de maison, la formation des disciples et le ministère pastoral auprès des familles.",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      email: "francoise.martin@ccbethanie.ca"
    },
    {
      id: "team-3",
      name: "Michel Kabasele",
      role: "Responsable Jeunesse & Louange",
      bio: "Musicien et mentor engagé auprès de la nouvelle génération pour les encourager à briller dans leur foi et leurs études.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      email: "michel.kabasele@ccbethanie.ca"
    },
    {
      id: "team-4",
      name: "Sarah N'Guessan",
      role: "Responsable Béthanie Kids",
      bio: "Éducatrice d'expérience, Sarah veille avec amour sur le développement spirituel et le bien-être de nos plus jeunes enfants.",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      email: "sarah.nguessan@ccbethanie.ca"
    }
  ],
  testimonials: [
    {
      id: "test-1",
      author: "Marie K.",
      role: "Membre depuis 4 ans",
      quote: "Béthanie est devenue pour moi et ma famille une vraie maison. J'y ai trouvé l'amour authentique de Dieu, des enseignements profonds et des amis précieux sur qui je peux toujours compter.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "test-2",
      author: "David & Christine L.",
      role: "Famille avec 3 enfants",
      quote: "Le programme des enfants est exceptionnel. Nos enfants ont hâte de venir chaque dimanche et nous nous sentons grandir spirituellement à chaque culte.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "test-3",
      author: "Jonathan P.",
      role: "Groupe Jeunesse Béthanie",
      quote: "Quand je suis arrivé à Montréal, je cherchais une communauté chrétienne chaleureuse. À Béthanie, j'ai été accueilli à bras ouverts dès le premier jour !",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
    }
  ],
  prayers: [
    {
      id: "pray-1",
      authorName: "Esther M.",
      isAnonymous: false,
      category: "Santé",
      requestText: "Prière pour la guérison complète de ma maman hospitalisée cette semaine. Que la paix de Dieu l'inonde.",
      prayerCount: 24,
      createdAt: "2025-05-18T14:20:00.000Z",
      isPublic: true,
      status: "approved"
    },
    {
      id: "pray-2",
      authorName: "Anonyme",
      isAnonymous: true,
      category: "Famille",
      requestText: "Pour la réconciliation au sein de mon foyer et la bénédiction de nos enfants dans leurs examens.",
      prayerCount: 19,
      createdAt: "2025-05-17T09:10:00.000Z",
      isPublic: true,
      status: "approved"
    },
    {
      id: "pray-3",
      authorName: "Samuel T.",
      isAnonymous: false,
      category: "Travail & Projet",
      requestText: "Action de grâce pour un nouvel emploi obtenu après plusieurs mois de recherche ! Dieu est fidèle.",
      prayerCount: 37,
      createdAt: "2025-05-15T18:45:00.000Z",
      isPublic: true,
      status: "approved"
    }
  ],
  visits: [],
  donations: [
    {
      id: "don-1",
      donorName: "Anonyme",
      amount: 150,
      fund: "Dîmes & Offrandes",
      createdAt: "2025-05-18T11:30:00.000Z"
    },
    {
      id: "don-2",
      donorName: "Famille B.",
      amount: 200,
      fund: "Fonds de Mission",
      createdAt: "2025-05-17T16:00:00.000Z"
    }
  ],
  contacts: []
};

// Database state in memory and file
let db = { ...INITIAL_DATA };

// Helper to load db from file
function loadDb() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      db = JSON.parse(content);
    } else {
      saveDb();
    }
  } catch (err) {
    console.error("Error reading database file, using default data:", err);
  }
}

// Helper to save db to file
function saveDb() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error("Error writing database file:", err);
  }
}

loadDb();

// Optional real MongoDB client connection if MONGODB_URI environment variable is provided
let mongoClient = null;
let mongoDbInstance = null;

async function initMongo() {
  if (process.env.MONGODB_URI) {
    try {
      mongoClient = new MongoClient(process.env.MONGODB_URI);
      await mongoClient.connect();
      mongoDbInstance = mongoClient.db('bethanie_church');
      console.log("Connected successfully to MongoDB server!");
    } catch (e) {
      console.warn("MongoDB connection failed or not reachable, continuing with persistent local engine:", e.message);
    }
  }
}
initMongo();

// ======================== ADMIN AUTH ========================
const ADMIN_TOKEN_TTL_MS = 8 * 60 * 60 * 1000;

function getAdminPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  if (process.env.NODE_ENV === 'production') return null;
  console.warn('ADMIN_PASSWORD non défini — mot de passe dev temporaire: bethanie-admin');
  return 'bethanie-admin';
}

function createAdminToken() {
  const secret = getAdminPassword();
  if (!secret) return null;
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + ADMIN_TOKEN_TTL_MS })).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function verifyAdminToken(token) {
  if (!token) return false;
  const secret = getAdminPassword();
  if (!secret) return false;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expected = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (sigBuffer.length !== expectedBuffer.length) return false;
  if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) return false;

  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return Date.now() < exp;
  } catch {
    return false;
  }
}

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (verifyAdminToken(token)) return next();
  res.status(401).json({ success: false, message: 'Accès non autorisé. Connexion admin requise.' });
}

function isPublicApiRoute(req) {
  const { method, path: routePath } = req;

  if (method === 'POST' && routePath === '/api/admin/login') return true;

  if (method === 'GET') {
    if (routePath === '/api/church-info') return true;
    if (routePath === '/api/sermons') return true;
    if (/^\/api\/sermons\/[^/]+$/.test(routePath)) return true;
    if (routePath === '/api/events') return true;
    if (routePath === '/api/ministries') return true;
    if (routePath === '/api/team') return true;
    if (routePath === '/api/testimonials') return true;
    if (routePath === '/api/prayers') return true;
  }

  if (method === 'POST') {
    if (routePath === '/api/prayers') return true;
    if (/^\/api\/prayers\/[^/]+\/pray$/.test(routePath)) return true;
    if (routePath === '/api/visits') return true;
    if (routePath === '/api/donations') return true;
    if (routePath === '/api/contact') return true;
  }

  return false;
}

app.use((req, res, next) => {
  if (!req.path.startsWith('/api/')) return next();
  if (isPublicApiRoute(req)) return next();
  return requireAdmin(req, res, next);
});

// ======================== INPUT VALIDATION ========================
function rejectBadRequest(res, message) {
  return res.status(400).json({ success: false, message });
}

function trimmedString(value, maxLength) {
  if (typeof value !== 'string') return null;
  const text = value.trim();
  if (!text || text.length > maxLength) return null;
  return text;
}

function optionalString(value, maxLength) {
  if (value == null || value === '') return '';
  if (typeof value !== 'string') return null;
  const text = value.trim();
  if (text.length > maxLength) return null;
  return text;
}

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function positiveInt(value, min, max) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < min || number > max) return null;
  return number;
}

function donationAmount(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 1 || number > 100000) return null;
  return Math.round(number * 100) / 100;
}

function isValidDateString(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00`);
  return !Number.isNaN(date.getTime());
}

function validatePrayerInput(body) {
  const requestText = trimmedString(body?.requestText, 2000);
  if (!requestText || requestText.length < 5) {
    return { error: 'Veuillez décrire votre requête de prière (5 caractères minimum).' };
  }

  const isAnonymous = !!body?.isAnonymous;
  if (!isAnonymous) {
    const authorName = trimmedString(body?.authorName, 100);
    if (!authorName) return { error: 'Veuillez indiquer votre prénom ou nom.' };
  }

  const category = optionalString(body?.category, 80);
  if (category === null) return { error: 'Catégorie invalide.' };

  return {
    data: {
      authorName: isAnonymous ? 'Anonyme' : trimmedString(body?.authorName, 100),
      isAnonymous,
      category: category || 'Autre',
      requestText,
      isPublic: body?.isPublic !== false,
    },
  };
}

function validateVisitInput(body) {
  const name = trimmedString(body?.name, 100);
  if (!name) return { error: 'Veuillez indiquer votre nom.' };

  if (!isValidEmail(body?.email)) return { error: 'Adresse courriel invalide.' };

  const phone = optionalString(body?.phone, 30);
  if (phone === null) return { error: 'Numéro de téléphone invalide.' };

  if (!isValidDateString(body?.visitDate)) return { error: 'Date de visite invalide.' };

  const numberOfPeople = positiveInt(body?.numberOfPeople, 1, 20);
  if (numberOfPeople === null) return { error: 'Nombre de personnes invalide (1 à 20).' };

  const childrenCount = positiveInt(body?.childrenCount ?? 0, 0, 20);
  if (childrenCount === null) return { error: 'Nombre d\'enfants invalide (0 à 20).' };

  const hasQuestions = optionalString(body?.hasQuestions, 1000);
  if (hasQuestions === null) return { error: 'Le champ questions est trop long.' };

  return {
    data: {
      name,
      email: body.email.trim(),
      phone,
      visitDate: body.visitDate,
      numberOfPeople,
      childrenCount,
      hasQuestions,
      needParkingInfo: body?.needParkingInfo !== false,
    },
  };
}

function validateDonationInput(body) {
  const amount = donationAmount(body?.amount);
  if (amount === null) return { error: 'Montant invalide (entre 1 $ et 100 000 $).' };

  const isAnonymous = !!body?.isAnonymous;
  let donorName = 'Donateur';
  if (!isAnonymous) {
    const name = trimmedString(body?.donorName, 100);
    if (!name) return { error: 'Veuillez indiquer votre nom.' };
    donorName = name;
  }

  const email = optionalString(body?.email, 120);
  if (email === null) return { error: 'Adresse courriel invalide.' };
  if (email && !isValidEmail(email)) return { error: 'Adresse courriel invalide.' };

  const fund = optionalString(body?.fund, 100);
  if (fund === null) return { error: 'Fonds de don invalide.' };

  const paymentMethod = optionalString(body?.paymentMethod, 50);
  if (paymentMethod === null) return { error: 'Mode de paiement invalide.' };

  return {
    data: {
      donorName: isAnonymous ? 'Donateur Anonyme' : donorName,
      email: email || '',
      amount,
      fund: fund || 'Dîmes & Offrandes',
      paymentMethod: paymentMethod || 'Carte de crédit',
      isAnonymous,
    },
  };
}

function validateContactInput(body) {
  const name = trimmedString(body?.name, 100);
  if (!name) return { error: 'Veuillez indiquer votre nom.' };

  if (!isValidEmail(body?.email)) return { error: 'Adresse courriel invalide.' };

  const subject = optionalString(body?.subject, 150);
  if (subject === null) return { error: 'Sujet invalide.' };

  const message = trimmedString(body?.message, 3000);
  if (!message || message.length < 10) {
    return { error: 'Veuillez écrire un message (10 caractères minimum).' };
  }

  const phone = optionalString(body?.phone, 30);
  if (phone === null) return { error: 'Numéro de téléphone invalide.' };

  return {
    data: {
      name,
      email: body.email.trim(),
      subject: subject || 'Contact général',
      message,
      phone,
    },
  };
}

function validateSermonInput(body, partial = false) {
  const title = body?.title !== undefined ? trimmedString(body.title, 200) : (partial ? undefined : null);
  if (!partial && !title) return { error: 'Le titre de la prédication est requis.' };
  if (body?.title !== undefined && !title) return { error: 'Titre de prédication invalide.' };

  const fields = {};
  if (title) fields.title = title;
  if (body?.speaker !== undefined) {
    const speaker = trimmedString(body.speaker, 100);
    if (!speaker) return { error: 'Nom du prédicateur invalide.' };
    fields.speaker = speaker;
  }
  if (body?.description !== undefined) {
    const description = optionalString(body.description, 3000);
    if (description === null) return { error: 'Description trop longue.' };
    fields.description = description;
  }
  if (body?.scripture !== undefined) {
    const scripture = optionalString(body.scripture, 200);
    if (scripture === null) return { error: 'Référence biblique invalide.' };
    fields.scripture = scripture;
  }
  if (body?.series !== undefined) {
    const series = optionalString(body.series, 120);
    if (series === null) return { error: 'Série invalide.' };
    fields.series = series;
  }
  if (body?.videoUrl !== undefined) {
    const videoUrl = optionalString(body.videoUrl, 500);
    if (videoUrl === null) return { error: 'Lien vidéo invalide.' };
    fields.videoUrl = videoUrl;
  }
  if (body?.audioUrl !== undefined) {
    const audioUrl = optionalString(body.audioUrl, 500);
    if (audioUrl === null) return { error: 'Lien audio invalide.' };
    fields.audioUrl = audioUrl;
  }
  if (body?.date !== undefined) {
    const date = optionalString(body.date, 30);
    if (date === null) return { error: 'Date invalide.' };
    fields.date = date;
  }
  if (body?.featured !== undefined) fields.featured = !!body.featured;

  return { data: fields };
}

function validateEventInput(body, partial = false) {
  const title = body?.title !== undefined ? trimmedString(body.title, 200) : (partial ? undefined : null);
  if (!partial && !title) return { error: 'Le titre de l\'événement est requis.' };
  if (body?.title !== undefined && !title) return { error: 'Titre d\'événement invalide.' };

  const fields = {};
  if (title) fields.title = title;

  for (const [key, max] of [
    ['date', 80],
    ['day', 2],
    ['month', 10],
    ['time', 40],
    ['category', 60],
    ['location', 200],
    ['description', 3000],
    ['speaker', 100],
    ['image', 500],
  ]) {
    if (body?.[key] !== undefined) {
      const value = optionalString(body[key], max);
      if (value === null) return { error: `Champ "${key}" invalide.` };
      fields[key] = value;
    }
  }

  if (body?.featured !== undefined) fields.featured = !!body.featured;
  return { data: fields };
}

// ======================== API ROUTES ========================

app.post('/api/admin/login', (req, res) => {
  const password = getAdminPassword();
  if (!password) {
    return res.status(503).json({
      success: false,
      message: 'Administration non configurée. Définissez ADMIN_PASSWORD dans .env.',
    });
  }
  if (req.body?.password !== password) {
    return res.status(401).json({ success: false, message: 'Mot de passe incorrect.' });
  }
  const token = createAdminToken();
  res.json({ success: true, token });
});

// 1. Church Info
app.get('/api/church-info', (req, res) => {
  res.json({ success: true, data: db.churchInfo });
});

app.put('/api/church-info', (req, res) => {
  db.churchInfo = { ...db.churchInfo, ...req.body };
  saveDb();
  res.json({ success: true, data: db.churchInfo });
});

// 2. Sermons / Prédications
app.get('/api/sermons', (req, res) => {
  res.json({ success: true, data: db.sermons });
});

app.get('/api/sermons/:id', (req, res) => {
  const sermon = db.sermons.find(s => s.id === req.params.id);
  if (!sermon) return res.status(404).json({ success: false, message: "Prédication non trouvée" });
  res.json({ success: true, data: sermon });
});

app.post('/api/sermons', (req, res) => {
  const validation = validateSermonInput(req.body);
  if (validation.error) return rejectBadRequest(res, validation.error);

  const newSermon = {
    id: `sermon-${Date.now()}`,
    ...validation.data,
    featured: validation.data.featured || false
  };
  db.sermons.unshift(newSermon);
  saveDb();
  res.status(201).json({ success: true, data: newSermon });
});

app.put('/api/sermons/:id', (req, res) => {
  const index = db.sermons.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: "Prédication introuvable" });

  const validation = validateSermonInput(req.body, true);
  if (validation.error) return rejectBadRequest(res, validation.error);

  db.sermons[index] = { ...db.sermons[index], ...validation.data };
  saveDb();
  res.json({ success: true, data: db.sermons[index] });
});

app.delete('/api/sermons/:id', (req, res) => {
  db.sermons = db.sermons.filter(s => s.id !== req.params.id);
  saveDb();
  res.json({ success: true, message: "Prédication supprimée" });
});

// 3. Events / Agenda
app.get('/api/events', (req, res) => {
  res.json({ success: true, data: db.events });
});

app.post('/api/events', (req, res) => {
  const validation = validateEventInput(req.body);
  if (validation.error) return rejectBadRequest(res, validation.error);

  const newEvent = {
    id: `event-${Date.now()}`,
    ...validation.data
  };
  db.events.unshift(newEvent);
  saveDb();
  res.status(201).json({ success: true, data: newEvent });
});

app.put('/api/events/:id', (req, res) => {
  const index = db.events.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ success: false, message: "Événement introuvable" });

  const validation = validateEventInput(req.body, true);
  if (validation.error) return rejectBadRequest(res, validation.error);

  db.events[index] = { ...db.events[index], ...validation.data };
  saveDb();
  res.json({ success: true, data: db.events[index] });
});

app.delete('/api/events/:id', (req, res) => {
  db.events = db.events.filter(e => e.id !== req.params.id);
  saveDb();
  res.json({ success: true, message: "Événement supprimé" });
});

// 4. Ministries
app.get('/api/ministries', (req, res) => {
  res.json({ success: true, data: db.ministries });
});

// 5. Team
app.get('/api/team', (req, res) => {
  res.json({ success: true, data: db.team });
});

// 6. Testimonials
app.get('/api/testimonials', (req, res) => {
  res.json({ success: true, data: db.testimonials });
});

app.post('/api/testimonials', (req, res) => {
  const newTestimonial = {
    id: `test-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  db.testimonials.push(newTestimonial);
  saveDb();
  res.status(201).json({ success: true, data: newTestimonial });
});

// 7. Prayers / Mur de prière
app.get('/api/prayers', (req, res) => {
  // Return approved and public prayers for visitors
  const publicPrayers = db.prayers.filter(p => p.isPublic !== false);
  res.json({ success: true, data: publicPrayers });
});

app.get('/api/admin/prayers', (req, res) => {
  // Return all prayers including confidential pastoral ones
  res.json({ success: true, data: db.prayers });
});

app.post('/api/prayers', (req, res) => {
  const validation = validatePrayerInput(req.body);
  if (validation.error) return rejectBadRequest(res, validation.error);

  const newPrayer = {
    id: `pray-${Date.now()}`,
    ...validation.data,
    prayerCount: 1,
    createdAt: new Date().toISOString(),
    status: "approved"
  };
  db.prayers.unshift(newPrayer);
  saveDb();
  res.status(201).json({ success: true, data: newPrayer });
});

app.post('/api/prayers/:id/pray', (req, res) => {
  const prayer = db.prayers.find(p => p.id === req.params.id);
  if (!prayer) return res.status(404).json({ success: false, message: "Requête non trouvée" });
  prayer.prayerCount = (prayer.prayerCount || 0) + 1;
  saveDb();
  res.json({ success: true, prayerCount: prayer.prayerCount });
});

// 8. Visit Planner
app.post('/api/visits', (req, res) => {
  const validation = validateVisitInput(req.body);
  if (validation.error) return rejectBadRequest(res, validation.error);

  const newVisit = {
    id: `visit-${Date.now()}`,
    ...validation.data,
    createdAt: new Date().toISOString(),
    status: "confirmed"
  };
  if (!db.visits) db.visits = [];
  db.visits.unshift(newVisit);
  saveDb();
  res.status(201).json({ 
    success: true, 
    data: newVisit,
    message: "Votre visite a été enregistrée avec succès ! Notre équipe d'accueil vous attend chaleureusement."
  });
});

app.get('/api/admin/visits', (req, res) => {
  res.json({ success: true, data: db.visits || [] });
});

// 9. Donations
app.get('/api/donations', (req, res) => {
  const totalRaised = (db.donations || []).reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  res.json({ 
    success: true, 
    data: db.donations || [],
    stats: {
      totalRaised,
      donationCount: (db.donations || []).length,
      goal: 25000
    }
  });
});

app.post('/api/donations', (req, res) => {
  const validation = validateDonationInput(req.body);
  if (validation.error) return rejectBadRequest(res, validation.error);

  const newDonation = {
    id: `don-${Date.now()}`,
    ...validation.data,
    createdAt: new Date().toISOString()
  };
  if (!db.donations) db.donations = [];
  db.donations.unshift(newDonation);
  saveDb();
  res.status(201).json({ 
    success: true, 
    data: newDonation,
    message: "Merci infiniment pour votre générosité et votre soutien à l'œuvre de Dieu !"
  });
});

// 10. Contact
app.post('/api/contact', (req, res) => {
  const validation = validateContactInput(req.body);
  if (validation.error) return rejectBadRequest(res, validation.error);

  const newContact = {
    id: `contact-${Date.now()}`,
    ...validation.data,
    createdAt: new Date().toISOString(),
    status: "new"
  };
  if (!db.contacts) db.contacts = [];
  db.contacts.unshift(newContact);
  saveDb();
  res.status(201).json({ 
    success: true, 
    message: "Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais !" 
  });
});

app.get('/api/admin/contacts', (req, res) => {
  res.json({ success: true, data: db.contacts || [] });
});

// Stats summary for admin dashboard
app.get('/api/admin/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      sermonsCount: db.sermons.length,
      eventsCount: db.events.length,
      prayersCount: db.prayers.length,
      visitsCount: (db.visits || []).length,
      contactsCount: (db.contacts || []).length,
      totalDonations: (db.donations || []).reduce((acc, d) => acc + (Number(d.amount) || 0), 0)
    }
  });
});

// ======================== VITE MIDDLEWARE ========================
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Béthanie Church Server running on http://localhost:${PORT}`);
  });
}

startServer();
