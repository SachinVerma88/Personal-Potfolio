# Portfolio contact service

This Express service receives portfolio inquiries and sends them to your inbox through SMTP. It is intentionally standalone so it can be deployed for free on Render, Railway, or a similar Node.js host.

## Local setup

1. Copy `.env.example` to `.env` and fill in the SMTP and recipient values. For Gmail, create an App Password and use it for `SMTP_PASS`.
2. Install and run:

   ```bash
   cd server
   npm install
   npm run dev
   ```

3. Add this to the root `.env.local` while developing the Next.js site:

   ```bash
   NEXT_PUBLIC_CONTACT_API_URL=http://localhost:3001
   ```

## Deployment

Deploy the `server` directory as a Node service. Set its build command to `npm install` and start command to `npm start`. Configure every variable in `.env.example`; set `ALLOWED_ORIGIN` to the deployed portfolio URL and `NEXT_PUBLIC_CONTACT_API_URL` in the frontend host to the deployed service URL.

The API exposes `POST /api/inquiries` and `GET /health`.
