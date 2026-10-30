(() => {
  "use strict";
  const D = window.AZ;
  const $ = (s) => document.querySelector(s),
    $$ = (s) => [...document.querySelectorAll(s)],
    store = {
      get(k, d) {
        try {
          return JSON.parse(localStorage.getItem("az_" + k)) ?? d;
        } catch {
          return d;
        }
      },
      set(k, v) {
        localStorage.setItem("az_" + k, JSON.stringify(v));
      },
    };
  const money = (n) => "S$" + Number(n || 0).toFixed(2);
  const img = (car, w = 800) =>
    `https://images.unsplash.com/${car.image}?auto=format&fit=crop&w=${w}&q=82`;
  const today = () => new Date().toLocaleDateString("en-CA");
  const dt = (s) => new Date(s + "T12:00:00");
  const days = (a, b) => Math.ceil((dt(b) - dt(a)) / 86400000);
  const loc = (id) => D.locations.find((l) => l.id === id)?.name || id;
  const user = () => store.get("user", null);
  const bookings = () => store.get("bookings", []);
  const save = (b) => {
    store.set("bookings", b);
  };
  const currentPage = document.body.dataset.page;
  function toast(t) {
    const x = document.createElement("div");
    x.className = "toast";
    x.textContent = t;
    $("#toasts").append(x);
    setTimeout(() => x.remove(), 3500);
  }
  function escape(s) {
    return String(s ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  }
  function go(p) {
    location.href = p;
  }
  function requireUser() {
    if (!user()) {
      toast("Please sign in to continue");
      setTimeout(() => go("login.html"), 650);
      return false;
    }
    return true;
  }
  function userBookings() {
    return bookings().filter((b) => b.email === user()?.email);
  }
  function photo(c) {
    return `<img src="${img(c)}" alt="${escape(c.name)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800'">`;
  }
  function layout() {
    const links = [
      ["index.html", "Home"],
      ["cars.html", "Explore Fleet"],
      ["locations.html", "Locations"],
      ["how.html", "How It Works"],
      ["bookings.html", "My Bookings"],
    ];
    $("#header").innerHTML =
      `<header class="nav"><a class="brand" href="index.html"><span class="brand-symbol">A<span>↗</span></span><span>ZOOM<small>PREMIUM CAR RENTALS</small></span></a><nav class="navlinks">${links.map(([h, n]) => `<a class="${location.pathname.endsWith(h) ? "active" : ""}" href="${h}">${n}</a>`).join("")}</nav><div class="navright"><a class="profile-link" href="${user() ? "profile.html" : "login.html"}" aria-label="Profile or sign in"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-5 16-5 16 0"/></svg><span>${user() ? escape(user().name.split(" ")[0]) : "Sign in"}</span></a><a class="btn btn-primary navcta" href="cars.html">Book a Car ↗</a><button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">☰</button></div></header><nav class="mobile-nav" id="mobile-nav" hidden>${links.map(([h, n]) => `<a href="${h}">${n}</a>`).join("")}<a href="profile.html">Profile</a><a href="employee.html">Employee portal</a></nav>`;
    $("#hamburger").onclick = () => {
      const n = $("#mobile-nav");
      n.hidden = !n.hidden;
      $("#hamburger").setAttribute("aria-expanded", String(!n.hidden));
    };
    $("#footer").innerHTML =
      `<footer class="footer"><div class="footer-grid"><div><a class="brand" href="index.html"><span class="brand-symbol">A<span>↗</span></span><span>ZOOM<small>PREMIUM CAR RENTALS</small></span></a><p>Exceptional cars. Effortless journeys.<br>Built for the way you move.</p></div><div><h4>Explore</h4><a href="cars.html">Our Fleet</a><a href="locations.html">Showroom Offices</a><a href="how.html">How It Works</a></div><div><h4>Account</h4><a href="bookings.html">My Bookings</a><a href="profile.html">My Profile</a><a href="employee.html">Employee Portal</a></div><div><h4>Social</h4><a href="https://www.instagram.com/" target="_blank" rel="noopener">Instagram ↗</a><a href="https://www.facebook.com/" target="_blank" rel="noopener">Facebook ↗</a><a href="https://www.tiktok.com/" target="_blank" rel="noopener">TikTok ↗</a><a href="https://www.youtube.com/" target="_blank" rel="noopener">YouTube ↗</a></div></div><div class="footer-bottom"><span>© 2026 A Zoom - Your Journey</span><a href="index.html">Back to home ↑</a></div></footer>`;
  }
  function carCard(c) {
    return `<article class="car-card">${photo(c)}<div class="card-body"><div class="card-top"><span class="pill">${c.category}</span><span class="muted">${c.fuel}</span></div><h3>${escape(c.name)}</h3><p class="muted">${c.seats} seats · ${c.transmission}</p><div class="card-bottom"><div><strong>${money(c.price)}</strong><small> / day</small></div><a class="btn btn-primary" href="car.html?id=${c.id}">View Car ↗</a></div></div></article>`;
  }
  function index() {
    const featured = D.cars.slice(0, 3);
    $("#content").innerHTML =
      `<section class="hero"><div class="hero-image"></div><div class="hero-overlay"></div><div class="hero-copy wrap"><div class="eyebrow light">● PREMIUM DRIVING IN SINGAPORE</div><h1>YOUR DRIVE.<br><em>YOUR RULES.</em></h1><p>From everyday escapes to extraordinary journeys. Find your perfect ride and reserve in minutes.</p><div class="row"><a class="btn btn-primary btn-lg" href="cars.html">Explore the Fleet ↗</a><a class="btn btn-outline btn-lg" href="how.html">How it works ↓</a></div><div class="hero-stats"><span><b>12</b><small>Curated vehicles</small></span><span><b>5</b><small>Showroom-inspired offices</small></span><span><b>24/7</b><small>Online booking</small></span></div></div><div class="scroll-label">SCROLL TO EXPLORE ↓</div></section><section class="search-container wrap"><form id="hero-search" class="search-panel"><div><span class="eyebrow">YOUR NEXT JOURNEY</span><h2>Find your perfect drive.</h2></div><label>Pick-up office<select id="hero-office">${D.locations.map((l) => `<option value="${l.id}">${l.name}</option>`).join("")}</select></label><label>Pick-up date<input type="date" id="hero-date" required min="${today()}"></label><button class="btn btn-primary">Find My Ride ↗</button></form></section><section class="section wrap"><div class="section-title"><div><span class="eyebrow">THE COLLECTION</span><h2>Made for <em>every journey.</em></h2></div><a href="cars.html" class="text-link">View all vehicles ↗</a></div><div class="grid cars">${featured.map(carCard).join("")}</div></section><section class="section soft"><div class="wrap"><div class="section-title"><div><span class="eyebrow">THE A ZOOM ADVANTAGE</span><h2>Why choose <em>us?</em></h2></div><p>Every detail designed to make the road ahead simpler.</p></div><div class="grid three">${[
        [
          "✦",
          "Curated premium fleet",
          "From practical city cars to iconic performance models.",
        ],
        [
          "◇",
          "Clear pricing",
          "Know your rental rate, optional extras, and final charges.",
        ],
        [
          "↗",
          "Flexible experience",
          "Explore office locations, manage bookings and returns online.",
        ],
      ]
        .map(
          (x) =>
            `<article class="feature"><span>${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`,
        )
        .join(
          "",
        )}</div></div></section><section class="section wrap"><div class="split"><div><span class="eyebrow">OUR STORY</span><h2>Driving should feel <em>extraordinary.</em></h2><p class="lead-dark">A Zoom is a concept car rental experience built around effortless discovery, transparent rental management and beautifully simple technology.</p><a href="how.html" class="btn btn-dark">Discover how it works ↗</a></div><img class="about-image" src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85" alt="Premium car on a scenic road"></div></section><section class="cta"><div class="wrap"><span class="eyebrow light">READY WHEN YOU ARE</span><h2>The road is calling.<br><em>Answer it.</em></h2><a class="btn btn-white" href="cars.html">Find your car ↗</a></div></section>`;
    $("#hero-search").onsubmit = (e) => {
      e.preventDefault();
      go(
        `cars.html?office=${$("#hero-office").value}&date=${$("#hero-date").value}`,
      );
    };
  }
  function cars() {
    const params = new URLSearchParams(location.search);
    $("#content").innerHTML =
      `<section class="page-hero wrap"><span class="eyebrow">THE A ZOOM COLLECTION</span><h1>Find your <em>perfect drive.</em></h1><p>Explore 12 vehicles across six categories, ready for your next journey.</p></section><section class="wrap section compact"><div class="filters"><label>Search<input id="search" placeholder="Search make or model"></label><label>Category<select id="category"><option value="">All categories</option>${[...new Set(D.cars.map((c) => c.category))].map((x) => `<option>${x}</option>`).join("")}</select></label><label>Pick-up office<select id="office"><option value="">All offices</option>${D.locations.map((l) => `<option value="${l.id}">${l.name}</option>`).join("")}</select></label><label>Maximum / day<select id="price"><option value="9999">Any price</option><option value="120">S$120</option><option value="250">S$250</option><option value="400">S$400</option></select></label><label>Sort by<select id="sort"><option value="default">Featured</option><option value="asc">Price low–high</option><option value="desc">Price high–low</option><option value="name">Name A–Z</option></select></label></div><p class="muted" id="result-count"></p><div class="grid cars" id="car-results"></div></section>`;
    $("#office").value = params.get("office") || "";
    function render() {
      let a = D.cars.filter(
        (c) =>
          c.name.toLowerCase().includes($("#search").value.toLowerCase()) &&
          (!$("#category").value || c.category === $("#category").value) &&
          (!$("#office").value || c.location === $("#office").value) &&
          c.price <= Number($("#price").value),
      );
      if ($("#sort").value === "asc") a.sort((a, b) => a.price - b.price);
      if ($("#sort").value === "desc") a.sort((a, b) => b.price - a.price);
      if ($("#sort").value === "name")
        a.sort((a, b) => a.name.localeCompare(b.name));
      $("#result-count").textContent = `${a.length} vehicles found`;
      $("#car-results").innerHTML =
        a.map(carCard).join("") ||
        '<p class="empty">No matching vehicles. Adjust your filters.</p>';
    }
    $$(".filters input,.filters select").forEach((x) =>
      x.addEventListener("input", render),
    );
    render();
  }
  function car() {
    const c =
      D.cars.find(
        (x) => x.id === Number(new URLSearchParams(location.search).get("id")),
      ) || D.cars[0];
    $("#content").innerHTML =
      `<section class="page-hero wrap"><span class="eyebrow">${c.category.toUpperCase()} COLLECTION</span><h1>${escape(c.name)}</h1><p>Precision, comfort and an exceptional driving experience.</p></section><section class="wrap section compact"><div class="detail-layout"><div><div class="detail-photo">${photo(c)}</div><div class="spec-grid">${[
        ["Category", c.category],
        ["Seats", c.seats],
        ["Transmission", c.transmission],
        ["Fuel", c.fuel],
      ]
        .map(([k, v]) => `<div><small>${k}</small><b>${v}</b></div>`)
        .join(
          "",
        )}</div><h2>About this vehicle</h2><p class="muted">Enjoy a smooth and memorable drive in the ${escape(c.name)}. Flexible pick-up options, transparent pricing and easy online rental management.</p></div><aside class="booking-aside"><span class="eyebrow">RESERVE THIS VEHICLE</span><h2>${money(c.price)} <small>/ day</small></h2><p class="muted">Pick-up office: ${loc(c.location)}</p><p>✓ Flexible booking</p><p>✓ Vehicle condition checklist</p><p>✓ Transparent final billing</p><a class="btn btn-primary full" href="booking.html?car=${c.id}">Reserve this car ↗</a><p class="small muted">All reservations and payments are simulations.</p></aside></div></section>`;
  }
  function how() {
    const steps = [
      [
        "01",
        "Reserve online",
        "Choose a car, office and rental dates. Pay a simulated reservation deposit to confirm.",
      ],
      [
        "02",
        "Collect at our office",
        "Visit your selected showroom-inspired office and record the vehicle’s condition before driving.",
      ],
      [
        "03",
        "Enjoy your drive",
        "Manage your active rental and review the booking details in your dashboard.",
      ],
      [
        "04",
        "Return at designated car park",
        "Return the vehicle to the selected office car park and submit your return checklist.",
      ],
      [
        "05",
        "Employee inspection",
        "An employee reviews the return, compares conditions and records any damage charges.",
      ],
      [
        "06",
        "Settle your final bill",
        "Review the rental amount, deposit credit and any damage fees, then simulate final payment.",
      ],
    ];
    $("#content").innerHTML =
      `<section class="page-hero wrap"><span class="eyebrow">EFFORTLESS FROM START TO FINISH</span><h1>How A Zoom <em>works.</em></h1><p>Six clear steps from your first search to your final receipt.</p></section><section class="section wrap"><div class="grid three">${steps.map(([n, h, p]) => `<article class="feature step"><span>${n}</span><h3>${h}</h3><p>${p}</p></article>`).join("")}</div><div class="center"><a href="cars.html" class="btn btn-primary btn-lg">Start your journey ↗</a></div></section>`;
  }
  function locations() {
    $("#content").innerHTML =
      `<section class="page-hero wrap"><span class="eyebrow">SHOWROOM-INSPIRED OFFICES</span><h1>Find your <em>pick-up point.</em></h1><p>Five illustrative offices in well-known Singapore automotive districts.</p></section><section class="wrap section compact"><div class="map-layout"><div id="map"></div><div class="office-list">${D.locations.map((l) => `<article class="office"><h3>${l.name}</h3><p>${l.address}</p><div class="row"><button class="btn btn-dark btn-sm" data-focus="${l.id}">View on map</button><a class="btn btn-outline-dark btn-sm" href="cars.html?office=${l.id}">Browse cars ↗</a></div></article>`).join("")}</div></div><p class="muted small">Map shows approximate automotive districts, not actual A Zoom branches. Map tiles require internet access.</p></section>`;
    if (typeof L === "undefined") {
      $("#map").innerHTML =
        "<p>Map unavailable offline. Connect to the internet to view office locations.</p>";
      return;
    }
    const map = L.map("map").setView([1.339, 103.848], 11);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
    const markers = {};
    D.locations.forEach((l) => {
      markers[l.id] = L.marker([l.lat, l.lng])
        .addTo(map)
        .bindPopup(
          `<b>${escape(l.name)}</b><br>${escape(l.address)}<br><a href="cars.html?office=${l.id}">Explore available cars</a>`,
        );
    });
    $$("[data-focus]").forEach(
      (b) =>
        (b.onclick = () => {
          const l = D.locations.find((x) => x.id === b.dataset.focus);
          map.setView([l.lat, l.lng], 14);
          markers[l.id].openPopup();
        }),
    );
    setTimeout(() => map.invalidateSize(), 250);
  }
  function auth() {
    const signup = currentPage === "register";
    $("#content").innerHTML =
      `<section class="auth-bg"><div class="auth-card"><span class="eyebrow">WELCOME TO A ZOOM</span><h1>${signup ? "Create your account" : "Welcome back."}</h1><p class="muted">Frontend account</p><form id="auth-form">${signup ? '<label>Full name<input name="name" required minlength="2" maxlength="70" placeholder="Your name"></label>' : ""}<label>Email address<input type="email" name="email" required placeholder="you@example.com"></label>${signup ? '<label>Phone (optional)<input name="phone" placeholder="+65 9123 4567" maxlength="20"></label>' : ""}<label>Demo access code<input type="password" name="code" required minlength="4" placeholder="Any 4+ characters"></label><button class="btn btn-primary full">${signup ? "Create account" : "Sign in"} ↗</button></form><p class="small">${signup ? 'Already have an account? <a href="login.html">Sign in</a>' : 'New to A Zoom? <a href="register.html">Create account</a>'}</p><p class="small muted">Employee? <a href="employee.html">Employee portal</a></p></div></section>`;
    $("#auth-form").onsubmit = (e) => {
      e.preventDefault();
      const f = new FormData(e.target),
        email = String(f.get("email")).trim().toLowerCase();
      if (signup) {
        const users = store.get("users", []);
        if (users.some((u) => u.email === email)) {
          toast("Email already registered");
          return;
        }
        const u = {
          name: String(f.get("name")).trim(),
          email,
          phone: String(f.get("phone") || ""),
        };
        users.push(u);
        store.set("users", users);
        store.set("user", u);
      } else {
        const u = store.get("users", []).find((u) => u.email === email);
        if (!u) {
          toast("No account found. Please register first.");
          return;
        }
        store.set("user", u);
      }
      toast("Welcome to A Zoom!");
      setTimeout(() => go("profile.html"), 500);
    };
  }
  function profile() {
    if (!requireUser()) return;
    const u = user();
    $("#content").innerHTML =
      `<section class="page-hero wrap"><span class="eyebrow">YOUR ACCOUNT</span><h1>My <em>profile.</em></h1></section><section class="section wrap compact"><div class="profile-card"><div class="avatar">${escape(u.name[0]).toUpperCase()}</div><form id="profile-form"><label>Full name<input name="name" required value="${escape(u.name)}"></label><label>Email<input value="${escape(u.email)}" disabled></label><label>Phone<input name="phone" value="${escape(u.phone || "")}"></label><div class="row"><button class="btn btn-primary">Save profile</button><button class="btn btn-outline-dark" type="button" id="logout">Sign out</button></div></form></div></section>`;
    $("#profile-form").onsubmit = (e) => {
      e.preventDefault();
      const f = new FormData(e.target),
        v = {
          ...u,
          name: String(f.get("name")).trim(),
          phone: String(f.get("phone")).trim(),
        };
      store.set("user", v);
      store.set(
        "users",
        store.get("users", []).map((x) => (x.email === u.email ? v : x)),
      );
      toast("Profile updated");
      layout();
    };
    $("#logout").onclick = () => {
      localStorage.removeItem("az_user");
      go("index.html");
    };
  }
  function available(car, start, end, exclude) {
    return !bookings().some(
      (b) =>
        b.carId === car &&
        b.id !== exclude &&
        !["Cancelled", "Completed"].includes(b.status) &&
        start < b.end &&
        end > b.start,
    );
  }
  function calc(c, s, e, extras) {
    const d = days(s, e);
    return {
      days: d,
      base: d * c.price,
      extras:
        d *
        ((extras.gps ? 12 : 0) +
          (extras.seat ? 8 : 0) +
          (extras.driver ? 25 : 0)),
      total:
        d *
        (c.price +
          (extras.gps ? 12 : 0) +
          (extras.seat ? 8 : 0) +
          (extras.driver ? 25 : 0)),
    };
  }
  function booking() {
    if (!requireUser()) return;
    const c =
      D.cars.find(
        (x) => x.id === Number(new URLSearchParams(location.search).get("car")),
      ) || D.cars[0];
    const u = user();
    $("#content").innerHTML =
      `<section class="page-hero wrap"><span class="eyebrow">RESERVE YOUR DRIVE</span><h1>Make it <em>yours.</em></h1><p>Choose dates, personalize your rental, and review your price.</p></section><section class="section wrap compact"><div class="detail-layout"><form class="form-card" id="book-form"><h2>01 / Rental details</h2><div class="form-grid"><label>Pick-up office<select id="pickup">${D.locations.map((l) => `<option value="${l.id}" ${l.id === c.location ? "selected" : ""}>${l.name}</option>`).join("")}</select></label><label>Return car park<select id="return">${D.locations.map((l) => `<option value="${l.id}" ${l.id === c.location ? "selected" : ""}>${l.name} car park</option>`).join("")}</select></label><label>Pick-up date<input id="start" type="date" required min="${today()}"></label><label>Return date<input id="end" type="date" required min="${today()}"></label></div><h2>02 / Driver details</h2><div class="form-grid"><label>Full name<input value="${escape(u.name)}" disabled></label><label>Email<input value="${escape(u.email)}" disabled></label></div><label class="check"><input type="checkbox" id="licence" required> I confirm that I hold a valid driving licence and meet rental eligibility requirements.</label><h2>03 / Optional extras</h2><div class="extras"><label class="check"><input type="checkbox" id="gps"> GPS navigation <b>+S$12/day</b></label><label class="check"><input type="checkbox" id="seat"> Child seat <b>+S$8/day</b></label><label class="check"><input type="checkbox" id="driver"> Additional driver <b>+S$25/day</b></label></div><p class="error" id="booking-error" role="alert"></p><button class="btn btn-primary full">Continue to reservation payment ↗</button></form><aside class="booking-aside"><div class="aside-photo">${photo(c)}</div><h3>${escape(c.name)}</h3><p class="muted">${money(c.price)} / day</p><div id="price-preview" class="price-preview">Choose dates to see your total.</div><p class="small muted">Reservation deposit: 20% of estimated rental. Remaining balance plus any assessed damage is due after inspection.</p></aside></div></section>`;
    const start = $("#start"),
      end = $("#end");
    start.value = today();
    end.value = new Date(Date.now() + 86400000 * 2).toLocaleDateString("en-CA");
    function update() {
      end.min = start.value;
      const d = days(start.value, end.value);
      if (d < 1 || !Number.isFinite(d)) {
        $("#price-preview").textContent =
          "Return date must be after pick-up date.";
        return;
      }
      const x = calc(c, start.value, end.value, {
        gps: $("#gps").checked,
        seat: $("#seat").checked,
        driver: $("#driver").checked,
      });
      $("#price-preview").innerHTML =
        `<p>${x.days} day(s) × ${money(c.price)} <b>${money(x.base)}</b></p><p>Extras <b>${money(x.extras)}</b></p><hr><p><strong>Estimated total</strong><strong>${money(x.total)}</strong></p><p>20% reservation deposit <b>${money(x.total * 0.2)}</b></p>`;
    }
    $$("#book-form input,#book-form select").forEach((el) =>
      el.addEventListener("change", update),
    );
    update();
    $("#book-form").onsubmit = (e) => {
      e.preventDefault();
      const s = start.value,
        en = end.value;
      if (!s || !en || s < today() || days(s, en) < 1) {
        $("#booking-error").textContent =
          "Please choose valid future rental dates.";
        return;
      }
      if ($("#pickup").value !== c.location) {
        $("#booking-error").textContent =
          `This vehicle is currently based at ${loc(c.location)}. Please choose that pick-up office.`;
        return;
      }
      if (!available(c.id, s, en)) {
        $("#booking-error").textContent =
          "This vehicle is already reserved for those dates. Choose another date.";
        return;
      }
      const extras = {
        gps: $("#gps").checked,
        seat: $("#seat").checked,
        driver: $("#driver").checked,
      };
      const x = calc(c, s, en, extras);
      const b = {
        id: "AZ" + Date.now().toString(36).toUpperCase(),
        email: u.email,
        carId: c.id,
        pickup: $("#pickup").value,
        returnLoc: $("#return").value,
        start: s,
        end: en,
        extras,
        base: x.base,
        extraCost: x.extras,
        total: x.total,
        deposit: Number((x.total * 0.2).toFixed(2)),
        paid: 0,
        damage: 0,
        status: "Pending Payment",
        created: new Date().toISOString(),
        inspection: null,
      };
      save([...bookings(), b]);
      go("payment.html?id=" + b.id);
    };
  }
  function getBooking() {
    return bookings().find(
      (b) => b.id === new URLSearchParams(location.search).get("id"),
    );
  }
  function payment() {
    if (!requireUser()) return;
    const b = getBooking();
    if (!b || b.email !== user().email) {
      $("#content").innerHTML =
        '<section class="page-hero wrap"><h1>Booking not found</h1></section>';
      return;
    }
    const c = D.cars.find((x) => x.id === b.carId);
    const final = b.status === "Final Payment Due";
    const due = final ? Math.max(0, b.total + b.damage - b.paid) : b.deposit;
    $("#content").innerHTML =
      `<section class="page-hero wrap"><span class="eyebrow">SECURE-LOOKING CHECKOUT</span><h1>${final ? "Settle your" : "Confirm your"} <em>payment.</em></h1><p>No real payment details or money are collected.</p></section><section class="section wrap compact"><div class="detail-layout"><div class="form-card"><div class="demo-banner">⚠ SIMULATED PAYMENT ONLY — do not enter real card information.</div><h2>Choose a payment method</h2><div class="payment-tabs"><button class="paytab active" data-method="card">💳 Card</button><button class="paytab" data-method="paynow">▦ PayNow</button><button class="paytab" data-method="apple"> Apple Pay</button></div><div id="payment-method"></div><p class="error" id="pay-error" role="alert"></p><button class="btn btn-primary full" id="pay-btn">Complete payment — ${money(due)} ↗</button></div><aside class="booking-aside"><div class="aside-photo">${photo(c)}</div><h3>${escape(c.name)}</h3><p class="muted">Booking ${b.id}</p><div class="price-preview"><p>Rental + extras <b>${money(b.total)}</b></p><p>Damage assessment <b>${money(b.damage)}</b></p><p>Previously paid <b>−${money(b.paid)}</b></p><hr><p><strong>Due now</strong><strong>${money(due)}</strong></p></div></aside></div></section>`;
    let method = "card";
    function draw() {
      const target = $("#payment-method");
      target.innerHTML =
        method === "card"
          ? `<div class="card-demo"><span>AZOOM •nCARD</span><strong>•••• &nbsp; •••• &nbsp; •••• &nbsp; 4242</strong><small>NOT A REAL PAYMENT FORM</small></div><div class="form-grid"><label>Cardholder name<input id="card-name" maxlength="70" placeholder="Sample Name" autocomplete="off"></label><label>Card number<input id="card-number" inputmode="numeric" maxlength="19" placeholder="4242 4242 4242 4242" autocomplete="off"></label><label>Expiry<input id="card-expiry" placeholder="12/29" maxlength="5" autocomplete="off"></label><label>Security code<input id="card-cvv" placeholder="123" maxlength="4" inputmode="numeric" autocomplete="off"></label></div><p class="small muted">Use fictional test values only. Card fields are validated in memory and never saved.</p>`
          : method === "paynow"
            ? `<div class="qr-panel"><div id="qr"></div><h3>Scan for a car surprise 🚗</h3><p class="muted">This QR opens a fun A Zoom car trivia page, not a payment destination. Press the button below to simulate payment.</p><a href="car-fun.html" target="_blank" rel="noopener">Open the surprise page ↗</a></div>`
            : `<div class="apple-panel"><div class="apple-mark">● Pay</div><h3>Apple Pay </h3><p>Simulated Apple Pay selection. No Apple Wallet or real payment gateway is connected.</p></div>`;
      if (method === "paynow") {
        if (typeof QRCode !== "undefined")
          new QRCode($("#qr"), {
            text: new URL("car-fun.html", location.href).href,
            width: 190,
            height: 190,
            colorDark: "#101826",
            colorLight: "#ffffff",
          });
        else
          $("#qr").innerHTML =
            "<p>QR generator requires internet access.<br>Use the link below.</p>";
      }
    }
    $$("[data-method]").forEach(
      (x) =>
        (x.onclick = () => {
          method = x.dataset.method;
          $$("[data-method]").forEach((t) =>
            t.classList.toggle("active", t === x),
          );
          draw();
        }),
    );
    draw();
    $("#pay-btn").onclick = () => {
      if (method === "card") {
        const n = $("#card-number").value.replace(/\D/g, ""),
          exp = $("#card-expiry").value.trim(),
          cvv = $("#card-cvv").value.trim();
        if (
          !$("#card-name").value.trim() ||
          n.length < 12 ||
          !/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp) ||
          !/^\d{3,4}$/.test(cvv)
        ) {
          $("#pay-error").textContent =
            "Enter fictional cardholder, card number, MM/YY expiry and 3–4 digit code.";
          return;
        }
      }
      b.paid = Number((b.paid + due).toFixed(2));
      b.status = final ? "Completed" : "Confirmed";
      b.paymentMethod = method;
      save(bookings().map((x) => (x.id === b.id ? b : x)));
      toast("Demo payment successful!");
      go("bookings.html?success=" + b.id);
    };
  }
  function bookingCard(b, employee = false) {
    const c = D.cars.find((x) => x.id === b.carId);
    return `<article class="booking-card"><div class="booking-thumb">${photo(c)}</div><div class="booking-info"><div class="row spread"><span class="eyebrow">${b.id}</span><span class="status ${b.status.toLowerCase().replaceAll(" ", "-")}">${b.status}</span></div><h3>${escape(c.name)}</h3><p class="muted">${b.start} → ${b.end} · ${loc(b.pickup)}</p><p><b>${money(b.total + b.damage)}</b> total · Paid ${money(b.paid)}</p><div class="row actions">${employee ? employeeActions(b) : customerActions(b)}</div></div></article>`;
  }
  function customerActions(b) {
    return (
      (b.status === "Pending Payment"
        ? `<a class="btn btn-primary btn-sm" href="payment.html?id=${b.id}">Pay deposit</a><button class="btn btn-outline-dark btn-sm" data-cancel="${b.id}">Cancel</button>`
        : b.status === "Confirmed"
          ? `<button class="btn btn-primary btn-sm" data-pickup="${b.id}">Collect car</button><button class="btn btn-outline-dark btn-sm" data-cancel="${b.id}">Cancel</button>`
          : b.status === "Active Rental"
            ? `<button class="btn btn-primary btn-sm" data-return="${b.id}">Return car</button>`
            : b.status === "Final Payment Due"
              ? `<a class="btn btn-primary btn-sm" href="payment.html?id=${b.id}">Pay final bill</a>`
              : b.status === "Return Pending"
                ? '<span class="muted">Awaiting employee inspection</span>'
                : b.status === "Completed"
                  ? '<span class="muted">✓ Paid and completed</span>'
                  : '<span class="muted">Reservation cancelled</span>') +
      `<button class="btn btn-outline-dark btn-sm" data-details="${b.id}">Details</button>`
    );
  }
  function employeeActions(b) {
    return b.status === "Return Pending"
      ? `<button class="btn btn-primary btn-sm" data-inspect="${b.id}">Inspect return ↗</button>`
      : `<button class="btn btn-outline-dark btn-sm" data-details="${b.id}">View record</button>`;
  }
  function modal(html) {
    $("#modal-body").innerHTML = html;
    $("#modal").showModal();
  }
  function close() {
    $("#modal").close();
  }
  function details(b) {
    modal(
      `<h2>Booking ${b.id}</h2><p><b>Status:</b> ${b.status}</p><p><b>Rental:</b> ${b.start} to ${b.end}</p><p><b>Pick-up:</b> ${loc(b.pickup)}</p><p><b>Return car park:</b> ${loc(b.returnLoc)}</p><p><b>Rental + extras:</b> ${money(b.total)}</p><p><b>Damage:</b> ${money(b.damage)}</p><p><b>Paid:</b> ${money(b.paid)}</p><p><b>Outstanding:</b> ${money(Math.max(0, b.total + b.damage - b.paid))}</p>${b.inspection ? `<p><b>Inspection:</b> ${escape(b.inspection.notes || "No notes")}</p>` : ""}<button class="btn btn-dark" id="done">Close</button>`,
    );
    $("#done").onclick = close;
  }
  function bookingsPage() {
    if (!requireUser()) return;
    const a = userBookings().slice().reverse();
    $("#content").innerHTML =
      `<section class="page-hero wrap"><span class="eyebrow">YOUR JOURNEY</span><h1>My <em>bookings.</em></h1><p>Manage reservations, pick-ups, returns and final payments.</p></section><section class="section wrap compact"><div class="stat-grid">${[
        ["Total bookings", a.length],
        ["Confirmed", a.filter((b) => b.status === "Confirmed").length],
        [
          "Active rentals",
          a.filter((b) => b.status === "Active Rental").length,
        ],
        ["Completed", a.filter((b) => b.status === "Completed").length],
      ]
        .map(
          ([n, v]) =>
            `<div class="stat"><strong>${v}</strong><span>${n}</span></div>`,
        )
        .join(
          "",
        )}</div><div class="booking-list">${a.map((b) => bookingCard(b)).join("") || '<div class="empty">No bookings yet. <a href="cars.html">Explore the fleet ↗</a></div>'}</div></section>`;
    bindActions(false);
  }
  function bindActions(emp) {
    $$("[data-details]").forEach(
      (x) =>
        (x.onclick = () =>
          details(bookings().find((b) => b.id === x.dataset.details))),
    );
    $$("[data-cancel]").forEach(
      (x) =>
        (x.onclick = () => {
          const b = bookings().find((b) => b.id === x.dataset.cancel);
          if (!["Pending Payment", "Confirmed"].includes(b.status)) return;
          modal(
            `<h2>Cancel reservation?</h2><p>This will release the vehicle dates. Any previous deposit is marked as a simulated refund, not actually refunded.</p><label>Reason<select id="reason"><option>Change of plans</option><option>Different vehicle</option><option>Other</option></select></label><div class="row"><button class="btn btn-danger" id="confirm-cancel">Cancel reservation</button><button class="btn btn-outline-dark" id="keep">Keep booking</button></div>`,
          );
          $("#keep").onclick = close;
          $("#confirm-cancel").onclick = () => {
            b.status = "Cancelled";
            b.cancelReason = $("#reason").value;
            b.refund = b.paid;
            save(bookings().map((x) => (x.id === b.id ? b : x)));
            close();
            bookingsPage();
            toast("Reservation cancelled (demo)");
          };
        }),
    );
    $$("[data-pickup]").forEach(
      (x) =>
        (x.onclick = () => {
          const b = bookings().find((b) => b.id === x.dataset.pickup);
          modal(
            `<h2>Collect your car</h2><p>Office: ${loc(b.pickup)}</p><p>Record the starting vehicle condition before collecting keys.</p><label>Fuel / battery level<select id="fuel"><option>Full</option><option>Three quarters</option><option>Half</option><option>Quarter</option></select></label><label>Existing condition notes<textarea id="pickup-notes" placeholder="e.g. No visible scratches"></textarea></label><label class="check"><input type="checkbox" id="pickup-confirm"> I have inspected the vehicle and collected the keys at the office.</label><button class="btn btn-primary full" id="confirm-pickup">Confirm pick-up</button>`,
          );
          $("#confirm-pickup").onclick = () => {
            if (!$("#pickup-confirm").checked) {
              toast("Please confirm the checklist");
              return;
            }
            b.pickupInspection = {
              fuel: $("#fuel").value,
              notes: $("#pickup-notes").value,
              at: new Date().toISOString(),
            };
            b.status = "Active Rental";
            save(bookings().map((x) => (x.id === b.id ? b : x)));
            close();
            bookingsPage();
          };
        }),
    );
    $$("[data-return]").forEach(
      (x) =>
        (x.onclick = () => {
          const b = bookings().find((b) => b.id === x.dataset.return);
          modal(
            `<h2>Return your vehicle</h2><p>Designated return car park: <b>${loc(b.returnLoc)}</b></p><label>Return condition<select id="return-condition"><option>No new visible damage</option><option>Possible scratches</option><option>Possible dent or other damage</option></select></label><label>Return notes<textarea id="return-notes" placeholder="Describe condition on return"></textarea></label><label class="check"><input type="checkbox" id="return-confirm"> I confirm the vehicle has been returned to the designated car park.</label><button class="btn btn-primary full" id="confirm-return">Submit return for inspection</button>`,
          );
          $("#confirm-return").onclick = () => {
            if (!$("#return-confirm").checked) {
              toast("Please confirm vehicle return");
              return;
            }
            b.returnReport = {
              condition: $("#return-condition").value,
              notes: $("#return-notes").value,
              at: new Date().toISOString(),
            };
            b.status = "Return Pending";
            save(bookings().map((x) => (x.id === b.id ? b : x)));
            close();
            bookingsPage();
          };
        }),
    );
    if (emp)
      $$("[data-inspect]").forEach(
        (x) => (x.onclick = () => inspect(x.dataset.inspect)),
      );
  }
  function employee() {
    const isEmp = store.get("employee", false);
    if (!isEmp) {
      $("#content").innerHTML =
        `<section class="auth-bg"><div class="auth-card"><span class="eyebrow">STAFF ACCESS</span><h1>Employee <em>portal.</em></h1><p class="muted">Employee login.</p><form id="employee-form"><label>Demo employee ID<input id="emp-id" required placeholder="employee@azoom.demo"></label><label>Demo access code<input id="emp-code" type="password" required placeholder="AZOOM2026"></label><button class="btn btn-primary full">Enter employee dashboard ↗</button></form><p class="small muted">Demo ID: employee@azoom.demo<br>Demo code: AZOOM2026</p><p id="emp-error" class="error"></p></div></section>`;
      $("#employee-form").onsubmit = (e) => {
        e.preventDefault();
        if (
          $("#emp-id").value.trim().toLowerCase() === "employee@azoom.demo" &&
          $("#emp-code").value === "AZOOM2026"
        ) {
          store.set("employee", true);
          employee();
        } else $("#emp-error").textContent = "Invalid credentials.";
      };
      return;
    }
    const a = bookings().slice().reverse();
    $("#content").innerHTML =
      `<section class="page-hero wrap"><span class="eyebrow">A ZOOM OPERATIONS</span><h1>Employee <em>dashboard.</em></h1><p>Inspect returned vehicles, assess damage and issue final bills.</p><button id="emp-logout" class="btn btn-outline-dark btn-sm">Sign out of employee.</button></section><section class="section wrap compact"><div class="stat-grid">${[
        ["Total reservations", a.length],
        [
          "Awaiting inspection",
          a.filter((b) => b.status === "Return Pending").length,
        ],
        [
          "Final bill due",
          a.filter((b) => b.status === "Final Payment Due").length,
        ],
        ["Completed", a.filter((b) => b.status === "Completed").length],
      ]
        .map(
          ([n, v]) =>
            `<div class="stat"><strong>${v}</strong><span>${n}</span></div>`,
        )
        .join(
          "",
        )}</div><h2>Rental operations</h2><div class="booking-list">${a.map((b) => bookingCard(b, true)).join("") || '<div class="empty">No bookings yet. Create a customer reservation to test the employee workflow.</div>'}</div></section>`;
    $("#emp-logout").onclick = () => {
      store.set("employee", false);
      employee();
    };
    bindActions(true);
  }
  function inspect(id) {
    const b = bookings().find((x) => x.id === id);
    const areas = [
      "Front bumper",
      "Rear bumper",
      "Left side",
      "Right side",
      "Windshield",
      "Wheels",
      "Interior",
    ];
    modal(
      `<h2>Return inspection</h2><p><b>${b.id}</b> · ${loc(b.returnLoc)}</p><p class="muted">Compare with pick-up notes: ${escape(b.pickupInspection?.notes || "No notes recorded")}</p><p class="muted">Customer return report: ${escape(b.returnReport?.condition || "Not recorded")} — ${escape(b.returnReport?.notes || "")}</p><div class="inspection-grid">${areas.map((a, i) => `<label>${a}<select data-area="${i}"><option value="0">No new damage — S$0</option><option value="75">Minor scratch — S$75</option><option value="180">Dent — S$180</option><option value="450">Major damage — S$450</option></select></label>`).join("")}</div><label>Employee inspection notes<textarea id="inspection-notes" placeholder="Record findings and rationale"></textarea></label><div class="price-preview"><p>Illustrative damage charges <strong id="damage-preview">S$0.00</strong></p><p>Final rental total <strong id="final-preview">${money(b.total)}</strong></p><p>Deposit already paid <strong>−${money(b.paid)}</strong></p><p>Remaining due <strong id="due-preview">${money(b.total - b.paid)}</strong></p></div><p class="small muted">All damage rates are illustrative and do not represent real repair quotations.</p><button class="btn btn-primary full" id="issue-bill">Approve inspection & issue final bill ↗</button>`,
    );
    const update = () => {
      const d = $$("[data-area]").reduce((s, x) => s + Number(x.value), 0);
      $("#damage-preview").textContent = money(d);
      $("#final-preview").textContent = money(b.total + d);
      $("#due-preview").textContent = money(Math.max(0, b.total + d - b.paid));
    };
    $$("[data-area]").forEach((x) => (x.onchange = update));
    $("#issue-bill").onclick = () => {
      b.damage = $$("[data-area]").reduce((s, x) => s + Number(x.value), 0);
      b.inspection = {
        notes: $("#inspection-notes").value,
        areas: $$("[data-area]").map((x, i) => ({
          area: areas[i],
          charge: Number(x.value),
        })),
        at: new Date().toISOString(),
      };
      b.status = "Final Payment Due";
      save(bookings().map((x) => (x.id === b.id ? b : x)));
      close();
      employee();
      toast("Final bill issued to customer");
    };
  }
  function fun() {
    const facts = [
      "The first practical automobile was developed in the 1880s.",
      "Electric vehicles existed long before modern lithium-ion batteries.",
      "A car’s tyres are its only contact points with the road.",
      "Aerodynamics helps cars use less energy at highway speeds.",
      "The Singapore Grand Prix is held on a street circuit at night.",
    ];
    $("#content").innerHTML =
      `<section class="fun-hero"><div class="wrap"><span class="eyebrow light">A ZOOM CAR CLUB</span><h1>YOU UNLOCKED<br><em>THE FUN LANE! 🏁</em></h1><p>Scanned our PayNow QR? Surprise! This is a car trivia experience — not a payment link.</p><div class="fun-box"><div class="fun-car" id="fun-car">🏎️</div><h2 id="fact">${facts[0]}</h2><button id="next-fact" class="btn btn-white">Another car fact ↗</button></div><a href="cars.html" class="btn btn-outline">Explore the fleet</a></div></section>`;
    let i = 0;
    $("#next-fact").onclick = () => {
      $("#fact").textContent = facts[++i % facts.length];
      $("#fun-car").classList.remove("zoom");
      void $("#fun-car").offsetWidth;
      $("#fun-car").classList.add("zoom");
    };
  }
  function seed() {
    if (store.get("seeded", false)) return;
    store.set("seeded", true);
    const demo = {
      name: "Demo Customer",
      email: "demo@azoom.test",
      phone: "9123 4567",
    };
    store.set("users", [demo]);
    const start = new Date(Date.now() - 86400000 * 4).toLocaleDateString(
        "en-CA",
      ),
      end = new Date(Date.now() - 86400000 * 2).toLocaleDateString("en-CA");
    store.set("bookings", [
      {
        id: "AZDEMO001",
        email: sample.email,
        carId: 5,
        pickup: "ubi",
        returnLoc: "ubi",
        start,
        end,
        extras: {},
        base: 184,
        extraCost: 0,
        total: 184,
        deposit: 36.8,
        paid: 36.8,
        damage: 0,
        status: "Return Pending",
        pickupInspection: {
          fuel: "Full",
          notes: "Small existing mark near rear door",
        },
        returnReport: {
          condition: "Possible scratches",
          notes: "New scratch on left side",
        },
        created: new Date().toISOString(),
      },
    ]);
  }
  function init() {
    seed();
    layout();
    $("#modal").addEventListener("click", (e) => {
      if (e.target.id === "modal") close();
    });
    $("#modal-close").onclick = close;
    ({
      home: index,
      cars,
      car,
      how,
      locations,
      login: auth,
      register: auth,
      profile,
      booking,
      payment,
      bookings: bookingsPage,
      employee,
      fun,
    })[currentPage]?.();
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    $$(".feature,.car-card,.section-title,.booking-card").forEach((e) => {
      e.classList.add("reveal");
      obs.observe(e);
    });
  }
  document.addEventListener("DOMContentLoaded", init);
})();
