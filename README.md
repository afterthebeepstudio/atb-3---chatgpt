# After the Beep Studio — deployable starter

## What is included
- Responsive multi-page website
- Supplied After the Beep Studio logos
- Home, Services, Brand Activations, Weddings, Celebrations, How It Works, Add-ons, About, Booking, Contact, Privacy, Terms
- Booking flow UI with service + add-on selection
- Cloudflare Pages Functions endpoints for availability and Square checkout
- Square Checkout API integration skeleton
- Environment-variable based secrets (never put Square access tokens in browser code)

## Important before launch
1. Replace starter prices/add-ons with your final prices.
2. Configure Square Appointments/Bookings if you want live calendar availability.
3. Configure Square environment variables in Cloudflare:
   - SQUARE_ACCESS_TOKEN
   - SQUARE_LOCATION_ID
   - PUBLIC_SITE_URL=https://YOURDOMAIN
4. The availability function is intentionally a safe placeholder until Square Bookings is configured.
5. Connect the contact endpoint to an email provider (Resend, Postmark, etc.) or your own backend.
6. Add final cancellation, recording-consent, damage, delivery and privacy terms with legal review.
7. Test Square in sandbox before production.

## Deploy
Cloudflare Pages supports static HTML + Pages Functions. Connect this folder/repository to Cloudflare Pages. Then add the custom domain in Workers & Pages > your project > Custom domains.

## Square architecture
The browser calls /api/checkout. The Cloudflare Pages Function calls Square's Checkout API using the secret access token. The browser never sees the token.

The booking page can later call /api/availability, which should query Square Bookings API for the selected service/date. Do not expose Square credentials in frontend JavaScript.
