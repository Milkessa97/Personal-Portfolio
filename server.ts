/**
 * Local Development API Server
 *
 * This Express server runs only during local development (port 3001)
 * and mirrors the Vercel serverless function at `/api/contact`.
 * Vite's dev server proxies `/api/*` requests here.
 *
 * In production on Vercel, this file is NOT used — Vercel deploys
 * `api/contact.ts` as a native serverless function instead.
 *
 * Usage:  npm run dev:api   (runs alongside `npm run dev`)
 */

import dotenv from "dotenv";
import express from "express";
import contactHandler from "./api/contact";

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3001;

// Parse JSON bodies before they reach the handler
app.use(express.json());

// Mount the same handler used by the Vercel serverless function
app.post("/api/contact", (req, res) => {
  return contactHandler(req as any, res as any);
});

// Health-check route for diagnostics
app.get("/api/health", (_req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`[DEV_API_SERVER] Running on http://localhost:${PORT}`);
  console.log(`[DEV_API_SERVER] POST /api/contact → webhook proxy`);
  console.log(
    `[DEV_API_SERVER] Webhook configured: ${process.env.GOOGLE_SHEET_FORM_WEBHOOK ? "YES" : "NO (missing GOOGLE_SHEET_FORM_WEBHOOK)"}`
  );
});
