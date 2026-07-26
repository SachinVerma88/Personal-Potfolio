import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';

const requiredEnvironment = [
  'CONTACT_RECIPIENT_EMAIL',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
];

const missingEnvironment = requiredEnvironment.filter((name) => !process.env[name]);
if (missingEnvironment.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvironment.join(', ')}`);
}

const app = express();
const port = Number(process.env.PORT || 3001);
const allowedOrigins = (process.env.ALLOWED_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.set('trust proxy', 1);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '20kb' }));
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many inquiries from this address. Please try again later.' },
}));

function cleanText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

app.get('/health', async (_request, response) => {
  try {
    await transporter.verify();
    response.status(200).json({ status: 'ok' });
  } catch {
    response.status(503).json({ status: 'email service unavailable' });
  }
});

app.post('/api/inquiries', async (request, response) => {
  const name = cleanText(request.body.name, 100);
  const email = cleanText(request.body.email, 254).toLowerCase();
  const engagementType = cleanText(request.body.engagementType, 100);
  const message = cleanText(request.body.message, 5000);

  if (!name || !email || !engagementType || !message) {
    return response.status(400).json({ message: 'Please complete every field before submitting.' });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return response.status(400).json({ message: 'Please enter a valid email address.' });
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New portfolio inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Engagement interest: ${engagementType}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    });

    return response.status(201).json({ message: 'Inquiry sent successfully.' });
  } catch (error) {
    console.error('Unable to send inquiry email:', error);
    return response.status(502).json({ message: 'Unable to send your inquiry right now. Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Contact service listening on port ${port}`);
});
