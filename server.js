/**
 * Casa dos Duques — API Server
 * =============================
 * Express server that serves the static Astro build + POST /api/contact.
 * Saves leads to data/leads.json and sends email via scripts/mailer.js.
 *
 * Environment variables (see .env.example):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM, EMAIL_TO, PORT
 */

import 'dotenv/config';
import express from 'express';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sendEmail } from './scripts/mailer.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = parseInt(process.env.PORT || '3000', 10);
const DIST_DIR = join(__dirname, 'dist');
const DATA_DIR = join(__dirname, 'data');
const LEADS_FILE = join(DATA_DIR, 'leads.json');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================
// API: Contact form submission
// ================================================================
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, checkin, checkout, guests, message, language } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required.',
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address.',
      });
    }

    // Honeypot check
    if (req.body._website) {
      return res.json({ success: true });
    }

    const lead = {
      name: name.trim(),
      email: email.trim(),
      phone: (phone || '').trim(),
      checkin: (checkin || '').trim(),
      checkout: (checkout || '').trim(),
      guests: (guests || '').trim(),
      message: message.trim(),
      language: (language || '').trim(),
      submittedAt: new Date().toISOString(),
      ip: req.ip || req.socket.remoteAddress || '',
    };

    // Always save locally
    saveLead(lead);
    console.log(`[api] Lead saved: ${lead.name} <${lead.email}>`);

    // Try to send email (gracefully skips if SMTP not configured)
    const emailSent = await sendEmail(lead);

    res.json({ success: true, emailSent });
  } catch (err) {
    console.error('[api] Contact form error:', err);
    res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again or email us directly.',
    });
  }
});

// ================================================================
// Static files
// ================================================================
app.use(express.static(DIST_DIR, {
  maxAge: '1h',
  setHeaders(res, filePath) {
    if (filePath.includes('/_astro/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    if (filePath.includes('/images/')) {
      res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
    }
  },
}));

// Catch-all: serve Astro static routes (falls through after static middleware)
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not found' });
  }

  const requestPath = req.path.endsWith('/') ? req.path : `${req.path}/`;
  const htmlPath = join(DIST_DIR, requestPath, 'index.html');

  if (existsSync(htmlPath)) {
    return res.sendFile(htmlPath);
  }

  const altPath = join(DIST_DIR, `${req.path}.html`);
  if (existsSync(altPath)) {
    return res.sendFile(altPath);
  }

  res.status(404).send('Not found');
});

// ================================================================
// Helpers
// ================================================================
function saveLead(lead) {
  try {
    if (!existsSync(DATA_DIR)) {
      mkdirSync(DATA_DIR, { recursive: true });
    }

    let leads = [];
    if (existsSync(LEADS_FILE)) {
      try {
        leads = JSON.parse(readFileSync(LEADS_FILE, 'utf-8'));
      } catch {
        // Corrupt file — start fresh
      }
    }

    leads.push(lead);
    writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('[api] Failed to save lead:', err);
  }
}

// ================================================================
// Start
// ================================================================
app.listen(PORT, () => {
  console.log(`[server] Casa dos Duques API + static on http://0.0.0.0:${PORT}`);
  console.log(`[server] Static: ${DIST_DIR}`);
  console.log(`[server] Leads: ${LEADS_FILE}`);
  console.log(`[server] SMTP ${process.env.SMTP_USER ? '✓ configured' : '✗ not configured (email skipped)'}`);
});
