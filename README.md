# AIE Session Navigator

A polished booth demo for **ZCode** at the **AI Engineer World's Fair**.
Attendees pick a persona + interests, get ranked session recommendations, and
see a tailored "booth conversation angle" for pitching ZCode to them.

## Stack

Zero dependencies, zero build step. Plain HTML + CSS + vanilla JS.

- `index.html` — page structure
- `styles.css` — dark, responsive "AI-engineer tool" theme
- `app.js` — persona picker, track filters, ranking, booth-angle rendering
- `data.js` — seed data: personas, tracks, sessions, ZCode strengths & booth angles

Because there's no framework or build pipeline, the app loads instantly and
runs offline — ideal for a live booth with flaky conference Wi-Fi.

## Run locally

Open `index.html` directly, **or** serve the folder (avoids any file:// quirks):

```bash
# Python 3
python -m http.server 8000

# or Node (no install)
npx --yes serve .
```

Then visit http://localhost:8000.

## Swapping in real schedule data

Edit `data.js`. Each session needs: `id`, `title`, `track` (a track `id`),
`targetPersona` (a persona `id`), `personas` (array of relevant persona ids),
`why` (why this session matters), and `takeaway` (practical takeaway).
Everything else updates automatically.

## Features

1. **Persona selector** — AI Engineer, CTO/VP of AI, Founder/FDE, Researcher.
2. **8 track filters** — Agentic Engineering, Context Engineering, Evals,
   Computer Use, Search/Retrieval, Vision & OCR, Inference/Local AI,
   Security/Platform Engineering.
3. **Ranked session cards** — title, track, target persona, why it matters,
   practical takeaway. Top persona matches surface first.
4. **Booth conversation angle** — a tailored ZCode pitch per persona, with the
   strengths to lead with.
5. **Responsive** — two-column on desktop, single-column stacked on mobile.

## Demo risks & notes

- Sessions are realistic **illustrative** seed data, not the official schedule.
  Replace `data.js` with the real agenda before the event if accuracy matters.
- `color-mix()` in CSS is supported in all current evergreen browsers but not in
  very old ones; the layout still works without it (chips fall back to a solid border).
