# Tejaswi Mahajan Portfolio — V3

Cinematic dark + gold placement portfolio.

## V3 features
- Project cards open full case-study modals.
- Keyboard support: Enter/Space opens a project; Arrow Left/Right switches projects; Escape closes.
- Skills cards have a **double highlighted gold border** on hover.
- Individual technology chips also get gold border/glow on hover.
- Real contact form UI with validation, honeypot anti-spam field, and EmailJS integration hook.
- Resume download wired to `assets/Tejaswi_Mahajan_Resume.pdf`.
- Optional GA4 analytics hook; inactive until a real measurement ID is configured.
- SEO/meta/Open Graph/favicon assets included.
- Responsive desktop/tablet/mobile layout.
- No live-demo links and no GitHub API integration, per request.

## Enable EmailJS
1. Create an EmailJS account and email service/template.
2. In `script.js`, replace:
   - `YOUR_EMAILJS_PUBLIC_KEY`
   - `YOUR_EMAILJS_SERVICE_ID`
   - `YOUR_EMAILJS_TEMPLATE_ID`
3. The form fields sent are `from_name`, `reply_to`, `subject`, and `message`.
4. Do not put private/server secrets in frontend code.

## Enable Google Analytics 4
Replace `G-XXXXXXXXXX` in `CONFIG.analyticsId` inside `script.js` with your GA4 Measurement ID.

## Run locally
Use any static server. For example:

```bash
python -m http.server 5500
```

Then open `http://localhost:5500`.

## Deploy
This is a static site and is ready for Vercel, Netlify, GitHub Pages, or any static HTTPS host.
