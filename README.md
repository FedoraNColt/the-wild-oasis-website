# The Wild Oasis Website

Next.js 16 app for browsing cabins, reserving stays, and managing guest profiles. Bookings are stored in Supabase and authenticated with Google via NextAuth.

## Features
- Browse cabins and reserve date ranges with UTC-normalized bookings.
- Account area to view, edit, and delete reservations (optimistic updates).
- Guest profile editing with nationality selection and Google sign-in.
- Thank-you flow after booking with links back to your reservations.

## Prerequisites
- Node.js 18+
- Supabase project (URL and service role key)
- Google OAuth app for NextAuth

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` with required values:
   ```bash
   SUPABASE_URL=<your-supabase-url>
   SUPABASE_KEY=<your-supabase-service-role-key>
   AUTH_SECRET=<random-string>
   AUTH_GOOGLE_ID=<google-client-id>
   AUTH_GOOGLE_SECRET=<google-client-secret>
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000`.

## Scripts
- `npm run dev` – start Next.js in development.
- `npm run build` – create production build.
- `npm run start` – serve the production build.
- `npm run prod` – build then start (one command).
- `npm run lint` – run ESLint.
