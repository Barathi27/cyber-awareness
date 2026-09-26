# CyberAware — Fake News Detection Awareness in Colleges

Premium frontend for a college cybersecurity awareness platform.

## Tech stack (frontend only)

- HTML5 · CSS3 · Vanilla JavaScript
- Tailwind CSS (CDN)
- Custom glassmorphism design system (`css/styles.css`)

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
# Python
python -m http.server 5500

# Node
npx serve .
```

Then visit `http://localhost:5500`.

## Pages

| Page | Path |
|------|------|
| Landing | `index.html` |
| Login (Student / Admin) | `pages/login.html` |
| Student Dashboard | `pages/dashboard.html` |
| Awareness Survey | `pages/survey.html` |
| Learning Hub | `pages/learning.html` |
| Quizzes | `pages/quiz.html` |
| AI Scam Checker | `pages/ai-checker.html` |
| Community Alert Wall | `pages/community.html` |
| Browser Extension Demo | `pages/extension.html` |
| Profile | `pages/profile.html` |
| Admin Console | `pages/admin.html` |
| Analytics | `pages/analytics.html` |
| 404 | `pages/404.html` |

## Demo login

- Student: `priya.sharma@college.edu` / `demo1234`
- Admin: switch tab → `admin@college.edu` / `demo1234`

No real authentication — redirects to dashboards.

## API placeholders

See `js/data.js` → `AppData.api` and `App.apiMock()` in `js/app.js` for future Flask / FastAPI / Gemini integration.

## Features

- Dark / light mode (persisted)
- Responsive layout (mobile → desktop)
- Dummy campus scam data (TCS internship, Microsoft phish, scholarships, OTP, etc.)
- Toasts, modals, loaders, charts, survey & quiz flows
