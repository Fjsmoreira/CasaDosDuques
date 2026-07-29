const nodemailer = require('nodemailer');

const EMAIL_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const EMAIL_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const EMAIL_USER = process.env.SMTP_USER || '';
const EMAIL_PASS = process.env.SMTP_PASS || '';
const EMAIL_FROM = process.env.EMAIL_FROM || 'fernando@casadosduques.pt';
const EMAIL_TO = process.env.EMAIL_TO || 'fernando@casadosduques.pt';

let transporter = null;

function getTransporter() {
  if (!transporter && EMAIL_USER && EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: false,
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });
  }
  return transporter;
}

function buildOwnerHtml(lead) {
  const row = (label, value) =>
    value
      ? `<tr><td style="padding:4px 12px 4px 0;font-weight:600;white-space:nowrap;vertical-align:top;color:#4a3728">${label}</td><td style="padding:4px 0;color:#5c4a3a">${value}</td></tr>`
      : '';

  return `
<h2>New Inquiry — Casa dos Duques</h2>
<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;max-width:560px">
  ${row('Name', lead.name)}
  ${row('Email', lead.email)}
  ${row('Phone', lead.phone)}
  ${row('Check-in', lead.checkin)}
  ${row('Check-out', lead.checkout)}
  ${row('Guests', lead.guests)}
  ${row('Language', lead.language)}
</table>
<hr style="border:none;border-top:1px solid #e2d9cc;margin:16px 0;max-width:560px">
<p style="font-family:sans-serif;color:#5c4a3a;max-width:560px;white-space:pre-wrap">${lead.message}</p>
<hr style="border:none;border-top:1px solid #e2d9cc;margin:16px 0;max-width:560px">
<p style="color:#a49684;font-size:12px;font-family:sans-serif">Submitted ${lead.submittedAt || new Date().toISOString()} via casadosduques.pt</p>`;
}

function buildReplyHtml(lead) {
  return `
<h2>We received your message</h2>
<p style="font-family:sans-serif;color:#5c4a3a;max-width:560px">Olá / Hi <strong>${lead.name}</strong>,</p>
<p style="font-family:sans-serif;color:#5c4a3a;max-width:560px">Thank you for contacting <strong>Casa dos Duques</strong>! We've received your message and will get back to you shortly — usually within a few hours.</p>
<p style="font-family:sans-serif;color:#5c4a3a;max-width:560px">For urgent matters, you can reach us on WhatsApp at <strong>+31 631 683 221</strong>.</p>
<hr style="border:none;border-top:1px solid #e2d9cc;margin:16px 0;max-width:560px">
<p style="font-family:sans-serif;color:#5c4a3a;max-width:560px">Warm regards,<br><strong>Fernando & Isabelle</strong><br>Casa dos Duques — Abiul, Pombal, Central Portugal</p>
<p style="color:#a49684;font-size:12px;font-family:sans-serif"><a href="https://casadosduques.pt" style="color:#c2673a">casadosduques.pt</a></p>`;
}

async function sendEmail(lead) {
  const t = getTransporter();
  if (!t) {
    console.log('Email not configured — Lead saved locally.');
    return { sent: false, reason: 'SMTP not configured' };
  }

  try {
    // Owner notification
    await t.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: lead.email,
      subject: `[Casa dos Duques] Inquiry from ${lead.name}`,
      html: buildOwnerHtml(lead),
    });

    // Auto-reply to guest
    await t.sendMail({
      from: EMAIL_FROM,
      to: lead.email,
      subject: 'We received your message — Casa dos Duques',
      html: buildReplyHtml(lead),
    });

    console.log(`Email sent for lead: ${lead.id}`);
    return { sent: true };
  } catch (err) {
    console.error('Email send error:', err.message);
    return { sent: false, reason: err.message };
  }
}

module.exports = { sendEmail };
