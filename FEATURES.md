# Creative Features and Assignment Mapping

| Requirement | Demonstration | Source |
|---|---|---|
| Customer reserves a car | Fleet → details → booking → deposit payment | `cars.html`, `car.html`, `booking.html`, `payment.html`, `js/app.js` |
| Customer rents at office | Confirmed booking → Collect car, pick-up condition checklist | `bookings.html`, `js/app.js` |
| Customer returns at car park | Active rental → Return car, designated car park and condition | `bookings.html`, `js/app.js` |
| Employee inspects returned car | Employee login → inspect seven areas → apply illustrative damage charges | `employee.html`, `js/app.js` |
| Customer pays final bill | Issued final bill → Card / PayNow / Apple Pay simulation → Completed | `payment.html`, `js/app.js` |
| Multiple pages | Distinct HTML documents with shared header/footer | `*.html`, `js/app.js` |
| Cinematic design | Full-screen vehicle background, animated hero headline and photo zoom | `index.html`, `css/style.css` |
| Responsive design | Mobile menu, grid and layout breakpoints, touch-friendly forms | `css/style.css` |
| Map | Leaflet markers and interactive office selection | `locations.html`, `js/app.js` |
| PayNow QR fun | QR links to car trivia surprise page, not banking | `payment.html`, `car-fun.html` |
| Live fleet filters | Search, category, office, max price and sorting | `cars.html`, `js/app.js` |
| Dynamic price calculation | Rental days, extras, deposit, damage and final balance | `js/app.js` |
| Customer profile | Avatar in navigation, profile editing | `profile.html`, `js/app.js` |
| Status lifecycle | Pending Payment → Confirmed → Active Rental → Return Pending → Final Payment Due → Completed | `js/app.js` |
| Cancellation | Eligible bookings cancel and release dates | `bookings.html`, `js/app.js` |
| Scroll animations | IntersectionObserver reveal effects and reduced-motion support | `css/style.css`, `js/app.js` |
| Social footer | Links to Instagram, Facebook, TikTok and YouTube homepages | `js/app.js` |

**Important:** The map locations, payments, authentication, damage rates and bookings are frontend demonstrations. Report them accurately; do not claim production backend security or real payments.
