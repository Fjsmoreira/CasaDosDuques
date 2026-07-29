/**
 * Nodemailer mailer for the Casa dos Duques contact form.
 *
 * Sends HTML email via SMTP (default: Gmail). If SMTP_USER / SMTP_PASS
 * are missing, email is skipped and the lead is still saved locally.
 */

import nodemailer from 'nodemailer';

const {
  SMTP_HOST = 'smtp.gmail.com',
  SMTP_PORT = '587',
  SMTP_USER = '',
  SMTP_PASS = '',
  EMAIL_FROM = '',
  EMAIL_TO = 'fernando@casadosduques.pt',
} = process.env;

const port = parseInt(SMTP_PORT, 10);
const configured = !!(SMTP_USER && SMTP_PASS);

let transporter = null;

if (configured) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

function buildHtml(lead) {
  const row = (label, value) =>
    value
      ? `<tr><td style="padding:4px 12px 4px 0;font-weight:600;white-space:nowrap;vertical-align:top;color:#4a3728">${label}</td><td style="padding:4px 0;color:#5c4a3a">${value}</td></tr>`
      : '';

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8f5f0;padding:24px">
<table style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e2d9cc">
  <tr><td style="background:#c2673a;padding:20px 24px;color:#fff;font-size:18px;font-weight:700">📬 New Inquiry — Casa dos Duques</td></tr>
  <tr><td style="padding:24px">
    <table style="width:100%;border-collapse:collapse">
      ${row('Name', lead.name)}
      ${row('Email', lead.email)}
      ${row('Phone', lead.phone)}
      ${row('Check-in', lead.checkin)}
      ${row('Check-out', lead.checkout)}
      ${row('Guests', lead.guests)}
      ${row('Language', lead.language)}
    </table>
    <hr style="border:none;border-top:1px solid #e2d9cc;margin:16px 0">
    <p style="color:#5c4a3a;line-height:1.6;white-space:pre-wrap">${lead.message}</p>
    <hr style="border:none;border-top:1px solid #e2d9cc;margin:16px 0">
    <p style="color:#a49684;font-size:12px;margin:0">Submitted ${lead.submittedAt} via casadosduques.pt</p>
  </td></tr>
</table>
</body>
</html>`.trim();
}

function buildReplyHtml(lead) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8f5f0;padding:24px">
<table style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e2d9cc">
  <tr><td style="background:#c2673a;padding:20px 24px;color:#fff;font-size:18px;font-weight:700">We received your message</td></tr>
  <tr><td style="padding:24px">
    <p style="color:#5c4a3a;line-height:1.6">Olá / Hi <strong>${lead.name}</strong>,</p>
    <p style="color:#5c4a3a;line-height:1.6">Thank you for contacting <strong>Casa dos Duques</strong>! We've received your message and will get back to you shortly — usually within a few hours.</p>
    <p style="color:#5c4a3a;line-height:1.6">For urgent matters, you can reach us on WhatsApp at <strong>+31 631 683 221</strong>.</p>
    <hr style="border:none;border-top:1px solid #e2d9cc;margin:16px 0">
    <p style="color:#5c4a3a;line-height:1.6">Warm regards,<br><strong>Fernando & Isabelle</strong><br>Casa dos Duques — Abiul, Pombal, Central Portugal</p>
    <p style="color:#a49684;font-size:12px"><a href="https://casadosduques.pt" style="color:#c2673a">casadosduques.pt</a></p>
  </td></tr>
</table>
</body>
</html>`.trim();
}

/**
 * Sends owner notification + auto-reply. Returns whether email was sent.
 * If SMTP is not configured, returns false (lead still saved locally).
 */
export async function sendEmail(lead) {
  if (!transporter || !configured) {
    console.log('[mailer] SMTP not configured — skipping email. Lead saved locally.');
    return false;
  }

  const from = EMAIL_FROM || SMTP_USER;

  try {
    await transporter.sendMail({
      from,
      to: EMAIL_TO,
      replyTo: lead.email,
      subject: `[Casa dos Duques] Inquiry from ${lead.name}`,
      html: buildHtml(lead),
    });

    await transporter.sendMail({
      from,
      to: lead.email,
      subject: 'We received your message — Casa dos Duques',
      html: buildReplyHtml(lead),
    });

    console.log(`[mailer] Emails sent — notification + auto-reply to ${lead.email}`);
    return true;
  } catch (err) {
    console.error('[mailer] Failed to send email:', err);
    return false;
  }
}
