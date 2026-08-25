export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const eventType = String(body.event_type || '').trim();
  const message = String(body.message || '').trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please complete your name, email and message.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error('Missing RESEND_API_KEY, CONTACT_TO_EMAIL, or CONTACT_FROM_EMAIL');
    return res.status(500).json({ error: 'Email service is not configured yet.' });
  }

  const safe = (value) => value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const html = `
    <h2>New After the Beep inquiry</h2>
    <p><strong>Name:</strong> ${safe(name)}</p>
    <p><strong>Email:</strong> ${safe(email)}</p>
    <p><strong>Event type:</strong> ${safe(eventType || 'Not provided')}</p>
    <p><strong>Message:</strong></p>
    <p>${safe(message).replace(/\n/g, '<br>')}</p>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `New inquiry from ${name}`,
        html
      })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Resend error:', result);
      return res.status(502).json({ error: 'We could not send your message. Please try again.' });
    }

    return res.redirect(303, '/contact.html?sent=1');
  } catch (error) {
    console.error('Contact email error:', error);
    return res.status(500).json({ error: 'We could not send your message. Please try again.' });
  }
}
