const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { sendEmail } = require('./scripts/mailer');

const app = express();
const PORT = 3001;
const LEADS_FILE = '/data/leads.json';
const API_TOKEN = process.env.API_TOKEN || crypto.randomBytes(32).toString('hex');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ensure data directory and file exist
if (!fs.existsSync(path.dirname(LEADS_FILE))) {
  fs.mkdirSync(path.dirname(LEADS_FILE), { recursive: true });
}
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, '[]');
}

// Auth middleware for admin endpoints
function authMiddleware(req, res, next) {
  const token = req.headers['x-api-token'];
  if (token !== API_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// POST /api/contact — form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, checkin, checkout, guests, message, language } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  // Honeypot
  if (req.body._website) {
    return res.json({ success: true });
  }

  const lead = {
    id: Date.now().toString(36) + crypto.randomBytes(3).toString('hex'),
    name: name.trim(),
    email: email.trim(),
    phone: (phone || '').trim(),
    checkin: (checkin || '').trim(),
    checkout: (checkout || '').trim(),
    guests: (guests || '').trim(),
    message: message.trim(),
    language: (language || '').trim(),
    submittedAt: new Date().toISOString(),
  };

  // Save lead
  try {
    const leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
    leads.push(lead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
    console.log(`Lead saved: ${lead.id} — ${lead.name} <${lead.email}>`);
  } catch (err) {
    console.error('Error saving lead:', err);
  }

  // Send email
  const result = await sendEmail(lead);
  if (result.sent) {
    console.log('Email sent for lead:', lead.id);
  } else {
    console.log('Email not sent:', result.reason || 'not configured');
  }

  res.json({ success: true, message: 'Message received. We will contact you soon.' });
});

// GET /api/admin/leads — protected lead list
app.get('/api/admin/leads', authMiddleware, (req, res) => {
  try {
    const leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
    res.json(leads.reverse().slice(0, 100));
  } catch {
    res.json([]);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API running on port ${PORT}`);
  console.log(`SMTP ${process.env.SMTP_USER ? 'configured' : 'not configured'}`);
});
