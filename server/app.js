import express from "express";
import { loadDb, saveDb } from "./db.js";

// Simple per-process cache. Each serverless function invocation may get a
// fresh process (cold start), in which case loadDb() re-fetches from Mongo
// (if MONGODB_URI is set) or falls back to the bundled seed data.
let dbCache = null;

async function getDb() {
  if (!dbCache) {
    dbCache = await loadDb();
  }
  return dbCache;
}

async function persist() {
  await saveDb(dbCache);
}

export function createApiRouter() {
  const router = express.Router();

  // 1. Church Info
  router.get("/church-info", async (req, res) => {
    const db = await getDb();
    res.json({ success: true, data: db.churchInfo });
  });

  router.put("/church-info", async (req, res) => {
    const db = await getDb();
    db.churchInfo = { ...db.churchInfo, ...req.body };
    await persist();
    res.json({ success: true, data: db.churchInfo });
  });

  // 2. Sermons / Prédications
  router.get("/sermons", async (req, res) => {
    const db = await getDb();
    res.json({ success: true, data: db.sermons });
  });

  router.get("/sermons/:id", async (req, res) => {
    const db = await getDb();
    const sermon = db.sermons.find((s) => s.id === req.params.id);
    if (!sermon)
      return res
        .status(404)
        .json({ success: false, message: "Prédication non trouvée" });
    res.json({ success: true, data: sermon });
  });

  router.post("/sermons", async (req, res) => {
    const db = await getDb();
    const newSermon = {
      id: `sermon-${Date.now()}`,
      ...req.body,
      featured: req.body.featured || false,
    };
    db.sermons.unshift(newSermon);
    await persist();
    res.status(201).json({ success: true, data: newSermon });
  });

  router.put("/sermons/:id", async (req, res) => {
    const db = await getDb();
    const index = db.sermons.findIndex((s) => s.id === req.params.id);
    if (index === -1)
      return res
        .status(404)
        .json({ success: false, message: "Prédication introuvable" });
    db.sermons[index] = { ...db.sermons[index], ...req.body };
    await persist();
    res.json({ success: true, data: db.sermons[index] });
  });

  router.delete("/sermons/:id", async (req, res) => {
    const db = await getDb();
    db.sermons = db.sermons.filter((s) => s.id !== req.params.id);
    await persist();
    res.json({ success: true, message: "Prédication supprimée" });
  });

  // 3. Events / Agenda
  router.get("/events", async (req, res) => {
    const db = await getDb();
    res.json({ success: true, data: db.events });
  });

  router.post("/events", async (req, res) => {
    const db = await getDb();
    const newEvent = {
      id: `event-${Date.now()}`,
      ...req.body,
    };
    db.events.unshift(newEvent);
    await persist();
    res.status(201).json({ success: true, data: newEvent });
  });

  router.put("/events/:id", async (req, res) => {
    const db = await getDb();
    const index = db.events.findIndex((e) => e.id === req.params.id);
    if (index === -1)
      return res
        .status(404)
        .json({ success: false, message: "Événement introuvable" });
    db.events[index] = { ...db.events[index], ...req.body };
    await persist();
    res.json({ success: true, data: db.events[index] });
  });

  router.delete("/events/:id", async (req, res) => {
    const db = await getDb();
    db.events = db.events.filter((e) => e.id !== req.params.id);
    await persist();
    res.json({ success: true, message: "Événement supprimé" });
  });

  // 4. Ministries
  router.get("/ministries", async (req, res) => {
    const db = await getDb();
    res.json({ success: true, data: db.ministries });
  });

  // 5. Team
  router.get("/team", async (req, res) => {
    const db = await getDb();
    res.json({ success: true, data: db.team });
  });

  // 6. Testimonials
  router.get("/testimonials", async (req, res) => {
    const db = await getDb();
    res.json({ success: true, data: db.testimonials });
  });

  router.post("/testimonials", async (req, res) => {
    const db = await getDb();
    const newTestimonial = {
      id: `test-${Date.now()}`,
      ...req.body,
      createdAt: new Date().toISOString(),
    };
    db.testimonials.push(newTestimonial);
    await persist();
    res.status(201).json({ success: true, data: newTestimonial });
  });

  // 7. Prayers / Mur de prière
  router.get("/prayers", async (req, res) => {
    const db = await getDb();
    const publicPrayers = (db.prayers || []).filter(
      (p) => p.isPublic !== false,
    );
    res.json({ success: true, data: publicPrayers });
  });

  router.get("/admin/prayers", async (req, res) => {
    const db = await getDb();
    res.json({ success: true, data: db.prayers || [] });
  });

  router.post("/prayers", async (req, res) => {
    const db = await getDb();
    const newPrayer = {
      id: `pray-${Date.now()}`,
      authorName: req.body.isAnonymous
        ? "Anonyme"
        : req.body.authorName || "Anonyme",
      isAnonymous: !!req.body.isAnonymous,
      category: req.body.category || "Autre",
      requestText: req.body.requestText,
      prayerCount: 1,
      createdAt: new Date().toISOString(),
      isPublic: req.body.isPublic !== false,
      status: "approved",
    };
    if (!db.prayers) db.prayers = [];
    db.prayers.unshift(newPrayer);
    await persist();
    res.status(201).json({ success: true, data: newPrayer });
  });

  router.post("/prayers/:id/pray", async (req, res) => {
    const db = await getDb();
    const prayer = (db.prayers || []).find((p) => p.id === req.params.id);
    if (!prayer)
      return res
        .status(404)
        .json({ success: false, message: "Requête non trouvée" });
    prayer.prayerCount = (prayer.prayerCount || 0) + 1;
    await persist();
    res.json({ success: true, prayerCount: prayer.prayerCount });
  });

  // 8. Visit Planner
  router.post("/visits", async (req, res) => {
    const db = await getDb();
    const newVisit = {
      id: `visit-${Date.now()}`,
      ...req.body,
      createdAt: new Date().toISOString(),
      status: "confirmed",
    };
    if (!db.visits) db.visits = [];
    db.visits.unshift(newVisit);
    await persist();
    res.status(201).json({
      success: true,
      data: newVisit,
      message:
        "Votre visite a été enregistrée avec succès ! Notre équipe d'accueil vous attend chaleureusement.",
    });
  });

  router.get("/admin/visits", async (req, res) => {
    const db = await getDb();
    res.json({ success: true, data: db.visits || [] });
  });

  // 9. Donations
  router.get("/donations", async (req, res) => {
    const db = await getDb();
    const totalRaised = (db.donations || []).reduce(
      (sum, d) => sum + (Number(d.amount) || 0),
      0,
    );
    res.json({
      success: true,
      data: db.donations || [],
      stats: {
        totalRaised,
        donationCount: (db.donations || []).length,
        goal: 25000,
      },
    });
  });

  router.post("/donations", async (req, res) => {
    const db = await getDb();
    const newDonation = {
      id: `don-${Date.now()}`,
      donorName: req.body.isAnonymous
        ? "Donateur Anonyme"
        : req.body.donorName || "Donateur",
      email: req.body.email || "",
      amount: Number(req.body.amount) || 50,
      fund: req.body.fund || "Dîmes & Offrandes",
      paymentMethod: req.body.paymentMethod || "Carte de crédit",
      isAnonymous: !!req.body.isAnonymous,
      createdAt: new Date().toISOString(),
    };
    if (!db.donations) db.donations = [];
    db.donations.unshift(newDonation);
    await persist();
    res.status(201).json({
      success: true,
      data: newDonation,
      message:
        "Merci infiniment pour votre générosité et votre soutien à l'œuvre de Dieu !",
    });
  });

  // 10. Contact
  router.post("/contact", async (req, res) => {
    const db = await getDb();
    const newContact = {
      id: `contact-${Date.now()}`,
      ...req.body,
      createdAt: new Date().toISOString(),
      status: "new",
    };
    if (!db.contacts) db.contacts = [];
    db.contacts.unshift(newContact);
    await persist();
    res.status(201).json({
      success: true,
      message:
        "Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais !",
    });
  });

  router.get("/admin/contacts", async (req, res) => {
    const db = await getDb();
    res.json({ success: true, data: db.contacts || [] });
  });

  // Stats summary for admin dashboard
  router.get("/admin/stats", async (req, res) => {
    const db = await getDb();
    res.json({
      success: true,
      data: {
        sermonsCount: db.sermons.length,
        eventsCount: db.events.length,
        prayersCount: (db.prayers || []).length,
        visitsCount: (db.visits || []).length,
        contactsCount: (db.contacts || []).length,
        totalDonations: (db.donations || []).reduce(
          (acc, d) => acc + (Number(d.amount) || 0),
          0,
        ),
      },
    });
  });

  return router;
}

// Builds a standalone Express app exposing the API under /api.
// Used both by the local dev/production Node server and by the Netlify
// serverless function wrapper.
export function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/api", createApiRouter());
  return app;
}
