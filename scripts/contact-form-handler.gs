/**
 * Casa dos Duques — Contact Form Handler
 * =======================================
 * Google Apps Script that receives form submissions from casadosduques.pt
 * and forwards them as emails via Gmail.
 *
 * SETUP (one-time, ~5 min):
 * 1. Go to https://script.google.com
 * 2. Click "New Project"
 * 3. Paste this entire file
 * 4. Click "Deploy" → "New deployment"
 * 5. Type: "Web app"
 * 6. Execute as: "Me (your@email.com)"
 * 7. Who has access: "Anyone"
 * 8. Click "Deploy" → Copy the web app URL
 * 9. Paste that URL as FORM_ENDPOINT in src/components/ContactForm.astro
 *
 * Limits: 100 emails/day (consumer Gmail) or 1500/day (Google Workspace).
 * For casadosduques.pt volume this is more than enough.
 */

const OWNER_EMAIL = 'fernando@casadosduques.pt';
const SEND_AUTO_REPLY = true;
const SITE_URL = 'https://casadosduques.pt';

function doPost(e: GoogleAppsScript.Events.DoPost) {
  try {
    const params = e.parameter;
    const name = (params.name || '').trim();
    const email = (params.email || '').trim();
    const message = (params.message || '').trim();

    if (!name || !email || !message) {
      return redirect('/contact/?error=missing-fields');
    }
    if (!isValidEmail(email)) {
      return redirect('/contact/?error=invalid-email');
    }

    // Honeypot: silent reject for bots
    const website = (params._website || '').trim();
    if (website) {
      return redirect('/contact/?sent=1');
    }

    const phone = (params.phone || '').trim();
    const checkin = (params.checkin || '').trim();
    const checkout = (params.checkout || '').trim();
    const guests = (params.guests || '').trim();

    const subject = `[Casa dos Duques] Inquiry from ${name}`;
    const body = [
      `📬 New Contact Form Submission`,
      ``,
      `👤 Name:    ${name}`,
      `📧 Email:   ${email}`,
      phone ? `📞 Phone:   ${phone}` : '',
      ``,
      checkin ? `📅 Check-in:  ${formatDate(checkin)}` : '',
      checkout ? `📅 Check-out: ${formatDate(checkout)}` : '',
      guests ? `👥 Guests:    ${guests}` : '',
      (checkin || checkout || guests) ? `` : '',
      `💬 Message:`,
      `   ${message}`,
      ``,
      `---`,
      `Sent via casadosduques.pt contact form`,
    ].filter(l => l !== '').join('\n');

    GmailApp.sendEmail(OWNER_EMAIL, subject, body, {
      replyTo: email,
      name: 'Casa dos Duques Contact Form',
    });

    if (SEND_AUTO_REPLY && email) {
      GmailApp.sendEmail(email,
        'We received your message — Casa dos Duques',
        [
          `Olá / Hi ${name},`,
          ``,
          `Thank you for contacting Casa dos Duques! We've received your`,
          `message and will get back to you shortly — usually within a few hours.`,
          ``,
          `For urgent matters, reach us on WhatsApp at +31 631 683 221.`,
          ``,
          `Warm regards,`,
          `Fernando & Isabelle`,
          `Casa dos Duques — Abiul, Pombal, Central Portugal`,
          `https://casadosduques.pt`,
        ].join('\n'),
        { name: 'Casa dos Duques' }
      );
    }

    return redirect('/contact/?sent=1');
  } catch (err) {
    console.error('Contact form error:', err);
    return redirect('/contact/?error=server');
  }
}

function redirect(path: string) {
  return HtmlService.createHtmlOutput(
    `<html><head><meta http-equiv="refresh" content="0;url=${SITE_URL}${path}" /></head><body>Redirecting...</body></html>`
  );
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatDate(dateStr: string): string {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}
