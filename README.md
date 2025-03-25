# Arbandata Next.js API with TypeScript and Mongoose

This project implements the Arbandata API using Next.js with App Router, TypeScript, and Mongoose for MongoDB integration.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables in `.env.local`

3. Seed the database:
   ```bash
   npm run seed
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

- GET `/api/offers/:msisdn` - Get available offers
- POST `/api/purchase` - Purchase an offer using airtime or M-Pesa
- GET `/api/status/:requestId/:accountId` - Check purchase status

For complete documentation, see the `docs/api-documentation.md` file.
