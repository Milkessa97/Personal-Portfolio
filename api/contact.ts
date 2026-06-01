import type { IncomingMessage, ServerResponse } from "http";

/**
 * Vercel Serverless Function — Contact Form Webhook Proxy
 *
 * Routes contact form submissions through the server to keep
 * the Google Apps Script webhook URL private. The URL is read
 * from the `GOOGLE_SHEET_FORM_WEBHOOK` env var (without the
 * VITE_ prefix so Vite never exposes it to the client bundle).
 *
 * Deployment:
 *   Vercel auto-detects this file at `api/contact.ts` and
 *   deploys it as a serverless function at `/api/contact`.
 *   No extra configuration required.
 */

interface VercelRequest extends IncomingMessage {
  body?: any;
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "METHOD_NOT_ALLOWED" });
  }

  // Read the private webhook URL from server-side environment
  const webhookUrl = process.env.GOOGLE_SHEET_FORM_WEBHOOK;

  if (!webhookUrl) {
    console.error("GOOGLE_SHEET_FORM_WEBHOOK is not configured.");
    return res.status(500).json({
      error: "WEBHOOK_NOT_CONFIGURED",
      message: "The server-side webhook destination is not set.",
    });
  }

  try {
    const payload = req.body;

    if (!payload || !payload.name || !payload.email || !payload.message) {
      return res.status(400).json({
        error: "INVALID_PAYLOAD",
        message: "Missing required fields: name, email, message.",
      });
    }

    // Forward the payload to the private Google Apps Script webhook.
    // Server-side fetch has no CORS restrictions, so this works
    // without no-cors hacks or opaque responses.
    const webhookResponse = await fetch(webhookUrl.trim(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    // Google Apps Script may return various status codes after
    // redirect chains. We consider any non-server-error as success.
    const success = webhookResponse.status < 500;

    return res.status(success ? 200 : 502).json({
      success,
      status: webhookResponse.status,
      message: success
        ? "TRANSMISSION_COMPLETE"
        : "WEBHOOK_UPSTREAM_ERROR",
    });
  } catch (err: any) {
    console.error("Webhook proxy error:", err);
    return res.status(502).json({
      error: "PROXY_FORWARDING_FAILED",
      message: err.message || "Unknown error during webhook relay.",
    });
  }
}
