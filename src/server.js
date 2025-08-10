import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '../generated/prisma/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// Health
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Subscribe (creates pending subscriber and fake token)
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Invalid email' });
    }
    const token = Math.random().toString(36).slice(2);
    const subscriber = await prisma.subscriber.upsert({
      where: { email },
      update: { token, status: 'PENDING' },
      create: { email, token, status: 'PENDING' },
    });
    // TODO: send confirmation email with /api/confirm?token=...
    return res.json({ ok: true, id: subscriber.id });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Confirm email
app.get('/api/confirm', async (req, res) => {
  try {
    const token = req.query.token;
    if (!token || typeof token !== 'string') {
      return res.status(400).json({ error: 'Missing token' });
    }
    const sub = await prisma.subscriber.findFirst({ where: { token } });
    if (!sub) return res.status(404).json({ error: 'Not found' });
    await prisma.subscriber.update({
      where: { id: sub.id },
      data: { status: 'CONFIRMED', confirmedAt: new Date(), token: null },
    });
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const utmSource = req.get('X-UTM-Source') || null;
    const utmMedium = req.get('X-UTM-Medium') || null;
    const utmCampaign = req.get('X-UTM-Campaign') || null;
    const referer = req.get('Referer') || null;
    const userAgent = req.get('User-Agent') || null;
    const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || null;

    await prisma.contactMessage.create({
      data: { name, email, company: company || null, message, utmSource, utmMedium, utmCampaign, referer, userAgent, ip },
    });
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Events
app.post('/api/events', async (req, res) => {
  try {
    const { session_id: sessionId, event_name: eventName, path: pathName } = req.body || {};
    if (!sessionId || !eventName) return res.status(400).json({ error: 'Missing fields' });
    const userAgent = req.get('User-Agent') || null;
    const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || null;
    await prisma.eventLog.create({ data: { sessionId, eventName, path: pathName || null, userAgent, ip } });
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Static frontend
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));
// Catch-all route for SPA - must be last
app.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${PORT}`);
});


