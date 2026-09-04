import path from "path";
import express from "express";
import { createApp } from "./server/app.js";

const PORT = process.env.PORT || 3000;

const app = createApp();

app.use(express.static(path.join(process.cwd(), "public")));

// ======================== VITE MIDDLEWARE ========================
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Béthanie Church Server running on http://localhost:${PORT}`);
  });
}

startServer();
