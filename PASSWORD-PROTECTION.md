# Password protection (added v209)

The whole site now sits behind a single shared password. Home, About, and all case studies redirect to /password until a visitor enters it. Static files in /public still load so the password page can show the favicon.

## Files added
- middleware.ts, the gate. Runs on every request except /password, /api/password, Next internals, and static files.
- lib/auth.ts, shared helpers. Signs the cookie with HMAC SHA-256 keyed by the password.
- app/api/password/route.ts, checks the password and sets the cookie. DELETE clears it.
- app/password/page.tsx and PasswordForm.tsx, the password screen, styled with the site's tokens.
- .env.example, the two environment variables.
- app/globals.css, new .pw-* styles appended at the bottom.

## Setup on Vercel
1. Project, Settings, Environment Variables.
2. Add PORTFOLIO_PASSWORD with the password you want to share. Apply to Production and Preview.
3. Optionally add PORTFOLIO_SECRET, any long random string. It adds extra entropy to the cookie signature.
4. Redeploy. Environment variable changes only apply to new deployments.

## Local development
Copy .env.example to .env.local and set PORTFOLIO_PASSWORD. If you leave it unset locally the gate stays open so you are never locked out. In production an unset password keeps the gate closed and nobody can log in, so make sure the variable exists before deploying.

## Behavior notes
- Visitors stay logged in for 14 days. Change COOKIE_MAX_AGE in lib/auth.ts to adjust.
- Changing PORTFOLIO_PASSWORD logs everyone out immediately, since the cookie signature is derived from it.
- The password page is marked noindex. Search engines that already indexed your pages will see redirects and drop them over time.
- Open Graph previews in Slack or LinkedIn will show the password page's title. If that matters, those crawlers can be allow-listed in middleware.ts by user agent.
