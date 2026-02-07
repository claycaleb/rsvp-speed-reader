# rsvp-speed-reader

# RSVP Speed Reader Web App

A lightweight React web app for Rapid Serial Visual Presentation (RSVP) reading. Built with ChatGPT. Inspired by this [X post](https://x.com/UltraLinx/status/2011434505253650868).

## Features
- Paste text and read it word by word at adjustable speed.
- Adjustable words-per-minute (WPM) using a slider.
- ORP (Optimal Recognition Point) highlighting: each word highlights a central letter in red for faster reading.
- Visual guide line for alignment.
- Play, pause, and rewind controls.
- Dark/Light mode toggle with sun/moon icons.
- Modern, clean UI using TailwindCSS.

## Installation
1. Clone the repo:
```bash
git clone https://github.com/claycaleb/rsvp-speed-reader.git
```
2. Install dependencies:
```bash
npm install
```
3. Run the app locally:
```bash
npm run dev
```
4. Open `http://localhost:3000` in your browser.

## Customization
- Tailwind classes and inline styles define colors, spacing, and typography.
- Dark mode colors are set in `bgClass`, `cardClass`, and ORP box styles; you can tweak these to adjust shades and appearance.
- ORP letter color is controlled by `text-red-500` (Tailwind) — change it to customize.

## License
MIT
