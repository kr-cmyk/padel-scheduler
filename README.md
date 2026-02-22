# 11755 Wilshire Padel Reservations

A mobile-first web app for booking padel court time slots.

## Features

- **Weekly calendar view** — browse dates and toggle between weeks
- **Hourly time slots** (8 AM – 6 PM) with availability status
- **Multi-hour booking** — select contiguous time slots
- **Email collection** and **liability waiver** required before booking
- **Confirmation screen** with booking summary
- **iPhone-optimized** — safe area support, touch-friendly sizing, no-zoom, smooth scrolling

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to your main branch, root folder (`/`)
4. Your site will be live at `https://<username>.github.io/<repo-name>/`

## Files

- `index.html` — The entire app (single-file, no build step needed)

## Notes

- This is a front-end demo. Bookings are stored in-memory and reset on page reload.
- To persist bookings, connect to a backend/database (Firebase, Supabase, etc.).
- Demo bookings are randomly seeded so the calendar looks realistic.
