# Paradise Enterprise board shop

The store is served at `/ecommerce/`. Customers build a quote cart, verify their email with a six digit OTP, then email a quote request to `paradise.enterprises.co.in@gmail.com`. The request email includes verified contact details, products, quantities, specifications, and notes. No payment is taken.

## SMTP setup

1. Open the project root `.env` starter file.
2. The `SMTP_USER` is already set to `paradise.enterprises.co.in@gmail.com`. Set `SMTP_APP_PASSWORD` to the Google 16 character app password. Remove spaces from the password. Keep `.env` private; it is ignored by Git.
3. Restart the dev or production server after changing `.env`.

Until SMTP is configured, the store can be browsed and the quote cart can be built, but verification and sending are unavailable. The UI explains this to customers.

## Commands

- `npm run dev` — Vite website with local `/api` endpoints.
- `npm run build` — build both the main website and shop.
- `npm start` — serve the built website and email API on `PORT` (default 3000). Use HTTPS in front of this server in production so the login cookie remains secure.

The quote API stores OTP challenges and verified sessions in memory. They expire automatically and are cleared if the server restarts. It rate limits OTP and quote submissions. Prices, dimensions, inventory, delivery terms and payment remain subject to confirmation by the Paradise team.
