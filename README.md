# A Zoom — Premium Car Rentals

A university assignment demonstration built with **HTML5, CSS3, vanilla JavaScript**, Leaflet and QRCode.js. There is no backend. **No real rentals, payments, or secure authentication occur.**

## Run locally

1. Extract the ZIP.
2. Open the `azoom-final` folder in VS Code.
3. Start Live Server on `index.html` (or run `python -m http.server 8000` inside the folder).
4. Open the local address in your browser. Internet is needed for remote vehicle photography, map tiles, fonts and QR library.

## Separate pages

- `index.html` — cinematic homepage, search, About Us, Why Choose Us
- `cars.html` — searchable and filterable fleet
- `car.html?id=1` — vehicle detail
- `locations.html` — Leaflet map and showroom office locations
- `how.html` — six-step rental process
- `register.html` / `login.html` — demo user access
- `profile.html` — account editing
- `booking.html?car=1` — reservation and price calculation
- `payment.html?id=...` — three demo payment options
- `bookings.html` — customer rental lifecycle
- `employee.html` — employee inspection and final bill
- `car-fun.html` — QR surprise page with interactive car facts

## Demo credentials

**Customer:** register a new account, or sign in using email `demo@azoom.test` with **any 4+ character demo access code**. The code is not stored or verified; this is deliberately NOT real authentication.

**Employee:** `employee@azoom.demo` / `AZOOM2026`. These credentials are visible in the demo and are NOT secure authentication.

A seeded example booking `AZDEMO001` belongs to `demo@azoom.test` and is already **Return Pending**. This lets you demonstrate the employee inspection immediately.

## Recommended full demo

1. Register or sign in as a customer.
2. Browse the fleet, filter by category and select a car.
3. Pick rental dates and the correct car office. Confirm the driver's eligibility checkbox.
4. Continue to payment and choose Card, PayNow, or Apple Pay.
5. For **Card**, enter fictional test values, e.g. `Demo User`, `4242 4242 4242 4242`, `12/29`, `123`. Never use a real card.
6. For **PayNow**, scan the QR to visit the fun car-trivia page; click the demo payment button to simulate payment. The QR is NOT a payment QR.
7. Visit My Bookings → Collect car → record pick-up condition.
8. Return car → confirm designated office car park and condition.
9. Visit Employee Portal → log in → inspect the Return Pending booking → choose condition for each area and issue final bill.
10. Return to My Bookings → Pay final bill → see Completed status.

## Billing rules

- Rental days = calendar day difference between pick-up and return, minimum one day.
- Extras (GPS S$12/day, child seat S$8/day, additional driver S$25/day) are included in the estimate.
- Reservation deposit = 20% of the rental estimate.
- Employee assesses illustrative damage fees per area: no damage S$0, scratch S$75, dent S$180, major damage S$450.
- Final payment due = rental estimate + assessed damage − deposit already paid.
- Booking becomes Completed only after final simulated settlement.
- Overlapping bookings for the same car are rejected unless a booking is Cancelled or Completed.

## Locations and map

Locations are **illustrative showroom-inspired offices** in established Singapore automotive districts (Leng Kee, Ubi, Bukit Timah, Sin Ming, Changi Business Park). They are NOT actual A Zoom branches and do not claim affiliation with nearby dealers. Map uses Leaflet and OpenStreetMap tiles; internet access is required.

## Limitations and safety

- Browser localStorage is only a single-browser demo data store. It is not shared between browsers or devices, and is not secure.
- Employee/customer access is simulated, not protected by a server. Do not use real personal information.
- Card fields are fictional demo-only inputs; they are never persisted.
- Apple Pay and PayNow are simulated options, not payment integrations.
- QR opens a car-facts page, not a banking site.
- Vehicle images are fetched from Unsplash; some model-specific images may be illustrative and require network access.
- Map tiles, QR library, iconography/fonts and photography need internet access.
- The date-only booking model does not implement time-of-day or late return penalties.
- Final billing uses the original booked duration, not actual return timestamp.
- For a production system, use secure server-side auth, a database, audited payment provider, inventory synchronization and staff authorization.

## Deploy

This is a static website. Upload all files (keeping the folder structure) to Netlify, GitHub Pages or Vercel. Confirm `index.html` is the site entry. After deployment, verify navigation, Leaflet map, PayNow QR, and employee demo. Test all links in an incognito window.

## Reset demo data

In the browser's Developer Tools console, run `Object.keys(localStorage).filter(k => k.startsWith('az_')).forEach(k => localStorage.removeItem(k)); location.reload();` to restore seeded demo data. This removes all A Zoom demo bookings and accounts stored in that browser.
