# Lawson's Landing — Site Finder

An offline-capable Progressive Web App for quickly locating campsites at
Lawson's Landing (Tomales Bay / Dillon Beach, CA). Built for emergency
response and on-site navigation in an area with poor cell coverage.

## What this prototype does

- Type a site number (e.g. `527`) → map zooms and highlights the site with
  a pulsing target reticle
- Section quick-jumps (Meadow / Marsh / Marine)
- GPS overlay using the device's chip (works offline)
- Shows nearest restroom and water with distance + compass direction
- Pinch / pan / zoom map
- Recent-search history
- Full offline support after first load (Service Worker cached)

## Files in this package

| file              | purpose                                      |
|-------------------|----------------------------------------------|
| `index.html`      | The app itself (HTML + CSS + JS)             |
| `sites.json`      | 336 site → pixel-coordinate mappings         |
| `map.jpg`         | The campground map (1.5 MB, 4000×2479 px)    |
| `manifest.json`   | PWA install metadata                         |
| `sw.js`           | Service worker (caches everything offline)   |
| `icon-192.png`    | App icon (small)                             |
| `icon-512.png`    | App icon (large)                             |

## How to test it locally

The PWA needs to be served over HTTP for the service worker to register.
From this folder, run any of:

```bash
# Python (built-in)
python3 -m http.server 8000

# Node
npx serve

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000/` on your phone (same Wi-Fi) or computer.
On iOS/Android, after first load, tap "Add to Home Screen" in the browser
share menu to install as a standalone app.

## Deploy options

Any static host works:

- **GitHub Pages** — push to a repo, enable Pages
- **Netlify Drop** — drag the folder onto netlify.com/drop
- **Cloudflare Pages** — free, fast CDN
- **Self-hosted** — drop on any web server

The whole package is ~1.6 MB; once cached it works without network.

## What still needs work

1. **GPS calibration.** The geographic bounds in `index.html` are approximations.
   To get accurate "you are here" placement, walk to a few known sites with
   GPS enabled and compare where the cyan dot appears vs where you are.
   Fine-tune `GEO_BOUNDS` in `index.html`.

2. **Coordinate refinement.** The 336 site coordinates were measured from the
   reference map by visual inspection / row interpolation. Most are within
   ~15 px of the actual label, which is well within the visible target marker.
   If you find specific sites that are off, edit `sites.json`.

3. **Site availability data.** Currently the app doesn't show booking status.
   Could be added if there's an API or daily export from the reservation system.

4. **Site type metadata.** RV vs tent, hookups, etc — not currently included.

5. **Real photos / icons.** App icons are placeholder generated bullseyes.

## Standalone single-file version

If you just want to test without setting up a server, open
`lawsons_landing_finder.html` (single file with everything embedded).
That one works by double-clicking — no server needed — but cannot be
"installed" as a PWA on mobile.

---

Built as a prototype. Refine and ship.
