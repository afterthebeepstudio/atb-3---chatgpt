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


## Easy customization

The site is intentionally plain HTML/CSS so each page can have its own wording and layout.

- `index.html` — homepage copy, hero, cards and main CTA
- `services.html` — services/packages
- `brand-activations.html` — brand activation content
- `weddings.html` — wedding content
- `celebrations.html` — celebration content
- `how-it-works.html` — process/steps
- `add-ons.html` — add-ons and pricing
- `about.html` — story/about copy
- `booking.html` — booking form and options
- `contact.html` — contact form
- `styles.css` — global visual system: colors, type, spacing, buttons, cards and responsive behavior
- `assets/logo-red.png` / `assets/logo-white.png` — transparent logo assets

For page-specific changes, edit the text directly in that page's HTML. For a site-wide visual change, edit `:root` and the shared classes in `styles.css`.

The logo assets were cleaned to transparent backgrounds so the logo no longer appears as a solid square in the header/footer.


Logo fix: the header uses `assets/logo-header.png` (red logo) and the footer uses `assets/logo-footer.png` (light logo). The files are cropped to remove the large transparent padding that made the logo appear missing.
